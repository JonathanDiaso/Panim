// PANIM — sync.js
// Text-sync engine (11-website-plan.md §7.6, C14). Loads cues/chNN.json — an array of
// {t: seconds, id: blockId} in playback order. No-ops gracefully when a cue file is
// missing, empty, or unfetchable (e.g. under file:// where fetch() is blocked by CORS —
// the reading experience must never depend on this). While "Follow" is on and narration
// is playing, the current paragraph/verse (matched by data-cue-id) gets a glow and the
// page auto-scrolls it into the center third of the viewport; a manual user scroll
// breaks follow until the listener re-enables it.

(function () {
  'use strict';

  var cuesCache = {};   // chapterId -> [{t, id}] (empty array on any failure)
  var currentChapterId = null;
  var currentCues = [];
  var currentIndex = -1;
  var liveEl = null;
  var followEnabled = true;
  var userScrollBroke = false;
  var lastAutoScrollAt = 0;

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

    if (followEnabled && !userScrollBroke) {
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

  function scrollIntoCenterThird(el) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight;
    var third = vh / 3;
    if (r.top >= third && r.bottom <= third * 2) return; // already centered enough
    var targetY = window.scrollY + r.top - (vh / 2 - r.height / 2);
    lastAutoScrollAt = Date.now();
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
  }

  // a scroll that happens shortly after our own auto-scroll is ignored; anything else
  // while playing + following counts as the user breaking follow
  function onUserScroll() {
    if (Date.now() - lastAutoScrollAt < 700) return;
    if (followEnabled) userScrollBroke = true;
  }

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
    if (on) userScrollBroke = false;
  }

  window.addEventListener('scroll', onUserScroll, { passive: true });

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
  window.PANIM_SYNC = { setChapter: setChapter, setFollow: setFollow };
})();
