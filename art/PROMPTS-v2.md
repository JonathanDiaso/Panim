# PANIM — Image Prompts, v2

**Every prompt below is complete. Copy one block, paste it, generate. Nothing to prepend.**

Replaces the workflow in `PHOTO-BRIEF.md` (kept for reference). Two things changed: the
house style is now **the garden picture** (`ch02-trees`), and the site was rebuilt and
treats photographs differently.

---

## The house style — why `ch02-trees` looks real

That image works because it is **shot into the light**. Almost every other AI image is lit
*from* the camera, which is why they look like renders. The recipe:

| What it's doing | Why it reads as real |
|---|---|
| Low sun **behind** the subject, shining toward the lens | Real photographers shoot into the light; renders almost never do |
| Heavy atmospheric haze with visible shafts | Air becomes visible — instant depth, instant "this is a place" |
| Long lens (135mm), wide open | Compressed planes, background dissolves, subject separated |
| **Lifted blacks**, low-contrast filmic curve | Nothing crushes to pure black — the single biggest realism tell |
| Veiling flare / halation around the light | A real lens scatters light. Perfect optics look fake |
| Rim light on hair, cloth, bark edges | Every edge facing away from camera glows |
| Muted, desaturated colour | Real film is not vivid |

The old brief asked for the opposite — "chiaroscuro, deep shadows, single strong source."
That produced Chamber 25: good, but harder and more staged. **Ignore that guidance now.**

### The paragraph that does the work

This is baked verbatim into every prompt below. You never have to paste it separately.

> Cinematic fine-art photograph shot into the light. A low sun sits behind the subject and
> rakes toward the camera through heavy atmospheric haze, throwing visible shafts and
> lighting the airborne dust. Long lens, 135mm at f/2 — compressed perspective, shallow
> focus, subject sharp and background dissolving. Warm rim light on every edge turned away
> from camera. Filmic low-contrast curve with lifted blacks — nothing crushes to pure black
> — gentle veiling flare around the light source, halation on the highlights, fine 35mm
> grain. Muted, desaturated palette. Photographic realism: real skin, real cloth, real dust.
> Not an illustration, not a render, not CGI.

---

## What changed on the site

The old site laid the chapter title **on top of** the photograph and converted every image to
monochrome before re-tinting it. Both are gone.

| Old brief said | Now true |
|---|---|
| "Shoot for LIGHT and SHAPE, not colour — the site converts to monochrome" | **Colour survives untouched.** Warm images read warm. |
| "Keep the bottom third calmer — the title sits over the image" | **Nothing is ever laid over a photo.** Use the whole frame. |
| 2048 px wide | **2400 px minimum**, 3000 preferred. |

### The crop that will eat your composition

A plate is a wide band on a laptop and a 4:3 block on a phone, centre-cropped to fit.

```
your 3:2 file          desktop plate (~2.1:1)      phone plate (4:3)
┌─────────────────┐    ┌─░░░───────────░░░─┐      ┌─────────────────┐
│                 │    │ ░░│           │░░ │      │░░░░░░░░░░░░░░░░░│
│   SUBJECT       │ →  │ ░░│  SUBJECT  │░░ │      │   SUBJECT       │
│                 │    │ ░░│           │░░ │      │░░░░░░░░░░░░░░░░░│
└─────────────────┘    └─░░───────────░░░──┘      └─────────────────┘
                          ░ = cropped away          ░ = cropped away
```

**Everything that matters lives in the centre square.** Put haze, falloff and empty light in
the outer edges — that is what gets thrown away.

---

## The one failure mode to guard against

When a prompt leaves space unspecified, the model furnishes it with generic "antiquity"
props. Chamber 25 came back with a brass pocket compass, a photographic scale bar, a bronze
sword, and a **medieval European illuminated codex with metal clasps** — in a
seventh-century-BC Judean tomb, which had scrolls and clay lamps and nothing else.

Every prompt below therefore ends with a **NOT IN THIS IMAGE** list and the words *Nothing
else in the frame.* Keep them. They are doing real work.

**Generate four. Choose on light, not on detail.** Then upscale the one you chose.

---

## The fifteen

---

### 1 · `hero` — The Invitation  ✅ *done, keep*
### 3 · `ch01-scroll` — The Silver Word  ✅ *done, keep*
### 4 · `ch02-trees` — The Hiding  ✅ *done, keep — this is the reference*
### 15 · `ch10-morning` — Face to Face  ✅ *done, keep*

