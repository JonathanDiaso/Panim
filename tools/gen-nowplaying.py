#!/usr/bin/env python3
"""Build the Now Playing / lock-screen covers — one square plate per chapter, three tiers.

WHAT THESE ARE. iOS draws the Dynamic Island's compact pill itself: artwork on the left,
its own waveform on the right, and no text slot at any point. metadata.title is set and
correct, but it only surfaces in the EXPANDED island, on the lock screen, and in Control
Center. So the artwork is the entire pixel budget a web page gets in the pill.

🛑 NO TEXT ON THE PLATE. A previous pass (v48) burned a roman numeral into every cover to
fill that gap. The author's instruction is that the photographs carry nothing printed on
them, and it stands even where the system gives text nowhere else to go. The number lives
in metadata.title ("VII. The Glory Backs Out"), which is where the system will show it.

Sources are art/np-src/chNN.jpg, already 1:1 and composed as squares by the author, so
the default is a straight resize with NO crop. CROPS below is the exception list, and each
entry is there because the plate was measured at 96px and failed:
  ch06 — a wide sunrise with a small head in it; at 96px it read as a beige smudge.
  ch09 — the charcoal fire sat small in a beach landscape; the bread vanished.
Do not add a crop by eye. Render the tier, look at it at 96px, then decide.

Output: art/np-chNN-{96,256,512}.jpg, consumed by js/player.js artworkFor().
Three tiers because Android's notification shade, Auto, Wear and Bluetooth head units each
pick by size, and a single entry makes all of them rescale one file.

Run from Panim-site/:  python3 tools/gen-nowplaying.py
"""
import os
from PIL import Image

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ART = os.path.join(HERE, 'art')
SRC = os.path.join(ART, 'np-src')

S = 1024
TIERS = (512, 256, 96)

# Chapter -> source stem in art/np-src/. Chapters absent from this map fall back to
# FALLBACK and are listed as outstanding in README.md.
SOURCES = {
    1: 'ch01',   # the Ketef Hinnom chamber — a hand on the incised stone
    2: 'ch02',   # the garden, and the two of them among the trees
    3: 'ch03',   # Sinai burning, the camp standing far off with its back turned
    4: 'ch04',   # the Jabbok, two figures locked in the shallows
    5: 'ch05',   # the bush alight, sandals off on the rock
    6: 'ch06',   # the veiled face against the sunrise
    9: 'ch09',   # the charcoal fire on the shore, bread on the coals
    10: 'ch10',  # her face, and the hand that turned it
}
FALLBACK = 'ch06'          # ch07 (Ezekiel) and ch08 (the Transfiguration) have no plate yet
CROPS = {6: (168, 60, 888, 780), 9: (230, 370, 850, 990)}


def main():
    missing = []
    for n in range(1, 11):
        stem = SOURCES.get(n)
        if stem is None:
            stem, missing = FALLBACK, missing + [n]
        path = os.path.join(SRC, stem + '.jpg')
        im = Image.open(path).convert('RGB')
        box = CROPS.get(n if stem != FALLBACK or n in SOURCES else 6)
        if box:
            im = im.crop(box)
        if im.width != im.height:
            raise SystemExit('%s is %dx%d — plates must be square' % (path, im.width, im.height))
        im = im.resize((S, S), Image.LANCZOS)
        for t in TIERS:
            im.resize((t, t), Image.LANCZOS).save(
                os.path.join(ART, 'np-ch%02d-%d.jpg' % (n, t)), quality=88, optimize=True)
    print('wrote %d plates for 10 chapters' % (10 * len(TIERS)))
    if missing:
        print('placeholder (using %s): %s' % (FALLBACK, ', '.join('ch%02d' % n for n in missing)))


if __name__ == '__main__':
    main()
