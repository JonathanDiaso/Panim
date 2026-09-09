# ☑ THE SITE — WHAT IS STILL OPEN

**This file is the website and nothing else.** Not the manuscript, not the tape, not the
messages.

---

# 🚦 START HERE — EVERYTHING OPEN, ON ONE SCREEN

**Seven things. One needs a sentence from you; the rest need one word.** My pick is bold in the
**I suggest** column. **If you say nothing, I build the suggested option** — except #1, which I
cannot do without you.

| # | the question | I suggest | why | who |
|---|---|---|---|---|
| **1** | 🔴 The eight-minute card describes five minutes. What is the missing sentence? | **only you** | It is your sister's death. I will not guess at it. | **you** |
| **2** | 🟠 A note at chapter VII saying who Hannah is? | **Don't add it** | Chapter X already does it, as the book's last movement. A note at VII spoils the ending. | **you** |
| **3** | 🟡 Keep the blue rule down the left of the card? | **Keep it** | It is the only thing marking the card as a card since the box came off. You asked when it was red; the red is gone. | one word |
| **4** | 🔵 Make the ribbon caption "more iconic"? | **Yes — switch it to `--lit-display`** | The token already exists and the hero already uses it. The caption is set at *reading* optical size and enlarged; that is exactly the flatness you are seeing. | one word |
| **5** | 🔵 The gap under the ribbon you have flagged three times. | **Fill it, don't shrink it** | Every round measured the wrong edge — the real gap is 118px, not 0. Shrinking costs you the motion you already chose. | one word |
| **6** | 🟢 Build "the card knows you have heard it"? | **Yes, but after #1** | You already approved it. Building it before the sentence exists means building the card twice. | one word |
| **7** | 🔵 The read-along mark. Follow was **showing nothing on 94% of the book** — now fixed. Keep the fix, or go further? | **Keep it as shipped** | The unread text steps back; the read line is untouched. It is the opposite of a highlighter. Two richer options below if it is too quiet for you. | one word |

🛑 **TWO THINGS ARE NOT UP FOR DISCUSSION** — the second door's `href` stays on David
(`?t=ch07:17m55s`), and no commit ever carries a co-author trailer.

🗄 **Everything already answered is `../archive/decisions-answered-through-v67.md`** — v55
through v68, with your words on each. **Do not re-ask anything in there.**

---

# ✅ WHAT IS ALREADY DONE — you do not need to read this to decide anything

**v71, 2026-09-09 — the read-along mark was invisible on 94% of the book.** Fixed; the working
is in #7 below. The follow *engine* was fine all along.

**v70, 2026-09-09 — the voice path is gone, on your ruling.** *"delete othr voice path we
just ned the one voice path in our coding."* `js/player.js` and `js/room.js` carried a
complete second code path — a `state.edition`, a setter, a toggle, two buttons, an
edition-keyed preload cache and a change event — pointing at `audio/voice/chNN.m4a`.
🛑 **That folder has never existed on this site.** `audio/` holds `music/` and nothing else,
so every voice branch resolved to a 404 and was only ever reachable if the buttons came back.
All of it removed; **one path, one folder, one master.** The voice-only file itself is safe in
the audio repo.

**v70 also closed the door that let the last bug in.** `PanimPlayer.audio` — the raw `<audio>`
element, handed to any file that asked — is off the public API. It is what allowed the analyser
below to hijack playback. Nothing used it any more.

**v69, 2026-09-09 — two defects, each already described in a comment next to it:**

- 🔴 **Six Lexicon chips broke offline.** The precache carried the *italic* Greek subsets and
  not the *roman* ones, so σχίζω, ἱλαστήριον, ἐνώπιον, μεταμορφόω, προσαγωγή and παρρησία each
  rendered half in Literata and half in a system serif with no network.
- 🔴 **A Web Audio analyser ran an FFT every frame for a property nothing reads** — and
  rerouted the narration through an `AudioContext` to do it, which risks **silent playback**
  on iOS. Removed.

**v68, 2026-09-07 — seven of your eight answers shipped**, including the ribbon blue (it was
never a contrast problem — the old blue was nearly as dark as the ink it turned into),
arrow-key steering on the ribbon, and the arc stopping being kept in two files. Full working:
`../archive/decisions-answered-through-v67.md` and `FRONT-DOOR.md` §14.

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

---

# 2 · 🟠 HANNAH'S NOTE — ⭐ I SUGGEST: DON'T ADD IT

**You said:** *"all im actually saying is who hannah is not any new fun facts just that hannah
is the woman at the temple and she is my sister very clearly nothing fancy write it!"*

**Clear — and it made the job smaller.** So I went to write it, then read the manuscript and
stopped.

