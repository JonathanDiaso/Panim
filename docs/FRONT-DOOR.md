# 🚪 THE FRONT DOOR

**What the top of the site does, why it does it, and what is next.**
**v55 is LIVE on `main`**, 2026-09-04 — the plates are a ribbon. The author: *"go ahead
and push and we can fix later if theres an issue. make sure its pristene. it should not
look cheap!!!!"* 🗄 v54's contact sheet, which never shipped, is at `d1dc9f9`.

> This file is **hand-written and permanent**. `README.md` describes the repo;
> this describes the one screen a stranger actually sees.

---

# 0 · 🔴 THE SECOND DOOR — it starts on David now

## 0.1 The target, and it is the author's

`ch07-p107`**. He chose it by text, and he said it twice in one message:**

> *"David forgave his son and went on hiding his face for two years, because a hurt
> human heart can hide indefinitely."*


|             |                                                                                     |
| ----------- | ----------------------------------------------------------------------------------- |
| block id    | `ch07-p107`                                                                         |
| cue         | `17:56.320` — `cues/ch07.json`                                                      |
| href        | `?t=ch07:17m55s`                                                                    |
| source line | `content/chapters.js`, and upstream `panim-book/chapters/07-the-glory-backs-out.md` |


🛑 **THE HREF IS ONE SECOND EARLY ON PURPOSE. Do not "correct" it to** `17m56s`**.**
A seek that lands a few milliseconds late clips the **D** of *David*, and the one second
of lead-in is the tail of `ch07-p106` — *"…forgiveness that never reaches the wound."* —
which is a complete clause and a better cold open than a hard cut.

⚠️ **IT REPLACED** `24m35s`, which opened on *"Jesus, do You love me?"*. That was a good
passage. This is **the author's** passage. **When the two disagree the author wins.**

## 0.2 ⭐ Four minutes, and four is the honest number

**The old copy said two.** Measured forward from `17:55` against `cues/ch07.json`:


| from start | what you hear                                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `+1s`      | **David forgave his son…** *a hurt human heart can hide indefinitely*                                                         |
| `+10s`     | **God's cannot.**                                                                                                             |
| `+14s`     | the story Jesus told because He was accused of eating with the wrong people                                                   |
| `+34s`     | *the younger son is still a long way off when the father sees him*                                                            |
| `+83s`     | the father leaves his own feast and goes out to the door                                                                      |
| `+94s`     | ⭐ **"David waited two years for Absalom. This father would not wait through dinner."** — the two halves closing on each other |
| `+110s`    | Elijah, off Carmel, forty days to Horeb                                                                                       |
| `+162s`    | the wind, the earthquake, the fire — *He is not in* any of them                                                               |
| `+188s`    | *qol demamah daqqah*                                                                                                          |
| `+236s`    | 🛑 **"He knows exactly Who is in the thin silence."**                                                                         |


**That last line is where four minutes lands, and it is an ending.** Three stories,
one argument, and it closes itself. **"Two minutes" undersold a passage twice that long.**

⚠️ **If the copy ever moves off "about 4 minutes", re-derive it from this table.** The runtime on the card is a promise about a stranger's evening — it is the only number on the front page and it must not be decorative. it might take more than 4 min to get to the hannahs story... not sure can we have something that says click on any paragraph after that first button? or non button lol

## 0.3 The card, and why it is not a button

```
┌──────────────────────────────────────────┐
│  ╭───╮   IF YOU ONLY HAVE FOUR MINUTES   │   ← --accent, --ui, uppercase
│  │ ▶ │   The four minutes that do it     │   ← Literata, --ink
│  ╰───╯   Chapter VII · about 4 minutes   │   ← --ink-faint
└──────────────────────────────────────────┘
   Click any line in the book to hear it read from there.
```

`index.html` → `a#hero-sample` · `css/site.css` → `.hero-sample` · `js/ui.js` → the intercept

