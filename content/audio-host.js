// WHERE THE AUDIO LIVES — one line, read by the page (js/player.js) AND by the
// service worker (sw.js importScripts), so the two can never disagree.
//
// '' means this site's own origin: audio/music/chNN.m4a and audio/es/chNN.m4a next to
// index.html. A URL means a bucket whose paths mirror the site's, ending in the site's
// own /Panim/ prefix — so a chapter's cache key (its pathname, sw.js) is the same
// string wherever it is served from, and a chapter a reader saved for offline before
// the move is still found after it.
//
// 🛑 A HOST MUST SEND CORS for https://jonathandiaso.github.io, allow the Range header
// and expose Content-Range / Content-Length / Accept-Ranges, and type the files
// audio/mp4 — the <audio> element is crossorigin="anonymous" and the offline save is a
// fetch(). See README, "Where the audio lives".
// Cloudflare R2, bucket panim-audio, since v77 (2026-09-16). Objects are
// Panim/audio/music/chNN.m4a and Panim/audio/es/chNN.m4a.
self.PANIM_AUDIO_BASE = 'https://pub-b3a31d98ee8f47f291bb96a7d047a1e0.r2.dev/Panim/';

// WHICH RECORDING. Bumped when the files at those paths are replaced with a new master.
// The page asks for chNN.m4a?v=<this>, so no browser or CDN copy of the old recording
// (R2 objects go out with max-age=86400) can be served against the new read-along cues.
// The service worker keys its offline copies by pathname, so the query never splits a
// saved chapter in two. v2 = the English tape re-edited and cleaned, 2026-09-19.
// v3 = the Spanish chapters 1, 7 and 10 rebuilt to follow it, same day.
// v4 = the hiss taken off both recordings and both re-encoded at 192 kbps, 2026-09-19:
// the reader's room tone (-69 -> -83 dB in the gaps) and the piano's own tape hiss.
// Same takes, same lengths, same cues -- only the noise between the words is different.
self.PANIM_AUDIO_V = '4';
