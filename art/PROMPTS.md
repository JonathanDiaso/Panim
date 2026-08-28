# PANIM — image prompts

Two prompts per picture. Generate **1**, then send **2** on the same image. **2** only ever
subtracts — the model's first answer is always too pretty, too full, too evenly lit.

> 🔁 **Rewritten 2026-08-27 (third pass).** The previous sheet is in
> `archive/PROMPTS-2026-08-27-pre-rewrite.md`. It produced a modern woman in chapter X,
> generically "ancient" props everywhere, and three different veils described as if they
> were the same piece of cloth. §1 says exactly why. Everything from `## The set` down is new.

---

## 1. Why the last set came back wrong

The old sheet was **90% camera and light, 10% world.** Count the words in the old chapter X
prompt: *85mm, eye level, close, direct bright light with no haze, sharp lashes, plain warm
background* — eleven clauses of optics, and for the human being at the centre of the
picture, four words: **"a woman's face."**

A generative model fills silence with its median. Its median woman is a 2020s studio
portrait: styled brows, foundation, a blow-dry, straight orthodontic teeth, a bare neck.
That is not the model failing. That is the prompt never saying otherwise.

**Three failures, all the same failure:**

| | what the prompt said | what came back |
|---|---|---|
| **No period on people** | "a woman's face", "a man's profile", "two figures", "sailors" | contemporary faces, contemporary grooming |
| **No period on objects** | "a wooden merchant ship", "clay lamps", "heavy woven cloth", "a low chair" | age-of-sail galleon, generic pottery, a blanket, a dining chair |
| **No specificity on the thing the chapter is actually about** | "a colossal woven temple curtain" | a plain sheet — no cherubim, no colours, no scale |

The last one is the worst, because the curtain **is the chapter**. Chapter VIII spends four
paragraphs on what was woven into that cloth — *cherubim*, Eden's guards, embroidered on the
barrier for a thousand years — and the prompt asked for a blank curtain. The picture could
not carry the idea because the idea was never in the prompt.

**The fix is not more adjectives.** It is naming, once and flatly: the century, the place,
who these people are, what the cloth is made of, how the object was manufactured. Then the
optics, which were always fine.

### Two words to never use

- **"biblical"** — pulls Renaissance and Victorian religious painting. Halos, blue-and-white
  Madonnas, blond Christs, Doré engravings. Say the century and the place instead.
- **"ancient"** — pulls Greco-Roman. Fluted marble columns, white togas, laurel. Almost
  nothing in this book is Greco-Roman. Say *Iron Age Judah*, *Late Bronze Age Levant*,
  *Second Temple Judea, first century.*

Also avoid **"photorealistic"** and **"not an illustration"** — both flatten the light. And
never stack adjectives: say the light source, its direction and its colour **once**, say what
things are made of, and say in one clause what the picture is about.

---

## 2. The standing block — paste into every prompt that has a person in it

This is the paragraph the old sheet was missing. It goes in **prompt 1**, after the subject
and before the optics. Trim it to what is visible — do not describe a face in a prompt where
the face is turned away.

> ✅ **2026-08-28: you no longer have to paste it.** Every prompt below now carries its own
> trimmed casting block and its own never-list, inline, so **prompt 1 is copy-paste complete
> as written**. §2 and the never list are kept here as the source of truth for writing a
> *new* slot; they are no longer an assembly step. The old sheet's real failure mode was
> not the wording — it was that the wording lived in a section nobody pasted.

> **Period and casting.** [ERA — see the table below]. The people are Levantine: olive-brown
> to deep brown skin weathered by sun, dark brown-to-black hair, dark eyes, strong brows, no
> Northern European features. Men are bearded and unbarbered, hair to the collar. Women's
> hair is covered in public by a draped cloth. No cosmetics, no shaped or plucked brows, no
> styling, no modern dentistry — real teeth, sun-lined skin, working hands with dirt in them.
> **Clothing** is hand-spun wool and linen, woven in one piece and draped, not tailored: a
> long tunic to the ankle, a rectangular mantle over it, a belt of folded cloth or leather,
> bare feet or flat leather sandals with a thong between the toes. Colour comes only from
> plant dye — undyed cream and brown, madder red, weld yellow, indigo — never saturated.
> Nothing has a seam, a hem-stitch, a button, a zip, a collar, a cuff or a pocket.

**Era, by chapter:**

| slot | say this |
|---|---|
| `ch02-trees` | no period — the first two human beings, before any craft; see the prompt |
| `ch04-river`, `ch10-veil-lift` | Middle Bronze Age Canaan, c. 1800 BC — patriarchal, tent-dwelling, no iron |
| `ch02-storm` | Iron Age Levant, 8th century BC — Phoenician coastal shipping |
| `ch03-mountain`, `ch05-bush`, `ch06-shine` | Late Bronze Age, c. 1300 BC — Israelites out of Egypt, a camp not a town |
| `ch01-scroll`, `ch07-gate` | Iron Age Judah, 7th–6th century BC — Jerusalem before the exile |
| `ch08-flint`, `ch08-veil`, `ch09-*`, `ch10-morning` | Second Temple Judea, first century AD — Roman occupation |
| `ch01-tomb`, `hero` | see the prompt; these two are special cases |

### The never list

Add as a closing line to any prompt where a person or an interior appears:

> No halo, no aureole, no rays from a head, no glowing skin except where the prompt asks for
> it. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman
> columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no
> ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no
> printed pattern. No lens flare, no light shafts added for effect, no floating embers, no
> dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

