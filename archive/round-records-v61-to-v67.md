# 🗄 ROUND RECORDS — v61 through v67

**Archived from `docs/FRONT-DOOR.md`, 2026-09-09**, by that file's own rule, stated in its
§4: *"They were archived because they are records and this file is instruction."* These five
were §8–§12 there. When they moved, v68 had shipped and v69 was shipping — so all five were
records of releases two to eight versions old, sitting between §3 (where things live) and the
current round.

🛑 **EVERY RULING IN THEM STILL STANDS.** Nothing here was reversed; it was filed.

🛑 **SECTION NUMBERS ARE UNCHANGED**, exactly as with `round-records-v57-to-v60.md` — a §11.3
or §12.4 written anywhere else still points at the same words. The numbers are stable
identifiers, which is why `FRONT-DOOR.md` skips from §4 to §13 rather than renumbering.

| here | version | what it settles |
| --- | --- | --- |
| **§8** | v61 | the Panim mark ranging left, and `margin-inline-start` lying on an RTL box |
| **§9** | v64 | the dead-rule sweep, and the method for proving a rule is unused |
| **§10** | v65 | the three small labels, the resume toast, and Hannah filed under the wrong woman |
| **§11** | v66 | the caption lit by its chapter; the reserved height one line short at nine widths in ten; two forced layouts per scroll frame |
| **§12** | v67 | the caption set in italic by accident, the play button drawn properly, the five-minute card |

---

# 8 · ← v61 — THE MARK RANGES LEFT EVERYWHERE, AND A LOGICAL PROPERTY WAS LYING

**2026-09-06.** *"the panim symbol needs to move left cause it looks weird fully centered on
mobile."*

## 8.1 The centring is reversed, and the argument that lost is kept

🛑 **This is the third position this mark has had and it is the last one**, so the losing
reasoning stays written down rather than deleted — it was a good argument and it was still
wrong.

**It said:** on a phone the title fills the whole measure, so *centred on the page* and
*centred on the title* are the same place, and a centred device over a ranged-left title is
the title-page move, available for free. **The geometry is correct.**

⭐ **What it missed is that the title is two ragged lines, not a block** — *"The Invitation /
Hidden on Every Page."* So the mark was not centred over a shape, it was centred over an
**average**. It read as floating because it **was** floating: it shared no edge with anything
on the page. **Now the mark, the title, the standfirst, the pull line and the door all start
on one vertical, at every width.**

## 8.2 🔴 AND THE ALIGNMENT WAS NEVER ACTUALLY WORKING — `margin-inline-start` ON AN RTL BOX

**The bug was live on the desktop too, and had been since the mark was first ranged left.**

`.hero-hebrew` carries `dir="rtl"` — **it must**, Hebrew is a right-to-left script and the
nikkud depend on it. **In an RTL box the inline-START edge is the RIGHT one.** So
`margin-inline-start: -.12em`, written to cancel the `.12em` of touch-target padding on the
left, was quietly cancelling it **on the right** — and the word had been sitting off the
title's stem the entire time.

**Measured, leftmost glyph against the title's left edge:**

| | before | after |
|---|---|---|
| 320 / 360 / 402 / 480 / 640 / 768 | **+6px** | **0** |
| 900 / 901 | +7px | **0** |
| 1024 | +8px | **0** |
| 1440 | **+10px** | **0** |

**Fixed with `margin-left`, a physical property.** 🛑 **A logical property is the wrong tool
on an RTL island inside an LTR page.** The page's reading direction decides the grid; the
element's decides its own inline axis, and here **the two disagree on purpose**. Anything
that has to line up with the page uses physical properties.

⚠️ **The measurement trap that hid it, worth thirty seconds:** `.heb-g` is one span per
letter, and **in RTL the FIRST span in the DOM renders RIGHTMOST**. Measuring
`querySelector('.heb-g').getBoundingClientRect().left` reports the right-hand glyph and
gives a 63px error. **Take the minimum `left` across all of them.**

✅ **Verified: 0px offset at ten widths from 320 to 1920, no document or nav overflow at
fifteen, the mark's box still clears 44×44 (94×51 at 320), and no console errors.**

---

# 9 · 🧹 v64 — THE SWEEP: WHAT WAS SHIPPING AND STYLING NOTHING

**2026-09-07.** No behaviour changed and no pixel moved. **Eleven rule sets and one element
came out because nothing on the site had ever used them**, and the numbers that describe
this build were four releases stale.

