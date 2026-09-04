# 🚪 THE FRONT DOOR

**What the top of the site does, why it does it, and what is next.**
Shipped as **v53**, 2026-09-04, live on `main`. **v54 — The Plates, §2 — is BUILT AND
COMMITTED BUT NOT PUSHED**, at the author's instruction: *"don't send to site just build."*

> This file is **hand-written and permanent**. `README.md` describes the repo;
> this describes the one screen a stranger actually sees.

---

# 0 · 🔴 THE SECOND DOOR — it starts on David now

## 0.1 The target, and it is the author's

**`ch07-p107`. He chose it by text, and he said it twice in one message:**

> *"David forgave his son and went on hiding his face for two years, because a hurt
> human heart can hide indefinitely."*

| | |
|---|---|
| block id | `ch07-p107` |
| cue | **`17:56.320`** — `cues/ch07.json` |
| href | **`?t=ch07:17m55s`** |
| source line | `content/chapters.js`, and upstream `panim-book/chapters/07-the-glory-backs-out.md` |

🛑 **THE HREF IS ONE SECOND EARLY ON PURPOSE. Do not "correct" it to `17m56s`.**
A seek that lands a few milliseconds late clips the **D** of *David*, and the one second
of lead-in is the tail of `ch07-p106` — *"…forgiveness that never reaches the wound."* —
which is a complete clause and a better cold open than a hard cut.

⚠️ **IT REPLACED `24m35s`**, which opened on *"Jesus, do You love me?"*. That was a good
passage. This is **the author's** passage. **When the two disagree the author wins.**

## 0.2 ⭐ Four minutes, and four is the honest number

**The old copy said two.** Measured forward from `17:55` against `cues/ch07.json`:

| from start | what you hear |
|---:|---|
| `+1s` | **David forgave his son…** *a hurt human heart can hide indefinitely* |
| `+10s` | **God's cannot.** |
| `+14s` | the story Jesus told because He was accused of eating with the wrong people |
| `+34s` | *the younger son is still a long way off when the father sees him* |
| `+83s` | the father leaves his own feast and goes out to the door |
| **`+94s`** | ⭐ **"David waited two years for Absalom. This father would not wait through dinner."** — the two halves closing on each other |
| `+110s` | Elijah, off Carmel, forty days to Horeb |
| `+162s` | the wind, the earthquake, the fire — *He is not in* any of them |
| `+188s` | *qol demamah daqqah* |
| **`+236s`** | 🛑 **"He knows exactly Who is in the thin silence."** |

**That last line is where four minutes lands, and it is an ending.** Three stories,
one argument, and it closes itself. **"Two minutes" undersold a passage twice that long.**

⚠️ **If the copy ever moves off "about 4 minutes", re-derive it from this table.** The
runtime on the card is a promise about a stranger's evening — it is the only number on
the front page and it must not be decorative.

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

🛑 **IT IS STILL AN `<a>` WITH THE REAL DEEP LINK, AND THAT IS NOT AN OVERSIGHT.**
The `href` is what makes it **copyable, right-clickable, shareable, and the no-JS path.**
Do not "simplify" it to a `<button>`.

⚠️ **IT MUST NOT OUTRANK "Begin listening", AND THE THING THAT KEEPS IT IN ITS PLACE IS
FILL.** `.btn-solid` is a solid slab of `--ink`; this is a wash inside a hairline. **A ring
reads as *optional, and worth it*. A filled slab reads as *the thing*.** If anyone ever
fills this card, the hierarchy inverts and the book stops being the first thing offered.

**Tokens, all inherited, none invented:** `--control-edge` `--control-wash` `--accent`
`--ink` `--ink-faint` `--ui` `--ap-md` `--dur-fast` `--ease`.

⭐ **`--control-edge`, NOT `--rule-strong`, and the distinction is the one `css/site.css`
already draws in its token block.** This is shaped like a card but it **is a control** —
the whole rectangle is one link — so WCAG 2.2 SC 1.4.11 wants **3:1** on its boundary.
Measured against this section's paper `#EFEBE1`:

| token | composited | ratio | |
|---|---|---:|---|
| `--rule-strong` (.28) | `#B3AFA6` | **1.84:1** | 🛑 fails |
| `--control-edge` (.50) | `#848078` | **3.30:1** | ✅ passes |

**Every text pair on the card was measured, alpha composited, not eyeballed:**

| | ratio | |
|---|---:|---|
| eyebrow `--accent` on card | 6.67:1 | ✅ |
| title `--ink` on card | 14.39:1 | ✅ |
| meta `--ink-faint` on card | 4.63:1 | ✅ |
| note `--ink-faint` on paper | 4.91:1 | ✅ |

