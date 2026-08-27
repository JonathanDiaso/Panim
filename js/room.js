// PANIM — room.js
// The Listening Room (SITE-V2-PLAN.md §5.3): a full-screen night player over the
// chapter's frontispiece / dawn tokens. Phone-on-the-nightstand product. Controls
// dim after 6s idle; the room's light follows PLAYBACK progress (the chapter's
// token lerps toward the next chapter's as it plays) — "the light reads with you."

(function () {
  'use strict';

  var room = document.getElementById('room');
  if (!room) return;

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
    edition: document.getElementById('room-edition'),
    sleep: document.getElementById('room-sleep'),
    follow: document.getElementById('room-follow'),
    chapters: document.getElementById('room-chapters'),
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

  // ---------- open / close ----------
  function openRoom() {
    if (open) return;
    open = true;
    room.hidden = false;
    document.body.classList.add('room-open');
    requestAnimationFrame(function () { room.classList.add('is-open'); });
    if (!P.state.chapterId) P.load(P.ids[0], {});
    refresh();
    armIdle();
    if (P.state.playing) startPulse();
  }
  function closeRoom() {
    if (!open) return;
    open = false;
    room.classList.remove('is-open');
    document.body.classList.remove('room-open');
    setTimeout(function () { room.hidden = true; }, 350);
    if (idleTimer) clearTimeout(idleTimer);
  }
  function toggleRoom() { open ? closeRoom() : openRoom(); }

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

  // ---------- the light follows playback ----------
  function hexToRgb(h) { var n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function lerpHex(a, b, t) {
    var ca = hexToRgb(a), cb = hexToRgb(b);
    return 'rgb(' + [0, 1, 2].map(function (i) { return Math.round(ca[i] + (cb[i] - ca[i]) * t); }).join(',') + ')';
  }
  function tokensFor(num) {
    var T = window.PANIM_TOKENS || {};
    return T[String(num)] || { bg: '#050409', accent: '#c9a84c', text: '#f0edf4' };
  }
  function paintProgress(ratio) {
    var num = P.manifest[P.state.chapterId] ? P.manifest[P.state.chapterId].num : 1;
    var here = tokensFor(num), next = tokensFor(Math.min(10, num + 1));
    var bg = reduceMotion ? here.bg : lerpHex(here.bg, next.bg, Math.max(0, Math.min(1, ratio)) * 0.6);
    room.style.setProperty('--room-bg', bg);
    room.style.setProperty('--room-accent', here.accent);
  }

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

  // ---------- the room breathes with the voice ----------
  // Same-origin audio, so a Web Audio analyser is available: while the room is open
  // and playing, --pulse (0..1) follows the narration's short-term level, and CSS
  // lets the glow behind the play button breathe with the reading. No beat-sync,
  // no flicker — a 120 ms smoothed swell. Off under prefers-reduced-motion.
  var actx = null, analyser = null, adata = null, pulseRaf = false, pulseSmooth = 0;
  function ensureAnalyser() {
    if (analyser || reduceMotion) return;
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      actx = new Ctx();
      var srcNode = actx.createMediaElementSource(P.audio);
      analyser = actx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.6;
      srcNode.connect(analyser);
      analyser.connect(actx.destination);
      adata = new Uint8Array(analyser.fftSize);
    } catch (e) { analyser = null; }
  }
  function pulseFrame() {
    pulseRaf = false;
    if (!open || !analyser) { room.style.setProperty('--pulse', '0'); return; }
    analyser.getByteTimeDomainData(adata);
    var sum = 0;
    for (var i = 0; i < adata.length; i += 4) { var v = (adata[i] - 128) / 128; sum += v * v; }
    var rms = Math.sqrt(sum / (adata.length / 4));
    var level = Math.min(1, rms * 5);
    pulseSmooth += (level - pulseSmooth) * 0.25;
    room.style.setProperty('--pulse', pulseSmooth.toFixed(3));
    if (P.state.playing) { pulseRaf = true; requestAnimationFrame(pulseFrame); }
  }
  function startPulse() {
    if (reduceMotion) return;
    ensureAnalyser();
    if (actx && actx.state === 'suspended') actx.resume();
    if (analyser && !pulseRaf) { pulseRaf = true; requestAnimationFrame(pulseFrame); }
  }

  // ---------- reflect player state ----------
  function refresh() {
    if (!P.state.chapterId) return;
    var m = P.manifest[P.state.chapterId] || {};
    var r = window.PANIM_RENDERED;
    els.chnum.textContent = r ? r.romanFor(m.num || 1) : String(m.num || '');
    els.title.textContent = m.title || '';
    els.speed.textContent = P.state.speed + '×';
    if (els.edition) {
      var music = P.state.edition === 'music';
      els.edition.textContent = music ? '♪ Music' : '¶ Voice';
      els.edition.setAttribute('aria-pressed', String(music));
    }
    els.play.classList.toggle('is-playing', P.state.playing);
    els.play.setAttribute('aria-label', P.state.playing ? 'Pause' : 'Play');
    paintBackdrop(P.state.chapterId);
    tick();
  }

  function tick() {
    var cur = P.voiceTime(), dur = P.voiceDur();
    var ratio = dur ? cur / dur : 0;
    els.clock.textContent = clockMode === 'elapsed' ? P.fmtTime(cur) : '−' + P.fmtTime(Math.max(0, dur - cur));
    els.arcFill.style.strokeDashoffset = String(100 - ratio * 100);
    els.seekFill.style.width = (ratio * 100) + '%';
    els.seek.setAttribute('aria-valuenow', Math.round(ratio * 100));
    paintProgress(ratio);
    var rem = P.sleepRemaining();
    if (rem === null) { els.sleepBadge.hidden = true; }
    else {
      els.sleepBadge.hidden = false;
      els.sleepCount.textContent = rem === 'chapter' ? 'ch. end' : P.fmtTime(Math.round(rem / 1000));
    }
  }

  // ---------- chapters sheet ----------
  function audioUrl(id) { return 'audio/' + P.state.edition + '/' + id + '.m4a'; }
  var sw = null;
  function buildChaptersSheet() {
    var r = window.PANIM_RENDERED;
    els.sheetList.innerHTML = P.ids.map(function (id) {
      var m = P.manifest[id] || {};
      var done = P.state.completed[id] ? ' is-complete' : '';
      var cur = id === P.state.chapterId ? ' is-current' : '';
      var mb = P.state.edition === 'music' ? m.musicMB : m.voiceMB;
      return '<div class="chapter-row' + done + cur + '">' +
        '<button class="cr-main" data-room-chapter="' + id + '">' +
        '<span class="cr-num">' + (r ? r.romanFor(m.num || 0) : '') + '</span>' +
        '<span class="cr-title">' + (m.title || id) + '</span>' +
        '<span class="cr-dur">' + P.fmtTime(m.voiceDur || 0) + '</span></button>' +
        (sw ? '<button class="btn btn-icon cr-dl" data-dl-chapter="' + id + '" ' +
        'title="Save for offline (' + (mb || '?') + ' MB)" aria-label="Save chapter for offline">↓</button>' : '') +
        '</div>';
    }).join('');
    refreshCachedMarks();
  }
  function refreshCachedMarks() {
    if (!sw) return;
    sw.postMessage({ type: 'query', urls: P.ids.map(audioUrl) });
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (reg) { sw = reg.active; }).catch(function () {});
    navigator.serviceWorker.addEventListener('message', function (e) {
      var d = e.data || {};
      if (d.type === 'cached-state') {
        d.urls.forEach(function (u, i) {
          var id = /ch\d\d/.exec(u); if (!id) return;
          var btn = els.sheetList.querySelector('[data-dl-chapter="' + id[0] + '"]');
          if (btn && d.cached[i]) { btn.textContent = '✓'; btn.classList.add('is-cached'); }
        });
      } else if (d.type === 'downloaded') {
        var id = /ch\d\d/.exec(d.url);
        var btn = id && els.sheetList.querySelector('[data-dl-chapter="' + id[0] + '"]');
        if (btn) { btn.textContent = d.ok ? '✓' : '↓'; btn.classList.toggle('is-cached', d.ok); btn.disabled = false; }
      }
    });
  }

  // ---------- wiring ----------
  function wire() {
    els.close.addEventListener('click', closeRoom);
    els.play.addEventListener('click', function () { P.toggle(); });
    els.back.addEventListener('click', function () { P.skip(-15); });
    els.fwd.addEventListener('click', function () { P.skip(30); });
    els.speed.addEventListener('click', function () { P.cycleSpeed(); });
    if (els.edition) els.edition.addEventListener('click', function () { P.setEdition(P.state.edition === 'music' ? 'voice' : 'music'); });
    els.sleep.addEventListener('click', function () { if (window.PanimUI) window.PanimUI.openSheet('sleep-sheet'); });
    els.chapters.addEventListener('click', function () {
      buildChaptersSheet();
      if (window.PanimUI) window.PanimUI.openSheet('chapters-sheet');
    });
    els.follow.addEventListener('click', function () {
      // drop to the page at the live paragraph
      closeRoom();
      var live = document.querySelector('.is-live');
      var target = live || document.getElementById(P.state.chapterId);
      if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });
    els.clock.addEventListener('click', function () {
      clockMode = clockMode === 'elapsed' ? 'remaining' : 'elapsed'; tick();
    });
    document.addEventListener('click', function (e) {
      var dl = e.target.closest && e.target.closest('[data-dl-chapter]');
      if (dl && sw) {
        dl.disabled = true; dl.textContent = '…';
        sw.postMessage({ type: 'download', url: audioUrl(dl.getAttribute('data-dl-chapter')) });
        return;
      }
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
    els.seek.addEventListener('pointerdown', function (e) { dragging = true; P.seekToRatio(ratioFromEvent(e)); });
    window.addEventListener('pointermove', function (e) { if (dragging) P.seekToRatio(ratioFromEvent(e)); });
    window.addEventListener('pointerup', function () { dragging = false; });
    els.seek.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); P.skip(15); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); P.skip(-15); }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) closeRoom(); });

    document.addEventListener('panim:room-toggle', toggleRoom);
    document.addEventListener('panim:chapter-loaded', function () { if (open) refresh(); });
    document.addEventListener('panim:play-state', function (e) {
      if (open) refresh();
      if (open && e.detail.playing) startPulse();
    });
    document.addEventListener('panim:edition-change', function () { if (open) refresh(); });
    document.addEventListener('panim:speed-change', function () { if (open) refresh(); });
    document.addEventListener('panim:sleep-change', function () { if (open) tick(); });
    document.addEventListener('panim:narration-timeupdate', function () { if (open) tick(); });
    setInterval(function () { if (open && P.sleepRemaining() !== null) tick(); }, 1000);
  }

  document.addEventListener('panim:rendered', function () {
    P = window.PanimPlayer;
    if (!P) return;
    wire();
    // hero Begin and nav Listen open the room (the listening product)
    var begin = document.getElementById('begin-btn');
    if (begin) begin.addEventListener('click', function () { setTimeout(openRoom, 50); });
    var listen = document.getElementById('listen-btn');
    if (listen) listen.addEventListener('click', function () { setTimeout(openRoom, 50); });
  });
})();
