# PANIM — the website

Live: **https://jonathandiaso.github.io/Panim/** · repo `JonathanDiaso/Panim` · branch `main`
(GitHub Pages deploys `main` root; a push takes 1–3 minutes to appear.)

Read this first in a new session. It is the only doc in this repo that describes
current state; everything else here is a brief or an archive.

> 👉 **Then read the handoff:
> [`../panim-book/handoffs/site-handoff-2026-08-27.md`](../panim-book/handoffs/site-handoff-2026-08-27.md)**
> — what happened last session, what was decided, and the ordered worklist for
> this one (fonts and the A/B/C directions first, then a mobile audit).
>
> 🛑 It lives in the **private** `panim-book` repo, not here, because **this repo
> is public** and the handoff quotes the author directly. Keep it that way: put
> session notes there, not next to the site.

---

## 1. Where everything lives — THREE folders, not one

🗺 **The full map is [`../README.md`](../README.md).** Read it before touching
audio or anything on the T7.

**They all live under `~/Panim/`.** (Corrected 2026-08-27 — this table used to
say `~/Panim-audio/` and `~/Panim-site/`, which were not real paths. They now
exist as symlinks into `~/Panim/`, so both spellings work; see `../README.md`.)

| Folder | What it is | Canonical for | Repo |
|---|---|---|---|
| `~/Panim/panim-book/` | **The book.** Manuscript, chapter scripts, sheets, archives. | **The text.** `chapters/01…10-*.md` | `panim-book` (private) |
| `~/Panim/Panim-audio/` | Audio production. Pipeline, masters, transcripts, runbook. | **The narration.** `transcripts/*.srt` | `panim-audio` (private) |
| `~/Panim/Panim-site/` | **This repo.** The published website only. | The site | **`JonathanDiaso/Panim`** (public) |

⭐ **This repo is the one named `Panim`.** The book is in the repo named
`panim-book`. That inversion is the most confusing thing in the project — the
name `Panim` was already taken by this site when the book got its remote.

Docs in the other two folders worth knowing about:
[`../panim-book/START-HERE.md`](../panim-book/START-HERE.md),
`../panim-book/CLAUDE.md`, `DO-THIS.md`, `SITE-V2-PLAN.md`
(the v2 build brief — parts of it are now superseded, see §3);
[`../Panim-audio/RUNBOOK.md`](../Panim-audio/RUNBOOK.md), `HANDOFF.md`, `FABLE-BRIEF.md`.

> 🗄 `../panim-book/site/` is the **v1 skeleton**, last touched 2026-07-19, with
> an empty `audio/`. It is kept only because `SITE-V2-PLAN.md` harvests from it.
> It carries a `SUPERSEDED.md` saying so. **Nothing you add there is published.**

### 🔊 The audio here must stay same-origin

`audio/music/*.m4a` (229 MB) is committed on purpose. Two things break
**silently** if it moves to a CDN without CORS headers and a `crossOrigin`
attribute:

1. `js/room.js` calls `createMediaElementSource()` for the breathing glow.
   Cross-origin media without CORS **taints the graph and plays silence** — and
   it does not throw, so the `try/catch` will not save you.
2. `sw.js` returns early on `url.origin !== location.origin`, so offline
   download and Range-sliced seeking both stop.

Moving it off-origin is a migration, not a cleanup: rehost with CORS, add
`crossOrigin="anonymous"`, rewrite the service worker's origin check, *then*
strip history. Don't do half.

---

## 2. The text — fixed 2026-08-27, and how to keep it fixed

`content/chapters.js` used to be a July draft. Every chapter was edited for the
mic in late August, so the manuscript and the recording agreed with each other
and disagreed with the website: as little as 43% of chapter X's spoken words
were on the page, and the read-along was anchored to text that was up to 57%
absent.

It is now **generated from the manuscript**, which is the script the narrator
actually read. Coverage of the narration by the page, measured against the SRTs:

| | I | II | III | IV | V | VI | VII | VIII | IX | X | all |
|---|---|---|---|---|---|---|---|---|---|---|---|
| was | 60% | 56% | 83% | 79% | 69% | 66% | 47% | 59% | 53% | 43% | — |
| now | 99.1 | 99.1 | 98.4 | 99.1 | 98.5 | 98.4 | 98.7 | 98.1 | 98.9 | 99.2 | **98.8%** |