---

## 3. The light arc — unchanged, and still load-bearing

Six of eleven pictures in the first set were ordered in identical light (*golden hour, god
rays, warm amber*) which is why the set came back samey. The site's paper runs **night to
morning** across the ten chapters. If every plate is golden, the arc dies in the pictures.

**Constant: the optics.** Backlight. Real haze. Blacks that stay black. Depth in layers.
Bloom on the brightest edge only.

**Variable: the light.** Every chapter already has a colour on the page. The plate takes its
light from that:

| ch | the page | the light to ask for |
|---|---|---|
| I | rust | one hard shaft into a dark room |
| II | cold blue | dusk, twenty minutes after sundown, no warmth left |
| III | ember | night; firelight inside smoke is the only source |
| IV | night water | deepest night, moon on water, one thin line of dawn |
| V | flame | the fire is the only light and it falls off fast |
| VI | gold | hard low sun directly behind, blown at the rim |
| VII | slate | overcast, colour draining out |
| VIII | blood | storm-dark, red-brown, one rim of light |
| IX | amber | first grey light, plus one small warm fire |
| X | morning | full clean sun, no haze at all |

---

## 4. How to write the second prompt

**Subtract.** Darker, emptier, closer, further back. Name one thing to remove and one thing
to keep. **Never add a new element in 2** — you get a new picture instead of a better one.

Four words that do most of the work: *darker · emptier · closer · further back.*

---

## 5. The three veils are three different objects

The book turns on this and the old sheet blurred all three into "heavy cloth." They are not
interchangeable, and a picture that gets the wrong one is a picture that argues the wrong thing.

| slot | Hebrew | what it physically is | who it protects |
|---|---|---|---|
| `ch06-shine` | **masveh** — Ex 34:33, a word coined for this and never used again in the Bible | one square of undyed woven wool laid over a man's face and tucked at the temples. Domestic. Improvised. It has no fittings because nothing like it existed before. | protects **the people** from the shine — and hides from them that the shine is fading |
| `ch08-veil` | **parochet** — Ex 26:31 | sixty feet high, thirty wide, a handbreadth thick. Blue, purple and scarlet worked into fine twisted linen, with **cherubim woven into the cloth** — Eden's guards, embroidered on the barrier. Architecture, not drapery. | protects **the people** from the Presence — until it is torn from the top, from the other side |
| `ch10-veil-lift` | **tsaif** — Gen 24:65 | a light draped bridal cloth, sheer enough to see through, worn over the head and drawn across the face by hand. No fastening. | protects nothing. It is the one covering that exists **for the sake of its own removal** |

> 🛑 **The old `ch10-veil-lift` prompt was backwards** and would have contradicted the book.
> It asked for a woman who *"has lifted a light veil away from her face."* Genesis 24:65 says
> the opposite — *"she took her veil and covered herself"* — and chapter X builds a page on
> exactly that: **"No bride lifts her own veil; she wears it until the groom reaches out and
> raises it himself. Even the unveiling was never hers to do."** The picture is the moment she
> **draws it across**, seeing him. Fixed below.

---

## 6. Say the positive. Negation is the weakest instruction you can give.

🔁 **Added 2026-08-28, from evidence in the delivered frames, not from theory.**

The never-list is a chain of *no X, no Y, no Z*. Image models are poor at negation —
naming a thing puts it in the model's head whether or not the word "no" is in front of
it. Two frames prove it:

| slot | the prompt said | what came back |
|---|---|---|
| `ch06-shine` | **no bokeh orbs** | bokeh orbs |
| `ch02-trees` | **no light shafts added for effect**, and *no Northern European features* | god rays through the trees, and a woman with long wavy light auburn hair |

Four instructions, all stated, all ignored — and two of them arguably *summoned* by
being named. That is not the model being disobedient; it is a known property of how
these systems read text.

**The fix is not to delete the never-list.** It stays, because it is the checklist you
grade the delivered frame against, and because a few models do honour it. The fix is
that **every constraint that matters must also exist as a positive statement in the
body of the prompt**, where it is doing work.

| instead of | say |
|---|---|
| no lens flare, no god rays | *the only light in the picture comes from the fire; everything the fire does not reach is black* |
| no bokeh, no dust sparkles | *the air is clear and still; the background is a flat wall of unlit foliage* |
| no Northern European features | *deep olive-brown skin weathered by sun, black hair, dark eyes, strong brows* — she is already described, so there is no gap for the median to fill |
| not a hood, not a cowl | *one flat unhemmed square of cloth laid over the face, its four corners visible, two of them tucked at the temples* |
| no chairs | *a woven reed floor mat and a bolster cushion, the hollow of someone still in it* |
| no masonry | *bare earth and roots underfoot; nothing in the frame has been cut, stacked or shaped by a tool* |

The rule in one line: **a silence is filled with the median. A description is not.**
Every failure in §1 was a silence. Two of the failures above were a silence with a
"no" standing next to it, which is the same silence.

---

## The set

Deliver **3:2 landscape, 2400 px or better, JPEG**. Name by slot — `ch07-gate.jpg`.
Keep the subject **centred**: sides crop on desktop, top and bottom on phones.

