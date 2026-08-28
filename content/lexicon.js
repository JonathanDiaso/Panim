// PANIM_LEXICON — the closing lexicon.
//
// 🛑 THE POINTED FORMS BELOW ARE THE TEN THAT WERE VERIFIED AGAINST A SOURCE —
// Sefaria's Masoretic text for the Hebrew, BibleHub's lexicon for the Greek — and
// they are carried across from content/marks.js unchanged rather than retyped, so
// there is one place a wrong niqqud could enter and it is not this file.
//
// The book uses about fifty terms. Forty of them appear in the manuscript in
// TRANSLITERATION ONLY (kaphar, Kapporet, tohu, kanaph, tzel, hilasterion,
// enopion, tamid, Akedah, tefillin, and the rest). Writing their pointed forms
// from memory is exactly the failure marks.js warns about at the top of itself —
// wrong niqqud in a book about a Hebrew word is not worth it — so they are NOT
// here yet. Each needs a source lookup first. When one is verified, add it below
// and it joins the lexicon with no other change.
//
//   w     the word, pointed          t   transliteration, the book's own style
//   g     what it means              r   where it is
//   ch    the chapter it belongs to  lang 'he' | 'grc'
(function () {
  var M = window.PANIM_MARKS || {};
  var ORDER = ['ch01','ch02','ch03','ch04','ch05','ch06','ch07','ch08','ch09','ch10'];
  window.PANIM_LEXICON = ORDER.filter(function (id) { return M[id]; }).map(function (id) {
    var m = M[id];
    return { w: m.w, t: m.t, g: m.g, r: m.r, lang: m.lang, ch: id, num: +id.slice(2) };
  });
})();
