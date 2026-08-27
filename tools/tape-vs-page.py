#!/usr/bin/env python3
"""
tape-vs-page.py — every place the recording and the manuscript disagree.

The narrator rewrote lines at the mic. Some of those rewrites are better than
what is on the page and were never carried back into the manuscript, so the
book and the recording say different things in a handful of places.

The SRTs in ~/Panim-audio/transcripts are the record of what was actually said
(HANDOFF.md calls them irreplaceable and they are corrected, not raw ASR). This
aligns each chapter's spoken word stream against the page's and prints every
disagreement, with the tape's wording and the page's side by side, so the
manuscript can be corrected FROM the tape rather than rewritten by hand.

Each row is classified by looking for the same wording anywhere else in the
other stream:

  ONLY ON TAPE   said, and nowhere on the page. The manuscript is behind here.
  ONLY ON PAGE   printed, and never said. Either cut at the mic, or the
                 read-along has text the audio will never reach.
  MOVED          present in both, in a different place. Nothing is missing; the
                 narrator resequenced. Usually not worth chasing.

The narrator announcing "chapter three, the face they fled" is not a
disagreement — the page carries that as a heading — so those are filtered out.

It cannot tell a real rewrite from a transcription wobble. Every row is for a
person to judge. What it can do is guarantee the list is complete.

Usage:
    python3 tools/tape-vs-page.py            # runs of 4+ words
    python3 tools/tape-vs-page.py --min 8    # only the big ones
    python3 tools/tape-vs-page.py --ch 3
"""

import difflib
import glob
import json
import os
import re
import sys
import unicodedata

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRT_DIR = os.path.expanduser("~/Panim-audio/transcripts")
MANUSCRIPT = os.path.expanduser("~/Panim/panim-book/chapters")
ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]


def words(text):
    text = unicodedata.normalize("NFKD", text)
    return re.findall(r"[a-z0-9]+", text.lower())


def srt_stream(path):
    """(word, seconds) for every spoken word."""
    out = []
    t = 0.0
    for block in re.split(r"\n\s*\n", open(path, encoding="utf-8-sig").read()):
        m = re.search(r"(\d\d):(\d\d):(\d\d)[,.](\d+)\s*-->", block)
        if not m:
            continue
        t = int(m[1]) * 3600 + int(m[2]) * 60 + int(m[3]) + int(m[4]) / 1000
        body = block[block.index(m.group(0)) + len(m.group(0)):]
        body = body.split("\n", 1)[1] if "\n" in body else ""
        for w in words(body):
            out.append((w, t))
    return out


def load_chapters():
    src = open(os.path.join(SITE, "content", "chapters.js"), encoding="utf-8").read()
    i = src.index("[", src.index("window.PANIM_CHAPTERS"))
    return json.loads(src[i: src.rindex("]") + 1])


def page_stream(chapter):
    """(word, block id) for every word the page shows as narration."""
    out = []
    for b in chapter["blocks"]:
        if b["type"] == "p":
            for w in words(re.sub(r"<[^>]+>", "", b["html"])):
                out.append((w, b["id"]))
        elif b["type"] == "verse":
            for line in b["lines"]:
                for w in words(re.sub(r"<[^>]+>", "", line)):
                    out.append((w, b["id"]))
        elif b["type"] == "fivewords":
            for w in words(b["text"]):
                out.append((w, "fivewords"))
        # "ref" blocks are printed, not spoken
    return out


ANNOUNCE = re.compile(r"^chapter (one|two|three|four|five|six|seven|eight|nine|ten|\d+)\b")


