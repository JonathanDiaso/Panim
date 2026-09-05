// PANIM — ui.js
// Interactive chrome: nav chapter list, About/Thread/Sleep/Mix sheets, onboarding modal,
// glossary gloss cards, image lightbox, share. Scroll-driven behavior (dawn arc, reveals,
// nav show/hide/fade, active-chapter tracking) lives in js/motion.js.
// 11-website-plan.md §3, §4.1 (C9), §6.1 (C4), component table C1/C9/C10/C15.

(function () {
  'use strict';

  // What Comes Back — seed→payoff map (11-website-plan.md §3 / build-brief "Thread panel").
  // Rendered by js/render.js as a set of native <details>; nothing is wired here.
  // Hardcoded per the book's seed-map (00-gameplan.md); each entry deep-links both anchors.
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // ---------- nav ----------
  function buildNav() {
    var chapters = (window.PANIM_RENDERED && window.PANIM_RENDERED.chapters) || [];
    var ul = $('#nav-chapters');
    ul.innerHTML = chapters.map(function (c) {
      return '<li><a href="#' + c.id + '" data-nav-ch="' + c.id + '" title="' + c.title.replace(/"/g, '') + '">' +
        window.PANIM_RENDERED.romanFor(c.num) + '</a></li>';
    }).join('');
    buildNavToc(chapters);
  }

  // ---------- the contents, in the running head ----------
  // Same ten chapters as the #contents section, in the chrome. Under 900px the
  // numerals are display:none, so before this existed a phone had no chapter
  // navigation at all and the player bar had to be the way in.
  function buildNavToc(chapters) {
    var host = $('#nav-toc-inner');
    if (!host) return;
    var A = window.PANIM_AUDIO || {};
    host.innerHTML = chapters.map(function (c) {
      var a = A[c.id] || {};
      var mins = a.voiceDur ? Math.round(a.voiceDur / 60) + ' min' : '';
      return '<a class="ntr" href="#' + c.id + '" data-nav-ch="' + c.id + '">' +
        '<span class="ntr-num">' + window.PANIM_RENDERED.romanFor(c.num) + '</span>' +
        '<span class="ntr-title">' + c.title.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>' +
        '<span class="ntr-dur">' + mins + '</span>' +
      '</a>';
    }).join('');

    // The back of the book, from the SAME list the contents section uses
    // (js/render.js BACK_MATTER, handed over on PANIM_RENDERED). Before this the
    // panel stopped at chapter X and the three apparatus sections had no way in.
    var back = (window.PANIM_RENDERED && window.PANIM_RENDERED.backMatter) || [];
    if (back.length) {
      host.innerHTML += '<span class="ntr-sep" aria-hidden="true"></span>' +
        back.map(function (b) {
          return '<a class="ntr ntr-back" href="#' + b.id + '">' +
            '<span class="ntr-num" aria-hidden="true">&middot;</span>' +
            '<span class="ntr-title">' + b.title + '</span>' +
            '<span class="ntr-dur">' + (b.count || '') + '</span>' +
          '</a>';
        }).join('');
    }
  }

  function navTocOpen() { return document.body.classList.contains('nav-toc-open'); }
  function setNavToc(open) {
    var panel = $('#nav-toc'), btn = $('#nav-toc-toggle');
    if (!panel || !btn) return;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('nav-toc-open', open);
    if (open) {
      panel.hidden = false;
      // the nav auto-hides on scroll-down; it must not take the open panel with it
      var nav = document.getElementById('site-nav');
      if (nav) nav.classList.remove('nav-hidden');
      requestAnimationFrame(function () { panel.classList.add('is-open'); });
    } else {
      panel.classList.remove('is-open');
      var done = function () { if (!navTocOpen()) panel.hidden = true; };
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) done();
      else setTimeout(done, 240);
    }
  }

  function wireNavToc() {
    var btn = $('#nav-toc-toggle'), panel = $('#nav-toc');
    if (!btn || !panel) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setNavToc(!navTocOpen());
    });
    // choosing a chapter closes it
    panel.addEventListener('click', function (e) {
      if (e.target.closest('.ntr')) setNavToc(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navTocOpen()) { setNavToc(false); btn.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (!navTocOpen()) return;
      if (e.target.closest('#nav-toc') || e.target.closest('#nav-toc-toggle')) return;
      setNavToc(false);
    });
  }
  window.PANIM_NAVTOC = { close: function () { setNavToc(false); }, isOpen: navTocOpen };

  // ---------- focus trap (shared: sheets, modals, the Listening Room) ----------
  // One permanent Tab listener rather than one added and removed per overlay: a
  // sheet only covers part of the viewport on desktop and .modal / #room have no
  // native way to stop Tab walking into the page behind them, so whatever is
  // focused decides whether this does anything. No-op unless focus is actually
  // inside an open overlay, so it is safe to leave wired for the life of the page.
  function focusableIn(host) {
    return $all('a[href], button:not([disabled]), input:not([disabled]), ' +
      'textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])', host)
      .filter(function (n) { return n.offsetParent !== null; });
  }
  function openOverlayHost(el) {
    return el.closest && el.closest(
      '.sheet:not([hidden]), .modal:not([hidden]) .modal-card, #room.is-open, #lightbox:not([hidden])');
  }
  function trapOverlayTab(e) {
    if (e.key !== 'Tab') return;
    var host = document.activeElement && openOverlayHost(document.activeElement);
    if (!host) return;
    var f = focusableIn(host);
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  // ---------- sheets ----------
  var lastFocused = null;
  var sheetTriggers = {};   // sheet id -> the button that opened it, for aria-expanded
  function openSheet(id, triggerEl) {
    var el = document.getElementById(id);
    if (!el) return;
    lastFocused = document.activeElement;
    if (triggerEl) { sheetTriggers[id] = triggerEl; triggerEl.setAttribute('aria-expanded', 'true'); }
    el.hidden = false;
    // 🛑 NOT requestAnimationFrame, 2026-08-29. rAF is a RENDERING callback and the
    // browser suspends it whenever the document is not being painted — a background
    // tab, a blanked screen, an automation context. If the frame never lands, focus
    // never enters the dialog and a keyboard user is left standing outside an open
    // modal with no announcement that it opened. js/room.js has always focused
    // synchronously; this was the only overlay in the site that did not, and two
    // implementations of one pattern is how this project keeps getting bitten.
    // Diagnosed 2026-08-29 by measuring: document.visibilityState went 'hidden' and
    // every scheduled rAF stopped firing while the sheet was open and visible.
    var closeBtn = $('.sheet-close', el);
    if (closeBtn) closeBtn.focus();
    document.addEventListener('keydown', onSheetKeydown);
  }
  function closeSheet(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.hidden = true;
    document.removeEventListener('keydown', onSheetKeydown);
    if (sheetTriggers[id]) { sheetTriggers[id].setAttribute('aria-expanded', 'false'); delete sheetTriggers[id]; }
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }
  function onSheetKeydown(e) {
    if (e.key === 'Escape') {
      $all('.sheet:not([hidden])').forEach(function (el) { closeSheet(el.id); });
    }
  }

  function wireSheets() {
    var aboutBtn = $('#about-btn'), sleepBtn = $('#sleep-btn');
    aboutBtn.addEventListener('click', function () { openSheet('about-sheet', aboutBtn); });
    sleepBtn.addEventListener('click', function () { openSheet('sleep-sheet', sleepBtn); });
    $all('[data-close-sheet]').forEach(function (btn) {
      btn.addEventListener('click', function () { closeSheet(btn.getAttribute('data-close-sheet')); });
    });
    document.addEventListener('keydown', trapOverlayTab);
    // nav Listen opens the Listening Room (js/room.js also listens on this button)

    // js/search.js owns the search sheet's contents but not the sheet plumbing —
    // opening, the focus trap, Escape and the aria-expanded bookkeeping all live
    // here and there is exactly one implementation of them. It asks by event.
    document.addEventListener('panim:open-sheet', function (e) {
      var id = e.detail && e.detail.id;
      if (id) openSheet(id, document.getElementById(id.replace('-sheet', '-btn')));
    });
    document.addEventListener('panim:close-sheet', function (e) {
      if (e.detail && e.detail.id) closeSheet(e.detail.id);
    });
  }

  // ---------- the invitation (first visit only) ----------
  function wireOnboarding() {
    var KEY = 'panim:onboarded';
    var modal = $('#onboarding-modal');
    if (!localStorage.getItem(KEY)) {
      modal.hidden = false;
      $('#onboarding-begin').focus();
    }
    function dismiss() { localStorage.setItem(KEY, '1'); modal.hidden = true; }

    $('#onboarding-begin').addEventListener('click', function () {
      dismiss();
      document.dispatchEvent(new CustomEvent('panim:listen-chapter', { detail: { chapterId: 'ch01' } }));
    });
    // "Read instead" closes the invitation and drops the reader at the contents,
    // which is the whole point of having a contents page.
    var read = $('#onboarding-read');
    if (read) read.addEventListener('click', function () {
      dismiss();
      var toc = document.getElementById('contents');
      if (toc) toc.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    // Escape dismisses without starting anything
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) dismiss();
    });
  }

  // ---------- glossary gloss cards (C9) ----------
  function wireGloss() {
    var card = $('#gloss-card');
    var openTerm = null;

    function show(el) {
      card.textContent = el.getAttribute('data-gloss-text');
      card.hidden = false;
      var r = el.getBoundingClientRect();
      var top = r.bottom + window.scrollY + 8;
      var left = Math.min(r.left + window.scrollX, window.innerWidth - 336);
      card.style.top = top + 'px';
      card.style.left = Math.max(8, left) + 'px';
      requestAnimationFrame(function () { card.classList.add('is-open'); });
      openTerm = el;
    }
    function hide() {
      card.classList.remove('is-open');
      openTerm = null;
    }

    // 🛑 HOVER IS BOUND ONLY ON DEVICES THAT ACTUALLY HOVER.
    // A tap on a touchscreen fires mouseover AND click, in that order. With both
    // bound, tapping a Hebrew word ran show() on the mouseover and then click saw
    // openTerm === t and ran hide() — so the card opened and shut inside one tap and
    // the glossary had never worked on a phone. Keyboard focus and click are bound
    // unconditionally; only the pointer-hover pair is gated.
    var canHover = !window.matchMedia || window.matchMedia('(hover: hover)').matches;
    if (canHover) {
      document.addEventListener('mouseover', function (e) {
        var t = e.target.closest && e.target.closest('.gloss-term, .chapter-mark[data-gloss-text]');
        if (t) show(t);
      });
      document.addEventListener('mouseout', function (e) {
        var t = e.target.closest && e.target.closest('.gloss-term, .chapter-mark[data-gloss-text]');
        if (t) hide();
      });
    }
    // On a phone there is no mouse-out, so a tapped card needs another way to go.
    // A tap elsewhere already closes it (below); scrolling away closes it too.
    // Not bound on a hover device: there the card is anchored in document
    // coordinates and rides the page correctly, and mouseout already handles it.
    if (!canHover) {
      addEventListener('scroll', function () { if (openTerm) hide(); }, { passive: true });
    }
    document.addEventListener('focusin', function (e) {
      var t = e.target.closest && e.target.closest('.gloss-term, .chapter-mark[data-gloss-text]');
      if (t) show(t);
    });
    document.addEventListener('focusout', function (e) {
      var t = e.target.closest && e.target.closest('.gloss-term, .chapter-mark[data-gloss-text]');
      if (t) hide();
    });
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('.gloss-term, .chapter-mark[data-gloss-text]');
      if (t) {
        e.preventDefault();
        if (openTerm === t) hide(); else show(t);
      } else if (!e.target.closest('#gloss-card')) {
        hide();
      }
    });
  }

  // ---------- lightbox (C10) ----------
  // WCAG 2.1.1 — this used to open on a bare `click` listener only. js/render.js's
  // .img-slot carried no tabindex and no role, so the zoom was mouse-only: a
  // keyboard user could not reach it at all, with no way to know it was there.
  // The slot is now a real button (tabindex="0" role="button", set in render.js)
  // and Enter/Space open it the same way a click does. Opening and closing also
  // now move focus rather than leaving it on a slot the overlay has covered.
  function wireLightbox() {
    var box = $('#lightbox');
    var img = $('#lightbox-img');
    var lastSlotFocused = null;
    function open(slot) {
      var slotImg = $('img', slot);
      lastSlotFocused = document.activeElement;
      img.setAttribute('src', slotImg.getAttribute('src'));
      img.setAttribute('alt', slotImg.getAttribute('alt') || '');
      box.hidden = false;
      requestAnimationFrame(function () { $('#lightbox-close').focus(); });
    }
    function close() {
      if (box.hidden) return;
      box.hidden = true;
      img.src = '';
      if (lastSlotFocused && lastSlotFocused.focus) lastSlotFocused.focus();
      lastSlotFocused = null;
    }
    document.addEventListener('click', function (e) {
      var slot = e.target.closest && e.target.closest('.img-slot.is-filled');
      if (slot) open(slot);
    });
    // THE ENTER/SPACE HANDLER IS GONE, 2026-08-29. The slot is a real <button>
    // now (js/render.js — role="button" on a <figure> is not allowed by ARIA), and
    // a button already fires click on both keys. Keeping this would have opened the
    // lightbox twice on Enter and fought the browser's own Space behaviour.
    $('#lightbox-close').addEventListener('click', close);
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !box.hidden) close();
    });
  }

  // ---------- listen-from-here (dispatches to player.js) ----------
  function wireListenButtons() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('[data-listen-chapter]');
      if (btn) {
        document.dispatchEvent(new CustomEvent('panim:listen-chapter', {
          detail: { chapterId: btn.getAttribute('data-listen-chapter') }
        }));
      }
    });
    // The hero button knew which chapter you were last in but always restarted it
    // from zero, which is not "continue" — it is "start this chapter again". It now
    // carries the saved position through, and says so on its face.
    var beginBtn = $('#begin-btn');
    function savedPlace() {
      try {
        var ch = JSON.parse(localStorage.getItem('panim:lastChapter'));
        var pos = JSON.parse(localStorage.getItem('panim:lastPos'));
        if (ch && typeof pos === 'number' && pos > 10) return { chapterId: ch, pos: pos };
      } catch (e) {}
      return null;
    }
    function fmt(s) {
      s = Math.floor(s); var m = Math.floor(s / 60);
      return m + ':' + String(s % 60).padStart(2, '0');
    }
    var place = savedPlace();
    if (place && beginBtn) {
      var rendered = window.PANIM_RENDERED;
      var num = rendered ? rendered.romanFor(parseInt(place.chapterId.replace('ch', ''), 10)) : '';
      beginBtn.textContent = 'Continue: ' + (num ? num + ', ' : '') + fmt(place.pos);
    }
    if (beginBtn) beginBtn.addEventListener('click', function () {
      var p = savedPlace();
      document.dispatchEvent(new CustomEvent('panim:listen-chapter', {
        detail: p ? { chapterId: p.chapterId, seekTo: p.pos } : { chapterId: 'ch01' }
      }));
    });

    // ---------- the second door, intercepted ----------
    // 🛑 THIS IS THE "GLITCH", AND IT WAS A FULL PAGE RELOAD.
    // The card is <a href="?t=ch07:22m49s">, which is a real navigation. Clicking
    // it tore the page down, refetched seventeen scripts — 363KB of chapters.js
    // among them — re-rendered all ten chapters and the whole apparatus, and only
    // then did js/player.js maybeDeepLink() call loadChapter(). So the reader got
    // a white flash and a wait, and at the end of it THE AUDIO DID NOT START:
    // maybeDeepLink passes seekTo and no autoplay, and even if it did, the user
    // gesture that permits playback died with the document. A tap that costs two
    // seconds and then plays nothing reads as a broken button, which is what it was.
    // Intercepted, it is the exact path the tap-to-listen handler in js/sync.js
    // already takes: follow on, one event, player seeks and plays inside the gesture.
    // ⚠️ THE href STAYS AND MUST KEEP WORKING. It is the shareable URL, the
    // right-click target, and the no-JS path — and a modified click (new tab, new
    // window, download) must fall through to the browser untouched, which is what
    // the modifier test below is for. Do not "simplify" it to a <button>.
    // ⚠️ IT IS NOT IN THE HERO ANY MORE, 2026-09-05 — it is built by
    // renderPlateIndex() in js/render.js and lives under the ribbon of ten plates.
    // This still works, and the reason is the wiring order: init() runs on
    // `panim:rendered`, which render.js fires only after root.innerHTML is set, so
    // the element exists by the time this looks for it. The id and class kept their
    // hero-* names on purpose; see the note in js/render.js.
    var sample = $('#hero-sample');
    if (sample) sample.addEventListener('click', function (e) {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var m = /[?&]t=ch(\d+):(?:(\d+)m)?(\d+)s?/.exec(sample.getAttribute('href') || '');
      if (!m) return;                                   // malformed href: let it navigate
      e.preventDefault();
      var chapterId = 'ch' + ('0' + m[1]).slice(-2);
      var seekTo = parseInt(m[2] || 0, 10) * 60 + parseInt(m[3], 10);
      // the page has to come with them, and following is how this book moves
      if (window.PANIM_SYNC) window.PANIM_SYNC.setFollow(true);
      document.dispatchEvent(new CustomEvent('panim:listen-chapter', {
        detail: { chapterId: chapterId, seekTo: seekTo }
      }));
    });
  }

  // ---------- share (About sheet) ----------
  function wireShare() {
    $('#share-btn').addEventListener('click', function () {
      var shareData = {
        title: 'PANIM: The Invitation Hidden on Every Page',
        text: 'An audio-first journey through the Hebrew word for face, across the whole Bible.',
        url: location.href.split('#')[0]
      };
      if (navigator.share) {
        navigator.share(shareData).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareData.url).then(function () {
          $('#share-btn').textContent = 'Link copied';
          setTimeout(function () { $('#share-btn').textContent = 'Share this book'; }, 2000);
        });
      }
    });
  }

  // ---------- share a single chapter ----------
  // The URL is NOT location.href + '#chNN'. That link unfurls as the whole book,
  // because index.html is one file with one set of Open Graph tags. It is
  // /c/NN/ — a generated stub carrying that chapter's own title, standfirst and
  // plate, which redirects a reader into the book (tools/gen-chapter-stubs.py).
  //
  // The base is derived from location, not hardcoded, so it is right on
  // localhost, on the Pages subpath and anywhere else the site is served.
  function chapterShareUrl(num) {
    var base = location.href.split('#')[0].replace(/(index\.html)?$/, '');
    if (base.charAt(base.length - 1) !== '/') base += '/';
    return base + 'c/' + (num < 10 ? '0' + num : num) + '/';
  }
  function wireChapterShare() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-share-chapter]');
      if (!b) return;
      var id = b.getAttribute('data-share-chapter');
      var num = +b.getAttribute('data-share-num');
      var ch = (window.PANIM_CHAPTERS || []).filter(function (c) { return c.id === id; })[0] || {};
      var url = chapterShareUrl(num);
      var label = b.textContent;
      var data = { title: 'PANIM: ' + (ch.title || ''), text: ch.hook || '', url: url };
      if (navigator.share) {
        navigator.share(data).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () {
          b.textContent = 'Link copied';
          setTimeout(function () { b.textContent = label; }, 2000);
        }, function () {});
      }
    });
  }

  // ---------- contents: the standfirsts fold ----------
  // The list ran 1225px against an 813px viewport, so the descriptions are folded.
  // Nothing is removed: every title, numeral and running time stays visible in either
  // state, which is why this is a disclosure and not a filter.
  //
  // 🛑 IT ALWAYS STARTS CLOSED, AND THE CHOICE IS DELIBERATELY NOT REMEMBERED.
  // It used to persist in localStorage['panim:tocOpen']. The author's instruction
  // (2026-09-03) is that the contents must be closed every time so the reader is the
  // one who opens it. This book is shared by link to people opening it for the first
  // time, and the first screen has one job: the chapter, not an index of ten of them.
  // A remembered open state meant the ONE reader who had expanded it once — the
  // author, on the device he checks it from — saw a page no first-time visitor ever
  // sees, which is the worst possible person to be blind to it.
  function wireContentsToggle() {
    var btn = document.getElementById('toc-expand');
    var section = document.getElementById('contents');
    if (!btn || !section) return;

    function apply(open) {
      section.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Close the contents' : 'Table of Contents';
    }
    apply(false);

    btn.addEventListener('click', function () {
      apply(btn.getAttribute('aria-expanded') !== 'true');
    });
  }

  function init() {
    buildNav();
    wireNavToc();
    wireContentsToggle();
    wireSheets();
    wireOnboarding();
    wireGloss();
    wireLightbox();
    wireListenButtons();
    wireShare();
    wireChapterShare();
    wireLexiconFilter();
    wireLexiconSort();
    wireLexiconWall();
    wirePlateRibbon();
  }

  // ---------- the lexicon filter ----------
  //
  // The filtering itself is one attribute: css/components.css hides every plate whose
  // data-ch does not match .lex-plates[data-filter]. No display juggling per element,
  // no layout thrash, and the grid reflows on its own.
  //
  // 🛑 THE ONE THING THAT WOULD BREAK IF THIS WERE NAIVE. A lexicon word is invisible
  // until its plate gets .is-drawn — the ink mask sits at 0% — and js/motion.js
  // unobserves each plate the moment it fires, once. A plate that was hidden by a
  // filter before it was ever scrolled past therefore has no observer left to fire,
  // and filtering back to it would show an empty frame. So on any filter change,
  // every plate that has not been drawn yet is drawn now. That is also the right call
  // for the reader: the sweep is a first-encounter effect, and someone using a filter
  // is searching, not being introduced.
  function wireLexiconFilter() {
    var row = document.querySelector('.lex-filter');
    var wall = document.getElementById('lex-wall');
    if (!row || !wall) return;
    row.addEventListener('click', function (e) {
      var btn = e.target.closest('.lex-filter-btn');
      if (!btn) return;
      var want = btn.getAttribute('data-filter');
      $all('.lex-filter-btn', row).forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      if (want === 'all') wall.removeAttribute('data-filter');
      else wall.setAttribute('data-filter', want);
      // If the word currently open in the apparatus column has just been filtered
      // out of the wall, the article is describing a word the reader can no longer
      // see. Move to the first word the filter DID leave standing.
      var open = document.querySelector('.lex-plate:not([hidden])');
      var stillShown = open && document.querySelector(
        '.lex-chip[data-lex="' + open.getAttribute('data-lex-entry') + '"]');
      if (stillShown && stillShown.offsetParent === null) {
        var first = $all('.lex-chip', wall).filter(function (c) { return c.offsetParent !== null; })[0];
        if (first) selectLexWord(first.getAttribute('data-lex'), false);
      }
    });
  }

  // ---------- the lexicon sort ----------
  //
  // Chapter order is the book's order and it is the default, because the lexicon is
  // the back of THIS book before it is a dictionary. A–Z by transliteration is the
  // other half of what the page is for: it is how you look a word up when you only
  // half-remember it.
  //
  // 🛑 IT MOVES THE NODES. It does NOT set flexbox `order`.
  // `order` was written first and thrown away, and the reason is worth keeping: the
  // wall is fifty focusable <button>s, and `order` repaints them without touching the
  // DOM — so the eye would read A, B, C while Tab walked chapter I, II, III. That is
  // WCAG 2.4.3 exactly, and on a wall whose entire job is lookup it is not a
  // technicality: a keyboard reader would tab into apparent nonsense.
  // Moving nodes costs one layout, into a fragment, once per tap. Focus survives it —
  // a focused element that is re-appended keeps focus — and every id travels with its
  // node, so `#lex-panim` and every other deep link still land.
  // The alphabetical rank is computed ONCE, on the first tap, off data-t — the same
  // string the chip already shows.
  function wireLexiconSort() {
    var row = document.querySelector('.lex-sort');
    var wall = document.getElementById('lex-wall');
    if (!row || !wall) return;
    var bookOrder = $all('.lex-chip', wall);          // the order the render produced
    var azOrder = null;

    function alphabetical() {
      if (azOrder) return azOrder;
      // localeCompare, not <, so the apostrophe in El Ro'i and the hyphen in
      // mi-yitten sort where a reader expects them and not where a byte does.
      azOrder = bookOrder.slice().sort(function (a, b) {
        return String(a.getAttribute('data-t')).localeCompare(String(b.getAttribute('data-t')));
      });
      return azOrder;
    }

    // 🛑 THE ENTRY COMES OUT OF THE WALL FIRST. Since D22-B the open entry is a
    // block sitting between two chips inside this container, and re-appending every
    // chip would leave it stranded at the top of the wall, describing whatever word
    // now happens to be first. Out, sort, back under its own word.
    function lay(list) {
      lexHome();
      var frag = document.createDocumentFragment();
      list.forEach(function (c) { frag.appendChild(c); });
      wall.appendChild(frag);
      lexReseat();
    }

    row.addEventListener('click', function (e) {
      var btn = e.target.closest('.lex-filter-btn');
      if (!btn) return;
      var want = btn.getAttribute('data-sort');
      $all('.lex-filter-btn', row).forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      lay(want === 'az' ? alphabetical() : bookOrder);
      wall.setAttribute('data-sort', want);
    });
  }

  // ---------- the lexicon wall ----------
  //
  // Fifty words set as one block of type; choosing one opens its entry in the
  // apparatus column beside it. The animation used to be a first-encounter effect
  // driven by an IntersectionObserver as each plate scrolled past; there is only one
  // entry visible now, so the trigger moves here — the word draws itself at the
  // moment the reader asks for it, which is when they are actually looking at it.
  //
  // 🛑 INK_MS AND ROOT_HOLD_MS ARE THE SAME TWO NUMBERS AS js/motion.js, and both
  // must match the --lex-ink transition in css/components.css. If the root starts
  // dimming before the nib has finished, the reader watches a word being written and
  // taken apart at once.
  var LEX_INK_MS = 2600, LEX_ROOT_HOLD_MS = 900;
  function drawLexEntry(entry) {
    if (!entry || entry.classList.contains('is-drawn')) return;
    // a frame between "shown" and "drawn" so the mask animates from 0 rather than
    // being painted at 0 and 100 in the same style recalculation
    entry.classList.remove('is-rooted');
    setTimeout(function () {
      entry.classList.add('is-drawn');
      if (entry.querySelector('.lex-g.is-root')) {
        setTimeout(function () { entry.classList.add('is-rooted'); },
          LEX_INK_MS + LEX_ROOT_HOLD_MS);
      }
    }, 20);
  }
  // ==========================================================================
  // 🛑 THE ENTRY OPENS INSIDE THE WALL, UNDER THE WORD YOU TAPPED — D22-B
  // 2026-08-30, the author: *"the thing moving at the top actually hides that ...
  // is there an alternative design that will allow us to see them load up and will
  // also not have to scroll up and down to get back to it. the box is also big and
  // ugly."*
  //
  // Three layouts have now been tried against one requirement — choose a word
  // without losing your place — and the first two both answered it with a panel:
  //   v42  pinned to the top of the screen. The page stopped moving; the words you
  //        were reading went off the bottom instead.
  //   v43  centred in the viewport. Words above and below, and a 379px floor so no
  //        entry could reflow the page — which is a 379px shutter over a 1,312px
  //        wall, sitting there from the moment the section arrives.
  // Both are boxes over the words. The box is the bug. There is no place to float a
  // panel on a phone that is not on top of the thing it describes.
  //
  // So the entry stops floating and joins the type. It is a BLOCK inserted directly
  // after the chosen word, inside the wall's own inline flow — the line breaks under
  // that word, the entry sets in the gap, and the wall closes over it again. This is
  // what a dictionary does with a headword and what an index does with a sub-entry,
  // and it is the only arrangement where the answer is physically attached to the
  // question. Nothing is covered, because nothing is on top.
  //
  // ⚠️ IT IS THE INSERTION THAT NEEDS THE SCROLL, NOT THE READER. Moving the entry
  // from a previous word ABOVE the new one shortens everything above the tap, so the
  // word under the reader's finger would jump up ~350px as it opens. The chip's
  // viewport-top is therefore measured before the move and restored after it with a
  // scrollBy — the tapped word ends the interaction on the exact pixel it started on.
  // This is scroll anchoring done by hand, and it is the whole reason the layout is
  // allowed to reflow at all.
  //
  // Desktop keeps the aside column: there the entry sits BESIDE the wall and covers
  // nothing, so there is nothing to fix.
  // ==========================================================================
  var LEX_INLINE_MQ = window.matchMedia('(max-width: 900px)');
  function lexInline() { return LEX_INLINE_MQ.matches; }
  function lexHome() {
    var article = document.getElementById('lex-article');
    var body = document.querySelector('.lex-body');
    if (article && body && article.parentNode !== body) body.appendChild(article);
  }
  // Re-seat the entry after any operation that rewrites the wall. The sort MOVES
  // NODES and the filter can retire the open word, and both would otherwise leave a
  // block of prose stranded at the top of a wall it no longer belongs to.
  function lexReseat() {
    var wall = document.getElementById('lex-wall');
    var open = document.querySelector('.lex-plate:not([hidden])');
    if (!wall || !open) { lexHome(); return; }
    var chip = wall.querySelector('.lex-chip[data-lex="' + open.getAttribute('data-lex-entry') + '"]');
    var article = document.getElementById('lex-article');
    if (!chip || !article) { lexHome(); return; }
    if (!lexInline()) { lexHome(); return; }
    if (chip.nextSibling !== article) chip.parentNode.insertBefore(article, chip.nextSibling);
  }
  function selectLexWord(slug, moveFocus) {
    var article = document.getElementById('lex-article');
    var wall = document.getElementById('lex-wall');
    if (!article || !wall || !slug) return false;
    var entry = article.querySelector('[data-lex-entry="' + slug + '"]');
    var chip = wall.querySelector('.lex-chip[data-lex="' + slug + '"]');
    if (!entry || !chip) return false;
    // measured FIRST — before the plate swap changes the entry's height and before
    // the move changes what is above the chip. Both happen below this line.
    var inline = lexInline();
    var before = inline ? chip.getBoundingClientRect().top : 0;
    $all('.lex-plate', article).forEach(function (p) { p.hidden = p !== entry; });
    $all('.lex-chip', wall).forEach(function (c) {
      var on = c === chip;
      c.classList.toggle('is-on', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    drawLexEntry(entry);
    if (inline) {
      if (chip.nextSibling !== article) chip.parentNode.insertBefore(article, chip.nextSibling);
      var after = chip.getBoundingClientRect().top;
      // 🛑 `behavior: 'instant'`, SPELLED OUT, and it is not belt and braces.
      // css/site.css sets `html { scroll-behavior: smooth }`, and a CSS smooth
      // scroll applies to programmatic scrolls too — so `scrollBy(0, d)` and
      // `behavior: 'auto'` both ANIMATE this correction over ~300ms. The reader
      // would watch the page slide back, which is the page moving: the exact thing
      // the correction exists to prevent. Caught by measurement, 2026-08-30: the
      // two-argument form left the tapped word 353px off its mark.
      if (after !== before) window.scrollBy({ top: after - before, behavior: 'instant' });
    } else {
      lexHome();
    }
    if (moveFocus) chip.focus();
    return true;
  }
  // A reader who rotates a phone or drags a window across the 900px line changes
  // which layout is correct, and the entry is a DOM node in one of two places. This
  // is the only listener that moves it without a reader asking for anything.
  if (LEX_INLINE_MQ.addEventListener) {
    LEX_INLINE_MQ.addEventListener('change', function () { lexReseat(); });
  } else if (LEX_INLINE_MQ.addListener) {
    LEX_INLINE_MQ.addListener(function () { lexReseat(); });
  }
  // THE WALL WRITES ITSELF ONCE, ON FIRST ARRIVAL — 2026-08-30 (D15-C).
  //
  // 🛑 ONCE PER VISIT, AND THEN THE MASK IS TAKEN OFF. The whole argument for this
  // effect is that it is an INTRODUCTION: the page assembles itself as the reader
  // gets there, and from then on a word drawing means "here is the answer you asked
  // for". Running it twice would spend the second meaning to repeat the first. It
  // is not persisted to storage — a reader who comes back next week is arriving
  // again, and the wall is the thing they came back to look at.
  //
  // The stagger is a WASH, not a queue: 12ms per chip spreads fifty words over
  // 600ms against a 2600ms draw, so they are all writing at once and the ink simply
  // reaches the far corner last. A per-chip sequence would be a loading bar.
  //
  // ⚠️ THE CLASS IS REMOVED WHEN IT FINISHES, and that is not tidiness. The mask on
  // .lex-chip-word is a live compositing layer on fifty elements; left on, the sort
  // (which MOVES DOM NODES) and the filter would both reflow through it for the rest
  // of the session. Off, the wall is plain type again.
  var LEX_WALL_STAGGER_MS = 12, LEX_WALL_DRAW_MS = 2600, LEX_WALL_TAIL_MS = 700;
  function inkTheWall(wall) {
    if (!wall || wall.dataset.inked === '1') return;
    wall.dataset.inked = '1';
    var chips = $all('.lex-chip', wall);
    if (!chips.length) return;
    chips.forEach(function (c, i) {
      c.querySelector('.lex-chip-word').style.setProperty('--lex-delay', (i * LEX_WALL_STAGGER_MS) + 'ms');
      c.style.setProperty('--lex-delay', (i * LEX_WALL_STAGGER_MS) + 'ms');
      c.querySelector('.lex-chip-t').style.setProperty('--lex-delay', (i * LEX_WALL_STAGGER_MS) + 'ms');
    });
    wall.classList.add('is-inking');
    // a frame between "masked at 0" and "told to go to 112" so the transition has
    // two values to interpolate, rather than both landing in one style recalc.
    // 🛑 A DOUBLE rAF, not one. document.visibilityState can flip to hidden and
    // starve rAF entirely (see README §6), so the timeout is the floor, not a
    // belt-and-braces: whichever fires first wins and the other is a no-op.
    var started = false;
    function go() {
      if (started) return; started = true;
      wall.classList.add('is-drawn');
      var total = LEX_WALL_DRAW_MS + (chips.length * LEX_WALL_STAGGER_MS) + LEX_WALL_TAIL_MS;
      setTimeout(function () {
        wall.classList.remove('is-inking', 'is-drawn');
        chips.forEach(function (c) {
          c.style.removeProperty('--lex-delay');
          c.querySelector('.lex-chip-word').style.removeProperty('--lex-delay');
          c.querySelector('.lex-chip-t').style.removeProperty('--lex-delay');
        });
        openLexDefault();
      }, total);
    }
    requestAnimationFrame(function () { requestAnimationFrame(go); });
    setTimeout(go, 120);
  }

  // 🛑 AFTER THE INK, AND ON A WIDE SCREEN ONLY — D22-A.
  // The section renders with nothing open so the wall can write itself unobstructed
  // (js/render.js says why). On a wide screen the apparatus column would then stand
  // empty beside it, so the book's own word opens there once the writing has
  // finished — which reads as the first answer arriving, not as a panel that was
  // already up. On a phone the entry lives IN the wall, so opening one uninvited
  // would shove the words the reader is looking at down the page. There it waits to
  // be asked. A deep link (#lex-panim) still opens at any width; that is a reader
  // asking.
  function openLexDefault() {
    if (lexInline()) return;
    var wall = document.getElementById('lex-wall');
    if (!wall || document.querySelector('.lex-plate:not([hidden])')) return;
    var slug = wall.getAttribute('data-default');
    if (slug) selectLexWord(slug, false);
  }

  function wireLexiconWall() {
    var wall = document.getElementById('lex-wall');
    if (!wall) return;
    // First arrival only. The section carries content-visibility, so it is not
    // painted until the reader is near it anyway — the observer is what tells us
    // the reader actually GOT here rather than deep-linking past.
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (rows) {
        rows.forEach(function (r) {
          if (!r.isIntersecting) return;
          io.disconnect();
          inkTheWall(wall);
        });
      }, { rootMargin: '0px 0px -20% 0px' });
      io.observe(wall);
    } else {
      // no observer means no ink, so there is no "after the ink" to wait for.
      openLexDefault();
    }
    // ⚠️ A BACKSTOP, AND IT IS NOT PARANOIA. The default now opens from inside the
    // ink's completion callback, so on a wide screen the apparatus column is empty
    // until the observer fires — and if it never fires, it is empty for the session.
    // That is a worse failure than the one this change fixed, and it is invisible in
    // a headless harness (an IntersectionObserver on a content-visibility section
    // inside an iframe does not fire there, which is how this line got written).
    // 15s is long past any ink and costs nothing if the wall already opened one:
    // openLexDefault() returns early when a plate is showing. Phones are excluded
    // there, so the wall is never interrupted on the screen that matters.
    setTimeout(openLexDefault, 15000);
    wall.addEventListener('click', function (e) {
      var chip = e.target.closest('.lex-chip');
      if (chip) selectLexWord(chip.getAttribute('data-lex'), false);
    });
    // The hero's פָּנִים is a link to #lex-panim, and every chip carries its slug as
    // an id, so the browser scrolls there on its own. This is what makes the link
    // OPEN the word rather than merely park beside it.
    function fromHash() {
      var h = (location.hash || '').replace('#', '');
      if (h.indexOf('lex-') === 0) selectLexWord(h, false);
    }
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  // ---------- THE PLATES: the ribbon ----------
  //
  // The markup is js/render.js renderPlateIndex(); the look is css/components.css.
  // This is only the three behaviours that cannot be CSS: which plate is lit, the
  // caption that follows it, and the drift on browsers without scroll-driven
  // animations. The travel itself is the browser's own scroller and nothing here
  // touches it.
  function wirePlateRibbon() {
    var rail = document.getElementById('pl-rail');
    var hookEl = document.getElementById('pl-hook');
    if (!rail || !hookEl) return;

    var plates = [].slice.call(rail.querySelectorAll('.pl-plate'));
    if (!plates.length) return;

    var chapters = window.PANIM_CHAPTERS || [];
    var hooks = plates.map(function (p) {
      var n = +p.getAttribute('data-n');
      for (var i = 0; i < chapters.length; i++) if (chapters[i].num === n) return chapters[i].hook || '';
      return '';
    });

    var REDUCED = window.matchMedia &&
                  matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ⚠️ WHICH PLATE IS LIT IS MEASURED, NOT OBSERVED, AND AN OBSERVER GOT IT
    // WRONG FIRST. An IntersectionObserver over a leading band looks right and is
    // subtly not: at the end of the rail the outgoing plate still has its tail in
    // the band, so chapter IX stayed lit while chapter X sat at the gutter. And an
    // observer callback carries only the entries that CHANGED, so it can never
    // answer "which of the ten is nearest" from a single delivery.
    //
    // 🛑 SO THE SNAP POSITIONS ARE CACHED ONCE AND THE HANDLER IS ARITHMETIC. Each
    // plate's snap offset is a constant until the layout changes; after that,
    // finding the leading plate is ten subtractions on numbers already in memory.
    // No getBoundingClientRect and nothing read from the DOM in a scroll handler.
    // one capability read, used by the drift, the sway and the caption timing
    var CSS_DRIFT = window.CSS && CSS.supports &&
                    CSS.supports('animation-timeline', 'view(inline)');

    // ⚠️ THE CLASSIC SCROLLBAR, MEASURED RATHER THAN ASSUMED. css/components.css
    // spans the rail to the window with a sum that has to subtract it; macOS and
    // iOS report 0 here (overlay scrollbars) and Windows reports about 15. It is
    // written on <html> rather than the rail so the value is resolved once for
    // the whole document, and re-read on resize because a zoom changes it.
    function measureScrollbar() {
      var sbw = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--sbw', (sbw > 0 ? sbw : 0) + 'px');
      // and the snap line, as a real length — see the scroll-padding note in
      // css/components.css. The browser has already resolved the padding correctly,
      // so this copies that answer rather than re-deriving it and risking a
      // second, differently-wrong sum.
      rail.style.removeProperty('--pl-snap');
      rail.style.setProperty('--pl-snap', getComputedStyle(rail).paddingLeft);
    }
    measureScrollbar();

    var snaps = [], pad = 0;
    function measure() {
      measureScrollbar();
      pad = parseFloat(getComputedStyle(rail).scrollPaddingLeft) || 0;
      var base = rail.getBoundingClientRect().left + rail.scrollLeft;
      snaps = plates.map(function (p) {
        return p.getBoundingClientRect().left + rail.scrollLeft - base - pad;
      });
    }
    function leading() {
      var x = rail.scrollLeft, best = 0, bestD = Infinity;
      for (var i = 0; i < snaps.length; i++) {
        var d = Math.abs(snaps[i] - x);
        if (d < bestD) { bestD = d; best = i; }
      }
      return best;
    }

    var lit = -1, hookTimer = 0;
    function setLit(i) {
      if (i === lit || i < 0) return;
      if (lit >= 0) plates[lit].classList.remove('is-lit');
      lit = i;
      plates[i].classList.add('is-lit');
      // fade out, swap the text at the bottom of the fade, fade back in. A hard cut
      // on a 90-character sentence reads as a glitch, and a true crossfade of two
      // different paragraphs on top of each other is unreadable. One element.
      hookEl.classList.add('is-swapping');
      clearTimeout(hookTimer);
      hookTimer = setTimeout(function () {
        hookEl.textContent = hooks[i];
        hookEl.classList.remove('is-swapping');
      }, REDUCED ? 0 : 200);
    }

    // ---------- the drift, fallback path ----------
    // Only built where the CSS scroll-driven path is missing. `pl-sda` on <html> is
    // what switches the @supports block in css/components.css on, so exactly one of
    // the two implementations is ever active and neither knows about the other.
    var DRIFT_JS = !CSS_DRIFT && !REDUCED;
    var imgs = DRIFT_JS ? plates.map(function (p) { return p.querySelector('img'); }) : null;
    // 🛑 ONE NUMBER, AND IT IS THE STYLESHEET'S. The first build hard-coded 5 here
    // while the keyframes used 3.7, so the two implementations disagreed on both the
    // distance AND the direction — Firefox would have drifted the wrong way while
    // Chrome drifted the right way, and nothing would have said so.
    var DRIFT = 3.7;
    if (CSS_DRIFT) document.documentElement.classList.add('pl-sda');

    // ---------- the sway, fallback path ----------
    // The CSS above rides a view timeline on #plates; where that does not exist,
    // the same wave is computed here from the section's own progress across the
    // window. ⚠️ IT IS A SECOND LISTENER ON A DOCUMENT THAT ALREADY HAS ONE
    // (js/motion.js's dawn arc), so it earns its place by doing almost nothing:
    // it returns on the first line unless the section is actually on screen, and
    // when it does run it writes ten transforms and reads one rect.
    var section = document.getElementById('plates');
    var amps = plates.map(function (p) {
      return parseFloat(getComputedStyle(p).getPropertyValue('--amp')) || 0;
    });
    var swayTick = false;
    function swayFrame() {
      swayTick = false;
      var r = section.getBoundingClientRect(), vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      // cover progress: 0 as the section's top edge enters, 1 as its bottom leaves
      var prog = (vh - r.top) / (vh + r.height);
      var k = 1 - 2 * Math.max(0, Math.min(1, prog));
      for (var i = 0; i < plates.length; i++) {
        plates[i].style.transform = 'translateY(' + (amps[i] * k).toFixed(2) + 'px)';
      }
    }
    function onPageScroll() { if (!swayTick) { swayTick = true; requestAnimationFrame(swayFrame); } }
    if (!CSS_DRIFT && !REDUCED && section) {
      window.addEventListener('scroll', onPageScroll, { passive: true });
      window.addEventListener('resize', onPageScroll, { passive: true });
      swayFrame();
    }

    var ticking = false;
    function frame() {
      ticking = false;
      setLit(leading());
      if (!DRIFT_JS) return;
      // 🛑 ALL READS, THEN ALL WRITES. clientWidth is read once, outside the loop:
      // interleaving a read with a style write inside it forces one layout per
      // plate, ten times a frame.
      var w = rail.clientWidth, x = rail.scrollLeft;
      for (var i = 0; i < imgs.length; i++) {
        if (!imgs[i]) continue;
        var c = snaps[i] + pad + plates[i].offsetWidth / 2 - x;   // the plate's centre
        var t = Math.max(-1, Math.min(1, (c - w / 2) / (w / 2 + plates[i].offsetWidth / 2)));
        // ⚠️ NEGATED, AND THAT IS THE WHOLE POINT OF A COUNTER-PARALLAX. t runs from
        // -1 at the left of the scrollport to +1 at the right; the picture has to
        // travel the other way, so a frame moving left carries a picture drifting
        // right inside it. Same sign as the frame is not a parallax — it just looks
        // like a rendering fault.
        imgs[i].style.setProperty('--dx', (-t * DRIFT).toFixed(2) + '%');
      }
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

    measure();
    frame();
    // passive: this listener never calls preventDefault, and saying so is what lets
    // the compositor scroll without waiting to find that out.
    rail.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { measure(); onScroll(); }, { passive: true });

    // ⚠️ THE POINTER OVERRIDES THE SCROLL POSITION, WHERE THERE IS ONE, AND IT IS
    // NOT A FLOURISH — IT IS WHAT MAKES ALL TEN HOOKS READABLE ON A DESKTOP. A rail
    // runs out of travel before its last plates can reach the gutter: at 1440 the
    // furthest the ribbon scrolls still leaves chapter VIII parked there, so a
    // caption driven only by scroll position could never show IX or X.
    // 🛑 A PHONE GETS NONE OF THIS AND LOSES NOTHING: there the rail scrolls far
    // enough for every plate to reach the gutter. Verified at 402, I through X.
    if (window.matchMedia && matchMedia('(hover: hover)').matches) {
      plates.forEach(function (p, i) {
        p.addEventListener('pointerenter', function () { setLit(i); });
        p.addEventListener('focus', function () { setLit(i); });
      });
      rail.addEventListener('pointerleave', function () { setLit(leading()); });
    }

    // 🛑 ARM FIRST, THEN OBSERVE. .is-armed is what puts the plates at opacity 0 and
    // it is added here, inside the branch that has an observer to take them back off
    // it, so no reader can ever be left looking at ten empty frames. Fired on the
    // rail rather than on each plate so the --i stagger runs as one gesture.
    if ('IntersectionObserver' in window) {
      if (!REDUCED) rail.classList.add('is-armed');
      var arrive = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { rail.classList.add('is-in'); arrive.disconnect(); }
      }, { rootMargin: '0px 0px -12% 0px' });
      arrive.observe(rail);
    }
  }

  document.addEventListener('panim:rendered', init);

  // exposed so js/player.js's "S" shortcut can open the sleep sheet with the same
  // focus-management / Escape-to-close behavior as a mouse click on the sleep button.
  // focusableIn is exposed too so js/room.js and js/player.js's completion modal can
  // move initial focus to their first real control without re-deriving the selector —
  // the Tab trap itself (trapOverlayTab, wired once above) already covers both of them.
  window.PanimUI = { openSheet: openSheet, closeSheet: closeSheet, focusableIn: focusableIn };
})();