🛑 **THE BOOK ALREADY DOES THIS, AND IT DOES IT AS THE ENDING.** Chapter X, `ch10-p174`–`p177`:

> *…Its root means grace, and the picture inside it is stooping.*
> **It is my sister's name. Hannah.**
> *She spent twenty years bending down to people, and nobody ever told her it was her own
> name.* — and the line after: *Nobody ever told the woman at the tent either.*

**That is the exact sentence you asked me to write, and it is the last movement of the book.**
A note at chapter VII hands the reader chapter X's ending three chapters early.

⚠️ **And the apparatus cannot reach that paragraph anyway.** `.verse-note` is keyed by chapter
+ citation and renders under a *quotation*; `ch07-p139` is prose.

| | what | cost | the blocker |
|---|---|---|---|
| **A** ⭐ | **Nothing at chapter VII.** It is already in two places — the index entry you approved, and chapter X's ending. | none | **You asked for it at the passage.** If you want a reader hit at VII to get an answer *there*, A refuses you — say so and I build B. |
| **B** | **A note at John 11:35** — *"Jesus wept"*, two blocks after *"He answered it wet."* One entry in `content/verse-notes.js`, no new system. | ~1 round | Still spoils chapter X, and would be the only verse note about you rather than about the text. |
| **C** | **Build a prose-paragraph note.** A second apparatus keyed by block id — and block ids **move** whenever a paragraph is added or cut. | ~2 rounds | 🛑 The site argues against this in two files. I would argue against it too. |

---

# 3 · 🟡 THE RULE DOWN THE LEFT OF THE CARD — ⭐ I SUGGEST: KEEP IT

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
| **B** | **Take it off.** Four lines and a play mark on bare paper. | trivial | Nothing holds it together — the complaint that put the box there originally. |

---

# 4 · 🔵 THE RIBBON CAPTION — ⭐ I SUGGEST: SWITCH TO `--lit-display`

**You asked:** *"the text could probably be more iconic and 3d style or something."*

✅ **THE BUGS ARE FIXED AND MEASURED.** The accidental italic is gone (it is a `<span>` at
`font-style: normal`, weight 400 — read out of a computed-style dump, not off the CSS), and the
reserved height is exact at every width: **227/227, 195/195, 97/97, 176/176, 176/176.** The page
no longer jumps under your thumb on a snap. **What is left is not a fault. It is taste.**

## Why it reads flat: it is reading type, enlarged

Literata has an **optical-size axis**, 7 to 72. The site already defines three settings:
`--lit-normal` (12), `--lit-mid` (28) and **`--lit-display` (60)**.

🔴 **The caption is on `--lit-mid` — measured — and so is the plate title above it.** That is a
*text* cut: thicker hairlines, blunter serifs, wider spacing, all of which exist so small type
survives. At 34px it is **enlarged reading type rather than display type**, which is exactly
what you can see. 🛑 **`--lit-display` already exists and the hero already uses it.** This is
not a new font or a new token.

| | what | cost | the blocker |
|---|---|---|---|
| **A** ⭐ | **`--lit-mid` → `--lit-display`.** Finer hairlines, sharper serifs, more stroke contrast. No new font, no size change. | ~½ round | **The reserved-height ladder must be re-swept** — optical size changes glyph widths. Not optional: v66 shipped one line short at nine widths in ten from exactly this kind of change. |
| **B** | **A, plus tracking to −.02em.** Display type wants tighter fitting. | ~½ round | Same sweep; moves more steps than A. |
| **C** | **A, plus a letterpress shadow** — the literal "3D". | ~1 round | 🛑 **I argue against it.** It is the one option that can read cheap, it fights night mode, and it puts a drawn effect on the one line whose whole argument is that it is *type*. |
| **D** | **Leave it.** | none | Correct as it stands, just not distinctive. |

---

# 5 · 🔵 THE GAP UNDER THE RIBBON — ⭐ I SUGGEST: FILL IT, DON'T SHRINK IT

You have raised this **three times**, most recently *"theres more seperation from the chapter
description text and the pictures than i would probably want."* Every round measured it,
reported it fixed, and you raised it again.

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
| **A** ⭐ | **Fill the gap instead of shrinking it.** It reads dead because it is empty. Put the one thing that belongs there in it — a position marker (**III / X**), or the held chapter's runtime. **Costs no clearance and no motion.** | ~1 round | You may not want anything else on the strip. |
| **B** | **Widen the caption.** It is 763px of 1440 — **53% of the viewport, under a strip that bleeds the full width.** The right 47% is bare paper. *"Its seperated from the very ribbon itself"* may have been about this horizontal gap all along. | ~½ round | It was set to a reading measure deliberately; ladder re-sweeps again. |
| **C** | **Cut the sway amplitude.** Every 10px off is 10px off the gap. | ~½ round | 🛑 **Re-opens a call you already made.** I will not do this unless you say so. |