The remaining ~1% is transcription variance, not missing text.

### The loop, whenever the manuscript changes

```
python3 tools/build-chapters.py      # manuscript -> content/chapters.js
python3 tools/gen-cues.py            # rebuilt text -> cues/*.json
python3 tools/check-coverage.py      # prove the page still matches the audio
```

**Always in that order, and always all three.** Block ids are assigned in
manuscript order, so they move when paragraphs do, and stale cue files point at
paragraphs that no longer exist. `build-chapters.py` asserts word-count parity
with the manuscript per chapter on every run; if it prints `WORD PARITY FAILED`,
something was dropped and the output should not be shipped.

**Never hand-edit `content/chapters.js`.** It is generated. Edit the manuscript
in `~/Panim/panim-book/chapters/` and re-run.

### What the builder carries rather than derives
The manuscript has no marker for these, so they come from the previous build:
the chapter **hooks** (standfirsts), the fifteen **image slots**, chapter X's
**prayer zone**, and the **glossary** terms. Slots and the zone are re-anchored
by matching the paragraph they used to sit beside. Two anchors in chapter X had
lost their text entirely and are placed by hand in the `ANCHORS` table at the top
of the builder — if a rebuild reports `UNPLACED`, that table is where to fix it.

### What it strips, and why
The manuscript is a recording script. It carries 89 `[beat]`/`[swell]`/`[hold]`
pacing marks and 99 pronunciation guides (`[AB-suh-lum]`) written for the mic and
not for the page. Standalone pacing marks become the existing dividers; inline
ones and every pronunciation guide are dropped. A line that is nothing but a
scripture reference becomes a `ref` block: **printed, never cued** — verified
against the SRTs, the narrator does not read those aloud.

## 3. The design, and the rules that hold it together

Rebuilt 2026-08-27 from "premium landing page" to **a book** ("Direction B — The Plate").
Reference class is literary and art-book publishing, not product marketing.

1. **Nothing is centred.** 12-column grid. Text in columns 3–9, apparatus (chapter
   and plate numbers, references, notes) in 1–2 and 10–12.
2. **A photograph is never a backdrop.** Type never sits on a picture. Plates own the
   full width alone; words land on paper underneath.
3. **No decoration pretending to be material.** No gradient text, no gold, no glow,
   no glass. If a rule can do the job, a rule does the job.

The **dawn arc** survives, inverted: carried by *paper temperature*, not black→cream.
Ch. I is a cool grey-bone stock; ch. X is bright warm white. The table in `css/site.css`
`.section[data-ch]` **must stay identical** to `TOKENS` in `js/motion.js` — motion.js
interpolates between them per frame.

