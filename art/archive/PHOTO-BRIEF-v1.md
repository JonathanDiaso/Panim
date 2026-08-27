# PANIM — Photo Brief
The 15 images, written as paste-ready prompts for Gemini. 2026-08-26.

## The one rule that makes it an album
**No full face until chapter 10.** Hidden, turned, cropped at the jaw, veiled,
silhouetted, seen from behind — for nine chapters the viewer is denied the thing
the book is about. Chapter 10 is the first face in full light. Hold this rule and
ten separate images become one work.

## How the site treats them (build FOR this)
- Each chapter's first image becomes a **full-bleed cover** behind the chapter
  title, slowly drifting as you scroll. The site converts every photo to
  monochrome and re-colors it in that chapter's palette (dark golds, storm blues,
  ember reds…). So: **shoot for LIGHT and SHAPE, not color.** A photo that reads
  in black-and-white will be stunning here; one that depends on color won't.
- Composition: put the subject in the **center-right or center**, and keep the
  **bottom third calmer** — the chapter title sits low over the image.
- Export: **3:2 landscape, at least 2048 px wide**, JPEG highest quality.

## The master style block — PREPEND THIS TO EVERY PROMPT
> Cinematic fine-art photograph, dramatic chiaroscuro lighting, single strong
> light source, deep shadows with detail, volumetric light and hanging dust,
> shallow depth of field, 35mm film grain, muted earth tones, biblical Near East
> setting, ancient textures of stone, cloth, and skin, composition with strong
> negative space, quiet and reverent mood, shot on medium format film.
> No text, no watermark, no modern objects, no glossy HDR look, no oversaturated
> color, no fantasy art style, face not visible.
(For #15 only, drop "face not visible.")

## The fifteen

**1 · `hero` — The Invitation**
A heavy ancient wooden door standing ajar in total darkness, warm golden light
pouring through the gap toward the viewer, dust drifting in the beam, worn stone
threshold. Shot from inside the dark room. Nothing else visible.

**2 · `ch01-tomb` — Chamber 25**
Looking down through a jagged hole in an ancient stone floor into pure black; a
thirteen-year-old boy's dusty hand gripping the broken edge, one hard shaft of
light from above raking across the stone. Claustrophobic, archaeological.

**3 · `ch01-scroll` — The Silver Word**
Extreme macro: a small tightly-rolled scroll of blackened, brittle silver resting
in an open weathered palm, faint scratched Hebrew letters catching a knife-edge
of light. Background falls to darkness.

**4 · `ch02-trees` — The Hiding**
A dense ancient garden at dusk, thick fig and olive foliage; two human figures
almost completely concealed behind the trees, only a shoulder and hand visible;
a soft searching light moving between the trunks toward them.

**5 · `ch02-storm` — Away**
A man seen fully from behind, walking into rolling fog and darkness, shoulders
tight, head slightly bowed; the last warm light behind the viewer stretching his
long shadow ahead of him.

**6 · `ch03-mountain` — The Mountain Burns**
A massive desert mountain wrapped in smoke and darkness, fire and lightning at
its summit; at the base, a tiny distant crowd keeping far back. Vast scale,
humans minuscule. Ash in the air.

**7 · `ch04-river` — The Night at the Ford**
A shallow river ford at deepest night; two locked, grappling silhouettes at the
waterline, spray frozen mid-air, the first thin line of dawn breaking on the
horizon behind them. Faces lost in the struggle.

**8 · `ch05-bush` — Not Consumed**
A desert thorn bush burning with impossible steady flame that consumes nothing,
in the fire-glow a pair of worn sandals set apart on the rocks in the
foreground; the observer's long shadow falling toward the light.

**9 · `ch06-shine` — Borrowed Light**
A head and shoulders completely covered by a rough woven veil, the fabric
glowing from a brilliant light BEHIND it, features suggested but never resolving
through the cloth. Dark surroundings. The image is the glow itself.

**10 · `ch07-gate` — The Glory Backs Out**
An immense ancient temple gate seen from inside the dark hall, golden light
physically withdrawing through the doorway — bright at the far threshold,
already dim where the viewer stands. Emptiness where the light was.

**11 · `ch08-flint` — Set Like Flint**
Severe profile in near-total darkness: a man's jaw and cheekbone set hard as
stone, turned away into the black, a thin rim of cold red-tinged light tracing
only the edge of the profile. Nothing else lit. The harshest image of the set.

**12 · `ch08-veil` — Torn**
A colossal temple curtain at the instant of tearing from the TOP downward,
blinding white light bursting through the widening split, threads snapping,
the heavy fabric still swinging. Shot from below, human-height.

**13 · `ch09-charcoal` — The Second Fire**
A small charcoal fire burning alone on a gray beach at first light, smoke
drifting low over the water; two sets of bare footprints in the wet sand leading
toward it. No people in frame. The invitation is the fire.

**14 · `ch09-emmaus` — Known in the Breaking**
A rough table in a dim room at dusk: bread freshly broken, a cup, and one chair
pushed back and EMPTY, a fading warmth of light still on the seat — someone
recognized and instantly gone. Candle smoke still curling.

**15 · `ch10-morning` — Face to Face**  *(drop "face not visible")*
Full golden morning light: a human face, eyes open, calm, lit directly and
completely, looking straight into the light with tears at the edge of joy.
The FIRST full face of the entire book. Warm, overwhelming, resolved.
*(Bonus `ch10-veil-lift`: the tomb chamber from image 2, now flooded with
morning light through the broken floor — the same room, answered.)*

## Making them POP — the craft checklist
1. **One light source per image.** Every image above is built on a single beam,
   glow, or rim. If Gemini gives you flat even lighting, reroll — flat light is
   the #1 AI tell.
2. **Ask for grain and imperfection.** "35mm film grain, dust, worn textures" —
   perfection reads as plastic; texture reads as witnessed.
3. **Negative space is the luxury.** Let 60% of the frame be darkness or sky.
   Cramped frames feel cheap; empty ones feel expensive.
4. **Reroll until the hands are right** (image 2, 3) — hands are where AI breaks.
   Or crop hands out and keep the light.
5. **Same "camera" every time.** The master block keeps lens, film, and mood
   constant — that consistency is what makes 15 images one album.
6. **Avoid**: modern objects, readable text, halos/angel-kitsch, HDR glow,
   saturated skies, symmetrical "epic fantasy" compositions.
7. Generate 4, pick the one with the best LIGHT (not the best detail), upscale.

## Delivering
Drop finished JPEGs in `art/` named by slot (`ch01-tomb.jpg`, `hero.jpg` …),
tell Claude, and each goes live with grading, parallax, and lightbox already
waiting — one line each in `content/images.js`.