> ⚠️ **Resolution: the generator in use cannot meet this.** Every frame staged on
> 2026-08-27 came back **1408 × 768** — that is Gemini's ceiling, and it is wrong twice:
> **too small** (plates want 2400 px+; these are the softness already noticed on a large
> display) and **the wrong shape** (1.83:1, where 3:2 is 1.5:1, so the crop is decided by
> the generator instead of by the frame).
>
> **Nothing in the prompts below fixes this — it is a tool limit, not a wording problem.**
> Three ways out, and one has to be picked before the set is finalised: generate at 2400 px
> somewhere that supports it; upscale the keepers (a 1.7× lift on a soft source is a
> compromise, not a fix); or accept 1408 px and drop the plates out of full-bleed so they
> are never asked to fill a wide screen. **Do not wire a plate into `images.js` and then
> discover it cannot be printed large.**

**No full face until chapter X.** Hidden, turned, veiled, backlit, seen from behind, too far
away to read. Chapter X is the first face in full light and it only lands if it is the first.

---

### `hero` — the door · *have one; reroll optional*

> **1.** A heavy door of planked cedar standing half open in a small windowless limestone
> room, Iron Age Levant. The door is built the way doors were built before hinges: thick
> vertical boards pegged to two cross-battens, studded with hammered bronze bosses, turning
> on a projecting post that sits in a socket cut into the stone threshold — so the pivot is at
> the edge of the door, not a hinge on the jamb. The walls are dry-laid limestone blocks with
> tool marks still on them, the floor is beaten earth over stone. The only light in the
> picture comes through the gap: low sun, warm, landing on the floor as one hard-edged wedge
> with dust moving in it. The far corners stay black. Shot from inside at standing height,
> 35mm, the door slightly off centre. The picture is about being invited in, not about the
> door. No lettering, no carving, no metalwork later than cast bronze.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same room, same door. Darker, and the wedge of light narrower and harder — one shape
> on the floor, not a glow filling the space. Remove any second light source. Let the far wall
> go completely black.

---

### `ch01-tomb` — Chamber 25 · **reroll — the period is confused**

> ⚠️ This is the one scene in the book with **two periods in the same frame**, and the old
> prompt collapsed them. The hand is a **thirteen-year-old volunteer's, in 1979**. Everything
> below it is **seventh-century BC**. Saying "Iron Age Judah, 600 BC" over the whole picture
> is what makes the hand come back wrong. Name both, and name which is which.

> **1.** Looking straight down through a broken slab in a rock-cut limestone floor into a
> burial chamber below, at Ketef Hinnom above the Hinnom Valley, Jerusalem. **At the top of
> frame, a modern excavator's hand grips the jagged edge** — a boy's hand, thirteen years old,
> chalk-white with limestone dust, a frayed cuff of 1970s cotton drill at the wrist. That hand
> and cuff are the only modern things in the picture. **Everything below is seventh century
> BC, undisturbed:** a repository cut beneath the burial benches, half filled with the bones
> of generations pushed there by their own families, and among the bones small wheel-made clay
> oil lamps with pinched spouts blackened at the lip, plain undecorated burnished pottery,
> loose carnelian and glass beads, and grey silt that has not moved in twenty-six centuries.
> One shaft of afternoon sun comes through the break and is the only light reaching the
> chamber; the rest of the chamber is dark. 35mm, directly overhead. No metal tools, no
> writing, no textile, no artefact later than 600 BC anywhere below the break.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same shot, darker. Let two thirds of the frame go to black. Keep the hand, the broken
> edge, the shaft of light, three or four clay lamps and the edge of the bone pile. Remove
> everything else.

---

### `ch01-scroll` — the oldest words · **reroll — the script is wrong**

> ⚠️ A model asked for "Hebrew letters" renders **modern square Hebrew**, which is Aramaic
> script and eight hundred years too late. Ketef Hinnom KH1 is incised in **palaeo-Hebrew** —
> the older angular alphabet, closer to Phoenician: no square blocks, no crowns, no vowel
> points. This must be said or the plate is an anachronism sitting under the caption *"the
> oldest words we have."*

> **1.** Extreme close-up of a tiny rolled strip of silver foil lying in an open palm. It is
> about 97mm of sheet wound into a cylinder roughly 11mm across — the size of a filter, no
> bigger — blackened to charcoal grey with tarnish, cracked and flaking at the exposed edge,
> the coil visibly loose. Faint letters are **scratched into the metal with a stylus** in
> **palaeo-Hebrew script — angular Phoenician-style strokes, not modern square Hebrew, no
> vowel points, no crowns** — and a low raking light catches only their incised edges. The
> palm behind it is weathered, out of focus, filling the background. 135mm macro, the scroll
> filling the frame. No text legible enough to read as a word, no ornament, no chain, no case.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same object, closer. Fill the frame with the silver alone, the palm only a soft field
> behind it. Rake the light lower until the scratched letters are the brightest thing in the
> picture and everything else is dull grey metal.

---

### `ch02-trees` — the hiding · **reroll — this is still the priority, and the clothing is wrong**

> ⚠️ The old prompt dressed them in **"rough linen."** At Genesis 3:8 there is no linen and
> no weaving in the world yet. They have **sewn fig leaves together** (3:7); the garments of
> skin come later (3:21). Linen puts a whole textile industry into a picture whose subject is
> the first hour after shame. And the published plate is golden and lush — chapter II is the
> coldest page in the book.

