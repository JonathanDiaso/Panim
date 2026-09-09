# ☑ THE SITE — WHAT IS STILL OPEN

**This file is the website and nothing else.** Not the manuscript, not the tape, not the
messages. **It is the only sheet with open work on it.** If a thing is not here, it is either
shipped (`../archive/`) or parked (bottom of this file).

---

# 🚦 START HERE — EVERYTHING OPEN, ON ONE SCREEN

**Four things. One needs a sentence from you; two need one word; one is already moving.**
**If you say nothing, I build the ⭐ option.**

| # | the question | I suggest | why | who |
|---|---|---|---|---|
| **1** | 🔴 The eight-minute card describes five minutes. What is the missing sentence? | **only you** | It is your sister's death. I will not guess at it. | **you** |
| **2** | 🟡 Keep the blue rule down the left of the card? | **Keep it** | It is the only thing marking the card as a card since the box came off. You asked when it was red; the red is gone. | one word |
| **3** | 🔵 The gap under the ribbon. You asked: *"fill it? Like maybe have the chapter titles move too???"* | **Fill it with the position — and ⚠️ the titles already move** | The sway is on the whole plate, titles included, and has been since v55. What is dead in that band is that it is **empty**, not that it is still. | one word |
| **4** | 🔵 The read-along mark. You asked for *"something super high tech 2027 awesome."* | **Two rounds: ship the margin rule now, and I go get real word timings** | 🔴 **I was wrong last round.** I said honest word-level timing was impossible here. It is not — it just needs a tool the project does not have yet. | one word |

🛑 **THREE THINGS ARE NOT UP FOR DISCUSSION** — the second door's `href` stays on David
(`?t=ch07:17m55s`), no commit ever carries a co-author trailer, and `content/chapters.js` is
generated and is never hand-edited.

🗄 **Everything already answered is [`../archive/decisions-answered-through-v73.md`](../archive/decisions-answered-through-v73.md)** —
v55 through v73, with your words on each. **Do not re-ask anything in there.**

---

# ✅ CLOSED THIS ROUND — you do not need to read this to decide anything

**v73, 2026-09-09.** Three items came off this sheet:

- 🕯 **Hannah is named at the tent.** *"i never mention that the woman coming to Eli is
  Hannah."* You were right and my earlier answer was about a different passage — it argued
  against a note at chapter **VII**, and you were pointing at chapter **X**. There the fact
  is the setup, not the spoiler. **The prose is untouched:** the manuscript gained one
  citation line, `*1 Samuel 1:18*`, under the verse the book already quoted and had never
  cited. A `ref` block carries no cue id, so the tape and the read-along are unaffected.
  ⚠️ **Eli was not in the index at all.** He is now.
- 🅰 **The ribbon caption and the plate titles are display type.** They were drawn at
  Literata's *reading* optical size and set at 34px and 27px — enlarged text type, which is
  exactly the flatness you could see. Both on `--lit-display` now. **The ladder was re-swept
  at one-pixel resolution and every step moved**; verified exact at 17 widths.
- ⭐ **The card knows you have heard it.** *"is this in yet we should have that built."*
  Built. **It did not have to wait for #1** — the eyebrow is a separate line from the one
  you are writing, so #1's sentence still lands without rebuilding the card.

Full working: [`../archive/round-records-v69-to-v73.md`](../archive/round-records-v69-to-v73.md) §17.

---

# 1 · 🔴 THE CARD SAYS EIGHT MINUTES AND DESCRIBES FIVE OF THEM

✅ **The number is fixed and it is now true.** The eyebrow and the screen-reader label say
**eight minutes**, and the door reaches *"He answered it wet"* at **+8m19**.

⬜ **What is open is the third line.** It reads:

> *Two years of a father's hidden face, and a mountain where the fire turns out to be the
> wrong answer.*

**Both of those close at +4m51.** Everything from **+4m54** on — your sister, *"Jesus, do You
love me?"*, the tears on the page — **is undescribed.**

🛑 **I did not write the missing half and I am not going to guess at it.** What happens in
minutes five to eight is your sister's death, and the sentence that puts that on a stranger's
phone is the one line on this site nobody else gets to write. Your words: *"if i want them to
click it needs to be good though this should be a true hook."*

