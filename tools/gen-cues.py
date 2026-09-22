#!/usr/bin/env python3
"""Generate cues/chNN.json by aligning the verified Descript SRTs to the site's
paragraph IDs. SITE-V2-PLAN.md §6.4.

The SRTs are ground truth for WHEN words are spoken (verified against the golden
master to +/-0.1s in ~/Panim-audio); chapters.js is ground truth for WHAT the site
shows. Both now come from the same manuscript — chapters.js is generated from it by
tools/build-chapters.py — so the two word streams agree to ~99% (tools/check-coverage.py
measures it). difflib alignment maps each block's first words to a spoken time.

This held only from 2026-08-27. Before that chapters.js was a July draft the narrator
never read, and up to 57% of a chapter's spoken words had no text to anchor to. Run
tools/check-coverage.py before trusting a cue file; if coverage drops, rebuild the
text first and regenerate cues after — never the other way round.

Block ids come from the current build of chapters.js and change whenever the
manuscript's paragraph structure does, so cues/*.json must be regenerated in the
same pass as content/chapters.js. "ref" blocks are page-only apparatus and are
deliberately not cued.

Emits [{t, id}] on the VOICE-edition timeline (SRT time + 0.5s head pad).
The music edition is voice + 6.0s (introoutro LEAD_IN), applied in the player.
Confidence report: any block matching under 60% of its first words is listed for
manual review (tools/cue-marker.html) and still emitted (best guess beats none).
"""
import re, json, os, difflib, html

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# The tape the site plays is v2 (2026-09-19). Its SRTs are the verified Descript ones carried
# onto the v2 timeline by ~/Panim-audio/v2/scripts/srt_v2.py -- golden times moved by exactly
# as much as the tape moved under them, pickup words snapped to real onsets. Same convention
# (voice time - 0.5 s). The v1 originals are still in ~/Panim-audio/transcripts/; SRTDIR= picks.
SRTD = os.environ.get('SRTDIR') or os.path.expanduser('~/Panim-audio/v2/transcripts-site')
HEAD_PAD = 0.5

SRTS = {1:'Chapter 1_  The God Who Sees.srt', 2:'Chapter 2_  The Hiding.srt',
        3:'Chapter 3_  The Face They Fled_.srt', 4:'Chapter 4_  The word he kept rehearsing_.srt',
        5:'Chapter 5_ Mouth to Mouth_.srt', 6:'Chapter 6_  Borrowed Light_.srt',
        7:'Chapter 7_  The Glory Backs Out.srt', 8:'Chapter 8_  The Face Set Like Flint.srt',
        9:'Chapter 9  Chapter nine_ Eyes Opened.srt', 10:'Chapter 10_  Face to Face.srt'}

def words_of(text):
    return re.findall(r"[a-z0-9']+", html.unescape(re.sub(r'<[^>]+>', ' ', text)).lower())

# 🛑 ONE TIME PER SUBTITLE IS NOT ONE TIME PER WORD, 2026-09-22. This used to give
# every word in a block the block's START time. A block holds up to ~7 s of speech,
# so when a paragraph break fell inside one ("And they heard in that slow withdrawal
# the echo of a verse: I will go away…"), both paragraphs got the same cue: the
# first was never highlighted and the second lit up while the first was still being
# read. 73 English paragraphs did this (ch07-p45 / ch07-v2, 4.6 s early, seen live).
# Words now carry their share of the block by characters, and a paragraph that starts
# mid-block is snapped to the pause the reader actually took (snap_to_pause, below).
def srt_words(path):
    w, t, mid = [], [], []
    for b in re.split(r'\n\s*\n', open(path, encoding='utf-8').read().strip()):
        m = re.search(r'(\d\d):(\d\d):(\d\d)[,.](\d+)\s*-->\s*(\d\d):(\d\d):(\d\d)[,.](\d+)', b)
        if not m: continue
        s = int(m[1])*3600 + int(m[2])*60 + int(m[3]) + int(m[4])/1000
        e = int(m[5])*3600 + int(m[6])*60 + int(m[7]) + int(m[8])/1000
        body = b[b.index(m.group(0)) + len(m.group(0)):]
        body = body.split('\n', 1)[1] if '\n' in body else ''
        ws = words_of(body)
        total = sum(len(x) + 1 for x in ws) or 1
        done = 0
        for k, x in enumerate(ws):
            w.append(x); t.append(s + (e - s) * done / total); mid.append(k > 0)
            done += len(x) + 1
    return w, t, mid

