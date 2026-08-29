# PANIM — the website

Live: **https://jonathandiaso.github.io/Panim/** · repo `JonathanDiaso/Panim` · branch `main`
(GitHub Pages deploys `main` root; a push takes 1–3 minutes to appear.)

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

The **dawn arc** is carried by *paper temperature*: ch. I is cool grey-bone, ch.
X is bright warm white. The table in `css/site.css` `.section[data-ch]` **must
stay identical** to `TOKENS` in `js/motion.js`. Night palette (Direction C) is
the Listening Room's own — deliberately dark, a phone-on-a-nightstand read,
with a 6s idle dim (correct, not a bug). **Standfirsts are option C
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
  verse-notes.js    the 113 verse notes. KEYED BY CHAPTER + CITATION, not by
                    block id — ids move on every rebuild, a citation does not.
c/NN/index.html     GENERATED share stubs, one per chapter. See below.
art/cards/*.jpg     GENERATED 1200x630 JPEG cuts of the plates, for og:image only
css/  site.css (tokens, grid, arc) · components.css · player.css · room.css · polish.css
js/   render.js (DOM) · motion.js (scroll, arc, progress) · sync.js (cues)
      player.js · room.js · ui.js · search.js
art/  *.webp published plates · PROMPTS.md · archive/ (notes + direction studies)
      sources/candidates/superseded frames live on the T7 — see
      art/archive/WHERE-THE-SOURCES-WENT.md
cues/ chNN.json — [{t, id}] on the voice timeline
tools/ build-chapters.py · gen-cues.py · check-coverage.py · tape-vs-page.py · serve.py
       gen-chapter-stubs.py · make-cards.sh
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

## 5. Known-fixed — don't re-diagnose

Phone play/pause race (iOS only honours `play()` inside its own gesture, so the
`<audio>` element's own events now drive the UI) · seekbar drew two scales on
one rail (position vs. chapter ticks — split) · pointer capture +
`pointercancel` on seek drags · stale `loadedmetadata`/`error` listeners
stacking across chapter loads · `--ink-faint` failed WCAG AA at 2.66:1 (ink
tiers now 15.5:6.4:4.5) · Fraunces → Literata (§3) · `--player-h` = 134px/92px.

## 6. Not done

`ch02-trees` is the wrong picture and it is chapter II's **opening** plate — a
fantasy-art woodland with tulips, ferns and a figure in a leaf dress, which is the
worst single frame on the site and the first plate after chapter I · **no
`srcset`, no AVIF, no LQIP** — every plate is served at 1408px to every device,
1.9 MB of art on a full read · source images are 1408px, plates want 2400px+
(accepted for now — a plate is never asked to fill a wide screen at full
bleed) · chapter titles need reconciling, site vs. manuscript vs. audio (§2) ·
`hanging-punctuation` is Safari-only · `tools/validate.mjs` is referenced in
older notes but doesn't exist — `check-coverage.py` and the builder's parity
assertion are the checks now. Full detail, and what's blocked on the author vs.
ready to build: the site handoff linked at the top of this file.
