#!/usr/bin/env python3
"""The Spanish text, onto the site, as ten small files read only by Spanish readers.

    python3 tools/build-spanish-text.py

Writes content/es/chNN.json from ~/Panim/panim-book/es/chapters/*.md:

  {"title": "El Dios que ve",
   "p":     {"ch01-p1": "<html>", "ch01-v1": {"l": [lines], "r": "Números 6:24–26"}, ...},
   "refs":  ["Génesis 1:2", ...],          the standalone citations, in page order
   "after": {"ch02-p22": ["<html>"]},      Spanish lines the English does not have
   "fw":    {"text": ..., "ref": ...}}     chapter X only

🛑 KEYED BY THE ENGLISH BLOCK IDS, the same ids cues/es/*.json carries. js/spanish-text.js
swaps each paragraph's words in place and leaves the element, its id and its cue alone,
so Follow, tap-to-listen, deep links and a saved place need nothing new.

🛑 NOT IN chapters.js, ON PURPOSE. That file is parsed by every visitor before the page
can paint; the Spanish is ~290 KB more of it. As separate files an English reader never
downloads a byte of it, and a Spanish reader downloads it once (sw.js caches any
same-origin GET it serves).

The words come through the site's own manuscript parser (tools/build-chapters.py), so
italics, quotes and the stripped mic directions are exactly what the English gets.
Run after any Spanish manuscript edit, and after tools/build-chapters.py (ids move).
Nothing here costs anything.
"""

import importlib.util
import json
import os
import re
import sys

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(SITE, "content/es")


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, os.path.join(SITE, path))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def main():
    audio = load("build_spanish_audio", "tools/build-spanish-audio.py")
    bc = audio.load_builder()
    en = audio.english_chapters()
    files = sorted(f for f in os.listdir(audio.ES_BOOK) if re.match(r"\d\d-.*\.md$", f))
    if len(files) != 10:
        sys.exit(f"expected 10 Spanish chapters in {audio.ES_BOOK}, found {len(files)}")
    os.makedirs(OUT, exist_ok=True)

    total, failed = 0, False
    for fn in files:
        num, title, es_blocks = audio.spanish_blocks(bc, os.path.join(audio.ES_BOOK, fn))
        chid = f"ch{num:02d}"
        en_blocks = [b for b in en[num]["blocks"] if b["type"] in audio.STRUCT]
        ids = audio.map_ids(es_blocks, en_blocks)

        words, refs, after, fw = {}, [], {}, None
        last_id = None
        for b, bid in zip(es_blocks, ids):
            if b["type"] == "ref":
                refs.append(b["ref"])
            elif b["type"] == "fivewords":
                fw = {"text": bc.plain(b["text"]).strip(), "ref": b["ref"]}
            elif bid and b["type"] == "p":
                words[bid] = b["html"]
                last_id = bid
            elif bid and b["type"] == "verse":
                words[bid] = {"l": b["lines"], "r": b.get("ref") or ""}
                last_id = bid
            elif b["type"] == "p":
                if last_id is None:
                    sys.exit(f"{chid}: a Spanish line before any English one: {b['html'][:60]}")
                after.setdefault(last_id, []).append(b["html"])

        want = [b["id"] for b in en_blocks if b["type"] in ("p", "verse")]
        missing = [i for i in want if i not in words]
        en_refs = sum(1 for b in en_blocks if b["type"] == "ref")
        en_fw = any(b["type"] == "fivewords" for b in en_blocks)
        problems = []
        if missing:
            problems.append(f"{len(missing)} English blocks with no Spanish: {', '.join(missing[:6])}")
        if len(refs) != en_refs:
            problems.append(f"{len(refs)} Spanish citations against {en_refs} English")
        if en_fw != (fw is not None):
            problems.append("the closing five words did not line up")
        if problems:
            failed = True
            for p in problems:
                print(f"{chid}: {p}")
            continue

        doc = {"title": title, "p": words, "refs": refs}
        if after:
            doc["after"] = after
        if fw:
            doc["fw"] = fw
        body = json.dumps(doc, ensure_ascii=False, separators=(",", ":"))
        path = os.path.join(OUT, chid + ".json")
        with open(path + ".tmp", "w", encoding="utf-8") as f:
            f.write(body)
        os.replace(path + ".tmp", path)
        size = len(body.encode("utf-8"))
        total += size
        extra = sum(len(v) for v in after.values())
        print(f"{chid} {title[:36]:36s} {len(words):4d} blocks  {len(refs):3d} refs  "
              f"+{extra} es-only  {size / 1024:6.1f} KB")

    if failed:
        sys.exit("\nnot written: fix the lines above (tools/build-chapters.py first if ids moved)")
    print(f"\nwrote content/es/*.json ({total / 1024:.0f} KB, none of it loaded in English)")


if __name__ == "__main__":
    main()
