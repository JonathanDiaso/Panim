// SPANISH TEXT — the page in the language the reader chose, 2026-09-16.
//
// The Spanish narration shipped in v74 over English text. This puts the Spanish
// manuscript on the page when Spanish is chosen, and puts the English back when it
// is not. Nothing is rendered twice: js/render.js builds the English book as it
// always has, and this file swaps the WORDS inside the elements it built.
//
// 🛑 THE ELEMENT STAYS, ONLY ITS WORDS CHANGE. Every paragraph keeps its id and its
// data-cue-id, and content/es/chNN.json is keyed by those same English ids — the
// ids cues/es/*.json carries. So Follow, the live-paragraph mark, tap-to-listen,
// deep links and a saved place all keep working with no second code path.
//
// 🛑 FETCHED, NEVER BUNDLED. content/chapters.js is parsed by every visitor before
// the page paints; the Spanish is ~100 KB compressed on top of it. As ten JSON files
// read only here, an English reader downloads none of it. sw.js caches any
// same-origin GET it serves, so a Spanish reader pays once and reads offline after.
//
// ⚠️ WHAT STAYS ENGLISH, on purpose: the jacket, the site's own controls, plate
// captions, the back matter, search, and the verse notes (hidden in Spanish rather
// than shown in the wrong language). The glossary pop-ups ride on English <em>
// words and are not carried across.
//
// Built by tools/build-spanish-text.py. Listens for panim:lang-change, which
// js/player.js emits once at start and on every switch.
(function () {
  var ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  var IDS = ['ch01', 'ch02', 'ch03', 'ch04', 'ch05', 'ch06', 'ch07', 'ch08', 'ch09', 'ch10'];
  // The file's own ?v=, so the ten JSON files move with the release and
  // tools/check-version.py has nothing new to watch.
  var V = (function () {
    var s = document.currentScript && document.currentScript.src;
    var m = s && /[?&]v=(\w+)/.exec(s);
    return m ? m[1] : '0';
  })();

  var loaded = {};        // chapter id -> parsed JSON
  var saved = new Map();  // element -> its English innerHTML
  var want = 'en';        // the language most recently asked for
  var shown = 'en';       // the language the page is showing

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function fetchChapter(id) {
    if (loaded[id]) return Promise.resolve(loaded[id]);
    return fetch('content/es/' + id + '.json?v=' + V)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { loaded[id] = d; return d; })
      .catch(function () { return null; });   // offline and never seen: stays English
  }

  function put(el, html) {
    if (!el) return;
    if (!saved.has(el)) saved.set(el, el.innerHTML);
    el.innerHTML = html;
  }
  function hide(el) {
    if (el) el.setAttribute('data-es-hidden', '');
  }

  // The same two-voice citation js/render.js renderVerse() sets.
  function refHtml(ref) {
    var m = /^((?:[1-3]\s)?[^0-9]+?)\s+([0-9].*)$/.exec(ref);
    return m
      ? '<span class="vr-book">' + esc(m[1]) + '</span> <span class="vr-loc">' + esc(m[2]) + '</span>'
      : '<span class="vr-book">' + esc(ref) + '</span>';
  }

  function applyChapter(id, d) {
    var section = document.getElementById(id);
    if (!section) return;
    section.setAttribute('lang', 'es');
    var num = +section.getAttribute('data-ch');

    put(section.querySelector('.chapter-title'), esc(d.title));
    put(section.querySelector('.chapter-num'), 'Capítulo ' + ROMAN[num]);
    put(section.querySelector('.listen-from-here'), 'Escuchar desde aquí');
    put(section.querySelector('.share-chapter'), 'Compartir este capítulo');
    hide(section.querySelector('.chapter-hook'));

    Object.keys(d.p).forEach(function (bid) {
      var el = document.getElementById(bid);
      var w = d.p[bid];
      if (!el) return;
      if (typeof w === 'string') {
        // ch. VIII's torn-in-two rule rides inside its paragraph; keep it.
        var tear = el.querySelector('.tear-line');
        put(el, w + (tear ? tear.outerHTML : ''));
        return;
      }
      put(el.querySelector('.verse-text'), w.l.map(function (l) {
        return '<span class="verse-line">' + esc(l) + '</span>';
      }).join(''));
      if (w.r) put(el.querySelector('.verse-ref-text'), refHtml(w.r));
      hide(el.querySelector('.verse-note'));
    });

    var refs = section.querySelectorAll('.block-ref');
    for (var i = 0; i < refs.length && i < d.refs.length; i++) {
      put(refs[i], esc(d.refs[i]));
      var next = refs[i].nextElementSibling;
      if (next && next.classList.contains('verse-note')) hide(next);
    }

    // Lines the translation has and the English does not (one, in ch. II).
    Object.keys(d.after || {}).forEach(function (bid) {
      var anchor = document.getElementById(bid);
      if (!anchor) return;
      d.after[bid].slice().reverse().forEach(function (html) {
        var p = document.createElement('p');
        p.className = 'block-p';
        p.setAttribute('data-es-only', '');
        p.innerHTML = html;
        anchor.insertAdjacentElement('afterend', p);
      });
    });

    var toc = document.querySelectorAll('a[href="#' + id + '"]');
    toc.forEach(function (a) {
      put(a.querySelector('.toc-title, .ntr-title'), esc(d.title));
      hide(a.querySelector('.toc-hook'));
    });

    if (d.fw) {
      var line = document.getElementById('fivewords-text');
      var lit = line && line.querySelector('.fw-word.is-visible');
      put(line, d.fw.text.split(' ').map(function (w) {
        return '<span class="fw-word' + (lit ? ' is-visible' : '') + '">' + esc(w) + '</span>';
      }).join(' '));
      put(document.getElementById('fivewords-ref'), esc(d.fw.ref));
      var fw = document.getElementById('five-words');
      if (fw) fw.setAttribute('lang', 'es');
    }
  }

  function restore() {
    saved.forEach(function (html, el) {
      // the five words may have been revealed while Spanish was up
      if (el.id === 'fivewords-text' && el.querySelector('.fw-word.is-visible')) {
        html = html.replace(/class="fw-word"/g, 'class="fw-word is-visible"');
      }
      el.innerHTML = html;
    });
    saved.clear();
    document.querySelectorAll('[data-es-only]').forEach(function (el) { el.remove(); });
    document.querySelectorAll('[data-es-hidden]').forEach(function (el) { el.removeAttribute('data-es-hidden'); });
    document.querySelectorAll('.section[lang="es"]').forEach(function (el) { el.removeAttribute('lang'); });
  }

  // Keep the reader on the line they were reading. The swap changes the height of
  // every paragraph above them — Spanish runs ~10% longer — so find the first
  // paragraph still on screen, and put it back where it was.
  // 🛑 behavior 'instant': html has scroll-behavior: smooth, and a smooth correction
  // is a visible glide the reader did not ask for.
  function withAnchor(change) {
    var nav = document.getElementById('site-nav');
    var floor = nav ? Math.max(0, nav.getBoundingClientRect().bottom) : 0;
    var els = document.querySelectorAll('[data-cue-id]');
    var anchor = null, before = 0;
    for (var i = 0; i < els.length; i++) {
      var r = els[i].getBoundingClientRect();
      if (r.bottom > floor) {
        if (r.top < window.innerHeight) { anchor = els[i]; before = r.top; }
        break;
      }
    }
    change();
    if (anchor) {
      var diff = anchor.getBoundingClientRect().top - before;
      if (Math.abs(diff) > 1) window.scrollTo({ top: window.scrollY + diff, behavior: 'instant' });
    }
    // js/motion.js and js/ui.js measure section offsets on resize.
    window.dispatchEvent(new Event('resize'));
  }

  function show(lang) {
    want = lang;
    if (lang === 'en') {
      if (shown === 'en') return;
      withAnchor(restore);
      shown = 'en';
      document.dispatchEvent(new CustomEvent('panim:text-lang', { detail: { lang: 'en' } }));
      return;
    }
    Promise.all(IDS.map(fetchChapter)).then(function (docs) {
      if (want !== 'es') return;   // switched back while the files were on their way
      withAnchor(function () {
        if (shown === 'es') restore();   // a retry after a partial load starts clean
        IDS.forEach(function (id, i) { if (docs[i]) applyChapter(id, docs[i]); });
      });
      shown = 'es';
      document.dispatchEvent(new CustomEvent('panim:text-lang', { detail: { lang: 'es' } }));
    });
  }

  document.addEventListener('panim:lang-change', function (e) {
    show(e.detail && e.detail.lang === 'es' ? 'es' : 'en');
  });
  // A chapter that could not be fetched offline is filled in when the network is back.
  window.addEventListener('online', function () {
    if (want === 'es' && IDS.some(function (id) { return !loaded[id]; })) show('es');
  });
})();