## 9.1 The method, because "unused" is a claim and not an observation

Every class, id, `@keyframes`, `[data-*]` and custom property in the five stylesheets was
matched against **every** surface that can reach it — `index.html`, `accessibility.html`,
`404.html`, the ten `/c/NN/` stubs, all nine scripts in `js/`, all ten in `content/`, and
`sw.js` — with the CSS's own comments stripped first, so that a name **mentioned in a
tombstone did not count as a use**. That last part is what makes this file's habit of
writing 🛑 notes safe: the notes are dense enough that a naive grep reports almost
everything as live.

🛑 **A dead-code sweep that greps the stylesheet against itself will find nothing.**
The comments will always answer.

## 9.2 What came out

| | why |
| --- | --- |
| `#progress-bar` / `#progress-fill` | **markup and rule both**. Two elements in `index.html`, hidden by a rule in `polish.css`, read by no script. The rule had a paragraph explaining the decision; the elements it described were still on the page. |
| `.mix-row` ×3 | the **mix panel (C13) was never built** — no sheet, no opener |
| `.col-margin` `.col-text` `.col-aside` `.col-wide` `.col-full` + breakpoint | the column ranges are a **vocabulary the comments cite**, and never once appeared in markup — every component states its own `grid-column`. The ranges are kept as a comment in `site.css`, which is what the citations elsewhere actually need. |
| `.si-standfirst` ×4 | the apparatus heads have been `.is-bare` since the standfirsts came off them |
| `.aside-note` ×3 | a margin note no renderer ever emitted |
| `.meta-status` ×2 | the bar has one meta line, `#meta-time`, and `js/player.js` reads that id only |
| `.label-hide-mobile` · `.rule-line` · `.hebrew-inline` | no markup, any width |
| `--fr-normal` `--fr-mid` `--fr-display` | the Fraunces→Literata compatibility aliases. **Nothing says `--fr-*`.** |
| `#ambient-light` `#grain` | two ids on the "legacy hooks kept inert" line that exist in no markup and no script. `.veil-lift` and `.veil-boundary` stay — `js/motion.js` still reads both. |

⭐ **`lab/list.html` and `lab/plates.html` were byte-identical to their own copies in
`lab/archive/`** (`md5` equal). The live pair is gone and the archived pair is what §2.1's
measurement table now cites. `lab/turn.html` and `lab/ribbon.html` stay — the author ruled
on `turn`, and `ribbon` is the standalone of what shipped.

## 9.3 🔴 THE VERSION NUMBER IN THE DOCS HAD ROTTED — TWICE

§3.1 of this file said **all four places were on `57`**; they were on `63`. `README.md`'s
header said **`v55`**; it was nine releases behind. 🛑 **The code was right both times and
both documents were wrong, which is the only direction this ever fails in: `sw.js` is
edited because the site breaks otherwise, and a sentence about `sw.js` is edited because
somebody remembers to.** Read `sw.js` and correct the prose, never the reverse.

**All four are on `64` now** — `SHELL`, `ASSET_V`, the 24 `?v=` in `index.html`, and the
`fonts.css` `?v=` in **both** `404.html` and `accessibility.html`.

⚠️ **v62 and v63 have no record in this file.** They moved the asset version and nothing
wrote them down. If either did more than that, it is in `git log` and nowhere else.

## 9.4 Verified

Braces balance in all five stylesheets. A second full sweep after the edits reports
**zero** unreferenced classes remaining. The page was rendered in headless Chrome against
`tools/serve.py`: **683KB of DOM, ten plate frames in the ribbon, 51 lexicon plates, 15
contents rows, 300 thread notes, the player and the jacket mark all present**, and
`progress-bar` no longer appears anywhere in the output.

---

# 10 · 🔍 v65 — THE THREE LABELS HE HAD ALREADY ASKED ABOUT, AND ONE INDEX POINTING AT THE WRONG WOMAN

**2026-09-07.** Four notes from the author, and **three of them are one fault**: this site
ships its small labels at `--ap-sm` — 10.24px of tracked uppercase — and they only get
fixed when he says so. The fourth is a content error the apparatus could not have caught.

🛑 **THE PATTERN IS THE FINDING.** `--ap-sm` is documented in `css/components.css` as
"the tracked-uppercase floor … for SHORT labels", and it has now been walked back three
times: the Names and Places index letter ("the abc … could be bigger its hard to see"), the
Sources group heading, and the player rail. **Before setting anything new at `--ap-sm`, ask
whether it is a word on a row or a heading somebody has to find from across the page.**

