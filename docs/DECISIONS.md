# Panim — what's waiting on you

**Updated 2026-09-17, evening.** Everything that needs a decision from you now lives on one page.
This file is the map: where the decisions are, what is already settled, and what only you can do.

---

## 1. The sign-off page — 45 decisions, all of them

### 👉 **https://claude.ai/artifact/QPm9n1c3W74AR6A3om3X42**

> **If that link says "not found", you are signed in as the wrong Google account.** There are two:
> `diasojonathan@gmail.com` and `jonathan.d.diaso@gmail.com`. This page belongs to
> **jonathan.d.diaso@**. The older round-2 review page belongs to **diasojonathan@** —
> your 99 answers from that page are safe either way; I keep a copy at
> `Panim-audio/v2/picks-round2.json` and everything from it is already carried into the new page.

Hear it as it ships, hear the fix, read the difference, tap an answer. Every answer saves itself the
moment you tap it — there is nothing to send me, and you can stop and come back. ⭐ marks what I'd do.

| section | how many | what it is | needs headphones |
|---|---|---|---|
| Listen and decide | **9** | the clap and broken-word repairs you flagged in round 2, rebuilt from scratch | yes |
| The cloned voice | **1** | the ch 10 line, cloned on this Mac — ship it, keep it print-only, or record it yourself | yes |
| Book or tape | **28** | you said it differently at the mic; which wording does the printed book carry | no (audio there if you want it) |
| No listening needed | **3** | Studio Sound on the four restores · the Spanish piano · marking the print-only lines | no |
| The index notes | **4** | four notes that are true but say more than the book does | no |

There is an **All 28 → tape** button at the top of the third section if you agree with the
recommendation across the board. You can still change any single one after tapping it.

**Nothing on that page changes anything by itself.** It records your answers; I make the passes.

---

## 2. Only you can do these (not decisions — jobs)

- [ ] **Listen to the six edited chapters end to end** (3, 6, 7, 8, 9, 10) against the ones that ship
      now. v2 ships only if it is better. Copies live in `Panim-audio/v2/voice/`.
- [ ] **Studio Sound on the four restores** — only if you pick **A** on the sign-off page.
      Descript project **"Raw DO NOT EDIT (panim)"**; timecodes are on the page and in
      `Panim-audio/v2/edits-need-work.md`.
- [ ] **New backup drive:** the Mac sees only the SL500 (MAS + Time Machine). Try another cable or port.
- [ ] **Stats:** PostHog → Activity. Visits should be arriving.
- [ ] **Download on iPhone:** Listen → Download → *Saved ✓* → airplane mode → play a chapter.
- [ ] **Spanish:** globe → Spanish → listen to a chapter.
- [ ] **Screen reader:** the player with VoiceOver; never done.
- [ ] **Share a passage** to yourself in iMessage and check the preview.
- [ ] **Chapter links:** open `…/Panim/#ch07` fresh. Does it land on the chapter title?
- [ ] **Cloudflare billing alert.**

---

## 3. Already settled (so they stop coming back)

| what | your answer | where it stands |
|---|---|---|
| The two lines nobody recorded (ch 6 *chen*, ch 10 tent) | keep both in the book, don't record now, try a free clone | Text stays. Clone done locally, nothing uploaded. Ch 10 works; ch 6 cannot be cloned — the Hebrew defeats the model four different ways. On the sign-off page. |
| The four recorded-but-dropped lines | **restore** all four | Waiting only on Studio Sound; the *how* is a question on the sign-off page. |
| "Karmol" (ch 7, 20:06) | **A** — "great job" | Cut is made on the copy. |
| Five book-follows-tape spots you reached | **tape** | Made 2026-09-17. Site at **v83**, cues unmoved, coverage 98.8%. |
| The em-dash pass | approved | 27 out of the manuscript, 50 out of the verse notes. 0.98 per thousand words. |
| Muting a clap | no | It leaves a hole in the room. Claps get the room's own tone instead. |

Older answered sheets: `../archive/`, most recently
`decisions-2026-09-17-before-the-signoff-page.md`.

---

## 4. Done since the last sheet

- **Tape check round 3.** Your 99 answers became 37 edits on copies (English 3, 6, 7, 8, 9, 10;
  Spanish 10). Every "you found it but it's still there" note was right, and each had a different
  cause. Causes and fixes: `Panim-audio/v2/README.md`.
- **Both copies are proved clean.** `samplecheck.py` compares each edited chapter to the shipped one
  sample by sample: **24.0 s removed, 0 changed stretches unexplained by an approved edit, 0.0 ms
  drift**, across all six. `wordcheck.py` reads the transcripts on top of that.
- **A gate for anything pulled out of Descript.** `splicecheck.py` tests room noise, 50/60 Hz hum,
  brightness, loudness, true peak and the words before a splice is allowed in. Built because you
  said you didn't want buzzing or added words creeping in.
- **The voice clone**, local only, nothing uploaded, no account.
- **The sign-off page** above, replacing the round-2 review page.
- **T2 is done: all 59 index notes checked against the manuscript**, 660 occurrences, every one
  read. Twelve notes were wrong and are fixed; the site is at **v84**. The old bookkeeping said
  "94 notes (35 rewritten + 59 never checked)" — there were never 94. The index has held 58–59
  entries in every version in git, and no draft of 35 rewrites survives anywhere, so what the
  sheet called two jobs was one. Worst error found: **Daniel** was at "an east-facing window",
  and chapter 7 says *"Daniel is east. His windows are cut the other way."* East-facing is the
  posture of the twenty-five men that same passage condemns. Full account in the header comment
  of `content/names.js`.
- **Backed up** to MAS: 2.7 GB, then 198 MB, at `/Volumes/MAS/Panim-archive/_mirror/Panim`.

---

## 5. What I do next, in this order

1. **Your sign-off answers** → the nine repairs onto the copies, the 28 text edits into the
   manuscript, then the site's three text tools and a version bump.
2. **Music rebuild** from the edited voice, then per-file checks, then site cues, encode, R2, version.
3. **T5. Picture row:** swipe-driven sway plus 2–3 cleaner counter/arrow versions.
4. **T6. About section:** 2–3 mockups.
5. **T7. Sharper pictures:** upscale the ten plates to 2816px for big screens only.

---

## 6. Later

Word-by-word lighting (an option, not required) · more pictures inside chapters III and IV (not now) ·
Portuguese (paused, 6 of 10 drafted, no ElevenLabs credits) · old audio cached on GitHub (it clears
on its own schedule).

## 7. Not doing

A 3D shadow on the caption · bigger chapter pictures · a privacy note for the stats · slowing the
scroll · a note at John 11:35 · notes attached to paragraphs · a play symbol on each picture ·
word highlighting with guessed timings · splitting the book text into files · muting a clap ·
removing breaths · cutting a verse's deliberate echo ("Seek My face", "the mountain east of the
city", "whose name means bound").

## 8. Never changing

The sample card starts at David (ch 7, 17:55) · no co-author line on any commit ·
`content/chapters.js` is generated, never hand-edited · the stats key is `phc_` only ·
the shipped audio is never edited in place: fixes happen on copies and ship only after you have
listened · archive, never delete.
