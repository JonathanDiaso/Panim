#!/usr/bin/env python3
"""Local dev server that behaves like GitHub Pages. Use this, not http.server.

    python3 tools/serve.py          # then http://localhost:8899

`python3 -m http.server` cannot serve this site honestly, and both ways it fails
are silent:

  * It types .m4a from the system mimetypes table as `audio/mp4a-latm` — a raw
    AAC-LATM streaming type, not the MP4 container these files actually are. The
    <audio> element gets a type it will not decode, readyState stays at 0, and no
    MediaError is ever raised. Pages sends `audio/mp4`.
  * It ignores Range requests and answers 200 with all 16-44MB. Seeking a chapter
    means refetching it from the beginning; sw.js's Range-sliced replay has nothing
    to exercise. Pages sends `accept-ranges: bytes` and answers 206.

So audio appears broken locally while being fine in production, which sends you
hunting through player.js for a bug that is not there.
"""
import http.server, os, re, socketserver, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8899

TYPES = {'.m4a': 'audio/mp4', '.mp4': 'video/mp4', '.webp': 'image/webp',
         '.woff2': 'font/woff2', '.json': 'application/json', '.webmanifest': 'application/manifest+json'}


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def guess_type(self, path):
        ext = os.path.splitext(path)[1].lower()
        return TYPES.get(ext) or super().guess_type(path)

    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        # the site is versioned by ?v=; never let the dev server add its own staleness
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def send_head(self):
        rng = self.headers.get('Range')
        if not rng:
            return super().send_head()
        path = self.translate_path(self.path)
        if not os.path.isfile(path):
            return super().send_head()
        size = os.path.getsize(path)
        m = re.match(r'bytes=(\d*)-(\d*)$', rng.strip())
        if not m:
            return super().send_head()
        start, end = m.group(1), m.group(2)
        if start == '':                      # suffix range: last N bytes
            start, end = max(0, size - int(end)), size - 1
        else:
            start = int(start)
            end = int(end) if end else size - 1
        end = min(end, size - 1)
        if start > end:
            self.send_response(416)
            self.send_header('Content-Range', f'bytes */{size}')
            self.end_headers()
            return None
        f = open(path, 'rb')
        f.seek(start)
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.send_header('Content-Length', str(end - start + 1))
        self.end_headers()
        self.copyfile = lambda src, dst, n=end - start + 1: dst.write(src.read(n))
        return f


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == '__main__':
    print(f"PANIM dev server (Pages-like MIME + Range) -> http://localhost:{PORT}")
    Server(('', PORT), Handler).serve_forever()