## 10.1 The player rail: `.72rem` → `.86rem`

*"numerals could be bigger on the audio player."* 11.52px → 13.76px. A roman numeral is the
hardest small type there is — V, X and I are the same three strokes.

**Measured, not guessed.** The rail is `display:none` below 641px, so the tightest real case
is the bar at 641:

| bar width | clear space, VII → VIII | widest numeral |
| --- | --- | --- |
| 641 | **34px** | `VIII`, 35px |
| 900 | 61px | 35px |
| 1440 | 116px | 35px |

**1rem does not fit at 641. `.86rem` does.** Contrast is unchanged — `--ink-faint` is exactly
4.5:1 against the darkest stock, and growing type never raises a bar that is already cleared.

⚠️ **`--player-h` MOVED, 134 → 136.** The rail grew 20px → 22px and the bar grew with it.
That token is what `js/sync.js` reads to know what part of the screen is covered, so a stale
value stops the read-along scrolling. **Measured with `getBoundingClientRect()` at four
widths, not by adding 2 to the old number.** 402px is unchanged at 108 (92 + 16) because the
rail is hidden there and takes its whole height with it.

## 10.2 🔴 The resume toast was the jacket's button, two rounds late

*"the resume thing it has tiny text a tiny x and a resume buton its kinda ugly."*

**It was:** one sans sentence — `Resume "IX. Eyes Opened" at 7:36?` — a **bordered box**
labelled Resume beside it, and a 10px ×. Three treatments for one action, and the box is the
shape this page never uses.

⭐ **It is `.btn-begin` now — the class itself.** Accent rule, drawn play ring, two lines:
the verb, then the place. The toast drops the button's border and left padding so there is
**one accent rule, not two**, which is what the five-minute card does.

🛑 **THIS IS THE THIRD TIME HE HAS RULED ON THIS OBJECT** — *"could the resume button be
any ugglier? That's so pathethic"* (2026-09-05) and *"i meant loud as in ugly lol"*
(2026-09-06), both about `#begin-btn`. **The toast was missed both times because it only
renders for a reader who has been here before, and nobody testing a new build is one.**
⚠️ To see it: `localStorage.setItem('panim:lastChapter', '"ch09"')` and
`localStorage.setItem('panim:lastPos', '456')`, then reload.

**Measured:** 235×60 for the action, 44×44 for the dismiss, at 320 / 402 / 900 / 1440.
Accessible name is one sentence — *"Resume IX. Eyes Opened, at 7:36"* — set on the button,
because two spans read out with no punctuation between them run together.

## 10.3 The Sources section: two labels, one voice, and a quarter of the page empty

*"on the left it has the tiny text … but we already have a title do we need two titles??"*

**Two LEVELS, drawn identically.** "THE SOURCES" and "THE TEXT ITSELF" were the same 10.24px
tracked uppercase in the same margin column. The group name is now a serif heading in the
accent at 20–26px — **the fix `.ni-letter .si-book-name` already shipped**, arriving late.

**And the entries were on columns 3–9 with 10–12 empty down the whole section**, next to two
apparatus sections that both run to the edge. They fill the page in two auto-filled columns
now, and the inter-entry rules are gone: in a grid the top of the second column also cleared
its rule, so the mark appeared over one entry and not its neighbour, and **no selector can
say "first in each column" across every column count.** Names and Places separates sixty
entries with space alone; this does the same.

**The group note was trimmed to one line.** It had re-made the "none was typed by hand"
claim that was deleted from two other standfirsts on the author's word — see
`content/sources.js`, which says at the top that nobody makes the claim any more and then
made it. **The rows are the proof.**

## 10.4 🔴 THE INDEX HAD HIS SISTER FILED UNDER SOMEBODY ELSE'S NOTE

*"do we have my sister in the appendix?"* — **yes, and the entry described the wrong woman.**

`content/names.js` carried **Hannah** with the note *"who prayed at Shiloh, and her face was
no longer sad."* Every occurrence the matcher actually finds is the author's sister:
`ch07-p139` (*"My sister Hannah moved to heaven when she was twenty"*), `ch09-p77` (her
celebration of life) and `ch10-p176`, the one-word paragraph the last chapter turns on.
**1 Samuel's Hannah is never named in the prose — she is "the woman at the tent", every
time.** So the index pointed at three paragraphs about one person and told the reader they
were about another.

