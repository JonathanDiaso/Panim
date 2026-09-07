# 🗄 SITE ROUND RECORDS — v57 · v58 · v59 · v60

**Moved out of `docs/FRONT-DOOR.md` §4–§7, 2026-09-07.**

🛑 **NOT LIVE. This is history, not instruction.** Four consecutive round records —
548 lines — were sitting under the three sections that describe what the front door
does *now*, and every one of them opens with the words "superseded by". A file you
read to find the current behaviour should not make you scroll four shipped releases
to reach it.

⭐ **EVERY RULING IN HERE STILL STANDS.** That is why it is archived and not deleted.
The expensive parts — §4.2's mistake, §5.2's night-mode trap, §5.9's layout fault
found by a type audit, §6.1's one-field-two-sizes diagnosis, §7.1's two resume
buttons — are reasoning that costs hours to re-derive. **If you are about to re-open
any of these questions, read the section here first.**

**What is current lives in `docs/FRONT-DOOR.md`:** §0–§3 (the front door as it stands,
where things live, the four places a version bump touches) and §8 (v61, the round
that shipped last).

---

# 4 · 🗄 v57 — THE RECORD OF THE PREVIOUS ROUND

**Superseded by §5, which is v58.** Kept because every ruling in it still stands and §4.2
is the most expensive lesson in this file.

## 4.1 What shipped tonight, in one place


| # | the note                                                        | what happened                                                                                     |
| - | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 1 | *"hebrew word should be on top of title… not in dead center"*   | The mark spans `.hero-title`'s own tracks and ranges left with it. **0px offset at every width.** §0.8 |
| 2 | *"i dont want the clicker that shows content near the button"*   | `Contents ↓` deleted, `.hero-hint` deleted with it. `Begin listening` stands alone. §0.4          |
| 3 | *"move that button down… so they interact with the pictures first"* | The second door is under the ribbon. `Begin listening` stayed on the jacket, on his call. §0.4 |
| 4 | *"why would someone click it… its a teaser"*                    | Card rebuilt: **offer → bait → what's inside → destination.** Excerpt unchanged at `17m55s`. §0.1, §0.4 |
| 5 | *"still tiny and nt captivating… different font"*                | Plate caption in the display voice, 21.4 → 30.4px, `--ink`. Reserved height rewritten in `em`. §0.9 |
| 6 | *"too much space in between sections at the beggining"*          | `#hero` 1504px → 1363px. §0.10                                                                    |


## 4.2 🛑 THE ONE MISTAKE OF THE NIGHT, SO IT IS NOT REPEATED

**Note 4 was read as a complaint about the audio and it was a complaint about the copy.**
The excerpt was moved from David/Absalom to Hannah and had to be moved back. **The whole
lesson is in §0.1 and it is worth the thirty seconds** before anyone touches that `href`:

> **"it was fine before, where the sound started"** is an instruction to leave the excerpt
> alone. **If the card is not working, the card is wrong.**

⚠️ **The Hannah passage (`22m49s`, "He answered it wet") is genuinely strong and is still
sitting there unused.** It is **not** a rejected idea — he liked the David audio *and* he
volunteered that quote by name. **If a second door is ever wanted somewhere else on the
site, that is the one**, and §0.3's method (measure forward by text against `cues/ch07.json`,
never by clock) is how to size it.

## 4.3 ⬜ Open, ranked → **now in `docs/DECISIONS.md`**

🛑 **This list has moved.** Every open call on this site — v57's and v58's — is in one file
now, `docs/DECISIONS.md`, on the author's instruction: *"ant files that have pending
decisons to be made combine into one file so ic an tule after we finish this."* **Do not
re-open a parallel list here.** The four items that were in this section are §C.5, §C.6,
§B.1 and §F of that file, unchanged.

## 4.4 How everything above was verified

**Same-origin harness in `Panim-site/`, served over `http://localhost:8899/`, deleted before
committing.** See `README.md` §6 and the project memory: a `file://` harness with a
`localhost` iframe is cross-origin, `contentDocument` is `null`, and the failure looks like
a perfectly good screenshot of the top of the page every time.

- **Deep link:** clicked headlessly → `{"chapterId":"ch07","seekTo":1075}`, default
  prevented, URL unchanged.
- **Contrast:** every pair alpha-composited against the background it actually sits on, not
  against the token. `#plates` has no `[data-ch]` and composites to `rgb(239,235,225)`.
