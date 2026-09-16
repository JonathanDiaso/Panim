# Decisions answered — 2026-09-16, night

The author typed notes on every item of `docs/DECISIONS.md` and pasted the PostHog token.
What was done with each, then the sheet exactly as he left it.

| # | his note (short) | outcome |
|---|---|---|
| 2 | "keep size" | **Closed.** Pictures stay the size they are. |
| 3 | slow the scroll through the pictures to show off the sway? is the arrow design the cleanest? | **Moved to tomorrow** as a design item with options. Slowing the scroll itself was not offered: it fights the reader's thumb. |
| 4 | "do you recommend this??? It would be pretty cool" | **Still open**, now with a straight recommendation (wait). |
| 5 | why tell them if it's anonymous? the About section looks flat, maybe an image or a character | **Closed: no privacy note** (C). The About redesign **moved to tomorrow** with options. |
| 6 | A, "make sure these are legit" | **Approved (A), queued for tomorrow**: every note checked against the book before it goes on. |
| 7 | might make more pictures, not now; put at the bottom for tomorrow | **Moved to "later"**. |
| 8 | can I just upscale the current images? don't want to remake them | **Moved to tomorrow**: yes, upscaling works, no remake. |
| 9 | can't we just delete it ourselves, without ElevenLabs or Descript? how sure are we it doesn't belong? | **Moved to tomorrow, first**: yes, a plain cut of the text and both audio files. It clearly doesn't belong: in ch 10 its "it" points at nothing. |
| 10 | we really should fix this; tomorrow; can it be done without Descript? | **Moved to tomorrow**: first look in the Studio Sound files already on disk. |
| 11 | fix all of them, but later; tomorrow list | **Moved to tomorrow.** |
| 12 | stall it, lost all my ElevenLabs credits | **Closed: paused** (B). `panim-book/pt/` is untouched. |
| 13 | "i have a new backup connected" | **Still open**: no new drive was showing on the Mac (only MAS and Time Machine, one physical disk). |
| 14 | leave it for now | **Closed: left** (A). |
| — | PostHog token pasted (`phc_`) | **Shipped as v81.** The live site's first batch returned 200 from us.i.posthog.com. |

---

## The sheet as he left it

# Panim — every open decision

**This is the one list of decisions for all of Panim**: the website, the book, the audio and
the rest. Each item says what it is, why it matters, your options and what I suggest (⭐).
**Answer by typing after "Your pick:"**, like last time. Skip one and nothing changes, except
where it says otherwise.
**13 left** (#2–#14). Answered items are archived in `../archive/` (the latest is
`decisions-answered-2026-09-16-evening.md`).

---

## Website

#1 (the card sentence) is answered: kept, and the audio still starts where it does. Archived.

### 2. Bigger chapter pictures?

**What:** You asked whether the pictures in the row should be bigger.
**Why I'd wait:** on a phone each picture is already about ¾ of the screen wide. Bigger means
you stop seeing the edge of the next picture, and that edge is what tells people to swipe.

- **A. Keep the size** ⭐ keep size
- **B. Bigger on computers only** (about 15% bigger; phones stay the same)
- **C. Bigger everywhere**

**Your pick:**

### 3. More sway on the pictures? hmm well maybe we can slightly slow the scroll down when we go through the images so it is enhanced the movement or som ething super clever cause it could be improved for sure. is that arrow design the c leanest possible?

**What:** You said keep the sway, "maybe add more".
**Why I'd wait:** more sway needs more empty space under the pictures, the space you wanted less of.
The new counter and arrows now sit in that space.

- **A. Keep it as it is** ⭐
- **B. More sway** (the gap under the pictures grows by the same amount)

**Your pick:**

### 4. Light up each word as it's spoken? hmmmm di you recommend this??? It would be pretty cool for sure.....

**What:** The reading line in the margin is built. The next step is lighting each word exactly
when it's spoken.
**Why it's a bigger job:** it needs a free tool that times every word in the audio (about 2–3
rounds). About 1 word in 100 won't time correctly, and those paragraphs fall back to the line.

- **A. Look at the new reading line on your phone first, then decide** ⭐
- **B. Build it now**
- **C. Don't build it**

**Your pick:**

### 5. Privacy note for the stats i dont see why i ahve to tell them if its ananomous to be honest also the about section could look better and cleaner its just a bunch of text maybe an image or some charachter so its not so flat???

**What:** When your PostHog key goes in, the site starts counting visits and listens anonymously.
**Why:** it's honest (and expected) to tell visitors, in one sentence: *"This site counts visits
and listening anonymously: no names, no cookies, nothing sold."*

- **A. Add it to the About section** ⭐
- **B. Add it to the accessibility page**
- **C. Don't add a note**

**Your pick:**

### 6. The 35 rewritten notes in the name index

**What:** The index at the back of the site (people and places) has short notes. 35 were
rewritten weeks ago but never put on the site, and 59 others were never checked against the book.
**Why it matters:** a wrong note is a wrong fact in your book.

- **A. I check all of them against the book, fix what's wrong and put them on the site** ⭐ (~1 round) make sre these are legit
- **B. Show them to me first, a few at a time**
- **C. Leave them**

**Your pick:**