**It shipped as a ghost link on one line** — `.hero-hint`, `--ink-faint`, `opacity .72`,
an `↗` that drifted `0.18em` on hover — **sitting under two buttons that both outranked
it.** The single highest-yield action on the page was its quietest element. The author:
*"that arrow section line is way too not prominent, that should be a sexy button."*

🛑 **IT IS STILL AN** `<a>` **WITH THE REAL DEEP LINK, AND THAT IS NOT AN OVERSIGHT.**
The `href` is what makes it **copyable, right-clickable, shareable, and the no-JS path.**
Do not "simplify" it to a `<button>`.

⚠️ **IT MUST NOT OUTRANK "Begin listening", AND THE THING THAT KEEPS IT IN ITS PLACE IS
FILL.** `.btn-solid` is a solid slab of `--ink`; this is a wash inside a hairline. **A ring
reads as *optional, and worth it*. A filled slab reads as *the thing*.** If anyone ever
fills this card, the hierarchy inverts and the book stops being the first thing offered.

**Tokens, all inherited, none invented:** `--control-edge` `--control-wash` `--accent`
`--ink` `--ink-faint` `--ui` `--ap-md` `--dur-fast` `--ease`.

⭐ `--control-edge`**, NOT** `--rule-strong`**, and the distinction is the one** `css/site.css`
**already draws in its token block.** This is shaped like a card but it **is a control** —
the whole rectangle is one link — so WCAG 2.2 SC 1.4.11 wants **3:1** on its boundary.
Measured against this section's paper `#EFEBE1`:


| token                  | composited | ratio      |          |
| ---------------------- | ---------- | ---------- | -------- |
| `--rule-strong` (.28)  | `#B3AFA6`  | **1.84:1** | 🛑 fails |
| `--control-edge` (.50) | `#848078`  | **3.30:1** | ✅ passes |


**Every text pair on the card was measured, alpha composited, not eyeballed:**


|                             | ratio   |     |
| --------------------------- | ------- | --- |
| eyebrow `--accent` on card  | 6.67:1  | ✅   |
| title `--ink` on card       | 14.39:1 | ✅   |
| meta `--ink-faint` on card  | 4.63:1  | ✅   |
| note `--ink-faint` on paper | 4.91:1  | ✅   |


**The ring draws itself once,** 900ms, `both` fill, and is then finished forever.
🛑 **No pulse, no loop, no glow.** Self-drawing hairlines are already this book's motion
language (`.hairline.is-drawn`) — **this inherits it rather than inventing a gesture.**
Under `prefers-reduced-motion` the ring is simply already drawn.

## 0.4 🔴 THE "GLITCH" WAS A FULL PAGE RELOAD

**This is the fault the author felt and could not name.**

`<a href="?t=…">` is **a real navigation.** A tap on the old link:

1. tore the document down,
2. refetched **seventeen scripts**, including **363KB of** `content/chapters.js`,
3. re-rendered **all ten chapters** and the whole apparatus,
4. and then **did not play** — `maybeDeepLink()` in `js/player.js` passes `seekTo`
  **with no** `autoplay`, and even if it did, **the user gesture that permits playback
   died with the document.**

**Two seconds of white, and then silence.** That is not a glitch, it is a broken button.

✅ `js/ui.js` **now intercepts a plain left click** and dispatches `panim:listen-chapter` —
**the exact path** `js/sync.js` **already uses for tap-to-listen.** Follow on, one event,
player seeks and plays **inside the gesture**.

⚠️ **A MODIFIED CLICK MUST STILL NAVIGATE.** `⌘`/`ctrl`/`shift`/`alt`/middle-click fall
through untouched so "open in new tab" keeps working. That test is not optional politeness;
removing it breaks the shareability the `<a>` exists for.



## 0.5 ⭐ Tap-to-listen finally has a sentence

**The feature has existed since** `js/sync.js` **and nothing on the site ever said so.**
The affordance is a hairline in the margin on hover (`css/polish.css`) — correct,
restrained, and **completely invisible on a phone, which has no hover at all.**

