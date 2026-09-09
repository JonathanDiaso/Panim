# 🗄 PANIM SITE — ROUND RECORDS, v69 → v73

**Moved out of `docs/FRONT-DOOR.md` 2026-09-09, as §4 and §13 moved before them, and for
the same stated reason: these are *records* and that file is *instruction*.** Five shipped
releases had accumulated between §3 (where things live) and the round that actually shipped
last.

🛑 **Every ruling in here still stands. Nothing below was reversed** — with one exception,
and it is marked: **§17.1 reverses the sheet's own answer on the Hannah note**, on evidence
that the earlier answer was about a different passage.

🛑 **SECTION NUMBERS ARE UNCHANGED.** A §15.2 or §16.4 written anywhere else still points at
the same words. That is why `FRONT-DOOR.md` skips §5–§12 and now §14–§17: the numbers are
stable identifiers and archiving must never renumber them.

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

# 17 · 🕯 v73 — HANNAH IS NAMED AT THE TENT, AND THE CAPTION STOPS BEING READING TYPE

Three items closed off `DECISIONS.md` in one round: **#2** (reversed on new evidence),
**#4** and **#6**. **#1, #3, #5 and #7 are still open** and #5 and #7 both changed shape.

## 17.1 🔴 THE WOMAN AT THE TENT IS HANNAH, AND THE EARLIER ANSWER WAS ABOUT A DIFFERENT PASSAGE

The author: *"i never mention that the woman coming to Eli is Hannah… we should probably
add a note there."*

🛑 **THE SHEET HAD ARGUED AGAINST THIS AND THE SHEET WAS ANSWERING A DIFFERENT QUESTION.**
`DECISIONS.md` §2 argued that a note *at chapter VII* — where the author's sister is named —
would hand the reader chapter X's ending three chapters early. **That is still true.** But
the passage he is pointing at is not chapter VII's. It is the **Shiloh scene in chapter X**,
`ch10-p159`–`p168`, and there the fact is not a spoiler at all: it is the **setup**.

Measured against the manuscript: the scene calls her *"a woman"*, *"she"*, *"the woman at
the tent"* — **her name never appears in the prose.** Fourteen paragraphs later the chapter
closes on *"It is my sister's name. Hannah."* and then *"Nobody ever told the woman at the
tent either."* ⭐ **A reader who does not already know 1 Samuel 1 has no way to connect the
two, and the last movement of the book lands on nothing.**

## 17.2 🛑 THE PROSE IS NOT TOUCHED, AND THAT IS THE WHOLE DESIGN

Naming her in a paragraph is an edit that **changes words**, which by the standing invariant
costs a re-cut or a read-along desync. **The manuscript gained one citation line instead:**

```
*And the woman went her way and ate, and her face was no longer sad.*

*1 Samuel 1:18*
```

⭐ **The book already quotes that verse and had never cited it**, so the citation is correct
apparatus on its own terms, before it carries anything. And a `ref` block **carries no cue
id** — `js/render.js` has said so since the prayer zone was built — so the narrator's clock
is untouched and `cues/*.json` came back byte-identical.

⚠️ **`build-chapters.py`, `gen-cues.py` and `check-coverage.py` were all run, in order.**
Word parity OK on all ten chapters, coverage still **98.8%**, and **no block id moved** — a
`ref` does not consume a paragraph number.

🛑 **AND THE REBUILD SURFACED A LATENT DRIFT WORTH KNOWING ABOUT.** Six chapters gained
`"standfirst": ""` in the regenerated file. Nothing changed on the page (the field is
carried, and empty is falsy either way) — **the committed generated file simply predated the
field.** *A file that says it is generated must actually be generated*, and this is what it
looks like when it has not been for a while.

## 17.3 ⭐ A CITATION LINE CAN CARRY A VERSE NOTE NOW

The apparatus was reachable only from a `verse` block, so a passage the book quotes **as a
line of its own prose** could not have one. The alternatives were a second apparatus keyed by
block id — and block ids move — or nothing.

🛑 **IT IS NOT A SECOND SYSTEM.** Same `chapter + citation` key, same
`content/verse-notes.js`, same lookup, one more block type. A `ref` with no entry still
renders bare, exactly as the nine citations in chapter X's prayer do.

🔴 **AND THE FIRST BUILD OF IT WAS WRONG IN A WAY ONLY MEASUREMENT SHOWS.** A `.verse-note`
under a `verse` is **nested inside the verse's own container** and inherits its column. Hung
off a `ref` it is a **direct child of the chapter grid**, and a grid child with no column
lands in a single auto track: **132px wide and 468px tall at 1440** — a sixty-word note set
six steps deep in the margin, which is the exact ribbon `render.js`'s own comment says not to
make. It takes the citation's column now. **Re-measured: 383 × 188, 17px under its citation.**

## 17.4 The note itself, and where it deliberately stops

| | |
| --- | --- |
| **Where you are** | Shiloh, generations before there is a king or a temple. The woman has come to the tent to ask for a child; the priest watching her lips is Eli, and he has decided she is drunk. |
| **Worth knowing** | First Samuel gives her a name in its opening lines, and the scene at the tent never uses it. She is Hannah. |

🛑 **"WORTH KNOWING" STOPS AT THE NAME ON PURPOSE.** The root behind it — *chen*, grace, the
picture of stooping — is what `ch10-p174` **is for**, eight paragraphs later. Spending it in
an apparatus line would flatten the paragraph the chapter turns on.