- **The caption ladder:** all ten hooks measured at thirteen widths, one probe element per
  width, and the ladder carries only the widths where the tallest hook actually gains or
  loses a line.
- **Horizontal scroll:** `scrollWidth > clientWidth` checked at 320 / 360 / 402 / 480 / 560 /
  640 / 768 / 900 / 901 / 1024 / 1280 / 1440 / 1920. **None.**

---

# 5 · 🌙 v58 — NIGHT MODE, A REAL PRIMARY BUTTON, AND THE PLAYER LEARNED TO KEEP GOING

**2026-09-05, the second session of the day.** One long design review, answered in full.
**v58 is committed and pushed; the site is live and matches this file.** Nothing is
half-done and there is no branch waiting.

🛑 **Every open question this round produced is in `docs/DECISIONS.md`, not here.** That
file is the single sheet the author asked for. **This section is the record of what was
built and why; that one is the record of what is still his call.**

## 5.1 What shipped, against what he said

| # | his words | what happened |
|---|---|---|
| 1 | *"could the resume button be any ugglier? That's so pathethic."* | `#begin-btn` rebuilt as `.btn-begin`: a play ring, a two-line label, and the chapter's own accent instead of a black slab. §5.3 |
| 2 | *"continue balck buttons are so ugly… maybe i need a night mode that might ahve disappeared"* | **Every** control's hover left black for the accent, and night mode is real and persistent. §5.2, §5.4 |
| 3 | *"whehether each ch individual clcik shoudl start at the beggining"* | A chapter click starts at `0:00`. **Only Continue resumes.** §5.5 |
| 4 | *"Should i have an option that doesnt stop at every chapter"* | Continuous play, defaulting **on**, remembered. §5.5 |
| 5 | *"[the Listening Room] looks cheap and we should ahve more options bigger buttons"* | The room's stack rebuilt: 88px transport, ±15s skips, five chips, a dawn-gradient arc. §5.6 |
| 6 | *"i wouldnt mind ore movement with the riboon… any way to encourage them to go right?"* | Drift widened to ±4.6%, a lit plate lifts, and the edge fades now follow the rail. §5.7 |
| 7 | *"titles could prob be bigger under pics and the text under it should be much bigger"* | `.pl-t` and `.pl-hook` both up a step; the reserved-height ladder re-measured from scratch at 37 widths. §5.7 |
| 8 | *"if we do panimn hebre on the left can we raise up the… big hebrew word"* / *"i guess on mobiel the hebrew woed ends up on the left"* | The chapter mark is bigger and it sits **beside** the numeral, not floating. §5.8 |
| 9 | *"how is textsize and cohesion looking any weird text that needs to be bigger"* | A type audit at 402 and 1440. **It found a real fault nobody had reported — the nav bar was running off a small phone by 61px.** §5.9 |
| 10 | *"the chapter explenations… some of them are flat"* | The ten live lines are saved verbatim and four alternatives each are written and **measured**. 🛑 **`docs/DECISIONS.md §A` — it is his call and the measurement changed the question.** |

## 5.2 🌙 NIGHT MODE, AND THE ONE TRAP IN IT

**`html[data-theme="night"]` in `css/site.css`.** A pre-paint boot script in `index.html`
sets the attribute before the first frame, so there is **no flash of the day palette**; the
choice is in `localStorage` and the toggle is `#theme-btn` in the nav, beside About.

**Every one of the twelve section palettes is redefined**, not just the root — the dawn arc
survives into the dark, night blue through fire to a warmer morning, so a reader who turns
the lights off still gets the book's colour idea rather than a grey wash. Plate images are
dimmed (`brightness(.86) contrast(1.03)`) because a bright photograph on a dark page is a
flashlight.

🛑 **`js/motion.js` HAD TO BE TOLD.** The dawn arc writes `--paper` / `--ink` / `--accent`
as **inline properties on the document**, and it uses a compare-then-write guard so it does
not touch the DOM sixty times a second. **That guard makes it deaf to a stylesheet change:**
the day values were already inline and still matched its cache, so night mode would have
been a night stylesheet with a day palette painted on top of it. **The fix is two parts and
both are required** — a `TOKENS_NIGHT` table mirroring the CSS, and a `panim:theme` event
that clears `lastBg` / `lastAccent` / `lastInk` and re-runs the frame. ⚠️ **Anyone adding a
third theme has to do both, and the failure is silent.**

## 5.3 THE PRIMARY BUTTON IS NOT A BLACK RECTANGLE ANY MORE

