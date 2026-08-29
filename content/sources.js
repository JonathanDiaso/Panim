// PANIM_SOURCES — "Where these came from", the sources page.
//
// 🛑 WHY THIS FILE EXISTS. The Lexicon's standfirst has always CLAIMED its sources —
// "every vowel point and every accent here was read out of a published source … not
// one character was typed from memory" — and then never listed them. A book that
// says that has to show its working, or the sentence is decoration. This is the
// working.
//
// 🛑 EVERY ROW BELOW IS A SOURCE THIS REPOSITORY CAN PROVE IT USED. The lexicon rows
// in content/lexicon.js each carry a comment naming the source that supplied them,
// and content/marks.js carries the same discipline for the ten chapter marks. This
// file is a summary OF those comments — it is not a bibliography assembled from
// memory, and nothing was added to it to make the list look longer.
//
// ⚠️ `status: 'unconfirmed'` MEANS EXACTLY WHAT IT SAYS. A row so marked is one the
// prose depends on but the repository has no fetched record for. It renders with its
// claim visible and its citation withheld, because a citation typed from memory is
// the precise failure this page exists to rule out. Fill it in from the publication,
// then drop the flag. Do NOT guess a volume or a page number to tidy the page up.
//
//   group   the heading it sits under
//   title   the work
//   who     author / publisher / issuing body, as the work itself gives it
//   what    what this book took from it, in one sentence
//   where   how it was reached — an API, a printed volume, a site
//   status  omitted when confirmed; 'unconfirmed' when the citation is still open

(function () {
  'use strict';

  window.PANIM_SOURCES = [
    {
      group: 'The text itself',
      note: 'Every pointed Hebrew form and every Greek lemma on this site was pulled ' +
            'out of one of these by a script and pasted in. None was typed by hand.',
      items: [
        {
          title: 'Miqra according to the Masorah (MAM)',
          who: 'Seth (Avi) Kadish, ed. · via Sefaria',
          what: 'The vocalised Masoretic text. Every Hebrew word in the Lexicon and ' +
                'every chapter mark comes from here, with cantillation and meteg ' +
                'stripped and the nikkud and the shin/sin dots kept.',
          where: 'Sefaria, /api/v3/texts'
        },
        {
          title: "Strong's Greek, with the verse interlinears",
          who: 'BibleHub',
          what: 'The Greek lemma for each of the eight Greek entries. The inflected ' +
                "form was then checked on the verse's own interlinear page before " +
                'the row was written.',
          where: 'biblehub.com'
        }
      ]
    },
    {
      group: 'The lexica',
      note: 'Two independent sources were consulted for every headword rather than ' +
            'one — which is the only reason the next paragraph could be written.',
      items: [
        {
          title: 'A Hebrew and English Lexicon of the Old Testament (BDB)',
          who: 'Brown, Driver and Briggs · Augmented Strong edition, via Sefaria',
          what: 'The citation form — the shape you would actually look a word up ' +
                'under — for most of the Hebrew entries.',
          where: 'Sefaria, /api/words'
        },
        {
          title: 'A Comprehensive Etymological Dictionary of the Hebrew Language',
          who: 'Ernest Klein · via Sefaria',
          what: 'The two post-biblical words.',
          where: 'Sefaria, /api/words'
        },
        {
          title: 'A Dictionary of the Targumim, the Talmud Babli and Yerushalmi, ' +
                 'and the Midrashic Literature',
          who: 'Marcus Jastrow · via Sefaria',
          what: 'The rabbinic senses, where a word has one the biblical lexica do not ' +
                'carry.',
          where: 'Sefaria, /api/words'
        },
        {
          title: 'The Assyrian Dictionary of the Oriental Institute of the ' +
                 'University of Chicago (CAD), vol. M part 2',
          who: 'The Oriental Institute, University of Chicago',
          what: 'melammu — the one Akkadian word in the book, and the only entry ' +
                'in a third language. s.v. melammu, pp. 9–12.',
          where: 'CAD M/2, printed volume'
        },
        {
          title: '"Akkadian pul(u)h(t)u and melammu", JAOS 63 (1943), 31–34',
          who: 'A. Leo Oppenheim',
          what: 'The second source on melammu, held to the same two-source rule as ' +
                'every Hebrew headword.',
          where: 'Journal of the American Oriental Society'
        }
      ]
    },
    {
      group: 'What the quotations are',
      note: '',
      items: [
        {
          title: 'New American Standard Bible, 1995 edition',
          who: 'The Lockman Foundation',
          what: 'The default translation. Every verse quoted in this book is the ' +
                'NASB 1995 unless its reference says otherwise.',
          where: 'quoted throughout'
        },
        {
          title: 'English Standard Version',
          who: 'Crossway',
          what: 'Used for five verses, each one marked "(ESV)" at its reference: ' +
                'Genesis 4:5, Psalm 88:14 and 18, Hosea 2:14, Numbers 13:30 and ' +
                'Numbers 6:27.',
          where: 'marked at the reference'
        }
      ]
    },
    {
      group: 'The archaeology',
      note: 'Chapter I stands on a real excavation and a real object, and this book ' +
            'is not the place to learn either of them from. The find is 1979; the ' +
            'reading the chapter uses is the 2004 re-edition.',
      items: [
        {
          title: '"The Amulets from Ketef Hinnom: A New Edition and Evaluation", ' +
                 'BASOR 334 (2004), 41\u201371',
          who: 'Gabriel Barkay, Marilyn J. Lundberg, Andrew G. Vaughn and Bruce Zuckerman',
          what: 'The two rolled silver scrolls carrying the priestly blessing \u2014 the ' +
                'oldest known biblical text \u2014 which chapter I opens on. Excavated by ' +
                'Barkay in 1979 from Chamber 25 of Cave 24, and re-read here from ' +
                'high-resolution imaging that recovered letters the first reading could ' +
                'not see.',
          where: 'Bulletin of the American Schools of Oriental Research'
        },
        {
          title: '"News From the Field: The Divine Name Found in Jerusalem"',
          who: 'Gabriel Barkay \u00b7 Biblical Archaeology Review 9.2 (1983), 14\u201319',
          what: 'The excavator\u2019s own first announcement of the find, four years after ' +
                'it came out of the ground. Held to the same two-source rule as every ' +
                'Hebrew headword in the Lexicon.',
          where: 'Biblical Archaeology Review'
        }
      ]
    }
  ];
})();
