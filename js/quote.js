/* ============================================================================
   QUOTE — send a passage, not a link to the top of a book
   ----------------------------------------------------------------------------
   The author, 2026-09-06: "also is it possible to just send a small snippet of
   the book to someone?? that links to the whole book? Thats needed"

   ⭐ THE BOOK IS FREE AND IT MOVES BY BEING SENT TO PEOPLE. Everything else on
   this site already understood that — /c/NN/ exists so a chapter link unfurls as
   that chapter, `?t=ch07:17m55s` exists so a moment in the tape survives being
   pasted. The one thing missing was the smallest unit anybody actually sends:
   a sentence somebody just read and wants to hand to one other person.

   HOW IT WORKS. Select any text in the book and a single button appears over the
   selection. Pressing it hands the platform's own share sheet a payload of three
   parts — the quote, who it is by, and a link — and where there is no share sheet
   it copies the same three lines to the clipboard.

   🛑 THE LINK IS /c/NN/?p=<paragraph id>, NOT A BARE #FRAGMENT, AND THAT IS THE
   WHOLE POINT OF THE FEATURE. A bare https://…/#ch07-p107 opens in the right
   place but unfurls as the book's front door, because one HTML file has one set
   of Open Graph tags. The stub carries chapter VII's own title, standfirst and
   plate, so the message shows a picture and a name — and its script reads ?p= and
   drops the reader on the exact paragraph. The reader gets the whole book; the
   recipient's messaging app gets a card worth opening.

   ⚠️ IT IS SCOPED TO #chapters-root ON PURPOSE. Selecting a nav label, a caption
   or the contents must not offer to quote the book — a share pill over a button
   label is the shape of a browser extension, not of a page that knows what it is.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.getElementById('chapters-root');
  if (!root) return;

  // 280 is the cap and it is not Twitter's, it is a reading decision: past about
  // four lines the recipient is being sent homework rather than a sentence, which
  // is the same argument that keeps the runtime off the jacket.
  var MAX = 280;

  var pill = null, hideTimer = 0, current = null;

  function chapterOf(node) {
    var el = node.nodeType === 1 ? node : node.parentNode;
    var sec = el && el.closest ? el.closest('.section[data-ch]') : null;
    if (!sec) return null;
    var num = parseInt(sec.getAttribute('data-ch'), 10);
    if (!num) return null;
    var list = window.PANIM_CHAPTERS || [];
    for (var i = 0; i < list.length; i++) if (list[i].num === num) return list[i];
    return null;
  }

  // The anchor is the nearest thing with an id that the book already links to —
  // a paragraph, a verse block, a reference. Anything else and the share falls
  // back to the chapter, which is still better than the front door.
  function anchorOf(node) {
    var el = node.nodeType === 1 ? node : node.parentNode;
    while (el && el !== root) {
      if (el.id && /^ch\d{2}-/.test(el.id)) return el.id;
      el = el.parentNode;
    }
    return null;
  }

  function tidy(s) {
    return String(s || '').replace(/\s+/g, ' ').trim();
  }

  // Cut on a word, never mid-word, and only add the ellipsis when something was
  // actually removed — an ellipsis on a complete sentence is a lie about the text.
  function clip(s) {
    if (s.length <= MAX) return s;
    var cut = s.slice(0, MAX);
    var sp = cut.lastIndexOf(' ');
    if (sp > MAX * 0.6) cut = cut.slice(0, sp);
    return cut.replace(/[\s,;:—-]+$/, '') + '…';
  }

  function bookBase() {
    var base = location.href.split('#')[0].split('?')[0].replace(/(index\.html)?$/, '');
    if (base.charAt(base.length - 1) !== '/') base += '/';
    return base;
  }

  function shareUrl(num, anchor, at) {
    var url = bookBase() + 'c/' + (num < 10 ? '0' + num : num) + '/';
    if (!anchor) return url;
    url += '?p=' + encodeURIComponent(anchor);
    // ⭐ AND THE MOMENT, NOT ONLY THE PLACE. The recipient does not just arrive at the
    // sentence, they arrive with the tape already wound to it — one press and they
    // hear it read. Same ?t= grammar the second door has always used.
    if (at != null) url += '&t=' + clock(at);
    return url;
  }
  function clock(sec) {
    var m = Math.floor(sec / 60), s = Math.round(sec - m * 60);
    if (s === 60) { m += 1; s = 0; }
    return m + 'm' + s + 's';
  }

  // ⚠️ THE CUE IS FETCHED WHEN THE PILL IS RAISED, NOT WHEN IT IS PRESSED, AND THAT
  // IS NOT A PERFORMANCE CHOICE. navigator.share() must be called synchronously
  // inside the user gesture or iOS refuses it outright — an await between the tap and
  // the call is the single most common way this API is broken. So the network happens
  // on mouseup, seconds before anyone can press anything, and send() stays synchronous.
  // A miss is survivable: no cue, no &t=, and the link still lands on the paragraph.
  var cueCache = {};
  function warmCues(id) {
    if (cueCache[id] !== undefined) return;
    cueCache[id] = null;
    fetch('cues/' + id + '.json').then(function (r) { return r.ok ? r.json() : null; })
      .then(function (rows) {
        if (!rows) return;
        var map = {};
        for (var i = 0; i < rows.length; i++) map[rows[i].id] = rows[i].t;
        cueCache[id] = map;
      }).catch(function () {});
  }
  function cueTime(chapterId, anchor) {
    var map = cueCache[chapterId];
    if (!map || !anchor || map[anchor] == null) return null;
    // 🛑 ONE SECOND EARLY, ON PURPOSE, and it is the same ruling as the second door's
    // href: a seek that lands a few milliseconds late clips the first consonant of the
    // first word. A second of the previous line is a better cold open than a hard cut.
    return Math.max(0, Math.floor(map[anchor] - 1));
  }

  function makePill() {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'quote-pill';
    b.hidden = true;
    b.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" ' +
        'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M14.5 4.5h3a2 2 0 0 1 2 2v3"/><path d="M9.5 19.5h-3a2 2 0 0 1-2-2v-3"/>' +
        '<path d="M20 4.5 12.5 12"/><path d="M9.5 4.5h-3a2 2 0 0 0-2 2v3"/>' +
      '</svg>' +
      '<span class="qp-label"></span>';
    document.body.appendChild(b);
    b.addEventListener('click', send);
    return b;
  }

  function label() {
    return navigator.share ? 'Share this passage' : 'Copy this passage';
  }

  function place(rect) {
    // document coordinates, because the pill is absolutely positioned in the page
    // rather than fixed: a fixed pill detaches from its own selection the instant
    // the reader nudges the page, which reads as a bug even when it is not.
    var top = rect.top + window.scrollY - pill.offsetHeight - 10;
    var left = rect.left + window.scrollX + rect.width / 2 - pill.offsetWidth / 2;
    // If the selection starts at the very top of the viewport there is nowhere
    // above it to stand, so the pill goes underneath instead of off the page.
    if (rect.top < pill.offsetHeight + 16) top = rect.bottom + window.scrollY + 10;
    var min = 8 + window.scrollX;
    var max = window.scrollX + document.documentElement.clientWidth - pill.offsetWidth - 8;
    if (left < min) left = min;
    if (left > max) left = max;
    pill.style.top = Math.round(top) + 'px';
    pill.style.left = Math.round(left) + 'px';
  }

  function hide() {
    if (pill && !pill.hidden) { pill.hidden = true; pill.classList.remove('is-done'); }
    current = null;
  }

  // After a send the passage has gone where it was going, so the highlight has no
  // job left. Dropping it is also what guarantees the pill cannot come back: with no
  // selection there is nothing for show() to raise.
  function finish() {
    var sel = window.getSelection && window.getSelection();
    if (sel && sel.removeAllRanges) { try { sel.removeAllRanges(); } catch (e) {} }
    hide();
  }

  function show() {
    var sel = window.getSelection && window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return hide();

    var range = sel.getRangeAt(0);
    // Both ends must be inside the book. A selection that starts in a paragraph
    // and ends in the contents is not a passage.
    if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) return hide();

    var text = clip(tidy(sel.toString()));
    if (text.length < 12) return hide();          // a word or two is not a passage

    var ch = chapterOf(range.startContainer);
    if (!ch) return hide();

    var rect = range.getBoundingClientRect();
    if (!rect || (!rect.width && !rect.height)) return hide();

    current = { text: text, ch: ch, anchor: anchorOf(range.startContainer) };
    warmCues(ch.id);
    if (!pill) pill = makePill();
    pill.querySelector('.qp-label').textContent = label();
    pill.hidden = false;
    pill.classList.remove('is-done');
    place(rect);
  }

  function done(msg) {
    if (!pill) return;
    pill.querySelector('.qp-label').textContent = msg;
    pill.classList.add('is-done');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(finish, 1800);
  }

  function send() {
    if (!current) return;
    var url = shareUrl(current.ch.num, current.anchor, cueTime(current.ch.id, current.anchor));
    var credit = 'PANIM · ' + romanOf(current.ch.num) + '. ' + current.ch.title;
    var body = '“' + current.text + '”\n— ' + credit;
    if (navigator.share) {
      navigator.share({ title: 'PANIM: ' + current.ch.title, text: body, url: url })
        .then(function () { finish(); })
        // a cancelled share sheet is not an error, but the pill has to stand down
        // either way — the reader has answered the question it was asking.
        .catch(function () { finish(); })
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(body + '\n' + url).then(function () {
        done('Copied');
      }, function () { done('Press ⌘C to copy'); });
      return;
    }
    done('Press ⌘C to copy');
  }

  var ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  function romanOf(n) { return ROMAN[n] || String(n); }

  // ⚠️ selectionchange FIRES CONSTANTLY WHILE A DRAG IS IN PROGRESS, and showing a
  // button under a moving cursor makes the selection impossible to finish. So the
  // pill is only ever raised on the gesture that ENDS a selection, and
  // selectionchange is used for one thing: taking it away again.
  // 🔴 THE PILL'S OWN GESTURES MUST NOT RE-RAISE IT, 2026-09-06. The author:
  // "shared passage butto thing doesnt leave once you click it which is weird."
  // Exactly right, and the cause was this pair of listeners. Pressing the pill is a
  // mouseup on the document like any other, and the selection is still standing when
  // it fires — so hide() ran on the click and show() put the pill straight back, one
  // tick later, in the same place. It looked like a button that refused to close.
  function fromPill(e) {
    var t = e && e.target;
    return !!(t && t.closest && t.closest('.quote-pill'));
  }
  document.addEventListener('mouseup', function (e) { if (!fromPill(e)) setTimeout(show, 0); });
  document.addEventListener('touchend', function (e) { if (!fromPill(e)) setTimeout(show, 10); });
  document.addEventListener('keyup', function (e) {
    if (e.shiftKey || e.key === 'Shift') setTimeout(show, 0);
  });
  document.addEventListener('selectionchange', function () {
    var sel = window.getSelection && window.getSelection();
    if (!sel || sel.isCollapsed) hide();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
  // The pill is anchored to a place in the document, so it travels with the page
  // and only has to leave when the page changes shape underneath it.
  window.addEventListener('resize', hide, { passive: true });
}());
