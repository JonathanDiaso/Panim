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
    caption: "Chamber 25."
  },
  "ch01-scroll": {
    src: "art/ch01-scroll.webp",
    alt: "Extreme close-up of a small blackened silver scroll resting in an open weathered palm, faint scratched Hebrew letters catching the light.",
    caption: "The oldest words we have."
  },
  "ch02-trees": {
    src: "art/ch02-trees.webp",
    alt: "A dense garden at dusk; two figures press themselves behind tree trunks, faces hidden, while a soft searching light moves between the trees toward them.",
    caption: "And they hid themselves from the face of the LORD God among the trees."
  },
  "ch02-storm": null,
  "ch03-mountain": null,
  "ch04-river": null,
  "ch05-bush": null,
  "ch06-shine": null,
  "ch07-gate": null,
  "ch08-flint": null,
  "ch08-veil": null,
  "ch09-charcoal": null,
  "ch09-emmaus": null,
  "ch10-veil-lift": null,
  "ch10-morning": {
    src: "art/ch10-morning.webp",
    alt: "Full morning light on a woman's face, eyes open and calm, tears at the edge of joy, a hand resting against her cheek. The first full face of the book.",
    caption: "Face to face."
  },
  "og-image": null
};
