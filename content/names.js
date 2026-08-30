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
//   note   a half-line saying who or where, for a reader who does not know. EVERY
//          entry carries one as of 2026-08-30 (D17-B): the entry used to print a
//          PERSON / PLACE badge instead, which told a reader nothing about Moses
//          that the name had not already told them. The badge is gone and the note
//          does its work, so a new entry without one now renders a bare name.

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
    { name: 'Caleb',     kind: 'person', forms: ['Caleb'], note: 'one of the twelve who went in to look at the land' },
    { name: 'Daniel',    kind: 'person', forms: ['Daniel'], note: 'who set his face toward the Lord to seek him' },
    { name: 'David',     kind: 'person', forms: ['David'], note: 'the king who was told to seek a face, and answered' },
    { name: 'Elijah',    kind: 'person', forms: ['Elijah'],    note: 'and the sound of thin silence at Horeb' },
    { name: 'Esau',      kind: 'person', forms: ['Esau'],      note: "Jacob's brother, and the face he rehearsed for twenty years" },
    { name: 'Esther',    kind: 'person', forms: ['Esther'], note: "who went in unbidden, to stand before a king's face" },
    { name: 'Ezekiel',   kind: 'person', forms: ['Ezekiel'], note: 'who saw the likeness of the glory and fell on his face' },
    { name: 'Hagar',     kind: 'person', forms: ['Hagar'],     note: 'the runaway who named God' },
    { name: 'Hannah',    kind: 'person', forms: ['Hannah'], note: 'who prayed at Shiloh, and her face was no longer sad' },
    { name: 'Isaac',     kind: 'person', forms: ['Isaac'], note: "Abraham's son, and the walk up Moriah" },
    { name: 'Isaiah',    kind: 'person', forms: ['Isaiah'], note: 'who saw the Lord, and said he was undone' },
    { name: 'Jacob',     kind: 'person', forms: ['Jacob'],     note: 'who wrestled at the ford and would not let go' },
    { name: 'Jesus',     kind: 'person', forms: ['Jesus'], note: 'who set his face to go to Jerusalem' },
    { name: 'Job',       kind: 'person', forms: ['Job'], note: 'who asked why the face was hidden from him' },
    { name: 'John',      kind: 'person', forms: ['John'], note: 'who saw the city at the end, where the face is seen' },
    { name: 'Jonah',     kind: 'person', forms: ['Jonah'],     note: 'who went out from the face of the LORD' },
    { name: 'Joshua',    kind: 'person', forms: ['Joshua'], note: "Moses's aide, and the one scandalised at the tent" },
    { name: 'Judas',     kind: 'person', forms: ['Judas'], note: 'who left the table while the lamps were still lit' },
    { name: 'Luke',      kind: 'person', forms: ['Luke'], note: 'who slows a scene down to record what a face did' },
    { name: 'Mary',      kind: 'person', forms: ['Mary'], note: 'who was at the tomb before she knew who was speaking' },
    { name: 'Melchizedek', kind: 'person', forms: ['Melchizedek'], note: 'the priest-king of Salem, who brought no altar' },
    { name: 'Moses',     kind: 'person', forms: ['Moses'], note: 'who asked to see the glory, and was shown a back' },
    { name: 'Paul',      kind: 'person', forms: ['Paul'], note: 'struck blind on the road, and three days without sight' },
    { name: 'Peter',     kind: 'person', forms: ['Peter'],     note: 'the courtyard, the charcoal, and the beach' },
    { name: 'Pharaoh',   kind: 'person', forms: ['Pharaoh'], note: 'the face Moses did not want to be sent before' },
    { name: 'Philip',    kind: 'person', forms: ['Philip'], note: 'who asked to be shown the Father, and was told he had seen him' },
    { name: 'Rebekah',   kind: 'person', forms: ['Rebekah'], note: "Isaac's wife, and the mother who sent Jacob away" },
    { name: 'Sarai',     kind: 'person', forms: ['Sarai'], note: 'Sarah, before the name was changed' },
    { name: 'Saul',      kind: 'person', forms: ['Saul'], note: 'the king whose house hunted David through the wilderness' },
    { name: 'Solomon',   kind: 'person', forms: ['Solomon'], note: 'who built the house the glory would later leave' },
    { name: 'Stephen',   kind: 'person', forms: ['Stephen'],   note: 'whose face was like the face of an angel' },
    // Not biblical, and kept deliberately: the still-face experiment is load-bearing
    // in the argument, and a reader who wants to go and read it needs the name.
    { name: 'Tronick, Edward', kind: 'person', forms: ['Tronick'], note: 'the still-face experiment' },

    // ---- places ----
    { name: 'Babylon',   kind: 'place', forms: ['Babylon'],    note: 'and its borrowed radiance' },
    { name: 'Carmel',    kind: 'place', forms: ['Carmel'], note: 'the ridge where the fire fell' },
    { name: 'Damascus',  kind: 'place', forms: ['Damascus'], note: 'the road to it, and the light on the road' },
    { name: 'Eden',      kind: 'place', forms: ['Eden'], note: 'the garden, and the first hiding in it' },
    { name: 'Egypt',     kind: 'place', forms: ['Egypt'], note: 'the house of slavery, and the country God came down to' },
    { name: 'Emmaus',    kind: 'place', forms: ['Emmaus'],     note: 'the road, and the table after it' },
    { name: 'Galilee',   kind: 'place', forms: ['Galilee'], note: 'the north country, and the lake the beach is on' },
    { name: 'Gath',      kind: 'place', forms: ['Gath'], note: 'the Philistine city David fled to' },
    { name: 'Golgotha',  kind: 'place', forms: ['Golgotha'], note: 'the place of a skull, and the curtain torn at it' },
    { name: 'Horeb',     kind: 'place', forms: ['Horeb'], note: 'Sinai by its other name, and the cleft in its rock' },
    { name: 'Jabbok',    kind: 'place', forms: ['Jabbok'],     note: 'the ford, and the night at it' },
    { name: 'Jerusalem', kind: 'place', forms: ['Jerusalem'], note: 'the city the face was set toward' },
    { name: 'Ketef Hinnom', kind: 'place', forms: ['Ketef Hinnom', 'Hinnom'], note: 'the burial caves, and Chamber 25' },
    { name: 'Moriah',    kind: 'place', forms: ['Moriah'], note: 'the mountain Abraham was sent to, and named after' },
    { name: 'Nile',      kind: 'place', forms: ['Nile'], note: 'the river the basket went out on' },
    { name: 'Nineveh',   kind: 'place', forms: ['Nineveh'], note: 'the city Jonah went the other way from' },
    { name: 'Olives, Mount of', kind: 'place', forms: ['Mount of Olives'], note: 'the ridge east of the city, and the garden on it' },
    { name: 'Peniel',    kind: 'place', forms: ['Peniel'],     note: 'the face of God, and the name Jacob gave the place' },
    { name: 'Salem',     kind: 'place', forms: ['Salem'],      note: 'the city that becomes Jerusalem' },
    { name: 'Sinai',     kind: 'place', forms: ['Sinai'], note: 'the mountain of the fire, the cloud and the forty days' }
  ];
})();
