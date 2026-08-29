#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate /c/NN/index.html — one share stub per chapter.

WHY THIS EXISTS. index.html is one file, so it carries one set of Open Graph
tags. Send anyone a link to chapter VII and the unfurl says "An audiobook of
light" and shows the chapter X plate, because that is the only thing the file
can say. Ten stubs, each carrying its own chapter's title, standfirst and plate,
fix that without a server and without a build step for the site itself.

WHAT A STUB DOES. It is a real page with real content — the chapter title, its
standfirst, its plate, and a link into the book — and it redirects a human
browser into /Panim/#chNN after a beat. Crawlers do not run the redirect (it is
JS plus a meta refresh with a delay), so they read the tags. A person who lands
on it sees something sensible even if the redirect never fires.

RUN IT AFTER build-chapters.py, whenever a title, hook or plate changes:

    python3 tools/gen-chapter-stubs.py

Reads: content/chapters.js (title + hook), content/images.js (the plate).
Writes: c/01/index.html … c/10/index.html
"""
import json, os, re, html, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://jonathandiaso.github.io/Panim"
ROMAN = {1:'I',2:'II',3:'III',4:'IV',5:'V',6:'VI',7:'VII',8:'VIII',9:'IX',10:'X'}


def load_js(varnames):
    """Read the content/*.js data files by asking node for them.

    content/images.js is authored JavaScript — comments, unquoted keys, trailing
    commas — so it is not JSON and json.loads cannot read it. The files are already
    a browser contract; the safest reader is the one the browser uses.
    """
    import subprocess
    script = (
        "global.window={};"
        "require(process.argv[1]);require(process.argv[2]);"
        "process.stdout.write(JSON.stringify({c:window.PANIM_CHAPTERS,i:window.PANIM_IMAGES}))"
    )
    out = subprocess.check_output([
        'node', '-e', script,
        os.path.join(ROOT, 'content', 'chapters.js'),
        os.path.join(ROOT, 'content', 'images.js'),
    ])
    d = json.loads(out)
    return d['c'], d['i']


chapters, images = load_js(None)

# Each chapter's opening plate is its first image slot, which is what render.js
# uses for the same job. A chapter with no plate falls back to the site card so
# the unfurl is never blank.
FALLBACK = BASE + '/og-card-face.jpg'

# 🛑 og:image IS A JPEG, NOT THE .webp PLATE. The plates are WebP and the page
# shows them as WebP, but link unfurlers are not browsers: several of them —
# iMessage and the Facebook/Instagram crawler among them — will not render a WebP
# card and fall back to no image at all, silently. art/cards/*.jpg is the 1200x630
# JPEG cut of the same plate, made by tools/make-cards.sh, and it exists only for
# this. If a plate is replaced, remake its card.
CARD_DIR = 'art/cards'

TPL = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title_full} — PANIM</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{base}/#{chid}">
<meta name="robots" content="noindex, follow">

<meta property="og:type" content="article">
<meta property="og:title" content="{title_full}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{base}/c/{nn}/">
<meta property="og:site_name" content="PANIM">
<meta property="og:locale" content="en_US">
<meta property="og:image" content="{img}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{alt}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image:alt" content="{alt}">

<link rel="icon" type="image/svg+xml" href="{base}/favicon.svg">
<meta name="theme-color" content="#EDE9DF">

<!-- A crawler reads the tags above and stops. A person gets sent into the book.
     The refresh carries a delay so the page is a real page first — nobody who
     lands here with JavaScript off is left staring at a blank redirect. -->
<meta http-equiv="refresh" content="2;url={base}/#{chid}">
<style>
  :root {{ color-scheme: light; }}
  body {{
    margin: 0; background: #EDE9DF; color: #191510;
    font-family: Georgia, 'Times New Roman', serif;
    display: grid; place-items: center; min-height: 100vh; padding: 2rem;
  }}
  .wrap {{ max-width: 34rem; }}
  .num {{
    font-family: system-ui, sans-serif; font-size: .7rem; font-weight: 600;
    letter-spacing: .16em; text-transform: uppercase; color: #5C5449; margin: 0 0 1rem;
  }}
  h1 {{ font-size: clamp(1.6rem, 5vw, 2.4rem); font-weight: 400; line-height: 1.12; margin: 0 0 .8rem; }}
  p.hook {{ color: #5C5449; line-height: 1.55; margin: 0 0 1.6rem; }}
  a {{ color: #32506B; }}
  img {{ max-width: 100%; height: auto; margin-bottom: 1.6rem; }}
</style>
</head>
<body>
<div class="wrap">
  <img src="{base}/{imgrel}" alt="{alt}" width="1408" height="768">
  <p class="num">PANIM · Chapter {roman}</p>
  <h1>{title}</h1>
  <p class="hook">{hook}</p>
  <p><a href="{base}/#{chid}">Read and listen to chapter {roman} &#8594;</a></p>
</div>
<script>location.replace({href});</script>
</body>
</html>
"""

written = []
for ch in chapters:
    n = ch['num']
    nn = '%02d' % n
    chid = ch['id']
    roman = ROMAN[n]
    slot = next((b['slot'] for b in ch.get('blocks', []) if b.get('type') == 'slot'), None)
    img = images.get(slot) if slot else None
    imgrel = (img or {}).get('src') or 'og-card-face.jpg'
    # the share card is the JPEG cut, if one has been made for this plate
    card = os.path.join(CARD_DIR, os.path.basename(imgrel).rsplit('.', 1)[0] + '.jpg')
    card_url = (BASE + '/' + card) if os.path.exists(os.path.join(ROOT, card)) else FALLBACK
    alt = (img or {}).get('alt') or 'PANIM'
    hook = ch.get('hook') or ''
    title = ch.get('title') or ''
    e = html.escape
    page = TPL.format(
        base=BASE, nn=nn, chid=chid, roman=roman,
        title=e(title), title_full=e('%s. %s' % (roman, title)),
        hook=e(hook), desc=e(hook or title),
        img=card_url,
        imgrel=e(imgrel), alt=e(alt),
        href=json.dumps(BASE + '/#' + chid),
    )
    d = os.path.join(ROOT, 'c', nn)
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(page)
    written.append('c/%s/index.html  %s  %s' % (nn, roman, title))

print('\n'.join(written))
print('%d stubs written.' % len(written))