> Click any line in the book to hear it read from there.

🛑 **It is hidden until the feature is actually on.** `js/sync.js` sets
`.can-tap-to-listen` on `<html>` only where a pointer exists; a keyboard-only session
never binds the handler. **A promise the page cannot keep is worse than no promise.**
The **Click / Tap** swap is `@media (hover: hover)` — **never tell a phone to click.**

## 0.6 "free · no account" is out of the invitation

**The author:** *"delete the no account from the intro section and the free thing thats weird."*


| was                                                      | is                                   |
| -------------------------------------------------------- | ------------------------------------ |
| `Ten chapters · free · no account · your place is saved` | `Ten chapters · your place is saved` |


**He is right about why.** Those two are **SaaS pricing chrome.** They answer an objection
nobody standing in a doorway has yet — **and answering it plants it.** The runtime came out
of this same line on 2026-09-03 for the same reason. **Do not put any of the three back.**

⚠️ `.hero-meta` **still reads "Read and listen, free"** and was left alone, because there
it is a sentence rather than a feature bullet. **If he meant that one too, it is one line.**

---



# 1 · ⚡ SPEED — what was actually wrong



## 1.1 🔴 `--paper` was re-styling the whole book, sixty times a second

`--paper` **is inherited.** `js/motion.js` writes it on `<html>` as the dawn-arc paper
stock lerps between chapters — so **every step of that lerp re-resolved style for all
7,500 nodes of a 254,000px document.**

⭐ **Measured on the live page, headless Chrome, 900×800:**


|                     | before    | after    |         |
| ------------------- | --------- | -------- | ------- |
| full relayout       | `0.65ms`  | `0.04ms` | **16×** |
| one `--paper` write | `35.41ms` | `3.69ms` | **10×** |


**35ms is two and a half dropped frames**, and the arc changes stock roughly **every
3,000px of scroll** — so that was a visible hitch a few times per chapter, forever.

**The fix is** `content-visibility: auto` on the nine chapter sections and the five
apparatus sections.

🛑 `contain-intrinsic-size` **IS MEASURED PER SECTION, AND THAT IS THE WHOLE TRICK.**
A wrong estimate is **not a rendering bug, it is a scroll bug**: the scrollbar lies,
`#ch07` lands in the wrong paragraph, and `js/motion.js` measures its section table
against fiction. The two sets in `css/site.css` are the **real** `offsetHeight` **of every
section at 1440px and at 402px**, read off the live page. The `auto` keyword replaces the
estimate with the true height the moment a section renders once, **so the fallback only
has to be right for the first jump.** Measured error: **+0.55% at 402px, +0.73% at 1440px**
across the whole book.

⚠️ **RE-MEASURE THESE WHENEVER THE TEXT CHANGES LENGTH. There is no generator yet.**
The numbers were read with, in each of two viewport widths:

```js
document.querySelectorAll('.section[data-ch], #lexicon,#thread,#scripture,#names,#sources')
  .forEach(s => console.log(s.id || 'ch'+s.dataset.ch, s.offsetHeight))
```

⚠️ **TWO SECTIONS ARE EXCLUDED ON PURPOSE.** `[data-ch="0"]` is the hero — the LCP
element, on screen at zero scroll, so skipping it **costs** paint. `[data-ch="fw"]` is
the five-words ending: 500px whose whole point is a word-by-word `IntersectionObserver`
reveal, **too small to be worth skipping and too choreographed to risk.**

## 1.2 The LCP image is preloaded

`js/render.js mountHero()` **builds the** `<picture>` **from** `content/images.js` — so the
preload scanner **cannot see the opening photograph**, and it was not even requested until
seventeen scripts had downloaded and run.

`index.html` now preloads the same three AVIF derivatives with the same `sizes`.
Measured: **hero request starts at ~50ms** instead of after the script chain.

