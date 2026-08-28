// PANIM_MARKS — the word in each chapter's margin, and what it means on hover.
//
// Every chapter opening used to render the same hardcoded פָּנִים, ten times. This
// gives each chapter its own word: the one that chapter is actually about.
//
// The set crosses from Hebrew to Greek at chapter IX, which is not a formatting
// choice — it is the book's own movement. The vocabulary changes language where
// the story does, at the resurrection appearances.
//
// 🛑 EVERY POINTED FORM BELOW WAS VERIFIED AGAINST A SOURCE, not written from
// memory — Sefaria's Masoretic text for the Hebrew (sefaria.org/api/texts/...)
// and BibleHub's lexicon for the two Greek lemmas. Cantillation marks (te'amim,
// U+0591–U+05AF) are stripped and the nikkud kept: the accents are for chanting
// and only clutter a word quoted on its own. If you change one of these, verify
// it the same way — wrong nikkud in a book about a Hebrew word is not worth it.
//
//   w    the word, pointed
//   t    transliteration, matching the book's own style
//   g    what it means — shown on hover/focus
//   r    where it is
window.PANIM_MARKS = {
  "ch01": { w: "אֵל רֳאִי", t: "El Ro'i", g: "The God who sees me — the name a runaway slave girl gave Him, and the only name in Scripture given to God by a human being.", r: "Genesis 16:13", lang: "he" },
  "ch02": { w: "סָתַר", t: "satar", g: "To hide on purpose: a face deliberately turned away. Not absence — a decision.", r: "Isaiah 8:17", lang: "he" },
  "ch03": { w: "פָּנִים בְּפָנִים", t: "panim be-panim", g: "Face to face. What Sinai actually offered them, and what they asked Him to stop.", r: "Deuteronomy 5:4", lang: "he" },
  "ch04": { w: "פְּנִיאֵל", t: "Peniel", g: "The face of God — the name Jacob gave a river crossing after a night he did not win.", r: "Genesis 32:31", lang: "he" },
  "ch05": { w: "פֶּה אֶל־פֶּה", t: "peh el peh", g: "Mouth to mouth. Rarer than face to face, and higher: what God says Moses got and the prophets did not.", r: "Numbers 12:8", lang: "he" },
  "ch06": { w: "מַסְוֶה", t: "masveh", g: "The veil. Hebrew had no word for this and minted one; it appears nowhere else in the Bible, before or after.", r: "Exodus 34:33", lang: "he" },
  "ch07": { w: "הַסְתֵּר אַסְתִּיר", t: "haster astir", g: "I will surely hide. The verb doubled, the way Hebrew doubles a verb when it means it.", r: "Deuteronomy 31:18", lang: "he" },
  "ch08": { w: "כַּחַלָּמִישׁ", t: "ka-chalamish", g: "Like flint — the stone you strike fire from. A face set toward the thing it will not survive.", r: "Isaiah 50:7", lang: "he" },
  "ch09": { w: "ἀνθρακιά", t: "anthrakia", g: "A charcoal fire. It burns in exactly two places in the New Testament: the courtyard where Peter denied Him, and a beach at dawn.", r: "John 21:9", lang: "el" },
  "ch10": { w: "πρόσωπον πρὸς πρόσωπον", t: "prosopon pros prosopon", g: "Face to face — the Greek carrying the oldest Hebrew phrase in the book across into its last promise.", r: "1 Corinthians 13:12", lang: "el" }
};