**One sentence. Ten to twenty words. It goes after "wrong answer."** My only counsel: **it
should not name the death.** The passage's power is that the answer arrives *wet*; a line that
says "and then his sister died" spends that before the reader presses anything.

⭐ **AND IT IS NO LONGER BLOCKING ANYTHING.** It was holding up #6 last round; #6 shipped
without it. **This is now the only thing on the site waiting on you alone.**

---

# 2 · 🟡 THE RULE DOWN THE LEFT OF THE CARD — ⭐ I SUGGEST: KEEP IT

**You asked:** *"some you maybe dont even need like left of the text when its red is that
necessary"*

✅ **Half of this is already answered — it is not red any more.**

⬜ **I did not delete it on your behalf, because you approved it last round.** When the box came
off, what replaced it was *"one accent rule down the left and nothing else"* — and you called
that a fix. **A question is not a verdict**, and this is the object you have had rebuilt four
times in three days.

| | what | cost | the blocker |
|---|---|---|---|
| **A** ⭐ | **Keep it, now that it is blue.** The only thing still marking the card as a card. | none | If the rule itself is what looks tacky to you, say so and it goes. |
| **B** | **Take it off.** Four lines and a play mark on bare paper. | trivial | 🛑 **It is the card's only edge**, so it is also the whole of WCAG SC 1.4.11's boundary. Taking it off is an accessibility change, not only a visual one. |

---

# 3 · 🔵 THE GAP UNDER THE RIBBON — ⭐ FILL IT, AND YOUR SECOND IDEA IS ALREADY TRUE

You have raised this **three times**, most recently *"theres more seperation from the chapter
description text and the pictures than i would probably want"*, and this round you asked:
*"fill it? Like maybe have the chapter titles move too??? on the sections that have space in
no tabs or boxes???"*

## ⚠️ Taking the second half first: the titles already move

**The sway is on `.pl-plate`, and `.pl-plate` contains the numeral and the title** — checked
in `js/render.js`, not assumed. It has been that way since v55: the whole plate breathes,
caption row included, on one cosine across the ten so it reads as a field of plates rather
than as the strip sliding. **You are already getting what you just asked for.**

⚠️ **One caveat and it is the only one:** the sway runs off a scroll-driven animation
(`animation-timeline: view()`), so a browser without that support gets a still ribbon — not a
ribbon whose pictures move and whose titles do not. **There is no half state to fix.**

🛑 **WHICH MEANS THE BAND IS NOT DEAD BECAUSE IT IS STILL. IT IS DEAD BECAUSE IT IS EMPTY.**

## And why every round "fixed" it and you raised it again

🛑 **BECAUSE EVERY ROUND MEASURED THE WRONG EDGE.** Measured 2026-09-09:

| what was measured | reads |
|---|---|
| rail's **box** bottom → caption top | **0px** ← what the rounds reported, and it is true |
| **last plate title** bottom → caption top | **114px at 402, 118px at 1440** ← what your eye sees |

**The 88px of clearance is *inside* the rail's box.** So the number was driven to zero on paper
while the visible gap never moved. That padding is real sway clearance and **cannot simply be
cut** — two attempts were measured and reversed, and you already chose motion over room
(*"more motion some room is fine"*).

| | what | cost | the blocker |
|---|---|---|---|
| **A** ⭐ | **Put the position in it — `III / X`, small, centred, in the held chapter's accent.** A horizontally-scrolling strip of ten is the one place a position marker is information rather than decoration, and it is **no tab and no box**: it is type on paper, like everything else that survived v54. **Costs no clearance and no motion.** | ~1 round | You may not want anything else on the strip at all. |
| **B** | **Widen the caption.** It is 763px of 1440 — **53% of the viewport, under a strip that bleeds the full width.** The right 47% is bare paper. *"Its seperated from the very ribbon itself"* may have been about this horizontal gap all along. | ~½ round | It was set to a reading measure deliberately; **the ladder re-sweeps again**, and that is now a 1px sweep at 17 verification widths. |
| **C** | **A + B.** | ~1½ rounds | Two changes to the same object in one round is how the caption ended up italic for two days. |
| **D** | **Cut the sway amplitude.** Every 10px off is 10px off the gap. | ~½ round | 🛑 **Re-opens a call you already made.** I will not do this unless you say so. |