🛑 **THREE THINGS MOVE TOGETHER.** `art/d/hero-*.avif`, `content/derivatives.js["hero"]`,
and `PLATE_SIZES` in `js/render.js`. If the preload picks a different file from the one
`<picture>` asks for, **the browser downloads the hero twice.**
`type="image/avif"` makes a browser without AVIF skip the line and fall back to
`art/hero.webp` exactly as before.

## 1.3 Three smaller ones in `js/motion.js`


|                       | what it was                                                            | what it is                                                                                 |
| --------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **root custom props** | `--accent`, `--paper`, `--ink` written every frame                     | compare-then-write. `--accent` changes **three times in the book**                         |
| **plate parallax**    | `getBoundingClientRect()` → `style.transform` → next rect, interleaved | **read pass, then write pass.** Never put a style write above a rect read in that function |
| **running head**      | two `querySelectorAll` + class toggles across ~24 anchors, every frame | class sweep **on chapter change** (12× per book); progress is two property writes          |


⚠️ The nav caches are **invalidated, not assumed** — `js/ui.js` builds `#nav-chapters` and
the `#nav-toc` panel, and an empty list must never become permanent.

## 1.4 Load, measured


|                     |                                               |
| ------------------- | --------------------------------------------- |
| DOMContentLoaded    | **389 / 423 / 475 ms** across three cold runs |
| load                | **455 / 541 / 559 ms**                        |
| hero request starts | **~50ms**                                     |




## 1.5 🛑 WHAT COULD **NOT** BE VERIFIED, AND MUST BE CHECKED IN A REAL BROWSER

**Headless Chrome cannot scroll an iframe and will not paint a deep-scrolled screenshot.**
Both were tried; both came back silently wrong (`scrollY` stayed `0`; the `#ch07`
screenshot was a blank sheet of paper). **See** `panim-book/handoffs/` **on headless false
faults — this is the same family.**

**So these three are UNVERIFIED and want one pass on a real phone and a real desktop:**

1. 🔴 **Anchor landing.** Open `#ch07` and `#ch10` cold. **Does the chapter header land
  under the running head, or does the page settle a few hundred pixels off as the
   sections above render?** This is the one real regression risk of §1.1.
2. **Scroll feel through a chapter boundary** — the hitch §1.1 fixes is the thing to feel for.
3. **The lexicon wall's first-arrival ink** (`js/ui.js wireLexiconWall`). It has a 15s
  backstop, but the observer now fires on a `content-visibility` section.

**If (1) is wrong, the fix is better numbers, not reverting** — but reverting is one
selector if it needs to happen fast.

---



# 2 · 🖼 THE PLATES — the ribbon, v55, LIVE

**Pushed 2026-09-04 on the author's word**, after two rounds of his notes: the shape of the
photographs, then *"can we have motion...... paralex something"* and *"random unnecessary
numerals"*, then *"make sure its pristene. it should not look cheap!!!!"*

**The author, 2026-09-04, on the versions before this one:**

> *"the shape of the photos doesnt fit the photos that well and i think you can do better…
> i thought it would also look a little like the list… the ribbon that you created is
> really exciting to me as well. it's beautiful and i can really connect with it. it's a
> more fun version of table of contents maybe if we got the pic sizes right."*

## 2.1 🔴 THE SHAPE COMPLAINT WAS ARITHMETIC, NOT TASTE

**Every one of the ten plates is** `1408 × 768` **— 1.833:1, wide landscape.** Measured in a
real browser, this is how much of each photograph each version was actually showing:

| version | frame ratio | shows |
|---|---|---|
| `lab/turn.html` at 402 (the flip cards, on a phone) | `0.506` | **28%** |
| `lab/turn.html` at 1440 | `0.637` | 35% |
| `lab/plates.html` **B**, the 2:3 ribbon | `0.667` | 36% |
| `lab/plates.html` **D**, the 3:4 wall | `0.750` | 41% |
| **v54, the 3:2 proof sheet — what is committed and unpushed** | `1.500` | 82% |
| `lab/plates.html` **C**, the 16:9 list | `1.778` | ✅ 97% |