**The complaint was aesthetic and the cause was structural.** Every control on the site
inverted to a slab of `--ink` on hover, which is the default primary button of every
template on the internet — the one gesture the page shared with none of its own ideas.

**`.btn:hover` is now an accent wash and an accent border**, and the label stays `--ink`,
**so nothing depends on the accent's contrast against paper.** `.transport-play:hover`
fills. `.btn-solid` is accent-based.

**`.btn-begin` is a new component:** a ring with a triangle in it, then two lines of type —
`Continue` / `Chapter VII · 17 min in`, or `Begin listening` / `Chapter I`. ⚠️ **`.bb-place`
is set in full `--paper`, not a dimmed mix.** A composite toward the accent measured
**3.75:1 at 78% and only 4.42:1 at 90%** for 11.5px text; the hierarchy is carried by size,
weight and case instead. **Contrast is not a place to be subtle.**

## 5.4 The resume position moved out of the player

🔴 **`js/player.js` used to fall back to `LS.get('pos:'+chapterId)`** whenever it loaded a
chapter without an explicit `seekTo`. **That is what made a chapter click resume**, and it
is why the two questions in §5.5 were the same bug wearing two hats. **The fallback and its
matching write are both gone.** The Continue button passes `seekTo` explicitly, and it is
now the only thing on the site that resumes.

## 5.5 The player keeps going, and a chapter starts at its start

**Chapter click → `0:00`.** His ruling, verbatim: *"seems like beggining is realistic unless
tyou are actually contoinuing from where you left off but switching chapter would be the
beggining."*

**Continuous play defaults ON.** `state.autoAdvance`, persisted, toggled by `#room-auto`.
On `ended` the next chapter loads and autoplays, the title is announced to a screen reader,
and — if follow-along is on — the page scrolls to it. **The default is a judgement:** this
book's audience is driving, walking or falling asleep, and a tape that stops dead every
twenty-five minutes waiting to be touched is a tape that gets abandoned in a car.
⚠️ **The one thing that could not be verified is whether the music beds were mixed to land
on a full stop.** If they were, playing straight through steps on ten endings. **That is an
ear question and it is in `DECISIONS.md §D.2`.**

## 5.6 The Listening Room

`.room-stack` at `gap: 0`, so the Hebrew, the numeral and the title read as one block
instead of three floating rows. **The arc is a dawn gradient** (`#room-arc-dawn`), which is
the "starts dark and turns to light" half of his note, and `.arc-fill` fades out at zero so
there is no stray dot on a fresh chapter. **±15s skips** as 62px circles, an **88px**
transport, and five 48px chips on one wrapping row. `.room-btn` and the old
`.room-secondary .btn-icon` are deleted — they were a second button system doing what `.btn`
already did.

## 5.7 The ribbon: more motion, and the fades now mean something

**Drift ±4.6%** with the frame overhang widened to match (`left: -6%; width: 112%`), a lit
plate lifts 7px, and arrival nudges the rail so the strip shows it can move.

⭐ **The edge fades follow the rail now.** `is-scrolled` turns the left fade on once there is
something behind the reader; `at-end` turns the right one **off** once there is not — a
strip that keeps fading on the right after the last plate is a promise it cannot keep.
🔴 **`reflectEdges()` is called directly from the scroll listener, NOT from inside the
`requestAnimationFrame` frame.** It was in the frame first and it did not fire under a
throttled rAF. The fades are the only signal that there is more ribbon; they cannot be the
one thing that fails in a background tab. **`scrollWidth` is cached in `measure()`** so the
eager call costs two class toggles and no layout.

🛑 **The clearance-versus-travel trade is real, it was measured twice, and it belongs to the
author** — `DECISIONS.md §C.4`. Two attempts to reclaim the space under the rail were built,
measured and **reverted**: biasing the sway freed nothing and cost 23% of visible travel;
cutting the padding measured safe at 402 and would have clipped 12px off plate I at 1440.

## 5.8 The Hebrew mark stopped floating, and the cause was `dir="rtl"`

**An RTL block right-aligns its inline content.** On desktop that was invisible, because the
196px margin column it sits in is exactly as wide as the mark. **On a phone the same block
is the full page width**, so the word flew to the right edge with nothing near it — which is
what he was seeing and could not name.

