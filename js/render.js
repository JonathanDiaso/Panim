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

  function renderImageSlot(slotId) {
    var img = window.PANIM_IMAGES ? window.PANIM_IMAGES[slotId] : null;
    if (img && img.src) {
      var cap = img.caption ? '<figcaption>' + esc(img.caption) + '</figcaption>' : '';
      return '<figure class="img-slot is-filled reveal" data-slot="' + esc(slotId) + '">' +
        '<img src="' + esc(img.src) + '" alt="' + esc(img.alt || '') + '" loading="lazy">' + cap +
        '</figure>';
    }
    return '<div class="img-slot reveal" data-slot="' + esc(slotId) + '" aria-hidden="true">' +
      '<span class="img-slot-mark">Image forthcoming</span></div>';
  }

  function renderVerse(b) {
    var lines = b.lines.map(function (l) { return '<span class="verse-line">' + esc(l) + '</span>'; }).join('');
    var ref = '<span class="verse-ref-text">' + esc(b.ref) + '</span>';
    var tag = (b.translation && b.translation !== 'NASB')
      ? '<span class="verse-translation">' + esc(b.translation) + '</span>' : '';
    return '<div class="verse-box reveal veil-lift" id="' + esc(b.id) + '" data-cue-id="' + esc(b.id) + '">' +
      '<span class="verse-quotemark" aria-hidden="true">&#8220;</span>' +
      '<div class="verse-text">' + lines + '</div>' +
      '<div class="verse-ref">' + ref + tag + '</div>' +
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

  // Frontispiece (SITE-V2-PLAN.md §4.3): when the author has supplied the chapter's
  // FIRST image, it renders full-bleed behind the chapter header, graded into the
  // dawn arc by css (.frontis-grade) and drifting at 0.85x scroll (motion.js).
  // With no image yet the chapter opens exactly as before — zero empty frames.
  function renderFrontis(slotId) {
    var img = window.PANIM_IMAGES ? window.PANIM_IMAGES[slotId] : null;
    if (!img || !img.src) return '';
    return '<div class="frontis" aria-hidden="true">' +
      '<div class="frontis-media" style="background-image:url(\'' + esc(img.src) + '\')"></div>' +
      '<div class="frontis-grade"></div><div class="frontis-veil"></div></div>';
  }

  function renderChapter(chapter) {
    var out = [];
    var frontisHtml = '';
    var frontisSlot = null;
    if (chapter.blocks.length && chapter.blocks[0].type === 'slot') {
      frontisHtml = renderFrontis(chapter.blocks[0].slot);
      if (frontisHtml) frontisSlot = chapter.blocks[0].slot;  // consumed: skip in flow
    }
    out.push('<section class="section chapter' + (frontisHtml ? ' has-frontis' : '') +
             '" id="' + chapter.id + '" data-ch="' + chapter.num + '">');
    out.push(frontisHtml);
    out.push('<div class="section-inner">');
    out.push('<header class="chapter-header reveal veil-lift">');
    out.push('<span class="chapter-num">' + ROMAN[chapter.num] + '</span>');
    out.push('<h2 class="chapter-title">' + esc(chapter.title) + '</h2>');
    out.push('<p class="chapter-hook">' + esc(chapter.hook) + '</p>');
    out.push('<button class="btn listen-from-here" data-listen-chapter="' + chapter.id + '">Listen from here</button>');
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
        if (b.slot === frontisSlot) return; // consumed as the frontispiece
        html = renderImageSlot(b.slot);
      } else if (b.type === 'p') {
        var tear = maybeTearLine(chapter.id, b._html.replace(/<[^>]+>/g, ''));
        html = '<p class="block-p reveal" id="' + esc(b.id) + '" data-cue-id="' + esc(b.id) + '">' + b._html + tear + '</p>';
      } else if (b.type === 'verse') {
        html = renderVerse(b);
      } else if (b.type === 'beat') {
        html = '<div class="divider-beat hairline" aria-hidden="true"></div>';
      } else if (b.type === 'swell') {
        html = '<div class="divider-swell" aria-hidden="true"></div>';
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

  function run() {
    var chapters = window.PANIM_CHAPTERS || [];
    var skippedGlossTerms = [];
    var html = [];

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
