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
      return '<figure class="img-slot is-filled reveal" data-slot="' + esc(slotId) + '">' +
        '<img src="' + esc(img.src) + '" alt="' + esc(img.alt || '') + '" loading="lazy">' + cap +
        '</figure>';
    }
    return '<div class="img-slot reveal" data-slot="' + esc(slotId) + '" aria-hidden="true">' +
      '<span class="img-slot-mark">Image forthcoming</span></div>';
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
  var PLATE_ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
                     'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI'];
  var plateCount = 0;
  function renderPlate(slotId) {
    var img = window.PANIM_IMAGES ? window.PANIM_IMAGES[slotId] : null;
    if (!img || !img.src) return '';
    plateCount++;
    // The caption carries an optional `ref` — a scripture reference or a locator. A
    // plate in a book earns its place by telling you WHERE you are, not just what
    // you are looking at, and it sends the reader back into the text.
    var caption = (img.caption || img.ref)
      ? '<figcaption class="plate-caption">' +
          '<span class="plate-num">Plate ' + (PLATE_ROMAN[plateCount] || plateCount) + '</span>' +
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

    return '<section class="section" id="contents">' +
      '<div class="section-inner">' +
        '<div class="toc-head">' +
          '<span class="chapter-num">Contents</span>' +
          '<span class="toc-total">' + chapters.length + ' chapters &middot; ' +
            (hrs ? hrs + ' hr ' : '') + rem + ' min</span>' +
        '</div>' +
        '<nav class="toc" aria-label="Table of contents">' + rows + '</nav>' +
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
      var isHeb = mk.lang !== 'el';
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
