// PANIM — motion.js
// Scroll-driven behavior: dawn-arc background interpolation, ambient light, nav
// show/hide/fade + active-chapter tracking, progress bar, reveal animations
// (veil-lift, fade-rise, self-drawing hairlines), ch.8 tearing hairline, the
// ch.9→10 veil-lift set piece, and the five-words word-by-word terminal reveal.
// 11-website-plan.md §8. Transforms/opacity only; all reveal observers disconnect
// after firing once. Full prefers-reduced-motion fallback throughout.

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Dawn-arc token table (11-website-plan.md §4.2) — mirrors css/site.css section rules.
  var TOKENS = {
    '0': { bg: '#050409', text: '#f0edf4', accent: '#c9a84c' },
    '1': { bg: '#050409', text: '#f0edf4', accent: '#c9a84c' },
    '2': { bg: '#070609', text: '#ece9ee', accent: '#8a92b8' },
    '3': { bg: '#0a0608', text: '#f0ebe8', accent: '#d98e4a' },
    '4': { bg: '#06080c', text: '#eaeef2', accent: '#6a9bd8' },
    '5': { bg: '#0a0806', text: '#f2ede4', accent: '#d9a84a' },
    '6': { bg: '#0d0b08', text: '#f4f0e6', accent: '#e8d090' },
    '7': { bg: '#05070b', text: '#e8ebf0', accent: '#5a6a94' },
    '8': { bg: '#040305', text: '#efeceb', accent: '#a83232' },
    '9': { bg: '#12100c', text: '#f6f2e8', accent: '#e8b04a' },
    '10': { bg: '#f4eee2', text: '#241d12', accent: '#8a6420' },
    'fw': { bg: '#faf6ec', text: '#241d12', accent: '#c9a84c' }
  };

  function hexToRgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(function (v) {
      return Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0');
    }).join('');
  }
  function lerpColor(a, b, t) {
    var ca = hexToRgb(a), cb = hexToRgb(b);
    return rgbToHex(ca[0] + (cb[0] - ca[0]) * t, ca[1] + (cb[1] - ca[1]) * t, ca[2] + (cb[2] - ca[2]) * t);
  }

  var sections = []; // { el, ch, top, height, mid }
  var lastActiveCh = null;
  var ticking = false;

  function measureSections() {
    sections = Array.prototype.slice.call(document.querySelectorAll('.section[data-ch]')).map(function (el) {
      var top = el.offsetTop;
      var height = el.offsetHeight;
      return { el: el, ch: el.getAttribute('data-ch'), top: top, height: height, mid: top + height / 2 };
    });
  }

  function currentSectionFor(y) {
    for (var i = 0; i < sections.length; i++) {
      var s = sections[i];
      if (y >= s.top && y < s.top + s.height) return s;
    }
    return y < (sections[0] ? sections[0].top : 0) ? sections[0] : sections[sections.length - 1];
  }

  function onScrollFrame() {
    ticking = false;
    if (!sections.length) return;
    var viewportCenter = window.scrollY + window.innerHeight / 2;

    // continuous bg lerp between adjacent section midpoints
    var i = 0;
    while (i < sections.length - 1 && sections[i + 1].mid < viewportCenter) i++;
    var a = sections[i], b = sections[Math.min(i + 1, sections.length - 1)];
    var t = 0;
    if (b !== a) {
      t = (viewportCenter - a.mid) / (b.mid - a.mid);
      t = Math.max(0, Math.min(1, t));
    }
    var bgA = TOKENS[a.ch] || TOKENS['0'];
    var bgB = TOKENS[b.ch] || bgA;
    var blended = reduceMotion ? bgA.bg : lerpColor(bgA.bg, bgB.bg, t);
    document.body.style.backgroundColor = blended;

    // discrete text/accent switch per current section
    var cur = currentSectionFor(viewportCenter);
    var tok = TOKENS[cur.ch] || TOKENS['0'];
    document.documentElement.style.setProperty('--accent', tok.accent);
    document.documentElement.style.setProperty('--bg', tok.bg);
    document.documentElement.style.setProperty('--text', tok.text);
    document.body.style.color = tok.text;

    // ambient light rises with progress
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? window.scrollY / docHeight : 0;
    document.documentElement.style.setProperty('--light-y', (100 - progress * 85) + '%');

    // progress bar
    var fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = (progress * 100) + '%';

    // active chapter + nav visibility
    updateNav(cur.ch, progress);

    if (cur.ch !== lastActiveCh) {
      lastActiveCh = cur.ch;
      document.dispatchEvent(new CustomEvent('panim:section-change', { detail: { ch: cur.ch } }));
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScrollFrame);
    }
  }

  var lastScrollY = 0;
  function updateNav(ch, progress) {
    var nav = document.getElementById('site-nav');
    if (!nav) return;
    nav.classList.toggle('nav-faded', ch === 'fw');

    // hide-on-scroll-down (mobile/tablet, matching the nav-chapters collapse breakpoint)
    if (window.innerWidth <= 900) {
      var y = window.scrollY;
      if (y > lastScrollY + 4 && y > 120) nav.classList.add('nav-hidden');
      else if (y < lastScrollY - 4) nav.classList.remove('nav-hidden');
      lastScrollY = y;
    } else {
      nav.classList.remove('nav-hidden');
    }

    Array.prototype.forEach.call(document.querySelectorAll('#nav-chapters a'), function (a) {
      a.classList.toggle('is-active', a.getAttribute('data-nav-ch') === 'ch' + (ch.length === 1 ? '0' + ch : ch));
    });
  }

  // ---------- reveal observers (once-only) ----------
  function wireReveals() {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (entry.target.classList.contains('veil-lift')) entry.target.classList.add('is-lifted');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

    var hairlineObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-drawn');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.divider-beat.hairline').forEach(function (el) { hairlineObserver.observe(el); });

    var swellObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-swelled');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.divider-swell').forEach(function (el) { swellObserver.observe(el); });

    // ch.8 tearing hairline (§8.4) — once, on the "torn in two" paragraph entering view
    var tearObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-torn');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.tear-line').forEach(function (el) { tearObserver.observe(el); });
  }

  // ---------- ch.9→10 veil-lift boundary (§8.4, once) ----------
  function wireVeilBoundary() {
    var boundary = document.getElementById('veil-boundary');
    var ch10 = document.getElementById('ch10');
    if (!boundary || !ch10 || reduceMotion) { if (boundary) boundary.classList.add('is-done'); return; }
    var fired = false;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !fired) {
          fired = true;
          boundary.classList.add('is-lifting');
          setTimeout(function () { boundary.classList.add('is-done'); }, 1100);
          obs.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obs.observe(ch10);
  }

  // ---------- five-words terminal reveal (§6.10, C18) ----------
  function wireFiveWords() {
    var section = document.getElementById('five-words');
    if (!section) return;
    var fired = false;
    function reveal() {
      if (fired) return;
      fired = true;
      var words = section.querySelectorAll('.fw-word');
      var delay = reduceMotion ? 0 : 2000;
      setTimeout(function () {
        words.forEach(function (w, i) {
          setTimeout(function () { w.classList.add('is-visible'); }, reduceMotion ? 0 : i * 90);
        });
        setTimeout(function () {
          var ref = document.getElementById('fivewords-ref');
          if (ref) ref.classList.add('is-visible');
        }, reduceMotion ? 0 : words.length * 90 + 300);
      }, delay);
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { reveal(); obs.disconnect(); }
      });
    }, { threshold: 0.5 });
    obs.observe(section);
    document.addEventListener('panim:cue-fivewords', reveal);
  }

  // ---------- prayer zone detection (for player.js's Hold affordance, §6.9) ----------
  function wirePrayerZones() {
    var zones = document.querySelectorAll('.prayer-zone');
    if (!zones.length) return;
    var active = 0;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) active++; else active = Math.max(0, active - 1);
      });
      document.dispatchEvent(new CustomEvent('panim:prayer-zone', { detail: { active: active > 0 } }));
    }, { threshold: 0 });
    zones.forEach(function (z) { obs.observe(z); });
  }

  // ---------- frontispiece parallax + Ken-Burns wake (SITE-V2-PLAN.md §4.3) ----------
  // The photo drifts at 0.85× scroll while the header rides at 1× — transform-only,
  // rAF-shared with the main scroll frame via this second observer-driven list.
  var frontis = [];
  function wireFrontis() {
    frontis = Array.prototype.slice.call(document.querySelectorAll('.frontis-media'));
    if (!frontis.length || reduceMotion) return;
    window.addEventListener('scroll', function () {
      if (!frontisTick) { frontisTick = true; requestAnimationFrame(frontisFrame); }
    }, { passive: true });
    frontisFrame();
  }
  var frontisTick = false;
  function frontisFrame() {
    frontisTick = false;
    var vh = window.innerHeight;
    frontis.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      el.style.transform = 'translateY(' + (r.top * 0.15).toFixed(1) + 'px) scale(1.08)';
    });
  }
  // narration reaching a figure's cue range wakes its Ken-Burns drift (sync.js emits)
  document.addEventListener('panim:cue-live', function (e) {
    var el = document.getElementById(e.detail.id);
    if (!el) return;
    var fig = el.nextElementSibling;
    if (fig && fig.classList && fig.classList.contains('img-slot')) fig.classList.add('is-awake');
  });

  function init() {
    measureSections();
    onScrollFrame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { measureSections(); onScrollFrame(); });
    wireReveals();
    wireVeilBoundary();
    wireFiveWords();
    wirePrayerZones();
    wireFrontis();
  }

  document.addEventListener('panim:rendered', init);

  // shared with js/room.js so the Listening Room's light follows playback
  window.PANIM_TOKENS = TOKENS;

  // NOTE (BUILD-NOTES.md): rewind-line letter-space settle (§8.4) is marked OPTIONAL in the
  // build brief — skip if rewind lines cannot be reliably identified. content/chapters.js
  // carries no per-paragraph "rewind" flag, so no paragraph is auto-tagged .rewind-line here;
  // the CSS class + transition exist in site.css and can be hand-applied to specific
  // paragraph ids later without any script change.
})();