> **1.** A garden at dusk, twenty minutes after the sun has gone. **The sun is already below
> the horizon and the only light left is the flat blue of the sky itself — an even, sourceless
> dusk with no beam, no shaft and no bright spot anywhere in the frame.** The colour has drained
> out of everything: blue-grey leaves, cold shadow, no warm light anywhere in the frame. Two human
> figures press themselves against the far side of two heavy tree trunks, backs to us, faces
> turned into the bark and hidden. **They are the first two people, before any craft exists —
> covered only by large fig leaves crudely stitched together at the hip with plant fibre,
> nothing woven, nothing spun, nothing dyed.** Bare shoulders, bare feet, dirt on them.
> **Both are Levantine: deep olive-brown skin, near-black hair, hers gathered and pushed back
> off the neck rather than falling loose.** **The ground is bare earth, leaf litter and exposed
> roots — nothing in the frame has been cut, stacked, carved or shaped by a tool: no step, no
> wall, no path, no bench.** Deeper in among the trees, a soft pale light is moving toward them — not a lantern,
> not a torch, no visible source. 85mm, waist height, the figures small and off to one side.
> The picture is about being looked for. No serpent, no fruit, no apple, no wings, no halo.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same garden, same two figures. Colder and emptier: remove the flowers and the
> undergrowth detail, let the ground go dark. Keep only the two trunks, the two hidden figures
> and the pale light between them. No golden light anywhere.

---

### `ch02-storm` — hurled · **needed — and the ship is the whole risk**

> ⚠️ "A small wooden merchant ship" returns an age-of-sail galleon: multiple masts, gun
> ports, a sterncastle, rigging everywhere. Jonah's ship is eighth-century BC Phoenician
> coastal trade and looks nothing like that.

> **1.** A **Phoenician merchant ship of the 8th century BC** in open sea at night, shot
> broadside from water level as a wave lifts under it. **One mast, dead centre, carrying one
> square sail on a horizontal yard, the sail half brailed up. A high curved stern and a curved
> stempost, both rising well above the low open hull. Steering is a long oar over the
> quarter — no rudder, no wheel. No second mast, no jib, no triangular sail, no gun ports, no
> castles, no ratlines.** Rain in sheets. Clay storage jars going over the side into the water,
> already half swamped. The only light is a cold blue-white break in the cloud behind, which
> turns the water to moving glass and the ship to a black shape. 35mm, low. The sea should look
> aimed at this one ship.
>
> **Period and casting.** Iron Age Levant, 8th century BC — Phoenician coastal shipping. Any crew visible are Levantine: olive-brown to deep brown skin weathered by sun, dark hair, dark eyes, no Northern European features; bearded and unbarbered. Clothing is hand-spun wool and linen, woven in one piece and draped, not tailored — no seam, hem-stitch, button, collar, cuff or pocket. Colour only from plant dye, never saturated.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same frame, harder. Remove the crew. Remove any warm lantern light. Push the ship
> smaller and further off centre, and let the foreground wave take a third of the picture.
> Cold blue-white only.

---

### `ch03-mountain` — the mountain burns · *have one; reroll to add the boundary*

> The chapter's hinge is that they were **allowed** to come and would not: *"they stood far
> off."* A boundary was set around the mountain that no one crossed. Putting that line in the
> picture is what turns a landscape into the chapter.

> **1.** A granite desert mountain at night, its summit inside a column of smoke lit from
> within by fire, lightning tearing the smoke open from inside, ash falling through the dark.
> **The fire is burning ON the mountain, not coming out of it — the peak is solid rock with
> flame and smoke standing over it. No crater, no vent, no lava, no molten rock running down
> the slope; this is not an eruption. The fire inside the smoke is the single source of light
> in the entire frame and the sky elsewhere is black.**
> **Across the plain below, a low boundary of piled stones runs the full width of the frame —
> a marked line nobody has crossed.** Behind it and far back, an enormous crowd stands facing
> the mountain, not moving closer, small enough to read as a dark band rather than as people;
> beyond them, the edge of a tent camp. Late Bronze Age, c. 1300 BC — hand-woven wool
> mantles, goat-hair tents, no architecture of any kind. 24mm, low, looking up, the mountain
> taking the upper two thirds. Firelight is the only colour; everything else is black and
> ash-grey. No stone tablets, no figure on the summit, no parted sea.
>
> **Period and casting.** Late Bronze Age, c. 1300 BC — Israelites out of Egypt, a camp not a town. The crowd is Levantine and read only as a dark band at this distance; hand-spun wool and linen, draped not tailored, plant dye only, no saturated colour, nothing with a seam, hem-stitch, button, collar, cuff or pocket.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same mountain. Push the crowd further back and smaller, and keep the stone boundary
> line. Kill any moonlight so the fire inside the smoke is the single source. More smoke, less
> rock.

---

### `ch04-river` — the night at the ford · *have one; reroll if the far bank reads populated*

> The sentence the chapter is built on is *"Jacob was left alone."* Everything he owns has
> already crossed. If the far bank has firelight or tents on it, the picture argues against
> the text.