---

### 2 · `ch01-tomb` — Chamber 25  ⚠️ *optional regenerate — the props are wrong for the period*

> Cinematic fine-art photograph shot into the light. A low sun sits behind the subject and
> rakes toward the camera through heavy atmospheric haze, throwing visible shafts and
> lighting the airborne dust. Long lens, 135mm at f/2 — compressed perspective, shallow
> focus, subject sharp and background dissolving. Warm rim light on every edge turned away
> from camera. Filmic low-contrast curve with lifted blacks — nothing crushes to pure black
> — gentle veiling flare around the light source, halation on the highlights, fine 35mm
> grain. Muted, desaturated palette. Photographic realism: real skin, real cloth, real dust.
> Not an illustration, not a render, not CGI.
>
> SUBJECT: Looking down through a jagged break in an ancient limestone floor into a dark
> burial chamber. Sunlight pours up through the break toward the camera, the whole shaft
> alive with dust. Lit inside the chamber: plain undecorated clay oil lamps, broken pottery
> sherds, the edge of a rough stone shelf. A boy's dusty bare hand grips the broken edge at
> the top of frame, rim-lit, dirt in the knuckle creases. Iron Age Judah, 600 BC.
> PALETTE: cool grey limestone against one warm amber shaft.
> NOT IN THIS IMAGE: no books, no bound volumes, no codex, no metal clasps, no compass, no
> ruler or scale bar, no sword, no weapons, no gold, no decorated metalwork, no lettering,
> no modern tools, no faces. Nothing else in the frame.

---

### 5 · `ch02-storm` — Away

> Cinematic fine-art photograph shot into the light. A low sun sits behind the subject and
> rakes toward the camera through heavy atmospheric haze, throwing visible shafts and
> lighting the airborne dust. Long lens, 135mm at f/2 — compressed perspective, shallow
> focus, subject sharp and background dissolving. Warm rim light on every edge turned away
> from camera. Filmic low-contrast curve with lifted blacks — nothing crushes to pure black
> — gentle veiling flare around the light source, halation on the highlights, fine 35mm
> grain. Muted, desaturated palette. Photographic realism: real skin, real cloth, real dust.
> Not an illustration, not a render, not CGI.
>
> SUBJECT: A man seen entirely from behind, walking away from camera into rolling fog across
> bare stony ground. Shoulders tight, head slightly bowed, coarse undyed linen, bare feet.
> The low sun is ahead of him and behind the fog, so he is a dark shape with a burning rim of
> light all around his silhouette, and his long shadow runs back toward the viewer. He is
> small in a large frame. Judean wilderness, Iron Age.
> PALETTE: cold grey-blue fog cut by one warm channel of low sun.
> NOT IN THIS IMAGE: no face, no turning back, no other people, no buildings, no animals, no
> lettering, no modern clothing or footwear. Nothing else in the frame.

---

### 6 · `ch03-mountain` — The Mountain Burns

> Cinematic fine-art photograph shot into the light. A low sun sits behind the subject and
> rakes toward the camera through heavy atmospheric haze, throwing visible shafts and
> lighting the airborne dust. Long lens, 135mm at f/2 — compressed perspective, shallow
> focus, subject sharp and background dissolving. Warm rim light on every edge turned away
> from camera. Filmic low-contrast curve with lifted blacks — nothing crushes to pure black
> — gentle veiling flare around the light source, halation on the highlights, fine 35mm
> grain. Muted, desaturated palette. Photographic realism: real skin, real cloth, real dust.
> Not an illustration, not a render, not CGI.
>
> SUBJECT: A vast desert mountain wrapped in black smoke, fire and lightning at its summit,
> ash drifting through the air. The fire is behind and above, so the smoke is backlit and
> glowing from within and every ash particle is a lit speck. At the base of the frame a tiny
> distant crowd stands far back, rim-lit, no individual readable. Sinai, Bronze Age.
> Enormous scale, humans insignificant.
> PALETTE: black smoke lit from inside by deep orange; bruised sky.
> NOT IN THIS IMAGE: no faces, no readable figures, no buildings, no lettering, no volcano
> cone, no lava flows, no creatures, no epic-poster symmetry. Nothing else in the frame.

