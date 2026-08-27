#!/usr/bin/env python3
"""
check-coverage.py — how much of the narration is on the page.

The read-along only works if the text the site shows is the text the narrator
read. This measures that directly: it aligns each chapter's page text against
the SRT of the recording and reports the share of spoken words the page
accounts for. Anything materially under 100% means the cue anchors have
nothing to attach to for that stretch.

Usage:  python3 tools/check-coverage.py
"""

import difflib
import glob
import json
import os
import re
import unicodedata

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRT_DIR = os.path.expanduser("~/Panim-audio/transcripts")
ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]


def words(text):
    text = unicodedata.normalize("NFKD", text)
    return re.findall(r"[a-z0-9]+", text.lower())


def srt_words(path):
    out = []
    for line in open(path, encoding="utf-8-sig"):
        line = line.strip()
        if not line or line.isdigit() or "-->" in line:
            continue
        out += words(line)
    return out


def page_words(chapter):
    out = []
    for b in chapter["blocks"]:
        if b["type"] == "p":
            out += words(re.sub(r"<[^>]+>", "", b["html"]))
        elif b["type"] == "verse":
            for ln in b["lines"]:
                out += words(re.sub(r"<[^>]+>", "", ln))
        elif b["type"] == "fivewords":
            out += words(b["text"])
        # "ref" blocks are printed, not spoken — excluded on purpose
    return out


def load_chapters(path):
    """The array after the assignment — the header comment contains brackets."""
    src = open(path, encoding="utf-8").read()
    i = src.index("window.PANIM_CHAPTERS")
    i = src.index("[", i)
    return json.loads(src[i: src.rindex("]") + 1])


def main():
    chapters = load_chapters(os.path.join(SITE, "content", "chapters.js"))

    srts = {}
    for p in glob.glob(os.path.join(SRT_DIR, "*.srt")):
        m = re.search(r"Chapter (\d+)", os.path.basename(p))
        if m:
            srts[int(m.group(1))] = p

    rows = []
    tot_spoken = tot_matched = 0
    for c in sorted(chapters, key=lambda x: x["num"]):
        n = c["num"]
        if n not in srts:
            rows.append((n, c["title"], None, None, None))
            continue
        sw = srt_words(srts[n])
        pw = page_words(c)
        sm = difflib.SequenceMatcher(None, sw, pw, autojunk=False)
        matched = sum(b.size for b in sm.get_matching_blocks())
        rows.append((n, c["title"], len(sw), len(pw), matched / len(sw)))
        tot_spoken += len(sw)
        tot_matched += matched

    w = max(len(r[1]) for r in rows)
    print("%-3s %-*s %8s %8s %9s" % ("", w, "chapter", "spoken", "page", "covered"))
    for n, title, sw, pw, cov in rows:
        if cov is None:
            print("%-3s %-*s %8s %8s %9s" % (ROMAN[n], w, title, "-", "-", "no SRT"))
            continue
        print("%-3s %-*s %8d %8d %8.1f%%" % (ROMAN[n], w, title, sw, pw, cov * 100))
    print("%-3s %-*s %8d %8s %8.1f%%"
          % ("", w, "all ten", tot_spoken, "", tot_matched / tot_spoken * 100))


if __name__ == "__main__":
    main()