---

# 6 · 🟢 THE CARD SHOULD KNOW YOU HAVE HEARD IT — approved, queued

**Your word:** *"this is a good idea."* A reader who has already played those eight minutes
gets the identical card forever; the player already remembers completed chapters.

**Deliberately not built yet**, and the reason still holds: **write #1's sentence and both land
in one pass** instead of rebuilding the card twice.

---

# 7 · 🔵 THE READ-ALONG MARK — ⭐ I SUGGEST: KEEP WHAT SHIPPED

**You asked:** *"make sure follow is working and it automatic… highlight doesnt normally look
good we might need something different."*

✅ **THE ENGINE WAS NEVER BROKEN, AND IT IS AUTOMATIC.** Measured: all **118 cues in chapter I
resolve to a real element**, the right paragraph goes live as the clock passes each cue, Follow
is **on by default**, and it suspends when you scroll away and resumes on its own.

🔴 **BUT THE MARK ITSELF WAS INVISIBLE ON 94% OF THE BOOK, AND HAD BEEN SINCE THE REBUILD.**
`.block-p.is-live` set `color: var(--ink)` — and a paragraph's colour **is already `--ink`**, so
it changed nothing. **1,725 of the 1,841 cue blocks are paragraphs.** Only the 116 verse boxes
showed anything, because theirs moves a border. The rebuild deliberately deleted v1's glow
(*"a weight shift on the rule, no glow"*) — **that was right** — but only wrote half the
replacement: it lit the live line without ever darkening the others, so there was nothing for it
to stand out from.

⭐ **THE FIX AGREES WITH YOUR INSTINCT ABOUT HIGHLIGHTS.** Nothing is added on top of the type.
**The paragraph being read stays exactly the colour it always was; its neighbours step back half
a tone** while the voice is running. It is a reader's own thumb on the page, not a highlighter —
and it is the same argument that removed the v54 tabs and the card's box.

🛑 **It only happens when all three are true: playing, Follow on, and you have not scrolled
away.** A paused page never dims. ⚠️ **Contrast measured before shipping, because this dims body
copy:** the receded ink is **6.01:1 worst case on all twelve day stocks and 8.34:1 on all six
night stocks** — AA needs 4.5. The live line stays at 14.65:1.

| | what | cost | the blocker |
|---|---|---|---|
| **A** ⭐ | **Keep it as shipped.** Quiet, typographic, costs one property. | done | It may be too subtle for you on a phone in daylight. **Look at it before ruling.** |
| **B** | **Add a mark in the margin** beside the live paragraph — the margin column is empty and the apparatus already lives there. Nothing touches the text at all. Combines well with A. | ~1 round | One more object on the page. |
| **C** | **A growing rule in the margin** that fills as the paragraph is read — marker and progress in one. The most "state of the art" of the three and still drawn, not glowing. | ~1–2 rounds | Needs per-paragraph duration, which the cues give (next cue − this cue). Most work of the three. |

🛑 **AND ONE I RULED OUT RATHER THAN OFFER: word-by-word karaoke**, the Spotify-lyrics effect.
It is what "state of the art" usually means here, and **this site cannot do it honestly** — the
cues are paragraph-level (118 for a whole chapter), so word timing does not exist and would have
to be faked by interpolation, which drifts audibly within two sentences. 🛑 **A weight shift on
the live line is also out**: Literata's weight axis changes glyph widths, so the paragraph
re-wraps and the page jumps under your thumb.

---

# 👀 TWO THINGS ONLY YOUR EYES CAN CHECK

| | what | why a script cannot |
|---|---|---|
| ☐ 🔴 | **The hour with the screen off.** A real screen reader through the player and the Listening Room. | `/accessibility.html` says in public that this has never been done. **It is the only claim on the site that is not yet true.** |
| ☐ 🟠 | **One real thumb and one real mouse on the ribbon** — and **send yourself a passage from your phone.** | A synthetic cursor **teleports**, and a jump-move never fires `pointerenter`. The iMessage unfurl **is** the feature and only a real phone shows it. |

⚠️ **And one thing to glance at, because I changed a colour you did not watch me change:** the
new blue is on **chapters I–IV everywhere**, not only under the ribbon. The caption reads each
chapter's own accent, so there was no way to fix it under the ribbon without fixing it in the
arc. **It is one value in one table. If I–IV look wrong anywhere else, that is this change, and
it is one line to tune.**

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

🛑 **AND ONE THAT IS NOT A SUGGESTION:** the whole site is **218 KB gzipped** including the
complete text of the book, first paint 76 ms. **Do not split `chapters.js` per chapter.**
