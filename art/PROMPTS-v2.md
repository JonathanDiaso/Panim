# PANIM — Image Prompts

**Copy one block. Paste. Generate.** Three lines each. Nothing to prepend.

House style is `ch02-trees` — the garden picture. Old `PHOTO-BRIEF.md` kept for reference.

---

## Line 1 — the style (identical every time)

> Cinematic film still, golden hour, thick volumetric god rays through haze, warm amber and
> sage-green palette, soft glow, shallow depth of field, lush and ethereal.

**Never ask for "photographic realism" or "not an illustration."** The garden image is not
documentary — it is closer to a fantasy film still, and that is why it's beautiful. Asking
for realism flattens it and kills the glow.

**Keep the lushness.** Wildflowers, moss, lichen, backlit hair — that's the magic, not a mistake.

## Line 2 — the shot, then the subject

Every prompt now opens line 2 with **shot size, lens, camera height**. This is the part that
was missing. Left to itself the model defaults to a mid-distance eye-level shot every time,
which is why a set can come back feeling flat and samey.

| Shot | Lens | Use it for |
|---|---|---|
| Extreme wide / establishing | 24mm | Landscape, scale, a person dwarfed |
| Wide | 35mm | A figure in a place, room interiors |
| Medium | 50mm | Waist-up, a subject and its setting |
| Medium close-up | 85mm | Head and shoulders |
| Extreme close-up | 135mm | A face edge, hands, an object |

Camera height changes the feeling more than anything except light:
**low angle** = looming, overwhelming · **eye level** = you are there ·
**high / looking down** = you are outside it, watching.

## Line 3 — avoid

Four or five words. Long negative lists dilute the whole prompt — the model spreads its
attention across everything you wrote.

---

### Three things that matter most

1. **God rays.** Sun behind the subject, shafts visible in the air.
2. **Layers.** Dark foreground framing → lit subject → hazy background. That's the depth.
3. **Glow.** Bloom on highlights, rim light on edges. Never "crisp" or "sharp."

**Generate 4, pick on light, upscale the winner. 3:2, 2400px+.**
Subject **centred** — sides get cropped on desktop, top and bottom on phones.

---

## The eleven to make

Keeping: `hero` (wide, 35mm), `ch01-scroll` (extreme close-up), `ch02-trees` (medium, 85mm),
`ch10-morning` (medium close-up).

---

**`ch01-tomb` — Chamber 25** *(optional reroll — current one has a compass, a sword and a medieval book in an Iron Age tomb)*

> Cinematic film still, golden hour, thick volumetric god rays through haze, warm amber and sage-green palette, soft glow, shallow depth of field, lush and ethereal.
> High angle looking straight down, 35mm. Through a broken hole in an ancient stone floor into a dark burial chamber, one shaft of sun pouring in and lighting the dust, clay oil lamps and broken pottery below, a boy's dusty hand gripping the jagged edge.
> Avoid: books, compass, sword, ruler, faces.

---

**`ch02-storm` — Away**

> Cinematic film still, golden hour, thick volumetric god rays through haze, warm amber and sage-green palette, soft glow, shallow depth of field, lush and ethereal.
> Wide shot, 35mm, eye level, subject small in frame. A lone man in coarse linen seen from behind walking away into rolling mist across open ground, sun low ahead of him so he is a dark shape with a burning rim of light, his long shadow stretching back toward us.
> Avoid: his face, other people, buildings.

---

**`ch03-mountain` — The Mountain Burns**

> Cinematic film still, golden hour, thick volumetric god rays through haze, warm amber and sage-green palette, soft glow, shallow depth of field, lush and ethereal.
> Extreme wide establishing shot, 24mm, low angle looking up. A vast desert mountain wrapped in backlit smoke with fire and lightning at its summit, ash drifting and glowing, a tiny distant crowd far back at the base, dwarfed.
> Avoid: readable faces, volcano cone, lava.

---

**`ch04-river` — The Night at the Ford**

> Cinematic film still, blue hour before dawn, thick volumetric haze, deep indigo and pale gold palette, soft glow, shallow depth of field, ethereal.
> Medium wide shot, 50mm, low angle at water level. Two figures locked together wrestling in a shallow river at the darkest hour, spray frozen and lit from behind, the first thin band of dawn on the horizon behind them, both men reduced to rim-lit silhouettes.
> Avoid: faces, wings, angel, glowing figures.

---

**`ch05-bush` — Not Consumed**

> Cinematic film still, golden hour, thick volumetric god rays through haze, warm amber and sage-green palette, soft glow, shallow depth of field, lush and ethereal.
> Medium shot, 50mm, low angle close to the ground. A desert thorn bush burning with steady flame that does not consume it, branches inside still green, a pair of worn empty sandals set aside on rock in the near foreground, heat haze glowing.
> Avoid: people, hands, a face in the flames.

