// PANIM — service worker (SITE-V2-PLAN.md §6.6)
// Shell: stale-while-revalidate. Audio: NEVER auto-cached — a chapter is stored
// only when the listener explicitly downloads it (message {type:'download'}), and
// cached audio answers Range requests by slicing the stored full response so
// seeking keeps working offline.

// Bump SHELL on every change to a precached file. Without a new cache name a
// returning visitor is served the previous build out of the old cache
// indefinitely — v3 was the Direction B rebuild, v4 the text rebuilt from the
// manuscript, v5 the four new plates and the section dividers.
var SHELL = 'panim-shell-v43';
var AUDIO = 'panim-audio-v1';

// index.html requests every stylesheet and script as `...?v=ASSET_V`. Keep this
// in step with the `?v=` in index.html and with the SHELL number, or the
// precache stores URLs the page never asks for and everything falls through to
// the network — which still works, but offline stops working silently.
//
// FOUR PLACES MOVE TOGETHER on a bump — this is easy to half-do:
//   1. SHELL, above            2. ASSET_V, here
//   3. every ?v= in index.html 4. the ?v= on fonts.css in 404.html AND
//      accessibility.html — both are standalone pages with their own copy, and
//      neither is reached by the index.html sweep. 404.html was left on v24 for
//      a whole release because of exactly this.
var ASSET_V = '39';
var VERSIONED = /\.(css|js)$/;
var PRECACHE = [
  './', 'index.html', 'accessibility.html', 'favicon.svg', 'og-card-face.jpg', 'manifest.webmanifest',
  'fonts/fonts.css',
  // The font FILES, not just the stylesheet. Precaching fonts.css alone meant an
  // installed, offline copy of the book named three typefaces it could not fetch and
  // rendered the whole thing in Georgia. These SEVEN are every subset the site actually
  // reaches: Literata roman + italic latin, Literata greek-ext AND greek, Archivo latin,
  // Frank Ruhl Libre Hebrew + its latin fallback. ~345KB, once.
  //
  // 🛑 l01 (Literata GREEK, U+0370–03FF) was missing until 2026-08-29, and the list said
  // "six ... every subset the site actually reaches". It was not. l00 is greek-EXT
  // (U+1F00–1FFF) and only covers the polytonic accented forms: in ἀνθρακιά the initial
  // ἀ comes from l00 and ν θ ρ α κ ι come from l01. So an offline reader got every Greek
  // word broken across two faces, one glyph in Literata and the rest in a system serif.
  // VERIFY BY MEASUREMENT, not by reading the CSS: load the site and diff
  // performance.getEntriesByType('resource') filtered to woff2 against this list.
  'fonts/l04.woff2', 'fonts/l09.woff2', 'fonts/l00.woff2', 'fonts/l01.woff2',
  'fonts/g02.woff2', 'fonts/h00.woff2', 'fonts/h02.woff2',
  'css/site.css', 'css/components.css', 'css/player.css', 'css/room.css', 'css/polish.css',
  'js/render.js', 'js/ui.js', 'js/motion.js', 'js/sync.js', 'js/search.js',
  'js/player.js', 'js/room.js',
  'content/chapters.js', 'content/images.js', 'content/audio-manifest.js', 'content/marks.js',
  'content/thread.js', 'content/lexicon.js', 'content/names.js', 'content/sources.js', 'content/verse-notes.js',
  'content/derivatives.js',
  'cues/ch01.json', 'cues/ch02.json', 'cues/ch03.json', 'cues/ch04.json', 'cues/ch05.json',
  'cues/ch06.json', 'cues/ch07.json', 'cues/ch08.json', 'cues/ch09.json', 'cues/ch10.json'
  // NOT HERE, and asked and answered 2026-08-28: sitemap.xml and robots.txt. This list
  // is what a reader needs to read the book with no network. A crawler never goes
  // through a service worker, so precaching those two spends install bytes on files
  // nobody offline will ever open. Same reason art/*.webp is absent — the plates are
  // heavy and the text is the product. Don't add them.
];

