# 🚪 THE FRONT DOOR

**What the top of the site does, why it does it, and what is next.**
🛑 **THE VERSION NUMBER LIVES IN `sw.js` (`SHELL` / `ASSET_V`), NEVER IN THIS PROSE.**
This header has shipped a stale number twice.
🎯 **v72 IS THE LATEST, 2026-09-09 — §16.** The site **never said the word "offline"**: with the
network gone the book reads perfectly and the play button is silence, because the audio is
saved only on request. There is now a card that says so, and — the author's better half of the
ask — it **offers the download when the connection comes back**, which is the only moment it
can be taken. Four bugs on the way, three of them older than the feature.
🎧 **v70–v71 — §15.** The **read-along mark had been invisible on 94% of
the book since the rebuild** — `.block-p.is-live` set the colour a paragraph already had — and
the **whole second audio edition was deleted** on the author's ruling, a code path pointing at
an `audio/voice/` folder that has never existed here.
🧪 **v69 — §14.** A full code and bug sweep, which came back
**clean on eleven measures at once** — no orphan CSS, no unused custom properties, no
`console.*`, no duplicate ids, no heading jumps, no horizontal overflow, no JS errors — and
turned up **two real defects, each already described in a comment sitting next to it.** The
offline precache carried the *italic* Greek pair and not the *roman* one, so six Lexicon
chips broke across two faces offline in exactly the way the note above them warns about; and
`js/room.js` was running a Web Audio analyser and an FFT every frame to write a custom
property **nothing reads**, while permanently rerouting the narration through an
AudioContext to do it. 🛑 Two further "faults" were the harness, not the site — §14.3.
🗄 **v61–v67 moved to [`../archive/round-records-v61-to-v67.md`](../archive/round-records-v61-to-v67.md), 2026-09-09** — five
shipped rounds that used to sit between §3 and the current one, **41% of this file.** Every
ruling in them still stands; **§13 here is the index into them**, and it is where §8's mark
alignment, §9's dead-rule *method*, §11's reserved-height sweep and §12's italic caption now
live.
🗄 **v57–v60 moved to [`../archive/round-records-v57-to-v60.md`](../archive/round-records-v57-to-v60.md), 2026-09-07** — four
older rounds. **Every ruling in them still stands**; §4 here is the index into them.
⚠️ **THE SECTION NUMBERS SKIP §5–§12 ON PURPOSE.** They are stable identifiers into the two
archives; archiving never renumbers, so a §5.2 or §11.3 written anywhere still points at the
same words.
🛑 **Read §0.1 before touching the second door's `href`.**
🛑 **Every open decision is in `docs/DECISIONS.md` — do not start a second list.**
🗄 v55 (the ribbon going live) is at `58e2461`; v54's contact sheet, which never shipped,
is at `d1dc9f9`.

> This file is **hand-written and permanent**. `README.md` describes the repo;
> this describes the one screen a stranger actually sees.

---

# 0 · 🔴 THE SECOND DOOR — David's, still, and a teaser at last

## 0.1 🛑 THE ROUND THAT COST ITSELF — read this before touching the `href`

**On 2026-09-05 the excerpt was moved off David and onto Hannah,** on a reading of the
author that was half right and half wrong. **His correction, in full:**

> *"sorry i liked the david absalom audio but i didnt think it was a great introduction to
> that like why would someone click it it should say only have 5 minutea and then something
> els. its a teaser... it used to be good. it was fine before. where the sound startted."*

⭐ **THE COMPLAINT WAS NEVER ABOUT THE AUDIO.** *"it was fine before, where the sound
started"* is an instruction to **leave the excerpt alone.** What was wrong was the **card**:
it *described* the passage instead of *baiting* it, so nothing on it answered
**"why would someone click this"**. **A description is not a teaser.**

🛑 **SO DO NOT MOVE THE `href` AGAIN TO FIX A COPY PROBLEM.** The excerpt is the author's,
chosen by text, twice. **If the card is not working, the card is wrong.**

## 0.2 The target, and it is the author's

`ch07-p107`**:**

> *"David forgave his son and went on hiding his face for two years, because a hurt human
> heart can hide indefinitely."* — **"God's cannot."**


|             |                                                                                     |
| ----------- | ----------------------------------------------------------------------------------- |
| block id    | `ch07-p107` → `ch07-p108`                                                           |
| cue         | `17:56.320` — `cues/ch07.json`                                                      |
| href        | `?t=ch07:17m55s`                                                                    |
| source line | `content/chapters.js`, and upstream `panim-book/chapters/07-the-glory-backs-out.md` |


🛑 **THE HREF IS ONE SECOND EARLY ON PURPOSE. Do not "correct" it to** `17m56s`**.**
A seek that lands a few milliseconds late clips the **D** of *David*, and the one second
of lead-in is the tail of `ch07-p106` — a complete clause and a better cold open than a
hard cut.

## 0.3 ⭐ Five minutes IS the measurement now — the old table was short

**The old version of this file stopped its table at `+3m56` and concluded "four minutes",**
which is why *five* had to be carried as the author's word **over** the measurement.
**It was the table that was short, not the passage.** Measured forward from `17:55` against
`cues/ch07.json`, by text, never by clock:


