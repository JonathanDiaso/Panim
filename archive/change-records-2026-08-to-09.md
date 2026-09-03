# 🗄 SITE CHANGE RECORDS — moved out of `README.md`, 2026-09-03

🛑 **NOT LIVE. This is history, not instruction.** It was 219 lines sitting inside
`README.md` §4 and it is why that file ran to 1,070 lines against the project's own
500-line rule.

⭐ **Each of these is a fault that was found, fixed and shipped.** They are kept because the
*reasoning* is expensive to re-derive — the measurements behind the 44px floor, why the
Lexicon entry is centred and not pinned, what the lock-screen covers must not carry. **If you
are about to re-open one of these, read it first.**

**The live rules that came out of them stayed in `README.md`.**

---

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

**And the apparatus followed on v43**, on the author's *"get rid of unnecessary em dashes"* —
which is D2 answered as option B, the one the sheet recommended. **45 more gone, every one
rewritten rather than re-punctuated:** `content/lexicon.js` glosses (24), `content/thread.js`
(15), `content/marks.js` (5), `content/images.js` (1). *"Glory — and at the root, weight"* is now
*"Glory, and at the root, weight"*; *"Not absence — a decision"* is *"Not absence. A decision."*
Verified in the live DOM: **all five back-matter sections read 0.**

🛑 **NOT swept, and this is the line: `content/chapters.js` and `content/verse-notes.js` are the
BOOK.** ~139 em dashes remain and every one is in the manuscript or its verse notes — attributed
in the DOM to `.block-p`, `.verse-line`, `.chapter-hook` and `.toc-hook`, which are all his prose.
**A dash in a gloss is the site talking; a dash in chapter VII is the book talking.** The author
drew that line himself, twice. **Do not run a global replace over `content/`.**

> ⚠️ **Two of these edits changed meaning and had to be rewritten, not re-punctuated.** An
> appositive dash pair carries a clause; dropping the dashes and leaving the words makes a
> run-on. *"hands focus back — the same sheet plumbing every other overlay uses"* became
> *"hands focus back. It is the same sheet plumbing…"*, and the Lexicon's *"…pasted in by a
> script — not one character was typed from memory"* became two sentences. **Read the sentence
> after the dash comes out.**

### The phone pass, v42

Three things the author found on a phone that no desktop measurement would have shown.

**1 · The Lexicon entry opens in the MIDDLE of the words (v43; it was the top on v42).**
*"when i click on a hebrew word it can open in the midle of the hebew words not the bottom so i
dont lose my place."* v42 took it off the bottom and pinned it under the running head, which
killed the 1,587px scroll. **v43 finishes the thought.** Pinned at the top, the entry has words
only *below* it, so the block you were reading is pushed off the bottom of the screen and your
place is still gone, just in the other direction. Centred, there are words above it and words
below it. Measured at 402px: **232px of wall above, 232px below**, holding through the first ~60%
of the wall, and the page does not move at all when you choose a word.

> The offset is `max(nav + .4rem, 50vh − 11.85rem)` — half the viewport minus half the entry's
> own floor, which is what centres a fixed-height box. **Both numbers are measured, not chosen:**
> 23.7rem is the tallest of the fifty entries, so half of it is 11.85rem, and the `max()` keeps
> the panel from sliding under the running head on a short screen.

**The v42 note below still applies**, because everything it lists is what makes the centring
possible at all:

**1a · Why it can be pinned anywhere.** *"the hebrew doesnt
work on mobile well it goes too far up or down ... so it doesnt pull the page all the way down
and go back up and down."* At 402px the wall is **1,312px tall** and the entry sat under it, so
`js/ui.js` scrolled to the entry on every tap — a **1,587px** journey. Choose a word, get thrown
down the page; want another, climb back. **Fifty words, two page-moves each.** It is
`position: sticky` now, and ui.js stopped scrolling on phones to match.

> 🛑 **Three things it needs.** **(a)** `display: flex` + `order: -1`, **not grid** — a sticky
> element is constrained by its *parent's* box, and in the grid the article's area is exactly its
> own height, so sticky had nowhere to travel and did nothing. **(b)** `order` is safe *here* and
> would not be on the wall: the D14 rule is that visual order must not diverge from tab order,
> and the article is **text with nothing focusable in it.** **(c)** An opaque background, or the
> wall reads straight through it.
>
> 🛑 **And a min-height, or the page still twitches.** The entry is above the wall now, so its
> height change shifts everything below — measured, **19px per tap.** Not the 1,587px he
> reported, but the same fault in miniature. Measured across all fifty entries at 402px: **295px
> shortest, 378px tallest, 351px median.** The floor is the tallest, so no entry reflows the
> page; `min()` with `45vh` keeps it off a shorter phone's screen. **All fifty now render at a
> constant 379px.**
>
> ⚠️ **Measured limit, recorded rather than padded around:** sticky travel ends about **120px
> before the wall's last line**, so the entry drifts off in the final 8% as the controls arrive.
> Fixing it needs ~8rem of dead space at the foot of the section, and dead space is a worse bug.