---

# 4 · 🔵 THE READ-ALONG MARK — 🔴 I WAS WRONG, AND HERE IS THE 2027 ANSWER

**You asked:** *"is there anything better to highlight text thats being read than what we have,
something super high tech 2027 awesome — can you research that and find out."*

✅ **WHAT SHIPPED IN v71 IS WORKING AND IS NOT THE PROBLEM.** All 118 cues in chapter I resolve
to a real element, Follow is on by default, it suspends when you scroll away and resumes on its
own. The paragraph being read stays the colour it always was; **its neighbours step back half a
tone.** Contrast measured before shipping: 6.01:1 worst case day, 8.34:1 night. AA needs 4.5.

## 🛑 THE CORRECTION: I told you word-by-word was impossible here. It is not.

Last round I ruled out the Spotify-lyrics effect because **the cues are paragraph-level** — 118
for a whole chapter — so word timing "does not exist and would have to be faked by
interpolation, which drifts audibly within two sentences." **The second half of that is still
true. The first half was wrong.**

⭐ **THE THING I DID NOT KNOW ABOUT IS CALLED FORCED ALIGNMENT.** It is not transcription and it
does not guess. You give it the audio **and the exact words that were spoken**, and it returns
the start and end time of **every single word**. It is the standard tool for exactly this job,
and **this project already has both inputs**: `panim-book/chapters/*.md` is the script the
narrator actually read, and `audio/music/*.m4a` is the reading.

| | |
| --- | --- |
| **the tool** | **Montreal Forced Aligner.** WhisperX is the better-known one and it is easier to run, but a 2024 comparison against a Kaldi acoustic model found **MFA beat both WhisperX and Meta's MMS on alignment accuracy** — and alignment accuracy is the entire product here. |
| **what it produces** | one JSON per chapter, same shape as `cues/`, one row per word instead of one per block |
| **where it runs** | offline, once, as a build step beside `gen-cues.py`. **Nothing ships to the browser but the numbers.** |
| **what it is not** | it is not AI narration, not a re-cut, and it does not touch the tape. The audio file is read, never written. |

⚠️ **AND IT IS ALSO THE PUBLISHING INDUSTRY'S OWN ANSWER.** EPUB Media Overlays — the spec
Apple Books and every read-along ebook uses — synchronises audio to text **at the word level**,
by exactly this method. Word-level is the mature form of this feature, not a gimmick.

## What you could then draw, and what you still could not

🛑 **ONE CONSTRAINT SURVIVES INTACT AND IT RULES OUT MOST OF THE OBVIOUS IDEAS.** Literata's
weight axis **changes glyph widths**, so bolding the live word re-wraps the paragraph and the
page jumps under your thumb. **Same for size, and same for letter-spacing.** Anything that
moves with the voice must not change the text's metrics. That leaves colour, opacity and a
drawn mark — and it is why a highlighter keeps being the thing everyone reaches for.

| | what | cost | the blocker |
|---|---|---|---|
| **A** ⭐ | **Ship the margin rule now.** A hairline in the empty margin column beside the live paragraph, filling as the paragraph is read — marker and progress in one, and it needs **no** word timings: the cues already give a paragraph's duration (next cue − this cue). **Nothing touches the type at all.** | ~1 round | It is per-paragraph, so it is smooth but not precise. |
| **B** ⭐⭐ | **Then the reading edge.** With real word timings, ink saturation wipes along the line at the voice's exact position — read text at full `--ink`, unread at the receded tone, and a soft boundary travelling between them. **It is the opposite of a highlighter: nothing is added on top of the type, the type itself is being lit.** This is the thing that reads as 2027. | ~2–3 rounds, and **one of them is the aligner, not the site** | 🛑 **The page↔tape coverage is 98.8%, not 100%.** About 1% of words will not align, and those paragraphs must fall back to A cleanly rather than stall. That fallback is most of the work. |
| **C** | **Keep v71 exactly as it is.** | done | It may be too quiet for you on a phone in daylight. **Look at it before ruling.** |

