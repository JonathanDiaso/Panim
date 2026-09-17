# Panim — every open decision

**One list for all of Panim.** Each item says what it is, why it matters, your options, and what I suggest (⭐).
Type after **Your pick:**. Answered sheets are archived in `../archive/` (latest:
`decisions-answered-2026-09-16-audio-night.md`, with your notes exactly as you left them).

---

## Open now (6)

### 1. Listen through the tape check ⭐ start here

**What:** one page with every spot worth hearing on the English tape: your list, repeats,
missing words, claps and background sounds. 219 spots, each with a clip. Where a fix can be
made from the tape, the clip also plays **after** the fix.
**Link:** https://claude.ai/artifact/TisFha4vTgKgvLbkZU58Fi
**How:** start with the **Your list** tab. Tap one answer per spot; it saves by itself.
**Why it matters:** nothing gets cut until you've heard the fix. Your current audio is untouched.
All work happens on copies (`Panim-audio/v2/`).

**Your pick:** (just tell me when you've done a tab or all of it)

### 2. Two lines that were never recorded

**What:** the ch 6 *chen* line ("The word in the middle is *vichunecha*…") and the ch 10 closer
("Nobody ever told the woman at the tent either…").
**What I found:** they aren't lost audio. They were written into the book on **Aug 30**, four
days after the tape was finished (Aug 26), and no Descript project changed after that. There's
no take anywhere.

- **A. Record them** (about 2 minutes at the mic), then Studio Sound in Descript, then I splice them in ⭐
- **B. Take them out of the book** so the page matches the tape (no audio work)
- **C. Leave both as they are** (the read-along shows two lines nobody says)

**Your pick:**

### 3. Five lines you recorded that were left out of the edit

**What:** takes exist in your pickup sessions for *"the Hebrew word for face"* (ch 7),
*"written by this man"* (ch 7), *"sit at my right hand"* (ch 10), *"of everything God could
require"* (ch 10), *"the word is ra'ah"* (ch 10). They're on the review page with timecodes.
**The catch:** the takes are raw (before Studio Sound), so they won't match. You said not to use
pre-Descript audio, so they need Studio Sound first.

- **A. You run Studio Sound (65%) on those takes in Descript and export them**; I give you exact timecodes ⭐
- **B. I ask Descript's built-in editor to make a new composition with just those takes and Studio Sound** (existing compositions untouched)
- **C. Leave them out and change the book to match the tape**

**Your pick:**

### 4. When the tape and the book say it differently, which one wins?

**What:** 57 places where you reworded a line at the mic (e.g. ch 5, the book says *"the
Hebrew is blunter"*, you said *"He does not say slow. He says heavy."*). They're in the
**Words** tab.
**My suggestion:** the tape wins by default and the book follows. Changing the book is free;
changing the tape means a new recording. Mark only the ones where the book should win.

**Your pick:**

### 5. The piano is 3 dB louder at the start and end of Spanish chapters

**What:** found while proving the music rebuild. English plays the piano alone at the open
and close 9 dB under your voice; Spanish plays it 6 dB under. Everywhere else they match.

- **A. Leave it**; nobody hears both back to back ⭐
- **B. Match Spanish to English** the next time Spanish is rebuilt

**Your pick:**

### 6. "Karmol" (ch 7, 20:06)

**What:** *"Whatever fell on Karmol"*: the second Carmel is mispronounced. Only a new take fixes it.

- **A. Leave it** ⭐ (you said it matters less)
- **B. Record it with #2** (one sentence, same sitting)

**Your pick:**

---

## Claude's queue (in this order)

1. **Audio v2:** apply your answers from #1 to copies → rebuild music → check every file
   (loudness, peak, a fresh transcript so no word was lost) → you listen to whole chapters →
   ship only if it's better. Record: `Panim-audio/v2/README.md`.
2. **T2. Index notes:** check all 94 against the book. *(You asked if it's done: no. The 35
   rewrites were drafts and never went on the site.)*
3. **T5. Picture row:** swipe-driven sway plus 2–3 cleaner counter/arrow versions to pick from.
4. **T6. About section:** 2–3 mockups (picture beside it, a drawn mark, a large pulled quote).
5. **T7. Sharper pictures:** upscale the ten plates to 2816px for big screens only.

---

## Later

- **Word-by-word lighting:** kept as an option, not required (your note). I'd still suggest a week with the reading line first.
- **More pictures inside chapters** (III and IV have none): you may make more pictures, not now.
- **Portuguese translation:** paused, 6 of 10 chapters drafted, no ElevenLabs credits.
- **Old audio cached on GitHub:** left alone. GitHub clears it on its own schedule.

---

## Checks only you can do (not decisions)

- [ ] **New backup drive:** the Mac sees only one external disk, the SL500 that holds MAS and
  Time Machine (checked by model, ID and contents). If you plugged in a second one, it isn't
  connecting. Try another cable or port.
- [ ] **Stats:** PostHog → Activity. Visits should be arriving.
- [ ] **Download on iPhone:** Listen → Download → wait for *Saved ✓* → airplane mode → play a chapter.
- [ ] **Spanish:** tap the globe → Spanish → listen to a chapter.
- [ ] **Screen reader:** use the player with VoiceOver for an hour; the accessibility page says this was never done.
- [ ] **Share a passage** to yourself in iMessage and check the preview.
- [ ] **Chapter links:** open `…/Panim/#ch07` fresh. Does it land on the chapter title?

## Not doing (so they stop coming back)

A 3D shadow on the caption · bigger chapter pictures · a privacy note for the stats · slowing the
scroll · a note at John 11:35 · notes attached to paragraphs · a play symbol on each picture ·
word highlighting with guessed timings · splitting the book text into files · muting a clap
(it leaves a hole in the room; claps get the room's own tone instead) · removing breaths.

## Never changing

The sample card starts at David (ch 7, 17:55) · no co-author line on any commit ·
`content/chapters.js` is generated, never hand-edited · the stats key is `phc_` only ·
the shipped audio is never edited in place: fixes happen on copies and ship only after you've listened.
