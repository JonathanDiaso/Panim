# 🚪 THE FRONT DOOR

**What the top of the site does, why it does it, and where it lives.**
🛑 **THE VERSION NUMBER LIVES IN `sw.js` (`SHELL` / `ASSET_V`), NEVER IN THIS PROSE.**
🛑 **Every open decision is in `docs/DECISIONS.md` — do not start a second list.**
🛑 **The second door's `href` stays on David (`?t=ch07:17m21s`; 17m55s on the v1 tape).** Why, and what it cost to learn:
archive §0.1.

🗄 **Every shipped round is in `../archive/`, not here** — §4, §13, §18 and §19 below are the
indexes. ⚠️ **The section numbers skip on purpose.** They are stable identifiers into the
archives; archiving never renumbers.
🛑 **If you just shipped a round, its record goes in the archive, not here.** Written four times now.

🗄 v55 (the ribbon going live) is at `58e2461`; v54's contact sheet, which never shipped,
is at `d1dc9f9`.

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

🛑 **DO NOT WRITE THE CURRENT NUMBER HERE. IT ROTS FASTER THAN THE CODE.** This line has
carried a wrong version twice — it said `57` for four releases and `64` for nine. **Read
`sw.js`.** The four places are the durable fact; the value never was.

## ⭐ AND IT IS CHECKED NOW, 2026-09-09, BECAUSE IT DRIFTED AGAIN

```
python3 tools/check-version.py
```

🔴 **The v73 bump moved three of the four and left `ASSET_V` on 72.** Caught by a sweep, not
by the site — because **there is nothing to see.** The worker precaches `u + '?v=' + ASSET_V`
while the page requests the number in `index.html`: different URL, different cache key, so
**every precached asset becomes a miss and the site silently stops working offline**, while
looking perfect online. That is the same trap `js/offline.js` was written for one version
earlier, arriving through the front door.

⚠️ **`NEXT.md` had carried this as an invariant that ended *"and nothing checks it."*** It does
now. The check exits non-zero and names the disagreement; **it was proven against the real
drift before being committed**, not just written.
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


# 18 · 🗄 v69 – v73 — ARCHIVED

**The four round records that were §14–§17 are now
[`../archive/round-records-v69-to-v73.md`](../archive/round-records-v69-to-v73.md)** —
moved 2026-09-09.

🛑 **Same rule as §4 and §13, applied a third time.** §4 archived four rounds because *"they
are records and this file is instruction"*; §13 archived five more that had piled into the
gap §4 cleared; **these five did it again.** By v73 they were 45% of this file. **Do not
re-derive any of the below — go read it:**

| in the archive | what it settles |
| --- | --- |
| **§14** | the offline Greek broken across two faces; **a Web Audio analyser that risked silent iOS playback for a property nothing read** |
| **§15** | the second voice edition, pointing at a folder that never existed; **the read-along mark that was a no-op on 1,725 of 1,841 cue blocks** |
| **§16** | the offline warning, and **the offer made at the only moment it can be taken**; four faults, three older than the feature |
| **§17** | **Hannah named at the tent, without touching the prose**; the ribbon caption off reading type onto display type, ladder re-swept at 1px; the five-minute card's memory |

⚠️ **§17.1 IS THE ONE PLACE AN EARLIER ANSWER WAS REVERSED**, and the reason is recorded
there: the sheet had argued against a Hannah note at chapter **VII**, which still stands, and
the passage actually being asked about was in chapter **X**, where the same fact is the setup
rather than the spoiler.

🛑 **AND THE RULE THIS SECTION IS EVIDENCE FOR:** *if you are reading this because you just
shipped a round, the record goes in the archive, not here.* It has been written twice already
and ignored twice.

---


# 19 · 🗄 THE SECOND DOOR, SPEED, THE PLATES, AND v74–v78 — ARCHIVED

**§0, §1 and §2 are now [`../archive/round-records-front-door-v55-v74-to-v78.md`](../archive/round-records-front-door-v55-v74-to-v78.md)**
— moved 2026-09-16, when they were 83% of this file. All shipped. **Do not re-derive any of
the below — go read it:**

| in the archive | what it settles |
| --- | --- |
| **§0.1–0.4** | 🛑 the second door: why the `href` stays on David, and the round that cost itself |
| **§0.5–0.10** | the "glitch" that was a full page reload, tap-to-listen, the mark on the title, the display caption, the bloated top |
| **§0.11–0.13** | 🇪🇸 **Spanish**: the door (v74), the page text (v75), the language button and `content/audio-host.js` (v76) |
| **§0.14** | 🌐 **the globe and Download in the Listening Room (v78)**, with the chip widths measured at 320–430px |
| **§1** | speed — `--paper` re-styling the whole book sixty times a second, and the LCP preload |
| **§2** | the ribbon of plates (v55): the shape arithmetic, the sway, the 1px span that slid the page |

⚠️ **v77 (the audio moving to Cloudflare R2) has no round record here** — it is `README.md`,
*Where the audio lives*.

---
