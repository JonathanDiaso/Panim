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
// The service worker keys its offline copies by pathname AND this number, so bumping
// one language drops only that language's saved chapters (sw.js, akey).
// v2 = the English tape re-edited and cleaned, 2026-09-19.
// v3 = the Spanish chapters 1, 7 and 10 rebuilt to follow it, same day.
// v4 = the hiss taken off both recordings and both re-encoded at 192 kbps, 2026-09-19:
// the reader's room tone (-69 -> -83 dB in the gaps) and the piano's own tape hiss.
// Same takes, same lengths, same cues -- only the noise between the words is different.
// v5 (en) = English re-done, 2026-09-20, because v4 was wrong in a way the author heard.
// v4's denoiser only removed noise where noise was the loudest thing in the frame,
// which is the pauses: it emptied them to -116 dB and left the hiss under the voice
// untouched, so the floor switched on with every word (12.7 dB step against the
// master's own 2.1) and its musical noise rose from 6.9 to 10.2 dB of bin flicker.
// v5 subtracts ONE fixed noise profile from every frame alike -- the floor drops the
// same amount everywhere and never switches (step 3.0-4.8 dB) -- and de-esses, which
// nothing in this pipeline had ever done: the reader's sibilants peaked 1.9-6.2 dB
// under his own speaking level and now sit 6.6-10.6 under. Spanish stayed at v4 and
// is not re-requested at all -- see the note on the two keys below.
//
// ONE NUMBER PER LANGUAGE, not one for the site. Until 2026-09-20 this was a single
// string, so re-cutting the English tape also changed every Spanish URL: a Spanish
// listener re-downloaded 500 MB of bytes that were identical to the ones already on
// the phone, and the service worker (which renamed its whole audio cache to match)
// threw away every chapter either language had saved for offline. Nothing about the
// Spanish recording had changed. A key here moves only when the files under that
// key's folder are replaced -- en = audio/music/, es = audio/es/.
//
// These are CACHE KEYS, not master names, and they only ever go forward. es is 5 and
// not 4 although the Spanish master is the 2026-09-19 one: the site spent a day serving
// Spanish at ?v=5 under the old shared number, so every copy already on a phone is
// keyed 5, and moving it back to 4 would force exactly the re-download this change
// exists to stop. It moves next when the Spanish recording does.
// v6 (en) = chapter 1 re-cleaned, 2026-09-24: mouth clicks rebuilt out, the hiss taken
// out of the pauses and word tails only (the voice itself is the recording, sample for
// sample, while it speaks -- a denoiser on the words took the air off the esses), and
// the room let fall away with the voice instead of held and cut. Same takes, same length
// (1399.93 s), same cues. Chapters 2-10 follow as they are redone.
// v7 (en) = all ten chapters through that same clean-up, and new music, 2026-09-24: a 10 s
// piano opening heard from the first second (musicOffset 10.0), the piano levelled so it
// neither blurts nor vanishes under the voice and sits ~3 dB lower, a softer 9 s close,
// and the file ends 0.5 s after it (no dead air before the next chapter). Voice lengths and
// cues unchanged; every speech frame within 0.04 dB of the recording.
// v8 (en) = v7 fixed, 2026-09-25. The author heard chapter 9 as "trash": the transcript had put a
// full stop at nearly every pause of chapters 4 and 9, so the sentence ride moved the voice phrase
// by phrase (471 level changes in ch 9) -- now grouped into real sentences. And every chapter now
// opens and closes with the same piano (chapter 1's), its own music in between. Same lengths, cues.
// v9 (en) = v8 with the hiss gone, 2026-09-26. The author heard a faint hiss under the voice
// (ch 9 "exactly what happened") in every chapter: cleanup had only touched the pauses, so the
// hiss switched on with each phrase and off after it. Now the denoised voice throughout (their
// pick, "F sounds like me"), with the recording itself back wherever denoising made a sound
// quieter (guard.py): no speech frame more than 0.9 dB under the recording. Same lengths, cues.
self.PANIM_AUDIO_V = { en: '9', es: '5' };
