# ☑ THE SITE — WHAT IS STILL OPEN

**This file is the website and nothing else.** Not the manuscript, not the tape, not the
messages. **2026-09-07:** *"im working on the site right now… consolidate these make these
simple website like the actual link that were working on no longer the script etc and
writting the book."*

|                |                                                                                    |
| -------------- | ---------------------------------------------------------------------------------- |
| **the site**   | **this file** — the only thing that carries site work                              |
| the tape       | ⏸ `Panim-audio/paused/TAPE-EDITS.md` — **paused, not a worklist, do not raise it** |
| the manuscript | nothing active. A word change costs a re-cut; see the paused bucket.               |
| what to *say*  | 📋 `../../panim-book/handoffs/link-messages.md` — a **menu**, not a worklist        |

🗄 **Everything already answered is** `../archive/decisions-answered-through-v67.md` — v55
through v67, with your words on each. **Do not re-ask anything in there.**

🛑 **Two things are not up for discussion:** the second door's `href` stays on David
(`?t=ch07:17m55s`) — `FRONT-DOOR.md` §0.1 — and no commit ever carries a co-author trailer.

---

# ✅ SIX THINGS CLOSED IN v67 — 2026-09-07

**Your notes on the last sheet closed six items in one pass.** Full record: `FRONT-DOOR.md`
§12. Archived with your words: `../archive/decisions-answered-through-v67.md`.

|   | what you said | what happened |
| - | ------------- | ------------- |
| ✅ | *"thats like italics its hard to read?????"* · *"the text we have now is not super splendid"* | 🛑 **It was a bug.** `js/ui.js` built every word of the ribbon caption with `createElement('i')`, whose browser default is italic, and **no stylesheet anywhere said so.** It was never a font choice. **Fixed, plus the weight went 350 → 400 — Literata's roman, the weight the book is set in.** |
| ✅ | *"the beggining of chapter descriptions also have weird font"* | The standfirsts at each chapter opening and in the contents **were** italic, deliberately. **Roman at weight 450 now** — heavier than the prose, softer ink than the prose, which is how print does it. |
| ✅ | *"more seperation … than i would rpobably want though i really want the motion and maybe even more motion lol"* | **Both.** Motion **×1.25**, gap **−28px**. Two earlier rounds said this trade could not be won; they were right about a symmetric clearance and wrong about the rail. |
| ✅ | *"it looks like chlkdrens coding … research a new jhigher quality play button"* | **Redrawn — five faults, and it is now one drawing in three places at four sizes.** The two typed strings `−15` and `+30` in the bar went with it. |
| ✅ | *"such a gross looking box"* | **The box is gone.** One accent rule down the left and nothing else — and it is **red**, because the card goes to chapter VII and chapter VII is the fire. |
| ✅ | *"remove the it thats ugly"* | **`Read or listen. The choice is yours.`** |

---

# ⬜ THREE DECISIONS

**Only you can make these. Each one is a sentence of yours away from closed.**

## 1 · 🔴 THE EIGHT-MINUTE DOOR — and I think you already solved it

**Your note, in full:**

> *"Giving them just the hannah story with n o foundation doesnt make sense, but it doesnt
> seem crazy to hint at the crying wet part and start 5 minutes above even if we just say
> onnly habve 8 minutes. whats the main heart of that 8 minutes anyways i dont ahve to say
> she answered it wet and i dont ahve to start with absalom if i want them to click it needs
> to be good though this should be a true hook"*

⭐ **MEASURED AGAINST `cues/ch07.json`, THE DOOR IS ALREADY IN THE RIGHT PLACE.** *"start 5
minutes above"* from Hannah's first line lands at **17:49.** The door already starts at
**17:55.** So:

| | |
|---|---|
| **17:55** | *"David forgave his son and went on hiding his face for two years…"* — where it starts now |
| **+4m51 · 22:46** | *"The appointment is still on the books."* — where the card currently stops counting |
| **+4m54 · 22:49** | *"My sister Hannah moved to heaven when she was twenty."* |
| **+6m47 · 24:42** | *"Jesus, do You love me?"* |
| **+7m34 · 25:29** | *"I saw Jesus over the same page I was over, weeping…"* |
| **+8m01 · 25:56** | *"I did not see His face. I saw His tears."* |
| **+8m19 · 26:14** | 🎯 **"He answered it wet."** |

🛑 **SO NOTHING HAS TO MOVE AND NOTHING HAS TO BE BUILT.** The same `href`, relabelled
**eight minutes**, reaches the wet answer with nineteen seconds to spare. **The only thing
wrong with the card was that it stopped describing itself at five.**

⭐ **AND THE MAIN HEART OF THOSE EIGHT MINUTES, since you asked:** *a father's face withheld,
every substitute for it refused — the kiss with no words, the wind, the earthquake, the fire —
until the only face left is the one that comes looking, and it arrives wet.* **That is the
same shape three times in eight minutes, which is why it works without foundation.**

**Three ways to play it. My pick is A.**

