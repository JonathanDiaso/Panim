#!/usr/bin/env python3
"""Measure the pacing of the manuscript, so nobody has to argue about it again.

    python3 tools/check-pacing.py                 # every chapter, one line each
    python3 tools/check-pacing.py 10              # one chapter, every run in it
    python3 tools/check-pacing.py 10 --breaks     # where a break could go

WHY THIS FILE EXISTS. Three handoff sheets in a row made a claim about chapter
pacing and two of them were wrong, because "this chapter is dense" was being read
off a scroll bar. The numbers here come from the manuscript in
~/Panim/panim-book/chapters/*.md — the text the narrator actually read — and not
from the rendered page, whose height is a function of typography and images as
much as of prose.

WHAT A "RUN" IS, and it is the only definition that matters here. The site draws a
divider wherever the manuscript writes [beat], [swell] or [hold]; those marks are
mic directions first and section breaks second, and they are the ONLY thing that
breaks a chapter up. A run is therefore the prose between two marks: the stretch a
reader gets with no place to stop. Verse quotations are counted separately and are
NOT breaks — a block quote is a change of voice, not a rest.

🛑 A [beat] IS A MANUSCRIPT EDIT, NOT A SITE EDIT. Adding one changes no word of
the text and nothing the narrator said, so the recording still matches — but block
ids are positional, so the cue files must be regenerated in the same commit:

    python3 tools/build-chapters.py && python3 tools/gen-cues.py
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
CHAPTERS = os.path.normpath(os.path.join(HERE, '..', '..', 'panim-book', 'chapters'))

MARK = re.compile(r'^\[(beat|swell|hold)\]$', re.I)
TAIL = re.compile(r'\[(beat|swell|hold)\]\s*$', re.I)
PRON = re.compile(r'\[[^\]]*\]')          # pronunciation guides: [pah-NEEM]

# A run longer than this is where a reader has nowhere to put the book down. It is
# not a rule, it is a flag: the longest run in the book that nobody has complained
# about is the honest ceiling, and it sits just under this.
LONG_RUN = 700


def words(s):
    s = PRON.sub(' ', s)
    return len(re.findall(r"[A-Za-z0-9’'’-]+", s))


def read(path):
    """-> [(kind, text)] where kind is 'p', 'verse' or 'mark'."""
    raw = open(path, encoding='utf-8').read()
    out = []
    for para in re.split(r'\n\s*\n', raw):
        para = para.strip()
        if not para or para.startswith('#'):
            continue
        for line in para.split('\n'):
            line = line.strip()
            if not line:
                continue
            if MARK.match(line):
                out.append(('mark', line))
                continue
            kind = 'verse' if line.startswith('>') else 'p'
            tail = TAIL.search(line)
            if tail:
                line = TAIL.sub('', line).strip()
                if line:
                    out.append((kind, line))
                out.append(('mark', tail.group(0)))
            else:
                out.append((kind, line))
    return out


def runs(blocks):
    """Split into stretches of prose between marks. -> [ {...} ]"""
    out, cur = [], None

    def start():
        return {'words': 0, 'paras': 0, 'verses': 0, 'first': '', 'last': ''}

    cur = start()
    for kind, text in blocks:
        if kind == 'mark':
            if cur['words']:
                out.append(cur)
            cur = start()
            continue
        if kind == 'verse':
            cur['verses'] += 1
            continue
        w = words(text)
        if not w:
            continue
        cur['paras'] += 1
        cur['words'] += w
        if not cur['first']:
            cur['first'] = text
        cur['last'] = text
    if cur['words']:
        out.append(cur)
    return out


def short(s, n=64):
    s = PRON.sub('', s).replace('*', '').strip()
    return (s[:n] + '…') if len(s) > n else s


def chapters():
    return sorted(f for f in os.listdir(CHAPTERS) if f.endswith('.md'))


def summary():
    print('%-3s %-30s %6s %6s %6s %6s  %s' %
          ('ch', 'file', 'words', 'runs', 'mean', 'worst', 'long runs'))
    total = 0
    for f in chapters():
        rs = runs(read(os.path.join(CHAPTERS, f)))
        w = sum(r['words'] for r in rs)
        total += w
        worst = max((r['words'] for r in rs), default=0)
        long_ = sum(1 for r in rs if r['words'] > LONG_RUN)
        print('%-3s %-30s %6d %6d %6d %6d  %s' %
              (f[:2], f[:30], w, len(rs), w // max(1, len(rs)), worst,
               ('%d over %d' % (long_, LONG_RUN)) if long_ else '—'))
    print('%-34s %6d' % ('total', total))


def detail(num, show_breaks=False):
    f = [x for x in chapters() if x.startswith('%02d' % num)]
    if not f:
        raise SystemExit('no chapter %s' % num)
    path = os.path.join(CHAPTERS, f[0])
    blocks = read(path)
    rs = runs(blocks)
    print('%s — %d runs, %d words\n' % (f[0], len(rs), sum(r['words'] for r in rs)))
    for i, r in enumerate(rs, 1):
        flag = '  ← LONG' if r['words'] > LONG_RUN else ''
        print('%2d. %4dw  %2dp %2dv%s' % (i, r['words'], r['paras'], r['verses'], flag))
        print('      opens: %s' % short(r['first']))
        print('      ends:  %s' % short(r['last']))
    if show_breaks:
        print('\nCandidate breaks inside every run over %d words:' % LONG_RUN)
        breaks(blocks)


def breaks(blocks):
    """Inside each long run, the paragraph boundary nearest its middle.

    A break belongs at a turn, and the only turn this script can see is the shape
    of the paragraphs: a short paragraph after a long one is where the manuscript
    itself is already pausing. So it offers the SHORTEST paragraph in the middle
    third of the run, which is where the author put a beat every other time.
    """
    run, out = [], []
    for kind, text in blocks:
        if kind == 'mark':
            if run:
                out.append(run)
            run = []
            continue
        if kind == 'p' and words(text):
            run.append(text)
    if run:
        out.append(run)

    for run in out:
        total = sum(words(p) for p in run)
        if total <= LONG_RUN:
            continue
        lo, hi = total * 0.33, total * 0.67
        acc, best = 0, None
        for i, p in enumerate(run[:-1]):
            acc += words(p)
            if not (lo <= acc <= hi):
                continue
            # a break reads best AFTER a short paragraph, so score on that
            score = words(p)
            if best is None or score < best[0]:
                best = (score, i, acc)
        if best is None:
            continue
        _, i, acc = best
        print('\n  run of %dw — break after paragraph %d (%dw / %dw):' %
              (total, i + 1, acc, total - acc))
        print('    …%s' % short(run[i], 90))
        print('    [beat]')
        print('    %s…' % short(run[i + 1], 90))


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('-')]
    if args:
        detail(int(args[0]), '--breaks' in sys.argv)
    else:
        summary()
