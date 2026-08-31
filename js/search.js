/* PANIM — search.js
 *
 * A book about one word, with no way to find a word. This is the fix, and it is a
 * client-side index for the same reason everything else here is: the whole text is
 * already on the page in content/chapters.js, so an index needs no server, costs
 * one pass over data the browser has already parsed, and keeps working offline
 * alongside the service worker.
 *
 * WHAT IS INDEXED. Five kinds of thing, and they are ranked differently because
 * they are not equally useful answers to "where is X":
 *
 *   lexicon   a word's own plate — transliteration, gloss, the pointed form
 *   note      a verse note (content/verse-notes.js)
 *   verse     a quotation and its citation
 *   thread    a plant-and-payoff entry (content/thread.js)
 *   prose     a paragraph of the book
 *
 * 🛑 THE INDEX IS BUILT ONCE, LAZILY, ON FIRST OPEN. Building it at load would put
 * a pass over fifty thousand words in front of the first paint for every visitor,
 * and most visitors never search. It takes a few milliseconds when it does run.
 *
 * 🛑 MATCHING IS ACCENT-FOLDED AND CASE-FOLDED, BUT NOT STEMMED. "Panim" finds
 * panim, and "peniel" finds Peniel; "hiding" does not find "hid". A stemmer is the
 * wrong trade here — it would also make "faces" find "face" and "facing", which
 * in a book that turns on one noun produces a result list that is the whole book.
 * Prefix matching on the last term covers the common case while you are typing.
 *
 * 🛑 HEBREW IS SEARCHED WITHOUT ITS POINTS. Nobody types nikkud into a search box.
 * The pointed form is indexed and so is the stripped one, so פנים finds פָּנִים.
 */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };

  var index = null;         // built on first open
  var els = {};
  var lastQuery = '';

  // Combining marks: Hebrew points U+0591–U+05C7 and the Latin combining block,
  // so "Ro'i" and "Roi" and "ro’i" all fold to the same thing.
  var HEB_MARKS = /[֑-ׇֽֿׁׂׅׄ]/g;
  function fold(s) {
    return String(s)
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(HEB_MARKS, '')
      .replace(/[‘’ʼ']/g, '')
      .replace(/[–—]/g, '-')
      .toLowerCase();
  }
  function strip(html) {
    return String(html).replace(/<[^>]+>/g, '').replace(/&[a-z]+;|&#\d+;/gi, ' ');
  }

  var ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  // kind -> how much a hit in it is worth. A lexicon plate for the word you typed
  // is a better answer than the ninth paragraph that happens to contain it.
  // 🛑 `name` SITS JUST UNDER `lexicon` — 2026-08-30 (D22-D), the author's "do it"
  // on round seventeen §4 #4. Searching "Hagar" returned two paragraphs and no offer
  // of her index entry, which is the one result that answers the question actually
  // being asked: she is in chapter I and nowhere else. An index entry is a MAP of
  // the word; a paragraph is one place it happens to appear. So it outranks prose,
  // verse and note, and stays under the lexicon plate, which is the same thing for
  // the words this book is built on.
  var WEIGHT = { lexicon: 5, name: 4.5, note: 3, verse: 3, thread: 2.5, prose: 1 };

  function build() {
    var out = [];
    var chapters = window.PANIM_CHAPTERS || [];
    var notes = window.PANIM_VERSE_NOTES || {};

    (window.PANIM_LEXICON || []).forEach(function (e) {
      var slug = 'lex-' + String(e.t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      out.push({
        kind: 'lexicon', href: '#' + slug,
        num: e.num, label: e.t,
        text: [e.t, e.w, e.g, e.r].join(' '),
        snippet: e.g
      });
    });

    // The index entries, as found by js/render.js — never re-derived here. It scans
    // the manuscript for all fifty-eight names at render time and hands the survivors
    // on; a second scan in this file would be a second answer to the same question.
    ((window.PANIM_RENDERED || {}).nameHits || []).forEach(function (n) {
      var where = n.chapters.map(function (c) { return ROMAN[c] || c; });
      out.push({
        kind: 'name', href: '#' + n.id,
        num: n.chapters[0] || 99, label: n.name,
        text: n.name + ' ' + n.note,
        // the snippet is the note plus where the book keeps them, because "where"
        // is the whole reason to offer an index entry instead of a paragraph
        snippet: n.note + (where.length
          ? ' \u00b7 ' + (where.length === 1 ? 'Chapter ' : 'Chapters ') + where.join(', ')
          : '')
      });
    });

    chapters.forEach(function (ch) {
      var chNotes = notes[ch.id] || {};
      (ch.blocks || []).forEach(function (b) {
        if (b.type === 'p') {
          var t = strip(b._html || '');
          if (t.length < 12) return;
          out.push({ kind: 'prose', href: '#' + b.id, num: ch.num, label: ch.title, text: t, snippet: t });
        } else if (b.type === 'verse') {
          var v = (b.lines || []).join(' ');
          out.push({
            kind: 'verse', href: '#' + b.id, num: ch.num,
            label: b.ref || ch.title, text: v + ' ' + (b.ref || ''), snippet: v
          });
          var n = b.ref && chNotes[b.ref];
          if (n) {
            var nt = strip((n.where || '') + ' ' + (n.worth || ''));
            out.push({
              // snippet is the WHOLE note, not just `worth`: the match is as often
              // in the "where you are" line, and a snippet that cannot contain the
              // match falls back to the opening 150 characters with nothing marked.
              kind: 'note', href: '#' + b.id, num: ch.num,
              label: b.ref, text: nt, snippet: nt
            });
          }
        }
      });
    });

    (window.PANIM_THREAD || []).forEach(function (t, i) {
      var note = strip(t.note || '');
      out.push({
        kind: 'thread', href: '#thread', num: +String(t.from).slice(2),
        label: strip(t.label), text: strip(t.label) + ' ' + note + ' ' + (t.refs || ''),
        snippet: note
      });
    });

    out.forEach(function (r) { r.f = fold(r.text); });
    return out;
  }

  // Score: every term must appear (AND), the last one may match as a prefix so the
  // list is useful while the reader is still typing. A term found at a word
  // boundary counts double — "face" in "face to face" beats "face" inside
  // "surfaces" — and the whole score is multiplied by the kind's weight.
  function search(q) {
    var terms = fold(q).split(/[^a-z0-9א-ת]+/).filter(Boolean);
    if (!terms.length) return [];
    var last = terms.length - 1;
    var hits = [];
    for (var i = 0; i < index.length; i++) {
      var r = index[i], score = 0, ok = true;
      for (var t = 0; t < terms.length; t++) {
        var term = terms[t];
        var whole = new RegExp('(^|[^a-z0-9])' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
          (t === last ? '' : '($|[^a-z0-9])'));
        if (whole.test(r.f)) { score += 2; continue; }
        if (r.f.indexOf(term) !== -1) { score += 1; continue; }
        ok = false; break;
      }
      if (!ok) continue;
      hits.push({ r: r, score: score * (WEIGHT[r.kind] || 1) });
    }
    hits.sort(function (a, b) { return b.score - a.score || a.r.num - b.r.num; });
    return hits.slice(0, 40);
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // A snippet centred on the first match, with the matched run marked. It works on
  // the ORIGINAL text and folds only for locating, so accents and points survive
  // into what the reader sees.
  function snippet(text, terms) {
    var f = fold(text), at = -1, term = '';
    for (var i = 0; i < terms.length && at < 0; i++) { at = f.indexOf(terms[i]); term = terms[i]; }
    if (at < 0) return esc(text.slice(0, 150)) + (text.length > 150 ? '…' : '');
    var start = Math.max(0, at - 60);
    var end = Math.min(text.length, at + term.length + 110);
    var head = (start > 0 ? '…' : '') + text.slice(start, at);
    var mid = text.slice(at, at + term.length);
    var tail = text.slice(at + term.length, end) + (end < text.length ? '…' : '');
    return esc(head) + '<mark>' + esc(mid) + '</mark>' + esc(tail);
  }

  var KIND_LABEL = { lexicon: 'Lexicon', name: 'Names and Places', note: 'Note', verse: 'Verse', thread: 'What comes back', prose: 'Text' };

  function render(q) {
    var terms = fold(q).split(/[^a-z0-9א-ת]+/).filter(Boolean);
    if (!terms.length) {
      els.results.innerHTML = '';
      els.status.textContent = '';
      return;
    }
    var hits = search(q);
    els.status.textContent = hits.length
      ? hits.length + (hits.length === 40 ? '+ results' : (hits.length === 1 ? ' result' : ' results'))
      : 'Nothing found for “' + q + '”.';
    els.results.innerHTML = hits.map(function (h) {
      var r = h.r;
      return '<a class="sr-hit" href="' + esc(r.href) + '" data-kind="' + esc(r.kind) + '">' +
        '<span class="sr-meta">' +
          '<span class="sr-kind">' + KIND_LABEL[r.kind] + '</span>' +
          // ⚠️ A NAME RESULT PRINTS NO ROMAN NUMERAL. Every other kind lives in one
          // chapter, so the numeral is where it is; an index entry can span four,
          // and "I · Moses" would be a wrong answer to the question the entry
          // exists to answer. Its chapters are in the snippet, all of them.
          '<span class="sr-where">' +
            (r.kind !== 'name' && r.num ? (ROMAN[r.num] || r.num) + ' · ' : '') +
            esc(r.label) + '</span>' +
        '</span>' +
        '<span class="sr-text">' + snippet(r.snippet || r.text, terms) + '</span>' +
      '</a>';
    }).join('');
  }

  function ensureIndex() { if (!index) index = build(); }

  function open() {
    ensureIndex();
    document.dispatchEvent(new CustomEvent('panim:open-sheet', { detail: { id: 'search-sheet' } }));
    requestAnimationFrame(function () { els.input.focus(); els.input.select(); });
  }

  function init() {
    els.input = $('#search-input');
    els.results = $('#search-results');
    els.status = $('#search-status');
    var btn = $('#search-btn');
    if (!els.input || !btn) return;

    btn.addEventListener('click', open);

    var t = null;
    els.input.addEventListener('input', function () {
      var q = els.input.value;
      if (q === lastQuery) return;
      lastQuery = q;
      clearTimeout(t);
      // 120ms is under the threshold where typing feels laggy and above the rate
      // at which a fast typist would re-run the scan on every keystroke.
      t = setTimeout(function () { render(q); }, 120);
    });

    // Enter on the field takes the top result, which is what a reader who typed a
    // word and hit return meant.
    els.input.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      var first = $('.sr-hit', els.results);
      if (first) { e.preventDefault(); first.click(); }
    });

    // A result closes the sheet and jumps. The href is a real fragment, so a
    // middle-click or a copied link still works.
    els.results.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.sr-hit')) {
        document.dispatchEvent(new CustomEvent('panim:close-sheet', { detail: { id: 'search-sheet' } }));
      }
    });

    // "/" opens search from anywhere, the way it does in every reader people
    // already use — but never while they are typing into something.
    document.addEventListener('keydown', function (e) {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      var a = document.activeElement;
      if (a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.isContentEditable)) return;
      e.preventDefault();
      open();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
