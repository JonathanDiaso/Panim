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

  // ⭐ THE DAWN ARC IS READ OFF THE STYLESHEET. IT IS NOT COPIED HERE ANY MORE.
  //
  // 🛑 THIS FILE USED TO CARRY TWO HAND-KEPT TABLES — twelve day stocks and twelve
  // night ones, each a literal copy of the .section[data-ch] rules in css/site.css,
  // each with a comment above it saying "must stay identical". The author, on the
  // sheet: "fix". They were the same decision written down in two places, and the
  // failure mode was silent — the lerp would walk the paper toward a stock the
  // stylesheet never paints, so the page drifted a few hex steps off its own
  // sections and nothing anywhere said so. It had already cost one live bug.
  //
  // css/site.css is the one source now. A hidden probe carrying .section[data-ch]
  // is asked for the three custom properties the arc is made of, which is the same
  // question the browser answers for the real sections; the answers are cached per
  // chapter and thrown away whenever the theme flips, because the night block
  // redefines every one of them. A probe rather than the real section so this works
  // before js/render.js has built the chapters, and for [data-ch="fw"], which is not
  // a chapter at all.
  //
  // ⚠️ THE TOKENS MUST STAY AUTHORED AS HEX in css/site.css. hexToRgb below parses
  // them and the interpolation is done in RGB; a color() or oklch() token would
  // reach here as a string this file cannot read. That is the one coupling left,
  // and it is one instead of twenty-four.
  var probe = null;
  var stockCache = {};
  var cachedTheme = null;

  function themeNow() {
    return document.documentElement.getAttribute('data-theme') === 'night' ? 'night' : 'day';
  }

  function readStock(ch) {
    if (!probe) {
      probe = document.createElement('div');
      probe.className = 'section';
      // out of the flow and out of the tree's reach: it paints nothing, measures
      // nothing, and is never a tab stop. Custom properties still resolve on it.
      probe.style.cssText = 'position:absolute;left:-9999px;top:0;width:0;height:0;' +
                            'visibility:hidden;pointer-events:none';
      probe.setAttribute('aria-hidden', 'true');
      document.body.appendChild(probe);
    }
    probe.setAttribute('data-ch', ch);
    var cs = getComputedStyle(probe);
    return {
      bg:     cs.getPropertyValue('--paper').trim(),
      text:   cs.getPropertyValue('--ink').trim(),
      accent: cs.getPropertyValue('--accent').trim()
    };
  }

  // one lookup, so nothing below has to know where the numbers came from
  function stock(ch) {
    var t = themeNow();
    if (t !== cachedTheme) { stockCache = {}; cachedTheme = t; }
    var key = String(ch);
    if (!stockCache[key]) {
      var v = readStock(key);
      // A probe asked before <body> exists, or for a data-ch the stylesheet has no
      // rule for, comes back with the root's own values rather than a section's.
      // Chapter 0's stock is the honest fallback — it is the jacket, which is what
      // the page is showing when nothing has claimed it yet — and it is NOT cached,
      // so the first real answer replaces it.
      if (!v.bg || v.bg.charAt(0) !== '#') {
        return key === '0' ? { bg: '#EFEBE1', text: '#191510', accent: '#32638F' } : stock('0');
      }
      stockCache[key] = v;
    }
    return stockCache[key];
  }

  // the night block redefines all three properties, so every cached answer is stale
  document.addEventListener('panim:theme', function () { stockCache = {}; cachedTheme = null; });

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
  // last values actually written to the root/body, so a frame that computes the
  // same paper stock costs nothing. See the long note in onScrollFrame.
  var lastBg = null, lastAccent = null, lastInk = null;

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

  // 🔴 READ PASS, THEN WRITE PASS — 2026-09-07, and it is the same rule plateFrame
  // has carried since it was written. This function did not follow it: it wrote
  // --paper and background-color to the root, THEN read
  // `documentElement.scrollHeight`, then wrote the whole running head in
  // updateNav(), then read `#contents.getBoundingClientRect()` in updateTocRoll().
  // Every one of those reads came after a write, so each forced the engine to lay
  // out a 266,000px document again before it could answer — TWO FORCED SYNCHRONOUS
  // LAYOUTS PER SCROLL FRAME, sixty times a second, for the whole book.
  // ⚠️ THE WRITES WERE ALREADY CHEAP AND THAT IS WHY THIS HID. The compare-then-write
  // guard below means the root custom properties are usually not written at all —
  // but updateNav writes on nearly every frame (the hide-on-scroll-down class and
  // the progress custom property), and updateTocRoll's rect read sat right behind
  // it. The guard saved the style recalculation and paid for a layout instead.
  // 🛑 EVERY LAYOUT READ IN THIS FUNCTION BELONGS IN THE BLOCK MARKED `pass 1`.
  // Reading at the top of a rAF callback is free — layout is clean from the last
  // paint. Reading after a write is the most expensive thing this page can do.
  function onScrollFrame() {
    ticking = false;
    if (!sections.length) return;

    // ---- pass 1: read. Nothing below this block may touch the DOM. ----
    var scrollY = window.scrollY;
    var innerH = window.innerHeight;
    // ⚠️ scrollHeight IS RE-READ EVERY FRAME AND MUST BE. The sections carry
    // `content-visibility: auto` with `contain-intrinsic-size: auto`, so the
    // document's real height changes as chapters are rendered for the first time.
    // A value cached in measureSections() would be right at load and wrong by
    // chapter III, and the progress hairline would drift with it.
    var scrollH = document.documentElement.scrollHeight;
    var tocRect = (tocSection && tocRows && tocRows.length)
      ? tocSection.getBoundingClientRect() : null;

    var viewportCenter = scrollY + innerH / 2;

    // continuous bg lerp between adjacent section midpoints
    var i = 0;
    while (i < sections.length - 1 && sections[i + 1].mid < viewportCenter) i++;
    var a = sections[i], b = sections[Math.min(i + 1, sections.length - 1)];
    var t = 0;
    if (b !== a) {
      t = (viewportCenter - a.mid) / (b.mid - a.mid);
      t = Math.max(0, Math.min(1, t));
    }
    var bgA = stock(a.ch);
    var bgB = stock(b.ch);
    var blended = reduceMotion ? bgA.bg : lerpColor(bgA.bg, bgB.bg, t);

    // discrete ink/accent switch per current section. These land on <html> so the
    // FIXED chrome — nav, player, sheets, toast — inherits the current chapter's
    // paper and accent. That chrome lives outside .section and would otherwise be
    // stuck on chapter I's stock for the whole book.
    var cur = currentSectionFor(viewportCenter);
    var tok = stock(cur.ch);

    // 🛑 A CUSTOM PROPERTY ON <html> IS THE MOST EXPENSIVE WRITE ON THIS PAGE, AND
    // THESE FOUR WERE UNGUARDED ON EVERY SCROLL FRAME.
    // --accent, --paper and --ink are inherited, so setting one on the root element
    // invalidates the computed style of EVERY element that could read it — the whole
    // book, eight hundred paragraphs and change — and the engine does that work again
    // at 60fps whether or not the value moved. It almost never moves: the arc lerps
    // between two paper stocks about eight hex steps apart across a whole chapter, so
    // the overwhelming majority of frames were re-styling the entire document to write
    // the string it already had. The accent changes THREE TIMES in the book.
    // ⚠️ Compare-then-write. Never widen this to an unconditional set "for safety" —
    // safety here costs a full style recalculation of the document, per frame.
    if (blended !== lastBg) {
      lastBg = blended;
      document.body.style.backgroundColor = blended;
      document.documentElement.style.setProperty('--paper', blended);
    }
    if (tok.accent !== lastAccent) {
      lastAccent = tok.accent;
      document.documentElement.style.setProperty('--accent', tok.accent);
    }
    if (tok.text !== lastInk) {
      lastInk = tok.text;
      document.documentElement.style.setProperty('--ink', tok.text);
      document.body.style.color = tok.text;
    }

    var docHeight = scrollH - innerH;
    var progress = docHeight > 0 ? scrollY / docHeight : 0;

    // progress within the CURRENT chapter, for the hairline under its numeral
    var chProgress = 0;
    if (cur && cur.height) {
      chProgress = (scrollY + innerH - cur.top) / cur.height;
      chProgress = Math.max(0, Math.min(1, chProgress));
    }

    // active chapter + nav visibility
    updateNav(cur.ch, progress, chProgress);
    updateTocRoll(tocRect);

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

  // ⚠️ THE RECT IS PASSED IN FROM onScrollFrame's READ PASS. Called with nothing —
  // from initTocRoll and from the resize handler — it reads its own, which is
  // correct in both of those because neither is inside a scroll frame.
  function updateTocRoll(rect) {
    if (!tocSection || !tocRows || !tocRows.length) return;
    var r = rect || tocSection.getBoundingClientRect();
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

  // 🛑 THIS RAN THE WHOLE SWEEP ON EVERY SCROLL FRAME AND ALMOST ALL OF IT WAS
  // REDOING WORK THAT HAD NOT CHANGED. Two querySelectorAll calls, a getElementById,
  // and four classList.toggle calls across ~24 anchors, sixty times a second — to
  // reflect a chapter number that changes TWELVE TIMES in the entire book.
  // Split by what actually moves:
  //   every frame   the hide-on-scroll-down test, which is two integers
  //   on chapter    the class sweep across the running head and the panel
  //   on progress   two custom-property writes, on the active anchor and the chip
  // ⚠️ THE CACHES ARE INVALIDATED, NOT ASSUMED. js/ui.js builds #nav-chapters and
  // the #nav-toc panel from chapter data, and the panel is not necessarily in the
  // DOM on the first frame — so a cached empty list must never become permanent.
  // navRefresh() re-queries whenever a list came back empty last time.
  var navEl = null, navAnchors = null, navRows = null, navChip = null;
  var navLastCh = null, navLastProg = -1, navActiveAnchor = null;

  function navRefresh() {
    navEl = navEl || document.getElementById('site-nav');
    navChip = navChip || document.getElementById('ntt-here');
    if (!navAnchors || !navAnchors.length) {
      navAnchors = Array.prototype.slice.call(document.querySelectorAll('#nav-chapters a'));
    }
    if (!navRows || !navRows.length) {
      navRows = Array.prototype.slice.call(document.querySelectorAll('#nav-toc .ntr'));
    }
  }

  function updateNav(ch, progress, chProgress) {
    navRefresh();
    var nav = navEl;
    if (!nav) return;

    // ---- every frame: hide-on-scroll-down, at every width ----
    // This used to be gated to <= 900px, which meant the running head was pinned for
    // the whole book on a desktop window — the one place there is room for a
    // photograph to run to the top of the viewport. Reading forward, the bar goes;
    // the moment you scroll back, it returns. The open contents panel is not
    // affected: body.nav-toc-open pins the nav in CSS.
    var y = window.scrollY;
    if (y > lastScrollY + 4 && y > 120) nav.classList.add('nav-hidden');
    else if (y < lastScrollY - 4) nav.classList.remove('nav-hidden');
    lastScrollY = y;

    var prog = Math.round((chProgress || 0) * 1000) / 1000;
    if (ch === navLastCh && prog === navLastProg) return;

    // ---- on a chapter change only: the class sweep ----
    // The running head IS the progress indicator (see css/polish.css): numerals you
    // have read through go to full ink, and the one you are inside carries a
    // hairline that fills. Replaces the old 2px bar across the top of the viewport.
    if (ch !== navLastCh) {
      navLastCh = ch;
      nav.classList.toggle('nav-faded', ch === 'fw');
      var hereIdx = CH_ORDER.indexOf(ch);
      var want = 'ch' + (ch.length === 1 ? '0' + ch : ch);
      navActiveAnchor = null;
      navAnchors.forEach(function (a) {
        var navCh = a.getAttribute('data-nav-ch') || '';
        var n = navCh.replace(/^ch0?/, '');
        var isActive = navCh === want;
        var idx = CH_ORDER.indexOf(n);
        a.classList.toggle('is-active', isActive);
        a.classList.toggle('is-read', !isActive && idx > -1 && hereIdx > -1 && idx < hereIdx);
        if (isActive) navActiveAnchor = a;
        else a.style.removeProperty('--ch-progress');
      });
      // and the panel marks where you are, so opening it answers "where am I"
      navRows.forEach(function (a) {
        var navCh2 = a.getAttribute('data-nav-ch') || '';
        var n2 = navCh2.replace(/^ch0?/, '');
        var idx2 = CH_ORDER.indexOf(n2);
        var act = navCh2 === want;
        a.classList.toggle('is-active', act);
        a.classList.toggle('is-read', !act && idx2 > -1 && hereIdx > -1 && idx2 < hereIdx);
      });
      // the head's chip carries the same chapter — under 900px the numerals are
      // display:none and this is the only one there is
      if (navChip) {
        var roman = ROMAN_BY_N[ch];
        if (roman) navChip.textContent = roman;
      }
    }

    // ---- on progress: two writes, and only two ----
    if (prog !== navLastProg) {
      navLastProg = prog;
      var v = prog.toFixed(3);
      if (navActiveAnchor) navActiveAnchor.style.setProperty('--ch-progress', v);
      if (navChip && ROMAN_BY_N[ch]) navChip.style.setProperty('--ch-progress', v);
    }
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
    // Only ever ONE entry is visible now — the lexicon is a wall of words with a
    // single article beside it (js/render.js, 2026-08-29) — so this observes the one
    // that is open when the reader arrives, and js/ui.js's selectLexWord drives every
    // one after that. A hidden [hidden] entry is never intersecting, so the others
    // are simply never fired by this path and cost nothing.
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
  // 🛑 READ EVERY RECT FIRST, THEN WRITE EVERY TRANSFORM. This loop used to do
  // both in one pass: getBoundingClientRect(), then style.transform, then the next
  // getBoundingClientRect(). Each write invalidates layout, so each following read
  // forced the engine to lay the page out again — FIFTEEN forced synchronous
  // layouts, of a 266,000px document, on every scroll frame. That is the scroll
  // stutter; it is not the parallax itself, which is one compositor transform.
  // Split into a read pass and a write pass the frame costs exactly one layout.
  // ⚠️ Never put a style write above a rect read in this function. It is the same
  // number of lines either way and the difference is the whole cost of the feature.
  var plateBoxes = [];
  function plateFrame() {
    plateTick = false;
    var vh = window.innerHeight;
    var i, el, box;
    // pass 1 — read only
    plateBoxes.length = 0;
    for (i = 0; i < plates.length; i++) {
      plateBoxes[i] = plates[i].parentElement.getBoundingClientRect();
    }
    // pass 2 — write only
    for (i = 0; i < plates.length; i++) {
      el = plates[i]; box = plateBoxes[i];
      if (box.bottom < 0 || box.top > vh) {
        if (el.style.willChange) el.style.willChange = '';
        continue;
      }
      if (!el.style.willChange) el.style.willChange = 'transform';
      // −1..1 across the crossing, scaled to a few percent of the frame height
      var p = (box.top + box.height / 2 - vh / 2) / (vh / 2 + box.height / 2);
      var next = 'scale(1.07) translateY(' + (p * 3.2).toFixed(2) + '%)';
      // and do not hand the compositor a string it already has
      if (el.style.transform !== next) el.style.transform = next;
    }
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

    // 🌙 THE THEME SWITCH HAS TO CLEAR THE COMPARE-THEN-WRITE CACHE FIRST, and this
    // is the whole reason it needs a listener rather than nothing. onScrollFrame
    // only writes --paper / --ink / --accent when the value it computed differs
    // from the last one it wrote (see the long note there). Flipping to night
    // changes the TABLE, not the scroll position, so the newly computed values are
    // correct and the guard would refuse every one of them — the stylesheet would
    // go dark and the three inline properties on <html>, which win over it, would
    // hold the whole document on day paper. Silent, and it looks like night mode
    // simply does not work.
    document.addEventListener('panim:theme', function () {
      lastBg = lastAccent = lastInk = null;
      onScrollFrame();
    });

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

  // 🛑 window.PANIM_TOKENS IS GONE, 2026-09-07, AND IT HAD NO READER LEFT. It was
  // exported here under the comment "shared with js/room.js so the Listening Room's
  // light follows playback" — but js/room.js stopped reading it when that block was
  // found to be painting the Room in daylight cream, and the note there now says in
  // capitals: "Do not re-point it at PANIM_TOKENS." So this line published a table
  // nobody consumed, and when the two tables above were replaced by a read of
  // css/site.css it became `window.PANIM_TOKENS = TOKENS` with no TOKENS to name —
  // an uncaught ReferenceError on every page load, at the very bottom of the file
  // where it broke nothing visible. If the Room ever gets the ten-stop ramp its own
  // note asks for, that ramp is an author decision and belongs in css/room.css, not
  // in a global re-exported from here.

  // NOTE (BUILD-NOTES.md): rewind-line letter-space settle (§8.4) is marked OPTIONAL in the
  // build brief — skip if rewind lines cannot be reliably identified. content/chapters.js
  // carries no per-paragraph "rewind" flag, so no paragraph is auto-tagged .rewind-line here;
  // the CSS class + transition exist in site.css and can be hand-applied to specific
  // paragraph ids later without any script change.
})();