**The turn was throwing away three quarters of every plate and then asking him to admire
it.** 🛑 **And this is also why he kept saying it should look "a little like the list" — the
list was the only one that was showing him the pictures.**

⭐ **The frame is now** `11 / 6` **— 1408:768 reduced — so the strip shows the whole width of
the negative.** About **9% comes off the height** to buy the drift, and §2.4 says why. Nine
percent off the height of a landscape frame is a trim; 72% off the width was not.

## 2.2 What it is

**A ribbon.** One row of large landscape plates that travels sideways on a native scroller,
bleeding to the window edges. Under each frame, the **list's own grammar** — numeral, title,
runtime. Under the whole strip, **one caption printing the hook of whichever chapter the
ribbon is holding**, and then **the arc**: ten stops in the chapters' own paper stock, night
on the left and full morning on the right.

```
── bleeds to the window ────────────────────────────────────────────────
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌────
│                  │  │                  │  │                  │  │
│   ch01-tomb      │  │   ch02-trees     │  │   ch03-mountain  │  │  ch04
│                  │  │                  │  │                  │  │
└──────────────────┘  └──────────────────┘  └──────────────────┘  └────
 I  The God Who Sees   II  The Hiding        III The Face They Fled
             22 MIN            24 MIN                27 MIN

 Two small silver scrolls, a blessing about a face, and the oldest
 words of the Bible anyone has ever found.

 ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁
  I   II  III  IV   V   VI  VII VIII IX   X     ← each in its own paper stock
```

`js/render.js renderPlateIndex()` · `css/components.css` "THE PLATES — the ribbon" ·
`js/ui.js wirePlateRibbon()`

## 2.3 🛑 IT DOES NOT PIN, AND THAT IS A RULING RATHER THAN A PREFERENCE

**The pinned version — concept B — spent** `340vh` **of page height, about 2,700px, before
chapter I.** The standing objection of 2026-08-28 was to **~700px** of text index in that
same gap. **The pin was four times the thing already ruled against**, and it scroll-jacks,
which is the one scrolling pattern the accessibility guidance is unanimous about.

⭐ **The travel is the reader's own thumb on a native scroller instead.** `overflow-x` plus
`scroll-snap-type: x mandatory` has been Baseline since 2019 — about 97% of traffic — and it
brings momentum, rubber-banding, trackpad gestures, keyboard scrolling and screen-reader
scroll-into-view with it. **Nothing here re-implements a carousel.**

## 2.4 The motion, and what runs it

**Two scroll-linked motions, one for each axis, and they answer different scrolls.**

| | |
|---|---|
| **the drift** — the rail's own scroll | every picture counter-travels **±4% of its frame** as its plate crosses the scrollport |
| **the sway** — the *page's* scroll | every plate rides a wave, **±14px at its own phase**, as the section crosses the window |
| **where they run** | `animation-timeline` on **named view timelines** — the compositor, Chrome 115+/Safari 26+, ~84% |
| **everywhere else** | two rAF handlers in `js/ui.js`, one on the rail's `scroll` and one on the window's. Firefox still has scroll-driven animations behind a flag in stable as of mid-2026 |
| **the arrival** | the site's own once-only rise, `14px`, staggered `55ms` off `--i` |
| **at rest** | nothing. No pulse, no loop, no ken-burns |

## 2.4a ⭐ THE SWAY, and why it exists

**The author, 2026-09-04:** *"can we have motion...... paralex something"*.

**He was right and the gap was obvious once named: the drift only moves when the RIBBON
does.** Scrolling the *page* past a strip that answers only to sideways swipes leaves it
dead on arrival. So the plates also ride a slow wave as the section crosses the window —
**which is concept D's "five columns at five speeds" turned on its side and given to a
row**, and concept D is the one he said looked better than the turn.

