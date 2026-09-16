#!/bin/sh
# Put the site's audio on Cloudflare R2 and prove every byte arrived.
#
#     sh tools/upload-audio.sh            # all twenty
#     sh tools/upload-audio.sh es/ch07    # one file
#
# The audio is NOT in git (the author, 2026-09-16: "i really dont want the sound in
# github"). audio/music/ and audio/es/ stay on this laptop, ignored, as the source for
# this script; the MAS drive holds a copy (Panim-archive/Panim-site-audio/). The site
# reads them from the bucket named in content/audio-host.js.
#
# Needs `npx wrangler login` once. Costs nothing inside R2's free tier (10 GB stored,
# 10 million reads a month; the book is 0.5 GB). Run after tools/build-spanish-audio.py.
set -e
cd "$(dirname "$0")/../audio"
BUCKET=panim-audio
PUBLIC=https://pub-b3a31d98ee8f47f291bb96a7d047a1e0.r2.dev/Panim/audio
if [ -n "$1" ]; then FILES="$1.m4a"; else FILES="$(ls music/ch*.m4a es/ch*.m4a)"; fi
bad=0
for f in $FILES; do
  npx --yes wrangler r2 object put "$BUCKET/Panim/audio/$f" --file "$PWD/$f" \
    --content-type audio/mp4 --cache-control "public, max-age=86400" --remote >/dev/null
  if [ "$(curl -s "$PUBLIC/$f?check=$$" | md5 -q)" = "$(md5 -q "$f")" ]; then
    echo "ok   $f"
  else
    echo "DIFF $f"; bad=1
  fi
done
exit $bad
