# Panim — every open decision

**One list for all of Panim.** Each item says what it is, why it matters, your options, and what I suggest (⭐).
Type after **Your pick:**. Answered sheets are archived in `../archive/` (latest:
`decisions-open-2026-09-16-before-tape-round-2.md`, nothing answered on it yet; its items are carried below, updated).

---

## Open now (4: items 0, 1, 3, 5)

### 0. Book follows tape — 28 spots, one answer ⭐ start here

**What:** the 28 places where you said it differently at the mic and the book still has the older
wording. The full list, with the book's sentence and yours side by side, is
`panim-book/handoffs/BOOK-FOLLOWS-TAPE.md`.
**Why it is one question:** you answered **tape** on all seven of these you reached on the page,
and #4 below has recommended the same since it was written.
**Your pick:** say **"all tape"** and I make the pass, run the site's three text tools and bump the
version; or give me the numbers where the BOOK should win. Text only — no audio changes.

### 1. The tape check, round 2 — 99 answered, 101 left

**Done:** 37 edits are made on copies (English ch 3, 6, 7, 8, 9, 10 and Spanish ch 10). Every spot
where you wrote "you found it but it's still there" was re-measured and really was still there;
what was wrong with each is in `Panim-audio/v2/README.md`.
**Left:** 101 cards — 45 breaths (nothing to do, you keep breaths), 14 claps, and 42 word cards, of
which 28 are item 0 above and 14 are transcript mishearings with nothing to decide.
**Still needs a letter from you:** ch 9 9:46.8 (`clap-ch09-5868`) — "did we cut empty at the end or
its ok lol". It is three separate sounds in one pause; say fix or leave.
**Link:** https://claude.ai/artifact/TisFha4vTgKgvLbkZU58Fi

**Your pick:** (tell me when a tab is done)

### 2. Two lines that were never recorded — ANSWERED 2026-09-17

**Your answer:** keep both lines in the book, do not record now, and try a free voice clone.
**Done:** the text stays. The clone is local only (F5-TTS on this Mac, nothing uploaded); ElevenLabs
cannot do it on your pay-as-you-go tier and Higgsfield is at zero credits. First drafts are in
`Panim-audio/v2/work/clone/`. Judge them by ear — the measurements say the synthetic room is far
noisier than yours, so a splice would open the room for one sentence.
**If you record them later:** send me the file and I splice it; `scripts/splicecheck.py` checks the
room, hum, brightness, loudness, peak and the words before anything goes in.
**Open, small:** the read-along will show two lines nobody says. Say the word if you want them
marked on the page as print-only.

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

### 4. When the tape and the book say it differently — now item 0

Superseded. The 32 spots are 28 still-open ones (item 0, with the full list in
`panim-book/handoffs/BOOK-FOLLOWS-TAPE.md`) plus the five already made on 2026-09-17 because you
answered **tape** on their cards: ch 1 "He danced *lifnei YHWH*", ch 1 "Everybody knows the phrase",
ch 2 "And one Hebrew word does both jobs", ch 2 "trusted in the unfailing love", ch 9 "about the
net". Site is at v83; cues did not move and coverage held at 98.8%.

### 5. The piano is 3 dB louder at the start and end of Spanish chapters

- **A. Leave it**; nobody hears both back to back ⭐
- **B. Match Spanish to English** the next time Spanish is rebuilt

**Your pick:**

### 6. "Karmol" (ch 7, 20:06) — ANSWERED

You picked **A** ("great job"), and the cut is made on the copy.

---

## Done since this sheet was written

- **Round 3 of the tape check, 2026-09-17.** Your 99 answers became 37 edits on copies (English ch 3,
  6, 7, 8, 9, 10; Spanish ch 10). Every "you found it but it's still there" note was right, and each
  had a different cause — the clap remover stopped at one hit per pause, its crossfade handed the
  attack back when a clap began the instant a word ended, one cut point came from Whisper's word
  times and ate the end of "cooking", and one cut started a hundredth of a second after the breath
  it was meant to remove. Causes and fixes: `Panim-audio/v2/README.md`.
- **Both copies are proved clean.** `samplecheck.py` compares each edited chapter to the shipped one
  sample by sample: no change that an approved edit does not explain, and no length drift, in any of
  the six. `wordcheck.py` reads the transcripts on top of that.
- **Five book-follows-tape edits made** (see item 4), site at **v83**, not pushed.
- **Backed up** to the MAS drive while it was connected: 2.7 GB written, 33 GB mirror at
  `/Volumes/MAS/Panim-archive/_mirror/Panim`.

- **The writing pass, 2026-09-17 (site v82, not pushed).** 27 em dashes out of the manuscript and 50
  out of the verse notes, punctuation only — no word changed, cues and coverage unaffected. The book
  now runs 0.98 em dashes per thousand words, the notes 3.05. An AI-phrase scan of every
  reader-facing text came back clean. Full account in `panim-book/handoffs/NEXT.md`.
- **"Why are the sources unconfirmed?" They are not.** All eleven rows in `content/sources.js` carry
  a citation, `status: 'unconfirmed'` appears on none of them, and the "listed with the citation
  still open" line therefore never renders. The three hits I reported were the word appearing in
  that file's own comments.
- **One over-strong claim rewritten:** the Acts 6:15 note no longer says Stephen's is the only face
  the New Testament describes that way outside the transfiguration (Revelation 1:16 and 10:1
  describe two more). It now says the only living man.

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
