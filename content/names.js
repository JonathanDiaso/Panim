// PANIM_NAMES — the index of names and places.
//
// 🛑 THE LIST IS CURATED AND THE OCCURRENCES ARE MEASURED. This file names WHO and
// WHERE the index covers; it does not record where they appear. js/render.js scans
// content/chapters.js at render time and finds the real blocks, exactly the way the
// Index of Scripture is built from the verse blocks rather than from a typed list.
// So a name here with no occurrences in the manuscript simply does not render — the
// index cannot claim a page the book does not have.
//
// WHY A LIST AT ALL, rather than harvesting every capitalised word. Because "New",
// "Testament", "Presence", "Torah", "Gospel" and "Himself" all come back from that
// harvest, and an index padded with those is worse than no index. Which words are
// names is an editorial judgement, so it is written down in one place where it can
// be argued with, instead of being buried in a regular expression.
//
// THE THREE EXCLUSIONS, and each one has a reason:
//   · God, the LORD, YHWH, the Spirit, the Son, the Father — on nearly every page.
//     An index entry pointing at everywhere is an entry pointing at nothing. The
//     whole point of this section is that a reader can find Moses, or Sinai, or
//     Hagar, and those are findable precisely because they are not everywhere.
//   · The Hebrew, Greek and Akkadian words — panim, ehyeh, El Ro'i, melammu. They
//     have their own index, which draws them and gives them a root. Two indexes of
//     the same fifty words would be one index and a duplicate.
//   · Books of the Bible. The Index of Scripture is ordered by book already.
//
//   name   how it prints, and how it alphabetises
//   kind   'person' | 'place'
//   forms  every string that counts as this entry in the prose. The matcher adds
//          the possessive itself, so "Jacob" catches "Jacob's" — do not list both.
//   note   an optional half-line saying who or where, for a reader who does not know

(function () {
  'use strict';

  window.PANIM_NAMES = [
    // ---- people ----
    { name: 'Aaron',     kind: 'person', forms: ['Aaron'],     note: "Moses's brother, and Israel's first high priest" },
    { name: 'Abraham',   kind: 'person', forms: ['Abraham'],   note: 'called Abram before the name was changed' },
    { name: 'Abram',     kind: 'person', forms: ['Abram'],     note: 'Abraham, before the name was changed' },
    { name: 'Absalom',   kind: 'person', forms: ['Absalom'],   note: "David's son, and the two years of a face withheld" },
    { name: 'Adam',      kind: 'person', forms: ['Adam'],      note: 'the first man, and the first hiding' },
    { name: 'Cain',      kind: 'person', forms: ['Cain'],      note: 'whose face fell before he raised a hand' },
    { name: 'Caleb',     kind: 'person', forms: ['Caleb'] },
    { name: 'Daniel',    kind: 'person', forms: ['Daniel'] },
    { name: 'David',     kind: 'person', forms: ['David'] },
    { name: 'Elijah',    kind: 'person', forms: ['Elijah'],    note: 'and the sound of thin silence at Horeb' },
    { name: 'Esau',      kind: 'person', forms: ['Esau'],      note: "Jacob's brother, and the face he rehearsed for twenty years" },
    { name: 'Esther',    kind: 'person', forms: ['Esther'] },
    { name: 'Ezekiel',   kind: 'person', forms: ['Ezekiel'] },
    { name: 'Hagar',     kind: 'person', forms: ['Hagar'],     note: 'the runaway who named God' },
    { name: 'Hannah',    kind: 'person', forms: ['Hannah'] },
    { name: 'Isaac',     kind: 'person', forms: ['Isaac'] },
    { name: 'Isaiah',    kind: 'person', forms: ['Isaiah'] },
    { name: 'Jacob',     kind: 'person', forms: ['Jacob'],     note: 'who wrestled at the ford and would not let go' },
    { name: 'Jesus',     kind: 'person', forms: ['Jesus'] },
    { name: 'Job',       kind: 'person', forms: ['Job'] },
    { name: 'John',      kind: 'person', forms: ['John'] },
    { name: 'Jonah',     kind: 'person', forms: ['Jonah'],     note: 'who went out from the face of the LORD' },
    { name: 'Joshua',    kind: 'person', forms: ['Joshua'] },
    { name: 'Judas',     kind: 'person', forms: ['Judas'] },
    { name: 'Luke',      kind: 'person', forms: ['Luke'] },
    { name: 'Mary',      kind: 'person', forms: ['Mary'] },
    { name: 'Melchizedek', kind: 'person', forms: ['Melchizedek'], note: 'the priest-king of Salem, who brought no altar' },
    { name: 'Moses',     kind: 'person', forms: ['Moses'] },
    { name: 'Paul',      kind: 'person', forms: ['Paul'] },
    { name: 'Peter',     kind: 'person', forms: ['Peter'],     note: 'the courtyard, the charcoal, and the beach' },
    { name: 'Pharaoh',   kind: 'person', forms: ['Pharaoh'] },
    { name: 'Philip',    kind: 'person', forms: ['Philip'] },
    { name: 'Rebekah',   kind: 'person', forms: ['Rebekah'] },
    { name: 'Sarai',     kind: 'person', forms: ['Sarai'] },
    { name: 'Saul',      kind: 'person', forms: ['Saul'] },
    { name: 'Solomon',   kind: 'person', forms: ['Solomon'] },
    { name: 'Stephen',   kind: 'person', forms: ['Stephen'],   note: 'whose face was like the face of an angel' },
    // Not biblical, and kept deliberately: the still-face experiment is load-bearing
    // in the argument, and a reader who wants to go and read it needs the name.
    { name: 'Tronick, Edward', kind: 'person', forms: ['Tronick'], note: 'the still-face experiment' },

    // ---- places ----
    { name: 'Babylon',   kind: 'place', forms: ['Babylon'],    note: 'and its borrowed radiance' },
    { name: 'Carmel',    kind: 'place', forms: ['Carmel'] },
    { name: 'Damascus',  kind: 'place', forms: ['Damascus'] },
    { name: 'Eden',      kind: 'place', forms: ['Eden'] },
    { name: 'Egypt',     kind: 'place', forms: ['Egypt'] },
    { name: 'Emmaus',    kind: 'place', forms: ['Emmaus'],     note: 'the road, and the table after it' },
    { name: 'Galilee',   kind: 'place', forms: ['Galilee'] },
    { name: 'Gath',      kind: 'place', forms: ['Gath'] },
    { name: 'Golgotha',  kind: 'place', forms: ['Golgotha'] },
    { name: 'Horeb',     kind: 'place', forms: ['Horeb'] },
    { name: 'Jabbok',    kind: 'place', forms: ['Jabbok'],     note: 'the ford, and the night at it' },
    { name: 'Jerusalem', kind: 'place', forms: ['Jerusalem'] },
    { name: 'Ketef Hinnom', kind: 'place', forms: ['Ketef Hinnom', 'Hinnom'], note: 'the burial caves, and Chamber 25' },
    { name: 'Moriah',    kind: 'place', forms: ['Moriah'] },
    { name: 'Nile',      kind: 'place', forms: ['Nile'] },
    { name: 'Nineveh',   kind: 'place', forms: ['Nineveh'] },
    { name: 'Olives, Mount of', kind: 'place', forms: ['Mount of Olives'] },
    { name: 'Peniel',    kind: 'place', forms: ['Peniel'],     note: 'the face of God, and the name Jacob gave the place' },
    { name: 'Salem',     kind: 'place', forms: ['Salem'],      note: 'the city that becomes Jerusalem' },
    { name: 'Sinai',     kind: 'place', forms: ['Sinai'] }
  ];
})();
