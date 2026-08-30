# PANIM — the website

Live: **https://jonathandiaso.github.io/Panim/** · repo `JonathanDiaso/Panim` · branch `main`
(GitHub Pages deploys `main` root; a push takes 1–3 minutes to appear.)

**Current: v41** (`?v=41`, `panim-shell-v41`) — the Lexicon opens the back matter now, its head
is a name and one line, and its controls sit under the words they filter. v40 before it: two
copy passes over the back matter, the controls rebuilt as tabs, the em dashes out of the site's
own voice, and a paused page that no longer scrolls itself.

Read this first in a new session — the only doc in this repo describing current
state. 👉 Then read the handoff:
[`../panim-book/handoffs/site-handoff-2026-08-27.md`](../panim-book/handoffs/site-handoff-2026-08-27.md)
(decided / blocked-on-author / ready-to-build). 🛑 It lives in the **private**
`panim-book` repo, not here — **this repo is public** and the handoff quotes the
author directly. Put session notes there, not here.

## 1. Where everything lives — THREE folders, not one

🗺 **The full map is [`../README.md`](../README.md).** Read it before touching
audio or anything on the T7.

| Folder | What it is | Canonical for | Repo |
|---|---|---|---|
| `~/Panim/panim-book/` | **The book.** Manuscript, chapter scripts, sheets, archives. | **The text.** `chapters/01…10-*.md` | `panim-book` (private) |
| `~/Panim/Panim-audio/` | Audio production. Pipeline, masters, transcripts, runbook. | **The narration.** `transcripts/*.srt` | `panim-audio` (private) |
| `~/Panim/Panim-site/` | **This repo.** The published website only. | The site | **`JonathanDiaso/Panim`** (public) |

⭐ **This repo is the one named `Panim`** — the book is `panim-book`. `Panim` was
already taken by this site when the book got its own remote; the inversion is
the most confusing thing in the project.

### 🔊 The audio here must stay same-origin

`audio/music/*.m4a` (229 MB) is committed on purpose. Two things break
**silently**, without throwing, if it moves to a CDN without CORS headers and a
`crossOrigin` attribute: `js/room.js`'s `createMediaElementSource()` taints the
graph and plays silence, and `sw.js` returns early on
`url.origin !== location.origin`, breaking offline download and Range-sliced
seeking. Moving it off-origin is a migration, not a cleanup: rehost with CORS,
add `crossOrigin="anonymous"`, rewrite the origin check, *then* strip history.

## 2. The text — generated, never hand-edit

`content/chapters.js` is **generated from the manuscript**, the script the
narrator actually read. Coverage of the narration by the page: **98.8%**
(measured against the SRTs; the remaining ~1% is transcription variance).

```
python3 tools/build-chapters.py      # manuscript -> content/chapters.js
python3 tools/gen-cues.py            # rebuilt text -> cues/*.json
python3 tools/check-coverage.py      # prove the page still matches the audio
```

**Always in that order, and always all three.** Block ids are assigned in
manuscript order, so stale cue files point at paragraphs that no longer exist
if skipped. `build-chapters.py` asserts word-count parity per chapter —
`WORD PARITY FAILED` means something was dropped, don't ship it.

**Never hand-edit `content/chapters.js`.** Edit the manuscript in
`~/Panim/panim-book/chapters/` and re-run. The builder carries, rather than
derives (no marker for these in the manuscript): chapter **hooks**
(standfirsts), the fifteen **image slots**, ch. X's **prayer zone**, the
**glossary** — re-anchored by matching the paragraph they used to sit beside.
`UNPLACED` on a rebuild → fix the `ANCHORS` table at the top of the builder.

## 3. The design, and the rules that hold it together

**Direction B — "The Plate."** Reference class is literary/art-book publishing,
not product marketing. **Nothing is centred** (12-column grid, text in 3–9,
apparatus in 1–2 and 10–12) · **a photograph is never a backdrop** (type never
sits on a picture; plates own the full width alone) · **no decoration
pretending to be material** — no gradient text, no gold, no glow, no glass.

**The apparatus columns are real now, not aspirational (2026-08-29, decision D1-B).**
Until v35 the book set **all 1,911 of its text elements in columns 3–9** and left 10–12
empty on every screen. At **≥1100px** a verse now lays out across the whole width:
citation hung in **1–2**, quotation in **3–8**, and the verse note in **10–12** —
`.verse-box` spans `3 / 13` as a subgrid and places its three children into it. It reads
as a printed critical edition and the prose resumes under the quotation instead of over
the top of a footnote. Below 1100px nothing changed: note under verse, citation under
note. Measured: 375 elements in 10–12 where there were none, and the book is 9,961px
shorter.

> 🛑 **The rule lives on the quotation, not on the box.** The grid row is as tall as the
> taller of its two columns, so `border-left` on `.verse-box` drew an accent rule sized
> to the *note* — a one-line verse got a 100px rule with nothing beside it. On
> `.verse-text` it measures the quote, which is the thing it marks.

> 🛑 **A pair of media blocks that share a breakpoint needs the sub-pixel on the
> max-width side** — `min-width: 1100px` against `max-width: 1099.98px`. Both apply at
> exactly 1100, and at 1100 the citation's static fallback landed in the same grid cell
> as the quotation it names. Silent, and found only by measuring at the breakpoint.

**A citation is set in two voices.** `SONG OF SONGS` tracked and uppercase in the
chapter accent, a hairline across the margin column, then `2:14` in tabular lining
figures with no tracking. Uppercase tracking on digits opens a gap between the numeral
and the colon and the reference stops reading as one address. The split is a regex over
`ref`, verified against all 124 references in `content/chapters.js` — and there is a
**literal space** between the two spans, because below 1100px they are inline and
without it the citation reads and is announced as "Numbers6:24-26".

**The two index-shaped sections speak one language (D4-B).** *What Comes Back* and the
*Index of Scripture* are both **name · dotted leader · number, hard right**. The thread
rail stays in the margin drawing the distance; the numerals moved to the far end of the
row, which is also what removed the `VIIVIII` collision — hard-right numerals cannot
collide with ticks they are no longer under.

**The head is the name and one line, and the controls are UNDER the wall (2026-08-30, v41).**
The author's marks: *"only keep 'Choose a word and it draws itself…' the other lexicon nonsense
is unnecessary. say the lexicon and then the info. let them feel it"* and *"put the hebrew filter
roman numerals below the words."*

- **What went:** the count-title (*"50 words, in the language they were written in"*) and the
  provenance paragraph. Both described the section instead of opening it, over **a wall of fifty
  words a reader can see and count.** What survives is the only line that says something you
  cannot get by looking: the word will **draw itself** and then dim to its root. It is an
  instruction for a thing about to happen, which is why it earns a place two paragraphs of
  description did not.