---

### 7 · `ch04-river` — The Night at the Ford

> Cinematic fine-art photograph shot into the light. A low sun sits behind the subject and
> rakes toward the camera through heavy atmospheric haze, throwing visible shafts and
> lighting the airborne dust. Long lens, 135mm at f/2 — compressed perspective, shallow
> focus, subject sharp and background dissolving. Warm rim light on every edge turned away
> from camera. Filmic low-contrast curve with lifted blacks — nothing crushes to pure black
> — gentle veiling flare around the light source, halation on the highlights, fine 35mm
> grain. Muted, desaturated palette. Photographic realism: real skin, real cloth, real dust.
> Not an illustration, not a render, not CGI.
>
> SUBJECT: A shallow rocky river ford in the last dark before dawn. Two locked, grappling
> figures at the waterline, mid-struggle, spray frozen in the air. The first cold band of
> dawn is on the horizon directly behind them, so both men are near-silhouettes with a thin
> burning rim along shoulders and arms, and the spray is lit from behind into bright beads.
> No features visible on either face. Jabbok river, Iron Age Levant.
> PALETTE: near-monochrome — black water, black figures, one band of pale cold dawn.
> NOT IN THIS IMAGE: no faces, no wings, no angel, no glowing figure, no light coming out of
> either man, no lettering, no other people, no boats. Nothing else in the frame.

---

### 8 · `ch05-bush` — Not Consumed

> Cinematic fine-art photograph shot into the light. A low sun sits behind the subject and
> rakes toward the camera through heavy atmospheric haze, throwing visible shafts and
> lighting the airborne dust. Long lens, 135mm at f/2 — compressed perspective, shallow
> focus, subject sharp and background dissolving. Warm rim light on every edge turned away
> from camera. Filmic low-contrast curve with lifted blacks — nothing crushes to pure black
> — gentle veiling flare around the light source, halation on the highlights, fine 35mm
> grain. Muted, desaturated palette. Photographic realism: real skin, real cloth, real dust.
> Not an illustration, not a render, not CGI.
>
> SUBJECT: A low desert thorn bush burning with a steady flame that is not consuming it — the
> branches inside the fire are green and whole. The fire is the light source and it is behind
> the foreground, so heat haze and smoke are backlit and every thorn is rimmed. In the
> foreground on bare rock, a pair of worn leather sandals set neatly aside, empty, their
> edges catching the firelight. The long shadow of an unseen observer runs from the bottom of
> frame toward the fire. Sinai desert, late afternoon.
> PALETTE: amber fire against dust-grey rock and bleached sky.
> NOT IN THIS IMAGE: no people, no faces, no hands, no figure standing in frame, no face in
> the flames, no lettering, no charred branches. Nothing else in the frame.

---

### 9 · `ch06-shine` — Borrowed Light

> Cinematic fine-art photograph shot into the light. A low sun sits behind the subject and
> rakes toward the camera through heavy atmospheric haze, throwing visible shafts and
> lighting the airborne dust. Long lens, 135mm at f/2 — compressed perspective, shallow
> focus, subject sharp and background dissolving. Warm rim light on every edge turned away
> from camera. Filmic low-contrast curve with lifted blacks — nothing crushes to pure black
> — gentle veiling flare around the light source, halation on the highlights, fine 35mm
> grain. Muted, desaturated palette. Photographic realism: real skin, real cloth, real dust.
> Not an illustration, not a render, not CGI.
>
> SUBJECT: A human head and shoulders completely covered by a single piece of rough woven
> undyed cloth. A brilliant light is directly behind the cloth, so the weave glows from
> within, every loose fibre on the edge of the veil is lit like filament, and the shape of a
> face is suggested by the drape but never resolves. Dust hangs in the light around the head.
> The image is the glow itself. Iron Age Sinai.
> PALETTE: warm white through coarse linen, everything else falling to soft grey.
> NOT IN THIS IMAGE: no visible face, no eyes, no features showing through the cloth, no halo,
> no rays, no crown, no gold, no lettering, no other people. Nothing else in the frame.

---

### 10 · `ch07-gate` — The Glory Backs Out