> **1.** Two men locked together wrestling in shin-deep river water at the darkest part of the
> night, at a stony ford of the Jabbok. Water level, 50mm, close enough that spray is in the
> foreground. Moonlight behind them turns the thrown water white and both men into black
> shapes with a hard thin rim; no faces, no expressions, no wings. Middle Bronze Age Canaan —
> one wears a short belted wool tunic soaked through, the other is barely readable as clothed
> at all. **The far bank is empty and black: no tents, no animals, no fire, nobody watching.**
> A single band of grey at the horizon — dawn, still hours off. Deep blue-black everywhere else.
>
> **Period and casting.** Middle Bronze Age Canaan, c. 1800 BC — patriarchal, tent-dwelling, no iron. Both men are Levantine: deep olive-brown skin weathered by sun, black hair to the collar, full unbarbered beards, no Northern European features, working hands. Hand-spun wool, woven in one piece and belted with folded cloth — no seam, hem-stitch, button, collar, cuff or pocket; undyed cream and brown only.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same two figures, later in the fight. Camera almost in the water. Thin the rim light
> further. They should look exhausted rather than athletic — heavier, lower, leaning into each
> other instead of grappling. One of them is favouring a hip.

---

### `ch05-bush` — not consumed · *have one; reroll to put the flock back*

> The chapter is emphatic that this is *"one old man, and sheep"* — the smallness is the
> point, against chapter III's six hundred thousand at the same mountain. An empty desert
> loses that.

> **1.** A desert thorn bush on bare rock burning with a steady flame that is not eating it —
> the branches inside the fire are still green, whole, unblackened. The fire is the only light
> in the picture and it falls off fast, so the desert around it goes dark within a few metres.
> **A pair of worn flat leather sandals with a toe-thong has been set down on the stone in the
> near foreground**, and a shepherd's staff of olive wood lies beside them. **Further back at
> the edge of the firelight, four or five fat-tailed sheep stand in the dark, indifferent.**
> Late Bronze Age Midian. 50mm, low, close to the ground. No man in frame, no face, no angel,
> no wings.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same bush. Darken everything the fire does not reach until the picture is mostly
> black. Keep the green inside the flame clearly visible — that is the whole point of the
> picture. Move the sandals further forward, half in shadow, and let the sheep become only
> shapes.

---

### `ch06-shine` — borrowed light · *have one; reroll for the masveh*

> ⚠️ "Heavy woven cloth" over a head returns a hooded cloak or a blanket. The **masveh** is a
> single flat square laid over the face — Hebrew had no word for it and had to coin one,
> because no such object existed. It should look improvised, because it was.

> **1.** The head and shoulders of an eighty-year-old man, shot against a low sun directly
> behind him, **standing in open desert: bare rock, dust and dry air, the ground running flat
> and empty to a far ridge, no tree or leaf anywhere in the picture.** **A single flat square of
> undyed hand-spun wool is laid over his face — a loose panel about a forearm across, its four
> corners visible, the two upper ones tucked at the temples so the lower edge hangs free of the
> jaw and the cloth reads as a piece of household weaving someone picked up and used. It is not
> a hood, not a cowl and not part of a garment; nothing tailored, nothing fastened.** The sun sits right at the edge of the fabric so the
> weave glows and loose threads light up like filament. No face, no eyes, no shape of features
> readable through it. Beneath, the shoulders of a coarse wool mantle. Hard gold, blown out at
> the rim, deep shadow on the near side. 85mm, eye level, tight. **The light must read as
> borrowed — clearly arriving from behind him, never emitted by the cloth or the man.** No
> halo, no rays, no horns, no glow around the head.
>
> **Period and casting.** Late Bronze Age, c. 1300 BC. Levantine: deep olive-brown skin weathered by sun, grey-white hair and a full unbarbered beard at eighty, no Northern European features, no cosmetics, no shaped brows, no modern dentistry. Hand-spun undyed wool, draped not tailored — no seam, hem-stitch, button, collar, cuff or pocket.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same figure. Overexpose the light behind until the top edge of the cloth is pure
> white and the weave only survives lower down. **The air is clear and completely still — the
> background is a flat unlit field with nothing in it to catch a highlight.** Nothing else in
> frame — no second figure, no tablets. Keep the light strictly behind.

---

### `ch07-gate` — the glory backs out · **needed — concept changed, read this**

> 🔁 **This prompt is a different picture from the old one, on purpose.** The old prompt asked
> for a bare undecorated stone hall and then told the model to *"strip all decoration from the
> stone."* Solomon's temple was the opposite of bare: cedar-lined, carved through with
> cherubim, palm trees and open flowers, and overlaid in gold, floor included. Stripping it
> made it not the temple.
>
> The chapter also names the route exactly — the glory lifts from over the cherubim, goes to
> **the threshold**, then to **the east gate of the courtyard**, then stands over the Mount of
> Olives. And in Ezekiel 43 it returns **through the same east gate**. The gate is the picture,
> it is what the slot is named, and it is the only frame that sets up the homecoming.
>
> The other half of the chapter is that **nobody noticed.** *"There is no earthquake the
> morning the glory leaves. The priests keep the schedule, the smoke goes up on time."* So the
> altar smoke is still rising, correctly, in the same frame as the empty gate. That is the
> plate.

> **1.** The east gate of the inner courtyard of Solomon's temple in Jerusalem, seen from
> inside the court, standing wide open onto empty air and the low ridge of the Mount of Olives
> beyond. Iron Age Judah, 6th century BC. The gateway is a deep recessed passage of dressed
> ashlar limestone with cedar-panelled jambs, and the panels are **carved in low relief with
> cherubim and palm trees alternating, thinly overlaid in gold that has gone dull** — the
> carving must be present and must be worn, not gleaming. Overcast daylight, grey, no sun, the
> colour draining out of everything toward slate. Dust in still air. **At the left edge of
> frame, a thread of altar smoke is still going up, straight and orderly.** The gateway itself
> is completely empty — no priest, no guard, no figure, nothing in the passage, nothing in the
> light. 24mm, eye level, the gate slightly off centre, one-point perspective down the
> passage. The picture is about something having just left, on schedule, unnoticed. No wheels,
> no throne, no winged creatures in the sky, no fire, no rays.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same gate, emptier and greyer. Drain the colour until it is close to monochrome
> slate; let the gold in the carving read as tarnish only. Darken the near half of the passage
> so the open air beyond is the brightest thing in the frame. Keep the carved cherubim on the
> jambs and keep the thread of smoke. Nothing warm anywhere.

