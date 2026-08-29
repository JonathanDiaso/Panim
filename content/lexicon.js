// PANIM_LEXICON — the closing lexicon.
//
// 🛑 NOT ONE HEBREW OR GREEK CHARACTER IN THIS FILE WAS TYPED FROM MEMORY.
// Every pointed form below was pulled out of a fetched source and pasted in by a
// script (2026-08-28). The comment above each row names the source it came from:
//
//   MAM                     Sefaria /api/v3/texts — Miqra according to the Masorah,
//                           the vocalised Masoretic text. Cantillation (U+0591–U+05AF)
//                           and meteg are stripped; nikkud and the shin/sin dots kept.
//   BDB Augmented Strong    Sefaria /api/words — the citation form as BDB points it.
//   Klein Dictionary        Sefaria /api/words — Klein's Comprehensive Etymological
//                           Dictionary. Used for the two post-biblical words.
//   Jastrow Dictionary      Sefaria /api/words — the rabbinic lexicon.
//   BibleHub Strong's       biblehub.com/greek/<n>.htm — the Greek lemma, and the
//                           inflected form was checked in situ on the verse's own
//                           interlinear page before the row was written.
//
// ⚠️ BibleHub's Hebrew Strong's pages are NOT a safe source for the dagesh lene —
// /hebrew/6440 prints פָנִים and /hebrew/8544 prints תִּמוּנָה, both missing or
// wrong against the Masoretic text. Sefaria's lexicons agree with MAM and were used
// instead. That is exactly the class of error marks.js warns about, and it is why
// two independent sources were consulted for every headword rather than one.
//
// WHERE A ROW SHOWS A CITATION FORM vs AN ATTESTED ONE. A lexicon should show the
// form you would look up, so most rows carry the lexicon headword and the comment
// records the inflected form the chapter actually quotes. Rows the book quotes as a
// phrase, or as a distinctive inflection, carry the verse's own pointing instead —
// the same rule content/marks.js already follows (ka-chalamish, masveh).
//
// THE SHAPE OF THE LIST. The ten chapter marks come across from content/marks.js
// unchanged rather than being retyped, so there is still exactly one place a wrong
// nikkud could enter and it is not this file. Each chapter's mark leads, and the
// words that chapter turns on follow it.
//
//   w     the word, pointed          t   transliteration, the book's own style
//   g     what it means              r   where it is
//   ch    the chapter it belongs to  lang 'he' | 'grc'
//   root  the consonants to LIGHT once the word has finished drawing itself
//   kind  'mark' — the chapter's own word, from marks.js
//         'gloss' — a term the chapter leans on, verified here
//
// THE ROOT FIELD, added 2026-08-28. After a word finishes drawing, its root
// consonants stay lit and everything else — vowel points, prefixes, the vowel
// letters — dims, so the reader SEES the three letters the word is built from.
// That is the single most on-theme move available in a book about one word's
// biography, and it is why this file carries a `root` at all.
//
// 🛑 `root` IS NOT THE LEXICAL ROOT. It is the letters of the root that are
// ACTUALLY PRESENT IN THIS FORM, in order, spelled with the medial or final
// letterform the word itself uses. `lifnei` carries `פנ` and not `פנה`, because
// there is no he in לִפְנֵי and a highlight cannot light a letter that is not
// on the page. `kavod` carries `כבד` — the vav between the bet and the dalet is
// a vowel letter, not a root consonant, and it correctly stays dim.
//
// 🛑 A WORD WHOSE ROOT IS NOT RECOVERABLE FROM ITS OWN LETTERS HAS NO `root`,
// and gets no highlight rather than a wrong one. Left out on purpose:
// mi-yitten (the nun of נתן has assimilated and is not written), tefillin (the
// root is פלל but the second lamed is carried by a dagesh rather than written as
// a letter, so there is nothing on the page to light), temunah and tamid (the
// root is disputed), masveh (a hapax), every multi-word phrase, every proper
// name, and all six Greek entries — the root is a Semitic idea and
// lighting three letters of a Greek word would be teaching something false.
//
// The renderer fails safe: js/render.js matches `root` as a SUBSEQUENCE of the
// word's own base letters and, if it does not match, draws no highlight at all.
//
// MELAMMU IS IN, from 2026-08-28. It is Akkadian, neither Hebrew nor Greek, and it
// was held out of the first pass because a lexicon that admits a third language needs
// a third source discipline. It now has one: CAD M/2 and Oppenheim, JAOS 63, both
// named on the row itself. It is the only non-biblical-language row in the file and
// it renders in Latin transliteration.
(function () {
  var M = window.PANIM_MARKS || {};
  // The chapter marks come across from marks.js, which does not carry a root
  // because a margin word is not drawn letter by letter. Only satar is a bare
  // triliteral; the rest are phrases, names or Greek. Same rule as above.
  var MARK_ROOTS = { ch02: "\u05e1\u05ea\u05e8" };   // סתר

  var ORDER = ['ch01','ch02','ch03','ch04','ch05','ch06','ch07','ch08','ch09','ch10'];

  // The forty verified terms. Generated 2026-08-28 — see the header.
  var GLOSSARY = [
    // BDB Augmented Strong headword; attested in Genesis 1:2 (MAM)
    { w: "תֹּהוּ", t: "tohu", lang: "he", root: "תהו", ch: "ch01",
      r: "Genesis 1:2",
      g: "Formless waste. It sits in the second verse of the Bible, over the dark water before anything had a shape — and again in the song, where God finds His people in a howling wilderness." },
    // attested form, Genesis 1:2 (MAM)
    { w: "מְרַחֶפֶת", t: "merachefet", lang: "he", root: "רחפ", ch: "ch01",
      r: "Genesis 1:2",
      g: "Hovering, brooding. The verb turns up three times in the whole Hebrew Bible: over the water, over a man whose bones are shaking, and over an eagle above her young." },
    // Klein Dictionary headword; attested identically in Genesis 18:22 (MAM)
    { w: "לִפְנֵי", t: "lifnei", lang: "he", root: "פנ", ch: "ch01",
      r: "Genesis 18:22",
      g: "Before — and built straight out of panim, so literally “to the face of.” Standing before the LORD is standing at His face." },
    // attested form, Genesis 22:14 (MAM); lemma ra’ah, BDB
    { w: "יִרְאֶה", t: "yireh", lang: "he", root: "ראה", ch: "ch01",
      r: "Genesis 22:14",
      g: "He will see. Abraham names the mountain YHWH-yireh, which your Bible translates “the LORD will provide” — and even the English keeps the secret: provide is Latin for to see ahead." },
    // BDB Augmented Strong headword; attested as yeshacharunani in Hosea 5:15
    { w: "שָׁחַר", t: "shachar", lang: "he", root: "שחר", ch: "ch02",
      r: "Hosea 5:15",
      g: "To seek at first light. Hebrew’s word for dawn is underneath it: this is dawn-seeking, the kind you do at a dark window when sleep will not come." },
    // BDB Augmented Strong headword; attested in Psalm 88:19 Heb. (MAM)
    { w: "מַחְשָׁךְ", t: "machshak", lang: "he", root: "חשך", ch: "ch02",
      r: "Psalm 88:18",
      g: "Darkness; the dark place. It is the last word of Psalm 88, and the psalm simply stops there." },
    // attested form, Deuteronomy 5:26 Heb. = 5:29 Eng. (MAM)
    { w: "מִי־יִתֵּן", t: "mi-yitten", lang: "he", ch: "ch03",
      r: "Deuteronomy 5:29",
      g: "Literally, “who will give?” Neither a request nor a command — the sound Hebrew makes when it longs for a thing it cannot make happen." },
    // BDB Augmented Strong headword; attested as akhapperah in Genesis 32:21 Heb.
    { w: "כָּפַר", t: "kaphar", lang: "he", root: "כפר", ch: "ch04",
      r: "Genesis 32:20",
      g: "To cover. Jacob says he will cover his brother’s face with a gift; by the time Israel has a tabernacle, the same verb is its word for atonement." },
    // BDB Augmented Strong headword; attested in Exodus 25:17 (MAM)
    { w: "כַּפֹּרֶת", t: "Kapporet", lang: "he", root: "כפר", ch: "ch04",
      r: "Exodus 25:17",
      g: "The covering — the one noun that comes off kaphar. It is the gold lid at the centre of everything, and English calls it the mercy seat." },
    // BDB Augmented Strong headword; attested as tzillam in Numbers 14:9
    { w: "צֵל", t: "tzel", lang: "he", root: "צל", ch: "ch05",
      r: "Numbers 14:9",
      g: "Shade — what a body has over it when the sun can kill. Their shade has turned aside from them, says Caleb. Ours has not." },
    // BDB Augmented Strong headword, confirmed by Klein and Jastrow; attested as u-temunah in Deuteronomy 4:12
    { w: "תְּמוּנָה", t: "temunah", lang: "he", ch: "ch05",
      r: "Deuteronomy 4:12",
      g: "Form, shape. You heard a voice and saw no form — the nation’s own protection clause, and the very thing Numbers 12 says Moses was given." },
    // BDB Augmented Strong headword; attested as kenafekha in Ruth 3:9
    { w: "כָּנָף", t: "kanaph", lang: "he", root: "כנף", ch: "ch05",
      r: "Ruth 3:9",
      g: "A wing. It also means the edge of a garment — the part of your coat you can throw over somebody." },
    // BDB Augmented Strong headword; attested as kevodekha in Exodus 33:18
    { w: "כָּבוֹד", t: "kavod", lang: "he", root: "כבד", ch: "ch05",
      r: "Exodus 33:18",
      g: "Glory — and at the root, weight, heaviness, sheer mass. The same root Moses reached for at the bush to call his own tongue heavy and disqualify himself." },
    // attested form, Exodus 3:14 (MAM)
    { w: "אֶהְיֶה", t: "ehyeh", lang: "he", root: "היה", ch: "ch05",
      r: "Exodus 3:14",
      g: "I AM — I will be. God had already spent the word one objection earlier: “Certainly I will be with you.”" },
    // BDB Augmented Strong headword; attested identically in Exodus 34:29
    { w: "קָרַן", t: "qaran", lang: "he", root: "קרן", ch: "ch06",
      r: "Exodus 34:29",
      g: "To shoot out rays; to horn out light the way the sun horns over a ridgeline. One translator read it a shade too literally, and that is why Michelangelo’s Moses has horns." },
    // BDB Augmented Strong headword; attested as panu in Jeremiah 2:27
    { w: "פָּנָה", t: "panah", lang: "he", root: "פנה", ch: "ch07",
      r: "Jeremiah 2:27",
      g: "To turn. Panim comes off this verb — a face, in Hebrew, is the turned-toward part of a person. They have turned to Me the back, and not the face." },
    // BibleHub Strong's 4977; attested as eschisthe in Mark 15:38
    { w: "σχίζω", t: "schizo", lang: "grc", ch: "ch08",
      r: "Mark 15:38",
      g: "To rip, to tear violently. Mark had been saving the verb, and he spends it on the curtain." },
    // attested form, Exodus 25:20 (MAM); lemma sakak, Jastrow
    { w: "סֹכְכִים", t: "sakak", lang: "he", root: "סככ", ch: "ch09",
      r: "Exodus 25:20",
      g: "Covering, screening, spreading something protective overhead. It is what the cherubim do over the lid — and what a palm does over a crack in a mountain while the glory goes past." },
    // BDB Augmented Strong headword; attested in Psalm 105:4 (MAM)
    { w: "תָּמִיד", t: "tamid", lang: "he", ch: "ch09",
      r: "Psalm 105:4",
      g: "Continually. Never an empty table — and when the psalms tell Israel to seek His face, they reach for the same word. One standing order, written twice." },
    // BibleHub Strong's 2435; attested in Hebrews 9:5
    { w: "ἱλαστήριον", t: "hilasterion", lang: "grc", ch: "ch09",
      r: "Hebrews 9:5",
      g: "What the Greek Bible calls that gold lid. One man saw it, one day a year, in the dark." },
    // BibleHub Strong's 1799; attested in Acts 2:25
    { w: "ἐνώπιον", t: "enopion", lang: "grc", ch: "ch09",
      r: "Acts 2:25",
      g: "In front of — built out of the Greek for eye. Before my face." },
    // BibleHub Strong's 3339; attested as metamorphoumetha in 2 Corinthians 3:18
    { w: "μεταμορφόω", t: "metamorphoo", lang: "grc", ch: "ch09",
      r: "2 Corinthians 3:18",
      g: "Transformed, changed from the inside out. Four sentences in the whole New Testament carry it. Two of them are a face shining on a mountain. This one is aimed at you." },
    // BibleHub Strong's 4318; attested in Ephesians 2:18
    { w: "προσαγωγή", t: "prosagoge", lang: "grc", ch: "ch10",
      r: "Ephesians 2:18",
      g: "Access — being brought in. The word for an usher walking you past every guard and into the royal presence." },
    // BibleHub Strong's 3954; attested in Hebrews 4:16
    { w: "παρρησία", t: "parrhesia", lang: "grc", ch: "ch10",
      r: "Hebrews 4:16",
      g: "The right to speak freely at the throne. Esther fasted three days before she tried that door." },
    // Klein Dictionary headword, confirmed by Jastrow; the verb is attested as vaya’akod in Genesis 22:9
    { w: "עֲקֵדָה", t: "Akedah", lang: "he", root: "עקד", ch: "ch10",
      r: "Genesis 22:9",
      g: "The Binding. Jewish tradition will not call Moriah the sacrifice of Isaac, because Isaac was not sacrificed — a father bound his son, and the son let himself be bound." },
    // Klein Dictionary headword; attested as ha-tefillin in Mishnah Berakhot 3:1 (Torat Emet)
    { w: "תְּפִלִּין", t: "tefillin", lang: "he", ch: "ch10",
      r: "Mishnah Berakhot 3:1",
      g: "The phylacteries. An observant man winds the leather three times around his middle finger in the morning, once for each I will betroth you, and says the words while he does it." },

    // ---- 2026-08-28, the second pass: ten to thirty-six to fifty. --------------
    // Every form below was fetched from Sefaria's Miqra according to the Masorah
    // (api/v3/texts, cantillation and meteg stripped, nikkud kept) on 2026-08-28 and
    // pasted in by a script. Where a row is a PHRASE it carries the verse's own
    // pointing, which is the rule the file already followed for ka-chalamish and
    // masveh: a phrase has no citation form to fall back on.
    // BDB Augmented Strong (Sefaria /api/words) supplied the two citation forms,
    // panim and ra'ah, and each was then confirmed against the verse named on it.

    // BDB Augmented Strong headword; confirmed against Genesis 32:31 (MAM)
    { w: "פָּנִים", t: "panim", lang: "he", root: "פנ", ch: "ch01",
      r: "Genesis 32:31",
      g: "Face. The word this whole book follows — and Hebrew has no singular for it. It is plural every time it is written, as though a face were never one thing at a time." },
    // BDB Augmented Strong headword; the verse has the inflected רָאִיתִי (MAM)
    { w: "רָאָה", t: "ra'ah", lang: "he", root: "ראה", ch: "ch01",
      r: "Genesis 16:13",
      g: "To see. It is under the name a runaway slave girl gave God, under the mountain Abraham named, and under the last five words of the Bible. The argument of the book is about who is doing it." },
    // attested phrase, Numbers 6:25 (MAM). The paseq between the words is dropped.
    { w: "יָאֵר יְהֹוָה פָּנָיו", t: "ya'er YHWH panav", lang: "he", ch: "ch01",
      r: "Numbers 6:25",
      g: "May the LORD make His face shine on you. The middle line of the blessing, and the line that was rolled up in silver and buried outside Jerusalem six centuries before Christ." },
    // attested phrase, Psalms 27:8 (MAM)
    { w: "בַּקְּשׁוּ פָנָי", t: "baqqeshu panai", lang: "he", ch: "ch02",
      r: "Psalm 27:8",
      g: "Seek My face. The strangest verse in the psalm: the poet hears the command and then says it back, so the order and the answer are the same two words." },
    // attested phrase, Jonah 1:3 (MAM) — it stands twice in that one verse
    { w: "מִלִּפְנֵי יְהֹוָה", t: "millifnei YHWH", lang: "he", ch: "ch02",
      r: "Jonah 1:3",
      g: "From before the face of the LORD. What Jonah bought a ticket away from — and the verse says it twice, once at each end, as if it wants you to notice what he is actually running from." },
    // attested phrase, Exodus 32:1 (MAM)
    { w: "לְפָנֵינוּ", t: "l'fanenu", lang: "he", ch: "ch03",
      r: "Exodus 32:1",
      g: "To go before us. What the camp asked the calf for while Moses was still up the mountain: not a god to worship so much as a face at the front of the column." },
    // attested phrase, Exodus 33:14 (MAM)
    { w: "פָּנַי יֵלֵכוּ", t: "panai yelechu", lang: "he", ch: "ch05",
      r: "Exodus 33:14",
      g: "My face will go. God's answer when Moses refuses to move without Him. Not an escort, not an angel, not a cloud — His own face, on the road, with them." },
    // attested phrase, Exodus 33:20 (MAM)
    { w: "לֹא תוּכַל לִרְאֹת אֶת־פָּנָי", t: "lo tukhal lir'ot et-panai", lang: "he", ch: "ch05",
      r: "Exodus 33:20",
      g: "You cannot see My face. Said in the same conversation that had just granted everything else, and said gently — a limit described, not a door shut." },
    // attested form, Exodus 32:11 (MAM). The idiom is chillah panim, to soften a
    // face; the verse carries the verb and the noun three words apart, so the row
    // shows the verb the chapter actually quotes.
    { w: "וַיְחַל", t: "va-yechal", lang: "he", ch: "ch05",
      r: "Exodus 32:11",
      g: "He softened the face of the LORD. The idiom is chillah panim, and it is physical: to stroke a face until it eases. English prints entreated and loses the hand." },
    // attested phrase, Numbers 6:26 (MAM). Paseq dropped, as at 6:25 above.
    { w: "יִשָּׂא יְהֹוָה פָּנָיו", t: "yissa YHWH panav", lang: "he", ch: "ch06",
      r: "Numbers 6:26",
      g: "May the LORD lift up His face toward you. In Israel that phrase had a rap sheet — lifting a face is what a judge did when he took the money — and the blessing takes it back." },
    // attested phrase, Deuteronomy 31:17 (MAM)
    { w: "וְהִסְתַּרְתִּי פָנַי", t: "ve-histarti panai", lang: "he", ch: "ch07",
      r: "Deuteronomy 31:17",
      g: "And I will hide My face from them. The sentence the doubled verb of the next verse comes out of, and the first time God says the thing this chapter is about." },
    // attested phrase, Deuteronomy 31:17 (MAM) — the same verse, the other mouth
    { w: "אֵין אֱלֹהַי בְּקִרְבִּי", t: "ein elohai be-qirbi", lang: "he", ch: "ch07",
      r: "Deuteronomy 31:17",
      g: "My God is not among me. What Israel will say in the same verse where God says He will hide — and they will be wrong about the grammar of it. A face turned is not a God gone." },
    // attested phrase, I Kings 19:12 (MAM)
    { w: "קוֹל דְּמָמָה דַקָּה", t: "qol demamah daqqah", lang: "he", ch: "ch08",
      r: "1 Kings 19:12",
      g: "A sound of thin silence. Three words that refuse to settle into English — a voice made of quiet, thin enough to be missed, after the wind and the earthquake and the fire had all been ruled out." },
    // AKKADIAN, and the only third-language row in the file. Added 2026-08-28 on the
    // author's tick. Source discipline is the same as the rest: CAD M/2 (The Assyrian
    // Dictionary of the Oriental Institute of the University of Chicago, vol. M part
    // 2, s.v. melammu, pp. 9-12), with A. L. Oppenheim, "Akkadian pul(u)h(t)u and
    // melammu," JAOS 63 (1943), 31-34, as the second source. Latin transliteration
    // only — there is no cuneiform on this site and a sign list is a different
    // discipline again.
    { w: "melammu", t: "melammu", lang: "akk", ch: "ch06",
      r: "Akkadian · CAD M/2",
      g: "The radiance a king or a god wore — an awe you could see, sitting on the surface of someone. Every empire around Israel had a word for borrowed shine. This is the one chapter VI borrows back." },
  ];

  var out = [];
  ORDER.forEach(function (id) {
    var num = +id.slice(2);
    var m = M[id];
    if (m) {
      out.push({ w: m.w, t: m.t, g: m.g, r: m.r, lang: m.lang, root: MARK_ROOTS[id] || '', ch: id, num: num, kind: 'mark' });
    }
    GLOSSARY.forEach(function (e) {
      if (e.ch !== id) return;
      out.push({ w: e.w, t: e.t, g: e.g, r: e.r, lang: e.lang, root: e.root || '', ch: id, num: num, kind: 'gloss' });
    });
  });
  window.PANIM_LEXICON = out;
})();