**Fixed by structure, not by nudging:** on a phone `.chapter-margin` becomes a baseline flex
row and the mark and the numeral share it, mark first. The mark is bigger at both ends
(2.45rem on a phone, up to 3.15rem on desktop). **On the jacket, `.hero-hebrew` centres over
the title below 900px and stays ranged left above it** — a centred mark on a wide screen
floats away from the title it belongs to. ⚠️ **That last one was made on a screenshot rather
than on his word and it reverts in one rule** — `DECISIONS.md §C.2`.

## 5.9 🔴 THE TYPE AUDIT FOUND A LAYOUT FAULT, NOT A TYPE FAULT

**Three sizes were off the scale and one of them was hiding a real bug.**

| what | was | now | why |
|---|---|---|---|
| `.chapter-hook` | flat `1rem` — **16px at every width** | `var(--body-size)` | It is a standfirst, and it was **a fifth smaller than the body copy it introduces** past 928px. A standfirst that reads smaller than its own paragraph gets taken for a caption and skipped. |
| `.btn` | `.8rem` | `var(--ap-lg)` | An off-scale value in the busiest component in the file. |
| `.plate-caption .plate-text` | `.95rem` | `var(--ap-xl)` | Same number, now on the scale. |
| `.hero-sample-note` | `var(--ap-lg)` | `var(--ap-xl)` | **`--ap-xl` exists because of this line** — its own comment in `css/site.css` says so, and the declaration had been left a step below it. |

🔴 **AND THE FAULT: THE NAV BAR RAN OFF A SMALL PHONE.** Measured in a real browser, the
shell's `scrollWidth` beat its `clientWidth` by **61px at 320, 41px at 340, 21px at 360**.
**Four 44px targets plus a wordmark plus the contents toggle do not fit 320px.** The night
toggle was the fourth action and the one that pushed it over — **but it was already 17px
over without it, and nobody had caught it.**

**Nothing was allowed to shrink below a 44px target.** The space came out of the padding
between the labels and their borders (≤420px), and then out of the wordmark (≤380px), which
is the one item in the bar that navigates nowhere the page does not already offer: the
jacket title is a hundred pixels under it and the contents toggle is its neighbour.
🔴 **AND IT HAD A TWIN AT THE OTHER END.** The ten chapter numerals come back at 901px, and
the moment they did the bar overflowed by **32px** — the same extra button, the other
breakpoint. Swept in 10px steps it is **+32 at 901, +22 at 911, +13 at 921, +3 at 931, and 0
from 941 up**, so the numerals now appear at **941** instead of 901. **They are a convenience
the running head and the contents both duplicate; a bar running off the screen is not.**

✅ **Re-measured after both fixes: 0px of nav overflow and no document overflow at 320 / 360 /
380 / 381 / 402 / 420 / 421 / 480 / 640 / 768 / 900 / 901 / 920 / 940 / 941 / 960 / 1024 /
1280 / 1440 / 1920, no control under 44px at any of them, and no console errors.**

⚠️ **The nav keeps `--ap-md` while `.btn` moved to `--ap-lg`, and that is deliberate.**
Raising the nav re-breaks 320. Nav labels are chrome consulted at a glance, which is what
`--ap-md` is for.

**The italics were audited and they are all deliberate:** the five italic contents rows are
the **back-matter** rows (`.toc-row.toc-back .toc-title`), the Greek chapter mark is italic
because it is set in the book serif rather than the Hebrew face, and the italic is what keeps
it reading as a *mark* beside the Hebrew instead of as a second heading; everything else is
prose `<em>`.

## 5.10 How v58 was verified

**Same-origin harness in `Panim-site/`, served over `http://localhost:8899/`, deleted before
committing.** ⚠️ **Three headless false faults cost time this round and all three are already
on record** — worth thirty seconds before anyone re-measures:

- **`--run-all-compositor-stages-before-draw` painted a stale cream tile** over a correct
  night-mode page. The computed styles were right the whole time (`bodyBg =
  rgb(20,19,17)`). **Dropping the flag rendered it correctly.** A `position: fixed` nav
  paints stale in headless for the same reason.
- **`IntersectionObserver` never fires under `--virtual-time-budget`,** so `.heb-g` stayed at
  `opacity: 0` and the chapter mark photographed as missing. The harness force-adds
  `is-visible` / `is-drawn` / `is-in`.
- **`html { scroll-behavior: smooth }` never completes under virtual time.** Set
  `scrollBehavior = 'auto'` and pass `behavior: 'instant'`.
