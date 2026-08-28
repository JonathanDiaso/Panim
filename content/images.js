// PANIM_IMAGES — author image manifest (11-website-plan.md §10).
// Empty slots (null) render NOTHING (changed 2026-08-28 — they used to draw a frame
// with the words "Image forthcoming" in it, on a published page). A chapter whose
// FIRST slot is filled gets that photo as its opening plate (render.js).
// Adding an image is a one-line edit:
//   { src: "art/ch01-tomb.webp", alt: "descriptive alt text", caption: "optional caption" }

window.PANIM_IMAGES = {
  "hero": {
    src: "art/hero.webp",
    alt: "A heavy ancient wooden door standing ajar in a dark stone room, warm golden light pouring through the gap, dust drifting in the beam."
  },
  // Replaced 2026-08-27 with the author's ch1 frame. The previous plate put a medieval
  // metal-bound CODEX, a compass, a brush and a photographic scale bar in a 600 BC
  // burial chamber. This one is the chamber: rock-cut shelf, oil lamps, broken pottery,
  // and nothing in it that had not been invented yet. The scrolls stay unseen here and
  // arrive on the next plate (ch01-scroll), which is also the order the chapter tells it
  // in. Superseded frame in art/archive/superseded-2026-08-27/.
  // ✅ REPLACED 2026-08-28 (round five) and the fault is fixed. The previous frame had a
  // grown man's bare wrist and nothing in it said 1979, so the collision the plate exists
  // for never happened. This one has the 1970s khaki cotton drill cuff, buttoned and
  // frayed, on a smaller hand chalked with limestone dust — AND it adds the bone
  // repository the old frame was missing entirely, with the pinched-spout lamps lying
  // among the bones rather than arranged on a shelf. Superseded frame on the T7 at
  // site-art-2026-08-28/superseded-2026-08-28-round-five/.
  "ch01-tomb": {
    src: "art/ch01-tomb.webp",
    alt: "Looking down through a break in a stone floor into a burial chamber: a young hand in a frayed 1970s cuff, white with limestone dust, grips the jagged edge, and below it a shaft of daylight falls across a repository of bones scattered with small clay oil lamps.",
    caption: "Chamber 25.",
    ref: "Ketef Hinnom, Jerusalem · 1979"
  },
  // ✅ REPLACED AGAIN 2026-08-28 (round six) — BOTH round-five flags are now resolved.
  // Round five fixed the falsifiable error (modern square Hebrew under a caption calling it
  // the oldest words we have) but left two style faults: the cuts GLOWED warm gold from
  // inside, and the object read as charred wood rather than as silver. This frame fixes
  // both. The surface is now blackened, oxidised METAL with bright silver where the roll is
  // abraded, and the letters are lit by a low RAKING light catching the cut edges — no glow
  // from within. Letterforms stay angular and incised: no square blocks, no crowns, no
  // vowel points. This is what round five asked for as option B.
  // Remaining nit, not worth a reroll: a few glyphs read as generic angular marks rather
  // than strictly palaeo-Hebrew. Not falsifiable at plate size.
  // Superseded frame archived at site-art-2026-08-28/superseded-2026-08-28-round-six/.
  "ch01-scroll": {
    src: "art/ch01-scroll.webp",
    alt: "Extreme close-up of a small rolled strip of tarnished silver resting on an open palm, blackened with age and bright where it is worn, angular letters incised into the metal and catching a low raking light along their cut edges.",
    caption: "The oldest words we have.",
    ref: "Numbers 6:24–26 · c. 600 BC"
  },
  // 🟠 PARTLY REPLACED 2026-08-28 (round five). STILL ON THE REROLL LIST — read this.
  // The author supplied two versions of the same frame, a 1376x768 and a 1952x544
  // panorama. The 1376 is the one wired here: at 3.59:1 the panorama is outside the
  // shape the page crops to, and the site centres its subject, so the wide one loses
  // its own composition on a plate.
  // FIXED versus the previous frame: they are CLOTHED in stitched leaves (Gen 3:7), and
  // the CUT STONE STEPS are gone.
  // STILL WRONG, which is why it stays on the list:
  //   1. The light is warm golden hour. Chapter II is the COLDEST page in the book —
  //      dusk, twenty minutes after sundown, no warmth left. This is the single biggest
  //      miss and it is unchanged.
  //   2. GOD RAYS through the trees, still forbidden by name and still delivered.
  //   3. Her hair is long, wavy and light auburn — still Northern European.
  //   4. NEW: they are no longer HIDING. The caption is "they hid themselves ... among
  //      the trees" and this frame has them kneeling and standing in the open. The old
  //      frame at least had them pressed behind trunks.
  // Net: two faults fixed, one introduced. Wired because it is the better picture, but
  // it is not final. See art/PROMPTS.md `ch02-trees`.
  "ch02-trees": {
    src: "art/ch02-trees.webp",
    alt: "A wooded garden in low light; two figures covered in large stitched leaves stand and kneel among mossy trunks and exposed roots, faces turned down and away.",
    caption: "And they hid themselves from the face of the LORD God among the trees.",
    ref: "Genesis 3:8"
  },
  // ✅ REPLACED 2026-08-28 (round five). THE WORST FRAME IN THE SET IS GONE.
  // The previous plate was a VIKING LONGSHIP — dragon-head prow, Norse knotwork, an
  // axe-blade sternpost, a fair-haired crew, and painted rather than photographic.
  // This one is right where it counts: ONE mast, one square sail brailed on a horizontal
  // yard, a plain undecorated hull, and both stem and stern ending in bare upcurved posts
  // with no figurehead, no animal head, no blade and no knotwork. No crew, cold blue-white
  // storm light only. Describing the hull piece by piece as a POSITIVE — rather than
  // forbidding the longship by name — is what moved it; that is art/PROMPTS.md §6 working.
  // Minor, not worth a reroll: the cargo jars going over the side are not in frame, and
  // the hull is narrower than a tubby Phoenician trader really was.
  "ch02-storm": {
    src: "art/ch02-storm.webp",
    alt: "A single-masted open ship with a furled square sail rides a heavy sea at night under rain and lightning, a wave lifting under the hull, the whole boat a dark shape against one cold break of light in the cloud.",
    caption: "The LORD hurled a great wind onto the sea.",
    ref: "Jonah 1:4"
  },
  // ✅ REPLACED 2026-08-28 (round five). Both faults fixed, and the chapter's hinge is now
  // IN the picture: a low line of piled stones runs the full width of the frame, with the
  // whole crowd standing behind it — "they stood far off" across a line nobody crossed.
  // The volcano is also gone: the fire and smoke now stand OVER an intact rock summit,
  // with no crater, no vent and no lava running down.
  // ⚠️ One deliberate departure from the brief, kept because it is better: the crowd is
  // CLOSE and large in frame — individual backs of heads across the bottom — where the
  // brief asked for a distant dark band. It puts the reader inside the crowd rather than
  // watching it, which is what Exodus 20:19 is about. Flagged, not filed as a fault.
  "ch03-mountain": {
    src: "art/ch03-mountain.webp",
    alt: "A mountain at night with fire and smoke standing over its summit under lightning; a low line of piled stones runs across the plain below, and a crowd of robed figures stands behind it with their backs to us, facing the fire and not moving closer.",
    caption: "Speak to us yourself, and we will listen; but let not God speak to us.",
    ref: "Exodus 20:19"
  },
  // Replaced 2026-08-27 with the author's Ch4River frame. The previous plate had ONE
  // figure alone in the water, under a caption about seeing God face to face — the
  // wrestling match the chapter turns on was not in the picture. Superseded frame in
  // art/archive/superseded-2026-08-27/.
  "ch04-river": {
    src: "art/ch04-river.webp",
    alt: "Two men locked together and straining against each other in the shallows of a dark river at night, water thrown up around their legs, one break of pale light in the cloud behind. Neither face is visible.",
    caption: "I have seen God face to face, yet my life has been preserved.",
    ref: "Genesis 32:30 · Peniel"
  },
  // Replaced 2026-08-27 with the author's ch5Bush frame. The previous plate was from the
  // superseded golden-hour direction (see art/archive/PROMPTS-v2-golden-hour-superseded);
  // this one is night, which is where chapter V sits on the dawn arc. Superseded frame
  // in art/archive/superseded-2026-08-27/.
  // 🟡 CORRECTION 2026-08-28: the standing note said "no flock." THE FLOCK IS THERE —
  // five fat-tailed sheep at the edge of the firelight, plus the sandals and the staff.
  // What is actually off is smaller: the branches inside the flame read as burning wood
  // rather than green and unconsumed, which is the miracle the plate exists for, and the
  // whole frame is HDR-saturated. Low priority.
  "ch05-bush": {
    src: "art/ch05-bush.webp",
    alt: "A desert bush burning fiercely on bare rock at night under a field of stars, unconsumed, a shepherd's staff and a pair of worn sandals set down on the stone in front of it and a small flock standing off in the dark to one side.",
    caption: "Then Moses hid his face, for he was afraid to look at God.",
    ref: "Exodus 3:6"
  },
  // ✅ REPLACED 2026-08-28 (round five). All three named faults fixed at once, which is
  // the best evidence yet for art/PROMPTS.md §6:
  //   1. The GREEN DECIDUOUS FOREST is gone — it is open desert, bare rock and dust
  //      running flat to a far ridge, with no leaf anywhere in the frame.
  //   2. The BOKEH ORBS are gone. The air is clear and still.
  //   3. The HOOD is gone. It is now the masveh: one flat rectangular panel of loose
  //      undyed weave laid over the face, corners visible, frayed edges, tucked at the
  //      temples, hanging free of the jaw — with his hair and shoulders UNCOVERED above
  //      and around it, which is what makes it read as a piece of household cloth
  //      someone picked up rather than as a garment.
  // ⚠️ Two things for the author to judge, neither urgent: the shape of his features is
  // faintly readable through the weave, where the brief asks for none; and his forehead
  // reads fair rather than deep olive-brown, which is a casting question at eighty under
  // a blown-out backlight.
  "ch06-shine": {
    src: "art/ch06-shine.webp",
    alt: "An old man stands in open desert with the low sun directly behind him; a flat square of loosely woven undyed cloth is laid over his face and tucked at the temples, its frayed edges lit like filament, his grey hair and beard visible above and below it.",
    caption: "The word Hebrew had to mint for that piece of cloth, and never used again.",
    ref: "masveh · Exodus 34:33"
  },
  // ✅ FILLED 2026-08-28 (round seven). This was the LAST EMPTY SLOT ON THE SITE — chapter
  // VII had no plate at all across six rounds. Every chapter now has one.
  // What the prompt asked for and got: the east gate seen from INSIDE the court, standing
  // wide open onto the ridge beyond; a deep recessed passage of dressed ashlar with flat
  // lintels — no arch, no vault, no rib anywhere; cedar-panelled jambs carved in low relief
  // with CHERUBIM AND PALM TREES ALTERNATING, which is 1 Kings 6:29 exactly, the gold gone
  // to tarnish rather than gleaming; the passage COMPLETELY EMPTY, no priest, no guard, no
  // figure; and the thread of altar smoke still going up at the left edge, which is the other
  // half of the chapter — "there is no earthquake the morning the glory leaves. The priests
  // keep the schedule, the smoke goes up on time."
  // Three things noted and accepted, none of them falsifiable at plate size:
  //   1. It is NOT the overcast the prompt asked for. There is blue sky and hard directional
  //      sun throwing sharp shadows across the foreground. Left as delivered: an ordinary
  //      bright morning arguably serves "nobody noticed" better than a portentous grey one.
  //   2. COLUMNS were on the never-list and the far colonnade at left has square piers, with
  //      a low balustrade of turned balusters below them — a post-classical form and the one
  //      genuinely anachronistic object in the frame. Small, distant, in shadow.
  //   3. The cherubim read Byzantine-angelic — human, feathered, frontal, hands folded —
  //      rather than the composite ANE creature. Same fault accepted on ch08-veil. The load
  //      this plate has to carry is that the carving is PRESENT and WORN, and it is.
  // Source frame on the drive at site-art-2026-08-28/incoming-round-seven-2026-08-28/.
  "ch07-gate": {
    src: "art/ch07-gate.webp",
    alt: "Looking out through the open east gate of a temple courtyard: a deep passage of dressed limestone with flat lintels, its cedar jambs carved in worn low relief with winged figures and palm trees alternating, the doors standing wide, nobody in the passage, a bare terraced ridge beyond, and a single thread of altar smoke rising at the left edge.",
    caption: "No earthquake. The smoke goes up on time.",
    ref: "The east gate · Ezekiel 11:23"
  },
  // 🟡 Graded 2026-08-28 (also previously listed as "never generated" — it was).
  // Handsome and correctly dark, but THE EYES ARE DOWNCAST, which reads as resignation —
  // the opposite of "I have set My face like flint," which is a decision already made and
  // a man looking where he is going. The rim light is also warm gold rather than the
  // grey-brown of struck flint, and the background is soft foliage rather than storm.
  // Usable; reroll when convenient.
  "ch08-flint": {
    src: "art/ch08-flint.webp",
    alt: "A bearded man's profile turned hard to one side against a storm-dark sky, one low red-brown light tracing the nose and jaw, the rest near black. The expression is not anguish; it is a decision already made.",
    caption: "Therefore I have set My face like flint.",
    ref: "Isaiah 50:7"
  },
  // ✅ REPLACED 2026-08-28 (round six) — this was THE WORST FRAME ON THE SITE and both
  // faults are fixed. The Gothic cathedral is gone: the cloth now hangs in plain massive
  // dressed limestone with flat lintels, no pointed arches, no ribs, no piers, no marble.
  // And THE CHERUBIM ARE IN THE CLOTH — large winged frontal figures woven into the weave
  // and repeated across the whole surface, with the tear running down THROUGH them and
  // splitting one in half. That is the thing chapter VIII spends four paragraphs on, and
  // the plate can now say what the chapter says. Blue, purple and scarlet per Exodus 26:31,
  // torn from the top downward, threads snapping and lighting up as they part.
  // Two things noted and accepted, neither falsifiable:
  //   1. The cherubim faces read Byzantine-angelic — soft, frontal, haloed — rather than as
  //      the composite ANE creature. They are unmistakably woven figures, which is the load
  //      the plate has to carry.
  //   2. The stone jambs step inward toward the top, which can suggest a corbelled arch.
  //      No vaulting, no ribs, no piers — it does not read as a cathedral.
  // Superseded frame archived at site-art-2026-08-28/superseded-2026-08-28-round-six/.
  "ch08-veil": {
    src: "art/ch08-veil.webp",
    alt: "A colossal woven temple curtain in blue, purple and scarlet with large winged cherubim worked into the weave and repeated across it, split from the top downward through one of the figures, hard white light bursting through the tear and individual threads snapping and lighting up as they part.",
    caption: "Torn in two from top to bottom — from the other side.",
    ref: "parochet · Matthew 27:51"
  },
  // ✅ REPLACED 2026-08-28 (round six) — the one fault that mattered is gone. The previous
  // frame had OPEN ORANGE FLAMES standing above the fire; anthrakia is a CHARCOAL fire and
  // the flamelessness is the point the chapter turns on. This frame is completely flameless:
  // a low flat bed of burnt lumps, matte black and ash-white outside, glowing deep red only
  // DOWN INSIDE the cracks, with nothing rising above the stones. The shore is also now
  // BLACK BASALT rather than grey pebble, with dark wet sand between the stones, and the
  // low blue-grey smoke drifts sideways and backlights into a sheet across the frame.
  // Fish and one flat loaf lie directly on the coals. Cold flat Galilee behind.
  // Rewriting the never-list as a positive description ("glowing cracks only, nothing
  // rising") is what finally worked — another data point for art/PROMPTS.md §6.
  // Not delivered, not worth a reroll: the bare footprints leading to the fire and stopping.
  // NOTE ON SHAPE: the author's original is 1584x672 (2.36:1), wider than the house 1408x768.
  // It was cropped to 1232x672 with the fire biased to ~0.58 of the width so it survives the
  // 4:3 centre crop the plate takes on a phone, then resized to 1408x768. Original on the drive.
  "ch09-charcoal": {
    src: "art/ch09-charcoal.webp",
    alt: "A small flameless charcoal fire on a shore of black basalt stones at first light, two fish and a flat round loaf laid on the coals, deep red glowing only in the cracks between them, low smoke drifting sideways and backlit into a thin sheet, cold grey sea and hills behind.",
    caption: "The word burns in only two places: a courtyard, and this beach.",
    ref: "anthrakia · John 21:9"
  },
  // ✅ REPLACED 2026-08-28 (round six) — the stool is gone and the floor seating arrived.
  // The previous frame had a WOODEN STOOL at frame right and a table at dining height, which
  // is a nineteenth-century dining room in a first-century village house: Luke's verb is
  // *reclined*. This frame has no stool, no chair, no seat of any kind. In their place, at
  // floor level, are the woven reed mat and the long undyed bolster with the hollow of
  // someone still in it — the only seating in the room, which is the whole point.
  // Everything that was already right is kept: dim dry-stone room, one small unglazed
  // window at first light, the torn loaf, the clay cup, the lamp and the thin smoke line
  // from a wick just gone out.
  // Noted, accepted: the table is low but not the "barely a foot off the floor" the brief
  // asks for. It reads as a low table, not a dining table, so it is not worth a reroll.
  // Superseded frame archived at site-art-2026-08-28/superseded-2026-08-28-round-six/.
  "ch09-emmaus": {
    src: "art/ch09-emmaus.webp",
    alt: "A low table in a dim stone room lit by one small window at first light: a round loaf torn in half, a clay cup, and a thin line of smoke still rising from a wick just gone out. On the floor beside it a reed mat and a long bolster cushion with the hollow of someone still in it. No one is there.",
    caption: "Then their eyes were opened and they recognized Him.",
    ref: "Luke 24:31 · Emmaus"
  },
  // ✅ NEW 2026-08-28 (round five) — this slot rendered NOTHING until today.
  // It is also the one plate the old sheet had backwards. Genesis 24:65 is "she took her
  // veil and covered herself," and chapter X builds a page on exactly that: "No bride
  // lifts her own veil; she wears it until the groom reaches out and raises it himself."
  // An earlier prompt asked for a woman who had LIFTED the veil away, which would have
  // printed a contradiction of the text under its own caption.
  // This frame has it right: her hand is raised and the sheer cloth is moving ACROSS her
  // face, being put on, not taken off. The other half of the chapter is the doubling —
  // he lifts his eyes and sees, then she lifts her eyes and sees — and the picture carries
  // it: he is far off across the field walking toward her, and their two long shadows
  // reach toward each other over the grass. Neither face is readable, which is the rule
  // until ch10-morning.
  // At 1536x1024 this is the only plate in the set that is a true 3:2.
  "ch10-veil-lift": {
    src: "art/ch10-veil-lift.webp",
    alt: "Low evening sun over a dry field: a woman sits side-on atop a kneeling camel and draws a sheer veil across her face with one raised hand, while far off across the field a lone man walks toward her, their shadows stretching toward each other.",
    caption: "She took her veil and covered herself.",
    ref: "Genesis 24:65"
  },
  // ⚠️ THE "MODERN STUDIO PORTRAIT" NOTE ON THIS PLATE WAS WRONG — corrected 2026-08-28
  // after looking at the file rather than at the note about it. She is sun-lined and
  // freckled, brows unshaped, no cosmetics, head covered in coarse undyed cloth, and
  // she is plainly not a 2020s portrait. Three things DO diverge from art/PROMPTS.md:
  // it is an interior with a window, not the garden the brief asks for; there is a
  // second figure (a blurred bearded man in a pale robe, his hand on her cheek) where
  // the brief says none; and she is faintly smiling where the brief says steady, not
  // smiling. Whether those are faults is an editorial call, not an error — the picture
  // may be better than its brief. It is still 1408×768, which is the real problem.
  "ch10-morning": {
    src: "art/ch10-morning.webp",
    alt: "Full morning light on a woman's face, eyes open and calm, tears at the edge of joy, a hand resting against her cheek. The first full face of the book.",
    caption: "Face to face.",
    ref: "John 14:9 · Song of Songs 2:14"
  },
  // The social card is NOT a plate and does not render in the page, so this stays null.
  // It was cut 2026-08-28 from ch10-morning (centre crop to 1200x630) and lives at the
  // site root as og-card-face.jpg, wired into index.html, sw.js and js/player.js.
  // If it is ever recut, THE FILENAME MUST CHANGE — platforms cache og:image hard by URL.
  "og-image": null
};