> Cinematic fine-art photograph shot into the light. A low sun sits behind the subject and
> rakes toward the camera through heavy atmospheric haze, throwing visible shafts and
> lighting the airborne dust. Long lens, 135mm at f/2 — compressed perspective, shallow
> focus, subject sharp and background dissolving. Warm rim light on every edge turned away
> from camera. Filmic low-contrast curve with lifted blacks — nothing crushes to pure black
> — gentle veiling flare around the light source, halation on the highlights, fine 35mm
> grain. Muted, desaturated palette. Photographic realism: real skin, real cloth, real dust.
> Not an illustration, not a render, not CGI.
>
> SUBJECT: The interior of an immense plain stone temple hall, looking straight toward a vast
> open doorway. Golden light is withdrawing outward through that doorway — blazing at the far
> threshold, already thin and grey where the camera stands. Dust hangs in the emptied air and
> the doorframe is rimmed with light. The hall is completely empty. Iron Age Jerusalem.
> PALETTE: cold grey stone, one shrinking rectangle of warm gold.
> NOT IN THIS IMAGE: no people, no faces, no statues, no idols, no furniture, no carved
> capitals, no Greek or Roman architecture, no gold objects, no lettering, no cathedral
> vaulting. Nothing else in the frame.

---

### 11 · `ch08-flint` — Set Like Flint

> Cinematic fine-art photograph shot into the light. A low sun sits behind the subject and
> rakes toward the camera through heavy atmospheric haze, throwing visible shafts and
> lighting the airborne dust. Long lens, 135mm at f/2 — compressed perspective, shallow
> focus, subject sharp and background dissolving. Warm rim light on every edge turned away
> from camera. Filmic low-contrast curve with lifted blacks — nothing crushes to pure black
> — gentle veiling flare around the light source, halation on the highlights, fine 35mm
> grain. Muted, desaturated palette. Photographic realism: real skin, real cloth, real dust.
> Not an illustration, not a render, not CGI.
>
> SUBJECT: Severe profile of a man's jaw and cheekbone, turned away from camera, almost
> entirely in shadow. The only light is a hard low sun directly behind him, tracing one thin
> burning rim along nose, lip, jaw and throat, and catching the stubble and the loose hair at
> his temple as filament. Haze behind him glows faintly red. Weathered skin, a set jaw.
> First-century Judea. The darkest image in the set — but the shadows stay open, never black.
> PALETTE: deep warm grey, one red-tinged rim.
> NOT IN THIS IMAGE: no eyes visible, no full face, no front view, no crown, no thorns, no
> blood, no halo, no other people, no lettering. Nothing else in the frame.

---

### 12 · `ch08-veil` — Torn

> Cinematic fine-art photograph shot into the light. A low sun sits behind the subject and
> rakes toward the camera through heavy atmospheric haze, throwing visible shafts and
> lighting the airborne dust. Long lens, 135mm at f/2 — compressed perspective, shallow
> focus, subject sharp and background dissolving. Warm rim light on every edge turned away
> from camera. Filmic low-contrast curve with lifted blacks — nothing crushes to pure black
> — gentle veiling flare around the light source, halation on the highlights, fine 35mm
> grain. Muted, desaturated palette. Photographic realism: real skin, real cloth, real dust.
> Not an illustration, not a render, not CGI.
>
> SUBJECT: A colossal woven temple curtain at the instant of tearing, splitting from the TOP
> downward. Blinding light bursts through the widening split directly toward camera, blowing
> out into flare; individual threads snap and are lit like filament against it; the heavy
> fabric still swings from the force. Shot from below at human height so the curtain towers.
> Blue, purple and crimson wool, Iron Age weave.
> PALETTE: deep shadowed wool against one blown-out white split.
> NOT IN THIS IMAGE: no people, no faces, no hands, no figure behind the curtain, no shape in
> the light, no cross, no lettering, no modern fabric. Nothing else in the frame.

---

### 13 · `ch09-charcoal` — The Second Fire