- 🔴 **NEW THIS ROUND, AND IT CRIED WOLF ON NIGHT MODE: CSS TRANSITIONS DO NOT ADVANCE UNDER
  VIRTUAL TIME.** `body` carries `transition: color var(--dur-med)`, so after the theme flip
  `getComputedStyle(body).color` came back **frozen at the day ink** — which reads in the
  numbers as a whole page of dark text on a dark ground, for as long as you care to wait.
  **The inline style was correct the entire time:** `body.style.color = rgb(239,233,222)`,
  `--ink = #EFE9DE` on `<html>`, `--ink = #EFE9DE` on the section. **Inject
  `* { transition: none !important }` before flipping anything and the reading is right.**
  ⚠️ **Anything measured across a state change on this site is suspect without that line** —
  the arc, the chips, the lit plate and every `:hover` all transition.

**Measured this round:** the hook ladder re-swept over 37 widths; the nav at eight widths
before and after; document horizontal scroll at fifteen widths from 320 to 1920 (**none**);
the edge classes driven through `scrollLeft = 0 → 300 → max → 0` (**`is-scrolled` and
`at-end` both set and both cleared**); and the four type sizes read back off the live page
(**body 21.12 / hook 21.12 / plate text 15.2 / sample note 15.2 at 1440**).

## 5.11 🛑 WHERE THIS IS LEFT

**Nothing is half-built.** The open items are decisions and human checks, and they are all
in **`docs/DECISIONS.md`** — the standfirsts (§A), the copy questions (§B), the design calls
(§C), the player's default (§D), the carried-over audio and repo work (§E), and the four
things only a person with the site in their hand can check (§F).

---

# 6 · ✉️ v59 — TWO FIELDS FOR THE STANDFIRSTS, AND THE BOOK CAN BE QUOTED

**2026-09-06.** The author marked up `docs/DECISIONS.md` in the margins and every mark was
acted on in one round. **v59 is committed and pushed.** 🛑 **The record of what he said and
what it produced is `docs/DECISIONS.md` — this section is what was built.**

## 6.1 🛑 ONE FIELD WAS BEING SET AT TWO SIZES, AND THAT IS WHY THE COPY COULD NOT IMPROVE

**The author asked for standfirsts with "more heart and truth" and allowed three sentences.
Measured, three sentences was unshippable, and the reason was structural rather than
editorial:** `hook` is printed in **three** places and one of them sets it in the display
voice at a 32px line-height on a phone. The four alternatives he picked ran **6–9 lines** in
the ribbon caption against a reserve of five — **up to 162px of new air under all ten
plates**, which is the vertical bloat he had asked to remove two notes earlier.

⭐ **So there are two fields now, and he does not have to choose:**

| | field | who prints it | budget |
|---|---|---|---|
| under the ten plates, and in the contents | `hook` | `.pl-hook`, `.toc-hook` | display voice — **short or nothing** |
| at the top of the chapter | `standfirst` | `.chapter-hook` | body size, 58ch — **three sentences fit** |

**`standfirst` is optional and only four chapters carry one** (I, IV, VIII, IX);
`js/render.js` falls back to `hook` everywhere else. 🛑 **BOTH ARE HAND-CARRIED FIELDS in a
generated file** — `tools/build-chapters.py` copies each of them forward across a rebuild,
and that is the only reason editing them in `content/chapters.js` is safe.

✅ **Re-measured at 22 widths from 320 to 1920 after the rewrite: the hook ladder still
reserves enough for the tallest of the ten at every width, unchanged.** Chapter I is now the
tallest instead of chapter VI. **The strip did not get taller.**

## 6.2 THE FIVE-MINUTE CARD — shorter, lit, and it pulses exactly once

**Three complaints, three answers.** *"honestly kinda long"* → the supporting paragraph went
from three sentences to one; the father at the door was the weakest of the three and the
quote above it already implies him. *"could be flashing or have color"* → 🛑 **not flashing,
ever** (WCAG 2.3, and `prefers-reduced-motion` would remove it for exactly the reader it was
meant for) — **colour instead, and the colour is the chapter's own:** 7% of the current
accent mixed into the same `--control-wash` every control uses, with the eyebrow and the
play ring in the accent too. It is the only tinted rectangle above the fold.

⚠️ **Measured by compositing the translucent wash over the paper it actually sits on** — day
`rgb(215,212,203)`, night `rgb(18,17,15)`: quote **12.26 / 15.62**, supporting line
**5.03 / 8.52**, accent ring and eyebrow **5.68 / 8.71**. All pass.