| | what | cost | the blocker |
|---|---|---|---|
| **A** ⭐ | **One door, eight minutes, same `href`.** Relabel the eyebrow, and the bait becomes the tears rather than the hidden face. | **Copy only. No engineering, no new deep link, the locked `href` untouched.** | **The two sentences of bait are yours.** I will not put your sister's passage on the front page in words I picked. |
| **B** | **Two doors.** Keep the five-minute card, add a second at `?t=ch07:22m49s` lower down. | One card, one `href`, ~1 round. | **Two doors compete.** You already ruled *"card only"* once, for this reason. |
| **C** | **Move it to 22:49** and call it four and a half minutes — Hannah's passage alone, which `link-messages.md` says *"does not survive cutting"* and works standalone. | Copy + one `href`. | **Breaks the 🛑 lock on the `href`** and loses the foundation you said you wanted. |

⚠️ **AND `link-messages.md` HAS BEEN SAYING THIS SINCE 2026-09-04:** *"C is the best thing in
the book and it is not on the site's front page, not in the card, and not in any of the
forty-five messages. That is the single biggest miss in this file."* **A closes that.**

## 2 · 🟠 HANNAH'S SIDE NOTE IN THE PROSE

**Your note:** *"Yes i want it and i think should i write a side note like i have for the
verses att he locatio n of the hard hit that dont get it and need help???? Maybe even make it
more prominant than the otehrs."*

✅ **THE INDEX ENTRY IS CLOSED ON YOUR WORD** — *"the author's sister — and, the book finds,
the name of the woman at Shiloh"* stays in `content/names.js`.

⬜ **WHAT IS OPEN IS THE NEW THING YOU JUST ASKED FOR:** a note in the margin *at the passage
itself*, for a reader who is hit by it and does not know what to do with that. **The
apparatus already exists** — `.verse-note` is 113 notes in the right-hand margin at ≥1100px,
`role="note"`, in the book's own face. **Making one of them louder is one class.**

🛑 **BUT IT IS THE ONE NOTE ON THE SITE THAT CANNOT BE WRITTEN BY ANYBODY BUT YOU,** and it
is not apparatus — every other note explains a Hebrew word. **This one would be you speaking
to a stranger over your sister's death.** Two questions, and both are yours:

1. **Where.** At `ch07-p139` (her death), or at `ch07-p170` (*"He answered it wet"*)? **My
   read: p170.** p139 is the fact; p170 is where a reader who needs help is actually sitting.
2. **What it says.** ⚠️ **If it carries a phone number, a church, or a link, that is a
   decision with a duty attached and it should not be made in a design round.**

**Cost:** one rule and one string. **Blocker: the words.**

## 3 · 🟡 THE DAWN ARC'S FIRST FOUR CHAPTERS

**Your note:** *"i like the red color on the text that looks good the first ones dont look as
goood."*

✅ **HALF OF THIS SHIPPED** — the five-minute card is red now, because it goes to chapter VII
and chapter VII is the fire. It had been painted in chapter I's night blue for no reason
except that `#plates` carries no `[data-ch]`.

⬜ **THE OTHER HALF IS A REAL QUESTION AND IT IS THE BOOK'S, NOT THE SITE'S.** The arc is
**night blue I–IV → fire V–VIII → morning gold IX–X**, and it is the book's own structure: the
face hides, then burns, then comes home. **Chapters I–IV are cold because that is what those
chapters are.**

| | what | cost | the blocker |
|---|---|---|---|
| **A** ⭐ | **Leave it.** The blue is the hiding. It is supposed to feel colder than the fire. | none | **You have now said twice that you like the red better.** If that is a verdict and not an observation, A is wrong. |
| **B** | **Warm the blue** — same hue family, more saturation and a step brighter, so I–IV read as *deep* rather than *drab* without becoming the fire. | ~half a round. **Twelve contrast pairs to re-measure** in two themes. | It is a judgement call on a photograph-heavy page; it has to be looked at, not measured. |
| **C** | **Fire everywhere.** | trivial | 🛑 **It deletes the arc**, and the arc is why the ribbon caption's light works at all. I would argue against this one. |

---

# ⬜ TWO THINGS ONLY YOUR EYES CAN CHECK

**Down from five.** Three came off the list this round because they turned out to be
answerable from the code, and the answers are below them.

|   | what | why a script cannot |
| - | ---- | ------------------- |
| ☐ 🔴 | **The hour with the screen off.** A real screen reader through the player and the Listening Room. | `/accessibility.html` says in public that this has never been done. **It is the only claim on the site that is not yet true.** |
| ☐ 🟠 | **One real thumb and one real mouse on the ribbon** — and **send yourself a passage from your phone.** | A synthetic cursor **teleports**, and a jump-move never fires `pointerenter`. The iMessage unfurl **is** the feature and only a real phone shows it. |

## ✅ *"make sure it ends up leading to the chapter"*

**It does.** Every plate is `<a href="#chNN">` — `js/render.js:1401` — so the ribbon leads to
the chapter with or without JavaScript. **What still needs your thumb is the *feel* of the
snap, not the destination.**