🛑 **THIS IS THE FAILURE MODE OF A CURATED LIST WITH A MEASURED INDEX.** The occurrences
are found by scanning the manuscript, which is why they were right; the *note* is typed by
hand, which is why it was wrong. **Nothing checks that a hand-written note describes the
blocks the scanner found.** ⚠️ The other 59 notes have not been audited against their
occurrences. That is a real, small, worthwhile pass and it has not been run.

**The wording is the author's to rule on** — `docs/DECISIONS.md` §G.5 carries it with two
alternatives.

## 10.5 Verified

Zero dead selectors, ids or tokens on a full re-sweep. Braces balance in all five
stylesheets. **Zero JavaScript errors at 320, 402, 900 and 1440.** Both new controls clear
44px on both axes. The rail, the toast, the Sources section and the Names index were each
rendered and read back from a real browser through the same-origin harness described in
`docs/HEADLESS.md`.

---

# 11 · 🎬 v66 — THE CAPTION IS LIT BY THE CHAPTER IT NAMES, AND TWO THINGS WERE QUIETLY WRONG

**2026-09-07.** The author, on the ribbon: *"now we have big text but its seperated from the
very ribbon itself what if we actually had cool text thats different? rather than just black
or white like actually make that text legit make it fn to itnereact with."*

## 11.1 What the caption does now

**The words arrive one at a time, each carrying that chapter's own accent, and cool to ink
over 700ms.** Night blue through I–IV, the fire through V–VIII, morning gold for IX and X.
**The lit plate's numeral takes the same colour in the same frame.**

⭐ **That is the dawn arc — the book's whole argument — running live in the one place a
reader can see all ten chapters at once, in type, with nothing drawn.**

🛑 **IT IS NOT THE ARC HE DELETED, AND THE DIFFERENCE IS THAT NOTHING PERSISTS.** v54 put
ten chips of the chapters' paper stock under the plates and he called them *"so ugly … tabs"*
(§2.8b). A tab is a permanent coloured object competing with the photographs. This is a
colour the type passes **through**: 700ms after a snap the caption is `--ink` again. The only
thing that stays is one numeral — the lit one, which was already being drawn in a different
colour from the other nine. **One line reverts the whole effect** (the `--hook-lit` write in
`js/ui.js` `setLit`).

🛑 **AND IT IS DELIBERATELY NOT THE FIVE-WORDS LIGHT.** The ending's sweep
(`.fivewords-text.is-lit`) is a band of accent travelling across the letterforms, and
`css/components.css` argues there that it *"runs ONCE … because a light that keeps arriving
is a barber's pole, and this one is supposed to have arrived."* **Running the book's last
image on every snap of an index would spend it.** It is also the expensive option:
`background-position` on twenty `background-clip:text` spans repaints every frame; `color`
and `transform` on twenty inline-blocks does not.

⚠️ **THE GAP HE NAMED CANNOT BE CLOSED, AND THAT IS WHY THE FIX IS COLOUR AND TIMING.** The
104px between the strip and the caption is `.pl-rail`'s bottom padding, and it is sized to
the sway's 89px amplitude — the motion he asked for in the last round. Cutting the gap clips
plate I at the bottom of its wave. **So the two are joined by sharing a colour in the same
frame instead of by sharing a space.**

⚠️ **`--hook-lit` IS READ FROM THE CHAPTER'S OWN SECTION, NEVER RETYPED.** The dawn table is
already in two files and that duplication has cost one live bug; a third copy would be worse.
`getComputedStyle` on each `<section data-ch>`, once, cached — ten reads on first paint,
never in a scroll handler.

## 11.2 🔴 THE CAPTION'S RESERVED HEIGHT WAS ONE LINE SHORT AT NINE WIDTHS IN TEN

`min-height` on `.pl-hook` exists so the contents page does not jump under the reader's thumb
when a snap lands on a long hook. **It was reserving less than the tallest hook needs at
every width except 901–1009.** Measured with the real ten hooks at 28 widths:

| width | reserved | actual | |
| --- | --- | --- | --- |
| 320 | 195 | **227** | one line |
| 380–402 | 162 | **195** | one line |
| 440 | 130 | **162** | one line |
| 580 | 97 | **130** | one line |
| 840–880 | 65 | **97** | **two lines** |
| 1010 | 97 | **130** | one line |
| 1440–1920 | 132 | **176** | one line |