⚠️ **AND ELI WAS NOT IN THE INDEX AT ALL** — the man whose whole office is turning God's face
toward people, who never looks at the face in front of him. Two occurrences, both chapter X.
`'Eli'` as a matcher form was **checked, not assumed**: the matcher closes on `(?![A-Za-z])`
so *Elijah* does not match, and chapter VIII's cry from the cross is *"Eloi"*.

## 17.5 🔴 THE RIBBON CAPTION WAS READING TYPE, ENLARGED

The author: *"the text could probably be more iconic and 3d style or something."*

**It was never a font.** Literata carries an **optical-size axis, 7 to 72**, and the site
already names three settings in `css/site.css`: `--lit-normal` (12), `--lit-mid` (28),
`--lit-display` (60). 🔴 **The caption and the plate titles above it were both on
`--lit-mid`** — a *text* cut, whose thicker hairlines, blunter serifs and wider default
fitting exist **so that small type survives** — while setting at **34px and 27px**.

⭐ **Both are on `--lit-display` now.** No new font, no new token, no size change, no weight
change. The hero already used it. **This is the third and last answer to "more iconic": the
two before it were size (three times) and weight, and both had run out.**

🛑 **AND A LETTERPRESS SHADOW WAS OFFERED AND ARGUED AGAINST, NOT SILENTLY DROPPED.** It is
the one option that can read cheap, it fights night mode, and it puts a drawn effect on the
one line whose entire argument is that it is *type*.

## 17.6 🛑 THE RESERVED-HEIGHT LADDER WAS RE-SWEPT, AND EVERY STEP MOVED AGAIN

Optical size is **not** a size: it is a different *drawing* of the face, so the words do not
occupy the same widths. The previous sweep's own note said to re-run it if the caption's face
moved. **Measured at one-pixel resolution, 320 → 1010, then every 10px to 1920**, with a probe
cloned from `.pl-hook` itself, `min-height` off, all ten hooks through it:

| width | lines |
| --- | --- |
| 320–329 | **8** |
| 330–354 | 7 |
| 355–428 | 6 |
| 429–483 | 5 |
| 484–642 | 4 |
| 643–900 | 3 |
| 901 → 1920 | 4 |

⚠️ **320 GAINED A LINE WHILE EVERY OTHER STEP CAME EARLIER, AND THAT IS NOT A CONTRADICTION.**
The display cut fits tighter overall, so each count is given up 1–11px sooner; at 320 — the
narrowest measure in the set — the longest word in chapter X's hook no longer shares a line
and the caption takes an eighth. **Both are the same sweep and both are real.**

🛑 **THE 1PX RESOLUTION IS WHAT SHOWED IT.** The first pass stepped in 2s, which starts at 320
and never lands on 329 — it would have reported the base as 330 and shipped a **7-line base
that under-reserves by a full line on the narrowest phone there is.** The base rule is 8 now.

✅ **Verified after the change at 17 widths** — 320, 329, 330, 354, 355, 402, 428, 429, 483,
484, 642, 643, 900, 901, 1010, 1440, 1920. **Reserved equals actual to the pixel at every one.**

## 17.7 ⭐ THE FIVE-MINUTE CARD KNOWS YOU HAVE HEARD IT

The author: *"this is a good idea"*, and then *"is this in yet we should have that built."*
A reader who had already spent those eight minutes was handed the identical pitch forever.

| | |
| --- | --- |
| **what remembers** | `state.heardDoor` in `js/player.js`, stored as `panim:heardDoor` |
| **when it is set** | chapter VII's voice clock passes **1579** — the block after *"He answered it wet"*, `ch07-p170`, cued at 1574.51 — **or** chapter VII is marked complete |
| **how the card hears about it** | `panim:door-heard`, emitted at init too, so there is one code path and not two |
| **what changes** | the eyebrow becomes *"You have heard these eight minutes"*, and it comes off `--accent` onto `--ink-soft` |

🛑 **THE `href` NEVER MOVES.** §0.1 locks it on David. The card does not become a different
door once it is heard; it becomes the same door that knows.

⭐ **AND THE COLOUR IS THE SITE'S OWN COMPLETED MARK.** `.seek-mark.is-complete` already comes
off `--accent` onto `--ink-soft`. Same move, same tokens — **state is said by stepping back,
never by adding a tick or a badge**, which is the argument that took the box off this card and
the highlighter off the read-along line.

⚠️ **THE ACCESSIBLE NAME MOVES WITH IT**, opening clause only. An `aria-label` *replaces*
everything inside the element, so swapping the visible line and leaving the label would tell a
screen reader user the opposite of what the page says. The two sentences of bait after it stay.

## 17.8 Verified

Driven headless on `tools/serve.py`, both states of the card, measured not eyeballed:

- **the note** — renders as the citation's next sibling, `role="note"`, grid column 3/9,
  383 × 188 at 1440, 17px under `1 SAMUEL 1:18`, and the block above it is the quotation.
  **115 verse notes on the page, one more than before.**
- **the optical size** — `"opsz" 60` computed on both `#pl-hook` and `.pl-t`; `font-style`
  still `normal`, so the 2026-09-07 italic lock holds.
- **the ladder** — reserved vs actual at 17 widths, every one exact.
- **the card** — unheard: `--accent`, *"If you only have eight minutes"*. Heard:
  `.is-heard`, `rgb(92,84,73)` = `--ink-soft`, the new eyebrow, the label's opening clause
  swapped, **and `href` still `?t=ch07:17m55s`.**
- **no JS errors in either run**, `visibilityState: visible` (trap 6 checked, not assumed).

---