**And one pulse on arrival** — the author's pick over a flashing box. `js/ui.js` adds
`.is-arrived` the first time the card crosses 35% into view and the observer disconnects
itself; the animation has no iteration count, so it plays once. **The ring draws itself and
the triangle lifts — the same gesture the transport button makes when a chapter starts, so
the card rehearses what pressing it does.**

## 6.3 THE RIBBON — *"more motion some room is fine"*, and those are one decision

| | was | now |
|---|---|---|
| sway, largest plate | ±66px | **±89px** (`PLATE_SWAY` × 1.35, shape untouched) |
| drift inside the frame | ±4.6% | **±5.6%** |
| the rail's `padding-block` | 5rem / 80px | **6.5rem / 104px** |

🛑 **THE LARGEST AMPLITUDE AND THE PADDING NEVER MOVE APART.** A plate travels ±(its own
amplitude) and `#plates` clips anything past the padding; 104 against 89 keeps the same 15px
of slack the old pair had. **This is the trade this file spent two measured, reverted
attempts on in v58, and the author has now ruled on it: more motion, and the room to pay for
it.** ⚠️ **The drift has a hard ceiling of 6** — `.pl-frame img` is laid out at
`left: -6%; width: 112%`, so past 6 the frame runs out of picture and shows its own
background at the trailing edge on every plate. Widen the overhang first or do not widen it.

## 6.4 ⭐ THE BOOK CAN BE QUOTED NOW — `js/quote.js`

> *"also is it possible to just send a small snippet of the book to someone?? that links to
> the whole book? Thats needed"*

**Select any text in the ten chapters and one button appears over the selection.** It hands
`navigator.share` the passage, its chapter and a link; with no share sheet it copies the
same three lines to the clipboard and says so in the button.

🛑 **THE LINK IS `/c/NN/?p=<paragraph id>`, NOT A BARE `#fragment`, AND THAT IS THE WHOLE
FEATURE.** A bare `…/#ch07-p107` opens in the right place but **unfurls as the book's front
door**, because one HTML file has one set of Open Graph tags. The chapter stub already
carried chapter VII's own title, standfirst and plate — it now also reads `?p=` and redirects
to that paragraph. **The recipient's messaging app gets a card worth opening; the reader gets
the whole book, at the sentence they were sent.** `tools/gen-chapter-stubs.py` writes the
parameter handling and **validates the id before using it** — it only ever becomes a
same-document fragment, but a redirect target assembled out of a query string is a shape
worth never getting into the habit of.

**Decisions inside it, so they are not re-litigated:**
- ⚠️ **Scoped to `#chapters-root`.** Selecting a nav label or a caption must not offer to
  quote the book. Verified: a selection in `.nav-mark` does not raise it.
- ⚠️ **Raised on `mouseup` / `touchend` / shift-`keyup`, never on `selectionchange`.**
  `selectionchange` fires continuously during a drag, and a button appearing under a moving
  cursor makes the selection impossible to finish. `selectionchange` is used for one thing:
  taking the pill away when the selection collapses.
- **Position is `absolute`, not `fixed`** — a fixed pill slides away from its own selection
  the instant the page moves, which reads as a bug even when it is not.
- **280 characters, cut on a word**, ellipsis only when something was actually removed.
- `z-index: 60` — **under** the sheets and the player bar.

✅ **Verified at 402px in both themes:** pill is 170×44 (target met), fully on screen,
label text **15.3:1** against its own paper, glyph **7.07 / 8.57**; Escape hides it; a
collapsed selection hides it; a selection outside the book never raises it.

## 6.5 The jacket line

**`Read and listen` → `Read it or listen. The choice is yours.`** The author:
*"add the chouc is yours thats good!!!!"* — *and* can be read as an instruction to do both,
which is more homework; *or* alone makes the reader choose at the door and implies the two
are different products. The second sentence settles it in four words. 🛑 **No runtime on
that line** — see §0.4.

## 6.6 How v59 was verified

**Same-origin harness over `http://localhost:8899/`, deleted before committing**, with
`* { transition: none !important }` injected before any state change — see §5.10, that
omission cried wolf on night mode for an hour last round.

- **No console errors**, and **no document overflow and no nav overflow** at 320 / 360 / 380
  / 402 / 480 / 640 / 768 / 900 / 901 / 940 / 941 / 1024 / 1280 / 1440 / 1920, with **no
  control under 44px** at any of them.
- **The hook ladder re-swept at 22 widths** against the rewritten hooks — every width still
  reserves enough.
- **Contrast composited, not assumed**, for the card and the pill in both themes.
- **The share pill driven end to end**: raised from a real range in chapter I, measured,
  dismissed by Escape, dismissed by collapse, and refused a selection in the nav.