**So one snap in ten moved the page by a full line — 32px on a phone, 44px on a desktop —
which is the exact fault the reservation exists to prevent.**

⚠️ **IT IS NOT THE NEW WORD SPANS.** The same sweep run with plain `textContent` — the
wrapping this had before the rebuild — returns the same numbers to the pixel. **The ladder
was simply never re-measured the last time the type grew.** The new steps are where the
tallest hook actually loses a line: **320→7 · 340→6 · 420→5 · 460→4 · 620→3 · 901→4**, and
reserved now equals actual at every width.

## 11.3 🔴 TWO FORCED SYNCHRONOUS LAYOUTS PER SCROLL FRAME, ON A 266,000px DOCUMENT

**This is the scroll-smoothness finding.** `js/motion.js` `onScrollFrame` wrote `--paper` and
`background-color` to the root, **then read** `documentElement.scrollHeight`, then wrote the
whole running head in `updateNav()`, **then read** `#contents.getBoundingClientRect()` inside
`updateTocRoll()`.

**Every one of those reads came after a write, so each forced the engine to lay out the whole
document again before it could answer.**

🛑 **AND THE FILE ALREADY KNEW THE RULE.** `plateFrame` in the same file carries a note
saying *"READ EVERY RECT FIRST, THEN WRITE EVERY TRANSFORM … Never put a style write above a
rect read in this function."* `onScrollFrame` never got it.

⚠️ **THE COMPARE-THEN-WRITE GUARD IS WHY THIS HID.** The root custom properties are usually
not written at all, so it looked clean — but `updateNav` writes on nearly every frame and
`updateTocRoll`'s rect read sat directly behind it. **The guard saved a style recalculation
and paid for a layout instead.**

**Both reads are hoisted into a `pass 1` block now**, and `updateTocRoll` takes the rect as an
argument (it still reads its own when called from init or resize, neither of which is inside
a scroll frame).

⚠️ **`scrollHeight` IS STILL RE-READ EVERY FRAME AND MUST BE** — the sections carry
`content-visibility: auto`, so the document's real height changes as chapters render for the
first time. A cached value would be right at load and wrong by chapter III.

**The rest of the scroll path was already correct and is left alone:** `sync.js`'s handler
touches no layout at all, `swayFrame` reads before it writes and only runs on browsers
without scroll-driven animations, and the four separate `scroll` listeners each schedule
their own rAF — which the browser coalesces into one frame, so the cost was the work, not
the count.

⚠️ **REAL FRAME TIMES WERE NOT RE-MEASURED THIS ROUND, AND THIS FILE WILL NOT PRETEND THEY
WERE.** `--virtual-time-budget` fast-forwards the clock, so rAF deltas under it are synthetic,
and puppeteer is not installed on this machine. **The fix is structural and was verified by
read/write ordering, not by a stopwatch.** A real trace is worth running the next time a
browser with a profiler is on the page.

## 11.4 The apparatus scale went up one step

*"look at the text and find the smallest … do we need to make any text bigger."*

**The answer was in the count.** 10.24px was the computed size of **fourteen components and
just over three hundred elements** — 114 verse-note book names, 51 lexicon chips, 26
roman-numeral index links, 20 back-matter links, 13 block references, the ten plate credits.
**That is not an apparatus floor, it is a third of the type on the page.**

⚠️ **AND IT HAD BEEN WALKED BACK THREE TIMES ONE COMPONENT AT A TIME** — the Names index
letter, the Sources group heading, the player's chapter rail. **This raises the token
instead:** `--ap-sm` .64→.72rem, `--ap-md` .72→.80, `--ap-lg` .82→.90, ratios unchanged,
`--ap-xl` untouched. **Zero horizontal document overflow at 320 / 402 / 900 / 1440 / 1920.**

## 11.5 *"a double title like at the bottom sections"*

**`What Comes Back` was the fifth back-matter section and the only one still drawn as a
label** — its name and a second label counting its own rows (`13 threads`), both 10px tracked
uppercase, side by side. The other four became `.is-bare` on 2026-08-30 (D20-A) and set their
name in the serif; **this one was missed, and it is the section a reader reaches first.**

**It shares that rule now, and the count is gone** — the same ruling that cut *"11 works"*
off the Sources head and *"Ten chapters"* off the contents. **A count of thirteen above a
list of thirteen is the list counting itself out loud.**

## 11.6 One stale comment that was a live trap