---

**`ch06-shine` — Borrowed Light**

> Cinematic film still, golden hour, thick volumetric god rays through haze, warm amber and sage-green palette, soft glow, shallow depth of field, lush and ethereal.
> Medium close-up, 85mm, eye level. A head and shoulders completely covered by rough woven cloth with brilliant light directly behind it, the weave glowing from within, loose fibres lit like filament, dust hanging around the veil.
> Avoid: a visible face, eyes, halo, crown.

---

**`ch07-gate` — The Glory Backs Out**

> Cinematic film still, golden hour, thick volumetric god rays through haze, warm amber and cool stone palette, soft glow, shallow depth of field, ethereal.
> Wide shot, 24mm, eye level, deep one-point perspective. The inside of an immense empty stone temple hall looking toward a vast open doorway, golden light withdrawing outward through it, blazing at the far threshold and already thin and grey where we stand, dust in the emptied air.
> Avoid: people, statues, carved columns, cathedral.

---

**`ch08-flint` — Set Like Flint**

> Cinematic film still, low sun, thick volumetric haze, deep shadow and red-gold rim light, soft glow, shallow depth of field, ethereal.
> Extreme close-up, 135mm, profile at eye level. A man's severe profile turned away into near darkness, a single burning rim of light tracing only the edge of his nose, lip and jaw, stubble and loose hair catching like filament, everything else falling away.
> Avoid: eyes, full face, front view, crown of thorns.

---

**`ch08-veil` — Torn**

> Cinematic film still, thick volumetric haze, deep crimson and blown-out white, soft glow, shallow depth of field, ethereal.
> Wide shot, 24mm, low angle looking steeply up so the curtain towers. A colossal woven temple curtain tearing from the top downward, blinding light bursting through the widening split toward us, threads snapping and lit like filament, heavy fabric still swinging.
> Avoid: people, hands, a figure behind the curtain, a cross.

---

**`ch09-charcoal` — The Second Fire**

> Cinematic film still, dawn, thick volumetric haze, cool silver water and warm firelight, soft glow, shallow depth of field, ethereal.
> Medium wide shot, 50mm, very low angle near the sand. A small charcoal fire burning alone on a grey pebble beach at first light, low smoke backlit into a drifting sheet, two sets of bare footprints in the wet sand leading toward it and stopping. No people.
> Avoid: people, boats, fish, nets, birds.

---

**`ch09-emmaus` — Known in the Breaking**

> Cinematic film still, last light through a window, thick volumetric haze, warm amber and deep brown palette, soft glow, shallow depth of field, ethereal.
> Medium shot, 35mm, camera at table height. A rough wooden table in a dim stone room shot toward the window, a round flatbread freshly torn in half, a clay cup, one low chair pushed back and empty, a thin line of candle smoke still curling, lit bright against the light.
> Avoid: people, hands, a figure in the doorway, glassware.

---

**`ch10-veil-lift` — The Same Room, Answered** *(bonus)*

> Cinematic film still, full morning light, thick volumetric god rays through haze, warm gold and pale stone palette, soft glow, shallow depth of field, lush and ethereal.
> Wide shot, 24mm, low angle looking up into the light. The same broken-floor burial chamber as Chamber 25 but now flooded with morning sun pouring down through the break, every dust particle lit, clay lamps and pottery clearly visible, nothing hidden in shadow.
> Avoid: people, bones, books, compass, sword.

---

## Deliver

3:2 landscape, 2400px+, JPEG. Name by slot — `ch03-mountain.jpg`. Drop in `art/`, tell Claude.
Each goes live with its plate, caption, parallax and lightbox already waiting.

## The one rule

**No full face until chapter X.** Hidden, turned, veiled, silhouetted, seen from behind.
Backlighting makes this easy. Chapter X is the first face in full light — that's the payoff.

## Shot map, so the set has rhythm

Ten identical mid-shots would be boring however well lit. As it stands:

```
hero     wide 35    ch05  medium 50      ch09-charcoal  medium-wide 50
ch01-tomb  high 35  ch06  med close 85   ch09-emmaus    medium 35
ch01-scroll  XCU    ch07  wide 24        ch10-morning   med close-up
ch02-trees medium 85  ch08-flint  XCU 135   ch10-veil-lift  wide 24
ch02-storm wide 35  ch08-veil   wide 24
ch03-mountain XW 24
ch04-river med-wide 50
```

Wide for scale, close for the hidden face. If a reroll comes back and you like it but the
set feels samey, change the **shot**, not the light.