---

# 7 · 🔇 v60 — THE LAST BLACK SLABS, THE SHARED MOMENT, AND EIGHTEEN SECONDS OF MUSIC

**2026-09-06, same day as v59.** Four things, all of them the author's word.

## 7.1 🔴 "THE RESUME BUTTON IS OBNOXIOUSLY LOUD" — AND THERE WERE TWO OF THEM

**`.btn-begin` was solving the wrong half of the problem.** v58 took it off near-black and
painted it in the book's own accent, which fixed the **colour** and left the **shape**: a
filled block, sixty pixels tall, on cream paper, directly under a photograph. **On a page
whose entire visual argument is ink on paper and one hairline, a filled block of any colour
is the loudest thing on the screen.**

⭐ **It did not need fill to be primary.** It is already the widest control on the jacket,
the only one with two lines, and the only one with a drawn ring — **three ranks of emphasis
before colour is spent.**

🔴 **AND THE FIRST ATTEMPT ONLY GOT HALF OF IT.** The fill became a 9% wash inside a 2px
accent border — quieter, and still a **rectangle**. The author's clarification settled which
half mattered: *"i meant loud as in ugly lol."* **The rectangle was the ugly part.** This
page is hairlines and paper; a bordered box is the one shape it uses nowhere else, which is
exactly why a control drawn as one looks pasted in from a different website.

**So the box went too, and the button is marked the way the book marks things:** one accent
rule down the left edge — what the five-minute card does, and what a change of voice gets
throughout the text. **The affordance was never in the box.** It is the 40px drawn ring with
a triangle in it, the one mark on this page that means *this plays*.

⚠️ **WHICH MAKES THE HOVER DO REAL WORK.** With no resting background there is nothing to
deepen, so hover paints the wash **in** — the control gains a surface under the pointer
rather than changing colour. That is also the only state with a boundary, and it is fine:
**SC 1.4.11 is satisfied at rest by the ring** (7.07:1 day / 8.57:1 night against a 3:1
requirement), not by an edge.

**Four variants were rendered side by side before this was picked** — filled, washed box,
hairline box, accent rule, and ring-only. **Switching between them is one declaration**, and
the comparison is reproducible: build the button markup against `css/components.css` in a
standalone page and override `.btn-begin`.

⚠️ **The place line could finally be `--ink-soft`.** The old rule forced it to full
`--paper` because it sat on a solid accent, where every quieter mix measured under 4.5:1.
Off the fill that constraint is gone. **Measured at rest on the paper itself — day
`rgb(239,235,225)`, night `rgb(20,19,17)`: label 15.26 / 15.37, place line 6.26 / 8.38,
ring 7.07 / 8.57.**

🔴 **AND THE THING THAT ACTUALLY SHOUTS ON A RETURN VISIT WAS `.toast`.** A near-black
rectangle that slides in over the paper carrying a *second* Resume button a few inches under
the first one. **Every other control was moved off `--ink` over the last two rounds; this one
was missed because it only ever appears to a reader who has been here before.** It is paper
now with the accent rule down its left edge — the same object the five-minute card is, at a
smaller size.

🛑 **Its hard-coded whites had to go with it.** `rgba(255,255,255,.35)` on an `--ink` ground
is invisible reasoning in night mode, where `--ink` **is** near-white: the toast would have
drawn white on white. ⚠️ **And its buttons were 34px** — under the 44px minimum, on the one
control a returning reader on a phone is most likely to reach for.

## 7.2 ✉️ A SHARED PASSAGE NOW CARRIES THE MOMENT, NOT ONLY THE PLACE

`/c/07/?p=ch07-p107` **→** `/c/07/?p=ch07-p107&t=17m55s`. The recipient still gets the
chapter's own unfurl card and still lands on the exact sentence — **and the tape is already
wound to it.** One press and they hear it read.

🛑 **THE CUE IS FETCHED WHEN THE PILL IS RAISED, NOT WHEN IT IS PRESSED, AND THAT IS NOT A
PERFORMANCE CHOICE.** `navigator.share()` must be called **synchronously inside the user
gesture** or iOS refuses it outright — an `await` between the tap and the call is the single
most common way this API is broken. So the network happens on `mouseup`, seconds before
anyone can press anything, and `send()` stays synchronous. **A miss is survivable: no cue,
no `&t=`, and the link still lands on the paragraph.**

