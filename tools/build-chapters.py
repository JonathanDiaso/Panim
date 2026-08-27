#!/usr/bin/env python3
"""
build-chapters.py — regenerate content/chapters.js from the manuscript.

Source of truth for the text is ~/Panim/panim-book/chapters/*.md, which is the
recording script: it is what the narrator actually read, so it is also the only
text the cue files can be aligned against.

The manuscript carries three things the page must not show:

  [beat] [swell] [hold]   pacing marks. On their own line they are the section
                          dividers the site already renders. Inline, at the end
                          of a sentence, they are a direction to the reader and
                          are dropped.
  [AB-suh-lum]            pronunciation guides, written for the mic. Dropped.
  *italics*               the book's emphasis, kept as <em>.
  *Psalm 51:10*           a citation on its own line, under the line it cites,
  Genesis 1:2.            italicised or not. Verified against the SRTs: the
                          narrator does not read these aloud, so they become
                          "ref" blocks — printed, never cued.

Everything else in the manuscript is text, and this script never rewrites it.
Word-count parity against the source is asserted at the end of every run.

Four things do not come from the manuscript and are carried across from the
previous content/chapters.js instead, because they are editorial work done on
the site and have no marker in the book:

  hook       the chapter standfirsts
  slot       the fifteen image positions, re-anchored by matching the paragraph
             each slot used to sit above
  zone       the prayer passage in chapter X, re-anchored the same way
  glossary   term list; gloss text is re-read from the new manuscript where the
             term survives, and any term that has left the book is reported

Block ids renumber. That is deliberate and it is why cues/*.json must be
regenerated after this runs: the old ids point into a draft the narrator never
read, so keeping them stable would only preserve a wrong alignment.

Usage:  python3 tools/build-chapters.py [--dry-run]
"""

import difflib
import json
import os
import re
import sys
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
BOOK = os.path.expanduser("~/Panim/panim-book/chapters")
OUT = os.path.join(SITE, "content", "chapters.js")

DEFAULT_TRANSLATION = "NASB"

# Where the previous draft's text is gone from the manuscript, the editorial
# mark it carried is re-anchored by hand instead of by matching. Each value is
# the opening words of the manuscript paragraph the mark belongs to.
ANCHORS = {
    ("ch10", "slot", "ch10-veil-lift"):
        "Then she arrives. Isaac has gone out into the field toward evening",
    ("ch10", "prayer", "start"):
        "Father, I have been hiding.",
    ("ch10", "prayer", "end"):
        "Amen.",
}

# The terminal block: the five words the whole book runs toward, set apart on
# their own page. In the manuscript they are simply the last paragraph and its
# citation.
FIVEWORDS_TEXT = "They will see His face."

# A line that is nothing but a scripture reference — "*Psalm 51:10*" in the
# chapter X prayer, "Genesis 1:2." in chapter I. Anchored at both ends and
# required to be a book name followed by chapter:verse, so it cannot swallow a
# sentence that merely happens to end in a citation.
CITATION = re.compile(
    r"\*?((?:[1-3] )?[A-Z][A-Za-z]+(?: of [A-Z][A-Za-z]+)?"
    r"(?: [A-Z][A-Za-z]+)? \d+:\d+(?:\s*[\u2013\u2014-]\s*\d+(?::\d+)?)?"
    r"(?:, ?\d+(?::\d+)?)*(?: \([A-Z0-9 ]+\))?)\.?\*?\.?"
)

PACING = re.compile(r"\[(?:beat|swell|hold)\]", re.I)
# A pronunciation guide is a bracketed run of letters, hyphens and spaces that is
# not one of the pacing words. They are written for the mic in caps-and-hyphens
# ([AB-suh-lum], [ah-keh-DAH]); requiring a hyphen or an all-caps syllable keeps
# this from eating anything else that might ever be bracketed.
PRONUNCIATION = re.compile(r"\s*\[(?![Bb]eat\]|[Ss]well\]|[Hh]old\])[A-Za-z'’\- ]+\]")


# ---------------------------------------------------------------- text helpers

