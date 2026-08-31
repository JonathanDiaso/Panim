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
    { name: 'Caleb',     kind: 'person', forms: ['Caleb'], note: 'who walked the same forty days, and came back saying their cover was gone' },
    { name: 'Daniel',    kind: 'person', forms: ['Daniel'], note: 'an old man at an east-facing window, praying the blessing back at God' },
    { name: 'David',     kind: 'person', forms: ['David'], note: 'who danced for the face, and told his wife whose face it was' },
    { name: 'Elijah',    kind: 'person', forms: ['Elijah'],    note: 'and the sound of thin silence at Horeb' },
    { name: 'Esau',      kind: 'person', forms: ['Esau'],      note: "Jacob's brother, and the face he rehearsed for twenty years" },
    { name: 'Esther',    kind: 'person', forms: ['Esther'], note: 'who wrote a five-word will, then walked toward a face that could kill her' },
    { name: 'Ezekiel',   kind: 'person', forms: ['Ezekiel'], note: 'the priest who never served, and watched the glory ride out on faces' },
    { name: 'Hagar',     kind: 'person', forms: ['Hagar'],     note: 'the runaway who named God' },
    { name: 'Hannah',    kind: 'person', forms: ['Hannah'], note: 'who prayed at Shiloh, and her face was no longer sad' },
    { name: 'Isaac',     kind: 'person', forms: ['Isaac'], note: 'the bound son, who drops out of the story until a bride is brought to him' },
    { name: 'Isaiah',    kind: 'person', forms: ['Isaiah'], note: 'who named God by His hiding, and knew what the set face would cost' },
    { name: 'Jacob',     kind: 'person', forms: ['Jacob'],     note: 'who wrestled at the ford and would not let go' },
    { name: 'Jesus',     kind: 'person', forms: ['Jesus'], note: 'who set his face like flint, and let it be spat on' },
    { name: 'Job',       kind: 'person', forms: ['Job'], note: 'who would not take the explanation, and held out for a face' },
    { name: 'John',      kind: 'person', forms: ['John'], note: 'who leaned on the chest, and would rather come than write' },
    { name: 'Jonah',     kind: 'person', forms: ['Jonah'],     note: 'who went out from the face of the LORD' },
    { name: 'Joshua',    kind: 'person', forms: ['Joshua'], note: "Moses's aide, scandalised that the Spirit went where the ceremony had not" },
    { name: 'Judas',     kind: 'person', forms: ['Judas'], note: 'who went out into the night, and the one who stayed had the same name' },
    { name: 'Luke',      kind: 'person', forms: ['Luke'], note: 'who spends three verbs on a father running' },
    { name: 'Mary',      kind: 'person', forms: ['Mary'], note: 'left crying outside the tomb after the others had gone home' },
    { name: 'Melchizedek', kind: 'person', forms: ['Melchizedek'], note: 'the priest-king of Salem, who brought no altar' },
    { name: 'Moses',     kind: 'person', forms: ['Moses'], note: 'who asked for the glory, and was given a cleft and a back' },
    { name: 'Paul',      kind: 'person', forms: ['Paul'], note: 'three days blind, then a lifetime on mirrors and unveiled faces' },
    { name: 'Peter',     kind: 'person', forms: ['Peter'],     note: 'the courtyard, the charcoal, and the beach' },
    { name: 'Pharaoh',   kind: 'person', forms: ['Pharaoh'], note: 'the face Moses asked to be excused from, and was not' },
    { name: 'Philip',    kind: 'person', forms: ['Philip'], note: 'who asked for the Father with no idea whose words he was carrying' },
    { name: 'Rebekah',   kind: 'person', forms: ['Rebekah'], note: 'whose name means to tie fast, and who lifted her eyes as he lifted his' },
    { name: 'Sarai',     kind: 'person', forms: ['Sarai'], note: "Abram's wife, and the owner of the slave girl who named God" },
    { name: 'Saul',      kind: 'person', forms: ['Saul'], note: 'the king who heard about his replacement years before he met the boy' },
    { name: 'Solomon',   kind: 'person', forms: ['Solomon'], note: 'who built the house the glory would later leave' },
    { name: 'Stephen',   kind: 'person', forms: ['Stephen'],   note: 'whose face was like the face of an angel' },
    // Not biblical, and kept deliberately: the still-face experiment is load-bearing
    // in the argument, and a reader who wants to go and read it needs the name.
    { name: 'Tronick, Edward', kind: 'person', forms: ['Tronick'], note: 'the still-face experiment' },

    // ---- places ----
    { name: 'Babylon',   kind: 'place', forms: ['Babylon'],    note: 'and its borrowed radiance' },
    { name: 'Carmel',    kind: 'place', forms: ['Carmel'], note: 'where the fire fell, and the morning after it' },
    { name: 'Damascus',  kind: 'place', forms: ['Damascus'], note: "a road, a light that took a man's eyes, and the rest of his life" },
    { name: 'Eden',      kind: 'place', forms: ['Eden'], note: 'the garden, and the move this book watches us make in every chapter' },
    { name: 'Egypt',     kind: 'place', forms: ['Egypt'], note: 'a country of gods with stone faces, and not one of them looked back' },
    { name: 'Emmaus',    kind: 'place', forms: ['Emmaus'],     note: 'the road, and the table after it' },
    { name: 'Galilee',   kind: 'place', forms: ['Galilee'], note: 'where the man undone by a look went back to fishing' },
    { name: 'Gath',      kind: 'place', forms: ['Gath'], note: 'where David let his spit run into his beard to stay alive' },
    { name: 'Golgotha',  kind: 'place', forms: ['Golgotha'], note: 'where the set face arrived' },
    { name: 'Horeb',     kind: 'place', forms: ['Horeb'], note: "Sinai's other name, the cleft in its rock, and the thin silence" },
    { name: 'Jabbok',    kind: 'place', forms: ['Jabbok'],     note: 'the ford, and the night at it' },
    { name: 'Jerusalem', kind: 'place', forms: ['Jerusalem'], note: 'where the silver went into the ground, and where the face was set' },
    { name: 'Ketef Hinnom', kind: 'place', forms: ['Ketef Hinnom', 'Hinnom'], note: 'the burial caves, and Chamber 25' },
    { name: 'Moriah',    kind: 'place', forms: ['Moriah'], note: 'where Abraham named the mountain the LORD will see' },
    { name: 'Nile',      kind: 'place', forms: ['Nile'], note: 'the river the stone faces stared down' },
    { name: 'Nineveh',   kind: 'place', forms: ['Nineveh'], note: 'the city east, and every mile Jonah ran west was a mile toward it' },
    { name: 'Olives, Mount of', kind: 'place', forms: ['Mount of Olives'], note: 'the ridge the glory left over, and came back down' },
    { name: 'Peniel',    kind: 'place', forms: ['Peniel'],     note: 'the face of God, and the name Jacob gave the place' },
    { name: 'Salem',     kind: 'place', forms: ['Salem'],      note: 'the city that becomes Jerusalem' },
    { name: 'Sinai',     kind: 'place', forms: ['Sinai'], note: 'the mountain where the distance was something we asked for' }
  ];
})();