# The shipped music edition, read once per chapter, gives the pauses. Voice time =
# file time - 6.0 (the music lead-in, js/player.js offset()). Absent file = no snap,
# and the proportional estimate stands.
MUSIC_LEAD = 6.0
def pause_ends(n):
    path = os.path.join(SITE, 'audio', 'music', f'ch{n:02d}.m4a')
    if not os.path.exists(path): return None
    import subprocess, numpy as np
    raw = subprocess.run(['ffmpeg', '-v', '0', '-i', path, '-ac', '1', '-ar', '8000',
                          '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.float32)
    hop = 80                                             # 10 ms
    e = 10*np.log10((x[:len(x)//hop*hop].reshape(-1, hop)**2).mean(1) + 1e-12)
    quiet = e < np.percentile(e, 95) - 22                # the piano sits ~28 dB under
    ends = []                                            # speech onsets after >=150 ms of quiet
    run = 0
    for i, q in enumerate(quiet):
        if q: run += 1
        else:
            if run >= 15: ends.append(i*0.01 - MUSIC_LEAD)
            run = 0
    return np.array(ends)

def snap_to_pause(t, ends, reach=1.2):
    if ends is None or not len(ends): return t
    import numpy as np
    k = int(np.argmin(abs(ends - t)))
    return float(ends[k]) if abs(ends[k] - t) <= reach else t

src = open(os.path.join(SITE, 'content/chapters.js')).read()
_i = src.index('[', src.index('window.PANIM_CHAPTERS'))   # the header comment has brackets
chapters = json.loads(src[_i:src.rindex(']')+1])

review = []
per_chapter = []
for ch in chapters:
    n = ch['num']
    aw, at, amid = srt_words(os.path.join(SRTD, SRTS[n]))
    ends = pause_ends(n)
    blocks = []
    for b in ch['blocks']:
        if b['type'] == 'p': blocks.append((b['id'], words_of(b['html'])))
        elif b['type'] == 'verse':
            blocks.append((b['id'], words_of(' '.join(b.get('lines', [])))))
    bw = []; owner = []
    for bid, ws in blocks:
        bw += ws; owner += [bid]*len(ws)
    sm = difflib.SequenceMatcher(None, bw, aw, autojunk=False)
    hit = {}   # block id -> (matched words, first spoken t)
    first = {} # block id -> index of its first spoken word in aw
    tot = {bid: len(ws) for bid, ws in blocks}
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag != 'equal': continue
        for k in range(i2 - i1):
            bid = owner[i1 + k]
            m, t0 = hit.get(bid, (0, None))
            if t0 is None: first[bid] = j1 + k
            hit[bid] = (m + 1, t0 if t0 is not None else at[j1 + k])
    # A block difflib could attribute no word to used to be DROPPED. Every one of them
    # is two to five words long ("Israel.", "The word is ra'ah.") — short lines get
    # swallowed into a neighbouring equal-run, which says nothing about whether they
    # are spoken. Dropping them stalls the read-along on the previous paragraph and
    # leaves that line permanently un-highlighted. Interpolate instead: the block sits
    # between two known times, so place it by its share of the words in that gap. A
    # placed line is marked so the review list still calls for an ear on it.
    placed = set()
    for k, (bid, ws) in enumerate(blocks):
        if hit.get(bid, (0, None))[1] is not None: continue
        prev = next((b for b, _ in reversed(blocks[:k]) if hit.get(b, (0, None))[1] is not None), None)
        nxt  = next((b for b, _ in blocks[k+1:]      if hit.get(b, (0, None))[1] is not None), None)
        if prev is None or nxt is None:
            review.append((bid, 0.0, 'NO MATCH, no neighbours to place it between')); continue
        i0 = [b for b, _ in blocks].index(prev); i1 = [b for b, _ in blocks].index(nxt)
        span = sum(tot[b] for b, _ in blocks[i0:i1]) or 1
        before = sum(tot[b] for b, _ in blocks[i0:k]) or 0
        t0, t1 = hit[prev][1], hit[nxt][1]
        hit[bid] = (0, t0 + (t1 - t0) * before / span)
        placed.add(bid)

    cues = []
    last = -1.0   # a snap may never land at or before the paragraph above it
    for bid, ws in blocks:
        m, t0 = hit.get(bid, (0, None))
        conf = m / max(1, tot[bid])
        if t0 is None:
            review.append((bid, 0.0, 'NO MATCH')); continue
        if bid in placed: review.append((bid, 0.0, f'interpolated t={t0 + HEAD_PAD:.1f}'))
        elif conf < 0.6: review.append((bid, conf, f't={t0:.1f}'))
        t = t0 + HEAD_PAD
        if bid in first and amid[first[bid]]:
            ts = snap_to_pause(t, ends)
            if ts > last + 0.3: t = ts
        last = t
        cues.append(dict(t=round(t, 2), id=bid))

    # Cue times must not go backwards against the manuscript. sync.js walks the file in
    # time order and highlights whatever it lands on, so one badly-aligned block that
    # sorts out of place does not merely mistime a line — it yanks the reader back up
    # the page mid-sentence. Assert it rather than sorting the evidence away.
    order = {bid: i for i, (bid, _) in enumerate(blocks)}
    cues.sort(key=lambda c: (c['t'], order[c['id']]))
    back = [(a['id'], b['id']) for a, b in zip(cues, cues[1:]) if order[b['id']] < order[a['id']]]
    if back:
        raise SystemExit(f"ch{n:02d}: {len(back)} cue(s) out of manuscript order, first "
                         f"{back[0][0]} -> {back[0][1]}. Fix the alignment; do not ship this.")

    out = os.path.join(SITE, 'cues', f'ch{n:02d}.json')
    json.dump(cues, open(out, 'w'))
    matched = [b for b, _ in blocks if b in hit and b not in placed]
    line = (f"ch{n:02d}: {len(cues)}/{len(blocks)} blocks cued "
            f"({len(placed)} interpolated), median conf "
            f"{sorted(hit[b][0]/tot[b] for b in matched)[len(matched)//2]:.2f}")
    per_chapter.append(line)
    print(line)

report = [f"review list ({len(review)}):"]
report += [f"  {bid}  conf={conf:.2f}  {note}" for bid, conf, note in review]
print("\n" + "\n".join(report))

# 🛑 WRITE THE REVIEW FILE. It used to be printed and nothing else, while
# cues/_review.txt sat on disk with a header claiming this script generated it.
# It drifted silently: on 2026-09-03 it still said ch06 had 159 blocks and the
# list held 9, when the real numbers were 160 and 11 — the two paragraphs round
# eighteen wrote into the manuscript were missing from the one file whose job is
# to say which cues need an ear. A file that claims to be generated must actually
# be generated, or it is worse than no file at all.
lines = [
    "# Generated by tools/gen-cues.py — do not hand-edit; re-run the script.",
    "# Regenerated on every run, so the counts below are always current.",
    "",
]
lines += [l for l in per_chapter]
lines += ["", *report, ""]
txt = "\n".join(lines)
assert isinstance(txt, str) and txt
rp = os.path.join(SITE, 'cues', '_review.txt')
open(rp + '.tmp', 'w').write(txt)
os.replace(rp + '.tmp', rp)
print(f"\nwrote {rp}")