---

### `ch08-flint` — set like flint · **needed** *(chapter VIII's title plate)*

> Flint is a specific stone and the prompt should use it as the colour reference: struck flint
> is grey-brown, waxy, and breaks to a glassy edge. Isaiah 50 also gives the beard — *"my
> cheeks to those who pluck out the beard"* — so the beard belongs in the frame.

> **1.** The profile of a man in his early thirties turned hard to one side against a
> storm-dark sky. Second Temple Judea, first century — Levantine, deep olive skin, black hair
> to the collar, **a full untrimmed beard**, sun-worn skin, no cosmetics, nothing groomed.
> 135mm, tight: nose, lip, jaw, beard and the line of the throat, nothing else. One low
> **red-brown light the colour of struck flint** rakes the edge of the profile and dies
> immediately; the rest is near black. Loose hair and beard catch as filament at the edge. No
> crown, no thorns, no blood, no halo, no cross, no European features. **The expression is not
> anguish and not serenity — it is a decision already made**, jaw set, eye forward, going
> somewhere.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same profile, tighter and darker. Crop until the eye is out of frame or lost in
> shadow. Reduce the rim light until it traces only the nose and the jaw through the beard.
> Flat storm-grey behind, no detail at all.

---

### `ch08-veil` — torn · **needed — and this is the one the book most needs right**

> ⚠️ The old prompt said *"a colossal woven temple curtain"* and *"no people, no hands, no
> figure behind it,"* and that was the whole specification. Chapter VIII spends four paragraphs
> on what was **woven into** it: *"blue and purple and scarlet, fine twisted linen, the work of
> a skilled designer. And worked into the cloth, cherubim. The last time those appeared in the
> story, they were not decoration"* — Eden's guards, embroidered on the barrier for a thousand
> years. **If the cherubim are not visible in the cloth, the plate cannot say what the chapter
> says.** Scale matters too: sixty feet high, a handbreadth thick, and torn **from the top
> downward**, which is the detail that proves no one in the room could have reached it.

> **1.** A single colossal woven curtain filling the whole frame, floor to ceiling, splitting
> **from the top downward**. It is sixty feet high and as thick as a hand — heavy enough that
> it hangs in deep vertical folds and swings slowly rather than billowing. **The cloth is fine
> twisted linen worked in blue, purple and scarlet, and large winged cherubim are woven into
> the weave itself and repeated across it — figures made of thread, flat and stylised and part
> of the fabric, not appliqué and not painted.** The tear runs down through them, splitting one
> figure. Hard white light bursts through the widening rip; individual threads snap at the edge
> and light up as they part. Shot from below at 24mm so the fabric towers and the top of the
> tear is far overhead. Most of the colour is blown out near the rip and survives only lower
> down. **No people, no hands, no figure behind it, no altar, no furniture** — the curtain is
> the entire picture. No cross, no crucifix, no rays, no dove.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same curtain one second later — the tear longer, reaching further down toward us,
> splitting a second woven figure. More light through the split, less visible fabric. Let the
> top third of the picture go to pure white. Keep the snapping threads and keep the woven
> cherubim readable in the surviving cloth at the bottom.

---

### `ch09-emmaus` — the table after · **needed** *(chapter IX's title plate)*

> ⚠️ The old prompt put **"a low chair pushed back and empty"** in the room. First-century
> Judeans did not sit on chairs at a meal; Luke's verb is *reclined*. A chair is a nineteenth-
> century dining room in a first-century village house. Use a floor mat and a bolster cushion,
> with the hollow still in it.

> **1.** A low wooden table, barely a foot off the floor, in a small dim village house of dry
> limestone with a beaten earth floor and a single small square window with no glass. First-
> century Judea. Shot from table height toward the window, 35mm. On the table: **a round flat
> loaf of barley bread, freshly torn into two halves, the torn crumb still light**; a small
> wheel-thrown clay cup, unglazed; a shallow dish. **On the near side, a woven reed floor mat
> and a bolster cushion pushed back from the table, the hollow of someone still in it.** First
> grey light outside the window; one small pinched-spout clay oil lamp is the only warm thing
> in the picture, and **a thin line of smoke is still rising from a wick that has just gone
> out.** No people, no chairs, no benches, no cutlery, no glassware. Someone left this table
> half a second ago.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same table. Darker room, brighter window, so the torn bread and the cup are almost
> silhouettes with a warm edge from the lamp. Clear everything else off the table. Keep the
> smoke line — it should be the sharpest detail in the frame.

---

### `ch09-charcoal` — the second fire · **needed**

> ⚠️ *Anthrakia* is a **charcoal** fire, and the chapter turns on the smell of charcoal
> specifically — the same smell as the courtyard where Peter denied him, the word appearing in
> only those two places in the New Testament. Charcoal does not look like a campfire: black
> lumps, no flame, glowing red inside, very little smoke and that low and blue. A model given
> "fire" gives you orange flames and kills the point. The Galilee shore is also **black
> basalt**, not grey pebble — a real, free specificity.

