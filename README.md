# PANIM — the website

Live: **https://jonathandiaso.github.io/Panim/** · repo `JonathanDiaso/Panim` · branch `main`
(GitHub Pages deploys `main` root; a push takes 1–3 minutes to appear.)

Read this first in a new session. It is the only doc in this repo that describes
current state; everything else here is a brief or an archive.

---

## 1. Where everything lives — THREE folders, not one

| Folder | What it is | Canonical for |
|---|---|---|
| `~/Panim/panim-book/` | **The book.** Manuscript, artwork, audio masters, build scripts. | **The text.** `chapters/01…10-*.md` |
| `~/Panim-audio/` | Audio production. Stems, masters, transcripts, runbook. | **The narration.** `transcripts/*.srt` |
| `~/Panim-site/` | **This repo.** The published website only. | The site |

Docs in the other two folders worth knowing about:
`~/Panim/panim-book/CLAUDE.md`, `START-HERE.md`, `DO-THIS.md`, `SITE-V2-PLAN.md`
(the v2 build brief — parts of it are now superseded, see §3);
`~/Panim-audio/RUNBOOK.md`, `HANDOFF.md`, `FABLE-BRIEF.md`.

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

Local: `python3 -m http.server 8899` then `localhost:8899`.

**After any CSS/JS/content change, bump the version in three places, together:**
`SHELL` and `ASSET_V` in `sw.js`, and every `?v=` in `index.html`. They must
match. The `?v=` query is what actually defeats the browser's own HTTP cache —
bumping `SHELL` alone re-fills the cache from whatever the browser already had.
The service worker now precaches with `cache: 'reload'` for the same reason.

---

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
