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
through v68, with your words on each, **including the eight answers you typed into the last
sheet.** **Do not re-ask anything in there.**

🛑 **Two things are not up for discussion:** the second door's `href` stays on David
(`?t=ch07:17m55s`) — `FRONT-DOOR.md` §0.1 — and no commit ever carries a co-author trailer.

---

# ✅ WHAT YOUR ANSWERS CLOSED — v68, 2026-09-07

**You typed eight answers into the last sheet. Seven are shipped.**

|   | what you said | what happened |
| - | ------------- | ------------- |
| ✅ | *"the blue isnt visible and only talking about under the ribbon nothing else"* | 🛑 **IT WAS NOT A CONTRAST PROBLEM, WHICH IS WHY IT SURVIVED TWO ROUNDS.** The old blue measured **7.07:1** on the caption's stock — *higher* than the red you say looks good. The fault is at the other end: the caption arrives in the chapter's accent and **settles on ink**, and the blue's luminance was 0.075 against ink's 0.008, while red sits at 0.113 and gold at 0.119. **The blue was nearly as dark as the ink it turns into, so the arrival had nowhere to travel.** Raising contrast would have made it worse. Same hue, one step brighter and more saturated: **#32506B → #32638F.** Re-measured on all five of its stocks — worst **5.11:1**, still clearing AA for normal text, not just the 3.0 a 34px line needs. **Night was measured before deciding and is untouched: the fault was day-only, exactly the half you described.** |
| ✅ | *"red not for the chapter preview lol"* | **The red is off the card.** It inherits the jacket's blue now instead of reaching two arcs forward for chapter VII's fire — and that retired a hand-kept triplicate at the same time. |
| ✅ | *"fix"* — the arc living in two files | **Done, and it was worse than the sheet said.** `js/motion.js` carried **two** twelve-row tables, day and night, each a literal copy of `css/site.css` under a comment saying *"must stay identical"*. Both gone; it reads the stylesheet. **A/B-measured across fourteen scroll positions before and after: identical except the one colour you asked to change.** |
| ✅ | *"so youre saying arrows… make it look exceptional nothing sloppy"* | **Arrow keys, Home and End steer the ribbon**, one plate per press, focus following the eye. 🛑 **And it fixed something worse than it added:** `js/player.js` binds ←/→ globally, so pressing Left on a focused plate had been **jumping the narration back fifteen seconds** and doing nothing to the strip. Measured over six presses: the page does not move vertically and the audio stays at 0:00. |
| ✅ | *"has weirds font and it could do its job better"* | **Back to the sans.** I checked the tag and the computed style first — this one was a real font, not another stray `<i>`. **The round that set it in the serif argued from the wrong element:** its reasoning was *"every word on this card is out of the book"*, and **that line is not on the card** — the note directly above it says so. It is an instruction about how the interface behaves, and this site's own rule is *"the serif is the book and the sans is the machine."* |
| ✅ | *"i dont think we need a symbol. you cna already click on that."* | **No play mark on the plates — closed on your call**, and it was the right one: a mark there would promise playback the plate cannot start. |
| ✅ | *"yes"* — decision 1, option A | **The card says eight minutes.** Same locked `href`, no new deep link, no engineering. One half of it is still open, below. |

---

# ⬜ THREE DECISIONS

**Only you can make these. Each one is a sentence of yours away from closed.**

## 1 · 🔴 THE CARD SAYS EIGHT MINUTES AND DESCRIBES FIVE OF THEM

✅ **THE NUMBER IS FIXED AND IT IS NOW TRUE.** The eyebrow and the screen-reader label say
**eight minutes**, and the door reaches *"He answered it wet"* at **+8m19** with nineteen
seconds to spare.

⬜ **WHAT IS STILL OPEN IS THE THIRD LINE.** It reads:

> *Two years of a father's hidden face, and a mountain where the fire turns out to be the
> wrong answer.*

**Both of those close at +4m51.** Everything from **+4m54** on — your sister, *"Jesus, do You
love me?"*, the tears on the page — **is undescribed.** The card now promises eight minutes
and tells a stranger about five.

🛑 **I DID NOT WRITE THE MISSING HALF AND I AM NOT GOING TO GUESS AT IT.** What happens in
minutes five to eight is your sister's death, and the sentence that puts that on the front
page of a stranger's phone is the one line on this site nobody else gets to write. **Your
words: *"if i want them to click it needs to be good though this should be a true hook."***

**One sentence. Ten to twenty words. It goes after "wrong answer."** My only counsel: **it
should not name the death.** The passage's power is that the answer arrives *wet*; a line
that says "and then his sister died" spends that before the reader presses anything.

## 2 · 🟠 HANNAH'S NOTE — I went to write it, then found something

**You said:** *"all im actually saying is who hann ah is not any new fun facts just that
hannah is the woman at the teple and she is my siter very clearly nothing fancy write it!"*

⭐ **CLEAR, AND IT MADE THE JOB SMALLER — that is an identification, not a help note, and it
carries no duty with it.** So I went to write it. Then I read the manuscript, and stopped.

🛑 **THE BOOK ALREADY DOES THIS, AND IT DOES IT AS THE ENDING.** Chapter X, `ch10-p174`
through `ch10-p177`:

> *…Its root means grace, and the picture inside it is stooping: bending down to somebody who
> cannot come up to you.*
> **It is my sister's name.**
> **Hannah.**
> *She spent twenty years bending down to people, and nobody ever told her it was her own
> name.* — and the line after: *Nobody ever told the woman at the tent either.*