**2 · The verse references are chips on a phone, and the book name is hidden, not removed.**
*"the verse references can you redesign those for mobile."* At 402px `.si-books` collapsed to one
column, so each citation became a **362px row** carrying "Genesis 3:7", a dotted leader stretched
across the screen, and a numeral hard right — **Genesis alone ran 521px.** And every row repeated
its own heading: **"Genesis" printed under GENESIS, 151 times.** They are a wrapped run of `3:7
IX` chips now, the same shape the Names index uses one section down. **Genesis: 521px → 180px.**

> 🛑 **`.si-ref-bk` takes the visually-hidden clip-path, NEVER `display:none`.** Both
> `display:none` and `visibility:hidden` take the book out of the accessibility tree, and a
> screen reader moving through this list out of context needs it. **The link's accessible name is
> "Genesis 3:7, chapter IX" at every width.** Trading a real user for 60px is not a redesign.

**3 · Names and Places is a list of rows on a phone, not a one-column grid.** *"on mobile the
names and places are not as clean."* **58 entries × 112px** of free-floating blocks separated by
1.4rem of air, and the note capped at **34ch = 255px inside a 362px column** — a cap that exists
to keep a note readable *beside its neighbours*, and there are no neighbours in one column. The
entry is a real row now: full measure, a hairline under it, and the numerals pulled up onto the
name's baseline where a page number goes. **112px → 88px per entry.**

### The book's last sentence was losing its descender

**v42, and it looks like a font problem and is a paint-box problem.** The author, on a phone:
*"i cant see the y well on they will see his face."*

`.fivewords-text.is-lit` paints the words with `background-clip: text` and
`-webkit-text-fill-color: transparent`, so each glyph is drawn **only inside its own background
box.** Inherited line-height put that box at **31.3px under a 30.4px font** — measured at 402px —
shorter than the glyph's descender, so the tail of the **y** in *They* fell outside the paint
area and **was not drawn at all.**

> ⚠️ **`overflow` was already `visible` and nothing was clipping.** There was simply no gradient
> down there to paint with. **Raising `line-height` alone does not fix it** either — the line box
> grows and the inline-block's background box does not. `padding-bottom` on `.fw-word` extends
> the paint area past the baseline; the line-height stops the next line sitting in it when the
> sentence wraps. **Both, or it comes back at one width.** Verified: paint box **40px** against a
> **31px** glyph box.

### The 44px floor, and the audit that missed ten targets at one width

**v43, the author's *"44px rule follow it."*** `.nav-chapters a` was `min-width: 34px`, so the
running head's ten roman numerals measured **34 × 44** at 1280px — clear of WCAG 2.2 SC 2.5.8
(24px) and short of the 44px floor this site holds itself to. They are 44 × 44 now. The strip
grew to **454px in a 1280px shell, no overflow**, and it is `display: none` below 900 so nothing
else moved.

> ⚠️ **The round-sixteen audit had declared the touch-target work closed**, and it missed these
> for one reason: **it measured 402px only, where `.nav-chapters` is not rendered.** A check at
> one width is half a check. The site's other standing exemptions are unaffected and still
> documented: the Index of Scripture's citation rows (dense list, SC 2.5.8) and the ten player
> seek marks (their *position* is the information).

### The lock screen — Now Playing covers, and why nothing is printed on them

**Done 2026-09-03, complete at v50.** Ten square plates, one per chapter, **no
placeholders and no duplicates**, driven by `js/player.js` `artworkFor()` and built by
**`tools/gen-nowplaying.py`** from the author's 1:1 sources in `art/np-src/`. Regenerate
with `python3 tools/gen-nowplaying.py` from `Panim-site/`; it is deterministic and costs
nothing. The generator now **refuses to run** if a chapter has no source, rather than
quietly shipping a neighbour's frame the way v49 did for VII and VIII.

| ch | title | plate | source |
|---|---|---|---|
| I | The God Who Sees | the Ketef Hinnom chamber, a hand on the incised stone | `ch01.jpg` |
| II | The Hiding | the garden, the two of them hiding in the trees from the face | `ch02.jpg` |
| III | The Face They Fled | Sinai burning, the camp standing far off with its back turned | `ch03.jpg` |
| IV | The Word He Kept Rehearsing | the Jabbok, two figures locked in the shallows | `ch04.jpg` |
| V | Mouth to Mouth | the bush alight, sandals off on the rock | `ch05.jpg` |
| VI | Borrowed Light | the veiled face against the sunrise | `ch06.jpg` |
| VII | The Glory Backs Out | the east gate, and the daylight on the far side of it | `ch07.jpg` |
| VIII | The Face Set Like Flint | the face in profile, already turned toward Jerusalem | `ch08.jpg` |
| IX | Eyes Opened | the Emmaus table, bread broken, the window still burning | `ch09.jpg` |
| X | Face to Face | her face, and the hand that turned it | `ch10.jpg` |

