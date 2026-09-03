#!/usr/bin/env python3
"""Build the Now Playing / lock-screen covers — one per chapter, roman numeral burned in.

Why this exists, and why the numeral is IN the image rather than in the metadata:

iOS draws the Dynamic Island's compact pill itself. A web page gets exactly one
pixel budget there — the artwork thumbnail — and no text at all. MediaMetadata.title
("VII. The Glory Backs Out") only surfaces in the EXPANDED island, the lock screen and
Control Center. So for the chapter number to be visible in the pill the author actually
looks at, it has to be painted onto the plate.

The crop matters as much as the numeral. The full 1024 square is a wide desert with a
small head in it; at 96px that reads as a beige smudge. CROP zooms to the veil so the
face fills the thumbnail. Measured, not guessed — compare tiers at 96px before changing it.

Source: art/cover-moses-1024.jpg (MOSES NEW.jpg, 1024x1024).
Output: art/np-chNN-{96,256,512}.jpg, consumed by js/player.js updateMediaSession().

Run from Panim-site/:  python3 tools/gen-nowplaying.py
"""
import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(HERE, 'art', 'cover-moses-1024.jpg')
ART = os.path.join(HERE, 'art')

S = 1024
# Zoom on the veil. Left/top/right/bottom in source pixels; square, or the plate skews.
CROP = (168, 60, 888, 780)
TIERS = (512, 256, 96)
ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

# Georgia Bold, not Didot or Baskerville: at 96px the high-contrast faces lose their
# hairlines entirely and "VIII" turns into a picket fence. Sturdy slabs survive.
FONT = '/System/Library/Fonts/Supplemental/Georgia Bold.ttf'
CREAM = (240, 236, 226)          # the site's #EDE9DF, a shade brighter to hold at 96px
CAP_FRAC = 0.15                  # numeral cap height as a fraction of the plate
BASELINE = 0.92                  # baseline position, top-down
SCRIM_START, SCRIM_ALPHA = 0.62, 150


def scrim(img):
    """Darken the bottom so cream type holds over the sunlit robe. Eased, not linear —
    a linear ramp leaves a visible horizontal seam where it starts."""
    mask = Image.new('L', (S, S), 0)
    d = ImageDraw.Draw(mask)
    for y in range(S):
        t = (y / S - SCRIM_START) / (1 - SCRIM_START)
        d.line([(0, y), (S, y)], fill=0 if t < 0 else int(SCRIM_ALPHA * (t ** 1.6)))
    return Image.composite(Image.new('RGB', (S, S), (0, 0, 0)), img, mask)


def fit_font(draw, text):
    """Grow the point size until the cap height hits CAP_FRAC. Point size is not cap
    height and the ratio differs per glyph string, so measure rather than assume."""
    size = 10
    while True:
        f = ImageFont.truetype(FONT, size)
        bb = draw.textbbox((0, 0), text, font=f)
        if bb[3] - bb[1] >= S * CAP_FRAC:
            return f
        size += 4


def plate(numeral, base):
    img = scrim(base.copy())
    d = ImageDraw.Draw(img)
    f = fit_font(d, numeral)
    bb = d.textbbox((0, 0), numeral, font=f)
    w, h = bb[2] - bb[0], bb[3] - bb[1]
    x, y = (S - w) // 2 - bb[0], int(S * BASELINE) - h - bb[1]
    # Offset black passes, not a blur: PIL's blur on a 1024 plate costs more than it buys
    # and the numeral only has to clear a scrim it is already sitting on.
    for ox, oy in ((0, 5), (4, 4), (-4, 4), (4, -3), (-4, -3)):
        d.text((x + ox, y + oy), numeral, font=f, fill=(0, 0, 0))
    d.text((x, y), numeral, font=f, fill=CREAM)
    return img


def main():
    base = Image.open(SRC).crop(CROP).resize((S, S), Image.LANCZOS)
    for n in range(1, 11):
        p = plate(ROMAN[n], base)
        for t in TIERS:
            out = os.path.join(ART, 'np-ch%02d-%d.jpg' % (n, t))
            p.resize((t, t), Image.LANCZOS).save(out, quality=88, optimize=True, progressive=False)
    print('wrote %d plates (%d chapters x %d tiers)' % (10 * len(TIERS), 10, len(TIERS)))


if __name__ == '__main__':
    main()