🛑 **The seek is one second early, on purpose** — the same ruling as the second door's
`href` in §0.2. A seek that lands milliseconds late clips the first consonant of the first
word. `tools/gen-chapter-stubs.py` forwards the parameter and validates it.

## 7.3 🔴 THE PILL WOULD NOT GO AWAY, AND THE CAUSE WAS ITS OWN LISTENER

**The author: "shared passage butto thing doesnt leave once you click it which is weird."**

**Exactly right.** Pressing the pill is a `mouseup` on the document like any other, and the
selection is still standing when it fires — so `hide()` ran on the click and `show()` put the
pill straight back one tick later, **in the same place**. It looked like a button refusing to
close.

**Two parts to the fix, and both are needed:** the `mouseup`/`touchend` handlers now ignore
anything originating inside `.quote-pill`, and a completed send calls `finish()`, which drops
the selection as well as the pill. **With no selection there is nothing for `show()` to
raise** — that is what makes it stay gone. ✅ Verified end to end: raised, pressed, clipboard
captured with the `&t=` in it, `Copied` shown for 1.8s, then hidden and **still hidden**.

## 7.4 🎵 EIGHTEEN SECONDS OF MUSIC BETWEEN CHAPTERS — MEASURED, THEN HALVED

**The author asked whether the audio had been touched. It had not, and it still has not** —
no audio, cue or manifest file has been modified in any commit this round. **But the question
was worth measuring, and the measurement corrected the note in §5.5.**

**From `content/audio-manifest.js`, identical on all ten chapters:**

| | |
|---|---|
| `musicOffset` — music before the voice | **6.00s** |
| `musicDur − voiceDur − musicOffset` — music after it | **12.00s** |

**`ended` fires at the end of the FILE, so the tail is never clipped** — v58's worry was
pointed the wrong way. **What it actually produced was 12s of outro followed immediately by
6s of intro: eighteen seconds of music between two chapters**, plus load time. On a phone in
a car that does not read as a track break, it reads as the app having stopped.

⭐ **The lead-in exists to OPEN a chapter somebody chose. Nothing needs opening on an
auto-advance — the music is already playing.** `loadChapter` takes `skipIntro` and the
`ended` handler is the only caller that passes it, so **a chapter the reader picks still gets
its full opening.** 18s → 12s.

## 7.5 ⬜ THE EXCERPT QUESTION, ANSWERED WITH THE CLOCK — still the author's call

**He asked why the card cannot quote Hannah while the audio starts at Absalom, "cause they
conenct haha."** ⭐ **He is right that they connect, and more literally than he knew:**
`ch07-p138` is *"The appointment is still on the books"* at **22:46** and `ch07-p139` is
*"My sister Hannah moved to heaven when she was twenty"* at **22:49**. **The two scenes are
consecutive paragraphs.** The five minutes stop three seconds short of her.

**Measured forward from `17:55` against `cues/ch07.json`:**

| stop | ends on | length |
|---|---|---|
| `22:46` | "The appointment is still on the books." | **4:51** — what ships |
| `26:19` | "He answered it wet." | **8:24** |
| `26:48` | "As tears." | **8:53** |

🛑 **So including Hannah costs nearly nine minutes, and "five minutes" is the most persuasive
line on the card.** But the reverse is cheap: **starting AT Hannah, `22:49` → `26:32`, is
3m43s** — a self-contained scene with its own ending, and it is the author's own life.

**Recommendation, in `docs/DECISIONS.md §B.2`: two doors, in two places.** Absalom stays on
the jacket as the argument; Hannah gets her own door elsewhere as the testimony. They do not
compete because they are never on the same screen — **and they are consecutive, so nothing
is skipped between them.** 🛑 **Nothing has moved. §0.1 stands: the `href` does not change
without his word.**

**Checked, and neither is a better door:** chapter IX's mirror-and-*hilasterion* passage is
the densest theology in the book and needs runway; chapter X's closing prayer is the
destination, and showing it to a stranger spends the whole book. **Chapter VII is where the
argument lands, which is why it has now been chosen three times.**

## 7.6 How v60 was verified

**Same-origin harness, `* { transition: none !important }` before every state change.**
No console errors; **no document or nav overflow and no control under 44px at 320 / 360 /
380 / 402 / 480 / 640 / 768 / 900 / 901 / 940 / 941 / 1024 / 1280 / 1440 / 1920**; both
contrast sets composited over real paper in both themes; the share pill driven click-through
with the clipboard intercepted and the resulting URL read back.