self.addEventListener('install', function (e) {
  // cache:'reload' on every precache request. addAll() would otherwise be
  // allowed to answer from the browser's own HTTP cache, so a returning visitor
  // arriving inside the CDN's max-age window could fill a brand-new SHELL cache
  // with the files the bump was meant to replace — and then be served that stale
  // copy indefinitely, which for content/chapters.js means reading last week's
  // text while listening to this week's audio.
  e.waitUntil(caches.open(SHELL).then(function (c) {
    return Promise.all(PRECACHE.map(function (u) {
      var key = VERSIONED.test(u) ? u + '?v=' + ASSET_V : u;
      return fetch(new Request(key, { cache: 'reload' })).then(function (r) {
        if (r.ok) return c.put(key, r);
      });
    }));
  }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== SHELL && k !== AUDIO; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function sliceRange(request, response) {
  var range = request.headers.get('range');
  if (!range) return Promise.resolve(response);
  return response.arrayBuffer().then(function (buf) {
    var m = /bytes=(\d+)-(\d+)?/.exec(range);
    var start = m ? parseInt(m[1], 10) : 0;
    var end = m && m[2] ? parseInt(m[2], 10) + 1 : buf.byteLength;
    return new Response(buf.slice(start, end), {
      status: 206, statusText: 'Partial Content',
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'audio/mp4',
        'Content-Range': 'bytes ' + start + '-' + (end - 1) + '/' + buf.byteLength,
        'Content-Length': String(end - start)
      }
    });
  });
}

self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  if (url.pathname.indexOf('/audio/') !== -1) {
    e.respondWith(
      caches.open(AUDIO).then(function (c) {
        return c.match(url.pathname).then(function (hit) {
          if (hit) return sliceRange(e.request, hit.clone());
          return fetch(e.request);
        });
      })
    );
    return;
  }

  // ---------------------------------------------------------------------------
  // NAVIGATIONS ARE NETWORK-FIRST. Everything else stays stale-while-revalidate.
  //
  // This was the bug that made a deploy invisible. index.html is the ONE file with
  // no `?v=` of its own — it is what *carries* the version to everything else. Served
  // cache-first (`return hit || net`), a returning visitor got the OLD shell, which
  // then asked for the OLD ?v= assets, every one of which was also cached. So the
  // whole site rendered a version behind, and bumping SHELL/ASSET_V could not fix it:
  // the new html was fetched and stored, but only *shown* on the NEXT visit.
  //
  // Versioned assets are safe cache-first because their URL changes when they change.
  // The shell is not, so it goes to the network and only falls back to cache offline.
  // ---------------------------------------------------------------------------
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(SHELL).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () {
        return caches.open(SHELL).then(function (c) {
          return c.match(e.request, { ignoreSearch: true }).then(function (hit) {
            return hit || c.match('index.html') || c.match('./');
          });
        });
      })
    );
    return;
  }

  e.respondWith(
    caches.open(SHELL).then(function (c) {
      return c.match(e.request).then(function (hit) {
        var net = fetch(e.request).then(function (res) {
          if (res && res.ok && e.request.method === 'GET') c.put(e.request, res.clone());
          return res;
        }).catch(function () { return hit; });
        return hit || net;
      });
    })
  );
});

self.addEventListener('message', function (e) {
  var d = e.data || {};
  if (d.type === 'download' && d.url) {
    e.waitUntil(
      caches.open(AUDIO).then(function (c) {
        return fetch(d.url).then(function (res) {
          if (!res.ok) throw new Error('fetch failed');
          return c.put(new URL(d.url, location.href).pathname, res);
        });
      }).then(function () { reply(e, { type: 'downloaded', url: d.url, ok: true }); })
        .catch(function () { reply(e, { type: 'downloaded', url: d.url, ok: false }); })
    );
  } else if (d.type === 'remove' && d.url) {
    e.waitUntil(caches.open(AUDIO).then(function (c) {
      return c.delete(new URL(d.url, location.href).pathname);
    }).then(function () { reply(e, { type: 'removed', url: d.url }); }));
  } else if (d.type === 'query' && d.urls) {
    e.waitUntil(caches.open(AUDIO).then(function (c) {
      return Promise.all(d.urls.map(function (u) {
        return c.match(new URL(u, location.href).pathname).then(function (hit) { return !!hit; });
      }));
    }).then(function (flags) { reply(e, { type: 'cached-state', urls: d.urls, cached: flags }); }));
  }
});
function reply(e, msg) {
  if (e.source && e.source.postMessage) e.source.postMessage(msg);
  else self.clients.matchAll().then(function (cs) { cs.forEach(function (c) { c.postMessage(msg); }); });
}
