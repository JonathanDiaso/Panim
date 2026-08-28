# art/incoming — staged, named, not yet wired

Nothing here is published. `content/images.js` still points at `art/*.webp`.
Wiring one in is: pick it, convert to WebP, add the line to `images.js`.

**Naming:** `<slot>--<variant>.jpeg`. Two files sharing a slot prefix are
alternates for the same plate and need a choice, not both.

⚠️ **Everything here is 1408×768.** That is Gemini's output ceiling, and it is
both **too small** (plates want 2400 px+, these soften on a large display) and
**the wrong shape** (1.83:1, where the sheet asks for 3:2 / 1.5:1). See the
resolution note in `../PROMPTS.md` before generating more.

---

## Staged, 2026-08-27 — 19 frames, 12 slots

| file | slot | verdict against `../PROMPTS.md` |
|---|---|---|
| `hero--open-door.jpeg` | `hero` | mossy stone, ring handle — European village, not Levantine |
| `hero--door-bright.jpeg` | `hero` | strong wedge of light, heavy dust — **best of the three** |
| `hero--door-dark.jpeg` | `hero` | same door, darker, less dust |
| `01-tomb--day.jpeg` | `ch01-tomb` | good lamps and shaft. **Hand is an adult's, not a 13-year-old's**; no bones, no beads |
| `02-trees--plain.jpeg` | `ch02-trees` | 🔴 golden and lush on the coldest page. Robed, not fig leaves |
| `02-trees--flowers.jpeg` | `ch02-trees` | 🔴 worse — a flower garden |
| `03-mountain--day.jpeg` | `ch03-mountain` | teal daylight sky, god rays — off-arc |
| `03-mountain--night-camp.jpeg` | `ch03-mountain` | ⭐ **the keeper.** Storm-dark, tents, the crowd standing in a line facing it. No boundary marker yet |
| `04-river--day.jpeg` | `ch04-river` | good splash, but faces readable and a warm sunset band |
| `04-river--night-silhouette.jpeg` | `ch04-river` | ⭐ **the keeper.** Pure silhouette, no faces, deep blue. Far bank has reeds but no camp |
| `05-bush--golden.jpeg` | `ch05-bush` | sandals are right. **Golden desert daylight — the fire barely reads as the only source.** No flock |
| `06-shine--veiled-forest.jpeg` | `ch06-shine` | backlit weave is beautiful. **Set in a green forest**, and the cloth is a hood, not the flat masveh square |
| `08-flint--profile.jpeg` | `ch08-flint` | beard and rim light right. **Looking down, not forward** — reads as sorrow, not decision |
| `08-veil--torn.jpeg` | `ch08-veil` | colours and snapping threads right. **No cherubim woven in**, and the architecture is Gothic vaulting |
| `09-emmaus--table.jpeg` | `ch09-emmaus` | ⭐ **strongest frame in the batch.** Torn loaf, cup, lamp, smoke line, grey window. A small stool intrudes |
| `09-charcoal--close.jpeg` | `ch09-charcoal` | **has open flames** — it is a wood fire, not *anthrakia*. Grey pebble, not basalt |
| `09-charcoal--wide.jpeg` | `ch09-charcoal` | wider, more smoke, footprints. Still flaming |
| `unassigned--man-walking-into-haze.jpeg` | — | figure from behind walking into dust |
| `unassigned--ridge-at-night.jpeg` | — | bloodstained robe, moonlit path above a village |

## Slots with nothing staged

`ch01-scroll` · `ch02-storm` · `ch07-gate` · `ch10-veil-lift` · `ch10-morning` · `og-image`

---

## 🚧 Placeholders now live on the site — replace these

Wired 2026-08-27 so the slots are not empty. **Both are wrong and both are flagged
in `content/images.js` with the reason, inline, right above the entry.**

| slot | what is wrong | fix against |
|---|---|---|
| `ch02-storm` | 🔴 **It is a Viking longship** — dragon-head prow, Norse knotwork, axe-blade sternpost, Scandinavian crew. 9th century AD; Jonah's ship is 8th century BC Phoenician. Painted, not photographic. | `../PROMPTS.md` → `ch02-storm`, which specifies one mast, one square sail, curved stem and stern, steering oar, no rudder, no castles |
| `ch02-trees` | 🟠 Still golden and lush on the coldest page in the book. Figures read as modern (long wavy auburn hair) and are nude rather than in the fig leaves of Gen 3:7. | `../PROMPTS.md` → `ch02-trees` |

**The rest of the reroll queue is above.** Nothing here is a permanent decision —
a plate is replaced by dropping a better frame in and re-running the WebP step.
