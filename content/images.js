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
  "ch02-trees": {
    src: "art/ch02-trees.webp",
    alt: "A dense garden at dusk; two figures press themselves behind tree trunks, faces hidden, while a soft searching light moves between the trees toward them.",
    caption: "And they hid themselves from the face of the LORD God among the trees.",
    ref: "Genesis 3:8"
  },
  "ch02-storm": null,
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
  "ch08-flint": null,
  "ch08-veil": null,
  "ch09-charcoal": null,
  "ch09-emmaus": null,
  "ch10-veil-lift": null,
  "ch10-morning": {
    src: "art/ch10-morning.webp",
    alt: "Full morning light on a woman's face, eyes open and calm, tears at the edge of joy, a hand resting against her cheek. The first full face of the book.",
    caption: "Face to face.",
    ref: "John 14:9 · Song of Songs 2:14"
  },
  "og-image": null
};