## ✅ *"i think this is active make sure it is and that its highly effecient and works great"*

**Both share paths are live and both have a fallback.** `navigator.share` where the device has
it, `navigator.clipboard.writeText` where it does not, with the button reporting *"Link
copied"* for two seconds — whole book (`#share-btn`) and single chapter
(`[data-share-chapter]`). ⚠️ **Check the card from a device you have not used before:**
iMessage caches previews per thread and per device, so the old one can persist for you while
everyone else sees the new.

## ✅ *"I am concerned when yhou did this that you put bad audio in there cause it sounds worse now"*

🛑 **NO AUDIO FILE HAS BEEN TOUCHED.** Checked both repositories: **not one `.wav`, `.mp3`,
`.m4a` or `.aac` appears in any commit** in `Panim-audio` or in this repo's recent history.
The site carries no chapter audio at all — `audio/` here holds the music bed and nothing else.
**Nothing was re-encoded, replaced, re-cut or normalised.**

⚠️ **WHAT DID CHANGE IS TIMING METADATA, NOT SOUND.** The music bed still runs **6s before the
voice and 12s after it**, on all ten chapters, exactly as it was cut. If a chapter boundary
sounds worse than it did, it is the **length of the gap between two files**, not the files.
**That is one number and it is adjustable — say "shorter" and it moves.**

## ✅ Night mode — *"We shouldnt start the reader in night mode but night can be aut activated pr at night"*

⭐ **THIS ALREADY WORKS THE WAY YOU DESCRIBED, and it is better than a clock.** `js/ui.js`
`wireTheme()` follows the device's own `prefers-color-scheme` **until the reader has an
opinion**, and stops the moment they touch the toggle. **A phone in dark mode at night gets
night mode; a phone in light mode at 2am does not** — because that reader has told their
whole phone they want light, and the book is not the place to argue.

🛑 **A CLOCK WOULD BE WORSE, AND THAT IS THE ONE OPEN BIT.** Going dark at 8pm local guesses
at something the operating system already knows, and it gets it wrong for anyone reading in
bed with the lights on. **The only real question left: should a device in dark mode still open
this book in DAY?** **My answer is no** — that overrides a setting the reader made on purpose.
**Say the word if you want it anyway.**

---

# 💡 SUGGESTIONS FOR THE SITE — mine, not yours

**Nothing here is a decision you owe me.** Ranked by what I think it is worth, each with what
it costs and what would stop it.

## 1 ⭐⭐ The best passage in the book is not on the front page

**See decision 1 above.** This is the same item and it is first on both lists because
`link-messages.md` has called it *"the single biggest miss"* for three days. **Cost: your two
sentences. Blocker: they are yours.**

## 2 ⭐ The dawn arc lives in two files by hand

`css/site.css` has the twelve-row palette table; `js/motion.js` has its own copy so it can
interpolate between chapters. **The duplication has already cost one live bug.** One of them
should read the other. **Cost: ~half a round. Blocker: none — this is purely mine to do, and
it is the highest-value invisible fix on the site.**

## 3 ⭐ The ribbon has no keyboard story

Ten plates in a horizontal scroller. A mouse drags it, a thumb flicks it, and **Tab walks
through all ten one at a time** — which works, and is not steering. Left/Right arrows on the
rail would be four lines. **Cost: tiny. Blocker: it must not swallow the arrow keys from the
page, and the player already binds some.**

## 4 The five-minute card does not know you have heard it

A reader who has already played those eight minutes gets the identical card forever. The
player remembers position, chapter and completed chapters (`js/player.js`) — **the card could
say *"you have heard this"* and offer chapter I instead.** **Cost: ~1 round. Blocker: it adds
a state to the one element on the page that has been rebuilt four times; I would not touch it
again until decision 1 is settled.**

## 5 The plates are the only pictures with no play affordance

Every plate is a link to a chapter. **None of them offers to *play* it**, and the site's whole
argument is that the book is both. Now that there is one good play mark, a small one on the
lit plate would cost nothing new. **Cost: ~half a round. Blocker: it puts a mark back ON a
photograph, which you have ruled against twice (*"so ugly … tabs"*). It would have to be on
the caption row, not the picture.**

## 6 🗄 The four that are known and parked

- **No LQIP and no genuine 2×.** Sources are 1408px; plates want 2400px+. **Blocked on
  sources, not a decision.**
- **The 35 rewritten index notes** are drafted and unapplied — `archive/`, round 18 §3 — and
  **59 of the index's notes have never been audited against the prose at all.**
- **The ninety-second door** and **the two inline pictures** for chapters III and IV. The
  prompt for III is written in `art/PROMPTS.md`; **placement is yours.**
- **Chapter titles disagree** across site / manuscript / audio. The WAV filenames are the only
  surface still out of step, and they are cosmetic.

🛑 **AND ONE THAT IS NOT A SUGGESTION:** the whole site is **218 KB gzipped** including the
complete text of the book, first paint 76ms. **Do not split `chapters.js` per chapter.**
