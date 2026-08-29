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
      beginBtn.textContent = 'Continue — ' + (num ? num + ', ' : '') + fmt(place.pos);
    }
    if (beginBtn) beginBtn.addEventListener('click', function () {
      var p = savedPlace();
      document.dispatchEvent(new CustomEvent('panim:listen-chapter', {
        detail: p ? { chapterId: p.chapterId, seekTo: p.pos } : { chapterId: 'ch01' }
      }));
    });
  }

  // ---------- share (About sheet) ----------
  function wireShare() {
    $('#share-btn').addEventListener('click', function () {
      var shareData = {
        title: 'PANIM — The Invitation Hidden on Every Page',
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
      var data = { title: 'PANIM — ' + (ch.title || ''), text: ch.hook || '', url: url };
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
  // The list ran 1225px against an 813px viewport, so the descriptions are folded by
  // default and the choice is remembered. Nothing is removed: every title, numeral and
  // running time stays visible in either state, which is why this is a disclosure and
  // not a filter.
  function wireContentsToggle() {
    var KEY = 'panim:tocOpen';
    var btn = document.getElementById('toc-expand');
    var section = document.getElementById('contents');
    if (!btn || !section) return;

    function apply(open) {
      section.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Close the contents' : 'Table of Contents';
    }
    var saved = false;
    try { saved = localStorage.getItem(KEY) === '1'; } catch (e) {}
    apply(saved);

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      apply(open);
      try { localStorage.setItem(KEY, open ? '1' : '0'); } catch (e) {}
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

    function lay(list) {
      var frag = document.createDocumentFragment();
      list.forEach(function (c) { frag.appendChild(c); });
      wall.appendChild(frag);
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
  function selectLexWord(slug, moveFocus) {
    var article = document.getElementById('lex-article');
    var wall = document.getElementById('lex-wall');
    if (!article || !wall || !slug) return false;
    var entry = article.querySelector('[data-lex-entry="' + slug + '"]');
    var chip = wall.querySelector('.lex-chip[data-lex="' + slug + '"]');
    if (!entry || !chip) return false;
    $all('.lex-plate', article).forEach(function (p) { p.hidden = p !== entry; });
    $all('.lex-chip', wall).forEach(function (c) {
      var on = c === chip;
      c.classList.toggle('is-on', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    drawLexEntry(entry);
    // Below 900px the article is UNDER the wall, not beside it, so choosing a word
    // can otherwise change something the reader cannot see. The breakpoint is the
    // same 900 the .lex-body grid uses; matchMedia rather than an innerWidth read so
    // it is the one the stylesheet is actually applying.
    if (window.matchMedia && window.matchMedia('(max-width: 900px)').matches) {
      entry.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    if (moveFocus) chip.focus();
    return true;
  }
  function wireLexiconWall() {
    var wall = document.getElementById('lex-wall');
    if (!wall) return;
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

  document.addEventListener('panim:rendered', init);

  // exposed so js/player.js's "S" shortcut can open the sleep sheet with the same
  // focus-management / Escape-to-close behavior as a mouse click on the sleep button.
  // focusableIn is exposed too so js/room.js and js/player.js's completion modal can
  // move initial focus to their first real control without re-deriving the selector —
  // the Tab trap itself (trapOverlayTab, wired once above) already covers both of them.
  window.PanimUI = { openSheet: openSheet, closeSheet: closeSheet, focusableIn: focusableIn };
})();
