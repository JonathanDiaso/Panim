// PANIM — offline.js
// What happens to the audio when there is no network, and the one place that knows.
// Two jobs that used to be scattered across js/room.js and nowhere:
//
//   1. THE AUDIO CACHE. sw.js stores a chapter's m4a only when the listener asks for
//      it (message {type:'download'}) — never automatically, because the book is
//      400MB of piano. This file owns that whole conversation: the worker handle,
//      the queue, and the per-chapter saved flags. It publishes every change as
//      `panim:audio-cache`, and js/room.js paints the ↓ column from it and posts
//      nothing itself. Two files talking to one worker is how the ✓ and the queue
//      drift apart.
//
//   2. THE WARNING, 2026-09-09. The author: "if its offline will it warn that audio
//      will not work offline unless downloaded… if airplane is on can it say
//      download if you want to play offline in the future". It did not. The text,
//      the fonts and the cues are precached on the first visit, so with the network
//      gone the site still READS — perfectly, which is the trap: everything looks
//      alive and the play button is silence. Now it says so, above the bar, and it
//      says the useful half too, at the only moment it can be acted on: the offer to
//      save is made when the connection COMES BACK, not while the plane is in the air.
//
// ⚠️ navigator.onLine IS ONE-WAY HONEST. `false` means there is definitely no
// network; `true` only means an interface is up — a captive hotel portal reports
// true and serves nothing. So it gates the WARNING and never the playing: a load
// that actually failed says so itself through `panim:audio-error`, which is the only
// proof there was no network, and this file listens for that too.