> **1.** A small **charcoal** fire burning by itself on a **black basalt pebble beach** at the
> Sea of Galilee at first light. **The charcoal is lumps of burnt wood with no flames at all —
> matte black outside, glowing deep red in the cracks**, throwing only a low blue-grey smoke
> that drifts sideways and is backlit into a thin sheet. Two fish and a flat round loaf are
> laid directly on the coals. 50mm, camera almost on the stones. Wet dark sand, bare footprints
> leading toward the fire and stopping. Cold grey-blue sea and sky behind, flat calm; the fire
> is the only warm colour in the frame and it is small. No people, no boats, no nets, no birds,
> no flames.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same fire, camera lower still, until the sheet of smoke crosses the whole frame. Cool
> the sea and sky further toward grey-blue and keep the fire small. Keep it flameless — coals
> only. It should look like a fire someone built for you and then stepped away from.

---

### `ch10-veil-lift` — she covers her face · **needed — the old prompt was backwards, see §5**

> 🛑 **Genesis 24:65 is *"she took her veil and covered herself,"*** and chapter X builds a
> whole page on it: *"No bride lifts her own veil; she wears it until the groom reaches out
> and raises it himself."* The old prompt asked for the opposite and would have printed a
> contradiction of the text under its own caption. **She draws the veil across. She does not
> take it off.**
>
> The other thing the chapter names is the doubling: *"he lifts up his eyes and sees. Then
> Rebekah lifts up her eyes and sees. Twice in two verses, the same verb lands on both of
> them."* Two people seeing each other in the same moment, across a field. That is the picture,
> and the veil going up is what she does with it.

> **1.** A field of dry grass in the last hour of evening light, Middle Bronze Age Canaan, seen
> wide and low at 24mm with both figures small in the frame. **On the right, a woman sitting
> side-on atop a kneeling camel, having just turned toward the field. With one raised hand she
> is drawing a light, almost sheer draped cloth across her face — the veil is coming up, moving
> into place, half across her, not being pulled away.** Beside the camel, a servant on foot,
> and behind them two more loaded camels. **Far across the field on the left, a single man
> walks alone toward her**, unhurried. Warm low sun behind them both, long shadows from each
> reaching toward the other across the grass. Neither face is readable at this distance and
> neither should be. Hand-woven wool, no tailoring, no saddle frame — a folded blanket and
> girth only. The picture is about two people seeing each other in the same moment. No wedding
> imagery, no white dress, no flowers, no crowd.
>
> **Period and casting.** Middle Bronze Age Canaan, c. 1800 BC. Both figures are Levantine: olive-brown skin weathered by sun, dark hair, dark eyes, the man bearded and unbarbered, the woman's hair covered by a draped cloth. Hand-spun wool and linen, woven in one piece and draped, not tailored; plant dye only — undyed cream and brown, madder red, weld yellow — never saturated. No seam, hem-stitch, button, zip, collar, cuff or pocket.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same field, same two. Pull back further so both are smaller and the field is most of
> the picture. Warmer, later light — almost the last minute of sun. Keep her raised hand and
> the veil mid-motion, and keep both long shadows reaching toward each other.

---

### `ch10-morning` — face to face · **reroll — this is the one that came back a modern woman**

> ⚠️ **The published plate is the clearest failure in the set** and the reason this sheet was
> rewritten. The old prompt's entire description of the human being was *"a woman's face"* plus
> *"plain warm background with nothing to read"* — a studio brief. What came back is a
> contemporary portrait: styled brows, makeup, modern hair, a modern neck, nothing of the book
> in it.
>
> Chapter X does name the scene. *"On the first morning of the new world, in a garden, of a
> woman who could not see Him through her own crying"* — Mary, at first light, who did not know
> His face until He said her name. **Put the picture in that garden.** It is also the only fully
> lit face in the book, so it carries the whole arc, and it has to be a real first-century face
> for that to land.

> **1.** The face of a woman in her thirties in full clean morning sunlight, in a garden
> outside Jerusalem at first light. First-century Judea: deep olive skin, black hair, **a
> draped length of undyed linen over her head that has slipped back off her hair**, no
> cosmetics of any kind, unshaped brows, sun-lined skin at the eyes, plain unstyled hair, a
> coarse woven mantle at the shoulder with no seam or hem visible. 85mm, eye level, close.
> **She has just turned toward the camera** — eyes open, looking straight out. Not smiling:
> steady, the look of someone who has stopped bracing. Tears standing at the lower lid and wet
> tracks already dried on the cheek, none falling now. Direct bright low sun with no haze at
> all; skin, lashes and the edge of the iris are sharp. Behind her, soft out-of-focus green and
> the pale edge of cut rock. No jewellery, no halo, no second figure, no tomb, no cross, no
> lettering.
>
> **Never.** No halo, no aureole, no rays from a head, no glowing skin except where asked for above. No crucifix, no cross, no Star of David, no menorah unless named. No Greco-Roman columns, no marble, no togas. No European faces. No cosmetics, no manicure, no watch, no ring unless named. No modern textile — no denim, no jersey knit, no machine hem, no printed pattern. No lens flare, no light shafts added for effect, no floating embers, no dust sparkles, no bokeh orbs. No text, no signage, no lettering except where named.

