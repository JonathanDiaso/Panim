// PANIM — sync.js
// Text-sync engine (11-website-plan.md §7.6, C14). Loads cues/chNN.json — an array of
// {t: seconds, id: blockId} in playback order. No-ops gracefully when a cue file is
// missing, empty, or unfetchable (e.g. under file:// where fetch() is blocked by CORS —
// the reading experience must never depend on this). While "Follow" is on and narration
// is playing, the current paragraph/verse (matched by data-cue-id) gets a glow and the
// page auto-scrolls it into the center third of the viewport.
//
// Reading ahead SUSPENDS following; it does not end it. The old rule — any scroll event
// sets a userScrollBroke flag that only setFollow(true) ever clears — killed the feature
// in ordinary use two ways, and the button went on claiming Follow was active while
// nothing followed:
//
//   1. The `scroll` event does not distinguish the reader from us. Our own smooth
//      auto-scroll fires scroll for the length of its animation, and a long jump runs
//      well past the 700ms grace window, so following broke itself on its first move.
//   2. lastAutoScrollAt starts at 0, so ANY scroll before the first auto-scroll — a
//      glance at the contents while chapter I buffers — broke follow before it began.
//
// So: only a real gesture (wheel, touch drag, a scrolling key) suspends. Following then
// resumes on its own when the narration catches up to where the reader is looking, or
// after RESUME_IDLE of no gesture — and while it is suspended the player says so.

