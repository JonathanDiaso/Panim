// PANIM — render.js
// Builds the DOM for the intro-through-five-words reading experience from
// window.PANIM_CHAPTERS + window.PANIM_IMAGES (content/*.js — never mutated here).
// Exposes window.PANIM_RENDERED for motion.js / sync.js / player.js to consume.
// 11-website-plan.md §5, §6, §9, §10.

(function () {
  'use strict';

  var ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function normTerm(s) {
    return String(s).trim().replace(/[.,;:]+$/, '').trim();
  }

  // Wraps the first exact-match occurrence of each chapter glossary term inside <em>…</em>
  // spans with a gloss-term span (§4.1 / C9). Trailing sentence punctuation inside the <em>
  // is tolerated (e.g. "<em>Panim.</em>" still matches term "Panim") — the match must still
  // be the WHOLE italic span, never a substring of a longer italic phrase, so running prose
  // is never corrupted. Terms with no exact italic match anywhere in the chapter are left
  // alone and reported via PANIM_RENDERED.skippedGlossTerms for BUILD-NOTES.
  function glossify(chapter) {
    var terms = (chapter.glossary || []).map(function (g) { return { term: g.term, gloss: g.gloss, norm: normTerm(g.term) }; });
    var used = {};
    var skipped = [];

    function applyToHtml(html) {
      return html.replace(/<em>([^<]*)<\/em>/g, function (whole, inner) {
        var n = normTerm(inner);
        for (var i = 0; i < terms.length; i++) {
          var t = terms[i];
          if (!used[t.term] && t.norm === n) {
            used[t.term] = true;
            return '<em class="gloss-term" tabindex="0" data-gloss-term="' + esc(t.term) + '" data-gloss-text="' + esc(t.gloss) + '">' + inner + '</em>';
          }
        }
        return whole;
      });
    }

    chapter.blocks.forEach(function (b) {
      if (b.type === 'p') b._html = applyToHtml(b._html);
    });

    terms.forEach(function (t) {
      if (!used[t.term]) skipped.push(chapter.id + ': "' + t.term + '"');
    });
    return skipped;
  }

  // Hebrew must be split by GRAPHEME, never by code point: פָּנִים carries combining
  // vowel points, and Array.from() would tear a nikkud mark off its consonant and
  // animate it as a separate glyph. Intl.Segmenter does this correctly; the regex
  // fallback keeps any combining mark (U+0590–U+05C7) attached to the letter before it.
  function hebGraphemes(str) {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      try {
        var seg = new Intl.Segmenter('he', { granularity: 'grapheme' });
        return Array.from(seg.segment(str), function (s) { return s.segment; });
      } catch (e) { /* fall through */ }
    }
    return str.match(/[\s\S][\u0591-\u05C7]*/g) || [str];
  }

  function hebSpans(str, delayStep) {
    return hebGraphemes(str).map(function (g, i) {
      var d = delayStep ? ' style="animation-delay:' + (i * delayStep) + 'ms"' : '';
      return '<span class="heb-g"' + d + '>' + esc(g) + '</span>';
    }).join('');
  }

  var PANIM_HEB = '\u05E4\u05B8\u05BC\u05E0\u05B4\u05D9\u05DD';  // פָּנִים

  function renderImageSlot(slotId) {
    var img = window.PANIM_IMAGES ? window.PANIM_IMAGES[slotId] : null;
    if (img && img.src) {
      // `ref` was authored on every image and rendered by renderPlate only, so the
      // five INLINE slots dropped it silently — ch01-scroll's "Numbers 6:24-26 -
      // c. 600 BC" had never once appeared. Same shape as the plate caption: the
      // caption says what it is, the ref says where you are.
      var cap = (img.caption || img.ref)
        ? '<figcaption>' + esc(img.caption || '') +
            (img.ref ? '<span class="slot-ref">' + esc(img.ref) + '</span>' : '') +
          '</figcaption>'
        : '';
      // WCAG 2.1.1: the slot opens a lightbox (js/ui.js wireLightbox) and used to do
      // it on a bare click listener only — no tabindex, no role, no keyboard path in
      // at all. tabindex + role="button" here, Enter/Space in ui.js, make it operable
      // the same way a click is; the label is what a screen reader announces instead
      // of the alt text underneath a figure with no accessible name of its own.
      return '<figure class="img-slot is-filled reveal" data-slot="' + esc(slotId) + '"' +
        ' tabindex="0" role="button" aria-label="View larger: ' + esc(img.alt || 'image') + '">' +
        '<img src="' + esc(img.src) + '" alt="' + esc(img.alt || '') + '" loading="lazy">' + cap +
        '</figure>';
    }
    // An empty slot renders NOTHING, 2026-08-28. It used to draw a framed box with
    // the words "Image forthcoming" in it — a published book telling every reader
    // that two of its pictures are not done. A chapter without a plate should look
    // like a chapter without a plate: it opens on its title.
    return '';
  }

  function renderVerse(b) {
    var lines = b.lines.map(function (l) { return '<span class="verse-line">' + esc(l) + '</span>'; }).join('');
    // Two quotations in ch. V carry no reference on purpose: they are the book
    // echoing a verse it has already cited, printed bare so the sentence lands
    // as a sentence. An empty apparatus line under them would undo that.
    var apparatus = '';
    if (b.ref) {
      var tag = (b.translation && b.translation !== 'NASB')
        ? '<span class="verse-translation">' + esc(b.translation) + '</span>' : '';
      apparatus = '<div class="verse-ref"><span class="verse-ref-text">' +
        esc(b.ref) + '</span>' + tag + '</div>';
    }
    return '<div class="verse-box reveal veil-lift" id="' + esc(b.id) + '" data-cue-id="' + esc(b.id) + '">' +
      '<span class="verse-quotemark" aria-hidden="true">&#8220;</span>' +
      '<div class="verse-text">' + lines + '</div>' +
      apparatus +
      '</div>';
  }

  function renderFiveWords(b) {
    var words = b.text.split(' ').map(function (w) {
      return '<span class="fw-word">' + esc(w) + '</span>';
    }).join(' ');
    return '<section class="section" id="five-words" data-ch="fw">' +
      '<div class="section-inner">' +
      '<p class="fivewords-text" id="fivewords-text">' + words + '</p>' +
      '<span class="fivewords-ref" id="fivewords-ref">' + esc(b.ref) + '</span>' +
      '</div></section>';
  }

  // WHAT COMES BACK — the closing section, after the five words.
  //
  // It used to be a sheet behind a button in the running head: thirteen bare labels
  // and two chapter links, opened by a control that competed with About and Listen
  // before a first-time reader had read a sentence. At the end of the book the same
  // thirteen entries change job — they stop being navigation and become the argument.
  // Data and every claim in it live in content/thread.js.
  //
  // IT IS NOT CALLED "THE THREAD" ANY MORE. That was a working title borrowed from
  // the build brief and it named the mechanism rather than the thing: a reader who
  // has just finished the book does not need to be told there is a thread, they need
  // to be told what came back. The id stays `thread` — anchors, the stylesheet and
  // content/thread.js all key off it, and renaming an id to match a heading is how
  // links rot.
  //
  // EACH ENTRY IS A <details>, and that is not only for length. The thirteen notes
  // are a wall of thirteen paragraphs if they are all open, and — the reason it is
  // native rather than scripted — the summary now carries the numerals as TEXT and
  // the two chapter links have moved down into the body. Those links used to be
  // ~22px tall in a row whose baseline could not take padding, which failed WCAG 2.2
  // target size. In the body they are ordinary links with room to be 44px. The fix
  // and the feature are the same change.
  function renderThread() {
    var entries = window.PANIM_THREAD || [];
    if (!entries.length) return '';
    var rows = entries.map(function (t) {
      var from = ROMAN[+t.from.slice(2)] || t.from;
      var to = ROMAN[+t.to.slice(2)] || t.to;
      return '<details class="thread-item reveal">' +
        '<summary class="thread-summary">' +
          '<span class="thread-span">' +
            '<span class="thread-num">' + from + '</span>' +
            '<span class="thread-arrow" aria-hidden="true">→</span>' +
            '<span class="thread-num">' + to + '</span>' +
          '</span>' +
          '<span class="thread-head-body">' +
            '<h3 class="thread-name">' + t.label + '</h3>' +
          '</span>' +
        '</summary>' +
        '<div class="thread-detail">' +
          '<p class="thread-note">' + t.note + '</p>' +
          (t.refs ? '<p class="thread-refs">' + esc(t.refs) + '</p>' : '') +
          '<p class="thread-jump">' +
            '<a href="#' + esc(t.from) + '">Chapter ' + from + '</a>' +
            '<a href="#' + esc(t.to) + '">Chapter ' + to + '</a>' +
          '</p>' +
        '</div>' +
      '</details>';
    }).join('');
    return '<section class="section" id="thread" data-ch="fw" aria-labelledby="thread-heading">' +
      '<div class="section-inner">' +
        '<div class="thread-head">' +
          '<span class="chapter-num">What Comes Back</span>' +
          '<div class="thread-standfirst">' +
            '<h2 id="thread-heading">Nothing in this book was set down once.</h2>' +
            '<p>Every one of these was planted in an early chapter and left alone until a ' +
            'later one came back for it. They are listed here rather than earlier because ' +
            'a thread only reads as a thread once you have walked its whole length. ' +
            '<span class="thread-hint">Open one to see where it was planted and where it lands.</span></p>' +
          '</div>' +
        '</div>' +
        rows +
      '</div></section>';
  }

  // THE LEXICON — the closing plate, after the Thread.
  //
  // The words are set as REAL TEXT in Frank Ruhl Libre, not as images. A Hebrew
  // letterform is already a drawing; a picture of one is heavier, blurrier at the
  // size this wants, unselectable, invisible to a screen reader and needs a retina
  // twin. Everything below is done in CSS on live type.
  //
  // TWO THINGS HAPPEN TO EVERY WORD, in order, and they are the whole section:
  //
  //   1. IT DRAWS ITSELF. A feathered mask sweeps across the letters — right to
  //      left for Hebrew, the direction Hebrew is actually written; left to right
  //      for Greek, because Greek is — so the word is laid down by a nib rather
  //      than faded in. It runs at 2.6s, not the 1.5s it shipped at: a sweep fast
  //      enough to miss is just a transition, and the point is to watch it happen.
  //
  //   2. THE ROOT STAYS LIT. A beat after the word lands, everything that is not
  //      a root consonant dims — the vowel points, the prefixes, the vowel letters
  //      — and the root is left burning on the page. In a book about one word's
  //      biography this is the most on-theme move available, and it is why
  //      content/lexicon.js carries a `root` field at all.
  //
  // 🛑 THE ROOT MATCH FAILS SAFE. `root` holds the letters of the root ACTUALLY
  // PRESENT in this form, in order. hebClusters splits the word into base letters
  // with their points attached, then matches `root` as a subsequence of the base
  // letters only. No match, no highlight — a wrong root highlight in a book about
  // a Hebrew word is worse than none, so this never guesses.

  // Combining marks that belong to the letter before them: nikkud, dagesh, the
  // shin/sin dots, the rafe. NOT U+05BE maqaf, which is a hyphen and a character
  // in its own right, and not U+05C0/U+05C3 which are punctuation.
  function isHebMark(cp) {
    return (cp >= 0x0591 && cp <= 0x05BD) || cp === 0x05BF ||
           cp === 0x05C1 || cp === 0x05C2 || cp === 0x05C4 ||
           cp === 0x05C5 || cp === 0x05C7;
  }
  function isHebLetter(cp) { return cp >= 0x05D0 && cp <= 0x05EA; }

  // -> [{ base: 'פ', text: 'פְּ' }, ...] — one entry per written letter, each
  // carrying its own points, so a letter can be lit or dimmed as a single object.
  function hebClusters(word) {
    var out = [];
    for (var i = 0; i < word.length; i++) {
      var cp = word.charCodeAt(i);
      if (isHebMark(cp) && out.length) { out[out.length - 1].text += word[i]; continue; }
      out.push({ base: word[i], text: word[i] });
    }
    return out;
  }

  // Greedy left-to-right subsequence match. The string is in logical order, which
  // for Hebrew is the order the letters are written, so a root always appears in
  // order if it appears at all. Returns null unless EVERY root letter was found.
  function rootFlags(clusters, root) {
    if (!root) return null;
    var flags = new Array(clusters.length), r = 0;
    for (var i = 0; i < clusters.length && r < root.length; i++) {
      if (!isHebLetter(clusters[i].base.charCodeAt(0))) continue;
      if (clusters[i].base === root[r]) { flags[i] = true; r++; }
    }
    return r === root.length ? flags : null;
  }

  function inkGlyphs(word, root) {
    var clusters = hebClusters(word);
    var flags = rootFlags(clusters, root);
    return clusters.map(function (c, i) {
      if (c.text === ' ') return ' ';
      var cls = 'lex-g' + (flags && flags[i] ? ' is-root' : '');
      return '<span class="' + cls + '">' + esc(c.text) + '</span>';
    }).join('');
  }

  function renderLexicon() {
    var entries = window.PANIM_LEXICON || [];
    if (!entries.length) return '';
    var plates = entries.map(function (e) {
      var heb = e.lang === 'he';
      // Three scripts, three treatments. Hebrew is set in Frank Ruhl Libre and draws
      // itself right to left; Greek is set in the book's serif and draws left to
      // right; the one Akkadian row is a Latin transliteration and is set as such —
      // there is no cuneiform on this site, and a word in Latin letters pretending
      // to be Greek would be a lie told in type.
      var wordCls = heb ? '' : (e.lang === 'grc' ? ' is-greek' : ' is-roman');
      var lit = heb ? inkGlyphs(e.w, e.root) : esc(e.w);
      var roman = ROMAN[e.num] || e.num;
      // A word that has a root to show says so, because the dimming is the point
      // and a reader who does not know what they just watched has been shown a
      // decoration rather than an argument.
      var rootLine = (heb && rootFlags(hebClusters(e.w), e.root))
        ? '<p class="lex-root-note">root <span class="lex-root-word" lang="he" dir="rtl">' +
            esc(e.root) + '</span></p>'
        : '';
      return '<article class="lex-plate" data-ch="' + esc(e.ch) + '" data-kind="' + esc(e.kind) + '">' +
        '<p class="lex-tag">' + (e.kind === 'mark'
            ? 'Chapter ' + roman + ' · its own word'
            : 'Chapter ' + roman) + '</p>' +
        '<div class="lex-word' + wordCls + '" lang="' + esc(e.lang) + '"' +
          (heb ? ' dir="rtl"' : '') + '><span class="lex-ink">' + lit + '</span></div>' +
        '<p class="lex-translit">' + esc(e.t) + '</p>' +
        rootLine +
        '<p class="lex-gloss">' + esc(e.g) + '</p>' +
        '<p class="lex-where"><span>' + esc(e.r) + '</span>' +
          '<a href="#' + esc(e.ch) + '">Chapter ' + roman + '</a></p>' +
      '</article>';
    }).join('');
    return '<section class="section" id="lexicon" data-ch="fw" aria-labelledby="lexicon-heading">' +
      '<div class="section-inner">' +
        '<div class="lex-head">' +
          '<span class="chapter-num">The Lexicon</span>' +
          '<div class="lex-standfirst">' +
            '<h2 id="lexicon-heading">' + entries.length +
              ' words, in the language they were written in.</h2>' +
            '<p>Each chapter’s own word first, then the terms that chapter turns on. ' +
            'Every vowel point and every accent here was read out of a published source ' +
            '— the Masoretic text, BDB, Klein, Jastrow, BibleHub, and for the one ' +
            'Akkadian word the Chicago Assyrian Dictionary — and pasted in by a ' +
            'script. Not one character was typed from memory.</p>' +
            '<p class="lex-legend">Scroll a word into view and it draws itself, right to ' +
            'left, the way it is written. Then everything that is not a root consonant ' +
            'dims, and what is left lit is the three letters the word is built from.</p>' +
          '</div>' +
        '</div>' +
        '<div class="lex-plates">' + plates + '</div>' +
      '</div></section>';
  }

  // Ch.8's tearing hairline (§8.4): the paragraph whose text contains "torn in two" gets a
  // .tear-line sibling that motion.js animates once, on scroll-into-view.
  function maybeTearLine(chapterId, plainText) {
    if (chapterId === 'ch08' && plainText.indexOf('torn in two') !== -1) {
      return '<span class="tear-line" aria-hidden="true"></span>';
    }
    return '';
  }

  // OPENING PLATE (Direction B). The chapter's first image used to be a graded
  // backdrop with the title sitting on top of it. It is now a plate that owns the
  // full width of the page with nothing laid over it, and the title lands on paper
  // underneath. That single inversion is most of the design: a photograph stops
  // being a texture behind the words and becomes the thing you are looking at.
  // With no image supplied the chapter simply opens with its title — no empty frame.
  // The "PLATE I / PLATE II" label was dropped 2026-08-28: a plate number is
  // apparatus for a book with a list of plates in the back matter, and this has
  // no such list — the numeral told the reader nothing they could use, and it
  // put a second roman numeral beside the chapter's own. The caption and its
  // reference stay; they say what the picture is and where it sits in the text.
  function renderPlate(slotId) {
    var img = window.PANIM_IMAGES ? window.PANIM_IMAGES[slotId] : null;
    if (!img || !img.src) return '';
    // The caption carries an optional `ref` — a scripture reference or a locator. A
    // plate in a book earns its place by telling you WHERE you are, not just what
    // you are looking at, and it sends the reader back into the text.
    var caption = (img.caption || img.ref)
      ? '<figcaption class="plate-caption">' +
          '<span class="plate-text">' + esc(img.caption || '') +
            (img.ref ? '<span class="plate-ref">' + esc(img.ref) + '</span>' : '') +
          '</span>' +
        '</figcaption>'
      : '';
    // the image lives inside .plate-frame, which is the clipping box. The parallax
    // in motion.js scales the image past 100%, and without a frame to crop it the
    // overflow paints straight over the caption underneath.
    return '<figure class="plate reveal" data-slot="' + esc(slotId) + '">' +
      '<div class="plate-frame"><img src="' + esc(img.src) + '" alt="' + esc(img.alt || '') +
        '" loading="lazy" decoding="async"></div>' +
      caption + '</figure>';
  }

  // CONTENTS. Ten chapters and, before this, the only ways in were the numeral strip
  // in the running head and scrolling. A book opens on its contents page; so does this.
  // Durations come from content/audio-manifest.js (voiceDur, seconds) — the same
  // numbers the player uses, so they cannot drift out of sync with the audio.
  function renderContents(chapters) {
    var audio = window.PANIM_AUDIO || {};
    var rows = chapters.map(function (ch) {
      var a = audio[ch.id];
      var mins = a && a.voiceDur ? Math.round(a.voiceDur / 60) + ' min' : '';
      return '<a class="toc-row" href="#' + esc(ch.id) + '">' +
        '<span class="toc-num">' + ROMAN[ch.num] + '</span>' +
        '<span class="toc-body">' +
          '<span class="toc-title">' + esc(ch.title) + '</span>' +
          '<span class="toc-hook">' + esc(ch.hook) + '</span>' +
        '</span>' +
        '<span class="toc-dur">' + mins + '</span>' +
      '</a>';
    }).join('');

    var total = chapters.reduce(function (n, ch) {
      var a = audio[ch.id]; return n + (a && a.voiceDur ? a.voiceDur : 0);
    }, 0);
    var hrs = Math.floor(total / 3600), rem = Math.round((total % 3600) / 60);

    // ONE LINE, 2026-08-28. The section is now the words "Table of Contents" and
    // nothing else until it is tapped: no label, no chapter count, no running time
    // visible while it is closed. Everything below appears on open.
    // FOLDED WHOLE, earlier the same day. Folding only the standfirsts was the wrong cut: the
    // list still ran ~700px of index between the jacket and chapter I, and the thing
    // the author objected to was the block itself, not its height. The contents are
    // reachable from two other places that are always on screen — the Contents toggle
    // in the running head and the chapters sheet in the player — so on the page it is
    // now one line of apparatus that opens on demand, descriptions and all.
    // js/ui.js remembers the choice.
    return '<section class="section" id="contents">' +
      '<div class="section-inner">' +
        '<div class="toc-head">' +
          '<button type="button" class="toc-expand" id="toc-expand" ' +
            'aria-expanded="false" aria-controls="toc-list">Table of Contents</button>' +
          '<span class="toc-total">' + chapters.length + ' chapters &middot; ' +
            (hrs ? hrs + ' hr ' : '') + rem + ' min</span>' +
        '</div>' +
        '<nav class="toc" id="toc-list" aria-label="Table of contents">' + rows + '</nav>' +
      '</div></section>';
  }

  function plainText(html) { return String(html || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }

  function hookDuplicatesOpening(chapter) {
    var hook = plainText(chapter.hook);
    if (!hook) return true;
    for (var i = 0; i < chapter.blocks.length; i++) {
      if (chapter.blocks[i].type !== 'p') continue;
      return plainText(chapter.blocks[i].html).indexOf(hook) === 0;
    }
    return false;
  }

  function renderChapter(chapter) {
    var out = [];
    var dropCapDone = false;
    var plateHtml = '';
    var plateSlot = null;
    if (chapter.blocks.length && chapter.blocks[0].type === 'slot') {
      plateHtml = renderPlate(chapter.blocks[0].slot);
      if (plateHtml) plateSlot = chapter.blocks[0].slot;  // consumed: skip in flow
    }
    out.push('<section class="section chapter' + (plateHtml ? ' has-plate' : '') +
             '" id="' + chapter.id + '" data-ch="' + chapter.num + '">');
    out.push(plateHtml);
    out.push('<div class="section-inner">');
    out.push('<header class="chapter-header reveal">');
    // numeral and Hebrew mark share the margin column as one stack, so the mark sits
    // just under the numeral instead of dropping to a second grid row below the
    // whole title block.
    // Each chapter's own word, from content/marks.js — the openings all used to
    // show the same hardcoded PANIM_HEB. Hebrew is rtl and gets grapheme-split so
    // the combining nikkud stay attached; Greek is ltr and needs neither. Falls
    // back to פָּנִים if a chapter has no entry.
    var mk = (window.PANIM_MARKS || {})[chapter.id];
    var markHtml;
    if (mk && mk.w) {
      var isHeb = mk.lang === 'he';   // anything else is Greek (lang 'grc'), set LTR in the serif
      var title = mk.t + ' — ' + mk.g + ' (' + mk.r + ')';
      markHtml =
        '<div class="chapter-mark' + (isHeb ? '' : ' is-greek') + '" lang="' + esc(mk.lang) + '"' +
             (isHeb ? ' dir="rtl"' : '') +
             ' tabindex="0" role="note"' +
             ' aria-label="' + esc(title) + '"' +
             ' data-mark-term="' + esc(mk.t) + '"' +
             ' data-mark-ref="' + esc(mk.r) + '"' +
             // reuses the existing #gloss-card tooltip rather than a second one
             ' data-gloss-text="' + esc(title) + '">' +
          (isHeb ? hebSpans(mk.w) : esc(mk.w)) +
        '</div>';
    } else {
      markHtml = '<div class="chapter-mark" lang="he" dir="rtl" aria-hidden="true">' +
        hebSpans(PANIM_HEB) + '</div>';
    }
    out.push('<div class="chapter-margin">' +
      '<span class="chapter-num">Chapter ' + ROMAN[chapter.num] + '</span>' +
      markHtml +
    '</div>');
    out.push('<div class="chapter-titleblock">');
    out.push('<h2 class="chapter-title">' + esc(chapter.title) + '</h2>');
    // The hook in content/chapters.js is the opening line of the chapter's own
    // first paragraph — in ch.I and ch.III it IS the whole first paragraph. The
    // old layout hid that (the hook sat centred under a huge title, and the prose
    // began a full screen lower, past a photograph); at this density the sentence
    // simply appears twice, four lines apart. So the hook is only set as a
    // standfirst when it is NOT how the prose already opens. No content is edited.
    if (!hookDuplicatesOpening(chapter)) {
      out.push('<p class="chapter-hook">' + esc(chapter.hook) + '</p>');
    }
    out.push('<button class="btn listen-from-here" data-listen-chapter="' + chapter.id + '">Listen from here</button>');
    out.push('</div>');
    out.push('</header>');

    var prayerBuffer = [];
    function flushPrayer() {
      if (prayerBuffer.length) {
        out.push('<div class="prayer-zone" data-prayer-zone="' + chapter.id + '">' + prayerBuffer.join('') + '</div>');
        prayerBuffer = [];
      }
    }

    chapter.blocks.forEach(function (b) {
      if (b.type === 'fivewords') return; // rendered separately, terminal section
      var html;
      if (b.type === 'slot') {
        if (b.slot === plateSlot) return; // consumed as the chapter's opening plate
        html = renderImageSlot(b.slot);
      } else if (b.type === 'p') {
        var tear = maybeTearLine(chapter.id, b._html.replace(/<[^>]+>/g, ''));
        // The drop cap goes on the first paragraph with enough text to wrap around
        // it. Chapter I opens on "Jerusalem, 1979." — a two-word paragraph, where a
        // three-line initial has nothing to sit beside and just floats.
        var cls = 'block-p reveal';
        if (!dropCapDone && b.zone !== 'prayer' && plainText(b._html).length >= 90) {
          cls += ' has-dropcap';
          dropCapDone = true;
        }
        html = '<p class="' + cls + '" id="' + esc(b.id) + '" data-cue-id="' + esc(b.id) + '">' + b._html + tear + '</p>';
      } else if (b.type === 'verse') {
        html = renderVerse(b);
      } else if (b.type === 'ref') {
        // A citation the manuscript sets on its own line, under the line it
        // cites — the prayer in ch. X is written this way throughout. It is
        // apparatus, not narration: the narrator never reads it, so it carries
        // no cue id and the follow-along steps straight over it.
        html = '<p class="block-ref">' + esc(b.ref) + '</p>';
      } else if (b.type === 'beat') {
        html = '<div class="divider-beat hairline" aria-hidden="true"></div>';
      } else if (b.type === 'swell') {
        // A swell is the same mark as a beat, held longer: the same rule, drawn
        // wider, with more air around it. Before this it carried no .hairline
        // and was only empty space, so a section break and a dropped paragraph
        // looked identical on the page.
        html = '<div class="divider-swell hairline" aria-hidden="true"></div>';
      } else {
        html = '';
      }
      if (b.zone === 'prayer') {
        prayerBuffer.push(html);
      } else {
        flushPrayer();
        out.push(html);
      }
    });
    flushPrayer();

    out.push('</div></section>');
    return out.join('');
  }

  // The hero photograph (PANIM_IMAGES.hero) is the opening plate: it takes the top
  // of the page on its own, with the title block set on paper beneath it. Nothing
  // is laid over the picture. With the slot empty the title block simply moves to
  // the top of the page and the site opens on type, which also works.
  function mountHero() {
    // the hero's Hebrew writes itself in, right to left, once on load
    var heb = document.querySelector('.hero-hebrew');
    if (heb && heb.textContent.trim()) {
      heb.innerHTML = hebSpans(heb.textContent.trim(), 90);
    }

    var img = window.PANIM_IMAGES ? window.PANIM_IMAGES.hero : null;
    var hero = document.getElementById('hero');
    if (!img || !img.src || !hero) return;
    var fig = document.createElement('figure');
    fig.className = 'hero-plate';
    // the hero is the LCP element: eager, high priority, and never lazy.
    fig.innerHTML = '<img src="' + esc(img.src) + '" alt="' + esc(img.alt || '') +
      '" fetchpriority="high" decoding="async">';
    hero.insertBefore(fig, hero.firstChild);
    hero.classList.add('has-hero-plate');
  }

  function run() {
    var chapters = window.PANIM_CHAPTERS || [];
    var skippedGlossTerms = [];
    var html = [];

    html.push(renderContents(chapters));

    chapters.forEach(function (chapter) {
      // work on a private copy of html text per block so glossify never touches source data
      chapter.blocks.forEach(function (b) { if (b.type === 'p') b._html = b.html; });
      skippedGlossTerms = skippedGlossTerms.concat(glossify(chapter));
      html.push(renderChapter(chapter));
    });

    // five words: last block of ch10
    var ch10 = chapters[chapters.length - 1];
    var fw = ch10 && ch10.blocks[ch10.blocks.length - 1];
    if (fw && fw.type === 'fivewords') html.push(renderFiveWords(fw));

    html.push(renderThread());
    html.push(renderLexicon());

    var root = document.getElementById('chapters-root');
    root.innerHTML = html.join('');

    mountHero();

    window.PANIM_RENDERED = {
      chapters: chapters,
      skippedGlossTerms: skippedGlossTerms,
      romanFor: function (n) { return ROMAN[n] || String(n); }
    };

    document.dispatchEvent(new CustomEvent('panim:rendered'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
