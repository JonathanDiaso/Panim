# 🚪 THE FRONT DOOR

**What the top of the site does, why it does it, and what is next.**
Shipped as **v53**, 2026-09-04. Live on `main`.

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

# 2 · 🎯 NEXT — the opening as an index

**The author, 2026-09-04:** *"can we do this??? on the open???? in a way that doesnt bloat
but looks epic … gameplan the picture layout on the open, a presentation always showing
all, maybe like a table of contents it would look sick."*
**Reference:** `awwwards.com/inspiration/list-transition-mario-roudil` → `marioroudil.com`

## 2.0 What the reference actually is

**Fetched, not assumed.** It is **a numbered index, not a gallery**: rows `00–33`, each
carrying **title / client / date**, with **two view modes toggling in place — "List" and
"Slider"** — plus category filters. **No page reload between states.** The effect is the
*transition between the two modes*, and the reason it reads as expensive is that **the
list never goes away and never reloads** — it re-forms.

⭐ **The important part for us is what it is NOT.** It is not a hero carousel and it is not
WebGL. **It is a table of contents that changes shape.** Which is exactly what the author
described, and **we already have the two things it needs**: ten numbered chapters with
Roman numerals and runtimes, and **ten plates that already ship** (`art/chNN-*.webp` plus
`art/d/*.avif` derivatives, and `art/np-chNN-{96,256,512}.jpg` already cut for MediaSession).

## 2.1 Three ways to do it, ranked

### ① Two-mode contents — **recommended**

**`#contents` keeps its ten rows and gains a `Plates ⇄ List` toggle.** In **Plates**, each
row's chapter art fills a cell in a ten-up grid with the numeral and title over it; in
**List**, it collapses to the typographic index that is there today. **One `<section>`, one
class on it, CSS Grid doing the shape change; the DOM never changes.**

* **Always shows all ten** — which is the author's actual ask.
* **Cost:** ~120 lines CSS, ~25 lines JS, **0 new images** (the derivatives exist).
* **Bloat:** ten AVIF at 640w ≈ **~250KB**, `loading="lazy"`, below the fold, behind
  `content-visibility`. **Nothing is added to the critical path.**
* **Blocker:** none. It is the safest of the three and the closest to the reference.

### ② Sticky preview index

**Rows on the left, one large plate on the right that cross-fades to the hovered chapter.**
The most "portfolio" of the three.

* **Cost:** ~90 lines. **Blocker:** 🛑 **hover is the whole interaction, and this book's
  readers are on phones.** Needs a separate touch design, which is really design ②b.
  **Do not ship a desktop-only front door.**

### ③ Full-bleed scroll-snap presentation

Ten viewport-height plates, snap per chapter.

* **Cost:** ~60 lines. **Blocker:** 🛑 **it does NOT always show all ten** — it shows one
  at a time, which is the opposite of what he asked for — and it puts ten full-bleed
  images between a stranger and the book. **Recommend against.**

## 2.2 🛑 Rules any of them must obey

1. **The critical path does not grow.** Everything below the fold, `loading="lazy"`,
   inside `content-visibility`. **If DCL moves, it is wrong.**
2. **No new tokens.** If the layout needs one, **stop and propose it** — that is
   `DESIGN_SYSTEM` discipline, §3 of the global rules.
3. **`prefers-reduced-motion` is a full stop, not a slower version.** The mode toggle
   still works; it just does not tween.
4. **It must not outrank the hero card.** The front door is *begin* and *four minutes*.
   **A contents that upstages both is a portfolio, not a book.**
5. **44px targets** on every row, both modes.
6. **Measure DCL and the `--paper` write before and after.** §1 is the baseline.

## 2.3 ⚠️ Open questions for the author

* **Do the plates carry their Roman numerals in the grid**, or stay clean the way the
  chapter openings do? (v49 deliberately took numerals *off* the artwork.)
* **Which mode is the default on a cold visit** — plates or list?
* **Does the toggle persist** in `localStorage` like `edition` does?

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