- 🛑 **The claim is off the site entirely, and I got this wrong before I measured it.** I wrote
  that *"not one character was typed from memory"* had *moved* to the Sources page. It had not:
  **that page's own standfirst carried the sentence and was deleted on v40**, so cutting the
  Lexicon's copy on v41 removed the last one. Checked against the live DOM, not assumed —
  neither section prints it now. ⚠️ **The proof did not go with it.** The Sources page still
  lists eleven works and what each supplied; the sentence was the boast on top of the evidence.
  **Do not restore it to the Lexicon.** If it comes back it belongs on the page that can be
  checked.
- **The controls sit under the wall, in the wall's own columns** (`3 / 10`, not `1 / -1`).
  Above it they were the first thing in the section and read as a toolbar to get past; under it
  they are apparatus for a block you have already seen. ⚠️ **DOM order is tab order**, so a
  keyboard reader now reaches the fifty words first and the sixteen filters after, instead of
  tabbing through the controls to reach the thing they control.

> 🛑 **Two layout traps, both measured, both real.**
> **(1) `.lex-article` needs `grid-row: 1`.** The controls now sit between the wall and the
> article in DOM order, and grid auto-placement is *sparse* — the cursor had advanced past row 1,
> so the article named its column but not its row and was placed in **row 2, a full wall-height
> below the words it describes.**
> **(2) The phone override must come AFTER the base rule.** `.lex-controls { grid-column: 1/7 }`
> was first written inside the 900px block beside `.lex-body`, ~200 lines *earlier* in the file.
> Same specificity, so source order decided it and the base `3 / 10` won: measured at 402px, the
> row sat at **x=141 w=241 under a wall at x=20 w=362.**

**The Lexicon is a wall of words, not a scroll (2026-08-29).** Fifty plates in a
three-column card grid was **8,439px — eight and a half screens** to look up one word,
and a lexicon is a lookup. It is the shape a printed dictionary has now: **all fifty
words set as one block of type in the reading measure**, each a real `<button>` with its
transliteration under it, and **the chosen word's article in columns 10–12** — the same
apparatus column the verse notes moved into on the same day. **One system, used twice.**
Measured: **1,179px, 1.2 screens**, 2.7 on a phone.

**And it has two axes (2026-08-29, v38).** `Show` filters by chapter **or by language**
(Hebrew 41 · Greek 8 · Akkadian 1); `Order` sorts by chapter or **A–Z** on the
transliteration. Chapter order stays the default, because this is the back of *this book*
before it is a dictionary. **The section is still 1,179px** — the controls row was already
there for the chapter filter and the second group fits beside it.

**The sixteen controls set as TABS, not as boxes (2026-08-30, v40).** The author's mark was
*"they look super cheap ... its not pleasant and its cheap"*, and the reason was not the
colour: each one was a **bordered rectangle with a wash and a boxed count badge** — a form
widget — sitting six centimetres above a wall of fifty words whose stated principle is
*"every word is a control and none of them may look like a button."* **The section was
speaking two languages.** The wall's is the one that comes from print, so the controls
speak it now: bare type on an always-drawn hairline, and the one that is on takes a **2px
accent rule** — the same two-state mark `.lex-chip` uses, so choosing a chapter and choosing
a word are now drawn the same way. The count sets as a **superior figure**, the way a
dictionary prints a sense number, instead of a box inside a box.

> **What makes it feel pressed is three things and none of them is a shadow:** hover grows
> the accent mark from the centre to 40% (`transform: scaleX`, so fourteen of them animate
> without reflowing the row); `:active` drops the tab **1px** and pushes the mark to 70%;
> the type goes `--ink-soft` → `--ink`, so the tab gains weight rather than a border.
> `.lex-chip` took the same 1px drop, so both halves of the section answer a finger
> identically. ⚠️ **The press is the one motion a reader can fire sixteen times in ten
> seconds**, so it is removed entirely under `prefers-reduced-motion`.

> 🛑 **Removing the box did not remove the WCAG 1.4.11 boundary — it moved it to one edge and
> made it darker.** The always-drawn rule is `--rule-strong`; the on-state mark is
> `--accent`. Measured at 1280px and at 402px: **all sixteen clear 44×44 on both axes**
> (narrowest 44.0), off-state type **6.26:1**, on-state **15.01:1**. `min-width` stays
> beside `min-height` — that was the D14-E finding, and it is still the only thing keeping
> Chapter I, V and X off 34px.

**It is JUSTIFIED TYPE in three weights (2026-08-30, v39).** It was a flex row with an even
gap — a *list that happens to wrap*. It is now `text-align: justify` over an inline run, so
the block sets **flush to both margins** the way a printed dictionary's headwords do: eight
lines at 1440px, every one flush. **The whole change cost 7px** (1,179 → 1,186).

> 🛑 **Three things it needs, and two are not obvious.** `text-align: justify` stretches the
> **white space** between inline boxes, so `js/render.js` joins the chips on a **newline** —
> joined on `''` there is nothing to stretch and every line silently sets flush left.
> `text-align-last: left` keeps the final line from being stretched into holes. And
> `vertical-align: baseline` is what puts a weight-3 word and a weight-1 word **on one
> baseline** now that they are different sizes.
>
> ⚠️ **It goes ragged-right below 820px.** Measured: at 402px the wall is a 362px column and
> justifying it has to open 75–125px of white — a third of the line. Justification needs a
> measure wide enough to absorb the stretch.

**Three weights, and NOT the raw mention count.** The author asked for the words sized by how
often the book uses them; measuring first showed that would print a lie — **ten entries score
zero**, because they are phrases the book quotes in English and never transliterates, so they
would have been set as the smallest type on the wall. Instead: weight 3 is *panim* alone,
weight 2 is a chapter's own mark **or** a word the prose says five or more times (13 of them),
weight 1 is the rest. **Five is the measured gap in the distribution, not a guess.**

**The wall writes itself once, on first arrival** — `js/ui.js` `inkTheWall()`, an
IntersectionObserver that fires once and then removes the mask entirely. 12ms per chip is a
wash, not a queue. ⚠️ **The trigger cannot be tested here** (§6 trap 9); the CSS state machine
was verified by toggling the classes by hand.

> 🛑 **The sort MOVES DOM NODES. It must never set flexbox `order`.** The wall is fifty
> focusable buttons: `order` repaints them A, B, C while **Tab still walks chapter I, II,
> III**, which is WCAG 2.4.3 on a surface whose whole job is lookup. Moving nodes into a
> fragment costs one layout per tap, focus survives it, and every `#lex-…` id travels with
> its node.

**Three standfirsts got shorter, and one paragraph went entirely (2026-08-30, v40).** The
author's marks were *"we can delete this text"*, *"way too many words"* and *"this is wordy
and lame"*, and all three were pointing at the same habit: **apparatus explaining itself.**

