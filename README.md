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

**Type:** Fraunces (book), Archivo (apparatus), Frank Ruhl Libre (Hebrew), self-hosted
in `fonts/`. Fraunces is variable: setting `font-variation-settings` disables
`font-optical-sizing:auto`, so `opsz` must always be stated — `--fr-normal` (14),
`--fr-mid` (72), `--fr-display` (144). Forgetting this renders body text in the
display cut, which is what made the italics look wrong.

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
css/  site.css (tokens, grid, arc) · components.css · player.css · room.css · polish.css
js/   render.js (DOM) · motion.js (scroll, arc, progress) · sync.js (cues)
      player.js · room.js · ui.js
art/  *.webp published · originals/ source JPGs · incoming/ staged · PROMPTS.md · archive/
cues/ chNN.json — [{t, id}] on the voice timeline
art/incoming/  new photographs staged and named, not yet wired into images.js
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

- Five photographs wired in (they had been sitting on disk, unreferenced).
- WebP conversion: 5.36 MB → 0.58 MB (−89%). Originals in `art/originals/`.
- Contents page; running times read from the audio manifest.
- Chapter hooks rewritten as standfirsts — each was previously a verbatim copy of its
  own opening sentence. **These are drafts written by Claude, in the author's book** —
  originals in `content/HOOKS-original.json`.
- Typographic quotes throughout (203 apostrophes, 44 doubles). Transliteration glottal
  marks (`ra'ah`) deliberately left straight.
- The invitation modal (was a keyboard-shortcut legend).
- Listening Room raised above the page chrome (was z-index 300, under nav 800 / player 900).
- OG card and PWA icons regenerated; both still carried the old gold-on-black design.
- Resume: saves chapter + position; hero button reads `Continue — IV, 12:30`.

## 6. Not done

1. **Twelve new photographs are staged in `art/incoming/`** with descriptive
   names, deduplicated from `~/Downloads`. Nothing is wired into `images.js`
   yet — the mapping needs the author's call, in particular whether chapters
   III and IV take the day or the night version, which is really a question
   about the dawn arc (§3).
2. **Six of fifteen slots still empty** — prompts ready in `art/PROMPTS.md`.
3. **Source images are 1408 px**, the new ones included; plates want 2400 px+.
   They soften on a large display.
4. **Per-chapter Hebrew.** Every chapter opening currently shows the same פָּנִים.
   `satar` for The Hiding, `hester panim` for The Glory Backs Out, etc. Not done because
   the vocalisation would be guessed, and wrong nikkud in a book about a Hebrew word is
   not worth risking. Needs the pointed forms supplied.
5. **Chapter titles** — reconcile site vs manuscript vs audio (§2).
6. `hanging-punctuation` is Safari-only; no clean cross-browser equivalent.
7. `tools/validate.mjs` is referenced in older notes but does not exist.
   `check-coverage.py` and the builder's parity assertion are the checks now.
