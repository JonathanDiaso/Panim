// PANIM_IMAGES — author image manifest (11-website-plan.md §10).
// Empty slots (null) render as a styled-empty frame; a chapter whose FIRST slot is
// filled gets that photo as a full-bleed frontispiece behind its title (render.js).
// Adding an image is a one-line edit:
//   { src: "art/ch01-tomb.webp", alt: "descriptive alt text", caption: "optional caption" }

window.PANIM_IMAGES = {
  "hero": {
    src: "art/hero.webp",
    alt: "A heavy ancient wooden door standing ajar in a dark stone room, warm golden light pouring through the gap, dust drifting in the beam."
  },
  "ch01-tomb": {
    src: "art/ch01-tomb.webp",
    alt: "Looking down through a broken hole in an ancient stone floor into a burial chamber; a dusty hand grips the jagged edge as one shaft of light rakes across scrolls and a lamp below.",
    caption: "Chamber 25.",
    ref: "Ketef Hinnom, Jerusalem · 1979"
  },
  "ch01-scroll": {
    src: "art/ch01-scroll.webp",
    alt: "Extreme close-up of a small blackened silver scroll resting in an open weathered palm, faint scratched Hebrew letters catching the light.",
    caption: "The oldest words we have.",
    ref: "Numbers 6:24–26 · c. 600 BC"
  },
  // ⚠️ PLACEHOLDER — still golden and lush on the coldest page in the book, and the
  // figures read as modern (long wavy auburn hair) and are nude rather than in the
  // fig leaves of Gen 3:7. Better than the previous frame, still not right.
  // Replace against art/PROMPTS.md `ch02-trees`.
  "ch02-trees": {
    src: "art/ch02-trees.webp",
    alt: "A garden at dusk; two figures press themselves behind tree trunks, faces hidden, while a soft searching light moves between the trees toward them.",
    caption: "And they hid themselves from the face of the LORD God among the trees.",
    ref: "Genesis 3:8"
  },
  // ⚠️ PLACEHOLDER — this is a VIKING LONGSHIP. Dragon-head prow, Norse knotwork,
  // axe-blade sternpost, Scandinavian crew; 9th-century AD, where Jonah's ship is
  // 8th-century BC Phoenician. It is also painted, not photographic. Up so the slot
  // is not empty; replace against art/PROMPTS.md `ch02-storm`, which names the fix.
  "ch02-storm": {
    src: "art/ch02-storm.webp",
    alt: "A single-masted ship in a heavy sea at night under rain, a wave lifting under the hull, cargo jars going over the side, one cold break of light in the cloud behind.",
    caption: "The LORD hurled a great wind onto the sea.",
    ref: "Jonah 1:4"
  },
  "ch03-mountain": {
    src: "art/ch03-mountain.webp",
    alt: "A mountain under a night sky, its summit burning under smoke and lightning while a crowd of small robed figures stands far back on the plain below, facing it, not moving closer.",
    caption: "Speak to us yourself, and we will listen; but let not God speak to us.",
    ref: "Exodus 20:19"
  },
  "ch04-river": {
    src: "art/ch04-river.webp",
    alt: "Two figures locked together in the shallows of a dark river at night, water thrown up around them, a low moon behind. Neither face is visible.",
    caption: "I have seen God face to face, yet my life has been preserved.",
    ref: "Genesis 32:30 · Peniel"
  },
  "ch05-bush": {
    src: "art/ch05-bush.webp",
    alt: "A desert scrub bush burning in low golden light, unconsumed, with a pair of worn sandals set down on the stone in front of it.",
    caption: "Then Moses hid his face, for he was afraid to look at God.",
    ref: "Exodus 3:6"
  },
  "ch06-shine": {
    src: "art/ch06-shine.webp",
    alt: "A figure standing with a heavy cloth drawn over the head and face, sun directly behind, light burning around the edge of the covering so the face itself cannot be seen.",
    caption: "The word Hebrew had to mint for that piece of cloth, and never used again.",
    ref: "masveh · Exodus 34:33"
  },
  "ch07-gate": null,
  "ch08-flint": {
    src: "art/ch08-flint.webp",
    alt: "A bearded man's profile turned hard to one side against a storm-dark sky, one low red-brown light tracing the nose and jaw, the rest near black. The expression is not anguish; it is a decision already made.",
    caption: "Therefore I have set My face like flint.",
    ref: "Isaiah 50:7"
  },
  "ch08-veil": {
    src: "art/ch08-veil.webp",
    alt: "A colossal woven temple curtain in blue, purple and scarlet, split from the top downward, hard white light bursting through the tear and individual threads snapping and lighting up as they part.",
    caption: "Torn in two from top to bottom — from the other side.",
    ref: "parochet · Matthew 27:51"
  },
  "ch09-charcoal": {
    src: "art/ch09-charcoal.webp",
    alt: "A small charcoal fire on a pebble shore at first light, fish and flat bread laid on the coals, low smoke drifting sideways and backlit into a thin sheet, cold grey sea behind.",
    caption: "The word burns in only two places: a courtyard, and this beach.",
    ref: "anthrakia · John 21:9"
  },
  "ch09-emmaus": {
    src: "art/ch09-emmaus.webp",
    alt: "A rough table in a dim stone room lit by one small window at first light: a round loaf torn in half, a clay cup, and a thin line of smoke still rising from a wick just gone out. No one is there.",
    caption: "Then their eyes were opened and they recognized Him.",
    ref: "Luke 24:31 · Emmaus"
  },
  "ch10-veil-lift": null,
  "ch10-morning": {
    src: "art/ch10-morning.webp",
    alt: "Full morning light on a woman's face, eyes open and calm, tears at the edge of joy, a hand resting against her cheek. The first full face of the book.",
    caption: "Face to face.",
    ref: "John 14:9 · Song of Songs 2:14"
  },
  "og-image": null
};