- **Index of Scripture** — the whole standfirst paragraph is gone. It spent three sentences
  explaining that a numeral beside a reference is a chapter you can click, which is the one
  thing on that page a reader works out **by looking at it**. The 26 books did not go with
  it: the count moved **up into the title**, where it costs two words instead of a line —
  *"114 verses, from 26 books, in the order a Bible keeps them."*
- **The Lexicon** — the standfirst named its six sources inline (Masoretic, BDB, Klein,
  Jastrow, BibleHub, the CAD) and **that list has had a section of its own since v39**.
  Printing it twice made the head of the Lexicon read like a colophon. Two sentences now,
  and the clause the paragraph exists for — *not one character was typed from memory* —
  is still in it.
- **The lexica group on the sources page** — *"Two independent sources were consulted for
  every headword rather than one, which is the only reason the next paragraph could be
  written"* is now **"Every headword was checked in two of these, not one."** Same claim,
  a third of the length, and it no longer refers to a paragraph by its position.

**The 31 entries with no root say why they have none (v38).** Not one line — **four**,
because "no root" is true of a Greek verb and of a six-word Hebrew clause for unrelated
reasons: 14 phrases (a space or a **maqqef**), 8 Greek, 8 unconfirmed Hebrew, 1 Akkadian.
**19 rooted + 31 explained = 50.**

> 🛑 `.lex-root-note` sits at `opacity: 0` until `js/ui.js` adds `.is-rooted`, and that
> class only ever lands on a plate that **has** a root. The new sentences carry
> `.is-absent`, which opts out of the reveal — otherwise a line written to close a gap
> would have printed **invisibly, in the gap**.

> 🛑 **`panim` is selected on load**, and every chip carries its slug as an `id`, so the
> hero's פָּנִים (`href="#lex-panim"`) **opens** the entry instead of parking beside it.
> A `hashchange` handler does the selecting, so every `#lex-…` link in the book works.
> Both the chips and the articles are built in one pass over `PANIM_LEXICON`, which is
> why the anchor and the target cannot drift — the same rule as the Index of Scripture.

> 🛑 **The ink-and-root animation fires on SELECTION now, not on scroll.** There is one
> entry visible instead of fifty, so `js/ui.js` drives it and `js/motion.js`'s observer
> only ever catches the one that is open when the reader arrives. `LEX_INK_MS` and
> `LEX_ROOT_HOLD_MS` in `js/ui.js` are the same two numbers as `js/motion.js` and both
> must match the `--lex-ink` transition, or the word is written and taken apart at once.

> 🛑 **The article is not a card.** It was one when there were fifty of them and the box
> was what separated one from the next. Beside a wall of bare type a tinted bordered box
> is decoration pretending to be material. It takes what the verse note takes in that
> column: paper, one rule on the reading side, nothing else.

> 🛑 **No nested scroller on a phone.** The first build capped the wall at `46vh` with
> `overflow-y` to keep the article on screen. A scrolling box inside a scrolling page is
> worse on touch than a long page — the wrong thing scrolls and words leave the screen
> silently. `js/ui.js` scrolls the entry into view below 900px instead.

**The onboarding modal is a doorway, not a second jacket (D2-C).** It carries only what
the hero cannot: the Song of Songs epigraph, one line saying what the thing *is*, the
running time, and two buttons. 🛑 **Do not re-add a headline, the Hebrew mark, or the
thesis to it** — the hero says all three, better, with the photograph. The pull line
lives in `.hero-pull` now.

The **dawn arc** is carried by *paper temperature*: ch. I is cool grey-bone, ch.
X is bright warm white. The table in `css/site.css` `.section[data-ch]` **must
stay identical** to `TOKENS` in `js/motion.js`.

> 🛑 **That duplication has already cost one live bug.** `js/room.js` read `TOKENS`
> for the Listening Room's background, and `TOKENS` became the *paper* arc when the
> site moved to Direction B. From then until 2026-08-29 opening the Room painted it
> `#EDE9DF` — daylight cream — under its own backdrop and grade. Generating both
> tables from one source is still the fix; until then, **check every consumer**.

> 🛑 **A `grid-column` that ends past line 7 needs a range in the `max-width: 900px`
> block too.** Below 900px the grid is six columns, so `3 / 9` asks for a line that does
> not exist and the browser creates two implicit tracks to reach it — after which
> `grid-column: 1 / -1`, which counts back from the end of the *explicit* grid, stops
> reaching the page edge. Measured 2026-08-29: 88 dividers did this, plates rendered
> 374px wide in a 402px viewport, and every paragraph in the book was 28px narrow on
> every phone. **It does not look like a bug. It looks like a margin.**

**The Listening Room is a paper stop, not a second theme** (2026-08-29). It declares
the same seven tokens the page does — `--paper` `--ink` `--ink-soft` `--ink-faint`
`--accent` `--control-edge` `--control-wash` — at dark values, and inherits every
shared component unchanged. There are **no `--room-*` colour tokens any more**, and
there is no `#room .btn` rule. 🛑 **If a control looks wrong in the Room, the token is
wrong, not the component.** Deliberately dark, a phone-on-a-nightstand read, with a 6s
idle dim (correct, not a bug). **Standfirsts are option C
everywhere** — the apparatus sans, both in contents and at chapter openings.

**Type:** **Literata** (book), Archivo (apparatus), Frank Ruhl Libre (Hebrew),
self-hosted in `fonts/`. `font-variation-settings` disables
`font-optical-sizing:auto`, so `opsz` must always be stated —
`--lit-normal`/`-mid`/`-display` = 12/28/60. 🛑 **Check a font's `fvar` before
writing an axis name into `css/site.css`** — a prior Fraunces build was cut with
only `opsz,wght` instanced, so `SOFT`/`WONK` named axes that didn't exist.
Superseded Fraunces build: `fonts/archive/fraunces-2026-08-27/`. **Progress**
is the running head: numerals ink as you pass them, the current one carries a
hairline that fills (`is-read` / `is-active` / `--ch-progress`).

## 4. Files

