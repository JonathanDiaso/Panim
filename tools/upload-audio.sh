#!/bin/sh
# Put the site's audio on Cloudflare R2 and prove every byte arrived.
#
#     sh tools/upload-audio.sh            # whatever changed since the last run
#     sh tools/upload-audio.sh --all      # re-upload and re-verify all twenty
#     sh tools/upload-audio.sh es/ch07    # one file
#
# The audio is NOT in git (the author, 2026-09-16: "i really dont want the sound in
# github"). audio/music/ and audio/es/ stay on this laptop, ignored, as the source for
# this script; the MAS drive holds a copy (Panim-archive/Panim-site-audio/). The site
# reads them from the bucket named in content/audio-host.js.
#
# ONLY WHAT CHANGED GOES UP. Re-cutting the English tape used to re-upload the ten
# Spanish chapters as well -- half a gigabyte of bytes identical to the ones already in
# the bucket -- because this script's default was "all twenty" and nothing here knew
# which files had moved. LEDGER records the md5 of every file this script has verified
# in the bucket; a file whose md5 still matches its line is skipped without touching
# the network. Delete the ledger, or pass --all, to force a full re-upload and re-check.
#
# Needs `npx wrangler login` once. Costs nothing inside R2's free tier (10 GB stored,
# 10 million reads a month; the book is 0.5 GB). Run after tools/build-spanish-audio.py.
set -e
cd "$(dirname "$0")/../audio"
BUCKET=panim-audio
PUBLIC=https://pub-b3a31d98ee8f47f291bb96a7d047a1e0.r2.dev/Panim/audio
LEDGER=.uploaded.md5
ALL=""
case "$1" in
  --all|-a) ALL=1; shift ;;
esac
if [ -n "$1" ]; then FILES="$1.m4a"; else FILES="$(ls music/ch*.m4a es/ch*.m4a)"; fi
[ -f "$LEDGER" ] || : > "$LEDGER"
bad=0
for f in $FILES; do
  have="$(md5 -q "$f")"
  if [ -z "$ALL" ] && grep -qx "$have  $f" "$LEDGER"; then
    echo "same $f"
    continue
  fi
  npx --yes wrangler r2 object put "$BUCKET/Panim/audio/$f" --file "$PWD/$f" \
    --content-type audio/mp4 --cache-control "public, max-age=86400" --remote >/dev/null
  if [ "$(curl -s "$PUBLIC/$f?check=$$" | md5 -q)" = "$have" ]; then
    echo "ok   $f"
    grep -v "  $f\$" "$LEDGER" > "$LEDGER.tmp" || :
    mv "$LEDGER.tmp" "$LEDGER"
    echo "$have  $f" >> "$LEDGER"
  else
    echo "DIFF $f"; bad=1
    grep -v "  $f\$" "$LEDGER" > "$LEDGER.tmp" || :
    mv "$LEDGER.tmp" "$LEDGER"
  fi
done
exit $bad