> Cinematic fine-art photograph shot into the light. A low sun sits behind the subject and
> rakes toward the camera through heavy atmospheric haze, throwing visible shafts and
> lighting the airborne dust. Long lens, 135mm at f/2 — compressed perspective, shallow
> focus, subject sharp and background dissolving. Warm rim light on every edge turned away
> from camera. Filmic low-contrast curve with lifted blacks — nothing crushes to pure black
> — gentle veiling flare around the light source, halation on the highlights, fine 35mm
> grain. Muted, desaturated palette. Photographic realism: real skin, real cloth, real dust.
> Not an illustration, not a render, not CGI.
>
> SUBJECT: A small charcoal fire burning alone on a grey pebble beach at first light. The sun
> is just clearing the water directly behind the fire, so the low smoke is backlit into a
> bright drifting sheet and the wet pebbles are edged with light. Two sets of bare human
> footprints in the wet sand lead toward the fire and stop. No people anywhere in the frame.
> Sea of Galilee, dawn.
> PALETTE: cold silver water and pale sky against one small warm fire.
> NOT IN THIS IMAGE: no people, no faces, no boats, no fish, no nets, no birds, no buildings,
> no lettering. Nothing else in the frame.

---

### 14 · `ch09-emmaus` — Known in the Breaking

> Cinematic fine-art photograph shot into the light. A low sun sits behind the subject and
> rakes toward the camera through heavy atmospheric haze, throwing visible shafts and
> lighting the airborne dust. Long lens, 135mm at f/2 — compressed perspective, shallow
> focus, subject sharp and background dissolving. Warm rim light on every edge turned away
> from camera. Filmic low-contrast curve with lifted blacks — nothing crushes to pure black
> — gentle veiling flare around the light source, halation on the highlights, fine 35mm
> grain. Muted, desaturated palette. Photographic realism: real skin, real cloth, real dust.
> Not an illustration, not a render, not CGI.
>
> SUBJECT: A rough wooden table in a dim stone room at dusk, shot toward a small window where
> the last low sun is coming in, so the table is contre-jour and everything on it is rimmed.
> On the table: a round flatbread freshly torn in half, a plain clay cup, crumbs. One low
> wooden chair is pushed back and empty. A thin line of candle smoke still curls upward from
> a just-extinguished wick, lit bright against the window. Someone was here a second ago.
> First-century Judea.
> PALETTE: warm window light, everything else dropping to soft brown shadow.
> NOT IN THIS IMAGE: no people, no faces, no hands, no figure in the doorway, no ghost, no
> glowing shape, no wine bottle, no glassware, no lettering, no modern furniture. Nothing
> else in the frame.

---

### 16 · `ch10-veil-lift` — The Same Room, Answered  *(bonus — the payoff of plate 1)*

> Cinematic fine-art photograph shot into the light. A low sun sits behind the subject and
> rakes toward the camera through heavy atmospheric haze, throwing visible shafts and
> lighting the airborne dust. Long lens, 135mm at f/2 — compressed perspective, shallow
> focus, subject sharp and background dissolving. Warm rim light on every edge turned away
> from camera. Filmic low-contrast curve with lifted blacks — nothing crushes to pure black
> — gentle veiling flare around the light source, halation on the highlights, fine 35mm
> grain. Muted, desaturated palette. Photographic realism: real skin, real cloth, real dust.
> Not an illustration, not a render, not CGI.
>
> SUBJECT: The same ancient limestone burial chamber as Chamber 25, seen from inside — but
> now full morning sun floods down through the broken floor above and fills the whole room.
> The camera looks up into the light. Every particle of dust is lit. Plain clay oil lamps and
> pottery sherds are clearly visible on the floor. Nothing is hidden by shadow any more. Iron
> Age Judah. Warm, open, resolved — the same room, answered.
> PALETTE: warm gold flooding cool limestone; the brightest image in the book.
> NOT IN THIS IMAGE: no people, no faces, no hands, no bones, no books, no codex, no compass,
> no sword, no gold objects, no lettering. Nothing else in the frame.

---

## Export and deliver

- **3:2 landscape, 2400 px wide minimum**, 3000 preferred. JPEG, highest quality.
- Name each file by its slot: `ch02-storm.jpg`, `ch03-mountain.jpg`, …
- Drop them in `art/` and tell Claude. Each goes live with its plate, caption, parallax and
  lightbox already waiting — one line each in `content/images.js`.

## The one rule that still holds

**No full face until chapter X.** Hidden, turned, cropped at the jaw, veiled, silhouetted,
seen from behind — for nine chapters the reader is denied the thing the book is about.
Chapter X is the first face in full light. Backlighting makes this easy: a rim-lit
silhouette hides a face beautifully. Hold the rule and fifteen pictures become one work.