```
index.html          shell; nav, hero, modals, Listening Room, player
content/
  chapters.js       GENERATED from the manuscript — never hand-edit. See §2.
  images.js         photo manifest. one line per slot: {src, alt, caption, ref}
  audio-manifest.js durations + music offsets (source of truth for run times)
  marks.js          each chapter's own word, pointed and source-verified
  thread.js         the thirteen plants and payoffs, rendered after ch. X
  lexicon.js        the closing lexicon — derives from marks.js, adds nothing
  names.js          WHO and WHERE the names index covers. Curated; it holds NO
                    occurrences — render.js scans the real blocks, so a name the
                    manuscript does not use renders nothing at all.
  sources.js        the sources page. A row with status:'unconfirmed' prints its
                    claim and WITHHOLDS its citation, and says so on the page.
                    Never fill one in from memory — that is what it exists against.
  verse-notes.js    the 113 verse notes. KEYED BY CHAPTER + CITATION, not by
                    block id — ids move on every rebuild, a citation does not.
  derivatives.js    GENERATED by tools/make-derivatives.sh — never hand-edit.
                    slot id -> [{w, src}], the AVIF srcset for every plate.
c/NN/index.html     GENERATED share stubs, one per chapter. See below.
art/cards/*.jpg     GENERATED 1200x630 JPEG cuts of the plates, for og:image only
art/d/*.avif        GENERATED responsive cuts, 640 / 940 / source width. See below.
css/  site.css (tokens, grid, arc) · components.css · player.css · room.css · polish.css
js/   render.js (DOM; also BUILDS the contents, the thread, the lexicon and the
      Index of Scripture — none of those are checked-in files) · motion.js (scroll,
      arc, progress) · sync.js (cues) · player.js · room.js · ui.js · search.js
art/  *.webp published plates · PROMPTS.md · archive/ (notes + direction studies)
      sources/candidates/superseded frames live on the T7 — see
      art/archive/WHERE-THE-SOURCES-WENT.md
cues/ chNN.json — [{t, id}] on the voice timeline
tools/ build-chapters.py · gen-cues.py · check-coverage.py · tape-vs-page.py · serve.py
       gen-chapter-stubs.py · make-cards.sh · make-derivatives.sh
```

Local: **`python3 tools/serve.py`** then `localhost:8899`.

> ⚠️ **Not `python3 -m http.server`** — it types `.m4a` as `audio/mp4a-latm` and
> ignores Range requests, so `readyState` stays 0 and **no MediaError is ever
> raised**. `serve.py` sends `audio/mp4` + `accept-ranges: bytes` + `no-store`.

**After any CSS/JS/content change, bump the version in FOUR files, together:**
`SHELL` **and** `ASSET_V` in `sw.js`, every `?v=` in `index.html`, and the `?v=`
in **both** `404.html` and `accessibility.html`. The `?v=` query is what defeats
the browser's HTTP cache; bumping `SHELL` alone re-fills the cache from whatever
the browser already had. It has been half-done before and `404.html` sat a whole
release behind.

> 🔁 **A deploy check takes TWO reloads** — the worker answering the first load
> after a push is the *old* one; it serves its cached shell, then fetches and
> installs the new `sw.js`. Confirm with `caches.keys()` in the console.

### The back of the book — and the one list that feeds both contents

**The order changed on 2026-08-30 (v41): the Lexicon comes first, then What Comes Back.**
The author's mark was *"move greek lexicon above the thread area that outlines the points coming
back"*, and the reason holds up: **What Comes Back is a rereading.** It only means anything to
someone who has finished the ten chapters, and it spoils the payoffs for anyone who has not. The
Lexicon is a **lookup** — you open it mid-book, from a chapter, and the chapter links point into
it. The thing you reach for while reading now stands before the thing you read after finishing.

> 🛑 **`BACK_MATTER` and `renderAll()` must agree.** The array feeds the contents section AND the
> running head's panel; the push order builds the page. **Move a section in one, move it in the
> other, in the same commit** — a contents page listing the back matter in a different order from
> the page itself is worse than no contents. Verified after the change: page order, contents and
> nav panel all read Lexicon → What Comes Back → Index of Scripture → Names → Sources.

After chapter X the site has three apparatus sections: **What Comes Back** (`#thread`),
**The Lexicon** (`#lexicon`) and the **Index of Scripture** (`#scripture`, added
2026-08-29). Until that date **neither contents surface listed any of them** — the running
head's panel and the contents section both stopped at chapter X — so all three were
reachable only by scrolling a page that was then 262,798px tall. **It is 245,577px now**
— the verse apparatus and the Lexicon each gave a chunk of that back.

**Two more joined them 2026-08-30 (v39), and the back matter is now five sections.**
🆕 **All five were edited down on 2026-08-30 (v40)** — see the standfirst cuts in §3, the
notes and letters below, and the controls that stopped looking like a form.

- **Names and Places** (`#names`) — 58 entries, 38 people and 20 places. The one lookup a
  reader had and could not do: there was an index of verses and an index of words and **no
  way to find Moses, or Sinai, or Hagar.** 🛑 **`content/names.js` is a CURATED list of who
  and where the index covers and holds no occurrences at all** — `renderNames()` scans the
  real blocks, so a name the manuscript does not use renders nothing. That fail-safe is not
  decorative: *Melchizedek* indexes to chapter **X only**, because chapter VI tells his whole
  story and never says his name. One numeral per chapter, landing on the first block that
  names him — Moses is in 103 paragraphs and 103 links would be a wall. God, the Hebrew and
  Greek words, and the books of the Bible are all excluded, each for a stated reason.

  **Every entry says who it is, and the PERSON / PLACE badge is gone (2026-08-30, v40).**
  The author asked *"why arent all the people described? Do we need to name them people?
  lol"* — two marks, one cause. **21 of 58 entries carried a note and 37 carried nothing**,
  so the index described Hagar and left *Moses* as a bare word; and beside a bare word the
  badge that survived was the one reading **PERSON** under the name **MOSES**. The badge
  labelled what the reader already knew and put a second piece of type on all 58 entries.
  It is dropped, `.ni-kind` with it, and **all 58 notes are written** — the split is still
  counted once, in the standfirst, which is where a count belongs. 🛑 `content/names.js`
  now treats the note as **required**: a new entry without one renders a bare name, and
  the header there says so.

  **The letter headings are 46px serif in the accent, not 10px tracked caps (v40).** The
  author's mark: *"the abc near the people and things place could be bigger its hard to
  see."* The cause is a component reused for its name rather than its job — it inherited
  `.si-book-name`, which is right for the Index of Scripture, where the label is a **word**
  (*Deuteronomy*). Here the label is a **single letter** doing what a thumb-index does in a
  printed book: it is the thing you aim at from across the page, and at `--ap-sm` it was
  **the smallest type in the section**. Measured: 10.24px → **46.08px** desktop, **33.6px**
  at 402px, `--accent` on the back-matter paper at **5.23:1**. On the phone it takes the
  rule back, because with no entries beside it a bare glyph reads as a dropped capital.
**And on the same day, all three standfirsts went (v40, second pass).** The author read the
first pass and cut further: *"delete this"* on Names, *"delete this"* on Sources, and *"delete
this"* on what was left of the Index of Scripture's head. **All three paragraphs are gone and
Scripture has no title at all** — it is its margin label and then Genesis, Exodus, Leviticus,
because an index ordered like a Bible does not need a sentence saying so.