(function () {
  'use strict';

  var note = document.getElementById('offline-note');
  if (!note) return;
  var noteTitle = document.getElementById('offline-note-title');
  var noteText = document.getElementById('offline-note-text');
  var noteAction = document.getElementById('offline-note-action');
  var noteDismiss = document.getElementById('offline-note-dismiss');

  var P = null;             // PanimPlayer, bound on panim:rendered
  var sw = null;            // the active service worker, once there is one
  var cached = {};          // chapterId -> true when its audio is stored
  var queue = [];           // chapters waiting to be saved, in order
  var inFlight = null;      // the one the worker is fetching right now
  var batchTotal = 0;       // how many this run of the queue started with

  // The worker has not answered yet, so we do not know what is saved and must not
  // guess: arriving offline with the whole book saved would otherwise flash "none of
  // the audio is saved" for the length of a round trip. Where there is no worker at
  // all (http, or a browser without one) nothing can be saved and the answer is known.
  var known = !('serviceWorker' in navigator);
  var dismissed = false;    // the reader closed the note that is showing
  var autoHideTimer = null;
  var unhideTimer = null;

  var LS = {
    get: function (k, fb) { try { var v = localStorage.getItem('panim:' + k); return v === null ? fb : JSON.parse(v); } catch (e) { return fb; } },
    set: function (k, v) { try { localStorage.setItem('panim:' + k, JSON.stringify(v)); } catch (e) {} }
  };

  // 🛑 THE FACT THAT THEY WERE OFFLINE OUTLIVES THE TAB, and it has to. The whole
  // point of the offer is that it is made at the moment it can be acted on, and the
  // realistic shape of that is: no signal on the plane, tab closed, site reopened on
  // wifi a day later. Held in memory alone the offer would be lost at exactly the
  // moment it becomes useful. It is cleared when the audio is saved, and the × sets
  // `offlineOfferOff` instead, which is permanent — an offer that returns after the
  // reader has said no is a nag, and this one would return on every page load.
  var offerPending = LS.get('offlineWanted', false);
  function wantOffline(on) {
    if (offerPending === on) return;
    offerPending = on;
    LS.set('offlineWanted', on);
  }

  function audioUrl(id) { return 'audio/music/' + id + '.m4a'; }
  function chapterFromUrl(u) { var m = /ch\d\d/.exec(u || ''); return m ? m[0] : null; }
  function isOnline() { return navigator.onLine !== false; }
  function ids() { return P ? P.ids : []; }
  function emit(name, detail) { document.dispatchEvent(new CustomEvent(name, { detail: detail || {} })); }

  function cachedCount() {
    var n = 0;
    ids().forEach(function (id) { if (cached[id]) n++; });
    return n;
  }
  // The size of what is LEFT, not of the book. The Save-all button used to say
  // "412 MB" with nine chapters already on the phone.
  function pendingMB() {
    var mb = 0;
    ids().forEach(function (id) { if (!cached[id]) mb += (P.manifest[id] || {}).musicMB || 0; });
    return Math.round(mb);
  }

  // ---------- the worker ----------
  function bindWorker() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.addEventListener('message', onWorkerMessage);
    navigator.serviceWorker.ready.then(function (reg) {
      sw = reg.active;
      // On a first visit the worker activates AFTER the chapters sheet could already
      // have been built — without a worker that sheet has no ↓ column at all, so it
      // has to be told to build itself again.
      emit('panim:audio-cache', { worker: true });
      query();
    }).catch(function () {});
    // If the worker never activates the warning must still arrive. Two seconds is
    // long enough for `ready` on a cold start and short enough that a reader who
    // opened the site in a tunnel is told before they tap play.
    setTimeout(function () { if (!known) { known = true; render(); } }, 2000);
  }

  function query() {
    if (!sw || !ids().length) return;
    sw.postMessage({ type: 'query', urls: ids().map(audioUrl) });
  }

  function onWorkerMessage(e) {
    var d = e.data || {};
    if (d.type === 'cached-state') {
      (d.urls || []).forEach(function (u, i) {
        var id = chapterFromUrl(u);
        if (id) cached[id] = !!(d.cached && d.cached[i]);
      });
      known = true;
    } else if (d.type === 'downloaded') {
      var id = chapterFromUrl(d.url);
      if (id) cached[id] = !!d.ok;
      // 🛑 THE QUEUE ADVANCES ON FAILURE TOO. One 404 or one dropped connection must
      // not strand the other nine behind it; the chapter that failed keeps its ↓ and
      // can be asked for on its own.
      if (id && id === inFlight) inFlight = null;
      pump();
    } else {
      return;   // not ours — sw.js also answers 'removed', which nothing here sends
    }
    settle();
    emit('panim:audio-cache', {});
    render();
  }

  // ⚠️ SEQUENTIAL, NOT Promise.all. Ten parallel 40MB fetches on a phone on hotel
  // wifi is how you get ten timeouts instead of ten files; the worker answers one
  // 'download' at a time and reports each one back.
  function pump() {
    if (inFlight || !queue.length || !sw) return;
    // Nothing can be fetched with no network, and a queue of ten rows stuck on "…"
    // is worse than ten rows that still offer their ↓. Drop it and let them ask again.
    if (!isOnline()) { queue.length = 0; return; }
    inFlight = queue.shift();
    sw.postMessage({ type: 'download', url: audioUrl(inFlight) });
  }
  function settle() { if (!inFlight && !queue.length) batchTotal = 0; }

  function enqueue(id) {
    if (!sw || cached[id] || id === inFlight || queue.indexOf(id) !== -1) return false;
    queue.push(id);
    batchTotal = Math.max(batchTotal, queue.length + (inFlight ? 1 : 0));
    return true;
  }
  function download(id) {
    if (!enqueue(id)) return;
    pump();
    settle();
    emit('panim:audio-cache', {});
    render();
  }
  function downloadAll() {
    var any = false;
    ids().forEach(function (id) { if (enqueue(id)) any = true; });
    if (!any) return;
    pump();
    settle();
    emit('panim:audio-cache', {});
    render();
  }

  // ---------- the notice ----------
  function show(title, text, action, autoHideMs) {
    if (unhideTimer) { clearTimeout(unhideTimer); unhideTimer = null; }
    noteTitle.textContent = title;
    noteText.textContent = text;
    if (action) {
      noteAction.textContent = action.label;
      noteAction.onclick = action.run;
      noteAction.hidden = false;
    } else {
      noteAction.onclick = null;
      noteAction.hidden = true;
    }
    // Both live in the same slot above the bar. This one is the newer fact, and two
    // cards stacked on one another is the bug that looks like a rendering fault.
    if (window.PanimPlayer && window.PanimPlayer.dismissResume) window.PanimPlayer.dismissResume();
    note.hidden = false;
    requestAnimationFrame(function () { note.classList.add('is-shown'); });
    if (autoHideMs) {
      // dismissed, not just hidden: a later repaint must not resurrect a note the
      // reader has already had time to read.
      autoHideTimer = setTimeout(function () { dismissed = true; hide(); }, autoHideMs);
    }
  }
  function hide() {
    if (note.hidden || unhideTimer) return;
    note.classList.remove('is-shown');
    unhideTimer = setTimeout(function () { note.hidden = true; unhideTimer = null; }, 350);
  }

  function render() {
    if (!P) return;
    if (autoHideTimer) { clearTimeout(autoHideTimer); autoHideTimer = null; }
    if (dismissed) { hide(); return; }

    var total = ids().length;
    var have = cachedCount();

    if (!isOnline()) {
      if (!known) return;                 // the worker has not said what is saved yet
      wantOffline(have < total);
      if (have === total) {
        // Nothing is wrong, and saying nothing leaves the reader guessing at the
        // one moment they are most likely to be guessing.
        show('Offline', 'All ' + total + ' chapters are saved. Everything plays.', null, 7000);
      } else if (have > 0) {
        // Written so the number does not decide the verb: "1 of 10 chapters are saved"
        // was the first draft and it is wrong at exactly the count a reader is most
        // likely to have.
        show('Offline', 'Saved chapters play, and you have ' + have + ' of ' + total
          + '. The rest need a connection — you can save them the next time you are online.', null, 0);
      } else {
        show('Offline', 'The book reads with no signal, but none of the audio is saved yet, so it '
          + 'cannot play until you are back. Save it next time you are online and it will play in the air.', null, 0);
      }
      return;
    }

    // Back on a network — the only moment the offer can be acted on, which is why it
    // is made here and not while the reader is staring at a dead play button.
    if (have === total) wantOffline(false);   // they have it; there is nothing left to offer
    if (offerPending && sw && have < total && !LS.get('offlineOfferOff', false)) {
      show('Back online',
        'Save the audio now and it plays with no signal next time — a plane, a tunnel, a basement.',
        { label: 'Save ' + (have ? 'the remaining ' + (total - have) : 'all ' + total)
                 + ' · ' + pendingMB() + ' MB', run: startAll }, 0);
      return;
    }
    hide();
  }

  function startAll() {
    dismissed = true;          // asked and answered
    wantOffline(false);
    hide();
    downloadAll();
    // 400MB with no visible progress reads as nothing happening. The chapters sheet
    // is where the per-chapter ✓ and the "Saving 3 of 10…" line already live.
    if (window.PanimRoom && window.PanimRoom.openChapters) window.PanimRoom.openChapters();
  }

  noteDismiss.addEventListener('click', function () {
    // × on the OFFER means stop asking: it is the only note that returns on its own,
    // and a suggestion that reappears on every wifi handshake is a nag. × on the
    // OFFLINE warning is just "I know" — it comes back if the state changes again.
    if (isOnline()) { LS.set('offlineOfferOff', true); wantOffline(false); }
    dismissed = true;
    hide();
  });

  function onConnectionChange() {
    dismissed = false;         // a new fact; the reader is told again
    if (isOnline()) query();   // another tab may have saved something meanwhile
    emit('panim:connection', { online: isOnline() });
    render();
  }
  addEventListener('online', onConnectionChange);
  addEventListener('offline', onConnectionChange);

  // The load that actually failed. This is worth more than navigator.onLine, and it
  // is the case where the note must speak even if it was dismissed a minute ago.
  document.addEventListener('panim:audio-error', function (e) {
    if (!(e.detail && e.detail.offline)) return;
    known = true;
    dismissed = false;
    wantOffline(true);
    render();
  });

  document.addEventListener('panim:rendered', function () {
    P = window.PanimPlayer;
    if (!P) return;
    bindWorker();
    render();
  });

  // API for js/room.js — it paints the ↓ column, this file owns what it means.
  window.PanimOffline = {
    isOnline: isOnline,
    hasWorker: function () { return !!sw; },
    isCached: function (id) { return !!cached[id]; },
    // 🛑 MEASURED 2026-09-09: WITH THE NETWORK OFF, AN UNSAVED CHAPTER NEVER RAISES
    // `error` ON THE MEDIA ELEMENT. It sits at readyState 0 and stalls — twelve seconds
    // of a play button that looks pressed and a bar that says 0:00, forever. So the
    // question is asked BEFORE the load: there is provably no network and provably
    // nothing stored, which means there is nothing to fetch and nothing to wait for.
    // `known` matters — before the worker has answered, we do not know what is stored
    // and must not refuse a chapter that is sitting in the cache.
    blocked: function (id) { return known && !isOnline() && !cached[id]; },
    isQueued: function (id) { return id === inFlight || queue.indexOf(id) !== -1; },
    pending: function () { return queue.length + (inFlight ? 1 : 0); },
    batchSize: function () { return batchTotal; },
    cachedCount: cachedCount,
    pendingMB: pendingMB,
    download: download,
    downloadAll: downloadAll
  };
})();
