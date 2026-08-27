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
    els.audio.addEventListener('loadedmetadata', function onReady() {
      els.audio.removeEventListener('loadedmetadata', onReady);
      setPlayerState(state.playing ? 'playing' : 'paused');
      if (resumeAt > 1 && resumeAt < voiceDur() - 2) {
        try { els.audio.currentTime = resumeAt + offset(); } catch (e) {}
      }
      if (opts.autoplay) play();
    });
    els.audio.addEventListener('error', function onErr() {
      els.audio.removeEventListener('error', onErr);
      setPlayerState('error');
      announce('This chapter could not be loaded. Check your connection and try again.');
    });
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
    var music = state.edition === 'music';
    els.editionBtn.textContent = music ? '♪' : '¶';
    els.editionBtn.title = music ? 'Music edition — tap for voice only' : 'Voice only — tap for music';
    els.editionBtn.setAttribute('aria-pressed', String(music));
  }

  // ---------- transport ----------
  function play() {
    if (!state.chapterId) { loadChapter(CHAPTER_IDS[0], { autoplay: true }); return; }
    var p = els.audio.play();
    if (p && p.catch) p.catch(function () {});
    state.playing = true;
    els.playBtn.textContent = '❚❚';
    els.playBtn.setAttribute('aria-label', 'Pause');
    setPlayerState('playing');
    updateHoldVisibility();
    emit('panim:play-state', { playing: true });
  }
  function pause() {
    els.audio.pause();
    state.playing = false;
    els.playBtn.textContent = '▶';
    els.playBtn.setAttribute('aria-label', 'Play');
    setPlayerState('paused');
    updateHoldVisibility();
    emit('panim:play-state', { playing: false });
  }
  function togglePlay() { state.playing ? pause() : play(); }
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
  function renderSeekMarks() {
    els.seekMarks.innerHTML = CHAPTER_IDS.map(function (id, i) {
      var pct = (i / (CHAPTER_IDS.length - 1)) * 100;
      var cls = 'seek-mark' + (state.completed[id] ? ' is-complete' : '') + (id === state.chapterId ? ' is-current' : '');
      return '<span class="' + cls + '" style="left:' + pct + '%" data-mark-chapter="' + id + '" title="' + chapterTitle(id).replace(/"/g, '') + '"></span>';
    }).join('');
  }

  function updateSeekUI() {
    var dur = fileDur(), cur = els.audio.currentTime || 0;
    var pct = dur ? (cur / dur) * 100 : 0;
    els.seekFill.style.width = pct + '%';
    els.seekHandle.style.left = pct + '%';
    els.seekbar.setAttribute('aria-valuenow', Math.round(pct));
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
    els.seekbar.addEventListener('pointerdown', function (e) { dragging = true; seekToRatio(ratioFromEvent(e)); });
    window.addEventListener('pointermove', function (e) { if (dragging) seekToRatio(ratioFromEvent(e)); });
    window.addEventListener('pointerup', function () { dragging = false; });
    els.seekbar.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); skip(5); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); skip(-5); }
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
  function showCompletion(reason) {
    els.completionBody.textContent = reason === 'sleep'
      ? 'Sleep timer ended. Your place is saved.'
      : "You've finished this chapter.";
    els.completionModal.hidden = false;
    els.completionNext.onclick = function () {
      els.completionModal.hidden = true;
      var next = CHAPTER_IDS[CHAPTER_IDS.indexOf(state.chapterId) + 1];
      if (next) loadChapter(next, { autoplay: true });
    };
    els.completionBookmark.onclick = function () {
      LS.set('lastChapter', state.chapterId);
      LS.set('lastPos', voiceTime());
      els.completionModal.hidden = true;
      announce('Bookmarked. Come back anytime.');
    };
    els.completionClose.onclick = function () { els.completionModal.hidden = true; };
  }

  // ---------- MediaSession ----------
  function updateMediaSession(id) {
    if (!('mediaSession' in navigator)) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: chapterTitle(id),
        artist: 'Jonathan Diaso',
        album: 'PANIM — The Invitation Hidden on Every Page',
        artwork: [{ src: 'og-image.png', sizes: '1200x630', type: 'image/png' }]
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
    els.audio.addEventListener('timeupdate', function () {
      updateSeekUI();
      // sync.js and the dawn arc consume VOICE-timeline time
      emit('panim:narration-timeupdate', { currentTime: voiceTime(), ratio: voiceDur() ? voiceTime() / voiceDur() : 0 });
      if (els.audio.duration && els.audio.currentTime / els.audio.duration >= 0.8) preloadNext();
    });
    els.audio.addEventListener('ended', function () {
      markComplete(state.chapterId);
      emit('panim:narration-stopped');
      if (state.sleepMode === 'chapter') { setSleep('off'); pause(); showCompletion('sleep'); return; }
      pause();
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
    emit('panim:follow-change', { on: on });
  }

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
    els.editionBtn.addEventListener('click', toggleEdition);
    els.followBtn.addEventListener('click', function () { setFollow(!state.follow); });
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
  }

  function init() {
    state.speed = LS.get('speed', 1);
    state.edition = LS.get('edition', 'music') === 'voice' ? 'voice' : 'music';
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