`js/ui.js` said **"4.6 SINCE 2026-09-05, and @keyframes pl-drift carries the same value"**
directly above `var DRIFT = 5.6`. The keyframes say 5.6. **The code was right and the comment
was wrong** — and it is the one comment on the page whose whole job is to keep two files in
step, so the next person to reconcile them would have "corrected" the working number to the
stale one and made Firefox drift a different distance from Chrome, silently.

## 11.7 Verified

Zero dead selectors on a full re-sweep. Braces balance in all five stylesheets. All eight
scripts parse. **Zero JavaScript errors at 320, 402, 900 and 1440.** Reserved caption height
equals the tallest hook at twelve widths. `--hook-lit` resolves to the right accent per
chapter and the words settle to `--ink` — read back from the live DOM, with transitions
disabled, because **a transition read under virtual time returns its start value** (this
harness has cried wolf on exactly that before).


---

# 12 · 🎯 v67 — THE CAPTION WAS ITALIC BY ACCIDENT, AND THE PLAY BUTTON GOT DRAWN PROPERLY

**Shipped 2026-09-07.** Seven notes from the author, one bug underneath three of them.

> *"the text we have now is not super splendid iw as thinking different font options… the
> if you only have 5 minutes seems pretty bloated and the coding is uggluy on it such a
> gross looking box… theres more seperation from the chapter description text and the
> pictures than i would rpobably want though i really want the motion and maybe even more
> motion lol… the beggining of chapter descriptions also have weird font not sure its
> working… we need to find a better play button ours is not impressive it looks like
> chlkdrens coding… it should say read or listen the hcoise is yours not read it remove the
> it thats ugly."*

## 12.1 🔴 THE RIBBON CAPTION WAS SET IN ITALIC AND NOTHING SAID SO

**`js/ui.js` built each word of the caption with `document.createElement('i')`.** The UA
default for `<i>` is `font-style: italic`, `.plh-w` never overrode it, and no rule in any
stylesheet mentions italic — so **34px of Literata italic has been the caption's setting
since the caption was rebuilt**, and the only place it was visible was a computed-style dump.

⭐ **THIS IS THE ANSWER TO THREE SEPARATE COMPLAINTS,** including one that had been sitting
open on the decisions sheet for two days: *"im not sure about the kind of text we chose
thats like italics its hard to read?????"* It was never a font choice. **It was a tag name.**

The wrapper is a `<span>`, and `.plh-w` states `font-style: normal` as the second lock.

## 12.2 The rest of *"different font options"* — weight, not family

**350 → 400.** A light weight at 34px is a display setting; this line sits under ten
photographs and above a card, and in night mode it is thin white strokes on near-black.
**400 is Literata's roman — the weight the book itself is set in** — so the caption speaks
in the same voice as the prose it is advertising instead of a lighter, fancier one.

🛑 **THERE IS NO FOURTH FAMILY COMING.** Literata and Archivo are the whole type budget; a
webfont on the critical path for one caption is not a trade this book makes. The alternatives
are ranked in `DECISIONS.md`.

⚠️ **AND THE RESERVED-HEIGHT LADDER HAD TO BE RE-SWEPT,** because the roman is a wider face
than the italic. Every step moved: **320-358 → 7 lines · 360 → 6 · 436 → 5 · 490 → 4 ·
654 → 3 · 901 → 4.** The old `620px` step was **under-reserving by a full line from 620 to
653** — 44px of the contents page jumping under a thumb on one snap in ten, reintroduced by
a change three files away that had nothing to do with layout.

## 12.3 🔴 THE TWO ITALICS THAT WERE CHOSEN, NOT BUGS

`.chapter-hook` and `.toc-hook` — the standfirsts at each chapter opening and in the
contents — **were deliberately italic**, twice, on the argument that a standfirst must not
read as the chapter's own first paragraph. **That separation was already being carried three
other ways** (a lighter ink, a shorter measure, a full line of space) and italic was the
fourth. **Roman at weight 450 replaces it:** heavier than the prose, in a softer ink than the
prose, which is how a printed standfirst is set. Reading speed back, nothing lost the reader
can name.

## 12.4 🔴 MORE MOTION *AND* LESS GAP — the trade this file said could not be won

**Two earlier rounds measured this and reversed themselves,** and the note at `.pl-rail`
concluded *"the real trade is clearance against travel."* **It is — vertically. It is not
between the two ends of the rail.**