**The ring draws itself once,** 900ms, `both` fill, and is then finished forever.
🛑 **No pulse, no loop, no glow.** Self-drawing hairlines are already this book's motion
language (`.hairline.is-drawn`) — **this inherits it rather than inventing a gesture.**
Under `prefers-reduced-motion` the ring is simply already drawn.

## 0.4 🔴 THE "GLITCH" WAS A FULL PAGE RELOAD

**This is the fault the author felt and could not name.**

`<a href="?t=…">` is **a real navigation.** A tap on the old link:

1. tore the document down,
2. refetched **seventeen scripts**, including **363KB of `content/chapters.js`**,
3. re-rendered **all ten chapters** and the whole apparatus,
4. and then **did not play** — `maybeDeepLink()` in `js/player.js` passes `seekTo`
   **with no `autoplay`**, and even if it did, **the user gesture that permits playback
   died with the document.**

**Two seconds of white, and then silence.** That is not a glitch, it is a broken button.

✅ **`js/ui.js` now intercepts a plain left click** and dispatches `panim:listen-chapter` —
**the exact path `js/sync.js` already uses for tap-to-listen.** Follow on, one event,
player seeks and plays **inside the gesture**.

⚠️ **A MODIFIED CLICK MUST STILL NAVIGATE.** `⌘`/`ctrl`/`shift`/`alt`/middle-click fall
through untouched so "open in new tab" keeps working. That test is not optional politeness;
removing it breaks the shareability the `<a>` exists for.

## 0.5 ⭐ Tap-to-listen finally has a sentence

**The feature has existed since `js/sync.js` and nothing on the site ever said so.**
The affordance is a hairline in the margin on hover (`css/polish.css`) — correct,
restrained, and **completely invisible on a phone, which has no hover at all.**

> Click any line in the book to hear it read from there.

🛑 **It is hidden until the feature is actually on.** `js/sync.js` sets
`.can-tap-to-listen` on `<html>` only where a pointer exists; a keyboard-only session
never binds the handler. **A promise the page cannot keep is worse than no promise.**
The **Click / Tap** swap is `@media (hover: hover)` — **never tell a phone to click.**

## 0.6 "free · no account" is out of the invitation

**The author:** *"delete the no account from the intro section and the free thing thats weird."*

| was | is |
|---|---|
| `Ten chapters · free · no account · your place is saved` | `Ten chapters · your place is saved` |

**He is right about why.** Those two are **SaaS pricing chrome.** They answer an objection
nobody standing in a doorway has yet — **and answering it plants it.** The runtime came out
of this same line on 2026-09-03 for the same reason. **Do not put any of the three back.**

⚠️ **`.hero-meta` still reads "Read and listen, free"** and was left alone, because there
it is a sentence rather than a feature bullet. **If he meant that one too, it is one line.**

---

# 1 · ⚡ SPEED — what was actually wrong

## 1.1 🔴 `--paper` was re-styling the whole book, sixty times a second

**`--paper` is inherited.** `js/motion.js` writes it on `<html>` as the dawn-arc paper
stock lerps between chapters — so **every step of that lerp re-resolved style for all
7,500 nodes of a 254,000px document.**

⭐ **Measured on the live page, headless Chrome, 900×800:**

| | before | after | |
|---|---:|---:|---|
| full relayout | `0.65ms` | **`0.04ms`** | **16×** |
| one `--paper` write | `35.41ms` | **`3.69ms`** | **10×** |

**35ms is two and a half dropped frames**, and the arc changes stock roughly **every
3,000px of scroll** — so that was a visible hitch a few times per chapter, forever.

**The fix is `content-visibility: auto`** on the nine chapter sections and the five
apparatus sections.

🛑 **`contain-intrinsic-size` IS MEASURED PER SECTION, AND THAT IS THE WHOLE TRICK.**
A wrong estimate is **not a rendering bug, it is a scroll bug**: the scrollbar lies,
`#ch07` lands in the wrong paragraph, and `js/motion.js` measures its section table
against fiction. The two sets in `css/site.css` are the **real `offsetHeight` of every
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

**`js/render.js mountHero()` builds the `<picture>` from `content/images.js`** — so the
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

| | what it was | what it is |
|---|---|---|
| **root custom props** | `--accent`, `--paper`, `--ink` written every frame | compare-then-write. `--accent` changes **three times in the book** |
| **plate parallax** | `getBoundingClientRect()` → `style.transform` → next rect, interleaved | **read pass, then write pass.** Never put a style write above a rect read in that function |
| **running head** | two `querySelectorAll` + class toggles across ~24 anchors, every frame | class sweep **on chapter change** (12× per book); progress is two property writes |

⚠️ The nav caches are **invalidated, not assumed** — `js/ui.js` builds `#nav-chapters` and
the `#nav-toc` panel, and an empty list must never become permanent.

## 1.4 Load, measured