def strip_marks(text):
    """Remove the mic directions. Returns (clean_text, counts)."""
    counts = {"pacing": 0, "pron": 0}

    def drop_pron(m):
        counts["pron"] += 1
        return ""

    def drop_pacing(m):
        counts["pacing"] += 1
        return ""

    text = PRONUNCIATION.sub(drop_pron, text)
    text = PACING.sub(drop_pacing, text)
    text = re.sub(r"[ \t]{2,}", " ", text)
    text = re.sub(r"\s+([,.;:!?])", r"\1", text)
    return text.strip(), counts


def italics_to_em(text):
    return re.sub(r"\*([^*\n]+)\*", r"<em>\1</em>", text)


def smart_quotes(html):
    """
    Typographic quotes, with one exception the book depends on: an apostrophe
    inside <em> is a transliteration glottal stop (ra'ah, l'fanenu) and stays
    straight. So the substitution runs on the plain-text runs only.
    """
    parts = re.split(r"(<em>.*?</em>|<[^>]+>)", html)
    for i, part in enumerate(parts):
        if part.startswith("<"):
            continue
        p = part
        p = re.sub(r'(^|[\s(\[\u2014\u2013-])"', "\\1\u201c", p)
        p = p.replace('"', "\u201d")
        p = re.sub(r"(\w)'(\w)", "\\1\u2019\\2", p)          # don't, Israel's
        p = re.sub(r"(^|[\s(\[\u2014\u2013])'", "\\1\u2018", p)
        p = p.replace("'", "\u2019")
        p = re.sub(r"\.\.\.", "\u2026", p)
        parts[i] = p
    return "".join(parts)


def to_html(text):
    return smart_quotes(italics_to_em(text))


def plain(html):
    return re.sub(r"<[^>]+>", "", html)


def words(text):
    text = unicodedata.normalize("NFKD", text)
    return re.findall(r"[a-z0-9]+", text.lower())


# ------------------------------------------------------------------- the parser

def parse_chapter(path):
    raw = open(path, encoding="utf-8").read()
    counts = {"pacing": 0, "pron": 0}
    blocks = []
    title = None
    num = None

    paras = re.split(r"\n[ \t]*\n", raw)
    for para in paras:
        para = para.strip()
        if not para:
            continue

        if para.startswith("#"):
            m = re.match(r"#\s*(\d+)\s*[—–-]\s*(.+)", para)
            if not m:
                raise SystemExit("unparsable heading in %s: %r" % (path, para[:60]))
            num, title = int(m.group(1)), m.group(2).strip()
            continue

        if re.fullmatch(r"\[beat\]", para, re.I):
            blocks.append({"type": "beat"})
            continue
        if re.fullmatch(r"\[(?:swell|hold)\]", para, re.I):
            # [hold] on its own line is the same instruction as [swell]: stop
            # here. The site has one divider for it.
            blocks.append({"type": "swell"})
            continue

        if para.startswith(">"):
            blocks.append(parse_verse(para, counts, path))
            continue

        # A single newline inside a paragraph is the manuscript setting two
        # short sentences as their own beats. They become their own paragraphs.
        for line in para.split("\n"):
            line = line.strip()
            if not line:
                continue
            if re.fullmatch(r"\[beat\]", line, re.I):
                blocks.append({"type": "beat"})
                continue
            if re.fullmatch(r"\[(?:swell|hold)\]", line, re.I):
                blocks.append({"type": "swell"})
                continue
            clean, c = strip_marks(line)
            counts["pacing"] += c["pacing"]
            counts["pron"] += c["pron"]
            if not clean:
                continue
            m = CITATION.fullmatch(clean)
            if m:
                blocks.append({"type": "ref", "ref": m.group(1).strip().rstrip(".")})
                continue
            blocks.append({"type": "p", "html": to_html(clean)})

    if num is None:
        raise SystemExit("no heading found in %s" % path)
    fold_fivewords(blocks)
    return num, title, blocks, counts