### 7. Two extra pictures inside chapters III and IV

**What:** Chapters III and IV each have a long stretch of text with no picture. A picture prompt
exists for III; neither picture has been made.

- **A. Leave them without** ⭐ (the site is complete as it is)
- **B. Make both pictures** and I place them i might make more pictures but wont do this now put this at the bottom of decisons md with future decisions for tomorrow

**Your pick:**

### 8. Sharper pictures on big computer screens can i jjust upscale my current image or image would need to be remade? if i jcan just increase image quality as is that would work but i dont watnt o remake images right now.

**What:** The chapter pictures are 1408px wide, so they look slightly soft on large screens.
**Why:** fixing it needs bigger originals (2400px+).

- **A. Leave them** ⭐ (phones, where most readers are, look sharp)
- **B. Remake or upscale the ten pictures**

**Your pick:**

---

## Book and audio (paused, so only if you want to)

### 9. A sentence that appears twice huh so we know for certain it shouldnt be there? Do we really need to go to eleven labs to do this cant you just delete the sentence eaily? lol it shouldnt be that hard but i do want it fixed. we should find a simple fix like just deleting it ourselves not going back to the audio on eleven labs or descript etc. I dont understand how i would ahve a random part of chapter 8 in chapter 10 youre saying it clearly doesnt belong??? How bad is it to leave it there its obvious that its not in the right place?

**What:** *"Of all the faces in the courtyard, it finds the one trying hardest not to be known."*
is in chapter 8 (where it belongs, about Peter) and again in chapter 10 (after *"A table and a
seat…"*), where it looks like a leftover paste. It's in the English and Spanish audio too.
**Why it's not a quick fix:** removing it means editing the English recording and re-making one
small piece of the Spanish audio (a few hundred voice credits).

- **A. Fix it next time the audio is open** ⭐
- **B. Leave it**

**Your pick:**

### 10. Three passages on the page that aren't in the audio we reallyu should fix this lets pencil this for a tomorrow change at bottom of this md do ypou think you can do without descript or we need to go back to descript and do all the sound editing afterwards???? this will be a lot of work i think lol

**What:** These are in the book text but not in the recording:

- ch 5: *"slow of speech, and the Hebrew is blunter"* (8 words)
- ch 6: the *vichunecha / chen* (grace, a girl's name) passage (28 words)
- ch 10: *"nobody ever told the woman at the tent either…"* (28 words)

You said the ch 6 and ch 10 ones were recorded and lost in editing.

- **A. Look for them in the original Descript project next time the audio is open** ⭐
- **B. Cut them from the page** so the text matches the audio
- **C. Leave them**

**Your pick:**

### 11. Small audio fixes pencil at bottom of md for tomorrow changes i do want to fix all of these issues but later

**What:** About 15 claps or mouth sounds left (5 in ch 9), *"on silver back home"* said twice in
ch 7, and 3 other repeated phrases to check by ear.

- **A. Do them together in one audio sitting, whenever you want** ⭐
- **B. Leave them**

**Your pick:**

### 12. The Portuguese translation i might just stall this for now i lost all my eleven labs credits.

**What:** A Portuguese (Brazil) translation was started today: 6 of 10 chapters are drafted in
`panim-book/pt/`.
**Why ask:** finishing is free. Turning it into audio, like the Spanish, costs voice credits.

- **A. Finish the text, then decide about audio** ⭐
- **B. Pause it**
- **C. Finish the text and make the audio**

**Your pick:**

---

## Everything else i have a new backup connected

### 13. A second backup

**What:** Everything is backed up to the MAS drive, but MAS is the same physical disk as Time
Machine. If that drive dies, both copies go.

- **A. Buy a second external drive (~$70) and I'll copy everything to it too** ⭐
- **B. Cloud backup** (about $10/month, e.g. Backblaze)
- **C. Leave it**

**Your pick:**

### 14. Old audio still cached on GitHub

**What:** The audio was removed from GitHub's history, but GitHub may keep hidden copies for a while.
Nothing links to them.

- **A. Leave it** ⭐ jsut leave it for now they should remove it soon??? 
- **B. Ask GitHub Support to delete them** (you'd send the request)

**Your pick:**

---

## Checks only you can do (not decisions)

- [ ] **Download on iPhone:** Listen → Download → wait for *Saved ✓* → airplane mode → play a chapter.
- [ ] **Spanish:** tap the globe → Spanish → listen to a chapter.
- [ ] **New on the site:** the reading line (play any chapter), the counter and arrows under the
  pictures, and the card's new sentence.
- [ ] **Screen reader:** use the player with VoiceOver for an hour; the accessibility page says
  this was never done.
- [ ] **Share a passage** to yourself in iMessage and check the preview.
- [ ] **Chapter links:** open `…/Panim/#ch07` fresh. Does it land on the chapter title?

## Not doing (so they stop coming back)

A 3D shadow on the caption (you said don't) · a note at John 11:35 · notes attached to
paragraphs · a play symbol on each picture · word highlighting with guessed timings · splitting
the book text into files.

## Never changing

The sample card starts at David (ch 7, 17:55) · no co-author line on any commit ·
`content/chapters.js` is generated, never hand-edited.