// PANIM_THREAD — the plants and their payoffs.
//
// Moved out of js/ui.js 2026-08-28 and rewritten. It used to be thirteen bare labels
// in a sheet behind a button in the running head — "The cleft", "The wish" — which
// asked a reader to already remember what those were. As a top-bar control it also
// asked a first-time visitor to care about the book's structure before they had read
// any of it. It now renders as a closing section AFTER chapter X (js/render.js), where
// the same thirteen entries stop being a utility panel and become the argument: here
// is what you just walked through.
//
// 🛑 EVERY LINE BELOW IS DRAWN FROM THE MANUSCRIPT, not written around it. Each note
// was checked against ~/Panim/panim-book/chapters/*.md before it was written, and the
// references are the ones the book itself cites. If you edit one, check it the same
// way — a thread that claims a payoff the book does not make is worse than no thread.
//
//   label  what to call it
//   from   the chapter that plants it
//   to     the chapter that pays it off
//   note   what was planted, and what it becomes
//   refs   where to look, in the book's own citations
window.PANIM_THREAD = [
  {
    label: '“Lift up my face”',
    from: 'ch04', to: 'ch06',
    note: 'Rehearsing his approach to a brother who has every reason to kill him, Jacob says it four times in one anxious breath — his face, my face, his face, my face — and the last of them is <em>perhaps he will lift up my face</em>. Two books later the priests are ordered to say the same phrase over the whole nation, every day, out loud. What Jacob hoped a brother might do, God has commanded to be spoken over every head.',
    refs: 'Genesis 32:20 · Numbers 6:26'
  },
  {
    label: 'Satar — the hiding',
    from: 'ch02', to: 'ch07',
    note: 'Cain names his own damage with a verb: <em>satar</em>, hiddenness on purpose, a face deliberately turned away. The first murderer in history describes what he has lost and never once mentions the exile. Five books later the same verb comes back doubled, out of God’s own mouth — <em>haster astir</em>, I will surely hide — which is how Hebrew says a thing when it means it.',
    refs: 'Genesis 4:14 · Deuteronomy 31:18'
  },
  {
    label: 'Elijah’s appointment',
    from: 'ch07', to: 'ch08',
    note: 'Elijah stands at the mouth of a cave on Horeb with his cloak over his face, hears the thin silence, and walks back down having never seen the glory. Scripture leaves the encounter open on purpose. Centuries later he is standing on a different mountain, in the light, with it — and this time his face is not covered.',
    refs: '1 Kings 19:13 · Matthew 17:3'
  },
  {
    label: 'Because he cannot bear to watch',
    from: 'ch07', to: 'ch08',
    note: 'Chizkuni, a medieval rabbi, pressed one step further than anyone else had dared and wrote down why a father would turn his face away while his child is being punished: because he cannot bear to watch. Chapter VIII is where that sentence gets tested, at the one hour it costs the most — and the only man in the story who does not look away is on the payroll.',
    refs: 'Chizkuni on Deuteronomy 31:18 · Matthew 27:54'
  },
  {
    label: 'The wish',
    from: 'ch05', to: 'ch09',
    note: 'Told that two men are prophesying in the camp without clearance, Moses refuses to shut them down and flings a wish into the sky instead: <em>would that all the LORD’s people were prophets.</em> It is thrown by the one man who had the access everyone else lacked. For roughly fifteen centuries God neither grants it nor refuses it. In chapter IX, in one room, on one morning, He reaches up and takes it down off the hook.',
    refs: 'Numbers 11:29 · Acts 2:17'
  },
  {
    label: 'The fading',
    from: 'ch06', to: 'ch09',
    note: 'The veil over Moses’ face is usually explained as protection for the people. Paul says what it was actually hiding: the shine was <em>fading away</em>, and the cloth was there so Israel would not watch it end. Then he turns the picture around — now we all, with unveiled face. Not one man on one mountain.',
    refs: '2 Corinthians 3:13 · 2 Corinthians 3:18'
  },
  {
    label: 'Charcoal',
    from: 'ch08', to: 'ch09',
    note: '<em>Anthrakia</em> — specifically a charcoal fire, not a wood one — burns in exactly two places in the whole New Testament. One is the high priest’s courtyard, where Peter warms his hands and denies Him three times. The other is a beach at dawn, a fire the risen Lord had already built with His own hands before the boat ever landed. Smell is the one sense time cannot silence.',
    refs: 'John 18:18 · John 21:9'
  },
  {
    label: 'Metamorphoo',
    from: 'ch08', to: 'ch09',
    note: 'The Gospel writers needed a word to file that morning under and chose a Greek one meaning changed from the inside out. It is spent on four sentences in the entire New Testament. Two of them are His face shining like the sun on the summit. The third is aimed straight at the reader — and it runs uphill: from glory to glory, increasing. Moses’ shine ran the other way.',
    refs: 'Matthew 17:2 · 2 Corinthians 3:18'
  },
  {
    label: 'The cleft',
    from: 'ch05', to: 'ch10',
    note: 'A man asks to see the glory and is answered by being tucked into a split in a rock with a hand laid over the gap until it has gone past. From that morning the rule is one sentence long: no man can see Me and live. In chapter X a friend at a supper table asks the identical question, in a Galilean accent, with no idea whose words he is carrying — and this time the answer is not a cleft in a rock. It has been sitting at the table all evening.',
    refs: 'Exodus 33:22 · John 14:8'
  },
  {
    label: 'The court of the face',
    from: 'ch03', to: 'ch10',
    note: 'Seventy elders climb the mountain, see the God of Israel, and eat and drink in front of Him without being struck down. Nothing on their résumés earned it, because there was nothing on their résumés at all — the presence came before the performance. That court title is never abolished anywhere in Scripture, and where it finally lands is nearly the last sentence in the Bible.',
    refs: 'Exodus 24:11 · Revelation 22:4'
  },
  {
    label: 'The name on foreheads',
    from: 'ch06', to: 'ch10',
    note: 'In the wilderness the name of God rested on exactly one forehead in all the world: a plate of pure gold on the high priest’s turban, <em>Holy to the LORD</em>, one man wearing it on behalf of everyone. In Ezekiel’s Jerusalem it widens to a mark on the foreheads of everyone who grieved over the ruin. John writes the last engraving in the Bible, and by then it is on every face.',
    refs: 'Exodus 28:36 · Ezekiel 9:4 · Revelation 22:4'
  },
  {
    label: 'Matthew 5:8, at last',
    from: 'ch01', to: 'ch10',
    note: 'A sentence off a hillside is handed over in the first chapter and then deliberately left alone: <em>blessed are the pure in heart, for they shall see God.</em> It burns quietly for ten chapters — through the tomb, the trees, the mountains, the fires and the torn curtain — and is never explained until the book has earned the right to collect it.',
    refs: 'Matthew 5:8'
  },
  {
    label: 'Two crowds',
    from: 'ch09', to: 'ch10',
    note: 'There are two crowds at the end of the Bible. One is hiding in the rocks, begging the mountains to fall on them so they will not have to be looked at. The other has been running toward the look since a dinner table in Emmaus. And it is the same face.',
    refs: 'Revelation 6:16 · Revelation 22:4'
  }
];