def fold_fivewords(blocks):
    """
    The book's last paragraph and its citation are the terminal block, not two
    more blocks of body text. Folding them here keeps the five words counted
    once, in the manuscript, instead of being carried over and printed twice.
    """
    if len(blocks) < 2:
        return
    last, prev = blocks[-1], blocks[-2]
    if last["type"] != "ref" or prev["type"] != "p":
        return
    if plain(prev["html"]).strip() != FIVEWORDS_TEXT:
        return
    blocks[-2:] = [{"type": "fivewords",
                    "text": plain(prev["html"]).strip(),
                    "ref": last["ref"]}]


def parse_verse(para, counts, path):
    lines = []
    ref = None
    translation = DEFAULT_TRANSLATION
    for line in para.split("\n"):
        line = re.sub(r"^>\s?", "", line.rstrip())
        if not line.strip():
            continue
        m = re.fullmatch(r"\s*\*(.+?)\*\s*", line)
        if m:
            r = m.group(1).strip()
            t = re.search(r"\(([A-Z0-9 ]+)\)\s*$", r)
            if t:
                translation = t.group(1).strip()
                r = r[: t.start()].strip()
            ref = r
            continue
        clean, c = strip_marks(line)
        counts["pacing"] += c["pacing"]
        counts["pron"] += c["pron"]
        if clean:
            lines.append(to_html(clean))
    if not lines:
        raise SystemExit("empty blockquote in %s: %r" % (path, para[:60]))
    block = {"type": "verse", "lines": lines}
    if ref:
        block["ref"] = ref
    block["translation"] = translation
    return block


def assign_ids(chid, blocks):
    p = v = 0
    for b in blocks:
        if b["type"] == "p":
            p += 1
            b["id"] = "%s-p%d" % (chid, p)
        elif b["type"] == "verse":
            v += 1
            b["id"] = "%s-v%d" % (chid, v)
    return blocks


# ------------------------------------------------- carrying the editorial layer

def load_previous(path):
    """The array after the assignment — the header comment contains brackets."""
    src = open(path, encoding="utf-8").read()
    i = src.index("window.PANIM_CHAPTERS")
    i = src.index("[", i)
    return json.loads(src[i: src.rindex("]") + 1])


def para_index(blocks):
    """(block index, word list) for every paragraph, in order."""
    return [(i, words(plain(b["html"])))
            for i, b in enumerate(blocks) if b["type"] == "p"]


def best_match(target_words, index, floor=0.55, span=4):
    """
    Where in the new chapter a paragraph from the old draft belongs.

    The old draft merged runs of the manuscript's short paragraphs into long
    ones, so an old paragraph rarely matches any single new paragraph. Each
    candidate is therefore a window of up to `span` consecutive new paragraphs,
    scored whole; the opening of the run is scored separately as well, because
    first sentences survive redrafting better than middles do. Returns the
    block index the old paragraph starts at.
    """
    if not target_words:
        return None, 0.0
    head = target_words[:15]
    best_i, best_r = None, 0.0
    for n, (i, _) in enumerate(index):
        window = []
        for k in range(span):
            if n + k >= len(index):
                break
            window += index[n + k][1]
            if not window:
                continue
            r = max(
                difflib.SequenceMatcher(None, target_words, window).ratio(),
                difflib.SequenceMatcher(None, head, window[:15]).ratio(),
            )
            if r > best_r:
                best_i, best_r = i, r
    if best_r < floor:
        return None, best_r
    return best_i, best_r


def anchored(new_blocks, key):
    """Block index whose paragraph starts with the hand-written anchor."""
    want = words(ANCHORS.get(key, ""))
    if not want:
        return None
    for i, b in enumerate(new_blocks):
        if b["type"] == "p" and words(plain(b["html"]))[:len(want)] == want:
            return i
    raise SystemExit("anchor not found in manuscript: %r" % (key,))