🛑 **IT MOVES THE FRAMES AND NOT THE PICTURES, AND THAT IS WHY IT IS FREE.** A vertical
drift *inside* the frame would need vertical overhang, and the only place that overhang can
come from is **a second crop of the photograph** — the one thing this whole rebuild exists
to stop. Translating the plate costs nothing but paper, which is what the rail's `2rem` of
vertical padding is for.

⚠️ **The amplitude is one cosine across the ten**, `cos(i × 1.1) × 14px`, set at render
time in `js/render.js PLATE_SWAY`. **A single constant moves all ten in lockstep**, which
reads as the whole strip sliding rather than a field of plates breathing; **ten random
numbers read as a fault.** The cosine starts at full height on plate I — the one most
readers see — and crosses zero twice on its way to X.

⚠️ **`overflow-y` is pinned to `hidden` on the rail.** An overflow value on one axis makes
the other a scroll container too; left at `auto`, a plate riding 14px high would have handed
the ribbon **its own vertical scrollbar.**

**Measured, real clock, scrolling the page past the section:** `402` median `16.7ms` /
worst `17.6`; `1440` median `16.7` / worst `19.4`; **zero frames over 33ms on either path at
either width.**

🔴 **THE TIMELINE IS DECLARED ON THE PLATE AND REFERRED TO BY NAME, AND THE OBVIOUS
`animation-timeline: view(inline)` ON THE IMAGE IS A TRAP THAT COSTS THE WHOLE EFFECT
SILENTLY.** A view timeline is measured against the subject's nearest ancestor **scroll
container** — and `.pl-frame` has `overflow: hidden`, which makes it one. So every picture
was being measured against the frame it lives in, which never scrolls. **Measured in Chrome:
all ten sat at `translate: -0.0003%` at every scroll position on the rail. No error, no
warning, no motion.** `.pl-plate` is outside the frame and inside the rail, so a timeline
declared there resolves against the thing that actually moves.

⚠️ **THE OVERHANG AND THE DRIFT ARE ONE SUM.** A translate percentage resolves against the
element, not its box: `3.7%` of a 110%-wide picture is `4.07%` of the **frame**, and the
overhang is 5% a side. The first build was 110% drifting 5% — half a percent too far — and a
pale band of bare frame appeared down the right edge of every plate.

🛑 **AND `max-width: none`, WITHOUT WHICH NONE OF IT HAPPENS.** The site-wide
`img { max-width: 100% }` silently clamps the 110% back to the frame's width. **Measured
before the fix: a 398px image in a 400px frame, and an 18px band down every plate.**

## 2.5 🔴 THE BUG THAT WOULD HAVE SHIPPED — a 1px span slid the whole page sideways

**Each plate carries a `.visually-hidden` span, which is `position: absolute`.** With the
plate `static`, that span's containing block is the **initial containing block** — and an
absolutely positioned box is clipped by an ancestor's overflow **only when that ancestor is
in its containing-block chain.**

**So ten screen-reader labels escaped the rail and pushed the DOCUMENT's scrollable width to
`2,939px` inside a `402px` viewport. The whole page slid sideways on a phone.** WCAG 1.4.10
Reflow, from a span with `width: 1px`.

⚠️ **`overflow: hidden` on the rail does NOT fix it, and that is the tell.** Only
`contain: paint` did, because it makes the rail a containing block. **The honest fix is
`position: relative` on `.pl-plate`.**

## 2.6 Measured, on a real clock, with a real pointer

**Driven with puppeteer against the live local build — not `--virtual-time-budget`, which
§1.5's family of false faults made untrustworthy, and not an iframe harness, which turned out
to fire neither `rAF` nor `scroll` events at all.**

| | 402 (touch) | 1440 |
|---|---|---|
| frame times, scrubbing the whole rail | median `16.6ms`, p95 `17.2`, worst `17.4` | median `16.7`, p95 `17.2`, worst `17.3` |
| same, on the rAF fallback path | — | median `16.6`, p95 `18.2`, worst `18.6` |
| image bytes at rest, cold | **90KB** | **115KB** |
| image bytes after seeing all ten | 136KB | 174KB |
| v54's proof sheet, at rest, for comparison | 98KB | **221KB** |