> **2.** Same face, same light, closer — the eyes and mouth fill the frame. Let the garden go
> to soft warm white and remove everything behind her. Keep the linen slipped back off the
> hair, keep the wet lower lid, keep the sun-lined skin. Keep the sharpness. **This is the only
> picture in the set allowed to be clear** — nothing hidden, nothing turned, nothing veiled.

---

### `og-image` — the social card

Not a new picture. Crop `hero` or `ch10-morning` to **1200 × 630**, subject left of centre,
and leave the right third quiet — that is where the link title lands.

---

## Shot map — so the set has rhythm

Ten well-lit mid-shots is still ten mid-shots. As ordered:

```
hero            wide 35     ch05-bush       medium 50     ch09-emmaus     medium 35
ch01-tomb       overhead 35 ch06-shine      close 85      ch09-charcoal   low 50
ch01-scroll     macro 135   ch07-gate       wide 24       ch10-veil-lift  wide 24
ch02-trees      medium 85   ch08-flint      macro 135     ch10-morning    close 85
ch02-storm      wide 35     ch08-veil       wide 24
ch03-mountain   wide 24
ch04-river      medium 50
```

If a reroll comes back good but the set still feels flat, change the **shot**, not the light.
The light is doing the arc.

---

## Reroll queue — what to regenerate, in order

> 🔁 **Re-ordered 2026-08-28, by looking at the files rather than at the notes about
> them.** `ch10-morning` was queued first on the claim that it "came back a modern
> studio portrait." It did not. That entry was wrong and it had been repeated into
> `content/images.js`, `README.md` and two handoffs.

| # | slot | why | severity |
|---|---|---|---|
| 1 | `ch02-trees` | **worse than previously recorded.** Golden and sunbeamed on the coldest page in the book; both figures nude rather than in fig leaves; the woman's hair is long, wavy and light auburn — Northern European, which the never-list forbids by name; there are **cut stone steps** in a garden that predates masonry; and the frame is full of **god rays**, also forbidden by name | 🔴 |
| 2 | `ch01-scroll` | letters are modern square Hebrew, eight centuries too late, under a caption calling it the oldest words | 🔴 |
| 3 | `ch06-shine` | **worse than previously recorded.** It reads as a hood or cowl rather than a flat square of cloth — and it is set in a **green deciduous forest** with visible **bokeh orbs**, where the scene is Late Bronze Age Sinai. Two things forbidden by name, in one frame | 🟠 |
| 4 | `ch01-tomb` | two periods in one frame, never distinguished | 🟠 |
| 5 | `ch03-mountain` | closer than recorded — it has the night, the fire, the crowd and the tents. Missing the **stone boundary line**, which is the chapter's hinge; the summit reads as a **volcanic eruption** with a lava plume, and Sinai's fire is not volcanic; and there is a second light source at upper left | 🟡 |
| 6 | `ch04-river` | check the far bank is empty — "Jacob was left alone" | 🟡 |
| 7 | `ch05-bush` | no flock; loses the one-man scale against ch. III | 🟡 |
| 8 | `ch10-morning` | **not a reroll for the reason previously given.** She is sun-lined, freckled, unshaped brows, no cosmetics, coarse head covering — she is right. What diverges from the brief below: it is an interior, not a garden; there is a second figure where the brief says none; she is faintly smiling where the brief says steady. Decide whether the picture beats its brief before regenerating anything | ⚪ |
| 9 | `hero` | optional; a pivot-hung door would be more right than what is there | ⚪ |

**Still needed, never generated:** `ch02-storm`, `ch07-gate`, `ch08-flint`, `ch08-veil`,
`ch09-emmaus`, `ch09-charcoal`, `ch10-veil-lift`.

## Corrections log

| date | what changed |
|---|---|
| 2026-08-28 | Added §6 — say the positive, because negation is weak. Evidence: `ch06-shine` came back with the bokeh orbs its prompt forbade by name, and `ch02-trees` with the god rays and the Northern European hair its prompt forbade by name. The never-list stays as the grading checklist; every constraint that matters now also has to appear as a positive statement in the prompt body. Re-ordered the reroll queue by looking at the files: `ch02-trees` is first, and `ch10-morning` was queued first on a claim ("a modern studio portrait") that is simply not what the picture is. |
| 2026-08-28 | Made every prompt copy-paste complete. §2's casting block and the never list were correct and never reached the generator, because they lived in a section and the prompts lived below it — the model only ever saw what was pasted. Both are now inline at the end of each `**1.**`, trimmed per slot. `ch01-tomb`, `ch01-scroll`, `ch08-flint` and `ch10-morning` already cast in-prompt and were not doubled. Nothing about the pictures themselves changed. |
| 2026-08-27 | Third pass. Added §1 (why the last set failed), §2 (the standing period/casting block and the never list), §5 (the three veils are three objects). Fixed a **reversed** `ch10-veil-lift` — Gen 24:65 has her covering, not uncovering. Rewrote `ch07-gate` from a bare hall to the east gate with its carved cherubim, per Ezek 11:23 / 43:2 and 1 Kings 6:29. Put the woven cherubim into `ch08-veil`. Removed "rough linen" from Eden, chairs from Emmaus, flames from a charcoal fire, square Hebrew from a 7th-century BC amulet, and a galleon from Jonah. |
| 2026-08-27 | Second pass. Replaced the single golden-hour opener with the per-chapter light arc. |