(function () {
  'use strict';

  var cuesCache = {};   // chapterId -> [{t, id}] (empty array on any failure)
  var currentChapterId = null;
  var currentCues = [];
  var currentIndex = -1;
  var liveEl = null;
  var followEnabled = true;
  var suspended = false;        // reader is reading ahead; following resumes on its own
  var lastGestureAt = 0;
  var resumeTimer = null;
  var autoTarget = null;        // the scrollY our own auto-scroll last asked for
  var autoUntil = 0;
  var RESUME_IDLE = 12000;      // hands off this long and the page starts following again
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fetchCues(chapterId) {
    if (cuesCache[chapterId]) return Promise.resolve(cuesCache[chapterId]);
    return fetch('cues/' + chapterId + '.json')
      .then(function (r) { return r.ok ? r.json() : []; })
      .catch(function () { return []; })
      .then(function (data) {
        var cues = Array.isArray(data) ? data.slice().sort(function (a, b) { return a.t - b.t; }) : [];
        cuesCache[chapterId] = cues;
        return cues;
      });
  }

  function setChapter(chapterId) {
    if (chapterId === currentChapterId) return;
    currentChapterId = chapterId;
    currentIndex = -1;
    clearLive();
    setSuspended(false);   // a new chapter is a fresh start, not a continued read-ahead
    fetchCues(chapterId).then(function (cues) { currentCues = cues; });
  }

  function clearLive() {
    if (liveEl) {
      liveEl.classList.remove('is-live', 'is-live-paragraph');
      liveEl = null;
    }
  }

  function setLive(id) {
    if (liveEl && liveEl.getAttribute('data-cue-id') === id) return;
    clearLive();
    var el = document.querySelector('[data-cue-id="' + cssEscape(id) + '"]');
    if (!el) return;
    el.classList.add('is-live');
    liveEl = el;

    // the narration reaching the paragraph the reader scrolled to means they are back
    // together: stop suspending rather than making them find the button
    if (suspended && isComfortablyInView(el)) setSuspended(false);

    if (followEnabled && !suspended) {
      scrollIntoCenterThird(el);
    }
    document.dispatchEvent(new CustomEvent('panim:cue-live', { detail: { id: id, el: el } }));
    if (id.indexOf('fivewords') !== -1) {
      document.dispatchEvent(new CustomEvent('panim:cue-fivewords'));
    }
  }

  function cssEscape(s) {
    return String(s).replace(/["\\]/g, '\\$&');
  }

  // THE READABLE BAND, not the viewport. The sticky running head covers the top and the
  // transport bar covers the bottom (114px desktop / 92px phone, 0 while the bar is
  // hidden — --player-h in css/player.css is the single source). Measuring against the
  // raw viewport meant a paragraph sitting entirely *behind the player* counted as
  // "comfortably in view", so following declined to scroll to the line being read —
  // worst on a phone, where the bar is a larger share of the screen.
  function readableBand() {
    var nav = document.getElementById('site-nav');
    var top = nav ? Math.max(0, nav.getBoundingClientRect().bottom) : 0;
    var playerH = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--player-h')
    ) || 0;
    return { top: top, bottom: window.innerHeight - playerH };
  }

  function isComfortablyInView(el) {
    var r = el.getBoundingClientRect();
    var band = readableBand();
    return r.top >= band.top && r.bottom <= band.bottom;
  }

  function scrollIntoCenterThird(el) {
    var r = el.getBoundingClientRect();
    var band = readableBand();
    var height = Math.max(1, band.bottom - band.top);
    var third = band.top + height / 3;
    if (r.top >= third && r.bottom <= band.top + (height / 3) * 2) return; // centred enough
    // Centre the line in the band, not in the window, so it does not settle low under
    // the transport bar.
    var targetY = Math.max(0, window.scrollY + r.top - (band.top + height / 2 - r.height / 2));
    autoTarget = targetY;
    autoUntil = Date.now() + 2500;   // longest a smooth scroll should still be running
    window.scrollTo({ top: targetY, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  // Wheel, touch and keys cover the reader almost always — but not a scrollbar drag,
  // which produces `scroll` and nothing else. So the scroll event is still consulted,
  // target-aware this time: while our own smooth scroll is converging on the top we
  // asked for, the events are ours. One that lands somewhere we did not ask for is
  // the reader, and that is the whole distinction the old 700ms timer failed to draw.
  function onScroll() {
    if (!followEnabled || suspended) return;
    if (autoTarget !== null && Date.now() < autoUntil) {
      if (Math.abs(window.scrollY - autoTarget) < 4) { autoTarget = null; }   // arrived
      return;                                                                 // in flight
    }
    if (autoTarget !== null) { autoTarget = null; return; }  // animation ended, let it settle
    onUserGesture();
  }

  // Only a gesture counts. The `scroll` event fires for our own smooth animation too,
  // which is what used to make following break itself; wheel/touch/keys are the reader.
  function onUserGesture() {
    if (!followEnabled) return;
    // the Listening Room covers the page; a gesture there is not the reader reading
    // ahead, and suspending would strand them when they tap Read to drop back down
    if (document.body.classList.contains('room-open')) return;
    lastGestureAt = Date.now();
    if (!suspended) setSuspended(true);
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(function () {
      if (Date.now() - lastGestureAt >= RESUME_IDLE - 50) {
        setSuspended(false);
        if (liveEl) scrollIntoCenterThird(liveEl);
      }
    }, RESUME_IDLE);
  }

  function setSuspended(on) {
    if (suspended === on) return;
    suspended = on;
    if (!on && resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
    // the player bar owns the Follow button; it must not go on claiming to follow
    document.dispatchEvent(new CustomEvent('panim:follow-suspended', { detail: { suspended: on } }));
  }

  var SCROLL_KEYS = {
    ArrowUp: 1, ArrowDown: 1, PageUp: 1, PageDown: 1, Home: 1, End: 1, ' ': 1, Spacebar: 1
  };

  function onTimeUpdate(currentTime) {
    if (!currentCues.length) return;
    var idx = -1;
    for (var i = 0; i < currentCues.length; i++) {
      if (currentCues[i].t <= currentTime) idx = i; else break;
    }
    if (idx !== currentIndex) {
      currentIndex = idx;
      if (idx >= 0) setLive(currentCues[idx].id);
    }
  }

  function setFollow(on) {
    followEnabled = on;
    if (on) {
      setSuspended(false);
      if (liveEl) scrollIntoCenterThird(liveEl);   // tapping Follow takes you to the voice
    }
  }

  window.addEventListener('wheel', onUserGesture, { passive: true });
  window.addEventListener('touchmove', onUserGesture, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('keydown', function (e) {
    // Space is the player's play/pause, not a scroll, once the page is not focused on
    // the document body — but a reader pressing PageDown is unambiguously reading ahead
    if (SCROLL_KEYS[e.key] && e.key !== ' ' && e.key !== 'Spacebar') onUserGesture();
  });

  document.addEventListener('panim:chapter-loaded', function (e) {
    setChapter(e.detail.chapterId);
  });
  document.addEventListener('panim:narration-timeupdate', function (e) {
    onTimeUpdate(e.detail.currentTime);
  });
  document.addEventListener('panim:follow-change', function (e) {
    setFollow(!!e.detail.on);
  });
  document.addEventListener('panim:narration-stopped', function () {
    clearLive();
    currentIndex = -1;
  });

  // exposed for player.js / debugging
  window.PANIM_SYNC = {
    setChapter: setChapter,
    setFollow: setFollow,
    state: function () {
      return { follow: followEnabled, suspended: suspended, cues: currentCues.length,
               live: liveEl && liveEl.id, chapter: currentChapterId };
    }
  };
})();
