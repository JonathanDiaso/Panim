// PANIM — player.js (v2)
// The audio engine. SITE-V2-PLAN.md §6. ONE edition: audio/music/chNN.m4a, the
// mastered piano bed. No live mixing, ever: the mix was mastered by ear.
//
// 🛑 THE SECOND EDITION IS GONE, 2026-09-09, AND IT IS NOT COMING BACK BY ACCIDENT.
// The author, 2026-08-26: "the voice sounds better when it's actually connected to
// the music" — and again 2026-09-09: "delete othr voice path we just ned the one
// voice path in our coding." This file used to carry a full second code path —
// state.edition, setEdition, toggleEdition, updateEditionButtons, an edition-keyed
// preload cache, an edition-change event and two DOM buttons — for
// `audio/voice/chNN.m4a`, WHICH HAS NEVER EXISTED ON THIS SITE. `audio/` holds
// `music/` and nothing else, so every voice branch resolved to a 404. It was
// switched off at init() rather than removed, so it read as a live feature.
// ⚠️ THE VOICE-ONLY MASTER IS NOT LOST — it lives in the audio repo. Restoring the
// toggle means re-adding `audio/voice/`, the buttons, and this path; the shape is
// in git at v69. Do not re-add the branching before the files exist.
//
// TIMELINE RULE: every position this file stores, dispatches, or accepts is on the
// VOICE timeline (cues/*.json's clock) — that name is about the CLOCK, not about an
// edition, and it stays. The music master prepends 6.0s of music-alone lead-in
// (content/audio-manifest.js musicOffset), so:
//   fileTime = voiceTime + offset()   ·   voiceTime = fileTime − offset()

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
    resumeToastPlace: document.getElementById('resume-toast-place'),
    resumeToastYes: document.getElementById('resume-toast-yes'),
    resumeToastDismiss: document.getElementById('resume-toast-dismiss'),
    ariaLive: document.getElementById('aria-live')
  };

  var SPEEDS = [0.9, 1, 1.1, 1.25];
  var state = {
    chapterId: null,
    playing: false,
    speed: 1,
    volume: 1,
    follow: true,
    sleepMode: 'off',
    sleepTimer: null,
    sleepEndsAt: null,
    sleepFading: false,
    completed: {},
    inPrayerZone: false,
    // 🔴 CONTINUOUS PLAY, 2026-09-05. The author: "Should i have an option that
    // doesnt stop at every chapter or just keep stopping at chapter breaks?"
    // Both, and the default is continuous — this is an audiobook, and a book read
    // aloud that stops dead at every chapter end and puts a dialog in front of a
    // reader who has fallen asleep is a book that has to be restarted eleven times.
    // The Room carries the switch (js/room.js, #room-auto). Set in init() from
    // storage, because `state` is built before LS is reachable in a way that reads
    // cleanly here.
    autoAdvance: true
  };

  var LS = {
    get: function (k, fb) { try { var v = localStorage.getItem('panim:' + k); return v === null ? fb : JSON.parse(v); } catch (e) { return fb; } },
    set: function (k, v) { try { localStorage.setItem('panim:' + k, JSON.stringify(v)); } catch (e) {} }
  };

  function offset() { return (MAN[state.chapterId] || {}).musicOffset || 6.0; }
  function voiceDur() { return (MAN[state.chapterId] || {}).voiceDur || 0; }
  function fileDur() { return els.audio.duration || (MAN[state.chapterId] || {}).musicDur || voiceDur() || 0; }
  function voiceTime() { return Math.max(0, (els.audio.currentTime || 0) - offset()); }
  function src(id) { return 'audio/music/' + id + '.m4a'; }

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

  // One place that knows how this file scrolls. js/ui.js owns the distance rule —
  // a jump longer than three screens lands instead of animating, because animating
  // it renders every chapter in between while the decoder wants the main thread.
  // The fallback matters: this file must still work if ui.js has not run.
  function scrollTo_(el, block) {
    if (!el) return;
    if (window.PanimScroll) window.PanimScroll.intoView(el, block || 'start');
    else el.scrollIntoView({ behavior: 'smooth', block: block || 'start' });
  }

  function setPlayerState(s) { els.player.setAttribute('data-state', s); }
  function announce(msg) { if (els.ariaLive) els.ariaLive.textContent = msg; }
  function emit(name, detail) { document.dispatchEvent(new CustomEvent(name, { detail: detail || {} })); }

  // ---------- load ----------
  function loadChapter(chapterId, opts) {
    opts = opts || {};

    // 🛑 A CHAPTER THAT CANNOT POSSIBLY LOAD IS REFUSED BEFORE IT STALLS — 2026-09-09.
    // Measured with the network emulated off: an uncached chapter does NOT raise `error`
    // on the media element. It sits at readyState 0 indefinitely — no error, no metadata,
    // no timeupdate — so the old code set 'loading' and left the reader with a pressed
    // play button over silence for as long as they were willing to wait. js/offline.js
    // knows there is no network AND that nothing is stored, which together mean there is
    // nothing to fetch; it says so instead, in #offline-note.
    // ⚠️ NOTHING IS MUTATED ON THIS PATH. Whatever is playing keeps playing — the reader
    // asked for a different chapter and did not get it; that is not a reason to stop the
    // one they already had.
    if (window.PanimOffline && window.PanimOffline.blocked(chapterId)) {
      emit('panim:audio-error', { chapterId: chapterId, offline: true, blocked: true });
      return;
    }

    state.chapterId = chapterId;
    els.metaTitle.textContent = chapterTitle(chapterId);
    setPlayerState('loading');
    els.audio.src = src(chapterId);
    els.audio.load();
    emit('panim:chapter-loaded', { chapterId: chapterId });
    updateMediaSession(chapterId);
    renderSeekMarks();

    // 🔴 A CHAPTER YOU CHOOSE STARTS AT ITS BEGINNING, 2026-09-05. The author:
    // "whehether each ch individual clcik shoudl start at the beggining of chapter
    //  or bring you to last listened location within the chapter seems like
    //  beggining is realistic unless tyou are actually contoinuing from where you
    //  left off but switching chapter would be the beggining."
    // This used to fall back to LS 'pos:<chapter>' — a per-chapter bookmark — so
    // tapping chapter III in the ribbon or the chapters sheet dropped the reader
    // eleven minutes into it, in the middle of a sentence, with no way to say
    // "no, from the top". Choosing a chapter is choosing to hear it; only
    // CONTINUING is continuing.
    // ⚠️ THE ONE PLACE THAT STILL RESUMES IS THE ONE THAT MEANS IT. The jacket's
    // Continue button and the resume toast both read 'lastChapter'/'lastPos' and
    // pass the position in as opts.seekTo, which this line still honours. (The
    // edition switch was the third caller and it is gone — see the header.)
    // 🛑 'pos:<chapter>' IS NOT WRITTEN ANY MORE EITHER — see savePosition below.
    // A store nothing reads is a trap for whoever reads this file next.
    var resumeAt = opts.seekTo != null ? opts.seekTo : 0; // voice timeline

    // Both listeners come off together, whichever fires. They used to remove only
    // themselves, so a chapter that errored left its `loadedmetadata` handler behind
    // and every later load stacked another one — each closing over a stale resumeAt
    // and a stale autoplay flag, which is how switching chapters could seek or start
    // somewhere nobody asked for.
    // The other half of the same lesson. `navigator.onLine` says `true` on a captive
    // hotel portal, and a load that goes nowhere behind one stalls in exactly the way
    // above without ever erroring. Nothing arriving for twelve seconds IS the failure,
    // so it is reported as one. `progress` re-arms the clock, so a slow connection that
    // is still delivering bytes is never cut off — only a dead one is.
    var STALL_MS = 12000;
    var stallTimer = null;
    function armStall() {
      if (stallTimer) clearTimeout(stallTimer);
      stallTimer = setTimeout(function () { if (els.audio.readyState === 0) onErr(); }, STALL_MS);
    }
    function cleanup() {
      els.audio.removeEventListener('loadedmetadata', onReady);
      els.audio.removeEventListener('error', onErr);
      els.audio.removeEventListener('progress', armStall);
      if (stallTimer) { clearTimeout(stallTimer); stallTimer = null; }
    }
    function onReady() {
      cleanup();
      if (resumeAt > 1 && resumeAt < voiceDur() - 2) {
        try { els.audio.currentTime = resumeAt + offset(); } catch (e) {}
      } else if (opts.skipIntro && offset() > 0) {
        // ⭐ NO SECOND OVERTURE ON AUTO-ADVANCE, 2026-09-06.
        // MEASURED, all ten chapters, from content/audio-manifest.js: the master
        // carries a 6.0s lead-in before the voice and a 12.0s tail after it
        // (musicDur − voiceDur − musicOffset = 12.00 on every one). `ended` fires at
        // the END of the file, so the tail is never clipped — it plays in full. What
        // that produced on continuous play was 12s of outro followed immediately by
        // 6s of intro: EIGHTEEN SECONDS of music between two chapters, plus whatever
        // the next file takes to load. On a phone in a car that does not read as a
        // track break, it reads as the app having stopped.
        // The lead-in exists to OPEN a chapter somebody chose. Nothing needs opening
        // here — the music is already playing. So it is skipped, and only here: a
        // chapter the reader picks still gets its full opening.
        try { els.audio.currentTime = offset(); } catch (e) {}
      }
      // leave 'loading' — set the bar directly, because reflectPlaying() is a no-op
      // when the flag already agrees and would strand data-state on "loading".
      setPlayerState(els.audio.paused ? 'paused' : 'playing');
      syncPlayState();
    }
    function onErr() {
      cleanup();
      setPlayerState('error');
      // 🔴 A LOAD THAT FAILED IS THE ONLY PROOF THERE IS NO NETWORK — 2026-09-09.
      // navigator.onLine says `false` honestly but says `true` for a captive hotel
      // portal that serves nothing, so it is read here only to CHOOSE THE SENTENCE.
      // js/offline.js takes the offline case and puts it on screen in #offline-note,
      // which is role="status" and announces itself: saying it here as well reads the
      // whole thing to a screen reader twice.
      var off = navigator.onLine === false;
      if (!off) announce('This chapter could not be loaded. Check your connection and try again.');
      emit('panim:audio-error', { chapterId: chapterId, offline: off });
    }
    els.audio.addEventListener('loadedmetadata', onReady);
    els.audio.addEventListener('error', onErr);
    els.audio.addEventListener('progress', armStall);
    armStall();

    // ⚠️ iOS SAFARI: play() is only honoured inside the user gesture that asked for it.
    // This call used to live in `onReady` above — a network round trip later, because
    // the <audio> is preload="none" — so on a phone the gesture had already expired and
    // Safari rejected every play(). The rejection was swallowed and state.playing was
    // set anyway, so the button showed ❚❚ over silence and the next tap "paused"
    // nothing that was playing. That is the phone play/pause bug. Start it in the same
    // tick as the tap; the seek above does not need a gesture and can wait for metadata.
    if (opts.autoplay) play();
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
  function syncPlayState() {
    var playing = !els.audio.paused && !els.audio.ended;
    reflectPlaying(playing);
    // Without this the lock screen keeps whatever glyph it inferred at the last
    // interaction, so a pause from CarPlay or an unplugged headphone leaves a ▶ showing
    // over stopped audio. Cheap, and it is the only way the system learns the truth.
    if ('mediaSession' in navigator) {
      try { navigator.mediaSession.playbackState = playing ? 'playing' : 'paused'; } catch (e) {}
    }
  }

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
    // 🛑 THE PER-CHAPTER BOOKMARK IS GONE, 2026-09-05, WITH ITS ONLY READER. See the
    // note in loadChapter: a chapter the reader picks starts at its beginning now,
    // so 'pos:<chapter>' had nothing left to answer. It was written on every
    // timeupdate — four times a second, ten keys — for a value nobody asked for.
    LS.set('lastChapter', state.chapterId);
    LS.set('lastPos', vt);
    updatePositionState();
  }

  function seekToRatio(r) { if (els.audio.duration) els.audio.currentTime = r * els.audio.duration; }

  // 🛑 ONE KEYBOARD FOR EVERY SLIDER ON THE SITE. The transport bar's #seekbar and
  // the Listening Room's #room-seek are both role="slider" over the same <audio>,
  // and they used to carry two hand-written handlers — the Room's knew only
  // ArrowLeft/ArrowRight, so Home, End, PageUp and PageDown did nothing there and a
  // reader who had learned the bar found half of it missing one screen over. The
  // arrow step differs on purpose (fine on the bar, lean-back in the Room); nothing
  // else about them ever should. stopPropagation is what keeps these off the global
  // ArrowLeft/ArrowRight in wireKeyboard.
  function wireSliderKeys(el, step) {
    el.addEventListener('keydown', function (e) {
      var d = 0;
      if (e.key === 'ArrowRight') d = step;
      else if (e.key === 'ArrowLeft') d = -step;
      else if (e.key === 'PageUp') d = 60;
      else if (e.key === 'PageDown') d = -60;
      else if (e.key === 'Home') { e.preventDefault(); e.stopPropagation(); seekToRatio(0); return; }
      else if (e.key === 'End') {
        if (!els.audio.duration) return;
        e.preventDefault(); e.stopPropagation();
        els.audio.currentTime = Math.max(0, els.audio.duration - 1);
        return;
      }
      else return;
      e.preventDefault(); e.stopPropagation(); skip(d);
    });
  }

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
    wireSliderKeys(els.seekbar, 5);
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
      // 🔴 TWO LINES, THE SAME TWO THE JACKET USES — 2026-09-07. This wrote one
      // string: 'Resume "IX. Eyes Opened" at 7:36?'. A verb, a title in quotation
      // marks and a timecode, run together in one sans sentence, next to a bordered
      // button that said Resume a second time. The jacket's #begin-btn was taken off
      // exactly this shape on 2026-09-05 ("could the resume button be any ugglier?")
      // and this one was missed because it only ever appears to a returning reader.
      // ⚠️ NEVER textContent THE BUTTON — the play ring is inside it. Write the spans.
      // ⚠️ THE ACCESSIBLE NAME IS ONE SENTENCE, set here, for the reason the jacket's
      // is: two spans read out with no punctuation between them run together.
      els.resumeToastText.textContent = 'Pick up where you left off';
      els.resumeToastPlace.textContent = chapterTitle(lastChapter) + ' \u00B7 ' + fmtTime(lastPos);
      els.resumeToastPlace.hidden = false;
      els.resumeToastYes.setAttribute('aria-label',
        'Resume ' + chapterTitle(lastChapter) + ', at ' + fmtTime(lastPos));
      els.resumeToast.hidden = false;
      requestAnimationFrame(function () { els.resumeToast.classList.add('is-shown'); });
      els.resumeToastYes.onclick = function () {
        dismissResumeToast();
        loadChapter(lastChapter, { seekTo: lastPos, autoplay: true });
        var sec = document.getElementById(lastChapter);
        // Resuming from the jacket is the longest jump on the site — the reader is at
        // the top and the chapter can be 240,000px down. PanimScroll lands it in one
        // frame instead of animating through every chapter in between (js/ui.js).
        if (sec) scrollTo_(sec, 'start');
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
        artwork: artworkFor(id)
      });
      navigator.mediaSession.setActionHandler('play', play);
      navigator.mediaSession.setActionHandler('pause', pause);
      navigator.mediaSession.setActionHandler('seekbackward', function (d) { skip(-((d && d.seekOffset) || 15)); });
      navigator.mediaSession.setActionHandler('seekforward', function (d) { skip((d && d.seekOffset) || 30); });
      navigator.mediaSession.setActionHandler('seekto', function (d) { if (d.seekTime != null) els.audio.currentTime = d.seekTime; });
      // 🛑 previoustrack/nexttrack are deliberately NULL, and this is not an oversight.
      // iOS gives the lock screen three transport slots and fills them with the track
      // arrows whenever those handlers exist — so registering both meant the author got
      // chapter skip and never the 15-second jump. On an audiobook that is backwards:
      // you lose a sentence constantly and jump chapters almost never, and auto-advance
      // already walks I -> X on its own. Clearing them yields ⟲15 / ⟳30. Setting them
      // to null rather than omitting matters — a handler registered by an earlier
      // updateMediaSession call survives until something overwrites it.
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
    } catch (e) {}
  }

  // One square plate per chapter, built by tools/gen-nowplaying.py. Three tiers because
  // Android's shade, Auto, Wear and Bluetooth head units each pick by size.
  //
  // 🛑 Nothing is printed on these plates. v48 burned a roman numeral into every one of
  // them to fill the compact Dynamic Island, which iOS draws with no text slot at all —
  // the author's instruction is that the photographs stay clean, and it holds even there.
  // The number is in metadata.title, which is what the expanded island, the lock screen
  // and Control Center display. The pill shows the photograph and nothing else, by design.
  //
  // All ten chapters have their own frame as of v50; the generator refuses to run if one
  // is missing rather than quietly shipping a duplicate.
  function artworkFor(id) {
    var n = (MAN[id] || {}).num || parseInt(String(id).slice(2), 10) || 1;
    var stem = 'art/np-ch' + (n < 10 ? '0' : '') + n + '-';
    return [96, 256, 512].map(function (t) {
      return { src: stem + t + '.jpg', sizes: t + 'x' + t, type: 'image/jpeg' };
    });
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
    if (!next || preloaded[next]) return;
    preloaded[next] = true;
    try { var a = new Audio(); a.preload = 'auto'; a.src = src(next); } catch (e) {}
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
      // 🔴 CONTINUOUS PLAY. The modal is the OPT-OUT path now, not the default.
      // ⚠️ THE LAST CHAPTER STILL GETS THE MODAL, and that is the point of the
      // `next` test rather than a plain `if (state.autoAdvance) return advance()`.
      // Chapter X ending is the book ending; there is nothing to advance into and
      // finishing it silently would be the one moment on this site that deserves a
      // sentence and does not get one.
      // ⚠️ AND autoplay IS SAFE HERE WITHOUT A GESTURE. The reader is mid-session
      // on an element that is already playing, so the media engagement that
      // permitted the current chapter carries into the next src on every engine
      // this book supports. It is the same call the completion modal's own "next
      // chapter" button has always made.
      var nextId = CHAPTER_IDS[CHAPTER_IDS.indexOf(state.chapterId) + 1];
      if (state.autoAdvance && nextId) {
        loadChapter(nextId, { autoplay: true, skipIntro: true });
        announce('Continuing with ' + chapterTitle(nextId));
        var sec = document.getElementById(nextId);
        // follow the voice onto the page, exactly as tap-to-listen does — a reader
        // who is reading along must not be left on the previous chapter's last page
        if (state.follow && sec) scrollTo_(sec, 'start');
        return;
      }
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
      // 🛑 A BARE LETTER IS OURS. A LETTER WITH A MODIFIER BELONGS TO THE BROWSER.
      // Without this line Cmd/Ctrl+F toggled Follow instead of opening Find, Cmd+S
      // opened the sleep sheet over a save dialog, and Cmd+L put the Listening Room
      // behind the address bar. js/search.js guards '/' exactly this way; this is
      // the same rule, and there is no longer a second version of it.
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (document.activeElement && document.activeElement.isContentEditable)) return;
      switch (e.key) {
        case ' ': e.preventDefault(); togglePlay(); break;
        case 'ArrowLeft': skip(-15); break;
        case 'ArrowRight': skip(30); break;
        // 🛑 ↑/↓ ARE THE PAGE'S, NOT OURS. They used to preventDefault and then set
        // els.audio.volume — which iOS ignores outright, so on the one device this
        // book is mostly read on they were dead keys that also stopped a 312,000px
        // document from scrolling. There is no on-screen volume control either; the
        // hardware buttons are the volume control. state.volume survives as the
        // restore target the two fades read.
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
    state.completed = LS.get('completed', {});
    setSpeed(state.speed);
    setFollow(state.follow);
    renderSeekMarks();
    wireSeekbar();
    wireAudio();
    wireControls();
    wireKeyboard();
    setPlayerState('idle');
    state.autoAdvance = LS.get('autoAdvance', true) !== false;
    if (!maybeDeepLink()) maybeShowResumeToast();
  }

  function setAutoAdvance(on) {
    state.autoAdvance = !!on;
    LS.set('autoAdvance', state.autoAdvance);
    emit('panim:auto-advance', { on: state.autoAdvance });
    announce(state.autoAdvance
      ? 'Continuous play on. Chapters will follow one another.'
      : 'Continuous play off. Playback stops at the end of each chapter.');
  }

  document.addEventListener('panim:rendered', init);

  // API for js/room.js
  // 🛑 `audio: els.audio` CAME OFF THIS SURFACE, 2026-09-09, AND IT IS A FENCE RATHER
  // THAN A TIDY-UP. Handing the raw <audio> element to another file is what let
  // js/room.js call createMediaElementSource() on it — which permanently reroutes
  // playback through a Web Audio graph, so a context that fails to resume is SILENT
  // NARRATION. That block is gone (see the tombstone in room.js); this closes the door
  // it came through. Its only consumer was that analyser. Everything a caller legitimately
  // needs from the element is already a method here — play, pause, skip, seekToRatio,
  // voiceTime, fileDur. **If you need the element itself, you are about to do something
  // to the audio that this file should be doing instead.**
  window.PanimPlayer = {
    state: state,
    ids: CHAPTER_IDS,
    manifest: MAN,
    play: play, pause: pause, toggle: togglePlay, skip: skip,
    load: function (id, opts) { loadChapter(id, opts); },
    cycleSpeed: cycleSpeed,
    setAutoAdvance: setAutoAdvance,
    setSleep: setSleep, sleepRemaining: sleepRemaining,
    voiceTime: voiceTime, voiceDur: voiceDur, fileDur: fileDur,
    fmtTime: fmtTime, chapterTitle: chapterTitle,
    seekToRatio: seekToRatio, wireSliderKeys: wireSliderKeys,
    // js/offline.js clears this before it shows its own notice — both cards are
    // pinned to the same slot above the bar and would otherwise stack.
    dismissResume: dismissResumeToast
  };
})();
