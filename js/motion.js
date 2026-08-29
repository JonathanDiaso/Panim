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
  // Direction B: the arc is carried by PAPER TEMPERATURE, not by black turning to
  // cream. The book opens on a cool, almost grey stock and warms page by page until
  // chapter X is a bright warm white. The ACCENT is now three colours, not ten —
  // night (I–IV), fire (V–VIII), morning (IX–X) — switching where the book turns
  // rather than once per chapter. See the long note in css/site.css.
  // This table must stay identical to the .section[data-ch] block in css/site.css.
  var TOKENS = {
    '0':  { bg: '#EFEBE1', text: '#191510', accent: '#32506B' },
    '1':  { bg: '#EDE9DF', text: '#191510', accent: '#32506B' },
    '2':  { bg: '#E7E7E4', text: '#16181A', accent: '#32506B' },
    '3':  { bg: '#EDE6DB', text: '#1A1510', accent: '#32506B' },
    '4':  { bg: '#E6E8EA', text: '#15181B', accent: '#32506B' },
    '5':  { bg: '#F0E9DC', text: '#1A1510', accent: '#A8391B' },
    '6':  { bg: '#F2ECE0', text: '#1A1610', accent: '#A8391B' },
    '7':  { bg: '#E9E9E7', text: '#17191B', accent: '#A8391B' },
    '8':  { bg: '#EBE6E1', text: '#181412', accent: '#A8391B' },
    '9':  { bg: '#F4EEE1', text: '#1A1610', accent: '#7E5A20' },
    '10': { bg: '#FBF7EE', text: '#1A1712', accent: '#7E5A20' },
    'fw': { bg: '#FDFAF3', text: '#1A1712', accent: '#7E5A20' }
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

  // Not every pixel of the page is inside a .section[data-ch]: #contents sits in a
  // ~1400px gap between the hero and chapter I, and each plate break leaves a smaller
  // one. The old fallback here returned the LAST section for any y that missed —
  // so standing in the contents reported the closing five-words, which is the one
  // section that carries .nav-faded (opacity 0, pointer-events none). The running
  // head vanished on the first scroll of the book and did not come back until
  // chapter I. Answer the question honestly instead: the last section you have
  // entered, which in a gap is the one you just left.
  function currentSectionFor(y) {
    if (!sections.length) return null;
    if (y < sections[0].top) return sections[0];
    var found = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].top <= y) found = sections[i];
      else break;
    }
    return found;
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

    // discrete ink/accent switch per current section. These land on <html> so the
    // FIXED chrome — nav, player, sheets, toast — inherits the current chapter's
    // paper and accent. That chrome lives outside .section and would otherwise be
    // stuck on chapter I's stock for the whole book.
    var cur = currentSectionFor(viewportCenter);
    var tok = TOKENS[cur.ch] || TOKENS['0'];
    document.documentElement.style.setProperty('--accent', tok.accent);
    document.documentElement.style.setProperty('--paper', blended);
    document.documentElement.style.setProperty('--ink', tok.text);
    document.body.style.color = tok.text;

    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? window.scrollY / docHeight : 0;

    // progress within the CURRENT chapter, for the hairline under its numeral
    var chProgress = 0;
    if (cur && cur.height) {
      chProgress = (window.scrollY + window.innerHeight - cur.top) / cur.height;
      chProgress = Math.max(0, Math.min(1, chProgress));
    }

    // active chapter + nav visibility
    updateNav(cur.ch, progress, chProgress);
    updateTocRoll();

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

  // ---------- the contents rolls up into the running head ----------
  // As #contents leaves the viewport its rows lift and fade in sequence, and the
  // head's numerals fade in as they go: the list does not disappear, it moves.
  // Everything here is layout-driven (getBoundingClientRect), never time-driven,
  // so a throttled or backgrounded tab cannot leave it mid-flight.
  var tocSection = null, tocRows = null, navChapters = null, tocRollLast = -1;
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initTocRoll() {
    tocSection = document.getElementById('contents');
    tocRows = tocSection ? Array.prototype.slice.call(tocSection.querySelectorAll('.toc-row')) : [];
    navChapters = document.getElementById('nav-chapters');
    tocRows.forEach(function (r, i) { r.style.setProperty('--i', i); });
    updateTocRoll();
  }

  function updateTocRoll() {
    if (!tocSection || !tocRows || !tocRows.length) return;
    var r = tocSection.getBoundingClientRect();
    var h = r.height || 1;
    // 0 while the contents is still in place; 1 once a full section-height of it
    // has passed above the top of the viewport.
    var roll = (-r.top) / h;
    roll = roll < 0 ? 0 : (roll > 1 ? 1 : roll);
    if (Math.abs(roll - tocRollLast) < 0.004) return;   // nothing visible changed
    tocRollLast = roll;

    if (navChapters) navChapters.style.opacity = roll.toFixed(3);

    if (REDUCED) return;   // the head still takes over; the rows just do not travel
    var n = tocRows.length;
    for (var i = 0; i < n; i++) {
      // staggered: the top row goes first, the last row last
      var local = roll * (n * 0.62 + 1) - i * 0.62;
      local = local < 0 ? 0 : (local > 1 ? 1 : local);
      var row = tocRows[i];
      row.style.opacity = (1 - local).toFixed(3);
      row.style.transform = local ? 'translateY(' + (-local * 22).toFixed(1) + 'px)' : '';
    }
  }

  var lastScrollY = 0;
  var CH_ORDER = ['0','1','2','3','4','5','6','7','8','9','10','fw'];
  function updateNav(ch, progress, chProgress) {
    var nav = document.getElementById('site-nav');
    if (!nav) return;
    nav.classList.toggle('nav-faded', ch === 'fw');

    // Hide-on-scroll-down, at every width. This used to be gated to <= 900px, which
    // meant the running head was pinned for the whole book on a desktop window — the
    // one place there is room for a photograph to run to the top of the viewport.
    // Reading forward, the bar goes; the moment you scroll back, it returns. The
    // open contents panel is not affected: body.nav-toc-open pins the nav in CSS.
    var y = window.scrollY;
    if (y > lastScrollY + 4 && y > 120) nav.classList.add('nav-hidden');
    else if (y < lastScrollY - 4) nav.classList.remove('nav-hidden');
    lastScrollY = y;

    // The running head IS the progress indicator (see css/polish.css): numerals you
    // have read through go to full ink, and the one you are inside carries a
    // hairline that fills. Replaces the old 2px bar across the top of the viewport.
    var hereIdx = CH_ORDER.indexOf(ch);
    Array.prototype.forEach.call(document.querySelectorAll('#nav-chapters a'), function (a) {
      var navCh = a.getAttribute('data-nav-ch') || '';
      var n = navCh.replace(/^ch0?/, '');
      var isActive = navCh === 'ch' + (ch.length === 1 ? '0' + ch : ch);
      var idx = CH_ORDER.indexOf(n);
      a.classList.toggle('is-active', isActive);
      a.classList.toggle('is-read', !isActive && idx > -1 && hereIdx > -1 && idx < hereIdx);
      if (isActive) a.style.setProperty('--ch-progress', (chProgress || 0).toFixed(3));
      else a.style.removeProperty('--ch-progress');
    });

    // the head's chip carries the same chapter and the same filling hairline —
    // under 900px the numerals are display:none and this is the only one there is
    var chip = document.getElementById('ntt-here');
    if (chip) {
      var roman = ROMAN_BY_N[ch];
      if (roman) {
        chip.textContent = roman;
        chip.style.setProperty('--ch-progress', (chProgress || 0).toFixed(3));
      }
    }
    // and the panel marks where you are, so opening it answers "where am I"
    Array.prototype.forEach.call(document.querySelectorAll('#nav-toc .ntr'), function (a) {
      var navCh = a.getAttribute('data-nav-ch') || '';
      var n2 = navCh.replace(/^ch0?/, '');
      var idx2 = CH_ORDER.indexOf(n2);
      var act = navCh === 'ch' + (ch.length === 1 ? '0' + ch : ch);
      a.classList.toggle('is-active', act);
      a.classList.toggle('is-read', !act && idx2 > -1 && hereIdx > -1 && idx2 < hereIdx);
    });
  }

  var ROMAN_BY_N = { '1':'I','2':'II','3':'III','4':'IV','5':'V',
                     '6':'VI','7':'VII','8':'VIII','9':'IX','10':'X' };

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

    // the Hebrew watermark in each chapter's margin writes itself in, right to left
    var markObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var gs = entry.target.querySelectorAll('.heb-g');
        Array.prototype.forEach.call(gs, function (g, i) {
          // gs is in DOM order (RTL source order), so index 0 is the rightmost glyph
          g.style.transitionDelay = (i * 70) + 'ms';
        });
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.chapter-mark').forEach(function (el) { markObserver.observe(el); });

    // THE LEXICON: each word draws itself in ink, and then loses everything that
    // is not its root.
    //
    // Both effects are pure CSS (an animatable @property driving a feathered mask,
    // then a colour transition per letter); all this does is decide WHEN, and it
    // fires once per plate and then lets go. The threshold is high on purpose — the
    // word should not have started before the reader is looking at it, which is the
    // whole difference between "it is being written" and "it was already there".
    //
    // INK_MS MUST MATCH the --lex-ink transition in css/components.css. The root
    // must not start dimming until the nib has finished the last letter, or the
    // reader watches a word being written and taken apart at the same time.
    var INK_MS = 2600;
    var ROOT_HOLD_MS = 900;      // the beat the finished word gets to itself
    var inkObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var plate = entry.target;
        plate.classList.add('is-drawn');
        // Nothing to strip back on a plate whose word has no recoverable root —
        // render.js left the marker off, and this leaves it alone.
        if (plate.querySelector('.lex-g.is-root')) {
          setTimeout(function () { plate.classList.add('is-rooted'); }, INK_MS + ROOT_HOLD_MS);
        }
        obs.unobserve(plate);
      });
    }, { threshold: 0.35 });
    document.querySelectorAll('.lex-plate').forEach(function (el) { inkObserver.observe(el); });

    var hairlineObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-drawn');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    // Both dividers draw themselves the same way; a swell is just the wider
    // rule. The separate swell observer this replaces added an .is-swelled
    // class that no stylesheet has ever used, so swells never drew at all.
    document.querySelectorAll('.hairline').forEach(function (el) { hairlineObserver.observe(el); });

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

  // ---------- ch.9→10 veil-lift boundary ----------
  // Retired in the Direction B rebuild. The set piece was a full-screen cream
  // curtain wiping up over a black page — it only read as "the veil lifts" because
  // the book was dark until then. On paper the same beat is carried by the arc
  // itself: chapter X's stock is the brightest in the book. The element is left in
  // index.html (hidden by site.css) so nothing downstream breaks.
  function wireVeilBoundary() {
    var boundary = document.getElementById('veil-boundary');
    if (boundary) boundary.classList.add('is-done');
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
          // THE LIGHT CROSSES THE LINE. Once, slowly, after the last word has
          // landed and the citation is up — never on a loop. The book ends on
          // light arriving on a face; a light that keeps arriving is a barber's
          // pole. CSS does the sweep (.is-lit in components.css) and removes
          // itself when it is finished, so the line is left as plain ink.
          var line = document.getElementById('fivewords-text');
          if (line && !reduceMotion) line.classList.add('is-lit');
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

  // ---------- plate parallax ----------
  // The picture inside a plate drifts slightly slower than the page. It is the one
  // piece of scroll motion left in the book: enough that a plate feels like a
  // window rather than a pasted rectangle, small enough that nobody notices it
  // happening. 7% of the frame, transform only, skipped entirely off-screen.
  var plates = [];
  function wirePlates() {
    plates = Array.prototype.slice.call(document.querySelectorAll('.plate-frame img, .hero-plate img'));
    if (!plates.length || reduceMotion) return;
    // no blanket will-change: promoting fifteen full-width photographs to their own
    // compositor layers costs more memory than the parallax saves. Each plate is
    // promoted only while it is actually crossing the viewport, below.
    window.addEventListener('scroll', function () {
      if (!plateTick) { plateTick = true; requestAnimationFrame(plateFrame); }
    }, { passive: true });
    plateFrame();
  }
  var plateTick = false;
  function plateFrame() {
    plateTick = false;
    var vh = window.innerHeight;
    plates.forEach(function (el) {
      var box = el.parentElement.getBoundingClientRect();
      if (box.bottom < 0 || box.top > vh) {
        if (el.style.willChange) el.style.willChange = '';
        return;
      }
      if (!el.style.willChange) el.style.willChange = 'transform';
      // −1..1 across the crossing, scaled to a few percent of the frame height
      var p = (box.top + box.height / 2 - vh / 2) / (vh / 2 + box.height / 2);
      el.style.transform = 'scale(1.07) translateY(' + (p * 3.2).toFixed(2) + '%)';
    });
  }
  // Ken-Burns wake retired: an image that starts drifting when the narration
  // reaches it is motion for its own sake, and it fought the plate parallax above.

  function init() {
    measureSections();
    initTocRoll();
    onScrollFrame();
    window.addEventListener('scroll', onScroll, { passive: true });
    var remeasure = function () { measureSections(); tocRollLast = -1; onScrollFrame(); };
    window.addEventListener('resize', remeasure);

    // measureSections() ran ONCE, at render, against a page set in the fallback
    // fonts and with nothing decoded. Literata then swapped in and 209,000px of
    // prose reflowed underneath a section table that was never rebuilt — so every
    // boundary was wrong for the rest of the session. Standing in the middle of
    // chapter IV, the running head read VII, the paper was the closing section's
    // white, and the nav carried .nav-faded: opacity 0, pointer-events none. The
    // bar was not broken; it was correctly hiding for a section you were not in.
    // Re-measure whenever the document actually changes height.
    window.addEventListener('load', remeasure);
    if (window.ResizeObserver) {
      var lastH = document.documentElement.scrollHeight;
      new ResizeObserver(function () {
        var h = document.documentElement.scrollHeight;
        if (h === lastH) return;   // a width-only reflow is already covered by resize
        lastH = h;
        remeasure();
      }).observe(document.body);
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);

    wireReveals();
    wireVeilBoundary();
    wireFiveWords();
    wirePrayerZones();
    wirePlates();
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