⭐ **Locked 60fps on both paths, and it is *cheaper* than v54 on a desktop, not dearer** —
the proof sheet pulled all ten plates in at rest because all ten were on screen; the ribbon
pulls the two or three that are. Same AVIF derivatives, same `loading="lazy"`, nothing new
on disk.

**Contrast, composited, every text pair in the component:**

| | size | ratio | |
|---|---|---|---|
| lit title | 19.8px | 15.26:1 | ✅ |
| dimmed title | 19.8px | 6.26:1 | ✅ |
| dimmed numeral | 13.1px | 7.07:1 | ✅ |
| runtime | 11.5px | 4.91:1 | ✅ |
| hook caption | 15.7px | 6.26:1 | ✅ |

**Touch targets:** arc stops are `131 × 48`, plates are `400 × 253`. **The arc swatch is 26px
and the button around it is 44** — the hit area is not the ink.

**Also verified:** `prefers-reduced-motion` (drift, arrival and type nudge gone; **snapping
and the lit state stay, because they are navigation and information, not motion**); keyboard
Tab through the ten with the rail following focus and the focused plate lighting; the arc
walking I→X and the caption following it at 402; no document-level horizontal scroll at 402,
768 or 1440; **zero console errors**.

## 2.7 Accessibility

- **The hidden label carries the whole name and the visible row is `aria-hidden`** — the same
  call v54's caption made, for the same reason: both say the title, and without it a screen
  reader announces every chapter twice. The hidden one wins because it carries *"Chapter
  VII"*, the runtime as a word, **and the hook**.
- `alt=""` **on the strip images on purpose.** The link text already names the target; the
  descriptive alt lives on the plate at the chapter opening.
- **The caption is `aria-hidden`** — every hook is already in its own plate's accessible
  name, and a caption that announced itself on each snap would talk over a screen-reader
  user steering the ribbon.
- 🛑 **`.is-armed` is added from script, never from the stylesheet.** A flat `opacity: 0`
  would hide all ten plates forever for anyone whose JavaScript did not run, because the
  animation that was going to bring them back is the same script. `css/site.css` already
  makes this call: `.reveal { opacity: 1 }` is its resting state.

## 2.8 The answers to §2.9's open questions

| he asked | answered |
|---|---|
| Is `The Plates` the right label? | **No label.** The heading is `.visually-hidden` — gone from the page, kept for the landmark. |
| *"random unnecessary numerals"* (2026-09-04) | **The arc's roman numerals are gone.** Every numeral on that screen was printed twice — once under its own plate, where it is the caption of a picture and a convention of this book, and once under a colour chip that already sits in chapter order. **The arc is a position and the light of the book, not a numbered list.** The name is still on the button for a screen reader. |
| Should the strip bleed to the window edges? | **Yes**, and it must: a boxed ribbon reads as a carousel widget. ⚠️ It bleeds to `--edge`, **deliberately not to `100vw`** — that trick counts the classic scrollbar and hands Windows a horizontally scrolling document, and the usual patch for *that*, `overflow-x: hidden` on `body`, would kill every `position: sticky` in this book. |
| Tap a cell: jump, or play? | **Still jump.** `href="#ch07"`. Playing from an index is a decision the reader has not made yet. |
| *"i just want it to look amazing"* | The pictures are whole, they are large, and they move. |

## 2.8a 🔴 THE PRISTINE PASS — four faults found by sweeping eleven widths

**None of these would have thrown an error and all four look almost right.**

**1 · `scroll-padding` percentages resolve against the SCROLLPORT, not the containing
block.** The rail's full-bleed sum reads `calc((100vw - var(--sbw) - 100%) / 2)`, which is
correct in `margin` and `padding` — and in `scroll-padding` that same `100%` means 100vw,
so the whole expression collapsed to **zero**. Measured: `calc(-50% + 960px)` at 1920. Every
snap landed the first plate flush against the glass and **the ribbon lost its alignment with
the text grid at every width.** `js/ui.js` now copies the browser's own resolved
`paddingLeft` into `--pl-snap` rather than re-deriving a second, differently-wrong sum.

