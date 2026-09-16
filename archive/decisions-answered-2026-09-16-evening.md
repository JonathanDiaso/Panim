# 🗄 Decisions answered 2026-09-16 (evening) — NOT LIVE

The author's notes, typed into `docs/DECISIONS.md`, and what was done with each. Built as v80.

| # | his answer | done |
|---|---|---|
| 1 | *"well why dont you come up with a clever idea. lol whats the best way to get someone to click without revealing???"* | ✅ Claude wrote it: *"Then one question on a blank page — Jesus, do You love me? — and how He answered it."* Two alternatives are on the new sheet. |
| 2 | Blue line on the card: *"keep"* | ✅ Kept. Nothing to build. |
| 3 | Empty space under the pictures, counter: *"do it"*; wider text: *"should be fine if you think its a good idea"*; *"maybe make the pictures bigger or is that a bad idea?"*; *"should we have an arrow there???"*; *"keep the sway and maybe add more sway"* | ✅ Counter **with arrows** built (they also let a mouse move the strip). ✅ Text under the pictures widened (1/8 → 1/11 of the grid; now 3 lines at every desktop width, measured 901–1960px). Sway kept. Bigger pictures and more sway went back on the sheet as plain questions, with advice. |
| 4 | Reading line in the margin: *"do it"* | ✅ Built: a thin line beside the paragraph being read fills as it is read. |
| 5 | *"i never know where these keys go so open that file in txt so i cant easily paste it in"* · *"posthog is US"* | ✅ `~/Panim/PASTE-POSTHOG-KEY-HERE.txt` opened in TextEdit. US is the default in `content/stats-key.js`. |
| — | 3D shadow on the caption: *"dont do"* | ✅ Closed for good. |

---

## The sheet as he answered it, verbatim

# Website — open decisions

**This is the only list of open website work.** Finished items are in `../archive/`.
Every item says what it is, why it matters, your options, and what I suggest.
If you don't answer, I build what I suggest (except #1, which only you can write).

The full reasoning and measurements behind each one are in
`../archive/decisions-long-form-2026-09-16.md`.

---

## Needs you

### 1. Write one sentence for the 8-minute sample on the front page

**What:** The front page has a card that plays 8 minutes of chapter 7. Its description only
covers the first 5 minutes.
**Why:** The last 3 minutes (your sister, *"Jesus, do You love me?"*) have no description, and
that part is the hook that makes people press play.
**What to do:** Send me one sentence, 10 to 20 words. It goes after *"…the wrong answer."*
**My advice:** Don't say outright that she died; let the listener hear it.

well why dont you come up with a clever idea. lol whats the best way to get someone to click without revealing??? 

### 2. The thin blue line down the left edge of that card: keep or remove?

**Why it's there:** Since the box around the card was removed, the line is the only thing
showing it's something you can tap, and it helps people with poor eyesight see the card's edge.

- **Keep it** ⭐ (suggested) keep
- **Remove it** (then the card has no visible edge)

### 3. The empty space under the row of chapter pictures

**What:** There's about 115px of blank space between the pictures and the text under them.
It can't just be cut, because the pictures need that room to sway.

- **A. Put a small "3 / 10" counter there**, showing which chapter you're on ⭐ (suggested, ~1 round) do it and maybe make the pictures bigger or is that a bad idea? Cause then we lose the right to left i guess so maybe not should we have an arrow there??? texdt under pics being wider should be fine if you think its a good idea. keep the say and maybe add more sway. 
- **B. Make the text under the pictures wider** so it fills more of the space (~½ round)
- **C. Both A and B** (~1½ rounds)
- **D. Make the pictures sway less** (this undoes your earlier choice of more motion)

(The chapter titles already sway along with the pictures.) 

### 4. Highlighting the words while the book reads aloud

**What it does now:** The paragraph being read stays dark and the others fade slightly.

- **A. Add a thin line in the margin** beside the paragraph being read, which fills up as it's read ⭐ (suggested first, ~1 round) do it
- **B. Light up each word the moment it's spoken.** Needs a tool that times every word in the
audio; ~2–3 rounds. ⭐ (suggested after A)
- **C. Leave it as it is.**

(Making words bold or bigger as they're read won't work: it makes the lines jump around.)

### 5. Visitor and listening stats — ✅ built, waiting on your key i never know where these keys go so open that file in txt so i cant easily paste it in for you. 

