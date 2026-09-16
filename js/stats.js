// VISITOR AND LISTENING STATS — anonymous counts sent to PostHog. OFF until
// content/stats-key.js carries a key.
//
// The author, 2026-09-16: "how many people access the website and how much they listen
// … how many full listens how many partials where peoples favorite spots are."
//
// 🛑 NO POSTHOG LIBRARY. posthog-js is ~60 KB and this site is 218 KB gzipped with the
// whole book in it. The capture API takes plain JSON, so this file builds the events
// itself and posts them in batches.
//
// 🛑 ANONYMOUS BY CONSTRUCTION. No cookies, no names, no session recordings, no
// autocapture of clicks or text. One random id in localStorage so a returning reader is
// one reader, and $process_person_profile:false so PostHog builds no profile from it.
// A browser sending Global Privacy Control or Do Not Track is not counted at all.
//
// WHAT IS SENT, and the question each one answers:
//   $pageview        a visit — country and city come from PostHog's IP lookup; `from`
//                    is the ?from= tag on a link the author sent
//   $pageleave       engaged_seconds: time the page was actually on screen
//   chapter_read     a chapter held on screen for 20 s — readers who never press play
//   listen_start     play pressed on a chapter (once per chapter per visit)
//   listen_progress  25 / 50 / 75 % of a chapter heard — partials
//   listen_complete  95 % — a full listen
//   minute_heard     30 s of real playback inside one minute of a chapter — the
//                    favorite-spots chart is these, broken down by chapter and minute
//   rewind           a jump backwards inside a chapter — the lines people go back for
//   book_complete    all ten chapters completed on this device, per language
//   download         Download pressed: one chapter, all, or the other language
//   share_passage    the quote pill's share
//   language_change  the globe
//
// 🛑 BUDGET. PostHog's free tier is 1M events a month. A whole-book listen is ~330
// minute_heard events plus a few dozen others, so the free tier holds about 2,500
// whole-book listens a month before it stops counting (it does not bill without a card).
// Listening with no signal is not counted: a failed batch is dropped, not stored.
(function () {
  'use strict';

  var cfg = self.PANIM_STATS || {};
  if (!cfg.key) return;
  if (location.protocol !== 'https:' && !cfg.allowHttp) return;
  if (navigator.globalPrivacyControl === true || navigator.doNotTrack === '1') return;

  var SESSION_IDLE_MS = 30 * 60 * 1000;
  var FLUSH_MS = 10000;
  var MAX_QUEUE = 200;
  var ID_KEY = 'panim:stats-id';
  var SESSION_KEY = 'panim:stats-session';
  var DONE_KEY = 'panim:stats-completed';

  function store(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) { return null; }
    return v;
  }

  function uuid4() {
    if (self.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  // PostHog reads a session's start time out of the id, so session ids are UUIDv7:
  // 48 bits of milliseconds, then the version, then random.
  function uuid7() {
    var hex = Date.now().toString(16).padStart(12, '0');
    var rand = uuid4().replace(/-/g, '').slice(12);
    var s = hex + '7' + rand.slice(1, 4) + ((parseInt(rand[4], 16) & 0x3) | 0x8).toString(16) + rand.slice(5, 20);
    return s.slice(0, 8) + '-' + s.slice(8, 12) + '-' + s.slice(12, 16) + '-' + s.slice(16, 20) + '-' + s.slice(20, 32);
  }

  var distinctId = store(ID_KEY) || store(ID_KEY, uuid4()) || uuid4();

  function sessionId() {
    var now = Date.now();
    var saved = null;
    try { saved = JSON.parse(store(SESSION_KEY) || 'null'); } catch (e) {}
    if (!saved || now - saved.at > SESSION_IDLE_MS) saved = { id: uuid7(), at: now };
    saved.at = now;
    store(SESSION_KEY, JSON.stringify(saved));
    return saved.id;
  }

  // PostHog's own library fills these from the user agent; with no library, this does.
  function device() {
    var ua = navigator.userAgent;
    var os = /iPhone|iPad|iPod/.test(ua) ? 'iOS'
      : /Android/.test(ua) ? 'Android'
      : /Mac OS X/.test(ua) ? (navigator.maxTouchPoints > 1 ? 'iOS' : 'Mac OS X')
      : /Windows/.test(ua) ? 'Windows'
      : /CrOS/.test(ua) ? 'Chrome OS'
      : /Linux/.test(ua) ? 'Linux' : 'Other';
    var browser = /Edg\//.test(ua) ? 'Microsoft Edge'
      : /CriOS|Chrome\//.test(ua) ? 'Chrome'
      : /FxiOS|Firefox\//.test(ua) ? 'Firefox'
      : /Safari\//.test(ua) ? (/FBAN|FBAV|Instagram/.test(ua) ? 'In-app browser' : 'Safari') : 'Other';
    var type = /iPad/.test(ua) || (os === 'iOS' && Math.min(screen.width, screen.height) >= 700) ? 'Tablet'
      : /Mobi|iPhone|Android/.test(ua) ? 'Mobile' : 'Desktop';
    return { $os: os, $browser: browser, $device_type: type };
  }

  function referringDomain() {
    try { return document.referrer ? new URL(document.referrer).host : '$direct'; } catch (e) { return '$direct'; }
  }

  var params = new URLSearchParams(location.search);
  var from = params.get('from') || params.get('utm_source') || null;
  var base = Object.assign(device(), {
    $lib: 'panim-site',
    $host: location.host,
    $pathname: location.pathname,
    $referrer: document.referrer || '$direct',
    $referring_domain: referringDomain(),
    $screen_width: screen.width,
    $viewport_width: innerWidth,
    $process_person_profile: false,
    from: from,
    utm_source: from,
    site_version: (document.querySelector('script[src*="js/stats.js?v="]') || { src: '' }).src.split('v=')[1] || null
  });

  var queue = [];
  function capture(event, props) {
    var P = window.PanimPlayer;
    var properties = Object.assign({}, base, {
      distinct_id: distinctId,
      $session_id: sessionId(),
      $current_url: location.href,
      lang: P ? P.state.lang : null
    }, props || {});
    queue.push({ event: event, properties: properties, timestamp: new Date().toISOString(), uuid: uuid7() });
    if (queue.length > MAX_QUEUE) queue.splice(0, queue.length - MAX_QUEUE);
    // A phone playing with the screen locked may never fire the timer; send as it fills.
    if (queue.length >= 25) flush();
  }

  function flush(leaving) {
    if (!queue.length) return;
    var batch = queue.splice(0, queue.length);
    var body = JSON.stringify({ api_key: cfg.key, batch: batch });
    var url = cfg.host.replace(/\/$/, '') + '/batch/';
    // A string body is sent as text/plain, which keeps this a simple request with no
    // CORS preflight. keepalive lets the last batch leave with the page.
    try {
      fetch(url, { method: 'POST', body: body, keepalive: !!leaving && body.length < 60000 })
        .catch(function () {});
    } catch (e) {}
  }
  setInterval(flush, FLUSH_MS);

  // ── the visit ───────────────────────────────────────────────────────────────
  var visibleSince = document.visibilityState === 'visible' ? Date.now() : null;
  var engagedMs = 0;
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      visibleSince = Date.now();
      return;
    }
    if (visibleSince) engagedMs += Date.now() - visibleSince;
    visibleSince = null;
    flush(true);
  });
  addEventListener('pagehide', function () {
    if (visibleSince) engagedMs += Date.now() - visibleSince;
    visibleSince = null;
    capture('$pageleave', { engaged_seconds: Math.round(engagedMs / 1000) });
    flush(true);
  });
  capture('$pageview');

  // ── reading ─────────────────────────────────────────────────────────────────
  var READ_DWELL_MS = 20000;
  var readTimer = null;
  var readCounted = {};
  function chapterIdFromNum(n) {
    var num = parseInt(n, 10);
    return num >= 1 && num <= 10 ? 'ch' + String(num).padStart(2, '0') : null;
  }
  document.addEventListener('panim:section-change', function (e) {
    clearTimeout(readTimer);
    var id = chapterIdFromNum(e.detail && e.detail.ch);
    if (!id || readCounted[id]) return;
    readTimer = setTimeout(function () {
      readCounted[id] = true;
      capture('chapter_read', { chapter: id });
    }, READ_DWELL_MS);
  });

  // ── listening ───────────────────────────────────────────────────────────────
  var MINUTE_HEARD_S = 30;
  var REWIND_MIN_S = 4;
  var REWIND_THROTTLE_MS = 3000;
  var chapter = null;
  var playing = false;
  var lastT = null;
  var lastRatio = null;
  var lastRewindAt = 0;
  var started = {};
  var marks = {};
  var minuteSecs = {};
  var minuteSent = {};

  function title(id) {
    var P = window.PanimPlayer;
    return P && id ? P.chapterTitle(id) : null;
  }
  function listenProps(extra) {
    return Object.assign({ chapter: chapter, chapter_title: title(chapter) }, extra || {});
  }
  function key(suffix) {
    var P = window.PanimPlayer;
    return (P ? P.state.lang : 'en') + ':' + chapter + ':' + suffix;
  }

  document.addEventListener('panim:chapter-loaded', function (e) {
    chapter = e.detail.chapterId;
    lastT = null;
    lastRatio = null;
  });
  document.addEventListener('panim:lang-change', function (e) {
    lastT = null;
    lastRatio = null;
    if (e.detail && !e.detail.initial) capture('language_change', { to: e.detail.lang });
  });

  // The player may load its chapter before this file is listening; its state is the truth.
  function syncChapter() {
    var P = window.PanimPlayer;
    if (P && P.state.chapterId) chapter = P.state.chapterId;
  }

  document.addEventListener('panim:play-state', function (e) {
    syncChapter();
    playing = !!e.detail.playing;
    lastT = null;
    lastRatio = null;
    if (!playing || !chapter || started[key('start')]) return;
    started[key('start')] = true;
    var O = window.PanimOffline;
    var P = window.PanimPlayer;
    capture('listen_start', listenProps({
      saved_offline: !!(O && O.isCached(chapter)),
      speed: P ? P.state.speed : 1
    }));
  });

  function markCompleted() {
    var P = window.PanimPlayer;
    if (!P) return;
    var done = {};
    try { done = JSON.parse(store(DONE_KEY) || '{}'); } catch (e) {}
    var lang = P.state.lang;
    var list = done[lang] || [];
    if (list.indexOf(chapter) === -1) list.push(chapter);
    done[lang] = list;
    var whole = P.ids.every(function (id) { return list.indexOf(id) !== -1; });
    if (whole && !done[lang + ':book']) {
      done[lang + ':book'] = true;
      capture('book_complete', {});
    }
    store(DONE_KEY, JSON.stringify(done));
  }

  document.addEventListener('panim:narration-timeupdate', function (e) {
    syncChapter();
    if (!chapter || !playing) return;
    var t = e.detail.currentTime;
    var ratio = e.detail.ratio;

    // 🛑 A MILESTONE COUNTS ONLY WHEN PLAYBACK CARRIES THROUGH IT. Dragging the seek bar
    // to the end is not a full listen; resuming at 40% and playing past 50% is 50%.
    var heard = lastT !== null && t - lastT > 0 && t - lastT < 2;
    if (lastT !== null) {
      var delta = t - lastT;
      if (heard) {
        var minute = Math.floor(t / 60);
        var mk = key('m' + minute);
        minuteSecs[mk] = (minuteSecs[mk] || 0) + delta;
        if (minuteSecs[mk] >= MINUTE_HEARD_S && !minuteSent[mk]) {
          minuteSent[mk] = true;
          capture('minute_heard', listenProps({ minute: minute }));
        }
      } else if (delta < -REWIND_MIN_S && Date.now() - lastRewindAt > REWIND_THROTTLE_MS) {
        lastRewindAt = Date.now();
        capture('rewind', listenProps({
          to_minute: Math.floor(t / 60),
          from_minute: Math.floor(lastT / 60),
          seconds_back: Math.round(-delta)
        }));
      }
    }
    var prevRatio = lastRatio;
    lastT = t;
    lastRatio = ratio;
    if (!heard) return;

    [25, 50, 75].forEach(function (pct) {
      if (prevRatio * 100 < pct && ratio * 100 >= pct && !marks[key(pct)]) {
        marks[key(pct)] = true;
        capture('listen_progress', listenProps({ percent: pct }));
      }
    });
    if (prevRatio < 0.95 && ratio >= 0.95 && !marks[key('done')]) {
      marks[key('done')] = true;
      capture('listen_complete', listenProps({}));
      markCompleted();
    }
  });

  // The quote pill shares the selected passage, which may be in any chapter.
  function selectedChapter() {
    var sel = document.getSelection && document.getSelection();
    var node = sel && sel.anchorNode;
    var el = node && (node.nodeType === 1 ? node : node.parentElement);
    var section = el && el.closest('[data-ch]');
    return section ? chapterIdFromNum(section.getAttribute('data-ch')) : null;
  }

  // ── the buttons ─────────────────────────────────────────────────────────────
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('#save-all-audio, #save-other-audio, [data-dl-chapter], .quote-pill');
    if (!el) return;
    if (el.id === 'save-all-audio') capture('download', { what: 'all' });
    else if (el.id === 'save-other-audio') capture('download', { what: 'other language' });
    else if (el.hasAttribute('data-dl-chapter')) capture('download', { what: 'chapter', chapter: el.getAttribute('data-dl-chapter') });
    else capture('share_passage', { chapter: selectedChapter() });
  }, true);
})();