**Standfirsts are option C everywhere** — the apparatus sans, in the contents and at
the chapter openings both. Option B (the book's serif) was tried at the openings on the
argument that a standfirst is the author's voice leading into the prose; it read as a
smaller first paragraph and started the chapter twice. The sans says the line is *about*
the chapter, and leaves the drop cap on the first real sentence.

The **Listening Room is deliberately dark.** The page is a book read in daylight; the
Room is a phone on a nightstand. It is the one place the night palette still belongs.
It also has a 6-second **idle dim** — the controls receding is correct, not a fault.

**Type:** **Literata** (book), Archivo (apparatus), Frank Ruhl Libre (Hebrew), self-hosted
in `fonts/`. Setting `font-variation-settings` disables `font-optical-sizing:auto`, so
`opsz` must always be stated — `--lit-normal` (12), `--lit-mid` (28), `--lit-display` (60).
The old `--fr-*` names still work as aliases.

> ⚠️ **This section used to say the italic problem was a missing `opsz`. It was not.**
> Fraunces was replaced on 2026-08-27 because *its italic at text optical sizes is much
> darker in colour than its own roman* — every `<em>` in running prose read as **bold**
> italic. That was measured, not inferred: the same line rendered three ways — with the
> old `'SOFT' 0, 'WONK' 0, 'opsz' 14`, with `'wght' 400` stated explicitly, and with no
> `font-variation-settings` at all — came out pixel-identical. The weight was never
> wrong; the face is built that way and only thins out near `opsz 144`, a display size.
>
> Two further things that download got wrong, worth not repeating: **`SOFT` and `WONK`
> were not in the files at all.** That Fraunces build was cut with `opsz,wght` only, so
> Google had instanced both axes out — the CSS named two axes that did not exist. And
> the files' `opsz` default was 9, not Fraunces' natural 14. **Check a font's `fvar`
> before writing an axis name into `css/site.css`.**
>
> Literata's files are the real variable font: `opsz 7–72`, `wght 200–900`, both intact.
> They also carry **greek and greek-ext**, which nothing here had before — `content/marks.js`
> quotes polytonic Greek (ἀνθρακιά, ch. IX) that was previously falling back to a system
> font. The superseded Fraunces build is in `fonts/archive/fraunces-2026-08-27/`.
>
> Retuned with the face, because Literata sets wider and its light end is thinner:
> `.hero-title` is `clamp(2.2rem, 5vw, 4.4rem)` at weight 350 (was 5.1rem/300 — Literata
> pushed the title onto three lines), and the shared display rule is weight 400.

**Progress** is the running head: numerals ink as you pass them, the current one
carries a hairline that fills (`is-read` / `is-active` / `--ch-progress`).

---

## 4. Files

```
index.html          shell; nav, hero, modals, Listening Room, player
content/
  chapters.js       GENERATED from the manuscript — never hand-edit. See §2.
  archive/          superseded builds, kept
  images.js         photo manifest. one line per slot: {src, alt, caption, ref}
  audio-manifest.js durations + music offsets (source of truth for run times)
  HOOKS-original.json  the chapter hooks as they were before the rewrite
  marks.js          each chapter's own word, pointed and source-verified
  thread.js         the thirteen plants and payoffs, rendered after ch. X
  lexicon.js        the closing lexicon — derives from marks.js, adds nothing
css/  site.css (tokens, grid, arc) · components.css · player.css · room.css · polish.css
js/   render.js (DOM) · motion.js (scroll, arc, progress) · sync.js (cues)
      player.js · room.js · ui.js
art/  *.webp published plates · PROMPTS.md · archive/ (notes + direction studies)
      sources, candidates and superseded frames live on the T7 — see
      art/archive/WHERE-THE-SOURCES-WENT.md
cues/ chNN.json — [{t, id}] on the voice timeline
tools/ build-chapters.py · gen-cues.py · check-coverage.py · tape-vs-page.py
      cue-marker.html
```

Local: **`python3 tools/serve.py`** then `localhost:8899`.

> ⚠️ **Not `python3 -m http.server`.** It types `.m4a` as `audio/mp4a-latm` (a raw
> AAC streaming type, not the MP4 container these are) and ignores Range requests.
> The `<audio>` element gets a type it will not decode: `readyState` stays 0, and
> **no MediaError is ever raised** — audio simply never starts, locally only, while
> production is fine. Pages sends `audio/mp4` + `accept-ranges: bytes`; `tools/serve.py`
> matches it, and sends `no-store` so a stale header cannot outlive a restart.

**After any CSS/JS/content change, bump the version in three places, together:**
`SHELL` and `ASSET_V` in `sw.js`, and every `?v=` in `index.html`. They must
match. The `?v=` query is what actually defeats the browser's own HTTP cache —
bumping `SHELL` alone re-fills the cache from whatever the browser already had.
The service worker now precaches with `cache: 'reload'` for the same reason.

> 🔁 **Checking a deploy takes TWO reloads, and this looks exactly like a failed
> deploy.** The worker that answers the first load after a push is the *old* one —
> it serves its cached shell, then fetches the new `sw.js`, installs, `skipWaiting`s
> and claims the page. Only the second load is the new build. Confirm with
> `caches.keys()` in the console: `panim-shell-v<N>` is the version you are actually
> looking at, whatever the server has. Verified 2026-08-27 — a v13 worker was still
> serving v13 to a browser being answered v18 by Pages.

---

### The read-along, and why it stopped working

`cues/chNN.json` is `[{t, id}]` on the **voice** timeline; the player converts with
`voiceTime = currentTime − musicOffset` (6.0s). All three links were measured against
the audio itself on 2026-08-27, not taken on trust:

| checked | result |
|---|---|
| music lead-in vs. the flat 6.0s the player assumes | **6.00s in all ten**, no drift across the chapter, correlation ≥ 0.996 |
| SRT timestamps vs. the final voice WAVs | constant **+0.51s**, spread **≤ 0.04s** — no pauseclean drift; `HEAD_PAD = 0.5` in the generator is what cancels it |
| `audio-manifest.js` vs. the shipped `.m4a` | within **0.07s** |
| cue data vs. `chapters.js` | **1839/1839** blocks cued, 0 stale ids, 0 out of manuscript order |

So the timing was never the problem. **Following was.** Any `scroll` event set a
`userScrollBroke` flag that only `setFollow(true)` ever cleared, so one glance down the
page killed auto-scroll for the rest of the session — and the Follow button stayed lit
over a page that had stopped moving. Our own smooth scroll fired that same event and
broke it on its first move.

Now: only a real gesture (wheel / touch / a scrolling key, plus a target-aware `scroll`
check that catches scrollbar drags) **suspends** following. It resumes three ways — the
narration reaches a paragraph still on screen, 12s hands-off, or a tap on Follow, which
jumps back to the voice. While suspended the button says so (`#follow-btn.is-suspended`)
instead of claiming otherwise.

`tools/gen-cues.py` now also **interpolates** a block difflib could attribute no word to
(all four were 2–5 word lines like "Israel." that get swallowed into a neighbouring
match) rather than dropping it, and **asserts** cue order against the manuscript — the
check its own comment had promised but never implemented.

## 5. Done — so it isn't redone

**2026-08-27, later session**

- **The phone play/pause bug.** Tapping play on a phone flipped the button to ❚❚ and
  back to ▶ forever without ever playing. Two faults, compounding: `loadChapter()`
  deferred its `play()` into the `loadedmetadata` handler — a network round trip later,
  because the `<audio>` is `preload="none"` — so iOS Safari, which honours `play()` only
  inside the gesture that asked for it, rejected every one; and `play()` then swallowed
  the rejection (`p.catch(function () {})`) while setting `state.playing = true`
  regardless. The bar recorded what we had *asked* for, not what happened.
  Reproduced against the pre-fix file under `--autoplay-policy=document-user-activation-required`
  — tap 2 gave `audio.paused=true` with `state.playing=true` and the button reading Pause.
  Now: playback starts in the same tick as the tap, and **the audio element is the source
  of truth** — its own `play`/`pause` events drive the UI, so an incoming call, the lock
  screen, or headphones pulled out can no longer leave the bar claiming to play. Verified
  across all five states including an external pause.
- **The seekbar drew two different quantities on one rail.** The ten chapter ticks were
  spread evenly *inside* the position track, so the fill said "55% through chapter I"
  while the tick at that same 55% meant "chapter V" and jumped chapters when tapped.
  Split: `#chapter-rail` above carries the labelled book index (I–X, hidden under 640px
  where it would cost 26px of a 92px bar), and `.seekbar` means position, only.
- Seek drags in **both** the bar and the Room use `setPointerCapture` and handle
  `pointercancel`; an interrupted touch used to leave `dragging = true`, after which any
  stray pointermove anywhere on the page scrubbed the audio. Seekbar gained Home / End /
  PageUp / PageDown and an `aria-valuetext` that reads a time instead of "37".
- `loadChapter()`'s `loadedmetadata` and `error` listeners now come off together. Each
  used to remove only itself, so a failed load left its handler behind and later loads
  stacked stale closures over old `resumeAt` / `autoplay` values.
- **The read-along measured the wrong region.** `isComfortablyInView` compared against
  the raw viewport, but the running head covers the top and the player covers the bottom
  134px (92 on a phone) — so a paragraph sitting entirely *behind the player* counted as
  visible and following declined to scroll to it. Both it and `scrollIntoCenterThird`
  now use a `readableBand()` derived from the nav's real height and `--player-h`.
- **`--ink-faint` failed WCAG AA at 2.66:1** and carried real text in eleven places, most
  of it 10–11px caps. The three ink tiers are now 15.5 : 6.4 : 4.5 against the *darkest*
  stock, which is the one to check new values against.
- **Fraunces → Literata** (§3), and `--player-h` re-measured off a screenshot: 134px / 92px.
- `ch01-tomb`, `ch04-river` and `ch05-bush` replaced with the author's frames. The old
  tomb plate had a medieval metal-bound **codex**, a compass, a brush and a photographic
  scale bar in a 600 BC chamber; the old river plate had **one** figure under a caption
  about seeing God face to face; the old bush was from the superseded golden-hour set.
  All three superseded frames in `art/archive/superseded-2026-08-27/`.
- `art/` root cleaned: ten loose author drops filed into `art/incoming/` under descriptive
  names. Six were byte-identical to what was already published; the names now say so.

**Earlier**

- Five photographs wired in (they had been sitting on disk, unreferenced).
- WebP conversion: 5.36 MB → 0.58 MB (−89%). Originals in `art/originals/`.
- Contents page; running times read from the audio manifest.
- Chapter hooks rewritten as standfirsts — each was previously a verbatim copy of its
  own opening sentence. **These ten lines are drafts and are not yet approved by the
  author** — originals in `content/HOOKS-original.json`.
- Typographic quotes throughout (203 apostrophes, 44 doubles). Transliteration glottal
  marks (`ra'ah`) deliberately left straight.
- The invitation modal (was a keyboard-shortcut legend).
- Listening Room raised above the page chrome (was z-index 300, under nav 800 / player 900).
- OG card and PWA icons regenerated; both still carried the old gold-on-black design.
- Resume: saves chapter + position; hero button reads `Continue — IV, 12:30`.

## 6. Not done

1. **The candidate frames are no longer in this repo.** `art/incoming/`,
   `art/originals/` and `art/archive/superseded-2026-08-27/` moved to the T7 on
   2026-08-28 — 37 MB that was published to a public site and never served to a
   reader. See `art/archive/WHERE-THE-SOURCES-WENT.md`. All 47 files were verified
   by MD5 before removal and every one is still in git history.
2. **One of sixteen slots still empty** — `ch07-gate`. Chapter VII has no plate at all.
   `ch10-veil-lift` was the other and was **filled 2026-08-28 (round five)**.
   Prompt ready to paste in `art/PROMPTS.md`.
3. **Source images are 1408 px**; plates want 2400 px+. **The author accepted this
   2026-08-28** — the consequence is that a plate is never asked to fill a wide screen
   at full bleed. `ch10-veil-lift` is the one exception at 1536x1024, a true 3:2.
4. **Two plates are still wrong pictures**, graded 2026-08-28 by opening every file
   rather than reading the notes about them. Neither is a wiring problem:
   - `ch08-veil` 🔴 — **the worst frame on the site.** The curtain hangs in a **Gothic
     cathedral** — pointed arches, ribbed vaults, clustered piers — and there are **no
     cherubim in the cloth**, which is what chapter VIII spends four paragraphs on.
     This slot went ungraded for two rounds because every handoff wrongly said it had
     never been generated.
   - `ch02-trees` 🟠 — improved in round five (clothed in stitched leaves, stone steps
     gone) but still golden-hour on the coldest page, still full of god rays, hair still
     long and light auburn — and they are no longer hiding, which is the caption.

   ✅ **Fixed in round five, 2026-08-28:** `ch02-storm` (was a Viking longship),
   `ch06-shine` (was a hood in a green forest with bokeh orbs), `ch03-mountain` (was a
   volcanic eruption with no boundary line), `ch01-tomb` (had no 1979 marker at all),
   `ch01-scroll` (was modern square Hebrew under "the oldest words we have"). **Three of
   those five had faults a never-list failed to prevent for two rounds and a positive
   description fixed on the first try — see `art/PROMPTS.md` §6.**

   Remaining Tier 2: `ch09-charcoal` (open flames on a fire whose point is that it has
   none) and `ch09-emmaus` (a stool, where Luke's verb is *reclined*).

   **`ch10-morning` is NOT on this list.** It was queued first on the claim that it
   "came back a modern studio portrait." It did not: she is sun-lined, freckled,
   unshaped brows, no cosmetics, coarse head covering. It diverges from its brief in
   three places — an interior rather than a garden, a second figure, a faint smile —
   and the author kept it. Its prompt now describes the picture, so a reroll cannot
   lose it.

   Prompts for all of them are in `art/PROMPTS.md`.
5. **Chapter titles** — reconcile site vs manuscript vs audio (§2).
6. `hanging-punctuation` is Safari-only; no clean cross-browser equivalent.
7. `tools/validate.mjs` is referenced in older notes but does not exist.
   `check-coverage.py` and the builder's parity assertion are the checks now.