**What:** Anonymous counts: visitors, time on the site, country, phone or computer, chapter
starts, partial listens (25/50/75%), full listens, whole-book listens, the most-heard minutes,
where people rewind, downloads, shares, language switches.
**Why it's off:** It needs your PostHog project key to know where to send the numbers.
**What to do:** In PostHog, open **Settings → Project**, copy the **Project API key** (starts
with `phc_`), and tell me whether your PostHog web address starts with **us.** or **eu.**
I paste it in, add a short privacy note to the site, and publish.
**Free?** Yes. The free plan is 1 million events a month with no credit card, so it can't
charge you. That's roughly 2,500 whole-book listens a month; past that it stops counting
until the next month.
**No names:** Nobody's name is ever collected. To know who a visit came from, send tagged links:
`https://jonathandiaso.github.io/Panim/?from=church`.

---

## Only you can check these (on a real phone)

- [ ] **Download on iPhone:** Listen → Download → wait for *Saved ✓* → airplane mode → play a
  chapter. *Why:* It was only tested on a computer.
- [ ] **Spanish on iPhone:** tap the globe → Spanish → listen to a chapter.
- [ ] **Screen reader:** use the player with VoiceOver for an hour. *Why:* the accessibility page
  says this has never been done.
- [ ] **Ribbon and sharing:** scroll the picture row with your thumb and a mouse, then share a
  passage to yourself in iMessage and check the preview.
- [ ] **Chapter links:** open `…/Panim/#ch07` and `…/Panim/#ch10` fresh. Does the page land on
  the chapter title, or a little off?
- [ ] *Optional:* **audio cost per iPhone play:** Cloudflare → R2 → `panim-audio` → Metrics →
  note *Class B operations*, play one chapter on the iPhone, check again.

---

## Parked (not decisions, just known)

- **The 8-minute card copies two lines from chapter 7.** If chapter 7's text changes, those lines
won't update. Worth fixing only after #1.
- **The chapter pictures aren't sharp on big screens.** The originals are 1408px wide; they
need 2400px+. Blocked until there are bigger originals.
- **Index notes:** 35 rewritten notes are drafted but not applied, and 59 were never checked
against the book.
- **Two inline pictures** for chapters III and IV are waiting on where you want them.
- **Chapter titles differ** slightly between the site, manuscript and audio file names. Cosmetic.
- **The globe icon looks the same in English and Spanish.** Only its label changes.

## Ideas I don't recommend (listed so they stop coming back)

- A 3D shadow on the chapter caption: looks cheap and fights night mode. dont do
- A note at John 11:35 (*"Jesus wept"*): it would be the only note about you rather than the text.
- Notes attached to paragraphs: they break every time a paragraph is added or removed.
- A play symbol on each chapter picture: you already said no.
- Word-by-word highlighting with guessed timings: goes out of sync within two sentences.
- Splitting the book text into one file per chapter: the site is already fast.

## Never changing

- The 8-minute card always starts at David (chapter 7, 17:55).
- No commit ever has a co-author line.
- `content/chapters.js` is generated by a script and never edited by hand.



---

## Answered later the same evening: #1, the sample card's sentence

The item as it was on the sheet, with the author's note verbatim:

### 1. The sample card's new sentence — ✅ written, check it

**What:** You asked me to write the line for minutes 5–8 of the sample. It's now live on the card:

> *Then one question on a blank page — Jesus, do You love me? — and how He answered it.*

**Why this one:** the question is the hook: people want to know the answer, and it gives away
neither your sister's death nor the tears.

- **A. Keep it** ⭐ sounds good but i still want to start above that so they get scripural context and backstory etc. i think elijah is before it etc. and davids son. 
- **B.** *Then a sister who never missed a game, and a question she left behind.* (hints at the loss)
- **C.** *Then a question written on a blank page, and an answer that came without words.* (more mysterious)
- **D.** Write your own.

**Your pick:**

**What was done: nothing moved.** The note reads as "keep it, but the sample still has to start
before the question, so people get the scripture and the backstory first: Elijah comes before
it, and David's son." That is where it already starts. Checked against `cues/ch07.json`:

| time | what is heard |
|---|---|
| 17:55 | the card's start: *"David forgave his son and went on hiding his face for two years…"* (ch07-p107) |
| 19:45 | Elijah, off Carmel, forty days to Horeb (ch07-p117) |
| 24:42 | *"Jesus, do You love me?"* (ch07-p152) |
| 26:19 | the passage ends, *"He answered it wet"* |

The full Absalom story (David's son coming home) starts earlier, at 12:37 (ch07-p74). Starting
there would make the card about 14 minutes instead of 8. The author was told that in one line;
the `href` stays locked on `?t=ch07:17m55s` (FRONT-DOOR.md header) unless he asks for 12:37.