**2 · The plates got SMALLER as the window got bigger.** `min(31vw, 400px)` is `279px` at
901 while the mobile rule it replaces caps at `340` — so dragging a window one pixel past
the breakpoint shrank every plate by 61px. **Nothing looks cheaper than a layout that goes
backwards.** It is `clamp(340px, 31vw, 400px)` now, so the two rules meet exactly at 900.

**3 · At 1920 the ribbon dead-ended in blank paper.** `.section` is capped at `--shell`
(1440px), so a rail pulled back by only `--edge` stopped 240px short of the glass and left
**a plate sliced off beside a field of empty paper** — which reads as a bug, not as a strip
continuing. The bleed is a sum now, and `100vw` alone could not do it: it counts the classic
scrollbar, so `js/ui.js` measures the scrollbar once into `--sbw`. ⚠️ Depending on script
for layout is safe **here and nowhere else**: `js/render.js` builds this entire page, so a
reader without JavaScript has no ribbon to mis-lay-out.

**4 · The caption belonged to the wrong thing.** 53px above it and 18 below meant it read as
a label for the arc rather than a caption for the picture it describes. The strip and its
caption are one block now; the space is inside it.

**Also caught: the fourth version place.** `sw.js` §3.1 names four and the first pass moved
three — `404.html` and `accessibility.html` carry their own `?v=` on `fonts.css` and are
reached by no sweep. **404.html was once left on v24 for a whole release for exactly this.**

**Swept at 360 · 402 · 430 · 600 · 768 · 900 · 901 · 1024 · 1280 · 1440 · 1920:** the frame
only ever grows, no title clips at any width, the rail bleeds to `0` at every one of them,
the first plate sits on the text grid at every one, and no width scrolls the document
sideways.

## 2.9 ⚠️ Still open

- **`lab/turn.html` is kept, not deleted.** The 3D turn is genuinely good work and its
  **paper-stock backs are what became the arc**. It is not the right object for landscape
  plates, and that is the only reason it lost.
- **`lab/ribbon.html` is the standalone of what shipped**, and it is where to iterate before
  touching `css/components.css` again. It is tracked and it is deployed — unlinked and
  `noindex`, at `/lab/ribbon.html`.
- **One real pointer and one real thumb.** Everything above was driven by puppeteer, which is
  a real browser with a synthetic cursor. **The mouse must not teleport** — a jump-move
  silently fails to fire `pointerenter`, which cost an hour before it was recognised as the
  harness rather than the page.

---

# 3 · Where things live


|                      |                                                              |
| -------------------- | ------------------------------------------------------------ |
| the card             | `index.html` `a#hero-sample` · `css/site.css` `.hero-sample` |
| the intercept        | `js/ui.js`, in `wireListenButtons()`                         |
| the deep-link parser | `js/player.js` `maybeDeepLink()`                             |
| tap-to-listen        | `js/sync.js` `onBlockClick()` · `css/polish.css`             |
| the dawn arc         | `js/motion.js` `onScrollFrame()`                             |
| `content-visibility` | `css/site.css`, immediately under `.section`                 |
| cue times            | `cues/ch07.json`                                             |
| chapter text         | `content/chapters.js` — **generated. Never hand-edit.**      |




## 3.1 ⚠️ FOUR PLACES MOVE ON A VERSION BUMP

`sw.js` **says so in its own comments and it was still half-done when v53 started:**
`404.html` and `accessibility.html` were **on** `?v=50` while everything else was on 52.

1. `SHELL` in `sw.js`
2. `ASSET_V` in `sw.js`
3. every `?v=` in `index.html`
4. **the** `?v=` **on** `fonts.css` **in** `404.html` **AND** `accessibility.html` ← the one that rots

**All four are on** `53`**.**