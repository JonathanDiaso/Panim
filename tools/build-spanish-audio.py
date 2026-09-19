#!/usr/bin/env python3
"""The Spanish edition, onto the site: audio, run times, and read-along cues.

    python3 tools/build-spanish-audio.py              # everything
    python3 tools/build-spanish-audio.py --no-encode  # manifest + cues only

Reads the finished Spanish editions that ~/Panim/panim-book/scripts/es_assemble.py,
es_master.py and ~/Panim-audio/scripts/introoutro.py build (the record is
panim-book/es/00-TTS-SETTINGS.md) and writes three things here:

  audio/es/chNN.m4a              the music edition, AAC ~96 kbps mono, the same
                                 encode the English files have (afconvert)
  content/audio-manifest-es.js   window.PANIM_AUDIO_ES — run times, sizes, the
                                 Spanish chapter titles, the music offset
  cues/es/chNN.json              [{t, id}] on the Spanish VOICE timeline, keyed by
                                 the ENGLISH block ids in content/chapters.js

🛑 THE CUES CARRY ENGLISH IDS ON PURPOSE. The page shows the English text. The
Spanish manuscript was translated paragraph for paragraph (measured: seven of ten
chapters have an identical block sequence, and the other three differ only where
the English builder does not recognise a Spanish citation, plus one bridge line the
translation adds in chapter 2), so "the paragraph being read" is the same paragraph
in both languages. With these cues, Follow, tap-to-listen and every English
timestamp on the site (deep links, the five-minute card, a saved place) work in
Spanish by going through the paragraph id.

The times come from the character timings ElevenLabs returned, which es_assemble.py
shifts through every trim and every pause it opens — so they are exact, not an
alignment guess. es_master.py changes loudness only, never length; this script
checks that.

Nothing here costs anything. Run it after every Spanish rebuild, and then
`sh tools/upload-audio.sh` — the site plays the audio from Cloudflare R2, not from
this folder, and audio/ is not in git.
"""

import argparse
import difflib
import html
import importlib.util
import json
import os
import re
import subprocess
import sys
import tempfile
import unicodedata
import wave

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOME = os.path.expanduser("~")
ES_BOOK = os.path.join(HOME, "Panim/panim-book/es/chapters")
ASSEMBLED = os.path.join(HOME, "Panim-audio/es/1-assembled")
VOICE = os.path.join(HOME, "Panim-audio/es/2-voice-final")
MUSIC = os.path.join(HOME, "Panim-audio/es/3-music")

MUSIC_OFFSET = 6.0            # introoutro.py LEAD_IN, same as the English
BITRATE = 96000               # the English files measure 97-99 kbps

# The five-minute card on the front page is a passage of chapter VII that ends on
# "He answered it wet" (ch07-p166; p170 before the 2026-09-19 ch 7 cut). A reader has heard it through when the NEXT
# block starts. js/player.js holds the English number; the Spanish one is read off
# the Spanish cues here, by id, so the two can never disagree about which line.
DOOR_CHAPTER, DOOR_NEXT_ID = "ch07", "ch07-p167"

# A Spanish line that is nothing but a scripture reference. The English builder's
# CITATION is ASCII-only and English-named, so "Génesis 1:2." parses as prose there.
ES_CITATION = re.compile(
    r"\*?((?:[1-3] )?[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÑáéíóúñü]+"
    r"(?: (?:de|de los|del) [A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÑáéíóúñü]+)?"
    r"(?: [A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÑáéíóúñü]+)? \d+:\d+"
    r"(?:\s*[–—-]\s*\d+(?::\d+)?)?(?:, ?\d+(?::\d+)?)*"
    r"(?: \([A-Z0-9 ]+\))?)\.?\*?\.?")
CUED = ("p", "verse")
STRUCT = ("p", "verse", "ref", "beat", "swell", "fivewords")


def load_builder():
    spec = importlib.util.spec_from_file_location(
        "build_chapters", os.path.join(SITE, "tools/build-chapters.py"))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def english_chapters():
    src = open(os.path.join(SITE, "content/chapters.js"), encoding="utf-8").read()
    i = src.index("[", src.index("window.PANIM_CHAPTERS"))
    return {c["num"]: c for c in json.loads(src[i:src.rindex("]") + 1])}


def norm_words(text):
    text = html.unescape(re.sub(r"<[^>]+>", " ", text))
    text = unicodedata.normalize("NFKD", text.lower())
    text = "".join(c for c in text if not unicodedata.combining(c))
    return re.findall(r"[a-z0-9]+", text)


