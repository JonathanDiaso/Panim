#!/bin/sh
# Cut a 1200x630 JPEG share card from each chapter's opening plate.
#
# WHY. The plates are WebP and the page shows them as WebP. Link unfurlers are not
# browsers: several of them — iMessage and the Facebook/Instagram crawler among
# them — will not render a WebP og:image and show no image at all, without an
# error. art/cards/*.jpg exists only to be the og:image for tools/gen-chapter-stubs.py.
#
# Uses sips, which ships with macOS, so there is no dependency to install. The two
# steps are deliberate: --resampleWidth scales the 1408x768 plate to 1200 wide
# (654 tall) and -c crops the centre band to 630, which is a crop rather than a
# squash. Run it, then re-run tools/gen-chapter-stubs.py.
set -e
cd "$(dirname "$0")/.."
mkdir -p art/cards
for f in ch01-tomb ch02-trees ch03-mountain ch04-river ch05-bush \
         ch06-shine ch07-gate ch08-flint ch09-emmaus ch10-morning; do
  [ -f "art/$f.webp" ] || { echo "missing art/$f.webp"; continue; }
  sips -s format jpeg -s formatOptions 78 --resampleWidth 1200 \
       "art/$f.webp" --out "art/cards/$f.jpg" >/dev/null
  sips -c 630 1200 "art/cards/$f.jpg" >/dev/null
  echo "art/cards/$f.jpg"
done