⭐ **THE TOP NEEDS THE FULL AMPLITUDE AND THE BOTTOM NEVER DOES.** At `cover 0%` the wave is
fully extended and the rail's *top* edge is on screen, so a −110 plate genuinely rides 110px
up. The rail's **bottom** edge — the one the author is looking at — is not on screen until
the section has climbed far enough that the wave has decayed. Swept at every scroll position
over six viewports, the largest downward travel while that edge is visible is **48–64px.**

🛑 **AND THEN THE OFF-SCREEN ARGUMENT WAS THROWN OUT AND MEASURED AGAIN,** because *"never on
screen"* is a claim about a scroll model, not about pixels. The second measurement is the one
that shipped: **how much empty paper each plate carries below its own title row.** The rail
stretches all ten plates to the tallest, Chapter IV's title wraps, so the one-line plates
carry **26–30px of nothing** at the bottom. At `5.5rem` the worst clip is **23px against a
26px tail at every width from 320 to 1920** — so nothing a reader could see is ever cut, at
any scroll position, on screen or off.

**`PLATE_SWAY` ×1.25** (largest 89 → 111) and **`padding-block: 7.25rem 5.5rem`**, replacing
a symmetric `6.5rem`. `.pl-hook`'s own `.5rem` margin and the rail's `.2rem` went to zero.

**Measured, strip's title row to the caption's first line: 146px → 118px at 1440, 141px →
114px at 402.** Motion up a quarter, gap down 28px, in one edit.

⚠️ **THE TAIL IS THE BUDGET AND IT IS NOT A CONSTANT.** It exists only because `.pl-plate`
is a flex item stretched to the tallest title. **If a chapter title ever stops wrapping — or
another starts — re-measure.**

## 12.5 🔴 THE PLAY BUTTON — five faults, one drawing, three places

> *"ours is not impressive it looks like chlkdrens coding… research a new jhigher quality
> play button like the circle that has the triangle… look for complete coding that we can
> steal or borrow from someones designs."*

**It already was a circle with a triangle.** What made it look homemade — and these are the
five things that separate a drawn icon from a typed one, taken off how Material, Feather,
Phosphor and Lucide actually cut theirs:

1. **The corners were sharp.** `M8 5.5v13l11-6.5z` is three straight lines meeting at three
   points, and a 60° point rendered at 21px is a needle. **`stroke-linejoin: round` with the
   fill and the stroke both `currentColor`** rounds the corners *and* gives back the size
   the rounding takes off.
2. **It was geometrically centred, which looks off-centre.** A triangle carries its visual
   mass at the back edge. The convention is to centre the **centroid** and let the bounding
   box run right — Material's own `play_arrow` puts its centroid 0.33 units *left* of centre
   in a 24 grid and its box 1.5 units right. **This is that, scaled: centroid on 22.0 in a
   44 grid, box centre on 24.6.**
3. **The proportions were thin** — about 46% of the circle's inner width. **51–53%** is where
   a transport button stops looking like a diagram.
4. **The ring was `--ink` at 1px.** A hairline of near-black around a near-black triangle is
   a wireframe. **It takes the accent now** and moves with the dawn arc.
5. **There was no body.** A 46px circle containing two hairlines has no button in it. **A 14%
   wash of its own accent** gives it one *without filling it* — which is why `.btn-begin`'s
   standing rule (*"the ring stays drawn, not filled"*) survives this round rather than being
   overturned by it. **The fill is what hover is for, and hover already did it.**

