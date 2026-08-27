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

## 2. ⚠️ THE BIGGEST OPEN PROBLEM: the site's text is an old draft

`content/chapters.js` was built from a manuscript draft **older than the recorded
audio**. The manuscript and the audio agree with each other; the website disagrees
with both.

Measured word coverage of the spoken narration by the text on the page:

| | I | II | III | IV | V | VI | VII | VIII | IX | X |
|---|---|---|---|---|---|---|---|---|---|---|
| covered | 60% | 56% | 83% | 79% | 69% | 66% | **47%** | 59% | 53% | **43%** |

**~9,800 words of narration are not on the page.** Chapter X is missing 4,281.

Concrete examples:
- Audio ch01 opens *"The oldest words of the Bible ever found were found by a bored
  kid who was supposed to be sweeping."* — that sentence is **not on the site at all**.
- ch07: audio and manuscript say *nine hundred miles*; the site says *seven hundred*.
- ch09: audio opens *"It is still dark when she reaches the tomb"*; site opens
  *"Seven miles is a long walk."*
- Two chapter titles differ: site says **The Offer** / **The Shine and the Blessing**;
  manuscript and audio filenames say **The Face They Fled** / **Borrowed Light**.

### Why it matters
The read-along is the point of the site. `tools/gen-cues.py` aligns the SRTs to the
site's paragraph IDs and its own docstring assumes *"the narrator read the manuscript,
so the two word streams nearly match."* That assumption is false, so the cue anchors
in `cues/*.json` are aligned against text that is 40–57% absent. Follow-the-narration
will drift.

### The fix (not yet done — needs a decision)
1. Rebuild `content/chapters.js` from `~/Panim/panim-book/chapters/*.md`.
   Must preserve: block ids (`chNN-pN`, `chNN-vN`), verse blocks with `ref` +
   `lines` + `translation`, `slot` blocks in their existing positions, `glossary`
   arrays, `zone: "prayer"` marks, and the `fivewords` terminal block.
2. Re-run `tools/gen-cues.py` and check its confidence report.
3. Re-check the chapter titles against what the narrator actually says.
4. Re-apply the smart-quote pass (§5) — a rebuild will reintroduce straight quotes.

---

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
  chapters.js       ⚠️ old draft — see §2.  window.PANIM_CHAPTERS
  images.js         photo manifest. one line per slot: {src, alt, caption, ref}
  audio-manifest.js durations + music offsets (source of truth for run times)
  HOOKS-original.json  the chapter hooks as they were before the rewrite
css/  site.css (tokens, grid, arc) · components.css · player.css · room.css · polish.css
js/   render.js (DOM) · motion.js (scroll, arc, progress) · sync.js (cues)
      player.js · room.js · ui.js
art/  *.webp published · originals/ source JPGs · PROMPTS-v2.md · archive/
cues/ chNN.json — [{t, id}] on the voice timeline
tools/ gen-cues.py · cue-marker.html · validate.mjs
```

Local: `python3 -m http.server 8899` then `localhost:8899`.
After any CSS/JS change bump `SHELL` in `sw.js` or returning visitors get the old
shell from cache.

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

1. **Rebuild the text from the manuscript** (§2). Everything else is cosmetic next to this.
2. **Ten of fifteen images missing** — prompts ready in `art/PROMPTS-v2.md`.
3. **Source images are 1408 px**; plates want 2400 px+. They soften on a large display.
4. **Per-chapter Hebrew.** Every chapter opening currently shows the same פָּנִים.
   `satar` for The Hiding, `hester panim` for The Glory Backs Out, etc. Not done because
   the vocalisation would be guessed, and wrong nikkud in a book about a Hebrew word is
   not worth risking. Needs the pointed forms supplied.
5. **Chapter titles** — reconcile site vs manuscript vs audio (§2).
6. `hanging-punctuation` is Safari-only; no clean cross-browser equivalent.
