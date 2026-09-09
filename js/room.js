// PANIM — room.js
// The Listening Room (SITE-V2-PLAN.md §5.3): a full-screen night player over the
// chapter's frontispiece / dawn tokens. Phone-on-the-nightstand product. Controls
// dim after 6s idle; the room's light follows PLAYBACK progress (the chapter's
// token lerps toward the next chapter's as it plays) — "the light reads with you."

(function () {
  'use strict';

  var room = document.getElementById('room');
  if (!room) return;

  // WCAG 4.1.2 — index.html marks the room with aria-label but not a role: to
  // assistive tech it read as a plain <section>, not the full-screen overlay it
  // actually is. Set once here rather than in index.html, which this session does
  // not own; role and aria-modal only matter once the room is actually shown, so
  // there is no harm in them being present while it sits [hidden].
  room.setAttribute('role', 'dialog');
  room.setAttribute('aria-modal', 'true');

  var els = {
    backdrop: document.getElementById('room-backdrop'),
    close: document.getElementById('room-close'),
    chnum: document.getElementById('room-chnum'),
    title: document.getElementById('room-title'),
    clock: document.getElementById('room-clock'),
    arcFill: document.getElementById('room-arc-fill'),
    play: document.getElementById('room-play'),
    back: document.getElementById('room-back'),
    fwd: document.getElementById('room-fwd'),
    speed: document.getElementById('room-speed'),
    sleep: document.getElementById('room-sleep'),
    follow: document.getElementById('room-follow'),
    chapters: document.getElementById('room-chapters'),
    auto: document.getElementById('room-auto'),
    seek: document.getElementById('room-seek'),
    seekFill: document.getElementById('room-seek-fill'),
    sleepBadge: document.getElementById('room-sleep-badge'),
    sleepCount: document.getElementById('room-sleep-count'),
    sheetList: document.getElementById('chapters-sheet-list')
  };

  var P = null;                 // PanimPlayer, bound at init
  var open = false;
  var clockMode = 'elapsed';    // 'elapsed' | 'remaining'
  var idleTimer = null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Whichever control opened the room — Begin listening, nav Listen, or the player
  // bar's own Room button — gets focus back on close. The Tab trap that keeps
  // focus inside the room while it is open lives in js/ui.js (trapOverlayTab,
  // keyed on #room.is-open) so this file only has to save, move and restore it.
  var lastFocused = null;

  // ---------- open / close ----------
  function openRoom() {
    if (open) return;
    open = true;
    lastFocused = document.activeElement;
    room.hidden = false;
    document.body.classList.add('room-open');
    requestAnimationFrame(function () {
      room.classList.add('is-open');
      els.close.focus();
    });
    setExpanded(true);
    if (!P.state.chapterId) P.load(P.ids[0], {});
    refresh();
    armIdle();
  }
  function closeRoom() {
    if (!open) return;
    open = false;
    room.classList.remove('is-open');
    document.body.classList.remove('room-open');
    setTimeout(function () { room.hidden = true; }, 350);
    if (idleTimer) clearTimeout(idleTimer);
    setExpanded(false);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    lastFocused = null;
  }
  function toggleRoom() { open ? closeRoom() : openRoom(); }

  // WCAG 4.1.2 — neither #listen-btn (nav) nor #room-btn (player bar) carries
  // aria-haspopup/aria-expanded in index.html, which this session does not own.
  // Set once at wire-time and kept in sync here so both announce the room's state
  // whichever one opened it.
  function setExpanded(v) {
    ['listen-btn', 'room-btn'].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) b.setAttribute('aria-expanded', String(v));
    });
  }

  // swipe down closes (mobile)
  var touchY = null;
  room.addEventListener('touchstart', function (e) { touchY = e.touches[0].clientY; }, { passive: true });
  room.addEventListener('touchend', function (e) {
    if (touchY !== null && e.changedTouches[0].clientY - touchY > 90) closeRoom();
    touchY = null;
  }, { passive: true });

  // ---------- idle dim ----------
  function armIdle() {
    room.setAttribute('data-idle', 'false');
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { if (open) room.setAttribute('data-idle', 'true'); }, 6000);
  }
  ['pointermove', 'pointerdown', 'touchstart', 'keydown'].forEach(function (ev) {
    room.addEventListener(ev, armIdle, { passive: true });
  });

  // ---------- the light used to "follow playback", and it was painting the Room CREAM
  // REMOVED 2026-08-29, and this is a bug fix, not a feature cut. Read this before
  // putting it back.
  //
  // This block read window.PANIM_TOKENS — the dawn arc in js/motion.js — and wrote
  // `here.bg` onto the Room as an inline --room-bg. When it was written, TOKENS was the
  // old NIGHT table, which is still visible in the fallback it carried:
  // { bg: '#050409', accent: '#d9a441', text: '#f0edf4' }. TOKENS became the PAPER arc
  // when the site moved to Direction B, and nothing here changed. So from that day on,
  // opening the Listening Room set --room-bg to #EDE9DF and up — measured live at
  // rgb(237,233,223) — and an inline style beats the #0C0B0A in css/room.css. The room
  // that every comment in this build describes as "a phone on a nightstand at 1 a.m."
  // was painting itself in daylight cream underneath its own backdrop and grade.
  // It survived because .room-backdrop is filtered to brightness(.15) and .room-grade
  // lays three dark radials over the middle, so the cream only ever showed at the edges.
  //
  // 🛑 THIS IS W5 — the arc table kept in two places with nothing enforcing it — with a
  // second consumer that reads the wrong table. Do not re-point it at PANIM_TOKENS.
  //
  // TO BRING THE FEATURE BACK the Room needs its OWN ten-stop ramp, and it is an
  // author decision, not a derivation: the page's accents (#32638F, #A8391B, #7E5A20)
  // are picked for contrast on cream and none of them clears 4.5:1 on #0C0B0A. Until
  // that ramp exists the Room holds the tokens in css/room.css, and its light already
  // follows playback in two other ways — the backdrop plate changes per chapter
  // (paintBackdrop) and the arc fills as the chapter runs.

  // ---------- backdrop image (frontispiece if the author has supplied one) ----------
  var FRONTIS = { ch01:'ch01-tomb', ch02:'ch02-trees', ch03:'ch03-mountain', ch04:'ch04-river',
                  ch05:'ch05-bush', ch06:'ch06-shine', ch07:'ch07-gate', ch08:'ch08-flint',
                  ch09:'ch09-charcoal', ch10:'ch10-morning' };
  function paintBackdrop(chapterId) {
    var slot = FRONTIS[chapterId];
    var img = slot && window.PANIM_IMAGES ? window.PANIM_IMAGES[slot] : null;
    if (img && img.src) {
      els.backdrop.style.backgroundImage = 'url("' + img.src + '")';
      els.backdrop.classList.add('has-image');
    } else {
      els.backdrop.style.backgroundImage = '';
      els.backdrop.classList.remove('has-image');
    }
  }

  // ---------- the room used to breathe with the voice — REMOVED 2026-09-09 ----------
  // 🛑 THE WEB AUDIO ANALYSER IS GONE BECAUSE NOTHING READ IT, AND IT WAS NOT FREE.
  // It ran a 512-point analyser over the narration on every animation frame while the
  // Room was open and playing, smoothed the RMS, and wrote it to --pulse on #room. The
  // CSS that made the glow behind the play button breathe with that number was removed
  // at some point before v68 and the writer was left behind. Verified twice before
  // deleting: no `var(--pulse)` anywhere in css/, index.html or content/, and at runtime
  // a walk of every rule in document.styleSheets matched --pulse zero times.
  //
  // ⚠️ AND IT WAS THE EXPENSIVE KIND OF DEAD CODE, WHICH IS WHY IT WENT RATHER THAN
  // STAYING DORMANT. createMediaElementSource() PERMANENTLY reroutes
  // the element's output through the AudioContext — after that call the narration is
  // only audible if the context is running, so an autoplay-policy suspension or a
  // failed resume() on iOS is silent playback, not a missing glow. It spent a rAF loop
  // and an FFT per frame, and risked the one thing this site exists to do, for a custom
  // property with no reader.
  //
  // 🛑 IF THE BREATHING GLOW COMES BACK, THE CSS COMES FIRST. Write the rule that reads
  // var(--pulse), see it do nothing, and only then restore this from git — that ordering
  // is what would have caught it. The block is in the history at v68.

  // ---------- reflect player state ----------
  // ⚠️ THE LABEL CHANGES WITH THE STATE AND SO DOES THE MEANING OF THE CHIP. A
  // toggle that reads "Continuous" in both positions makes a reader work out from
  // the fill whether it is on; a chip that says what will happen at the end of this
  // chapter answers the question the reader actually has, in the dark, at 1 a.m.
  function reflectAuto() {
    if (!els.auto) return;
    var on = P.state.autoAdvance !== false;
    els.auto.setAttribute('aria-pressed', on ? 'true' : 'false');
    els.auto.textContent = on ? 'Continuous' : 'One chapter';
    els.auto.setAttribute('aria-label', on
      ? 'Continuous play is on. The next chapter follows automatically.'
      : 'Continuous play is off. Playback stops at the end of this chapter.');
  }

  function refresh() {
    if (!P.state.chapterId) return;
    var m = P.manifest[P.state.chapterId] || {};
    var r = window.PANIM_RENDERED;
    els.chnum.textContent = r ? r.romanFor(m.num || 1) : String(m.num || '');
    els.title.textContent = m.title || '';
    els.speed.textContent = P.state.speed + '×';
    els.play.classList.toggle('is-playing', P.state.playing);
    els.play.setAttribute('aria-label', P.state.playing ? 'Pause' : 'Play');
    reflectAuto();
    paintBackdrop(P.state.chapterId);
    tick();
  }

  function tick() {
    var cur = P.voiceTime(), dur = P.voiceDur();
    var ratio = dur ? cur / dur : 0;
    els.clock.textContent = clockMode === 'elapsed' ? P.fmtTime(cur) : '−' + P.fmtTime(Math.max(0, dur - cur));
    els.arcFill.style.strokeDashoffset = String(100 - ratio * 100);
    // see the note on .arc-fill in css/room.css: a round linecap paints a bead even
    // when the dash has no length, so a chapter at 0:00 wore a dot on its arc
    els.arcFill.style.opacity = ratio > 0.005 ? '1' : '0';
    els.seekFill.style.width = (ratio * 100) + '%';
    els.seek.setAttribute('aria-valuenow', Math.round(ratio * 100));
    // Same reason as #seekbar in js/player.js: valuenow alone announces "47", which
    // is not a position in a chapter. valuetext wins over valuenow where it exists.
    els.seek.setAttribute('aria-valuetext', P.fmtTime(cur) + ' of ' + P.fmtTime(dur));
    var rem = P.sleepRemaining();
    if (rem === null) { els.sleepBadge.hidden = true; }
    else {
      els.sleepBadge.hidden = false;
      els.sleepCount.textContent = rem === 'chapter' ? 'ch. end' : P.fmtTime(Math.round(rem / 1000));
    }
  }

  // ---------- chapters sheet ----------
  // ==========================================================================
  // 🛑 THE WHOLE BOOK, OFFLINE, IN ONE TAP — 2026-08-30 (D22-E)
  // The author asked whether a reader can play the audio and load the page with no
  // network. Both halves already worked and neither was findable: sw.js precaches
  // the text, the fonts, the cues and the scripts on the first visit, so the BOOK
  // has been offline since v3 — and the audio has been downloadable per chapter
  // since the Room shipped, behind a ↓ the size of a fingernail on ten separate
  // rows inside a sheet most readers never open.
  // A reader packing for a flight does not want ten taps. This is the one tap, and
  // it also says the number out loud, which is the thing that was missing: 400MB is
  // a decision and the reader is entitled to make it before it starts.
  //
  // 🛑 THE WORKER TALK MOVED OUT, 2026-09-09 — js/offline.js. This file used to hold
  // the service-worker handle, the download queue and its own copy of "which
  // chapters are saved", read back out of the DOM by counting .is-cached. The
  // offline WARNING needs the same answer before this sheet has ever been built, and
  // two files posting to one worker is how a ✓ and a queue drift apart. So: that
  // file owns the state and the messages, this one paints. Nothing here posts.
  // ==========================================================================
  var O = window.PanimOffline;

  function paintRows() {
    if (!P || !O) return;
    P.ids.forEach(function (id) {
      // 🛑 THE ROW ITSELF GOES UNAVAILABLE WHEN IT CANNOT PLAY — 2026-09-09, and this
      // was a silent failure until it did. Offline, tapping an unsaved chapter used to
      // close the sheet and do nothing: js/player.js refuses the doomed load, and
      // #offline-note — the surface that would have explained it — is deliberately
      // suppressed while the Room is open (css/room.css). So the sheet has to answer
      // for itself. The Save-all line underneath already says why.
      var row = els.sheetList.querySelector('[data-room-chapter="' + id + '"]');
      if (row) row.disabled = !!(O.blocked && O.blocked(id));

      var btn = els.sheetList.querySelector('[data-dl-chapter="' + id + '"]');
      if (!btn) return;
      var saved = O.isCached(id), queued = O.isQueued(id);
      btn.textContent = saved ? '✓' : queued ? '…' : '↓';
      btn.classList.toggle('is-cached', saved);
      // Offline, the ↓ can only fail. A control that is offered and cannot work is
      // worse than one that is visibly unavailable, and the row below says why.
      btn.disabled = saved || queued || !O.isOnline();
      var m = P.manifest[id] || {};
      btn.title = saved ? 'Saved for offline' : 'Save for offline (' + (m.musicMB || '?') + ' MB)';
      btn.setAttribute('aria-label', saved
        ? 'Chapter saved for offline'
        : 'Save chapter for offline, ' + (m.musicMB || '?') + ' megabytes');
    });
  }

  function paintSaveAll() {
    var b = document.getElementById('save-all-audio');
    if (!b || !P || !O) return;
    var total = P.ids.length, have = O.cachedCount(), pending = O.pending();
    if (pending) {
      b.disabled = true;
      b.textContent = 'Saving ' + (O.batchSize() - pending + 1) + ' of ' + O.batchSize() + '…';
    } else if (have === total) {
      b.disabled = true;
      b.textContent = 'All ' + total + ' chapters are saved';
    } else if (!O.isOnline()) {
      b.disabled = true;
      b.textContent = 'Saving needs a connection';
    } else {
      b.disabled = false;
      b.textContent = have
        ? 'Save the remaining ' + (total - have) + ' for offline (' + O.pendingMB() + ' MB)'
        : 'Save all ' + total + ' for offline (' + O.pendingMB() + ' MB)';
    }
    var n = document.getElementById('save-all-note');
    if (n) {
      n.textContent = O.isOnline()
        ? 'The text of the book is already saved. This adds the voice, so the whole thing works with no signal.'
        : 'You are offline. The text is already saved; the voice can be added when you are back on a connection.';
    }
  }

  function buildChaptersSheet() {
    if (!P || !O) return;
    var r = window.PANIM_RENDERED;
    var worker = O.hasWorker();
    els.sheetList.innerHTML = P.ids.map(function (id) {
      var m = P.manifest[id] || {};
      var done = P.state.completed[id] ? ' is-complete' : '';
      var cur = id === P.state.chapterId ? ' is-current' : '';
      return '<div class="chapter-row' + done + cur + '">' +
        '<button class="cr-main" data-room-chapter="' + id + '">' +
        '<span class="cr-num">' + (r ? r.romanFor(m.num || 0) : '') + '</span>' +
        '<span class="cr-title">' + (m.title || id) + '</span>' +
        '<span class="cr-dur">' + P.fmtTime(m.voiceDur || 0) + '</span></button>' +
        (worker ? '<button class="btn btn-icon cr-dl" data-dl-chapter="' + id + '" ' +
        'aria-label="Save chapter for offline">↓</button>' : '') +
        '</div>';
    }).join('');
    var host = document.getElementById('save-all-row');
    if (host) {
      host.innerHTML = worker
        ? '<button class="btn" id="save-all-audio" type="button"></button>' +
          '<p class="sheet-note" id="save-all-note"></p>'
        : '<p class="sheet-note">Offline saving needs a reload before it is available.</p>';
    }
    paintRows();
    paintSaveAll();
  }

  function openChapters() {
    buildChaptersSheet();
    if (window.PanimUI) window.PanimUI.openSheet('chapters-sheet');
  }

  // The ✓ column and the Save-all line are two views of one fact, and js/offline.js
  // is where the fact lives — including the case where the worker only became
  // available after this sheet was first built, which is a first visit.
  document.addEventListener('panim:audio-cache', function () {
    if (!P || !O || !els.sheetList.children.length) return;
    if (O.hasWorker() && !els.sheetList.querySelector('[data-dl-chapter]')) buildChaptersSheet();
    else { paintRows(); paintSaveAll(); }
  });
  document.addEventListener('panim:connection', function () { paintRows(); paintSaveAll(); });

  // ---------- wiring ----------
  function wire() {
    els.close.addEventListener('click', closeRoom);
    els.play.addEventListener('click', function () { P.toggle(); });
    els.back.addEventListener('click', function () { P.skip(-15); });
    els.fwd.addEventListener('click', function () { P.skip(30); });
    els.speed.addEventListener('click', function () { P.cycleSpeed(); });
    els.sleep.addEventListener('click', function () { if (window.PanimUI) window.PanimUI.openSheet('sleep-sheet'); });
    els.chapters.addEventListener('click', openChapters);
    // ⭐ CONTINUOUS PLAY, 2026-09-05. The author: "Should i have an option that
    // doesnt stop at every chapter or just keep stopping at chapter breaks?"
    // The default is on (js/player.js) and this is the only place it can be turned
    // off, which is the right place: it is the Room that a reader leaves running.
    // ⚠️ THE PRESSED ATTRIBUTE IS BOTH THE STATE AND THE STYLE — css/room.css paints
    // .room-chip[aria-pressed="true"], so there is no second class to keep in step.
    if (els.auto) els.auto.addEventListener('click', function () {
      P.setAutoAdvance(!P.state.autoAdvance);
      reflectAuto();
    });
    els.follow.addEventListener('click', function () {
      // drop to the page at the live paragraph
      closeRoom();
      var live = document.querySelector('.is-live');
      var target = live || document.getElementById(P.state.chapterId);
      // reduced motion still wins: PanimScroll only chooses between an animated hop
      // and an instant jump, and html{scroll-behavior} is already `auto` under the
      // reduce query (css/site.css), so a 'smooth' request there does not animate.
      if (target) {
        if (reduceMotion) target.scrollIntoView({ behavior: 'auto', block: 'center' });
        else if (window.PanimScroll) window.PanimScroll.intoView(target, 'center');
        else target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    els.clock.addEventListener('click', function () {
      clockMode = clockMode === 'elapsed' ? 'remaining' : 'elapsed'; tick();
    });
    document.addEventListener('click', function (e) {
      // O is absent only if js/offline.js did not run at all, in which case the
      // sheet has no ↓ column to click — but this listener is on the document.
      if (e.target.id === 'save-all-audio' && O) { O.downloadAll(); return; }
      var dl = e.target.closest && e.target.closest('[data-dl-chapter]');
      if (dl && O) { O.download(dl.getAttribute('data-dl-chapter')); return; }
      var row = e.target.closest && e.target.closest('[data-room-chapter]');
      if (row) {
        P.load(row.getAttribute('data-room-chapter'), { autoplay: true });
        if (window.PanimUI) window.PanimUI.closeSheet('chapters-sheet');
      }
    });
    // room seek strip
    var dragging = false;
    function ratioFromEvent(e) {
      var r = els.seek.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      return Math.max(0, Math.min(1, x / r.width));
    }
    // Captured, and cancel-aware — see the same fix in js/player.js wireSeekbar(). This
    // matters more here: the Room is the phone-in-the-dark surface, where an interrupted
    // touch is the normal case rather than the edge one.
    els.seek.addEventListener('pointerdown', function (e) {
      dragging = true;
      try { els.seek.setPointerCapture(e.pointerId); } catch (err) {}
      P.seekToRatio(ratioFromEvent(e));
    });
    els.seek.addEventListener('pointermove', function (e) { if (dragging) P.seekToRatio(ratioFromEvent(e)); });
    function endRoomDrag(e) {
      if (!dragging) return;
      dragging = false;
      try { els.seek.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    els.seek.addEventListener('pointerup', endRoomDrag);
    els.seek.addEventListener('pointercancel', endRoomDrag);
    // Home, End, PageUp and PageDown used to be missing here and present on the
    // transport bar. One implementation now, in js/player.js; 15s is the Room's step.
    P.wireSliderKeys(els.seek, 15);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) closeRoom(); });

    document.addEventListener('panim:room-toggle', toggleRoom);
    document.addEventListener('panim:chapter-loaded', function () { if (open) refresh(); });
    document.addEventListener('panim:play-state', function () { if (open) refresh(); });
    document.addEventListener('panim:speed-change', function () { if (open) refresh(); });
    document.addEventListener('panim:sleep-change', function () { if (open) tick(); });
    document.addEventListener('panim:narration-timeupdate', function () { if (open) tick(); });
    setInterval(function () { if (open && P.sleepRemaining() !== null) tick(); }, 1000);
  }

  document.addEventListener('panim:rendered', function () {
    P = window.PanimPlayer;
    if (!P) return;
    wire();
    ['listen-btn', 'room-btn'].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) { b.setAttribute('aria-haspopup', 'dialog'); b.setAttribute('aria-expanded', 'false'); }
    });
    // hero Begin and nav Listen open the room (the listening product)
    var begin = document.getElementById('begin-btn');
    if (begin) begin.addEventListener('click', function () { setTimeout(openRoom, 50); });
    var listen = document.getElementById('listen-btn');
    if (listen) listen.addEventListener('click', function () { setTimeout(openRoom, 50); });
  });

  // js/offline.js opens this after starting a Save-all from its notice: the sheet is
  // the only surface that shows the download getting anywhere.
  window.PanimRoom = { openChapters: openChapters };
})();