| from start | what you hear                                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `+0m01`    | **David forgave his son…** *a hurt human heart can hide indefinitely*                                                         |
| `+0m10`    | **God's cannot.**                                                                                                             |
| `+0m34`    | the younger son is still a long way off when the father sees him                                                              |
| `+1m23`    | the father leaves his own feast and goes out to the door                                                                      |
| `+1m34`    | ⭐ **"David waited two years for Absalom. This father would not wait through dinner."** — the two halves closing on each other |
| `+1m50`    | Elijah, off Carmel, forty days to Horeb                                                                                       |
| `+2m42`    | the wind, the earthquake, the fire — *He is not in* any of them                                                               |
| `+3m09`    | *qol demamah daqqah*, a voice of thin silence                                                                                 |
| `+3m56`    | **"He knows exactly Who is in the thin silence."**                                                                            |
| `+4m43`    | Elijah walks off the mountain with his face still wrapped                                                                     |
| `+4m51`    | 🛑 **"The appointment is still on the books."**                                                                               |


⭐ **`+4m51` IS AN ENDING AND IT IS EXACTLY WHERE FIVE MINUTES LANDS.** It closes the Elijah
movement, and **the next line opens a new one** (*"My sister Hannah moved to heaven when she
was twenty"*) — so five minutes is also **the last honest place to stop.**

⚠️ **If the copy ever moves off "five minutes", re-derive it from this table.**

## 0.4 🔴 IT MOVED OUT OF THE HERO, AND IT IS A TEASER NOW

> *"we could possibly move that button down a bit so they interact with the pictures
> first… move this down below photos and add what chapter 7 holds and the quote there
> so its still super sweet and doesnt miss"*

**It sits under the ribbon of ten plates**, directly below the caption, and it is the last
thing before the contents. A stranger meets **the photographs first** and is offered the
five minutes **on the way out of them** — the card answers a curiosity the pictures have
just created instead of competing with the title.

```
  Two small silver scrolls, a blessing about a face, and the      ← .pl-hook, 30.4px
  oldest words of the Bible anyone has ever found.

┌────────────────────────────────────────────────────┐
│  IF YOU ONLY HAVE FIVE MINUTES                     │ 1 the offer   --accent, --ap-lg
│                                                    │
│  …a hurt human heart can hide indefinitely.        │ 2 the bait    Literata 350, 33.6px
│  God's cannot.                                     │
│                                                    │
│  Two years of a father's hidden face. A father who │ 3 what's inside --ink-soft, --ap-xl
│  leaves his own feast to stand at the door. And a  │
│  mountain where the wind, the earthquake and the   │
│  fire all turn out to be the wrong answer.         │
│  ──────────────────────────────────────────────    │
│  ╭───╮                                             │ 4 where it goes  Literata, --ink
│  │ ▶ │  Chapter VII · The Glory Backs Out          │
│  ╰───╯                                             │
└────────────────────────────────────────────────────┘
```

🛑 **FOUR ELEMENTS, FOUR JOBS, AND THE ORDER IS THE AUTHOR'S** — *"it should say only have
5 minutes and then something els"*. **The offer is first because it is the only line on the
page that is about the READER.** A card that opens by naming the chapter is answering a
question nobody asked: a stranger does not know what Chapter VII is and cannot want it.
**The locator went to the action row**, where a play ring wants a destination beside it.

⚠️ **"FIVE MINUTES" IS SAID ONCE, IN LINE 1, AND NOWHERE ELSE.** The card's oldest and most
persistent fault is an eyebrow, a title and a meta line **all reporting the same number of
minutes** — three lines of chrome carrying one fact, which is the most recognisable shape
of machine-written UI copy on this page. **The action line is the locator precisely so that
number cannot come back twice.**

⚠️ **THE QUOTE IS `ch07-p107` + `ch07-p108`, ELIDED AT THE FRONT AND MARKED.** The full
first sentence names David and runs to four lines at display size, which is a paragraph,
not bait. **The leading ellipsis is the honest way to say so.** It is a second copy of that
text — if the chapter is re-edited it will not follow.

🛑 **THE MARKUP IS IN `js/render.js`** — the constant `THE_SECOND_DOOR`, immediately above
`renderPlateIndex()`, which is the function that emits it. It is **not** in `index.html`
any more; there is a marker comment there pointing here.
**The id and the classes are still** `hero-sample` / `hs-*`. They are wrong about where it
lives and right about what it is, and renaming them would touch the interceptor in
`js/ui.js` and twenty selectors in `css/site.css` for no reader-visible gain.

🛑 **THE WIRING WORKS BECAUSE OF ORDER, NOT LUCK.** `js/ui.js` `init()` runs on
`panim:rendered`, which `js/render.js` fires **after** `root.innerHTML` is set — so
`$('#hero-sample')` finds it. **Verified by clicking it headlessly:** the event fires with
`{"chapterId":"ch07","seekTo":1075}`, the default is prevented, and the URL does not change.

🛑 **IT IS STILL AN** `<a>` **WITH THE REAL DEEP LINK.** The `href` is what makes it
**copyable, right-clickable, shareable, and the no-JS path.** Do not "simplify" it to a
`<button>`.

⚠️ **IT MUST NOT OUTRANK "Begin listening", AND WHAT KEEPS IT IN ITS PLACE IS FILL.**
`.btn-solid` is a solid slab of `--ink`; this is a wash inside a hairline. **A ring reads as
*optional, and worth it*. A filled slab reads as *the thing*.** They are also no longer on
the same screen.

🛑 **"Begin listening" STAYED IN THE HERO,** on the author's call (*"card only"*). A
returning reader's **`Continue: VII, 37:26`** must not be ten plates deep.

🛑 **"Contents ↓" IS DELETED.** *"i told you i dont want the clicker that shows content near
the button."* It was a second, weaker door beside the only one that matters, pointing at a
list the reader reaches by scrolling anyway. `.hero-hint` went with its markup — **a CSS
rule with no markup is a trap for whoever reads the file next.**
⚠️ `#contents` **still exists** and is still a link target; this deleted the hint.

**Tokens, all inherited, none invented:** `--control-edge` `--control-wash` `--accent`
`--ink` `--ink-soft` `--rule` `--ui` `--ap-lg` `--ap-xl` `--serif` `--lit-mid`
`--dur-fast` `--ease`.

⭐ `--control-edge`**, NOT** `--rule-strong`**.** This is shaped like a card but it **is a
control** — the whole rectangle is one link — so WCAG 2.2 SC 1.4.11 wants **3:1** on its
boundary. 🛑 **The paper was MEASURED, not assumed:** `#plates` carries no `[data-ch]`, and
its background composites to the same `rgb(239,235,225)` the jacket sits on.


| token                  | composited | ratio      |          |
| ---------------------- | ---------- | ---------- | -------- |
| `--rule-strong` (.28)  | `#B3AFA6`  | **1.84:1** | 🛑 fails |
| `--control-edge` (.50) | `#848078`  | **3.30:1** | ✅ passes |


**Every text pair re-measured on the paper it actually sits on, alpha composited:**


| pair                                 | size    | ratio       |     |
| ------------------------------------ | ------- | ----------- | --- |
| offer `--accent` on card             | 13.12px | **6.67:1**  | ✅   |
| quote `--ink` on card                | 33.6px  | **14.39:1** | ✅   |
| what's-inside `--ink-soft` on card   | 15.2px  | **5.90:1**  | ✅   |
| locator `--ink` on card              | 19.44px | **14.39:1** | ✅   |
| plate caption `--ink` on paper       | 30.4px  | **15.26:1** | ✅   |
| card edge `--control-edge` on paper  | —       | **3.30:1**  | ✅   |


**Touch target: the whole card**, 672 × 371 at 1440, 280 × 409 at 320. The ring is 40px and
is decoration — **the link is the rectangle.** No document-level horizontal scroll at any
of 320 / 360 / 402 / 480 / 560 / 640 / 768 / 900 / 901 / 1024 / 1280 / 1440 / 1920.

**The ring draws itself once,** 900ms, `both` fill, and is then finished forever.
🛑 **No pulse, no loop, no glow.** Self-drawing hairlines are already this book's motion
language (`.hairline.is-drawn`) — **this inherits it rather than inventing a gesture.**
⚠️ **The 500ms delay went with the move.** In the hero the ring drew while the reader was
still on the title; below the fold the animation is over before anybody scrolls to it, so a
delay buys nothing and only risks the ring being caught half-drawn.
Under `prefers-reduced-motion` the ring is simply already drawn.

## 0.5 🔴 THE "GLITCH" WAS A FULL PAGE RELOAD

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



## 0.6 ⭐ Tap-to-listen finally has a sentence

**The feature has existed since** `js/sync.js` **and nothing on the site ever said so.**
The affordance is a hairline in the margin on hover (`css/polish.css`) — correct,
restrained, and **completely invisible on a phone, which has no hover at all.**

> Click any line in the book to hear it read from there.

🛑 **It is hidden until the feature is actually on.** `js/sync.js` sets
`.can-tap-to-listen` on `<html>` only where a pointer exists; a keyboard-only session
never binds the handler. **A promise the page cannot keep is worse than no promise.**
The **Click / Tap** swap is `@media (hover: hover)` — **never tell a phone to click.**

## 0.7 "free · no account" is out of the invitation

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


## 0.8 🔴 THE MARK CAME OFF THE PAGE'S CENTRE LINE AND ONTO THE TITLE'S

> *"hebrew word should be on top of title it sits on top of not in dead center."*

**Earlier the same day it was centred** across all twelve tracks, on his own instruction
(*"why dont you center it? any reason not too?"*). **Measured, that put the word 356px to
the right of the title's left edge at 1440** — the mark and the line it names shared no
edge at all, and read as two unrelated objects stacked in the same column of air.

It now spans **the same tracks as `.hero-title` (3 / 10) and ranges left with it.**


| gap                       | before | after |
| ------------------------- | ------ | ----- |
| mark's left − title's left | 356px | **0px** |
| photograph → mark          | 72px  | **49px** |
| mark → title               | 32px  | **17px** |


🛑 **THE SIZE IS UNTOUCHED.** `clamp(3.1rem, 6.6vw, 5.4rem)`. The size was the real
complaint that morning (*"make the ebrew symbol the first one bigger its kinda small"*)
and **none of it is given back.**
🛑 **THE TRACKS MUST TRACK `.hero-title`.** If the title's `3 / 10` ever moves, this moves
with it or the mark silently starts floating again. On a phone both are `1 / 7`.
⚠️ `margin-inline-start: -.12em` **cancels the touch-target padding optically.** The `.12em`
of padding is what keeps the word's box over 44px wide; ranged left it would also push the
glyph ~6px right of the title's stem, which is the one misalignment the eye catches on a
title page.

## 0.9 🔴 THE PLATE CAPTION IS SET IN THE DISPLAY VOICE NOW

> *"maybe this text should be bigger its still tiny and nt captivating… should we use
> different font."*

**The first enlargement that morning took it from `.92rem` to `1.34rem`** and fixed its
size relative to body copy. **It did not touch the voice** — still prose, still
`--ink-soft` — and prose at 21px under a full-bleed strip still reads as a caption.

🛑 **THERE IS NO THIRD FAMILY, AND ADDING ONE FOR ONE LINE IS A WEBFONT ON THE CRITICAL
PATH.** Literata and Archivo are all that load. **Literata is variable**, so the voice can
change without the family changing: `--lit-mid` on the optical-size axis (the setting the
chapter titles use), weight `350`, and the colour off `--ink-soft` onto full `--ink`.
**Author's pick, of three options offered.**


|            | before        | after         |
| ---------- | ------------- | ------------- |
| size @1440 | 21.4px        | **30.4px**    |
| colour     | `--ink-soft`  | **`--ink`**   |
| voice      | body          | **display, 350** |
| contrast   | 6.26:1        | **15.26:1**   |


⭐ **THE RESERVED HEIGHT IS IN `em` NOW, AND THAT IS THE REAL FIX.** The old ladder was
written in `rem` against the clamp's **floor**, so it silently under-reserved at every
width where the clamp is not on its floor — at 1440 the tallest hook is **119px** and the
old formula reserved **89**. That is 30px of the contents page jumping under the reader's
thumb on one snap in ten, which is the exact fault the reservation exists to prevent.
`1.3em` **is one line box exactly at every clamp value**, because `line-height` is `1.3`
and `1em` is the element's own computed size. **The ladder now only carries line counts.**

🛑 **EVERY STEP IS MEASURED, not interpolated** — the ten hooks run 90 to 136 characters
and these are the widths at which the tallest actually gains or loses a line:


| width | 320 | 340 | 480 | 560 | 760 | 901 | 915 | 1440 | 1920 |
| ----- | --- | --- | --- | --- | --- | --- | --- | ---- | ---- |
| lines | 6   | 5   | 4   | 3   | 2   | **4** | 3 | 3    | 3    |


⚠️ **901 GOING BACK UP TO FOUR IS NOT A TYPO.** That is the layout breakpoint: below it the
caption spans all six phone tracks (**828px at 900**), above it seven of the desktop's
twelve (**477px at 901**). **The caption gets narrower as the window gets wider, once,**
and it costs two lines. 915 is where the desktop grid has grown enough to win them back.

## 0.10 🔴 THE TOP OF THE PAGE WAS BLOATED, AND IT WAS THREE GAPS DOING ONE JOB

> *"i feel like theres too much space in between sections at the beggining make sure theyre
> clean not bloated."*


| seam                                    | before | after |
| --------------------------------------- | ------ | ----- |
| photograph → mark (`.hero-block` top)   | 72px   | **49px** |
| jacket's last line → `#hero` bottom     | 54px   | **37px** |
| `#hero` bottom → first plate            | 45px   | **23px** |
| **`#hero` total height @1440**          | 1504px | **1363px** |


🛑 **THE PHONE END BARELY MOVES** (38px → 30px on `.hero-block`'s top). **The bloat was a
desktop fault:** the old clamps' upper arms (`5vw`, `5vh`) grew with the window while the
type did not, so the air scaled and the words did not.

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
| `lab/archive/plates-four-concepts-2026-09-04.html` **B**, the 2:3 ribbon | `0.667` | 36% |
| `lab/archive/plates-four-concepts-2026-09-04.html` **D**, the 3:4 wall | `0.750` | 41% |
| **v54, the 3:2 proof sheet — what is committed and unpushed** | `1.500` | 82% |
| `lab/archive/plates-four-concepts-2026-09-04.html` **C**, the 16:9 list | `1.778` | ✅ 97% |

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
| **the sway** — the *page's* scroll | every plate rides a wave, **±44px at its own phase**, as the section crosses the window |
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

⚠️ **The amplitude is one cosine across the ten**, `cos(i × 1.1) × 44px`, set at render
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
| hook caption | 30.4px | 15.26:1 | ✅ — re-measured at v57, `--ink` not `--ink-soft` |

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

## 2.8b 🔴 THE ARC IS GONE, AND THE SWAY IS THREE TIMES WHAT IT WAS

**The author, 2026-09-04, after v55 went live:** *"it seems lame it still ahs no motion and
the tabs below the photos should really be gone they are so ugly."*

**Both notes were right and the second one is the harder lesson.**

**1 · The paper-stock arc is deleted.** It was the prettiest idea in the build — ten chips of
the chapters' own stock, night to morning, doubling as a scroll position — and **on the page
it read as a row of tabs.** ⚠️ **A concept that has to be explained to be enjoyed has already
failed**, and this one needed a paragraph. Gone from `render.js`, `components.css` and
`ui.js`; the row of numerals under each plate is the only index the strip needs, and the
`--stock` table went with it because nothing else used it.

**2 · `±14px` was invisible and the author was the one who noticed.** Fourteen pixels over a
1,400px scroll is a fifth of a per-cent of the travel — real in a measurement and **not real
to an eye.** It is `±44px` now: **88px of travel on plate I**, and adjacent plates swing
against each other because the phase comes from a cosine. 🛑 **A motion measured but never
watched is a motion that does not exist.** It was verified by reading `translateY` at five
scroll positions and never once by looking at two screenshots side by side.

**Still transform-only, still no crop, still 60fps** — `402` median `16.7ms` worst `17.1`,
`1440` median `16.6` worst `17.7`, zero frames over 33ms on either path. Section is 30px
shorter than it was with the arc.

## 2.9 ⚠️ Still open

- **`lab/turn.html` stays** — the author, 2026-09-04: *"if lab turn is good maybe it can
  stay"*. It is genuinely good work; it is simply the wrong object for landscape plates.
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
| the card             | `js/render.js` `THE_SECOND_DOOR` · `css/site.css` `.hero-sample` — **not in `index.html`** |
| the mark (פָּנִים)     | `index.html` `a.hero-hebrew` · `css/components.css` `.hero-hebrew` |
| the plate caption    | `js/render.js` `renderPlateIndex()` · `css/components.css` `.pl-hook` |
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

**All four are on** `64`**.** Checked 2026-09-07 — they were on `63` and moved together
with that round's CSS. This line had said `57` since v57 and was wrong for four
releases: **the number in this file rots faster than the number in the code, so read
`sw.js` first and correct this line, never the other way round.**
---

# 4 · 🗄 v57 – v60 — ARCHIVED

**The four round records that were §4–§7 are now
[`../archive/round-records-v57-to-v60.md`](../archive/round-records-v57-to-v60.md)** —
548 lines, moved 2026-09-07.

🛑 **Every ruling in them still stands.** They were archived because they are *records*
and this file is *instruction*: four shipped releases stood between §3 (where things
live) and the round that had actually shipped last. **Do not re-derive any of the
below — go read it:**

⭐ **AND THE SAME THING HAPPENED AGAIN, WHICH IS WHY §13 EXISTS.** Five more rounds
accumulated in the gap this section cleared. **If you are reading this because you just
shipped one, put the record in the archive, not here.**

| in the archive | what it settles |
| --- | --- |
| **§4.2** | the most expensive mistake in the project's history, and how it happened |
| **§5.2** | night mode, and the one trap in it |
| **§5.9** | the type audit that turned out to be a layout fault |
| **§6.1** | why the copy could not improve — one field set at two sizes |
| **§7.1** | the two resume buttons, and *"obnoxiously loud"* |
| **§7.4** | eighteen seconds of music between chapters, measured then halved |

**Section numbers inside the archive are unchanged**, so a §5.2 written anywhere else
still points at the same words.

---


# 13 · 🗄 v61 – v67 — ARCHIVED

**The five round records that were §8–§12 are now
[`../archive/round-records-v61-to-v67.md`](../archive/round-records-v61-to-v67.md)** —
603 lines, moved 2026-09-09.

🛑 **Same rule as §4, applied to itself.** §4 archived four rounds because *"they are
records and this file is instruction"*, and then five more accumulated in the same place.
By v69 they were records of releases two to eight versions old, sitting between §3 (where
things live) and the round that actually shipped last — **41% of this file.** Nothing in
them was reversed. **Do not re-derive any of the below — go read it:**

| in the archive | what it settles |
| --- | --- |
| **§8** | the mark ranging left, and `margin-inline-start` lying on an RTL box |
| **§9** | the dead-rule sweep, and **the method for proving a rule is unused** |
| **§10** | the three small labels, the resume toast, Hannah filed under the wrong woman |
| **§11** | the caption lit by its chapter; **the reserved height one line short at nine widths in ten**; two forced layouts per scroll frame |
| **§12** | the caption set in italic by accident; the play button drawn properly; the five-minute card |

**Section numbers inside the archive are unchanged**, so a §11.3 or §12.4 written anywhere
else still points at the same words. **That is why this file skips §5–§12** — the numbers
are stable identifiers and archiving must never renumber them.

---


# 14 · 🧪 v69 — TWO DEFECTS THE COMMENTS THEMSELVES HAD NAMED

**2026-09-09.** *"review cleaning the code make sure the code is perfectly clean and no
garbage is lost in there… make sure the site works perfectly and there are no bugs."*

⭐ **THE SITE WAS ALREADY CLEAN, AND THE SWEEP SAYS SO WITH NUMBERS.** Zero orphan CSS
classes across 313, zero unused custom properties, zero `console.*`, zero `TODO`, zero
inline `style=`, zero duplicate ids, zero heading-level jumps, zero horizontal overflow at
320–1920, zero JS errors, every image with an `alt`, every control with an accessible name,
and the version in step across all four places §3.1 names. **Two real defects came out, and
both were already described in a comment sitting next to the bug.**

## 14.1 🔴 THE OFFLINE GREEK BROKE ACROSS TWO FACES — the 2026-08-29 fix was half a fix

`sw.js`'s precache list carried a note about exactly this failure: l00 is Literata
greek-**ext** (U+1F00–1FFF) and l01 is greek (U+0370–03FF), and shipping one without the
other means *"an offline reader got every Greek word broken across two faces, one glyph in
Literata and the rest in a system serif."* **That was fixed on one axis and missed on the
other.** l00/l01 are the **italic** pair. **l05/l06 are the roman pair, same two ranges,**
and the site sets Greek in both styles:

| where | style | face needed | precached before v69 |
| --- | --- | --- | --- |
| `.chapter-mark.is-greek` — ἀνθρακιά | italic | l00 + l01 | ✅ both |
| `.lex-chip-word.is-greek` — σχίζω, ἱλαστήριον, ἐνώπιον, μεταμορφόω, προσαγωγή, παρρησία | **roman** | **l05 + l06** | 🛑 **neither** |

So offline, **six Lexicon chips broke in precisely the way the note above them describes.**
Both files added; the list is nine, not seven. **+64 KB of install**, against the 162 KB
`og-card-face.jpg` gave back in v64.

🛑 **AND THE COMMENT ASSERTED A COUNT, WHICH IS HOW IT SURVIVED TWICE.** It said *"These
SEVEN are every subset the site actually reaches"*, and before that *"six"*. **A count in a
comment is not a measurement.** The note also gives the correct check — diff
`performance.getEntriesByType('resource')` filtered to woff2 against the list — and **that
check returns six and agrees with nothing unless every `content-visibility` section is
forced to render first**, because a deep section never fetches its subsets. Run with all
sections forced: **l00 l01 l04 l05 l06 l09 g02 h00 h02. Nine.**

## 14.2 🔴 A WEB AUDIO ANALYSER RUNNING EVERY FRAME FOR A PROPERTY NOBODY READ

`js/room.js` built an `AnalyserNode` over the narration, ran a 512-point FFT and an RMS
smooth **on every animation frame while the Room was open and playing**, and wrote the
result to `--pulse` on `#room`. **Nothing reads `--pulse`.** The CSS that made the glow
behind the play button breathe with it was removed some time before v68 and the writer was
left behind. Verified twice: no `var(--pulse)` in `css/`, `index.html` or `content/`, and at
runtime a walk of every rule in `document.styleSheets` matched it zero times.

🛑 **IT WENT RATHER THAN STAYING DORMANT LIKE `#edition-btn`, AND THE DIFFERENCE IS THE
RISK.** `#edition-btn` is inert — two null elements — and has a written restore path and a
recorded ruling. This was not inert. **`createMediaElementSource()` permanently reroutes the
element's output through the AudioContext**, so after that call the narration is only
audible while the context is running: an autoplay-policy suspension or a failed `resume()`
on iOS is **silent playback**, not a missing glow. It spent a rAF loop and an FFT per frame
and risked the one thing this site exists to do, for a custom property with no reader.

⭐ **The restore ordering is written into the tombstone:** if the breathing glow comes back,
**the CSS goes first** — write the rule that reads `var(--pulse)`, watch it do nothing, and
only then restore the block from git. That ordering is what would have caught it.

## 14.3 Two reported faults that were the harness, not the site

🛑 **Both are `docs/HEADLESS.md`'s standing rule paying for itself again** — *a measurement
that says something is broken is a claim about the measurement until the measurement has
itself been checked.*

- **"A broken `<img>` fetching `index.html` on every load."** `#lightbox-img` carries
  `src=""`, and `img.src` (the IDL property) resolves an empty attribute against the base
  URL, so a probe reading `.src` reports the document. **Measured instead:
  `performance.getEntriesByType('resource')` shows zero requests for `index.html` as a
  subresource and `currentSrc` is `""`.** Modern Chrome makes no request. Nothing to fix.
- **"`sync.js` throws on null `e.detail`."** Only when a *harness* dispatches a raw
  `CustomEvent`. **`js/player.js`'s `emit()` is `detail: detail || {}`**, so `e.detail` is
  never null in the real app.

## 14.4 Verified

**Re-swept after the edits at 402, 900 and 1440:** no JS errors, no horizontal overflow, 18
sections rendered, 10 plates, one lit, **the caption's reserved height exactly equal to the
tallest hook's real height at every width** (195/195, 97/97, 176/176 — the v67 ladder is
correct and needed no touching), and the Room opens, receives play-state, and closes with no
throw. `node --check` clean on both edited files.


# 15 · 🎧 v70–v71 — ONE VOICE PATH, AND A READ-ALONG MARK THAT WAS NEVER VISIBLE

**2026-09-09.** *"delete othr voice path we just ned the one voice path in our coding… make
sure follow is working and it automatic… highlight doesnt normally look good we might need
something different."*

## 15.1 🛑 v70 — THE SECOND EDITION IS GONE, AND IT POINTED AT A FOLDER THAT NEVER EXISTED

`js/player.js` and `js/room.js` carried a complete second code path: `state.edition`,
`setEdition`, `toggleEdition`, `updateEditionButtons`, an edition-keyed preload cache, a
`panim:edition-change` event, two DOM buttons, and an `audioUrl` that interpolated the edition
into the path. **All of it resolved to `audio/voice/chNN.m4a`.** `audio/` on this site holds
`music/` and nothing else — **so every voice branch was a 404**, and had been since the folder
was never shipped. It was switched off at `init()` rather than removed, which is what made it
read as a live feature rather than as dead weight.

⭐ **WHAT SURVIVED, AND WHY IT KEEPS ITS NAME.** The **voice timeline** stays — `voiceTime`,
`voiceDur`, `offset()`. That name is about the CLOCK (`cues/*.json`), not about an edition: the
master prepends 6.0s of music before the first word, so every stored position still converts
through `offset()`. Deleting the edition did not simplify that and must not look like it did.

🛑 **AND ONE THING WENT WITH IT THAT IS A FENCE, NOT A TIDY-UP:** `PanimPlayer.audio` — the raw
`<audio>` element, exposed on the public API — is off it. **That export is what let §14.2's
analyser call `createMediaElementSource()` on the narration**, permanently rerouting playback
through a Web Audio graph. Its only consumer was that analyser. Everything a caller legitimately
needs is already a method on the API.

## 15.2 🔴 v71 — THE FOLLOW MARK WAS A NO-OP ON 1,725 OF 1,841 CUE BLOCKS

**The engine was never broken.** Measured: all **118 cues in chapter I resolve to a real
element**, `.is-live` lands on the right one as the clock passes each cue, Follow is on by
default, it suspends on a real gesture and resumes on its own.

**The MARK was invisible.** `.block-p.is-live { color: var(--ink) }` — and a paragraph's base
colour **already computes to `var(--ink)`**, so the rule changed nothing. Of the 1,841
cue-carrying blocks, **1,725 are `.block-p`**; only the 116 `.verse-box`es had a visible state,
because theirs moves a *border*.

🛑 **THE HISTORY IS THE INTERESTING PART.** v1 had a real effect —
`text-shadow: 0 0 22px accent@45%` — and the rebuild deleted it on purpose, with the comment
*"a weight shift on the rule, no glow."* **The deletion was right. The replacement was half
written:** it lit the live paragraph without ever darkening the others, so there was nothing for
it to stand out from. A rule that reads as a deliberate design decision, and does nothing.

⭐ **THE FIX INVERTS IT: the unread text recedes; the read line is untouched.** `html.is-narrating`
(js/sync.js `reflectNarrating`) drops every other paragraph to `--ink-soft`. Nothing is added on
top of type — which is the same argument that removed the v54 tabs and the card's box, and it is
what the author meant by *"highlight doesnt normally look good."*

⚠️ **GATED ON ALL THREE OF playing + Follow on + not suspended.** On `playing` alone, a paused
page sits with nine tenths of the chapter dimmed and nothing reading it — the 2026-08-30 fault
(*"it's moving even when i dont play it"*) in different clothes. Without `suspended`, a reader who
scrolled ahead has the paragraph they are actually reading dimmed while the voice lights one
three screens back.

⚠️ **CONTRAST MEASURED, NOT ASSUMED — this dims BODY COPY.** `--ink-soft` against all twelve day
stocks: **worst 6.01:1.** Against all six night stocks: **worst 8.34:1.** AA for body text is 4.5.
The live line stays at 14.65:1 (day) / 15.29:1 (night). 🛑 **A new chapter stock means re-running
that sweep.**

## 15.3 What was ruled out, and why

- 🛑 **Word-by-word karaoke.** The cues are paragraph-level — **118 for a whole chapter** — so word
  timing does not exist and would have to be interpolated, which drifts audibly within two
  sentences.
- 🛑 **A weight shift on the live line.** Literata's weight axis changes glyph widths, so the
  paragraph re-wraps and the page jumps under the reader's thumb on a 312,000px document.
- 🗄 `is-live-paragraph` was being *removed* in `clearLive()` and **set nowhere.** Gone.

## 15.4 Verified

Re-swept at **320 / 402 / 900 / 1440 / 1920**: all pass — no JS errors, no horizontal overflow,
10 plates, 18 sections, caption ladder still exact, Room opens and closes. Chapter load now
resolves to `audio/music/chNN.m4a` with the offset intact. The read-along state machine tested
through its whole cycle — idle, playing, paused, Follow off, Follow back on — **in both themes**.
Dead-code sweep re-run after the deletions: **zero orphan CSS classes, zero unused custom
properties.** `node --check` clean on all three edited files.

🛑 **AND ONE MEASUREMENT THAT LIED, RECORDED BECAUSE IT WILL LIE AGAIN.** A screenshot of the
recede came back showing every paragraph at full `#191510` — pixel-sampled, not eyeballed — while
the DOM said the rule had applied. **`docs/HEADLESS.md` trap 9:** `.block-p` carries
`transition: color`, rAF never runs here, so both the render and any `getComputedStyle` without
the transition-killer report the value the transition is animating *from*. With the killer
injected, both themes read correctly. **Measure the state machine; do not photograph it.**

---




# 16 · 📴 v72 — THE OFFLINE WARNING, AND THE OFFER MADE AT THE ONLY MOMENT IT CAN BE TAKEN

**2026-09-09.** *"if its offline will it warn that audio will not work offline unless
dowloaded like if airplane is on can it saay dowload if youw ant to play offline in the
future etc??? clean code. Make sure theres no bugs"*

## 16.1 🛑 THE ANSWER WAS NO, AND THE REASON IS THAT THE SITE OFFLINE LOOKS PERFECT

`sw.js` precaches the text, the nine font subsets, the cues and every script on the first
visit, so **with the network gone the book reads flawlessly.** That is the trap. The audio
is ~241 MB and is stored **only when a reader asks for it** — so on a plane the page is
immaculate and the play button is silence. What the reader got was a `data-state="error"`
that **nothing in the CSS styles**, and one `aria-live` sentence — *"Check your
connection"* — which a sighted reader never sees at all. **Nothing on screen ever said the
word offline.**

⭐ **AND THE SECOND HALF OF THE ASK IS THE BETTER HALF.** *"say download if you want to play
offline in the future."* The download is exactly the thing that **cannot be done at the
moment the reader wants it.** So the offer is not made in the air — it is made **when the
connection comes back**, which is the only moment it can be acted on.

## 16.2 The new file, and why it is a file

**`js/offline.js` (286 lines), and it took work OFF `js/room.js`, which is now 448.**

`js/room.js` used to hold the service-worker handle, the download queue, and its own idea of
which chapters were saved — **read back out of the DOM by counting `.is-cached`**, so the
answer did not exist until the chapters sheet had been opened at least once. The warning needs
that answer on page load, before any sheet exists. 🛑 **Two files posting to one worker is how a
✓ and a queue drift apart**, so the split is by ownership, not by size: `js/offline.js` owns the
worker conversation and the state; `js/room.js` paints, and now posts nothing at all.

| | |
|---|---|
| the worker, the queue, the saved flags | `js/offline.js`, published as `panim:audio-cache` |
| the ↓ column and the Save-all line | `js/room.js`, repainted from that event |
| the load that actually failed | `js/player.js` `onErr()`, emitted as `panim:audio-error` |
| the notice itself | `#offline-note`, the `.toast` component with a different inside |

## 16.3 What it says, and it never says the same thing twice

| state | the card |
|---|---|
| offline · nothing saved | *"The book reads with no signal, but none of the audio is saved yet…"* |
| offline · some saved | *"Saved chapters play, and you have 3 of 10…"* |
| offline · all saved | *"All 10 chapters are saved. Everything plays."* — auto-hides after 7s |
| back online, having been offline | **Back online** + `Save all 10 · 241 MB`, which starts the queue and opens the chapters sheet so the progress is visible |

🛑 **`navigator.onLine` IS ONE-WAY HONEST.** `false` means there is definitely no network;
`true` only means an interface is up — a captive hotel portal reports `true` and serves
nothing. So it **chooses the sentence and never gates the playing.** The only proof there was
no network is a load that actually failed, and `panim:audio-error` carries it: that event
un-dismisses the card, because a reader who has just hit the wall is owed the explanation
again.

⚠️ **THE SENTENCE IS SAID ONCE.** `#offline-note` is `role="status"`, so it announces itself;
`js/player.js` therefore **deliberately does not** `announce()` on the offline branch. Both
would read it to a screen reader twice. The online branch still announces, because there is no
card in that case.

## 16.4 🔴 The offer outlives the tab, and the × is permanent

The realistic shape of this is: no signal on the plane, tab closed, site reopened on wifi a day
later. Held in memory the offer would be **lost at exactly the moment it becomes useful**, so
`panim:offlineWanted` persists it. It is cleared when the audio is saved. The **×** sets
`panim:offlineOfferOff` instead, which never expires — an offer that returns after the reader
has said no is a nag, and this one would return on every page load. 🛑 **× on the OFFER is
"stop asking"; × on the WARNING is only "I know"** — the warning comes back on the next state
change, and it must.

## 16.5 🔴 THE BIGGEST BUG WAS THE ONE THE FEATURE WAS BUILT ON

**A media element is not obliged to tell you it failed.** Measured on `tools/serve.py` with the
network genuinely off: an **uncached chapter never raises `error`.** It sits at `readyState 0`
— no error, no metadata, no `timeupdate` — **indefinitely.** The first build of this feature
hung the message on `panim:audio-error`, and that event **never came**: the reader got a
pressed play button over silence for as long as they were willing to wait, which is the exact
complaint the round was opened to fix.

🛑 **SO THE QUESTION IS ASKED BEFORE THE LOAD, NOT AFTER IT.** `PanimOffline.blocked(id)` is
true when there is provably no network **and** provably nothing stored — which together mean
there is nothing to fetch and nothing to wait for. `js/player.js` refuses the load and emits
the failure itself: **2 ms instead of never.**
⚠️ **AND IT MUTATES NOTHING.** Whatever is playing keeps playing. The reader asked for a
different chapter and did not get it; that is not a reason to stop the one they had.

⭐ **THE CAPTIVE-PORTAL CASE GETS A WATCHDOG INSTEAD**, because there `onLine` is `true` and
`blocked()` is correctly false. **Nothing arriving for twelve seconds IS the failure**, so it
is reported as one. `progress` re-arms the clock, so a slow connection still delivering bytes
is never cut off — only a dead one is.

🛑 **AND THE ROOM HAD THE SAME HOLE ONE LAYER UP.** `#offline-note` is deliberately
suppressed while the Listening Room is open (`css/room.css` — a card at z-index 940 over a
room at 920 paints on top of the night player). So offline, tapping an unsaved chapter in the
chapters sheet **closed the sheet and did nothing, with the explaining surface switched off.**
The row itself now goes unavailable when it cannot play, and the Save-all line under it
already says why. ⚠️ `.btn[disabled]` does not reach it — `.cr-main` is not a `.btn` — so it
carries its own rule, **and suppresses its hover**: a row that lights up under the finger
reads as tappable.

## 16.6 Four more, three of them older than the feature

- 🛑 **`.btn` given `hidden` still paints.** `.btn { display: inline-flex }` and the UA sheet's
  `[hidden] { display: none }` are the **same specificity**, and the author sheet wins — so
  `noteAction.hidden = true` left **an empty bordered box in the middle of the card** on every
  state with no action. `#hold-btn[hidden]` in `components.css` already carries this fix; it
  now has a companion. **Any `.btn` on this site given a `hidden` attribute has this bug.**
- 🛑 **The toasts painted over the Listening Room.** `.toast` is z-index 940, `#room` is 920.
  A card arriving while the Room is open sat **on top of the night player**. Fixed in
  `room.css`, and ⚠️ **the selector has to beat `.toast:not([hidden]).is-shown`** — three
  classes — or it silently does nothing.
- 🛑 **Save-all quoted the whole book's size when nine chapters were already on the phone.**
  It read `musicMB` for every chapter; it now reads only what is missing.
- **"1 of 10 chapters are saved."** Rewritten so the count cannot decide the verb, because 1 is
  the count a reader most often has.

## 16.7 Verified

Driven headless at **402 and 1440, both themes**, on `tools/serve.py`: the note appears on
`offline`, carries the right sentence for 0 / 1 / all saved, the offer appears on `online` and
survives a reload, the × is permanent, the warning still returns after it, `↓` and Save-all go
disabled offline with a line saying why, the queue runs sequentially and the ✓ lands, and a
**saved chapter plays with the network off** (`readyState 4`, clock advancing) while an
unsaved one is refused in **2 ms** and brings the dismissed card back — **without stopping the
chapter already playing.** Back online, an ordinary load is unaffected. No JS errors, no horizontal overflow at 402, the × is
44×44, night contrast measured at ~8:1.

🛑 **AND ONE MORE HARNESS FAULT, RECORDED BECAUSE IT WILL LIE AGAIN.** The first offline run
reported `data-state="playing"` and **no `MediaError` at all** with the network emulated off —
which reads as "the player does not notice". It was the server: **`python3 -m http.server`
types `.m4a` as `audio/mp4a-latm` and ignores Range, so `readyState` stays 0 and no error is
ever raised.** README says exactly this, four hundred lines from where it was needed. On
`tools/serve.py` the error fires as designed. **`docs/HEADLESS.md` trap: use the project's own
server or the media element will not tell you the truth.** It is now trap 10 there.

---
