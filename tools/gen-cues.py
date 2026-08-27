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
SRTD = os.path.expanduser('~/Panim-audio/transcripts')
HEAD_PAD = 0.5

SRTS = {1:'Chapter 1_  The God Who Sees.srt', 2:'Chapter 2_  The Hiding.srt',
        3:'Chapter 3_  The Face They Fled_.srt', 4:'Chapter 4_  The word he kept rehearsing_.srt',
        5:'Chapter 5_ Mouth to Mouth_.srt', 6:'Chapter 6_  Borrowed Light_.srt',
        7:'Chapter 7_  The Glory Backs Out.srt', 8:'Chapter 8_  The Face Set Like Flint.srt',
        9:'Chapter 9  Chapter nine_ Eyes Opened.srt', 10:'Chapter 10_  Face to Face.srt'}

def words_of(text):
    return re.findall(r"[a-z0-9']+", html.unescape(re.sub(r'<[^>]+>', ' ', text)).lower())

def srt_words(path):
    w, t = [], []
    for b in re.split(r'\n\s*\n', open(path, encoding='utf-8').read().strip()):
        m = re.search(r'(\d\d):(\d\d):(\d\d)[,.](\d+)\s*-->', b)
        if not m: continue
        s = int(m[1])*3600 + int(m[2])*60 + int(m[3]) + int(m[4])/1000
        body = b[b.index(m.group(0)) + len(m.group(0)):]
        body = body.split('\n', 1)[1] if '\n' in body else ''
        for x in words_of(body): w.append(x); t.append(s)
    return w, t

src = open(os.path.join(SITE, 'content/chapters.js')).read()
_i = src.index('[', src.index('window.PANIM_CHAPTERS'))   # the header comment has brackets
chapters = json.loads(src[_i:src.rindex(']')+1])

review = []
for ch in chapters:
    n = ch['num']
    aw, at = srt_words(os.path.join(SRTD, SRTS[n]))
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
    tot = {bid: len(ws) for bid, ws in blocks}
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag != 'equal': continue
        for k in range(i2 - i1):
            bid = owner[i1 + k]
            m, t0 = hit.get(bid, (0, None))
            hit[bid] = (m + 1, t0 if t0 is not None else at[j1 + k])
    cues = []
    for bid, ws in blocks:
        m, t0 = hit.get(bid, (0, None))
        conf = m / max(1, tot[bid])
        if t0 is None:
            review.append((bid, 0.0, 'NO MATCH')); continue
        if conf < 0.6: review.append((bid, conf, f't={t0:.1f}'))
        cues.append(dict(t=round(t0 + HEAD_PAD, 2), id=bid))
    cues.sort(key=lambda c: c['t'])
    # sanity: cue times must be non-decreasing per manuscript order too
    out = os.path.join(SITE, 'cues', f'ch{n:02d}.json')
    json.dump(cues, open(out, 'w'))
    print(f"ch{n:02d}: {len(cues)}/{len(blocks)} blocks cued, "
          f"median conf {sorted(hit[b][0]/tot[b] for b, _ in blocks if b in hit)[len(hit)//2]:.2f}")

print(f"\nreview list ({len(review)}):")
for bid, conf, note in review: print(f"  {bid}  conf={conf:.2f}  {note}")