⚠️ **ONE MEASURED WARNING ABOUT B, BECAUSE THIS SITE HAS ALREADY REJECTED THE TECHNIQUE ONCE.**
A gradient wipe over `background-clip: text` was rejected for the ribbon caption, and correctly:
it repaints a background-position on **twenty** spans **every frame**. The read-along case is
not that — **one** paragraph is live at a time, and its wipe is a single CSS transition between
two known cue times. It is one element, not twenty, and the browser drives it, not JavaScript.
**Different cost, same technique, and the difference is worth stating so the old note does not
get read as a ban.**

🛑 **AND ONE I STILL RULE OUT: word-by-word "pop", the karaoke bounce.** Every implementation
of it scales or weights the live word, which is the one thing that re-wraps the line. **It is
what most people mean by "high tech" here, and it is the one shape this book cannot have.**

---

# 🟠 MEDIOCRE IDEAS — real, buildable, and I am not recommending them

**You asked for this bucket by name.** Nothing here is wrong; nothing here is worth a round
yet. **It exists so these stop being re-proposed as if they were new.**

| the idea | why it is only mediocre |
|---|---|
| **A letterpress shadow on the ribbon caption** — the literal "3D" you asked about | It is the one option that can read cheap, it fights night mode, and it puts a **drawn effect** on the one line whose whole argument is that it is *type*. The optical-size fix is the version of this that works. |
| **A verse note at John 11:35** (*"Jesus wept"*), two blocks after *"He answered it wet"* | Now that chapter X carries the Hannah note, this would be the **only** verse note on the site about the author rather than about the text. One entry, no new system — but it changes what the apparatus is for. |
| **A prose-paragraph note system**, keyed by block id | 🛑 **Block ids move** whenever a paragraph is added or cut. The site argues against this in two files and so do I. v73 found the honest way round it: a citation line, which does not move. |
| **A play mark on each plate in the ribbon** | ⛔ **You already closed this** — *"i dont think we need a symbol."* Listed only so it stops coming back. |
| **Word-by-word karaoke with interpolated timings** | Drifts audibly within two sentences. **Real timings make this good; faked ones make it worse than nothing.** See #4. |
| **Splitting `content/chapters.js` per chapter** | 🛑 **Not a suggestion — a refusal.** The whole site is **218 KB gzipped** including the complete text of the book, first paint 76 ms. There is nothing to fix. |

---

# 👀 TWO THINGS ONLY YOUR EYES CAN CHECK

| | what | why a script cannot |
|---|---|---|
| ☐ 🔴 | **The hour with the screen off.** A real screen reader through the player and the Listening Room. | `/accessibility.html` says in public that this has never been done. **It is the only claim on the site that is not yet true.** |
| ☐ 🟠 | **One real thumb and one real mouse on the ribbon** — and **send yourself a passage from your phone.** | A synthetic cursor **teleports**, and a jump-move never fires `pointerenter`. The iMessage unfurl **is** the feature and only a real phone shows it. |

---

# 🗄 PARKED — not decisions, just things that are true

- **`.hs-holds` on the card is a second copy of the manuscript.** Transcribed from
  `ch07-p107`/`p108`; if the chapter text is re-edited they will not follow. **~1 round, no
  blocker — but only worth doing once #1's sentence exists.**
- **No LQIP and no genuine 2×.** Sources are 1408px; plates want 2400px+. **Blocked on sources.**
- **The 35 rewritten index notes** are drafted and unapplied, and **59 of the index's notes have
  never been audited against the prose at all.**
- **The ninety-second door**, and **two inline pictures** for chapters III and IV. The prompt for
  III is in `art/PROMPTS.md`; **placement is yours.**
- **Chapter titles disagree** across site / manuscript / audio. Only the WAV filenames are still
  out of step, and that is cosmetic.
- 🆕 **Six chapters' `standfirst` field was missing from the generated `chapters.js`** until the
  v73 rebuild wrote it. Nothing changed on the page — but it means the committed file had not
  been regenerated in a while. **Re-run the three tools after any manuscript edit, in order.**