> 🛑 **`.si-head.is-bare` / `.lex-head.is-bare`, and the margin label is the `<h2>`.** Two
> sections do this now (Scripture v40, the Lexicon v41) and the class is shared, so a third
> needs no new CSS.
>
> **`.si-head.is-bare`, the original note:** Deleting that title while
> leaving `aria-labelledby="scripture-heading"` pointing at nothing would have left the section
> **unnamed to a screen reader** and put a hole in the heading outline between the Lexicon (h2)
> and the book names inside the section (h3). So the label that was always in the margin takes
> the id and the element. **The two `.chapter-num`s that are headings are the only two on the
> site**, which is why it is written down rather than left to be found. Verified: outline reads H2 *Index of
> Scripture* → H3 *Genesis*, and all four back-matter sections still resolve their accessible
> name.

⚠️ **Two of four are bare now, and the question is half-answered.** Scripture went bare on v40
and **the Lexicon followed on v41** — both use `.is-bare`, both put the margin label in the
`<h2>`. Names (*"58 names, in the order a reader looks them up"*) and Sources (*"11 works, and
what each one supplied"*) still open with a count. Round seventeen D3 asks whether all four
should match; **two now do, which is the argument for finishing it rather than against.**

- **Where These Came From** (`#sources`) — 11 works in four groups. The Lexicon's standfirst
  had always *claimed* its sources (*"not one character was typed from memory"*) and never
  listed them; **a claim nobody can check is decoration.** ⚠️ **Both copies of that sentence were
  cut by the author on v40–v41 and the page now stands on its rows alone** — which is the
  stronger version of the same argument. 🛑 **A row may carry
  `status: 'unconfirmed'`, which prints the claim and WITHHOLDS the citation, and says so on
  the page** — a page built to prove nothing was typed from memory must not itself contain a
  citation typed from memory. It shipped with one such row and it has **none now**: the Ketef
  Hinnom amulets were resolved 2026-08-30 to Barkay, Lundberg, Vaughn & Zuckerman, BASOR 334
  (2004), 41–71, confirmed on the publisher's own record. **Never fill one in from memory.**

> 🛑 **A block's text lives in `html` OR in `lines`, never both.** `build-chapters.py` stores
> a paragraph as `html` and a verse as `lines[]`. The first `renderNames()` read `b.html`
> only, so **every name standing in a quoted verse and nowhere else in its chapter was
> invisible** — and the index looked perfectly correct doing it: 58 of 58 resolved, nothing
> broken, three links missing. It only surfaced when a paragraph in ch. VI was converted to a
> verse and a block went quiet on the same day it changed type. **Anything that walks the
> manuscript must read both shapes.**

🛑 **`BACK_MATTER` in `js/render.js` is the single definition, and `js/ui.js` reads it off
`window.PANIM_RENDERED.backMatter`.** Do not give the running head its own copy. Two
hand-kept copies of one list is exactly how `js/room.js` came to paint the Listening Room
cream from the wrong table.

**The Index of Scripture** is built at render time from `PANIM_CHAPTERS` — 113 citations,
26 books, canonical order.

- 🛑 **Never turn this into a checked-in `content/scripture.js`.** It links to block ids,
  and block ids MOVE on every rebuild — that is why `content/verse-notes.js` keys on
  chapter + citation instead. It is safe here *only* because the anchor and the link are
  produced from the same array in the same pass. A generated file would go stale silently.
- The two quotations in chapter V that carry no reference on purpose are correctly absent.
- It is the one section that runs `grid-column: 1 / -1` for its body. Prose keeps its
  measure in columns 3–9; an index is a lookup and wants columns.

**All three of these sections now speak the same language, which was not true a day ago.**
*What Comes Back* and the *Index of Scripture* are both **name · dotted leader · number,
hard right** — the leader is literally the same three CSS declarations in both. The
Lexicon is the wall-and-article pair described in §3, and its article stands in the same
columns 10–12 the verse notes do. 🛑 **Before adding a fourth apparatus section, use one
of these two shapes.** The back of the book was three sections in three idioms and that
is what made it feel like an appendix.

### The plates are responsive — `srcset` + AVIF

Every plate used to go out at its full width to every device: a 402px phone
downloaded a 1408px WebP and painted it at 402. **1.9 MB of art on a full read,
`srcset` on zero of seventeen images.** `tools/make-derivatives.sh` cuts each plate
to 640 / 940 / its own source width in AVIF and writes `content/derivatives.js`;
`js/render.js` wraps every image in a `<picture>` with an AVIF `<source>`. Measured
after: **a phone pulls ~292 KB instead of 1916 KB.**

- 🛑 **The `<img src>` stays the original WebP.** It is the fallback for a browser
  with no AVIF, and `js/ui.js`'s lightbox reads that attribute to show the picture
  full size. Point it at a derivative and the lightbox shows a thumbnail.
- 🛑 **The top tier is the SOURCE's own width, never a hard-coded 1408.** Two plates
  are 1376 wide and one is 1536. Hard-coding 1408 would either upscale them or leave
  a 1376 plate with no tier above 940, which makes *desktop* worse than before.
- 🛑 **`sips` is the whole toolchain** — it reads WebP and writes AVIF, and ships with
  macOS. `cwebp`, `avifenc` and ImageMagick are **not** on this machine.
- The `sizes` attributes in `render.js` (`PLATE_SIZES`, `SLOT_SIZES`) are the widths
  the CSS actually gives the figure. **Change the grid, change them.**

**Replace a plate → re-run `make-derivatives.sh` AND `make-cards.sh`.**

### Sharing a chapter — the `/c/NN/` stubs

index.html is one file, so it carries **one** set of Open Graph tags. A link to
`#ch07` unfurls as the whole book and cannot say anything else. `c/07/index.html`
is a generated stub carrying chapter VII's own title, standfirst and plate that
redirects a reader into the book; the *Share this chapter* button at each chapter
head copies that URL. Regenerate after any title, hook or plate change:

```
python3 tools/gen-chapter-stubs.py     # reads chapters.js + images.js via node
sh tools/make-cards.sh                 # only when a PLATE changed
```

> 🛑 **`og:image` is a JPEG, never the `.webp` plate.** Several unfurlers —
> iMessage and the Facebook/Instagram crawler among them — drop a WebP card
> **silently**, with no error and no image. `art/cards/*.jpg` exists only for
> this. Replace a plate, remake its card.

### Search

`js/search.js`. The index is built **lazily, in the browser, on first open** from
data already parsed — building it at load would put a pass over fifty thousand
words in front of the first paint for every visitor, and most visitors never
search. Five kinds of record, weighted, because a lexicon plate is a better answer
to "where is *masveh*" than the ninth paragraph containing it. Hebrew is indexed
pointed **and** stripped, so `פנים` finds `פָּנִים`. `/` opens it.

> 🛑 **Not stemmed, on purpose.** Stemming would make *faces* find *face* and
> *facing*, and in a book that turns on one noun that returns the whole book.
> Prefix matching on the final term covers typing.

### The read-along

`cues/chNN.json` is `[{t, id}]` on the **voice** timeline; the player converts
with `voiceTime = currentTime − musicOffset` (6.0s, flat across all ten
chapters). Following is gesture-driven: only a real wheel/touch/key
**suspends** it, resuming on a still-visible paragraph, 12s hands-off, or a tap
on Follow. `readableBand()` excludes the running head/player bar from view.

🛑 **A PAUSED PAGE NEVER MOVES ITSELF (2026-08-30, v40).** The 12s idle-resume was gated on
`followEnabled && !suspended` **and nothing else — and both of those stay true across a
pause.** So: play a minute, pause, scroll off to read somewhere quietly, and twelve seconds
after your hand came off the wheel the page **scrolled itself back** to the paragraph the
voice had stopped on, with nothing playing and nothing asking. The author's words: *"The
screen moves back when im looking at a section ... its moving even when i dont play it."*
The snap-back is right and it stays; `js/sync.js` now tracks `playing` off
**`panim:play-state`** — which player.js emits from the `<audio>` element's own
play/pause, so a lock-screen tap and a pulled headphone count too — and the resume timer
**checks it at the moment it FIRES, not when it is set**, because the reader can pause
during the twelve seconds it is counting. A pause cancels a countdown already running; a
play re-arms it, so following still comes back on its own.

> ✅ **Verified with virtual time, not by reading it**: play → gesture ⇒ `suspended`; pause
> ⇒ still suspended after **13s** (the old build unsuspended and scrolled here); play again
> ⇒ unsuspended after 13s. `PANIM_SYNC.state()` reports `playing` now, which is what makes
> that testable at all.

### Em dashes are gone from everything the site says in its own voice

**2026-08-30 (v40), the author's *"get rid of em dashes those arent necessary right maybe in the
text we can use a few but around the website theyre trashy."*** The line is his and it is the
right one: **chrome is not prose.**

**Swept:** `<title>`, the meta and og descriptions, **the JSON-LD block**, the hero and About
copy, the *One Promise* title, the running head's share text, the player's edition toggle, the
Room's Read button, the Lexicon's four root-absence sentences, the source rows,
`accessibility.html` and `404.html`. **Zero left in any of it.**

> ⚠️ **The JSON-LD is the site's voice too, and it was missed on the first pass** because a
> visible-text check strips `<script>`. `name` and `description` in the structured data are what
> Google prints in a result — **externally visible, just not on the page.** Caught by grepping
> the deployed file rather than the source. Sweep `<script type="application/ld+json">` by hand.

🛑 **NOT swept, deliberately: the author's writing.** 142 em dashes remain and every one is in
`content/chapters.js` (67), `content/verse-notes.js` (64), `content/lexicon.js` glosses (24) and
`content/thread.js` + `content/marks.js` (16). **A dash in a gloss may be the site talking and a
dash in chapter VII is the book talking**, and that line is the author's to draw — it is round
seventeen D2. **Do not run a global replace over `content/`.**

> ⚠️ **Two of these edits changed meaning and had to be rewritten, not re-punctuated.** An
> appositive dash pair carries a clause; dropping the dashes and leaving the words makes a
> run-on. *"hands focus back — the same sheet plumbing every other overlay uses"* became
> *"hands focus back. It is the same sheet plumbing…"*, and the Lexicon's *"…pasted in by a
> script — not one character was typed from memory"* became two sentences. **Read the sentence
> after the dash comes out.**

## 5. Known-fixed — don't re-diagnose

Phone play/pause race (iOS only honours `play()` inside its own gesture, so the
`<audio>` element's own events now drive the UI) · seekbar drew two scales on
one rail (position vs. chapter ticks — split) · pointer capture +
`pointercancel` on seek drags · stale `loadedmetadata`/`error` listeners
stacking across chapter loads · `--ink-faint` failed WCAG AA at 2.66:1 (ink
tiers now 15.5:6.4:4.5) · Fraunces → Literata (§3) · `--player-h` = 134px/92px ·
**the Listening Room painted itself cream** (`js/room.js` read the page's paper table
— see §3) · **`opacity` on text is a colour nobody measured**: four separate AA
failures found on 2026-08-29 by compositing rather than eyeballing —
`.chapter-mark` at `.62` (2.58–2.95:1, all ten chapters), `.meta-time` at `.6`
(4.31:1), `#follow-btn.is-suspended` at `.55` (3.69:1), `.sheet-note` at `.65`
(2.91:1). All four now use `--ink-soft`/`--ink-faint`/`--accent`, which are measured
against every paper stock · 113 verse notes were 113 `<aside>` **landmarks** flooding
the screen-reader rotor (now `role="note"`) · `role="dialog"` on `<aside>` is not
allowed by ARIA (the four sheets are `<div>` now) · **Follow had no sighted state at
all** — `js/player.js` toggled `.is-active` and no stylesheet matched it ·
**every phone paragraph in all ten chapters was set 28px narrow and no plate was
full-bleed** — `.divider-beat`/`.divider-swell` were `grid-column: 3 / 9` with no mobile
range (see the grid note in §3) · **Literata GREEK was never precached** — `l00` is
greek-*ext*, so offline every Greek word broke across two faces mid-word ·
**the reduced-motion rule for the plates had never applied** — it said `.reveal` (0,1,0)
against `.plate.reveal` (0,2,0) and lost the cascade every time ·
**every expanded thread note in *What Comes Back* was setting 88px wide** — two words to
a line, thirteen times, in the section the book closes on. Chrome 131 wraps `<details>`
content in a UA pseudo-element, **`::details-content`**, and *that* is the grid item, so
`.thread-detail`'s `grid-column: 3 / 11` was resolving inside a plain block. 🛑 **A
`<details>` that is a grid container must place `::details-content` too, and must never
override its `content-visibility`** — the UA uses it to hide the closed state ·
**five inline pictures announced themselves as figures** — `<figure tabindex="0"
role="button">`, and `<figure>` has an implicit role that cannot be overridden, so the
role was silently discarded (axe `aria-allowed-role`). Each is a real `<button>` wrapping
the picture now, **not** the `<figcaption>`, and the synthetic Enter/Space handler in
`js/ui.js` is gone because a button already fires click on both keys.

**Three more from 2026-08-29, and the first one is a rule worth more than the bug.**
🛑 **`[hidden]` LOSES TO AN AUTHOR `display` RULE.** `hidden` is `display:none` in the UA
stylesheet and any author `display` on the same element beats it outright. `.lex-plate`
is `display:flex`, so all forty-nine closed lexicon entries painted and the section
measured **22,564px — three times what it replaced** — while looking merely long. Three
elements on this site toggle with `hidden` and carry `display`: `.lex-plate`, `.sheet`
and `.modal`. **All three now restate `[hidden] { display: none }`, and that is why.**
· **Thirteen headings announced a stray "plus"** — `content: '+'` on
`.thread-name::after` is in the accessibility tree, so every *What Comes Back* row read
as «"Lift up my face" plus», on a `<summary>` that already announces its own state. It is
`content: '+' / ''` now — **generated-content alt text**. Found by diffing
`Accessibility.getFullAXTree`; axe reported zero violations before *and* after, because a
name with a stray character in it is not a violation, it is just wrong ·
**`openSheet` focused inside a `requestAnimationFrame`** and `js/room.js` never did. rAF
is a rendering callback the browser suspends whenever the document is not painting, so a
frame that never lands means focus never enters the dialog. Both are synchronous now —
**one pattern, one implementation.**

> 🛑 **"Zero automated violations" has a date on it.** Round eleven ran axe and reported
> zero everywhere; a current axe found five the next day, on a page that had not changed,
> because the rules moved. **Re-run it every round.** **Current state: axe-core 4.13.0,
> 2026-08-30 — zero violations on `index.html`, `accessibility.html` AND `404.html`.** It had
> not been run for three rounds before that, across two entirely new sections. The earlier
> pass also covered 402/900/1100/1440px with the Room, all four sheets, all thirteen threads
> and the lightbox forced open — and the screen-reader claim on `/accessibility.html` is
> still the honest one, because nothing here has been driven with one.

> 🛑 **Every sub-44px target on this site is now either fixed or documented with a reason.**
> Fixed 2026-08-30: the hero's פָּנִים (42 × 27) and the About sheet's *One Promise* link
> (351 × 31) — both failed on **both** axes and both were older than the round that found
> them. Exempt and annotated in place: the **Index of Scripture's citation rows** (dense list
> of links) and the **ten player seek marks** (their position on the scrub bar *is* the
> information — growing them would overlap the chapter boundaries and move each tick off the
> moment it names). Both notes say what would make the exemption stop applying.
> **At 402px there are zero sub-44px targets of any kind.**

## 6. Testing this site in a headless browser

🛑 **Nine traps, every one of which produced a wrong conclusion at least once.** Traps 5,
6, 7 and 9 each produced a *reported fault that was not there* — and trap 7's fault was in
the harness's own conclusion about trap 4. Read this before reporting anything visual as
broken.

1. **The headless viewport has a 500px floor.** `--window-size=402,844` renders the page
   at **500px wide and crops it** — it does not narrow the layout. Measured:
   `documentElement.clientWidth` returned 500 at requested widths of 402, 375 *and* 320.
   **Phone testing must use a same-origin iframe sized in CSS pixels**, with the outer
   window at 500 or more.
2. **A first visit opens `#onboarding-modal` over everything**, so a screenshot of "the
   site" is a screenshot of the modal. Set `localStorage['panim:onboarded'] = '1'` from a
   script in `<head>`, before `js/ui.js` runs.
3. **The chapters are rendered by `js/render.js` after load.** Waiting for any `[data-ch]`
   matches the *static* hero and fires before the book exists. Wait for
   `.section[data-ch="1"]`.
4. **`--screenshot` races an `addEventListener('load')` handler**, but
   `--virtual-time-budget` genuinely does advance timers — verified with a page that
   repaints after 2s. Do the work on a short `setInterval` inside the harness.
5. **`Input.dispatchKeyEvent` needs `text` before Enter or Space will activate
   anything.** Without `text: '\r'` (and `unmodifiedText`) Chrome delivers `keydown` but
   never generates the `keypress` that runs a control's default action. `rawKeyDown` does
   not work either; the type must be `keyDown`. **Every button on the site looked broken
   and every one of them worked in a browser.** Tab is unaffected, which is what makes
   this convincing — the tab order comes back correct while nothing activates.
6. **`document.visibilityState` can flip to `hidden` mid-session, which correctly
   suspends every `requestAnimationFrame`.** For ten minutes it looked as though every
   overlay after the first one failed to take focus — reproducible six times running. It
   was rAF, suspended, because the page had gone hidden. **Read
   `document.visibilityState` before believing any timing result out of headless**, and
   note that `Page.startScreencast` does *not* fix it.

7. 🆕 **A `file://` harness cannot reach into an `http://localhost` iframe (2026-08-29).**
   Different origins, so `contentDocument` is **null**, the `load` handler throws on its
   first property access, and **nothing in the harness runs** — no dismiss, no scroll, no
   measurement. The screenshot comes back looking *wrong* (the onboarding modal, the top of
   the page) rather than broken, so it reads as a site fault. **Serve the harness from the
   same origin — `http://localhost:8899/`, beside the site.**
   > 🛑 **It disguises itself as trap 4.** From the outside this is indistinguishable from
   > *"`setInterval` is starved under `--virtual-time-budget`"*, and that is exactly the
   > conclusion round fourteen reached and nearly wrote into its invariants — **while trap 4
   > above already said the opposite.** Re-tested same-origin: **the interval ticks nine
   > times in a ten-second budget.** Trap 4 is correct and stands. **The contradiction with
   > this file is what caught it**, which is the argument for reading §6 before adding to it.
8. ⚠️ **Deep sections do not paint in a headless screenshot at all**, because they carry
   `content-visibility`. Scrolling to `#lexicon` or `#scripture` and shooting gives a blank
   frame however long the virtual-time budget is. **Measure with `getBoundingClientRect` and
   dump the numbers — do not try to photograph them.** That is this project's standing rule
   anyway: the section height is *measured* after every layout change, not looked at.

9. 🛑 **`requestAnimationFrame` and `IntersectionObserver` deliver ZERO callbacks here,
   and a transition therefore reports its START value forever.** Proven 2026-08-30 on a
   *minimal* page — one 50px div in view, `visibilityState: 'visible'`, no site code at
   all — which returned `IO callbacks=0 rafs=0`. Every rendering-lifecycle callback is
   dead in this configuration.

   > 🛑 **The second half is what actually bites.** `getComputedStyle` on a transitioned
   > property returns the value the transition is animating *from*, and that transition
   > can never advance — so a rule that applied perfectly reads back as a rule that did
   > not apply. On 2026-08-30 this reported `--lex-ink: 0%` where the rule says `112%`
   > and `opacity: 1` where the rule says `0`, and both looked exactly like broken CSS.
   > **Inject `* { transition: none !important }` and read again: the computed value is
   > then the TARGET, which is the thing under test.** Both came back correct.
   >
   > It also means **an `IntersectionObserver`-triggered effect cannot be verified
   > end-to-end here at all.** Verify the CSS state machine by toggling the classes by
   > hand, say so, and leave the trigger to a real browser. This is trap 4's family: the
   > browser is not running the frame loop, so anything that waits for a frame waits
   > forever.

⚠️ **And one that is not the browser: a contrast probe must composite alpha.** Walking up
for a background colour and stopping at the first non-transparent one reads
`rgba(25,21,16,.03)` — a 3% tint — as near-black, and turns a **4.91:1 pass into a 2.92:1
failure that is not there.** Composite every translucent layer down to the opaque one
underneath.

> 🛑 **The rule under all ten: a measurement that says something is broken is a claim
> about the MEASUREMENT until the measurement has itself been checked.** Three separate
> "faults" were reported by the harness in one evening on 2026-08-29 — a contrast
> failure, a dead Enter key, and every overlay losing focus — and **all three were the
> harness.** Two more followed on 2026-08-30, both from trap 9, and both were the harness.

🆕 **To actually SEE a deep section (trap 8), extract it rather than scroll to it.** Read the
section's rendered `outerHTML` out of the live page, write it into a standalone document that
links the same three stylesheets, and screenshot *that*. It paints, because it is no longer
deep. It is how the Lexicon wall, the sources page and the names index were checked on
2026-08-30 — and it is the only way this project has ever got a real picture of the back
matter.

**Measuring, not eyeballing, is what found every fault in §5.** The three that a
screenshot could never have shown:

```js
// which grid items overflow the six-column mobile grid (finds the 3/9-with-no-range bug)
getComputedStyle(section).gridTemplateColumns.split(/\s+/).length   // must be 6 at ≤900px

// which font subsets are actually reached (diff this against the precache list in sw.js)
performance.getEntriesByType('resource').filter(r => /woff2/.test(r.name))

// what a translucent ink really composites to — an opacity on text is an unmeasured colour
```

Reduced motion is checked with `--force-prefers-reduced-motion=reduce`, and an override
must be written at the **specificity of the rule it overrides**.

## 7. Not done

🟡 **Ten sub-44px targets at 1280px, found 2026-08-30.** `.nav-chapters a` is
`min-width: 34px` — the running head's roman numerals measure **34 × 44**. They clear WCAG 2.2
SC 2.5.8 (24px) and fail the 44px floor this site holds itself to. **The round-sixteen audit
missed them because it only measured 402px, where the strip is `display: none`.** Round
seventeen D5; the fix is one declaration and about 100px of head width, which is available at
1280 and irrelevant below 900.

`ch02-trees` is the wrong picture and it is chapter II's **opening** plate — a
fantasy-art woodland with tulips, ferns and a figure in a leaf dress, the worst single
frame on the site and the first plate after chapter I · **no LQIP**, and no genuine 2×
on a wide screen — source images are 1408px and plates want 2400px+ (the *delivery* half
shipped 2026-08-29, §4) · **the dawn arc is still a hand-kept table in two files**, and
that duplication has already cost one live bug (§3) · chapter titles need reconciling,
site vs. manuscript vs. audio (§2) · **the player and the Listening Room have still never
been driven with a screen reader** — automated checking is green, which is exactly why
this is the only thing left that can find what is wrong · `hanging-punctuation` is
Safari-only · `tools/validate.mjs` is referenced in older notes but doesn't exist —
`check-coverage.py` and the builder's parity assertion are the checks now.

**The Lexicon is no longer on this list, and neither are the two questions it raised.**
Both shipped 2026-08-29 (v38): the wall **filters by language and sorts A–Z** as well as by
chapter, and the **31 entries with no root now say why they have none** — in four sentences,
not one, because "no root" is true of a Greek verb and of a six-word Hebrew clause for
unrelated reasons. §3 has both.

✅ **Chapter VI is FIXED, and the item it was replaced by is a different chapter.** The
2026-08-29 note here read *"chapter VI runs 47 paragraphs with no verse, picture, divider or
break"* — **it has eleven verses**; the real fault was a 47-paragraph *run*, blocks 5–51. A
`[swell]` at the *melammu* turn and the priestly blessing promoted to a verse block took it
to **24 paragraphs / 582 words**, and chapter VI is now the sixth-densest chapter, not the
first.

**The real outlier, measured across all ten chapters 2026-08-30: chapter X runs 1,138 words
over 25 unbroken paragraphs**, only 4 of them short beats. No sheet has ever flagged it,
because attention kept going where a previous sheet pointed instead of where the manuscript
was. Chapter IV is third (680 words) **but needs nothing** — that stretch is the chapter's
opening, already framed by a plate at one end and Genesis 32:20 at the other. **Chapter III
(661 words) is the one that still wants an inline picture**, and `art/PROMPTS.md` carries the
prompt for it.

> 🛑 **A third item stood here for three rounds and was never true.** It read *"neither
> contents surface says how long a chapter is"* and asked for work that had already
> shipped: **both** surfaces have carried per-chapter minutes since before it was written —
> `js/render.js` renderContents draws `.toc-dur`, `js/ui.js` buildNavToc draws `.ntr-dur`,
> both off `content/audio-manifest.js`. It survived because each round copied the line
> forward instead of opening the file, and **the author caught it by asking**. Removed
> 2026-08-29. **A backlog item is a claim about the code until it is re-read.**

**Measured and NOT worth a round**, so nobody spends one: the whole site is **218 KB
gzipped** including the complete text of the book (`content/chapters.js` is 93 KB of
that — do **not** split it per chapter) · first contentful paint **76 ms**, DOM
interactive **47 ms**, load complete **221 ms**, 6,085 nodes, cold cache, uncompressed
HTTP · the seek-bar chapter marks look 9×16px and carry a 44px invisible `::before`,
so they already pass.

**The screen-reader position, stated honestly.** Everything a machine can check is green
and measured: the full accessibility tree at four widths, a keyboard walkthrough with
real key events, **111 controls all named**, 7 named landmarks, no skipped heading
levels, 24 selectors measured for contrast (worst **4.63:1**), zero axe violations
everywhere. **That is a floor, not a pass**, and `/accessibility.html` still says in
public that the player and the Listening Room have never been driven with a screen
reader — because they have not. The remaining hour is six steps, in
`next-steps-2026-09-03-round-fourteen.md` §8.

All five design calls are answered and archived
(`panim-book/handoffs/archive/decisions-2026-08-29-design-answered-2026-08-29.md`); four
are built and live. What's blocked on the author vs. ready to build: the site handoff
linked at the top of this file, and `next-steps-2026-09-03-round-fourteen.md` §7–9.