| | |
|---|---|
| DOMContentLoaded | **389 / 423 / 475 ms** across three cold runs |
| load | **455 / 541 / 559 ms** |
| hero request starts | **~50ms** |

## 1.5 🛑 WHAT COULD **NOT** BE VERIFIED, AND MUST BE CHECKED IN A REAL BROWSER

**Headless Chrome cannot scroll an iframe and will not paint a deep-scrolled screenshot.**
Both were tried; both came back silently wrong (`scrollY` stayed `0`; the `#ch07`
screenshot was a blank sheet of paper). **See `panim-book/handoffs/` on headless false
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

# 2 · 🖼 THE PLATES — built, v54, not pushed

**The author, after sending `awwwards.com/inspiration/list-transition-mario-roudil`:**
*"gameplan the picture layout on the open, a presentation always showing all, maybe like
a table of contents it would look sick"* — then *"just do whatever's gonna look good…
super captivating, do not bloat, impress me… don't send to site just build."*

**It is a contact sheet.** Ten frames in one strip, under the jacket and above the
contents. `#plates` in `index.html`'s `#chapters-root`, rendered by
`js/render.js renderPlateIndex()`, styled in `css/components.css`.

```
THE PLATES
┌──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┐
│      │      │      │      │      │      │      │      │      │      │
│  ▓▓  │  ▓▓  │  ▓▓  │  ▓▓  │  ▓▓  │  ▓▓  │  ▓▓  │  ▓▓  │  ▓▓  │  ▓▓  │
│      │      │      │      │      │      │      │      │      │      │
├──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┤
   I      II     III    IV     V      VI    VII    VIII    IX     X

                    ── pointer over VII ──
┌──┬──┬──┬──┬──┬──┬────────────────────┬──┬──┬──┐
│  │  │  │  │  │  │                    │  │  │  │
│▓▓│▓▓│▓▓│▓▓│▓▓│▓▓│  The Glory Backs Out│▓▓│▓▓│▓▓│
│  │  │  │  │  │  │  37 MIN             │  │  │  │
└──┴──┴──┴──┴──┴──┴────────────────────┴──┴──┴──┘
```

## 2.1 🛑 Why it is NOT inside `#contents` — two rulings

**A plate grid bolted into the contents would have broken one ruling and silently
reversed another.**

| ruling | where it lives |
|---|---|
| *"Rows are separated by rules, not cards — **a card grid would be the exact generic pattern this rebuild exists to avoid**"* | `css/components.css`, the contents block |
| *"It **ALWAYS STARTS CLOSED**, and the choice is **deliberately not remembered**"* — the author, 2026-09-03, because the book is shared by link to first-time readers and the first screen has one job | `js/ui.js wireContentsToggle()` |

**So this sits above the contents and touches neither.** `#contents` still opens closed,
still has no pictures in it, still separates its rows with rules.

⚠️ **The 2026-08-28 objection was to ~700px of text index between the jacket and chapter I.**
**This section is `391px` tall, measured** — and it is pictures, not an index.

## 2.2 What makes it not a template

**A proof sheet is a book object.** The whole design follows from that and from nothing
on Dribbble:

* **No card, no radius, no shadow, and — the one that matters — no `gap`.** The cells
  share a **1px hairline of `--rule`**, which is how a contact sheet is ruled. `gap`
  would have left paper between ten floating pictures and made it a card row.
* **The numeral is captioned UNDER the frame, on paper, never over the picture.**
  ⚠️ v49 deliberately took roman numerals **off** the artwork files; this keeps them off.
  It is a caption in the UI layer — the same call the chapter openings and the running
  head already make. Literata, not a UI font, because a chapter numeral is furniture of
  the book.
* **The only thing that moves is the width of the frame the pointer is over.** No pulse,
  no loop, no ken-burns.
* **One once-only entrance**: the images rise from `translateY(101%)` inside their frames,
  staggered `55ms` off `--i`, fired by **`js/motion.js`'s existing `.reveal` observer** —
  no new observer, no new machinery. Same gesture as `.hairline.is-drawn` and the Hebrew
  watermark: it happens on arrival and is then finished forever.

## 2.3 ⚠️ The expansion is `flex-grow`, which is a layout animation

**That is affordable HERE and nowhere else, and the reasons are specific:** ten flex
children in **one row**, **no text reflow inside them** (`.pl-caption` is absolutely
positioned, so widening a cell never re-wraps a line), and it only runs while a pointer
is actually over the strip. **Do not copy this technique into the book itself.**

Hovered cell `flex-grow: 2.6`, the other nine `.78` → the open frame takes **~27%** of the
strip, the rest **~8%** each.

## 2.4 The phone gets a different, better shape

