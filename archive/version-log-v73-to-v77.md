# 🗄 VERSION LOG — v73 to v77

**Moved out of the top of `README.md`, 2026-09-16, verbatim.** All shipped. The older log is
`version-log-through-v46.md`; the round records are the `round-records-*` files beside this one.

---

**Before that: `v77`** — **The audio moved to Cloudflare R2
and out of git** — see *Where the audio lives*. `tools/upload-audio.sh` puts it there.
**Before that: `v76`** — `ASSET_V = '76'`, `panim-shell-v76`. **ES beside the moon** (`#nav-lang`,
`docs/FRONT-DOOR.md` §0.13), and **`content/audio-host.js`**, the one line that says where the
audio is served from — read by the page and by `sw.js`, ready for the move off git.
**Before that: `v75`** — **The Spanish TEXT, 2026-09-16** — choose
Spanish and the page reads in Spanish too, and the read-along follows it. Ten small files,
`content/es/chNN.json` (258 KB, ~100 KB compressed), fetched only when Spanish is chosen, so an
English reader downloads none of it. **No audio was added to git in v75.** Built by
`tools/build-spanish-text.py`; swapped in by `js/spanish-text.js`; record in `docs/FRONT-DOOR.md` §0.12.
**Before that: `v74`** — `ASSET_V = '74'`, `panim-shell-v74`. **The whole book in Spanish,
2026-09-16** — `audio/es/` (269 MB, the Spanish music edition), a door on the jacket, a sentence
and a button in the invitation, a language chip in the Listening Room, `?lang=es`. Read-along
works in both languages. Built by `tools/build-spanish-audio.py`; the front-door record is
`docs/FRONT-DOOR.md` §0.11, the audio record is `../panim-book/es/00-TTS-SETTINGS.md`.
**Before that: `v73`** — `ASSET_V = '73'`, `panim-shell-v73`. Five rounds on 2026-09-09: `v69` a
code-and-bug sweep (the roman Greek subsets were missing from the offline precache; a Web Audio
analyser was running every frame for a property nothing reads), `v70` the **deletion of the
second audio edition** — a whole code path pointing at an `audio/voice/` folder that has never
existed here — `v71` the **read-along mark, which had been invisible on 94% of the book**
since the rebuild, `v72` the **offline notice** (`js/offline.js`): the site never said the
word *offline*, so with no signal the book read perfectly and the play button was silence.
And `v73` **names Hannah at the tent without touching the manuscript**, moves the ribbon
caption and the plate titles onto Literata's display optical size, and gives the five-minute
card a memory.
🗄 All five are `archive/round-records-v69-to-v73.md`. The running log of what each version
changed is `archive/version-log-through-v46.md`; the older round records are
`archive/round-records-v57-to-v60.md` and `archive/round-records-v61-to-v67.md`; what the
front door does *now* is `docs/FRONT-DOOR.md`; and every decision ever answered is
`archive/decisions-answered-through-v73.md`.
