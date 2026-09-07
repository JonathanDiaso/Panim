# ☑ THE SITE — WHAT IS STILL OPEN

**This file is the website and nothing else.** Not the manuscript, not the tape, not the
messages. **2026-09-07:** *"im working on the site right now… consolidate these make these
simple website like the actual link that were working on no longer the script etc and
writting the book."*

| | |
| --- | --- |
| **the site** | **this file** — the only thing that carries site work |
| the tape | ⏸ `Panim-audio/paused/TAPE-EDITS.md` — **paused, not a worklist, do not raise it** |
| the manuscript | nothing active. A word change costs a re-cut; see the paused bucket. |

🗄 **Everything already answered is `../archive/decisions-answered-through-v65.md`** — v55
through v65, with your words on each. **Do not re-ask anything in there.**

🛑 **Two things are not up for discussion:** the second door's `href` stays on David
(`?t=ch07:17m55s`) — `FRONT-DOOR.md` §0.1 — and no commit ever carries a co-author trailer.

---

# ⬜ SIX DECISIONS

**Only you can make these. Each one is a sentence of yours away from closed.**

| | what | my pick |
| --- | --- | --- |
| ☐ 🔴 | **Hannah's line in the index.** It described the woman at Shiloh and pointed at three paragraphs about **your sister**. I rewrote it to *"the author's sister — and, the book finds, the name of the woman at Shiloh."* | **your call — it is your sister's entry.** Two alternatives in §1 |
| ☐ 🔴 | **`og:description`.** I changed the share card's line without asking, back in round 20. The old line is saved. | say the word and it goes back |
| ☐ 🟠 | **The text message you send people.** Four drafts, A/B/C/D. | **C** — and **D** for anyone who would flinch at a Bible link |
| ☐ 🟠 | **Two doors, or one?** Hannah's moment is 3 seconds past where the five-minute door ends, so it just misses. | give her **her own door**, somewhere else on the page |
| ☐ 🟡 | **The hero photograph.** *"idk does it look good?"* — still unanswered, and it is the first thing anybody sees. | it is good. Say so and it closes |
| ☐ 🟡 | **The ribbon caption's new light.** The words now arrive in the chapter's own accent and cool to ink; the lit numeral keeps that accent. **This is the closest thing on the site to the coloured arc you deleted** — it is type, not tabs, and nothing persists but one numeral. | keep it. **One line reverts it** — `docs/FRONT-DOOR.md` §11.1 |

# ⬜ FIVE THINGS ONLY YOUR EYES CAN CHECK

**Not decisions. Verification a machine cannot do.** Everything a machine *can* check is
green — zero axe violations, 111 controls named, contrast measured at four widths.

| | what | why a script cannot |
| --- | --- | --- |
| ☐ 🔴 | **The hour with the screen off.** A real screen reader through the player and the Listening Room. | `/accessibility.html` says in public that this has never been done. It is the only claim on the site that is not yet true. |
| ☐ 🟠 | **One real thumb and one real mouse on the ribbon.** | A synthetic cursor **teleports**, and a jump-move never fires `pointerenter`. That cost an hour once. |
| ☐ 🟠 | **Send yourself a passage from your phone.** Look at how it unfurls in iMessage. | The unfurl **is** the feature and only a real phone shows it. |
| ☐ 🟡 | **Night mode on your own phone, at night.** | Contrast is measured. Comfort is not the same thing. |
| ☐ 🟡 | **One listen across a chapter boundary**, continuous play on. 12 seconds of music between chapters. | Right, or still long? |

---

# 1 · Hannah's line — the two alternatives

**She is in the index, and she has been all along.** The entry points at chapter VII (*"My
sister Hannah moved to heaven when she was twenty"*), IX (her celebration of life) and X —
the one-word paragraph `Hannah.` that the last chapter turns on.

🛑 **The note beside those three links used to read *"who prayed at Shiloh, and her face was
no longer sad."*** That is 1 Samuel's Hannah, **and she is never named in the prose at
all** — she is *"the woman at the tent"*, every time. The index was pointing at three
paragraphs about your sister and telling the reader they were about somebody else.

**It now reads:** *"the author's sister — and, the book finds, the name of the woman at
Shiloh."* **One string in `content/names.js`.** The two obvious alternatives:

- *"my sister — and the name of the woman at Shiloh"* — first person, the way chapter X speaks
- *"Hannah — twice"* — the flattest possible, and it makes the reader do the work

---

# 2 · ⚠️ Known and not worth a round

**Listed so nobody spends one on them.**

- **No LQIP and no genuine 2×.** Sources are 1408px; plates want 2400px+. **Blocked on
  sources, not a decision.**
- **The dawn arc is a hand-kept table in two files** — `css/site.css` and `js/motion.js`.
  The duplication has cost one live bug. **Worth fixing the day either one changes.**
- **Chapter titles disagree** across site / manuscript / audio. The WAV filenames are the
  only surface still out of step, and they are cosmetic.
- **The 35 rewritten index notes** are drafted and unapplied — `archive/`, round 18 §3.
- **The ninety-second door** and **the two inline pictures** for chapters III and IV. The
  prompt for III is written in `art/PROMPTS.md`; **placement is yours.**
- **The whole site is 218 KB gzipped** including the complete text of the book. First paint
  76 ms. **Do not split `chapters.js` per chapter.**