**That is the exact sentence you asked me to write, and it is the last movement of the book.**
A margin note at chapter VII saying *"Hannah is the author's sister, and the name of the woman
at Shiloh"* **hands the reader chapter X's ending three chapters early.**

⚠️ **AND THE APPARATUS CANNOT REACH THAT PARAGRAPH ANYWAY.** `.verse-note` is keyed by
**chapter + citation** and renders under a *quotation*; `ch07-p139` is prose. A note there
means a second apparatus system, which `js/render.js` argues against in its own words:
*"There is one apparatus system here and this joins it rather than opening a second one."*
**And `chapters.js` is generated — it cannot be hand-edited to carry one.**

**So this is a real fork and it is yours. My pick is A.**

| | what | cost | the blocker |
|---|---|---|---|
| **A** ⭐ | **Nothing at chapter VII. It is already in two places** — the index entry you approved (*"the author's sister — and, the book finds, the name of the woman at Shiloh"*) and chapter X's ending itself. | none | **You asked for it at the passage.** If what you want is that a reader hit at chapter VII gets an answer *there*, A refuses you — say so and I will build B. |
| **B** | **A note at John 11:35** — *"Jesus wept"*, two blocks after *"He answered it wet."* The existing apparatus reaches it with **one entry in `content/verse-notes.js`, no new system.** | ~1 round | **It still spoils chapter X,** and it would be the only verse note on the site that is about you rather than about the text. |
| **C** | **Build the prose-paragraph note.** A second apparatus keyed by block id — and block ids **move** every time a paragraph is added or cut. | ~2 rounds | 🛑 **The site says not to do this, in two files.** I would argue against it. |

## 3 · 🟡 THE RULE DOWN THE LEFT OF THE CARD

**You asked:** *"some you maybe dont even need like left of the text whe n its red is that
necesssary"*

✅ **HALF OF THIS IS ALREADY ANSWERED — it is not red any more.** The question was about the
rule *when it was red*, and the red is gone.

⬜ **I DID NOT DELETE THE RULE ON YOUR BEHALF, BECAUSE YOU APPROVED IT LAST ROUND.** When the
box came off, what replaced it was *"one accent rule down the left and nothing else"* — and
you called that a fix. **A question is not a verdict, and this is the object you have now had
rebuilt four times in three days.**

| | what | cost | the blocker |
|---|---|---|---|
| **A** ⭐ | **Keep it, now that it is blue.** It is the only thing still marking the card as a card since the box went. | none | **You asked the question.** If the rule is what looks tacky to you, say so and it goes. |
| **B** | **Take it off.** The card becomes four lines and a play mark on bare paper. | trivial | **Nothing would be holding it together** — which is the complaint that put the box there in the first place. |

---

# ⬜ ONE THING APPROVED AND QUEUED

| | what | your word |
|---|---|---|
| 🟢 | **The card should know you have heard it.** A reader who has already played those eight minutes gets the identical card forever; the player already remembers completed chapters. | *"this is a good idea."* |

**Deliberately not built yet.** Its blocker was *"I would not touch it again until decision 1
is settled"*, and decision 1 is half-settled: the number is fixed, the sentence is not. **Write
the sentence and both land in one pass instead of rebuilding the card twice.**

---

# ⬜ TWO THINGS ONLY YOUR EYES CAN CHECK

|   | what | why a script cannot |
| - | ---- | ------------------- |
| ☐ 🔴 | **The hour with the screen off.** A real screen reader through the player and the Listening Room. | `/accessibility.html` says in public that this has never been done. **It is the only claim on the site that is not yet true.** |
| ☐ 🟠 | **One real thumb and one real mouse on the ribbon** — and **send yourself a passage from your phone.** | A synthetic cursor **teleports**, and a jump-move never fires `pointerenter`. The iMessage unfurl **is** the feature and only a real phone shows it. |

⚠️ **AND ONE NEW THING TO LOOK AT, because I changed a colour you did not watch me change:**
**the new blue is on chapters I–IV everywhere, not only under the ribbon.** You said *"only
talking about under the ribbon nothing else"* — but the caption reads the chapter's own
accent, so there was no way to fix it under the ribbon without fixing it in the arc. **It is
one value in one table now. If I–IV look wrong anywhere else, that is this change, and it is
one line to tune.**

---

# 💡 SUGGESTIONS FOR THE SITE — mine, not yours

**Nothing here is a decision you owe me.**

## 1 ⭐ The retired voice edition is still wired into two files

`#edition-btn` and `#room-edition` are not in the DOM, and ~30 lines across `js/player.js`
and `js/room.js` still branch on them. **They are inert only because both elements are null.**
🛑 **I left this deliberately** — `js/player.js` records it as your call (*"the voice sounds
better when it's actually connected to the music"*) **with a written restore path**, and
deleting it deletes the way back. **Cost: ~half a round. Blocker: it is dormancy, not dead
code, and making that permanent is your decision.**

## 2 The card's `.hs-holds` is a second copy of the manuscript

The quote and the holds line are transcribed from `ch07-p107`/`p108`. **If the chapter text is
ever re-edited they will not follow** — the file says so about itself. **Cost: ~1 round.
Blocker: none, but it is only worth doing once decision 1's sentence exists.**

## 3 🗄 The four that are known and parked

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