def spanish_blocks(bc, path):
    """The Spanish chapter as the site's own parser sees it, with the two things
    it cannot know about Spanish put right: citations, and the closing five words."""
    num, title, blocks, _ = bc.parse_chapter(path)
    out = []
    for b in blocks:
        if b["type"] not in STRUCT:
            continue
        if b["type"] == "p" and ES_CITATION.fullmatch(bc.plain(b["html"]).strip()):
            b = {"type": "ref", "ref": bc.plain(b["html"]).strip()}
        out.append(b)
    if len(out) >= 2 and out[-1]["type"] == "ref" and out[-2]["type"] == "p" and num == 10:
        out[-2:] = [{"type": "fivewords", "text": out[-2]["html"], "ref": out[-1]["ref"]}]
    return num, title, out


def map_ids(es_blocks, en_blocks):
    """Spanish block -> English id, by the shape of the two chapters. None where the
    Spanish has a line the English does not. tools/build-spanish-text.py uses it too."""
    ids = [None] * len(es_blocks)
    sm = difflib.SequenceMatcher(None, [b["type"] for b in es_blocks],
                                 [b["type"] for b in en_blocks], autojunk=False)
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op == "equal" or (op == "replace" and i2 - i1 == j2 - j1):
            for k in range(i2 - i1):
                e, s = en_blocks[j1 + k], es_blocks[i1 + k]
                if e["type"] == s["type"] and e["type"] in CUED:
                    ids[i1 + k] = e["id"]
    return ids


def block_words(bc, b):
    if b["type"] == "p":
        return norm_words(b["html"])
    if b["type"] == "verse":
        return norm_words(" ".join(b["lines"]))
    return []


def align_words(path):
    """Every word the voice says, with the time its first letter starts."""
    a = json.load(open(path, encoding="utf-8"))
    chars, starts = a["characters"], a["character_start_times_seconds"]
    words, times, cur, t0 = [], [], "", None
    for c, t in zip(chars, starts):
        d = "".join(x for x in unicodedata.normalize("NFKD", c.lower())
                    if not unicodedata.combining(x))
        if d and d.isalnum():
            if not cur:
                t0 = t
            cur += d
        elif cur:
            words.append(cur)
            times.append(t0)
            cur = ""
    if cur:
        words.append(cur)
        times.append(t0)
    return words, times


def locate(bw, aw, ptr, window=600, probe=8):
    """Where block words `bw` start in the spoken words, searching forward."""
    probe_w = bw[:probe]
    if not probe_w:
        return None, 0.0
    best, best_score = None, 0.0
    for i in range(ptr, min(len(aw), ptr + window)):
        hit = sum(1 for k, w in enumerate(probe_w) if i + k < len(aw) and aw[i + k] == w)
        score = hit / len(probe_w)
        if score > best_score:
            best, best_score = i, score
            if score == 1.0:
                break
    if best_score >= 0.5:
        return best, best_score
    # A line with a pronunciation respelling ("*Nasa* [na-SÁ]") is spoken with extra
    # words the page does not have, so the strict probe slides off it. Fall back to
    # the bag of the block's first twenty words against a slightly wider span, and
    # only accept a start that is itself one of the block's opening words.
    probe_b = bw[:20]
    head = set(probe_b[:6])
    for i in range(ptr, min(len(aw), ptr + window)):
        if aw[i] not in head:
            continue
        span = aw[i:i + len(probe_b) + 12]
        pool = list(span)
        hit = 0
        for w in probe_b:
            if w in pool:
                pool.remove(w)
                hit += 1
        score = hit / len(probe_b)
        if score > best_score:
            best, best_score = i, score
    # A short line that is mostly respelling ("*Lejem ha-panim* [LÉ-jem ja-pa-NIM]:
    # el pan del rostro.") is spoken as the respelling alone. Accept it at 0.4 when it
    # starts right where the previous block ended — the order of the book vouches.
    if best is not None and 0.4 <= best_score < 0.5 and best - ptr < 40:
        best_score = 0.5
    return best, best_score


def wav_seconds(path):
    with wave.open(path) as w:
        return w.getnframes() / w.getframerate()


def find(folder, num, ext):
    hits = [f for f in os.listdir(folder)
            if unicodedata.normalize("NFC", f).startswith(f"Capítulo {num}_") and f.endswith(ext)]
    if len(hits) != 1:
        sys.exit(f"expected one Capítulo {num} {ext} in {folder}, found {hits}")
    return os.path.join(folder, hits[0])


