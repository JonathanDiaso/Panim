// PANIM — ui.js
// Interactive chrome: nav chapter list, About/Thread/Sleep/Mix sheets, onboarding modal,
// glossary gloss cards, image lightbox, share. Scroll-driven behavior (dawn arc, reveals,
// nav show/hide/fade, active-chapter tracking) lives in js/motion.js.
// 11-website-plan.md §3, §4.1 (C9), §6.1 (C4), component table C1/C9/C10/C15.

(function () {
  'use strict';

  // The Thread — seed→payoff map (11-website-plan.md §3 / build-brief "Thread panel").
  // Hardcoded per the book's seed-map (00-gameplan.md); each entry deep-links both anchors.
  var THREAD_ENTRIES = [
    { label: '"Lift up my face"', from: 'ch04', to: 'ch06' },
    { label: 'Satar — the hiding', from: 'ch02', to: 'ch07' },
    { label: "Elijah's appointment", from: 'ch07', to: 'ch08' },
    { label: 'Watch His face', from: 'ch07', to: 'ch08' },
    { label: 'The wish', from: 'ch05', to: 'ch09' },
    { label: 'The fading', from: 'ch06', to: 'ch09' },
    { label: 'Charcoal', from: 'ch08', to: 'ch09' },
    { label: 'Metamorphoo', from: 'ch08', to: 'ch09' },
    { label: 'The cleft', from: 'ch05', to: 'ch10' },
    { label: 'Court of the face', from: 'ch03', to: 'ch10' },
    { label: 'Name on foreheads', from: 'ch06', to: 'ch10' },
    { label: 'Matthew 5:8, at last', from: 'ch01', to: 'ch10' },
    { label: 'Two crowds', from: 'ch09', to: 'ch10' }
  ];

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
  }

  // ---------- sheets ----------
  var lastFocused = null;
  function openSheet(id) {
    var el = document.getElementById(id);
    if (!el) return;
    lastFocused = document.activeElement;
    el.hidden = false;
    requestAnimationFrame(function () {
      var closeBtn = $('.sheet-close', el);
      if (closeBtn) closeBtn.focus();
    });
    document.addEventListener('keydown', onSheetKeydown);
  }
  function closeSheet(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.hidden = true;
    document.removeEventListener('keydown', onSheetKeydown);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }
  function onSheetKeydown(e) {
    if (e.key === 'Escape') {
      $all('.sheet:not([hidden])').forEach(function (el) { closeSheet(el.id); });
    }
  }

  function wireSheets() {
    $('#about-btn').addEventListener('click', function () { openSheet('about-sheet'); });
    $('#thread-btn').addEventListener('click', function () { openSheet('thread-panel'); });
    $('#sleep-btn').addEventListener('click', function () { openSheet('sleep-sheet'); });
    $all('[data-close-sheet]').forEach(function (btn) {
      btn.addEventListener('click', function () { closeSheet(btn.getAttribute('data-close-sheet')); });
    });
    // nav Listen opens the Listening Room (js/room.js also listens on this button)
  }

  // ---------- The Thread panel ----------
  function buildThread() {
    var list = $('#thread-list');
    list.innerHTML = THREAD_ENTRIES.map(function (t) {
      return '<div class="thread-entry">' +
        '<div class="thread-label">' + t.label + '</div>' +
        '<div class="thread-links">' +
        '<a href="#' + t.from + '" data-close-sheet="thread-panel">' + t.from.replace('ch0', 'Ch. ').replace('ch', 'Ch. ') + '</a>' +
        '<span aria-hidden="true">→</span>' +
        '<a href="#' + t.to + '" data-close-sheet="thread-panel">' + t.to.replace('ch0', 'Ch. ').replace('ch', 'Ch. ') + '</a>' +
        '</div></div>';
    }).join('');
    $all('.thread-links a', list).forEach(function (a) {
      a.addEventListener('click', function () { closeSheet('thread-panel'); });
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

    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest && e.target.closest('.gloss-term');
      if (t) show(t);
    });
    document.addEventListener('mouseout', function (e) {
      var t = e.target.closest && e.target.closest('.gloss-term');
      if (t) hide();
    });
    document.addEventListener('focusin', function (e) {
      var t = e.target.closest && e.target.closest('.gloss-term');
      if (t) show(t);
    });
    document.addEventListener('focusout', function (e) {
      var t = e.target.closest && e.target.closest('.gloss-term');
      if (t) hide();
    });
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('.gloss-term');
      if (t) {
        e.preventDefault();
        if (openTerm === t) hide(); else show(t);
      } else if (!e.target.closest('#gloss-card')) {
        hide();
      }
    });
  }

  // ---------- lightbox (C10) ----------
  function wireLightbox() {
    var box = $('#lightbox');
    var img = $('#lightbox-img');
    document.addEventListener('click', function (e) {
      var slot = e.target.closest && e.target.closest('.img-slot.is-filled');
      if (slot) {
        var src = $('img', slot).getAttribute('src');
        var alt = $('img', slot).getAttribute('alt');
        img.setAttribute('src', src);
        img.setAttribute('alt', alt || '');
        box.hidden = false;
      }
    });
    $('#lightbox-close').addEventListener('click', function () { box.hidden = true; img.src = ''; });
    box.addEventListener('click', function (e) { if (e.target === box) { box.hidden = true; img.src = ''; } });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !box.hidden) { box.hidden = true; img.src = ''; }
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

  function init() {
    buildNav();
    buildThread();
    wireSheets();
    wireOnboarding();
    wireGloss();
    wireLightbox();
    wireListenButtons();
    wireShare();
  }

  document.addEventListener('panim:rendered', init);

  // exposed so js/player.js's "S" shortcut can open the sleep sheet with the same
  // focus-management / Escape-to-close behavior as a mouse click on the sleep button
  window.PanimUI = { openSheet: openSheet, closeSheet: closeSheet };
})();