def found_elsewhere(needle, haystack, skip_from, skip_to):
    """Is this run of words present in the other stream, outside the diff range?"""
    if len(needle) < 3:
        return False
    n = len(needle)
    for i in range(len(haystack) - n + 1):
        if skip_from - n < i < skip_to:
            continue
        if haystack[i:i + n] == needle:
            return True
    # a resequenced line is rarely word-identical; accept a close match too
    best = 0.0
    for i in range(0, max(1, len(haystack) - n + 1), max(1, n // 2)):
        if skip_from - n < i < skip_to:
            continue
        r = difflib.SequenceMatcher(None, needle, haystack[i:i + n]).ratio()
        best = max(best, r)
        if best >= 0.8:
            return True
    return False


def clock(s):
    return "%d:%02d:%05.2f" % (s // 3600, (s % 3600) // 60, s % 60)


def main():
    argv = sys.argv[1:]
    min_run = 4
    only = None
    if "--min" in argv:
        min_run = int(argv[argv.index("--min") + 1])
    if "--ch" in argv:
        only = int(argv[argv.index("--ch") + 1])

    srts = {}
    for p in glob.glob(os.path.join(SRT_DIR, "*.srt")):
        m = re.search(r"Chapter (\d+)", os.path.basename(p))
        if m:
            srts[int(m.group(1))] = p

    manuscripts = {}
    for p in sorted(glob.glob(os.path.join(MANUSCRIPT, "*.md"))):
        m = re.match(r"(\d\d)-", os.path.basename(p))
        if m:
            manuscripts[int(m.group(1))] = p

    total = 0
    counts = {}
    for ch in sorted(load_chapters(), key=lambda c: c["num"]):
        n = ch["num"]
        if only and n != only:
            continue
        tape = srt_stream(srts[n])
        page = page_stream(ch)
        tw = [w for w, _ in tape]
        pw = [w for w, _ in page]

        sm = difflib.SequenceMatcher(None, tw, pw, autojunk=False)
        rows = []
        for tag, i1, i2, j1, j2 in sm.get_opcodes():
            if tag == "equal":
                continue
            if max(i2 - i1, j2 - j1) < min_run:
                continue
            said = tw[i1:i2]
            printed = pw[j1:j2]
            if said and ANNOUNCE.match(" ".join(said)):
                continue        # "chapter three, the face they fled" is the heading
            tape_moved = bool(said) and found_elsewhere(said, pw, j1, j2)
            page_moved = bool(printed) and found_elsewhere(printed, tw, i1, i2)
            if said and printed:
                kind = "MOVED" if (tape_moved and page_moved) else "REWRITTEN"
            elif said:
                kind = "MOVED" if tape_moved else "ONLY ON TAPE"
            else:
                kind = "MOVED" if page_moved else "ONLY ON PAGE"
            rows.append((kind, i1, i2, j1, j2))
        if not rows:
            continue

        print("\n%s  ch%02d — %s   (%s)"
              % ("=" * 4, n, ch["title"], os.path.basename(manuscripts[n])))
        for kind, i1, i2, j1, j2 in rows:
            at = tape[i1][1] if i1 < len(tape) else tape[-1][1]
            bid = page[j1][1] if j1 < len(page) else (page[-1][1] if page else "?")
            lead = " ".join(tw[max(0, i1 - 6):i1])
            print("\n  %-13s at %s  (%s)" % (kind, clock(at), bid))
            if lead:
                print("    …%s" % lead)
            print("    TAPE: %s" % (" ".join(tw[i1:i2]) or "—"))
            print("    PAGE: %s" % (" ".join(pw[j1:j2]) or "—"))
            counts[kind] = counts.get(kind, 0) + 1
            total += 1

    print("\n%d disagreement%s at %d words or more:"
          % (total, "" if total == 1 else "s", min_run))
    for k in ("ONLY ON TAPE", "ONLY ON PAGE", "REWRITTEN", "MOVED"):
        if counts.get(k):
            print("  %-13s %d" % (k, counts[k]))
    print("\nThe tape is the record. Correct the manuscript from it, then re-run")
    print("tools/build-chapters.py and tools/gen-cues.py.")


if __name__ == "__main__":
    main()