**Chapter II is the garden, and it is the author's ruling, not an inference.** Both frames
were supplied and v50 shipped the storm, on the argument that the garden is the same frame
as `art/ch02-trees.webp` — fantasy-art woodland, tulips, ferns, a figure in a leaf dress —
and that promoting it would put the site's weakest picture on the surface a listener stares
at for thirty-five minutes. **The author overruled that on 2026-09-03:** *"i honestly dont
care if it looks like fantasy land … use that pic."* It is now the plate, and the storm is
archived as `alt-ch02-storm.jpg`. Two things follow and both are deliberate:

- **The lock screen and the chapter's opening plate are now the same scene.** That is
  coherence, not duplication — chapter II's identity picture is the garden on the page and
  in the pill. The storm still appears in the chapter as `ch02-storm`, its second plate.
- **It needed a crop, and the crop is measured, not eyeballed.** Rendered whole at 96px the
  root litter across the bottom third ate the frame and both figures shrank into the trees.
  `CROPS[2] = (380, 100, 1024, 744)` takes the light shaft and the two of them; at 96px she
  reads as a bowed figure against a lit trunk, which is the chapter.

**Chapter IX is Emmaus, not the charcoal fire.** Both are in the chapter; *"their eyes were
opened"* is the Emmaus table, and that is the chapter's title. The shore is archived as
`alt-ch09-charcoal.jpg`. It needed a crop to work at 96px; Emmaus does not.

`art/np-src/` also holds frames the generator ignores — it only reads `chNN.jpg`:

| file | what it is |
|---|---|
| `alt-ch02-storm.jpg` | Jonah at Joppa — the v50 plate, kept after the author ruled for the garden |
| `alt-ch04-rebekah.jpg` | Isaac's field at evening, Genesis 24 — an inline candidate for chapter IV |
| `alt-ch08-tornveil.jpg` | the veil torn, light through the cherubim — an inline candidate for chapter VIII |
| `alt-ch09-charcoal.jpg` | the shore fire, John 21 — an inline candidate for chapter IX |
| `wide-ch02-jonah-1376.jpg` | 1376×768, **not square, can never be a cover** — the inline version of the storm |

Three tiers each — **96/256/512** — because Android's notification shade, Auto, Wear and
Bluetooth head units each pick by size, and a single entry makes all of them rescale one
file. ~976 KB for all thirty. **Not precached**, same rule as `art/*.webp`: the plates are
weight and the text is the product.

> 🛑 **Nothing is printed on these plates, and v48 got this wrong.** That version burned a
> roman numeral into all ten to fill the compact Dynamic Island, which iOS draws with no
> text slot of any kind. The author's instruction is that the photographs carry nothing
> printed on them, and it holds even where the system leaves text nowhere else to go. The
> number is in `metadata.title` — *"VII. The Glory Backs Out"* — which is what the
> **expanded** island, the lock screen and Control Center display. The pill shows the
> photograph alone, by design, not by omission.

**Two sources are square and were still wrong at 96px, and only measurement showed it.**
`ch06` is a wide sunrise with a small head in it and read as a beige smudge; `ch02` is a
full forest scene whose bottom third is root litter. Both carry entries in `CROPS`. Every
other source is used whole — the author composes them as squares and they do not need help. **Do not add a crop by eye** — render the tier, look at
it at 96px, then decide. (`ch09` carried a crop at v49 when it was the shore fire; Emmaus
replaced it and the crop went with it.)

**`previoustrack` / `nexttrack` are deliberately `null`.** iOS fills its three transport
slots with the track arrows whenever those handlers exist, so registering both is not a
request, it is a competition, and prev/next wins — which is why ⟲15 never appeared. Cleared,
the lock screen and expanded island give **⟲15 / ⟳30**, and `seekOffset` from the system is
honoured instead of hardcoded numbers. Auto-advance still walks I → X on its own.
`playbackState` is set on every transition; without it a pause from CarPlay or an unplugged
headphone left a ▶ sitting over stopped audio.

**Why the alternates lost, so nobody re-runs the comparison.** `alt-ch04-rebekah` is small
figures against a sunset and goes to mush at pill size; `alt-ch08-tornveil` is a light burst
with no silhouette and reads as a bright blur next to a face in profile. Both are good
pictures at plate size and bad ones at 96px. **That is the only test this folder applies** —
inline plates are judged on entirely different grounds.
