// PANIM — player.js (v2)
// The audio engine. SITE-V2-PLAN.md §6. Two finished editions per chapter —
// audio/music/chNN.m4a (default: the mastered piano bed) and audio/voice/chNN.m4a
// (words only). No live mixing, ever: the mix was mastered by ear.
//
// TIMELINE RULE: every position this file stores, dispatches, or accepts is on the
// VOICE timeline (cues/*.json's clock). The music edition prepends 6.0s of music-
// alone lead-in (content/audio-manifest.js musicOffset), so:
//   fileTime = voiceTime + offset(edition)   ·   voiceTime = fileTime − offset
// Switching editions mid-listen converts through this and keeps your place.

(function () {
  'use strict';

  var CHAPTER_IDS = ['ch01','ch02','ch03','ch04','ch05','ch06','ch07','ch08','ch09','ch10'];
  var SLEEP_FADE_MS = 30000;
  var MAN = window.PANIM_AUDIO || {};

  var els = {
    audio: document.getElementById('narration-audio'),
    player: document.getElementById('player'),
    playBtn: document.getElementById('play-btn'),
    skipBackBtn: document.getElementById('skip-back-btn'),
    skipFwdBtn: document.getElementById('skip-fwd-btn'),
    speedBtn: document.getElementById('speed-btn'),
    editionBtn: document.getElementById('edition-btn'),
    followBtn: document.getElementById('follow-btn'),
    sleepBtn: document.getElementById('sleep-btn'),
    roomBtn: document.getElementById('room-btn'),
    metaTitle: document.getElementById('meta-title'),
    metaTime: document.getElementById('meta-time'),
    seekbar: document.getElementById('seekbar'),
    seekFill: document.getElementById('seekbar-fill'),
    seekBuffered: document.getElementById('seekbar-buffered'),
    seekMarks: document.getElementById('seekbar-marks'),
    seekHandle: document.getElementById('seek-handle'),
    sleepOptions: document.getElementById('sleep-options'),
    holdBtn: document.getElementById('hold-btn'),
    completionModal: document.getElementById('completion-modal'),
    completionBody: document.getElementById('completion-body'),
    completionNext: document.getElementById('completion-next'),
    completionBookmark: document.getElementById('completion-bookmark'),
    completionClose: document.getElementById('completion-close'),
    resumeToast: document.getElementById('resume-toast'),
    resumeToastText: document.getElementById('resume-toast-text'),
    resumeToastYes: document.getElementById('resume-toast-yes'),
    resumeToastDismiss: document.getElementById('resume-toast-dismiss'),
    ariaLive: document.getElementById('aria-live')
  };

  var SPEEDS = [0.9, 1, 1.1, 1.25];
  var state = {
    chapterId: null,
    edition: 'music',           // 'music' | 'voice'
    playing: false,
    speed: 1,
    volume: 1,
    follow: true,
    sleepMode: 'off',
    sleepTimer: null,
    sleepEndsAt: null,
    sleepFading: false,
    completed: {},
    inPrayerZone: false
  };

  var LS = {
    get: function (k, fb) { try { var v = localStorage.getItem('panim:' + k); return v === null ? fb : JSON.parse(v); } catch (e) { return fb; } },
    set: function (k, v) { try { localStorage.setItem('panim:' + k, JSON.stringify(v)); } catch (e) {} }
  };

  function offset() { return state.edition === 'music' ? ((MAN[state.chapterId] || {}).musicOffset || 6.0) : 0; }
  function voiceDur() { return (MAN[state.chapterId] || {}).voiceDur || 0; }
  function fileDur() { return els.audio.duration || ((MAN[state.chapterId] || {}).musicDur && state.edition === 'music' ? MAN[state.chapterId].musicDur : voiceDur()) || 0; }
  function voiceTime() { return Math.max(0, (els.audio.currentTime || 0) - offset()); }
  function src(id, ed) { return 'audio/' + ed + '/' + id + '.m4a'; }

  function chapterTitle(id) {
    var m = MAN[id];
    var r = window.PANIM_RENDERED;
    var num = m ? m.num : parseInt(String(id).slice(2), 10);
    return (r ? r.romanFor(num) : num) + '. ' + (m ? m.title : id);
  }

  function fmtTime(s) {
    if (!isFinite(s) || s < 0) s = 0;
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
    return (h ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function setPlayerState(s) { els.player.setAttribute('data-state', s); }
  function announce(msg) { if (els.ariaLive) els.ariaLive.textContent = msg; }
  function emit(name, detail) { document.dispatchEvent(new CustomEvent(name, { detail: detail || {} })); }

  // ---------- load / editions ----------
  function loadChapter(chapterId, opts) {
    opts = opts || {};
    state.chapterId = chapterId;
    els.metaTitle.textContent = chapterTitle(chapterId);
    setPlayerState('loading');
    els.audio.src = src(chapterId, state.edition);
    els.audio.load();
    emit('panim:chapter-loaded', { chapterId: chapterId });
    updateMediaSession(chapterId);
    renderSeekMarks();

    var resumeAt = opts.seekTo != null ? opts.seekTo : LS.get('pos:' + chapterId, 0); // voice timeline

    // Both listeners come off together, whichever fires. They used to remove only
    // themselves, so a chapter that errored left its `loadedmetadata` handler behind
    // and every later load stacked another one — each closing over a stale resumeAt
    // and a stale autoplay flag, which is how switching chapters could seek or start
    // somewhere nobody asked for.
    function cleanup() {
      els.audio.removeEventListener('loadedmetadata', onReady);
      els.audio.removeEventListener('error', onErr);
    }
    function onReady() {
      cleanup();
      if (resumeAt > 1 && resumeAt < voiceDur() - 2) {
        try { els.audio.currentTime = resumeAt + offset(); } catch (e) {}
      }
      // leave 'loading' — set the bar directly, because reflectPlaying() is a no-op
      // when the flag already agrees and would strand data-state on "loading".
      setPlayerState(els.audio.paused ? 'paused' : 'playing');
      syncPlayState();
    }
    function onErr() {
      cleanup();
      setPlayerState('error');
      announce('This chapter could not be loaded. Check your connection and try again.');
    }
    els.audio.addEventListener('loadedmetadata', onReady);
    els.audio.addEventListener('error', onErr);

    // ⚠️ iOS SAFARI: play() is only honoured inside the user gesture that asked for it.
    // This call used to live in `onReady` above — a network round trip later, because
    // the <audio> is preload="none" — so on a phone the gesture had already expired and
    // Safari rejected every play(). The rejection was swallowed and state.playing was
    // set anyway, so the button showed ❚❚ over silence and the next tap "paused"
    // nothing that was playing. That is the phone play/pause bug. Start it in the same
    // tick as the tap; the seek above does not need a gesture and can wait for metadata.
    if (opts.autoplay) play();
  }

  function setEdition(ed, opts) {
    if (ed === state.edition) return;
    var at = state.chapterId ? voiceTime() : 0;
    var was = state.playing;
    state.edition = ed;
    LS.set('edition', ed);
    updateEditionButtons();
    if (state.chapterId) loadChapter(state.chapterId, { seekTo: at, autoplay: was && !(opts && opts.stayPaused) });
    emit('panim:edition-change', { edition: ed });
    announce(ed === 'music' ? 'Music edition' : 'Voice only');
  }
  function toggleEdition() { setEdition(state.edition === 'music' ? 'voice' : 'music'); }
  function updateEditionButtons() {
    if (!els.editionBtn) return;   // single-edition build: the toggle is not in the DOM
    var music = state.edition === 'music';
    els.editionBtn.textContent = music ? '♪' : '¶';
    els.editionBtn.title = music ? 'Music edition. Tap for voice only' : 'Voice only. Tap for music';
    els.editionBtn.setAttribute('aria-pressed', String(music));
  }

  // ---------- transport ----------
  // THE AUDIO ELEMENT IS THE SOURCE OF TRUTH, not state.playing. The old play() and
  // pause() each wrote the flag, the button glyph and the data-state by hand, so the
  // UI recorded what we had *asked* for rather than what happened. Anything that moved
  // the audio without going through them — a rejected play(), an incoming call, the
  // lock-screen controls, headphones pulled out, another app taking audio focus — left
  // the bar claiming to play over silence. Now the element's own play/pause events
  // drive everything, and state.playing is a mirror of els.audio.paused.
  function reflectPlaying(playing) {
    if (state.playing === playing) return;
    state.playing = playing;
    // The glyphs ▶ / ❚❚ were text, so the transport was set in whatever the font
    // stack happened to have and did not match the Listening Room's own transport,
    // which has always been drawn. Same two paths, same class switch as room.js.
    els.playBtn.classList.toggle('is-playing', playing);
    els.playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    els.playBtn.setAttribute('title', playing ? 'Pause' : 'Play');
    setPlayerState(playing ? 'playing' : 'paused');
    updateHoldVisibility();
    emit('panim:play-state', { playing: playing });
  }
  function syncPlayState() { reflectPlaying(!els.audio.paused && !els.audio.ended); }

  function play() {
    if (!state.chapterId) { loadChapter(CHAPTER_IDS[0], { autoplay: true }); return; }
    var p = els.audio.play();
    if (p && p.catch) {
      p.catch(function (err) {
        // Rejected: autoplay policy on a phone, or the source failed underneath us.
        // Either way the bar must show the truth — the previous code swallowed this
        // and asserted "playing" regardless.
        syncPlayState();
        if (err && err.name === 'NotAllowedError') announce('Tap play to start the audio.');
      });
    }
  }
  function pause() { els.audio.pause(); }
  function togglePlay() {
    if (!state.chapterId) { loadChapter(CHAPTER_IDS[0], { autoplay: true }); return; }
    els.audio.paused ? play() : pause();
  }
  function skip(seconds) {
    if (!els.audio.duration) return;
    els.audio.currentTime = Math.max(0, Math.min(els.audio.duration, els.audio.currentTime + seconds));
  }
  function setSpeed(v) {
    state.speed = v;
    els.audio.playbackRate = v;
    els.speedBtn.textContent = v + '×';
    LS.set('speed', v);
    emit('panim:speed-change', { speed: v });
  }
  function cycleSpeed() { setSpeed(SPEEDS[(SPEEDS.indexOf(state.speed) + 1) % SPEEDS.length]); }
  function setVolume(v) { state.volume = Math.max(0, Math.min(1, v)); els.audio.volume = state.volume; }

  // ---------- seek UI ----------
  // The book index, on its own rail (see index.html #chapter-rail). Evenly spaced
  // because these are ten chapters, not ten timestamps — which is exactly the reading
  // that was impossible while they were drawn on the position track.
  function renderSeekMarks() {
    var r = window.PANIM_RENDERED;
    els.seekMarks.innerHTML = CHAPTER_IDS.map(function (id, i) {
      var pct = (i / (CHAPTER_IDS.length - 1)) * 100;
      var cls = 'seek-mark' + (state.completed[id] ? ' is-complete' : '') + (id === state.chapterId ? ' is-current' : '');
      var roman = r ? r.romanFor((MAN[id] || {}).num || (i + 1)) : (i + 1);
      return '<button type="button" class="' + cls + '" style="left:' + pct + '%"' +
             ' data-mark-chapter="' + id + '"' +
             ' aria-label="' + chapterTitle(id).replace(/"/g, '') + '"' +
             ' title="' + chapterTitle(id).replace(/"/g, '') + '">' +
             '<i class="seek-mark-label" aria-hidden="true">' + roman + '</i>' +
             '</button>';
    }).join('');
  }

  function updateSeekUI() {
    var dur = fileDur(), cur = els.audio.currentTime || 0;
    var pct = dur ? (cur / dur) * 100 : 0;
    els.seekFill.style.width = pct + '%';
    els.seekHandle.style.left = pct + '%';
    els.seekbar.setAttribute('aria-valuenow', Math.round(pct));
    // Without this a screen reader announces the bare percentage — "37" — which is not
    // a position in a 35-minute chapter. valuetext wins over valuenow where it exists.
    els.seekbar.setAttribute('aria-valuetext', fmtTime(cur) + ' of ' + fmtTime(dur));
    els.metaTime.textContent = fmtTime(cur) + ' / ' + fmtTime(dur);
    if (els.audio.buffered && els.audio.buffered.length && dur) {
      var end = els.audio.buffered.end(els.audio.buffered.length - 1);
      els.seekBuffered.style.width = Math.min(100, (end / dur) * 100) + '%';
    }
    var vt = voiceTime();
    LS.set('pos:' + state.chapterId, vt);
    LS.set('lastChapter', state.chapterId);
    LS.set('lastPos', vt);
    updatePositionState();
  }

  function seekToRatio(r) { if (els.audio.duration) els.audio.currentTime = r * els.audio.duration; }

  function wireSeekbar() {
    var dragging = false;
    function ratioFromEvent(e) {
      var r = els.seekbar.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      return Math.max(0, Math.min(1, x / r.width));
    }
    // Pointer capture keeps the drag alive when the finger leaves the 3px track, and
    // guarantees the matching up/cancel lands back here. Without it a drag interrupted
    // by a system gesture (iOS edge swipe, notification) never cleared `dragging`, and
    // the next stray pointermove anywhere on the page scrubbed the audio.
    els.seekbar.addEventListener('pointerdown', function (e) {
      dragging = true;
      try { els.seekbar.setPointerCapture(e.pointerId); } catch (err) {}
      seekToRatio(ratioFromEvent(e));
    });
    els.seekbar.addEventListener('pointermove', function (e) { if (dragging) seekToRatio(ratioFromEvent(e)); });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      try { els.seekbar.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    els.seekbar.addEventListener('pointerup', endDrag);
    els.seekbar.addEventListener('pointercancel', endDrag);
    els.seekbar.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); skip(5); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); skip(-5); }
      else if (e.key === 'Home') { e.preventDefault(); e.stopPropagation(); seekToRatio(0); }
      else if (e.key === 'End' && els.audio.duration) { e.preventDefault(); e.stopPropagation(); els.audio.currentTime = Math.max(0, els.audio.duration - 1); }
      else if (e.key === 'PageUp') { e.preventDefault(); e.stopPropagation(); skip(60); }
      else if (e.key === 'PageDown') { e.preventDefault(); e.stopPropagation(); skip(-60); }
    });
    els.seekMarks.addEventListener('click', function (e) {
      var mark = e.target.closest('[data-mark-chapter]');
      if (mark) loadChapter(mark.getAttribute('data-mark-chapter'), { autoplay: state.playing });
    });
  }

  // ---------- persistence / resume ----------
  function maybeShowResumeToast() {
    var lastChapter = LS.get('lastChapter', null);
    var lastPos = LS.get('lastPos', 0);
    if (lastChapter && lastPos > 10) {
      els.resumeToastText.textContent = 'Resume "' + chapterTitle(lastChapter) + '" at ' + fmtTime(lastPos) + '?';
      els.resumeToast.hidden = false;
      requestAnimationFrame(function () { els.resumeToast.classList.add('is-shown'); });
      els.resumeToastYes.onclick = function () {
        dismissResumeToast();
        loadChapter(lastChapter, { seekTo: lastPos, autoplay: true });
        var sec = document.getElementById(lastChapter);
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      };
      els.resumeToastDismiss.onclick = dismissResumeToast;
    }
  }
  function dismissResumeToast() {
    els.resumeToast.classList.remove('is-shown');
    setTimeout(function () { els.resumeToast.hidden = true; }, 350);
  }
  function markComplete(id) { state.completed[id] = true; LS.set('completed', state.completed); renderSeekMarks(); }

  // ---------- sleep timer ----------
  function setSleep(mode) {
    if (state.sleepTimer) { clearTimeout(state.sleepTimer); state.sleepTimer = null; }
    state.sleepMode = mode;
    state.sleepEndsAt = null;
    Array.prototype.forEach.call(els.sleepOptions.children, function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-sleep') === mode);
    });
    if (mode !== 'off' && mode !== 'chapter') {
      var ms = parseInt(mode, 10) * 60000;
      state.sleepEndsAt = Date.now() + ms;
      state.sleepTimer = setTimeout(fadeOutAndPause, Math.max(0, ms - SLEEP_FADE_MS));
    }
    // THE BAR'S SLEEP CONTROL BECAME A DRAWING ON 2026-08-29 (D14-B), so it has to
    // carry its own state. As the word "Sleep" it was stateless too, but a word at
    // least names itself; a crescent that looks identical armed and disarmed tells a
    // reader nothing at all. --accent via .is-active is what "on" means everywhere
    // else on this site, and the label says which timer, because "Sleep timer, on"
    // is not a useful thing to hear when six options set it.
    if (els.sleepBtn) {
      var armed = mode !== 'off';
      els.sleepBtn.classList.toggle('is-active', armed);
      els.sleepBtn.setAttribute('aria-label',
        !armed ? 'Sleep timer' :
        mode === 'chapter' ? 'Sleep timer: end of this chapter' :
        'Sleep timer: ' + mode + ' minutes');
    }
    emit('panim:sleep-change', { mode: mode, endsAt: state.sleepEndsAt });
    if (mode !== 'off') announce(mode === 'chapter' ? 'Sleeping at the end of this chapter.' : 'Sleep in ' + mode + ' minutes.');
  }
  function sleepRemaining() {
    if (state.sleepMode === 'chapter') return 'chapter';
    if (!state.sleepEndsAt) return null;
    return Math.max(0, state.sleepEndsAt - Date.now());
  }
  function fadeOutAndPause() {
    if (state.sleepFading) return;
    state.sleepFading = true;
    var startVol = state.volume, startTime = Date.now();
    (function step() {
      var t = Math.min(1, (Date.now() - startTime) / SLEEP_FADE_MS);
      els.audio.volume = startVol * (1 - t);
      if (t < 1 && state.playing) requestAnimationFrame(step);
      else {
        pause();
        els.audio.volume = startVol;
        state.sleepFading = false;
        setSleep('off');
        showCompletion('sleep');
      }
    })();
  }

  // ---------- completion ----------
  // WCAG 2.1.1/2.1.2/4.1.2 — this modal carries role="dialog" aria-modal="true" in
  // index.html but nothing here ever acted like it: opening moved focus nowhere
  // (it stayed on whatever was focused before, now hidden behind the overlay),
  // there was no Escape handler at all, and closing never gave focus back. The
  // Tab trap that keeps focus inside it while open lives in js/ui.js
  // (trapOverlayTab, keyed on `.modal:not([hidden]) .modal-card`); this only has
  // to save, move and restore focus and give Escape a way in.
  var completionLastFocused = null;
  function closeCompletionModal() {
    if (els.completionModal.hidden) return;
    els.completionModal.hidden = true;
    if (completionLastFocused && completionLastFocused.focus) completionLastFocused.focus();
    completionLastFocused = null;
  }
  function showCompletion(reason) {
    els.completionBody.textContent = reason === 'sleep'
      ? 'Sleep timer ended. Your place is saved.'
      : "You've finished this chapter.";
    completionLastFocused = document.activeElement;
    els.completionModal.hidden = false;
    requestAnimationFrame(function () { els.completionNext.focus(); });
    els.completionNext.onclick = function () {
      closeCompletionModal();
      var next = CHAPTER_IDS[CHAPTER_IDS.indexOf(state.chapterId) + 1];
      if (next) loadChapter(next, { autoplay: true });
    };
    els.completionBookmark.onclick = function () {
      LS.set('lastChapter', state.chapterId);
      LS.set('lastPos', voiceTime());
      closeCompletionModal();
      announce('Bookmarked. Come back anytime.');
    };
    els.completionClose.onclick = closeCompletionModal;
  }

  // ---------- MediaSession ----------
  function updateMediaSession(id) {
    if (!('mediaSession' in navigator)) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: chapterTitle(id),
        artist: 'Jonathan Diaso',
        album: 'PANIM — The Invitation Hidden on Every Page',
        // Lock-screen / Now Playing art must be SQUARE. og-card-face.jpg was here and it
        // is 1200x630 — iOS letterboxes a wide image into the square slot, so the cover
        // rendered as a thin band floating in cream and looked broken. Every tier below
        // is 1:1. The ladder is not decoration: Android's notification shade, Auto, Wear
        // and Bluetooth head units each pick by size, and a single entry makes them all
        // upscale or downscale the same file.
        artwork: [
          { src: 'art/cover-moses-96.jpg', sizes: '96x96', type: 'image/jpeg' },
          { src: 'art/cover-moses-256.jpg', sizes: '256x256', type: 'image/jpeg' },
          { src: 'art/cover-moses-512.jpg', sizes: '512x512', type: 'image/jpeg' },
          { src: 'art/cover-moses-1024.jpg', sizes: '1024x1024', type: 'image/jpeg' }
        ]
      });
      navigator.mediaSession.setActionHandler('play', play);
      navigator.mediaSession.setActionHandler('pause', pause);
      navigator.mediaSession.setActionHandler('seekbackward', function () { skip(-15); });
      navigator.mediaSession.setActionHandler('seekforward', function () { skip(30); });
      navigator.mediaSession.setActionHandler('seekto', function (d) { if (d.seekTime != null) els.audio.currentTime = d.seekTime; });
      navigator.mediaSession.setActionHandler('previoustrack', function () {
        var i = CHAPTER_IDS.indexOf(state.chapterId);
        if (i > 0) loadChapter(CHAPTER_IDS[i - 1], { autoplay: true });
      });
      navigator.mediaSession.setActionHandler('nexttrack', function () {
        var i = CHAPTER_IDS.indexOf(state.chapterId);
        if (i >= 0 && i < CHAPTER_IDS.length - 1) loadChapter(CHAPTER_IDS[i + 1], { autoplay: true });
      });
    } catch (e) {}
  }
  function updatePositionState() {
    if (!('mediaSession' in navigator) || !navigator.mediaSession.setPositionState) return;
    try {
      if (els.audio.duration) navigator.mediaSession.setPositionState({
        duration: els.audio.duration, playbackRate: state.speed, position: els.audio.currentTime || 0
      });
    } catch (e) {}
  }

  // ---------- time events / auto-advance / preload ----------
  var preloaded = {};
  function preloadNext() {
    var next = CHAPTER_IDS[CHAPTER_IDS.indexOf(state.chapterId) + 1];
    var key = state.edition + ':' + next;
    if (!next || preloaded[key]) return;
    preloaded[key] = true;
    try { var a = new Audio(); a.preload = 'auto'; a.src = src(next, state.edition); } catch (e) {}
  }
  function wireAudio() {
    // The only two places the transport UI is allowed to change. Everything else —
    // our own play()/pause(), the lock screen, a phone call, an unplugged headphone —
    // reaches the UI through the element, so the bar cannot disagree with the audio.
    els.audio.addEventListener('play', syncPlayState);
    els.audio.addEventListener('pause', syncPlayState);
    els.audio.addEventListener('timeupdate', function () {
      updateSeekUI();
      // sync.js and the dawn arc consume VOICE-timeline time
      emit('panim:narration-timeupdate', { currentTime: voiceTime(), ratio: voiceDur() ? voiceTime() / voiceDur() : 0 });
      if (els.audio.duration && els.audio.currentTime / els.audio.duration >= 0.8) preloadNext();
    });
    els.audio.addEventListener('ended', function () {
      markComplete(state.chapterId);
      emit('panim:narration-stopped');
      // `ended` does not reliably fire `pause` alongside it, so the mirror is set here
      // by hand rather than left showing ❚❚ on a finished chapter.
      syncPlayState();
      if (state.sleepMode === 'chapter') { setSleep('off'); pause(); showCompletion('sleep'); return; }
      showCompletion('chapter-end');
    });
  }

  // ---------- prayer Hold ----------
  function updateHoldVisibility() { els.holdBtn.hidden = !(state.inPrayerZone && state.playing); }
  document.addEventListener('panim:prayer-zone', function (e) { state.inPrayerZone = e.detail.active; updateHoldVisibility(); });
  els.holdBtn.addEventListener('click', function () {
    var startVol = state.volume, startTime = Date.now();
    (function step() {
      var t = Math.min(1, (Date.now() - startTime) / 2000);
      els.audio.volume = startVol * (1 - t);
      if (t < 1) requestAnimationFrame(step);
      else { pause(); els.audio.volume = startVol; }
    })();
  });

  // ---------- follow ----------
  function setFollow(on) {
    state.follow = on;
    els.followBtn.setAttribute('aria-pressed', String(on));
    els.followBtn.classList.toggle('is-active', on);
    els.followBtn.classList.remove('is-suspended');
    els.followBtn.title = on ? 'Following the narration' : 'Follow the narration';
    emit('panim:follow-change', { on: on });
  }

  // Reading ahead suspends following (js/sync.js). Say so on the button instead of
  // leaving it lit over a page that has stopped moving — and make tapping it the way
  // back to the voice, which is what a reader reaches for.
  document.addEventListener('panim:follow-suspended', function (e) {
    if (!els.followBtn) return;
    var s = !!e.detail.suspended;
    els.followBtn.classList.toggle('is-suspended', s && state.follow);
    els.followBtn.title = s ? 'Reading ahead — tap to jump back to the narration'
                            : 'Following the narration';
  });

  // ---------- keyboard ----------
  function wireKeyboard() {
    document.addEventListener('keydown', function (e) {
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (document.activeElement && document.activeElement.isContentEditable)) return;
      switch (e.key) {
        case ' ': e.preventDefault(); togglePlay(); break;
        case 'ArrowLeft': skip(-15); break;
        case 'ArrowRight': skip(30); break;
        case 'ArrowUp': e.preventDefault(); setVolume(state.volume + 0.05); break;
        case 'ArrowDown': e.preventDefault(); setVolume(state.volume - 0.05); break;
        case 's': case 'S': if (window.PanimUI) window.PanimUI.openSheet('sleep-sheet'); break;
        case 'f': case 'F': setFollow(!state.follow); break;
        case 'l': case 'L': emit('panim:room-toggle'); break;
      }
    });
  }

  // ---------- deep links: ?t=ch4:12m30s ----------
  function maybeDeepLink() {
    var m = /[?&]t=ch(\d+):(?:(\d+)m)?(\d+)s?/.exec(location.search);
    if (!m) return false;
    var id = 'ch' + ('0' + m[1]).slice(-2);
    var t = (parseInt(m[2] || 0, 10)) * 60 + parseInt(m[3], 10);
    if (CHAPTER_IDS.indexOf(id) !== -1) { loadChapter(id, { seekTo: t }); return true; }
    return false;
  }

  function wireControls() {
    els.playBtn.addEventListener('click', togglePlay);
    els.skipBackBtn.addEventListener('click', function () { skip(-15); });
    els.skipFwdBtn.addEventListener('click', function () { skip(30); });
    els.speedBtn.addEventListener('click', cycleSpeed);
    if (els.editionBtn) els.editionBtn.addEventListener('click', toggleEdition);
    els.followBtn.addEventListener('click', function () {
      // while suspended the button means "take me back to the voice", not "turn this
      // off" — the reader has already stopped following by scrolling away
      if (state.follow && els.followBtn.classList.contains('is-suspended')) { setFollow(true); return; }
      setFollow(!state.follow);
    });
    els.roomBtn.addEventListener('click', function () { emit('panim:room-toggle'); });
    els.sleepOptions.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-sleep]');
      if (btn) setSleep(btn.getAttribute('data-sleep'));
    });
    document.addEventListener('panim:listen-chapter', function (e) {
      loadChapter(e.detail.chapterId, { autoplay: true, seekTo: e.detail.seekTo });
    });
    document.addEventListener('panim:listen-toggle', function () {
      if (!state.chapterId) loadChapter(CHAPTER_IDS[0], { autoplay: true });
      else togglePlay();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCompletionModal();
    });
  }

  function init() {
    state.speed = LS.get('speed', 1);
    // ONE edition, the author's call 2026-08-26: "the voice sounds better when it's
    // actually connected to the music." The voice-only master lives on locally;
    // restoring the toggle = re-adding audio/voice/ + the two edition buttons.
    state.edition = 'music';
    state.completed = LS.get('completed', {});
    updateEditionButtons();
    setSpeed(state.speed);
    setFollow(state.follow);
    renderSeekMarks();
    wireSeekbar();
    wireAudio();
    wireControls();
    wireKeyboard();
    setPlayerState('idle');
    if (!maybeDeepLink()) maybeShowResumeToast();
  }

  document.addEventListener('panim:rendered', init);

  // API for js/room.js
  window.PanimPlayer = {
    state: state,
    ids: CHAPTER_IDS,
    manifest: MAN,
    play: play, pause: pause, toggle: togglePlay, skip: skip,
    load: function (id, opts) { loadChapter(id, opts); },
    setEdition: setEdition, cycleSpeed: cycleSpeed,
    setSleep: setSleep, sleepRemaining: sleepRemaining,
    voiceTime: voiceTime, voiceDur: voiceDur, fileDur: fileDur,
    audio: els.audio, fmtTime: fmtTime, chapterTitle: chapterTitle,
    seekToRatio: seekToRatio
  };
})();