def reanchor(new_blocks, old_blocks, chid, report):
    """
    Put the image slots back, and re-mark the prayer zone, by matching against
    the paragraph each one used to sit next to in the previous draft.
    """
    # --- slots
    for oi, ob in enumerate(old_blocks):
        if ob["type"] != "slot":
            continue
        after = next((b for b in old_blocks[oi + 1:] if b["type"] == "p"), None)
        before = next((b for b in reversed(old_blocks[:oi]) if b["type"] == "p"), None)

        if oi == 0 or (after is None and before is None):
            new_blocks.insert(0, {"type": "slot", "slot": ob["slot"]})
            report.append("  slot %-16s -> top of chapter" % ob["slot"])
            continue

        idx = anchored(new_blocks, (chid, "slot", ob["slot"]))
        if idx is not None:
            anchor = new_blocks[idx].get("id", "?")
            new_blocks.insert(idx, {"type": "slot", "slot": ob["slot"]})
            report.append("  slot %-16s -> before %s (hand anchor)"
                          % (ob["slot"], anchor))
            continue

        index = para_index(new_blocks)
        idx = None
        ratio = 0.0
        if after is not None:
            idx, ratio = best_match(words(plain(after["html"])), index)
        if idx is None and before is not None:
            j, r = best_match(words(plain(before["html"])), index)
            if j is not None:
                # anchor was the paragraph above; the slot goes after its run
                nxt = next((bi for bi, _ in index if bi > j), len(new_blocks))
                idx, ratio = nxt, r
        if idx is None:
            report.append("  slot %-16s -> UNPLACED (best match %.2f)"
                          % (ob["slot"], ratio))
            continue
        anchor = new_blocks[idx].get("id", "?")
        new_blocks.insert(idx, {"type": "slot", "slot": ob["slot"]})
        report.append("  slot %-16s -> before %s (match %.2f)"
                      % (ob["slot"], anchor, ratio))

    # --- prayer zone
    prayer = [b for b in old_blocks if b.get("zone") == "prayer" and b["type"] == "p"]
    if prayer:
        index = para_index(new_blocks)
        start = anchored(new_blocks, (chid, "prayer", "start"))
        end = anchored(new_blocks, (chid, "prayer", "end"))
        rs = re_ = 1.0
        if start is None:
            start, rs = best_match(words(plain(prayer[0]["html"])), index)
        if end is None:
            end, re_ = best_match(words(plain(prayer[-1]["html"])), index, span=1)
        if start is None or end is None or end < start:
            report.append("  prayer zone      -> UNPLACED (%.2f / %.2f)" % (rs, re_))
        else:
            for b in new_blocks[start:end + 1]:
                b["zone"] = "prayer"
            report.append("  prayer zone      -> %s..%s (%d blocks, match %.2f/%.2f)"
                          % (new_blocks[start].get("id"), new_blocks[end].get("id"),
                             end - start + 1, rs, re_))

    # --- the terminal five words, folded out of the manuscript at parse time
    fw = next((b for b in new_blocks if b["type"] == "fivewords"), None)
    if fw:
        report.append("  fivewords        -> %r (%s)" % (fw["text"], fw["ref"]))
    elif any(b["type"] == "fivewords" for b in old_blocks):
        report.append("  fivewords        -> !! LOST: manuscript no longer ends "
                      "on the five words")


def carry_glossary(old_gloss, new_blocks, report):
    """
    Keep the term list; re-read each gloss out of the new manuscript so it
    quotes a sentence the narrator actually read. A term that has left the book
    is reported and dropped.
    """
    text_blocks = [plain(b["html"]) for b in new_blocks if b["type"] == "p"]
    out = []
    for g in old_gloss:
        term = g["term"]
        pat = re.compile(r"(?<![\w'’])%s(?![\w'’])" % re.escape(term), re.I)
        sentence = None
        for para in text_blocks:
            if not pat.search(para):
                continue
            for s in re.split(r"(?<=[.!?])\s+", para):
                if pat.search(s):
                    sentence = s.strip()
                    break
            if sentence:
                break
        if sentence is None:
            report.append("  gloss %-14s -> DROPPED, term not in manuscript" % term)
            continue
        if sentence != g.get("gloss"):
            report.append("  gloss %-14s -> re-read from manuscript" % term)
        out.append({"term": term, "gloss": sentence})
    return out


# --------------------------------------------------------------------- the run