🛑 **ONE MARK, THREE PLACES, ONE GRID.** `.transport-play` (the bar and the Room),
`.bb-glyph` (the jacket's door) and `.hs-glyph` (the five-minute card) now carry the same
path in the same 44-unit viewBox. **If it changes in one it changes in all three.** Sizes:
begin 34 → 40px, card 40 → 46px, bar 46px, Room 88px.

⚠️ **`--transport-glyph` IS THE BUTTON'S OWN SIZE, NOT A FRACTION OF IT.** `.bb-glyph` and
`.hs-glyph` draw their ring *inside* the viewBox; on `.transport-play` the ring is the
button's border, so the SVG has to be laid over the whole button. Set to a fraction — 24px
was the first try — the triangle lands at **24%** of the circle instead of 49% and the button
reads as a big empty ring with a chip in it, **which is most of what *"childrens coding"*
meant.**

## 12.6 The two typed strings the Room had already fixed

**`−15` and `+30` were still text in the player bar.** The Listening Room replaced its own
pair with a drawn control on 2026-09-05 — *"the two cheapest-looking objects on the screen"*
— **and the bar never got it.** So the bar had one drawn control between two typed ones,
which is most of why it read as unfinished with a good button in the middle.

**`.room-skip`'s rules were promoted to `.skip-mark` in `components.css`** and the Room is an
instance of it (`--skip-size: 62px` against the shared 44). Same circle with a dash gap at
twelve o'clock, same arrowhead, same numeral inside the ring, `aria-hidden`, with the real
instruction on the button's label. **`.player-transport .btn-icon` came off with the markup
it sized;** the transport gap opened `.25rem → .45rem` — three drawn circles in a row need
air where two words and a circle did not.

## 12.7 🔴 THE FIVE-MINUTE CARD — the box went, and it is lit by the chapter it opens

**Fourth complaint about this object, and the answer was one `.btn-begin` had already reached
the day before** for the same word: *"i meant loud as in ugly lol."* The note there is exact
— *"This page is hairlines and paper — a bordered box is the one shape it never uses anywhere
else, which is exactly why a control drawn as one looks like something pasted on from a
different website."* **Every word of that was true of this card, and this card was the more
boxed of the two:** a full 1px edge *and* a tinted fill *and* a second hairline cutting it in
half. **Three chrome elements around four content ones is the definition of the word he
used.**

What is left is **one accent rule down the left edge at 3px** and nothing else. No border, no
fill, no internal rule. **The eye-magnet moved from the rectangle to the thing you press** —
which is where it belongs, and the play mark was redrawn the same round to carry it.

⭐ **AND IT IS RED NOW, WHICH IS THE HALF OF THIS HE ASKED FOR:** *"i like the red color on
the text that looks good the first ones dont look as goood."* **`#plates` carries no
`[data-ch]`,** so everything inside it — this card's rule, its eyebrow, its play mark — was
painted in the **root** accent, the night blue of chapter I. **The card does not go to
chapter I. It goes to chapter VII, which is the fire.** So it takes its own chapter's light:
`.hero-sample { --accent: #A8391B }`, `#E58156` at night. **The door and the room behind it
are the same colour, which is the arc's whole argument.**

🛑 **THE ARC ITSELF IS UNTOUCHED.** Re-colouring chapters I–IV is a separate question and is
on the sheet as one.

⚠️ **AND `.hs-holds` CAME OUT OF THE SANS.** The card was four things in *three* voices —
tracked sans caps, Literata at display size, Archivo at 15px, Literata again. **A reader
does not call that four elements, he calls it bloated.** The eyebrow is signage and stays in
the sans; every other word on the card is out of the book and is set in the book's face. The
site's own rule, at `.verse-note`: *"the serif is the book and the sans is the machine."*

## 12.8 *"remove the it thats ugly"*

**`Read it or listen. The choice is yours.` → `Read or listen. The choice is yours.`** He is
right and it is not only rhythm: *"Read it or listen"* has an object in the first half and
none in the second, so **the two verbs are not parallel and the line limps at exactly the
point it is trying to offer a choice.**

## 12.9 Verified

**Zero JavaScript errors and zero horizontal document overflow at 320 / 402 / 600 / 900 /
1000 / 1440 / 1920, day and night.** All eight scripts parse; braces balance in all five
stylesheets.

**Contrast, composited through every translucent layer to the opaque stock underneath** —
the card now sits on bare paper, which is simpler than the wash it replaced:

| | day | night | floor |
|---|---|---|---|
| caption word · card quote · card title | 15.26:1 | 15.37:1 | 4.5 |
| `.hs-holds` · both standfirsts | 6.26:1 | 8.38:1 | 4.5 |
| card eyebrow (text) | 5.40:1 | 6.73:1 | 4.5 |
| card rule + card ring (boundary) | 5.40:1 | 6.73:1 | 3 |
| transport ring + begin ring (boundary) | 7.07:1 | 8.57:1 | 3 |
| skip numeral | 11.36:1 | 11.36:1 | 4.5 |

**`font-style` reads `normal` on `.plh-w`, `.chapter-hook` and `.toc-hook` at every width, in
both themes** — read back from the live DOM with transitions killed, because a transition read
under virtual time returns its start value and this harness has cried wolf on that before.

**Sway clipping measured at both extremes of the wave, by hand, at seven widths:** 0px at the
top, 23px at the bottom, against a 26px empty tail. **Nothing visible is ever cut.**

**Reduced motion:** no errors, geometry identical, caption upright and readable.
