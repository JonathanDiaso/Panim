# Panim — every open decision

**One list for all of Panim.** Each item says what it is, why it matters, your options, and what I suggest (⭐).
Type after **Your pick:**. Answered sheets are archived in `../archive/` (latest:
`decisions-open-2026-09-16-before-tape-round-2.md`, nothing answered on it yet; its items are carried below, updated).

---

## Open now (6)

### 1. The tape check, round 2 ⭐ start here

**What:** the same page, rebuilt from your notes. Every card now shows **what you say on the tape
next to what the book prints**, highlights the words as the clip plays, answers your note, and
says what a fix costs (Tape fix / Book text / In Descript / Record / Nothing to do).
**Link:** https://claude.ai/artifact/TisFha4vTgKgvLbkZU58Fi (open **Start here** first)
**What changed:** the clap remover now removes the ring, not just the hit (you were right: none of
the old fixes worked). Three "claps" were broken words and have cuts. 73 word flags are 53 spots.
Your first-round answers and notes are kept on their cards.
**Cards that need a letter:** "silver back home" (A = cut the first, as the book ⭐), "opened eyes",
"since the nursery", "El mistater".

**Your pick:** (tell me when a tab is done)

### 2. Two lines that were never recorded

**What:** the ch 6 *chen* line ("The word in the middle is *vichunecha*…") and the ch 10 closer
("Nobody ever told the woman at the tent either…").
**Checked again 2026-09-17:** not on your raw sessions in Descript either (all 9½ hours searched),
not in the pickups. They were written Aug 30, after the tape was done.

- **A. Record them** (about 2 minutes at the mic), Studio Sound in Descript, then I splice them in ⭐
- **B. Take them out of the book** so the page matches the tape (no audio work)
- **C. Leave both** (the read-along shows two lines nobody says)

**Your pick:**

### 3. Four missing lines that ARE recorded (no mic needed)

**What:** the edit dropped these (two more that looked missing in round 1, the ch 2 psalm turn and *millifnei*, are on the tape after all), but the takes are on your raw sessions (Descript project
**"Raw DO NOT EDIT (panim)"**) or pickups. Timecodes are on each card (Words → Needs you).

| line | why it matters | where |
|---|---|---|
| ch 10 "Sit at My right hand." | "That seat is His" points at it | raw 8:24:37, 24 pickups |
| ch 7 "…was written by this man." | says David wrote Psalm 23 | raw 5:19:51 |
| ch 2 "He wastes nothing. Not even the running." | the Jonah section's landing line | raw 0:58:51 |
| ch 10 "The word is *ra'ah*." | ties Eli's blindness to the seeing word (low priority) | pickups 1:27:57 |

**The catch:** raw takes need Studio Sound (you said no pre-Descript audio).

- **A. You apply Studio Sound (65%) to those four stretches in Descript and export them**; I splice ⭐ (~15 min for you)
- **B. I ask Descript's built-in editor to make a NEW, separate project with just those four stretches and Studio Sound**; nothing existing is touched (may use Descript AI credits)
- **C. Leave them out; the book follows the tape**

**Your pick:**

### 4. When the tape and the book say it differently

**What:** 32 places you reworded a line at the mic (e.g. ch 5 *"the Hebrew is blunter"* became
*"He does not say slow. He says heavy."*). The tape is complete in all of them.
**Suggestion ⭐:** the book follows the tape. It's text only, then the site's read-along matches
the audio. The Words tab → **Book follows tape** has a one-tap button for the lot; mark only the
ones where the book should win.
**Note:** changing the book changes the site text (through its build tools), so I do it as one
pass after you've answered, not line by line.

**Your pick:**

### 5. The piano is 3 dB louder at the start and end of Spanish chapters

- **A. Leave it**; nobody hears both back to back ⭐
- **B. Match Spanish to English** the next time Spanish is rebuilt

**Your pick:**

### 6. "Karmol" (ch 7, 20:06)

*"Whatever fell on Karmol"*: only a new take fixes it.

- **A. Leave it** ⭐ (you said it matters less)
- **B. Record it with #2** (one sentence, same sitting)

**Your pick:**

---

## Claude's queue (in this order)

1. **Audio v2:** your answers → edits on copies (`Panim-audio/v2/scripts/apply.py`) → music rebuild →
   check every file → you compare whole chapters → ship only if better. Record: `Panim-audio/v2/README.md`.
2. **Book follows tape** (after #4): one pass on the manuscript, then the site text tools, then a version bump.
3. **T2. Index notes:** check all 94 against the book (the 35 rewrites were never applied).
4. **T5. Picture row:** swipe-driven sway plus 2–3 cleaner counter/arrow versions.
5. **T6. About section:** 2–3 mockups.
6. **T7. Sharper pictures:** upscale the ten plates to 2816px for big screens only.

---

## Later

- **Word-by-word lighting:** kept as an option, not required.
- **More pictures inside chapters** (III and IV have none): not now.
- **Portuguese translation:** paused, 6 of 10 chapters drafted, no ElevenLabs credits.
- **Old audio cached on GitHub:** GitHub clears it on its own schedule.

## Checks only you can do (not decisions)

- [ ] **New backup drive:** the Mac sees only the SL500 (MAS + Time Machine). Try another cable or port for the second one.
- [ ] **Stats:** PostHog → Activity. Visits should be arriving.
- [ ] **Download on iPhone:** Listen → Download → *Saved ✓* → airplane mode → play a chapter.
- [ ] **Spanish:** globe → Spanish → listen to a chapter.
- [ ] **Screen reader:** the player with VoiceOver; never done.
- [ ] **Share a passage** to yourself in iMessage and check the preview.
- [ ] **Chapter links:** open `…/Panim/#ch07` fresh. Does it land on the chapter title?

## Not doing (so they stop coming back)

A 3D shadow on the caption · bigger chapter pictures · a privacy note for the stats · slowing the
scroll · a note at John 11:35 · notes attached to paragraphs · a play symbol on each picture ·
word highlighting with guessed timings · splitting the book text into files · muting a clap
(it leaves a hole in the room; claps get the room's own tone instead) · removing breaths ·
cutting a verse's deliberate echo ("Seek My face", "the mountain east of the city", "whose name means bound").

## Never changing

The sample card starts at David (ch 7, 17:55) · no co-author line on any commit ·
`content/chapters.js` is generated, never hand-edited · the stats key is `phc_` only ·
the shipped audio is never edited in place: fixes happen on copies and ship only after you've listened.
