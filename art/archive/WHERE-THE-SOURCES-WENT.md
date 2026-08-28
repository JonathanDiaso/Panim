# The source images live on the T7, not in this repo

**Moved 2026-08-28.** Three folders left this repository:

| folder | size | what it held |
|---|---|---|
| `art/incoming/` | 24 MB | 31 candidate frames the author dropped in, named descriptively |
| `art/originals/` | 9.2 MB | the pre-WebP sources for every published plate |
| `art/archive/superseded-2026-08-27/` | 3.6 MB | the frames three plates replaced |

**They are on the T7 at `/Volumes/MAS/Panim-archive/site-art-2026-08-28/`,** in those
same three folders, and every one of the 47 files was verified by MD5 against its
original before anything was removed here. Nothing was deleted — the standing rule on
this project is archive, never delete, and git still holds every one of them in history.

## Why

None of the 37 MB was ever served to a reader. It was published to a public GitHub
Pages site and, worse, it was compounding: git keeps a permanent full copy of every
version of every file it has ever seen. The `.git` directory stood at **254 MB** with
229 MB of that being the audio, which *is* the product and stays. The rest was not.

**This does not shrink the existing history** — the old blobs are still in the pack, and
rewriting published history to remove them is not worth it. What it does is stop the
part of the repo that is not the product from growing every time a new candidate frame
is dropped in.

## The rule from here

Author drops go to `/Volumes/MAS/Panim-archive/site-art-<date>/incoming/`, not into the
site. When a frame is chosen, convert it to WebP, wire it into `content/images.js`, and
commit **only the WebP** — which is the file a reader actually downloads.

The published plates in `art/*.webp` are tracked and always will be. If one ever
disappears, `git checkout -- art/<name>.webp` brings it back.

---

## Round five, 2026-08-28 — two more folders

The author dropped nine new frames into `art/` and `art/"Possible art options"/`. They
followed the rule below: converted to WebP, wired in, and the sources moved off.

| folder on the T7 | what it holds |
|---|---|
| `site-art-2026-08-28/incoming-round-five-2026-08-28/` | the nine originals as supplied — 9.4 MB of JPEG/PNG, including **both** `ch02-trees` crops and `ShinePossible Cover.jpeg`, which has no slot on the site and is held as a cover candidate |
| `site-art-2026-08-28/superseded-2026-08-28-round-five/` | the six plates they replaced |

All fifteen files MD5-verified in both directions before anything was removed from
`art/`, which is back to **2.1 MB**.

**Six plates replaced and one empty slot filled:** `ch01-tomb`, `ch01-scroll`,
`ch02-storm`, `ch02-trees`, `ch03-mountain`, `ch06-shine`, and `ch10-veil-lift` — which
had rendered nothing until that day.

⚠️ **`Ch2TreesLong.jpeg` is on the T7 and is NOT wired.** It is a 1952x544 panorama
(3.59:1) of the same scene as the frame that is wired. At that ratio it falls outside
the shape a plate crops to, and the site centres its subject, so the wide version loses
its own composition on the page. Kept because the author may want it for something else.

**Superseded site assets go the same way.** The previous favicon (the small mark that the
Hebrew **פ** replaced) and the previous share card (the tomb, which the chapter X face
replaced) are at `site-art-2026-08-28/site-assets-superseded-2026-08-28/`. Neither is kept
in the repo: both are still in git history, and the old share card is additionally still
live at `og-card.jpg` on purpose, so links already unfurled with it do not break.