HEADER = """\
// PANIM_CHAPTERS — generated by tools/build-chapters.py from
// ~/Panim/panim-book/chapters/*.md, which is the text the narrator read.
//
// DO NOT EDIT THIS FILE BY HAND. Edit the manuscript and re-run the builder:
//     python3 tools/build-chapters.py
//     python3 tools/gen-cues.py          # ids change, so cues must follow
//
// Mechanical conversion only. The builder strips the manuscript's mic
// directions ([beat]/[swell]/[hold] and pronunciation guides), turns *italics*
// into <em>, and applies typographic quotes; it never rewrites a word. Word
// count against the manuscript is asserted on every run.
//
// The chapter hooks, the image slots, chapter X's prayer zone and the glossary
// terms are editorial and are carried across from the previous build, not
// derived from the manuscript.

"""


def main():
    dry = "--dry-run" in sys.argv
    prev = load_previous(OUT)
    prev_by_num = {c["num"]: c for c in prev}

    files = sorted(f for f in os.listdir(BOOK) if re.match(r"\d\d-.*\.md$", f))
    if len(files) != 10:
        raise SystemExit("expected 10 chapters in %s, found %d" % (BOOK, len(files)))

    chapters = []
    report = []
    totals = {"pacing": 0, "pron": 0, "words": 0}

    for fn in files:
        path = os.path.join(BOOK, fn)
        num, title, blocks, counts = parse_chapter(path)
        chid = "ch%02d" % num
        assign_ids(chid, blocks)

        old = prev_by_num.get(num, {"blocks": [], "glossary": [], "hook": ""})
        report.append("\nChapter %d — %s   (%s)" % (num, title, fn))
        if old.get("title") and old["title"] != title:
            report.append("  title            -> %r  (was %r)" % (title, old["title"]))
        reanchor(blocks, old["blocks"], chid, report)
        gloss = carry_glossary(old.get("glossary", []), blocks, report)

        # parity: every word of the manuscript, minus the mic directions, is on
        # the page exactly once.
        src, _ = strip_marks(re.sub(r"^#.*$", "", open(path, encoding="utf-8").read(),
                                    flags=re.M))
        src = re.sub(r"^>\s?", "", src, flags=re.M)
        src_w = words(src)
        page_w = []
        for b in blocks:
            if b["type"] == "p":
                page_w += words(plain(b["html"]))
            elif b["type"] == "verse":
                for ln in b["lines"]:
                    page_w += words(plain(ln))
                if b.get("ref"):
                    page_w += words(b["ref"])
                if b.get("translation") and b["translation"] != DEFAULT_TRANSLATION:
                    page_w += words(b["translation"])
            elif b["type"] == "ref":
                page_w += words(b["ref"])
            elif b["type"] == "fivewords":
                page_w += words(b["text"]) + words(b["ref"])
        if src_w != page_w:
            sm = difflib.SequenceMatcher(None, src_w, page_w)
            diffs = [op for op in sm.get_opcodes() if op[0] != "equal"]
            report.append("  !! WORD PARITY FAILED: %d differing runs" % len(diffs))
            for op, i1, i2, j1, j2 in diffs[:5]:
                report.append("     %s src[%s] page[%s]"
                              % (op, " ".join(src_w[i1:i2])[:70],
                                 " ".join(page_w[j1:j2])[:70]))
        else:
            report.append("  words            -> %d, parity OK" % len(src_w))

        totals["pacing"] += counts["pacing"]
        totals["pron"] += counts["pron"]
        totals["words"] += len(page_w)

        chapters.append({
            "num": num,
            "id": chid,
            "title": title,
            "hook": old.get("hook", ""),
            "glossary": gloss,
            "blocks": blocks,
        })

    chapters.sort(key=lambda c: c["num"])
    body = json.dumps(chapters, ensure_ascii=False, indent=1)
    out = HEADER + "window.PANIM_CHAPTERS = " + body + ";\n"

    print("\n".join(report))
    print("\n%d chapters, %d words on the page." % (len(chapters), totals["words"]))
    print("Stripped %d pacing marks and %d pronunciation guides."
          % (totals["pacing"], totals["pron"]))

    if dry:
        print("\n--dry-run: %s not written." % OUT)
        return
    open(OUT, "w", encoding="utf-8").write(out)
    print("\nWrote %s (%d bytes)." % (OUT, len(out)))


if __name__ == "__main__":
    main()