def encode(src, dest):
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    fd, tmp = tempfile.mkstemp(suffix=".m4a", dir=os.path.dirname(dest))
    os.close(fd)
    r = subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", "-b", str(BITRATE), src, tmp],
                       capture_output=True, text=True)
    if r.returncode != 0 or os.path.getsize(tmp) < 1_000_000:
        os.unlink(tmp)
        sys.exit(f"afconvert failed on {src}: {r.stderr[:200]}")
    os.replace(tmp, dest)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--no-encode", action="store_true", help="manifest and cues only")
    args = ap.parse_args()

    bc = load_builder()
    en = english_chapters()
    files = sorted(f for f in os.listdir(ES_BOOK) if re.match(r"\d\d-.*\.md$", f))
    if len(files) != 10:
        sys.exit(f"expected 10 Spanish chapters in {ES_BOOK}, found {len(files)}")

    manifest = {}
    worst = []
    os.makedirs(os.path.join(SITE, "cues/es"), exist_ok=True)

    for fn in files:
        num, title, es_blocks = spanish_blocks(bc, os.path.join(ES_BOOK, fn))
        chid = f"ch{num:02d}"
        en_blocks = [b for b in en[num]["blocks"] if b["type"] in STRUCT]

        # 1. Spanish block -> English id, by the shape of the two chapters.
        ids = map_ids(es_blocks, en_blocks)

        # 2. Spanish block -> the time the voice starts it.
        align = find(ASSEMBLED, num, ".align.json")
        aw, at = align_words(align)
        cues, ptr, unmapped, weak = [], 0, 0, []
        for b, bid in zip(es_blocks, ids):
            bw = block_words(bc, b)
            if not bw:
                continue
            pos, score = locate(bw, aw, ptr)
            if pos is None or score < 0.5:
                weak.append((bid, round(score, 2), " ".join(bw[:6])))
                continue
            ptr = pos + max(1, int(len(bw) * 0.8))
            if bid is None:
                unmapped += 1
                continue
            cues.append({"t": round(at[pos], 2), "id": bid})

        times = [c["t"] for c in cues]
        assert times == sorted(times), f"{chid}: cues out of order"
        en_cued = sum(1 for b in en_blocks if b["type"] in CUED)
        missing = sorted(set(b["id"] for b in en_blocks if b["type"] in CUED) -
                         set(c["id"] for c in cues))

        voice = find(VOICE, num, ".wav")
        music = find(MUSIC, num, ".wav")
        vdur, mdur, adur = wav_seconds(voice), wav_seconds(music), wav_seconds(find(ASSEMBLED, num, ".wav"))
        assert abs(vdur - adur) < 0.05, f"{chid}: master changed length ({adur:.2f} -> {vdur:.2f})"
        assert times[-1] < vdur, f"{chid}: last cue past the end"

        dest = os.path.join(SITE, "audio/es", chid + ".m4a")
        if not args.no_encode:
            encode(music, dest)
        mb = round(os.path.getsize(dest) / 1e6, 1) if os.path.exists(dest) else None

        out = os.path.join(SITE, "cues/es", chid + ".json")
        tmp = out + ".tmp"
        open(tmp, "w").write(json.dumps(cues))
        os.replace(tmp, out)

        entry = {"num": num, "title": title, "voiceDur": round(vdur, 2),
                 "musicDur": round(mdur, 2), "musicOffset": MUSIC_OFFSET, "musicMB": mb}
        if chid == DOOR_CHAPTER:
            door = [c["t"] for c in cues if c["id"] == DOOR_NEXT_ID]
            assert door, "the five-minute card's closing line has no Spanish cue"
            entry["doorThrough"] = door[0]
        manifest[chid] = entry

        print(f"{chid} {title[:34]:34s} {len(cues):4d}/{en_cued} cued  "
              f"{vdur / 60:5.1f} min  {mb or '-':>5} MB  extra-es={unmapped}  "
              f"weak={len(weak)}  missing={len(missing)}")
        for w in weak[:3]:
            print("     weak:", w)
        if missing:
            print("     missing:", ", ".join(missing[:8]))
        worst += weak

    body = json.dumps(manifest, ensure_ascii=False, indent=1)
    js = ("// generated by tools/build-spanish-audio.py — never hand-edit.\n"
          "// The Spanish edition: run times from the finished WAVs, titles from the\n"
          "// Spanish manuscript. musicOffset as the English. doorThrough: see js/player.js DOOR.\n"
          "window.PANIM_AUDIO_ES = " + body + ";\n")
    path = os.path.join(SITE, "content/audio-manifest-es.js")
    open(path + ".tmp", "w", encoding="utf-8").write(js)
    os.replace(path + ".tmp", path)
    total = sum(m["musicMB"] or 0 for m in manifest.values())
    print(f"\nwrote content/audio-manifest-es.js, cues/es/*.json"
          + ("" if args.no_encode else f", audio/es/*.m4a ({total:.0f} MB)"))
    return 1 if worst else 0


if __name__ == "__main__":
    sys.exit(main())