🛑 **Ten cells across a 402px phone is 40px each — not a picture, and not a 44px target.**
Under `900px`, or wherever `(hover: none)`, the strip becomes **a scroll-snapped filmstrip
with the captions already showing**, because there is no hover to reveal them with.
**Still all ten, still one object, still swipeable.** Verified at 402px.

## 2.5 ⭐ The cost, measured — and one false alarm caught

**A/B on a real clock, two cold runs each, same machine and window:**

| | DCL | load | transferred |
|---|---:|---:|---:|
| **with the strip** | 339 / 352ms | 351 / 362ms | **1455KB** |
| without (v53, live) | 340 / 297ms | 369 / 328ms | 1346KB |

**DCL is noise. There is no measurable load regression.**
**+109KB observed** at a 900×900 window — five of the ten images lazy-load in, the rest
wait for the scroll. **+179KB** if a reader looks at the whole strip. They are the **same
AVIF derivatives `content/derivatives.js` already carries** for the chapter openings, at
`640w`, all `loading="lazy"`, all below the fold. **Nothing was added to the critical path
and no new image files exist.**

🛑 **A FALSE ALARM, CAUGHT BEFORE IT WAS REPORTED — read this before trusting a byte count.**
Under `--virtual-time-budget`, the harness showed **all 15 chapter plates loading at first
paint, 488KB**, which looks exactly like a serious pre-existing bloat bug. **It is the
harness.** Virtual time defeats Chrome's lazy-load heuristic — it loads every lazy image so
a screenshot is not blank. **On a real clock, zero chapter plates load.** Same family as
the iframe-scroll and blank-screenshot traps in §1.5. **Measure bytes with
`--remote-debugging-port`, never with `--virtual-time-budget`.**

## 2.6 The plate is each chapter's own opening frame

Read from `blocks[0].slot` — **the same block `renderChapter()` consumes** — so the strip
can never drift from the picture at the top of the chapter it links to.
`ch01-tomb · ch02-trees · ch03-mountain · ch04-river · ch05-bush · ch06-shine ·
ch07-gate · ch08-flint · ch09-emmaus · ch10-morning`.

⚠️ **A chapter whose first block is not a slot gets a typographic cell** — title on
`--control-wash`, caption static, **no placeholder and no grey box.** Empty slots render
nothing everywhere else on this site and they render nothing here.

## 2.7 Accessibility

* **`.pl-caption` is `aria-hidden`**, and the `.visually-hidden` span is why: both say the
  chapter title, and without it a screen reader announces every title **twice**. The
  hidden one wins because it carries *"Chapter VII"* and the visible one does not.
* **`alt=""` on the strip images on purpose** — the link text already names the target.
  The descriptive alt lives on the plate at the chapter opening, where the picture is the
  content rather than the label.
* **`:focus-visible` expands the cell exactly as hover does**, so the keyboard path shows
  the same information as the pointer path.
* **The scrim is sized for the worst case.** White on the `.70` stop composited over a
  white sky is **7.4:1**; over anything darker it only improves. 🛑 **Do not thin it to
  "let the picture through" — that trades a WCAG pass for nothing.**

## 2.8 ⚠️ Still unverified, same reason as §1.5

**Hover was verified by injecting the hover styles and screenshotting**, not by a real
pointer — headless has no cursor. **The 420ms expansion needs one pass with a real mouse**,
and the scroll-snap needs one real thumb.

## 2.9 Open, for him

* **Is `The Plates` the right label**, or should it have none at all?
* **Should the strip bleed to the window edges** instead of sitting on the text grid? It
  currently aligns to the page margin, which reads as *on the page*; full-bleed would echo
  the hero above it.
* **Should tapping a cell jump to the chapter (now) or start playing it?**

---

# 3 · Where things live

| | |
|---|---|
| the card | `index.html` `a#hero-sample` · `css/site.css` `.hero-sample` |
| the intercept | `js/ui.js`, in `wireListenButtons()` |
| the deep-link parser | `js/player.js` `maybeDeepLink()` |
| tap-to-listen | `js/sync.js` `onBlockClick()` · `css/polish.css` |
| the dawn arc | `js/motion.js` `onScrollFrame()` |
| `content-visibility` | `css/site.css`, immediately under `.section` |
| cue times | `cues/ch07.json` |
| chapter text | `content/chapters.js` — **generated. Never hand-edit.** |

## 3.1 ⚠️ FOUR PLACES MOVE ON A VERSION BUMP

**`sw.js` says so in its own comments and it was still half-done when v53 started:**
`404.html` and `accessibility.html` were **on `?v=50`** while everything else was on 52.

1. `SHELL` in `sw.js`
2. `ASSET_V` in `sw.js`
3. every `?v=` in `index.html`
4. **the `?v=` on `fonts.css` in `404.html` AND `accessibility.html`** ← the one that rots

**All four are on `53`.**
