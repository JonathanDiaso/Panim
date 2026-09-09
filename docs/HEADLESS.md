# 🔬 TESTING THIS SITE IN A HEADLESS BROWSER

**Moved out of `README.md` §6, 2026-09-07.** It is live instruction, not history — it is
here because it is a procedure, and `README.md` describes the repo.

---

🛑 **Ten traps, every one of which produced a wrong conclusion at least once.** Traps 5,
6, 7, 9 and 10 each produced a *reported fault that was not there* — and trap 7's fault was in
the harness's own conclusion about trap 4. Read this before reporting anything visual as
broken.

1. **The headless viewport has a 500px floor.** `--window-size=402,844` renders the page
   at **500px wide and crops it** — it does not narrow the layout. Measured:
   `documentElement.clientWidth` returned 500 at requested widths of 402, 375 *and* 320.
   **Phone testing must use a same-origin iframe sized in CSS pixels**, with the outer
   window at 500 or more.
2. **A first visit opens `#onboarding-modal` over everything**, so a screenshot of "the
   site" is a screenshot of the modal. Set `localStorage['panim:onboarded'] = '1'` from a
   script in `<head>`, before `js/ui.js` runs.
3. **The chapters are rendered by `js/render.js` after load.** Waiting for any `[data-ch]`
   matches the *static* hero and fires before the book exists. Wait for
   `.section[data-ch="1"]`.
4. **`--screenshot` races an `addEventListener('load')` handler**, but
   `--virtual-time-budget` genuinely does advance timers — verified with a page that
   repaints after 2s. Do the work on a short `setInterval` inside the harness.
5. **`Input.dispatchKeyEvent` needs `text` before Enter or Space will activate
   anything.** Without `text: '\r'` (and `unmodifiedText`) Chrome delivers `keydown` but
   never generates the `keypress` that runs a control's default action. `rawKeyDown` does
   not work either; the type must be `keyDown`. **Every button on the site looked broken
   and every one of them worked in a browser.** Tab is unaffected, which is what makes
   this convincing — the tab order comes back correct while nothing activates.
6. **`document.visibilityState` can flip to `hidden` mid-session, which correctly
   suspends every `requestAnimationFrame`.** For ten minutes it looked as though every
   overlay after the first one failed to take focus — reproducible six times running. It
   was rAF, suspended, because the page had gone hidden. **Read
   `document.visibilityState` before believing any timing result out of headless**, and
   note that `Page.startScreencast` does *not* fix it.

7. 🆕 **A `file://` harness cannot reach into an `http://localhost` iframe (2026-08-29).**
   Different origins, so `contentDocument` is **null**, the `load` handler throws on its
   first property access, and **nothing in the harness runs** — no dismiss, no scroll, no
   measurement. The screenshot comes back looking *wrong* (the onboarding modal, the top of
   the page) rather than broken, so it reads as a site fault. **Serve the harness from the
   same origin — `http://localhost:8899/`, beside the site.**
   > 🛑 **It disguises itself as trap 4.** From the outside this is indistinguishable from
   > *"`setInterval` is starved under `--virtual-time-budget`"*, and that is exactly the
   > conclusion round fourteen reached and nearly wrote into its invariants — **while trap 4
   > above already said the opposite.** Re-tested same-origin: **the interval ticks nine
   > times in a ten-second budget.** Trap 4 is correct and stands. **The contradiction with
   > this file is what caught it**, which is the argument for reading §6 before adding to it.
8. ⚠️ **Deep sections do not paint in a headless screenshot at all**, because they carry
   `content-visibility`. Scrolling to `#lexicon` or `#scripture` and shooting gives a blank
   frame however long the virtual-time budget is. **Measure with `getBoundingClientRect` and
   dump the numbers — do not try to photograph them.** That is this project's standing rule
   anyway: the section height is *measured* after every layout change, not looked at.

9. 🛑 **`requestAnimationFrame` and `IntersectionObserver` deliver ZERO callbacks here,
   and a transition therefore reports its START value forever.** Proven 2026-08-30 on a
   *minimal* page — one 50px div in view, `visibilityState: 'visible'`, no site code at
   all — which returned `IO callbacks=0 rafs=0`. Every rendering-lifecycle callback is
   dead in this configuration.

   > 🛑 **The second half is what actually bites.** `getComputedStyle` on a transitioned
   > property returns the value the transition is animating *from*, and that transition
   > can never advance — so a rule that applied perfectly reads back as a rule that did
   > not apply. On 2026-08-30 this reported `--lex-ink: 0%` where the rule says `112%`
   > and `opacity: 1` where the rule says `0`, and both looked exactly like broken CSS.
   > **Inject `* { transition: none !important }` and read again: the computed value is
   > then the TARGET, which is the thing under test.** Both came back correct.
   >
   > It also means **an `IntersectionObserver`-triggered effect cannot be verified
   > end-to-end here at all.** Verify the CSS state machine by toggling the classes by
   > hand, say so, and leave the trigger to a real browser. This is trap 4's family: the
   > browser is not running the frame loop, so anything that waits for a frame waits
   > forever.

10. 🆕 **`python3 -m http.server` MAKES THE AUDIO UNTESTABLE — 2026-09-09.** It types
    `.m4a` as `audio/mp4a-latm` and ignores Range, so `readyState` stays **0** and **no
    `MediaError` is ever raised.** Testing the offline warning on it reported
    `data-state="playing"` with the network emulated off and *no error object at all*,
    which reads as "the player never notices a failed load" — a fault in the site that was
    not there. **Use `python3 tools/serve.py` (port 8899).** `README.md` has said this for
    weeks, four hundred lines from where it was needed.
    > 🛑 **The real behaviour it was hiding is worth more than the trap.** On `serve.py`,
    > with the network genuinely off, an **uncached chapter still does not fire `error`** —
    > it stalls at `readyState 0` indefinitely. A media element is not obliged to tell you it
    > failed. That is why `js/player.js` refuses a provably-impossible load up front
    > (`PanimOffline.blocked()`) and arms a twelve-second stall watchdog for the rest.
    > **Never wait on `error` as your only evidence that audio failed.**
    > ⚠️ And register the worker by hand in a test: `index.html` only registers it on
    > `https:`, so on `localhost` there is no service worker unless you ask for one.

⚠️ **And one that is not the browser: a contrast probe must composite alpha.** Walking up
for a background colour and stopping at the first non-transparent one reads
`rgba(25,21,16,.03)` — a 3% tint — as near-black, and turns a **4.91:1 pass into a 2.92:1
failure that is not there.** Composite every translucent layer down to the opaque one
underneath.

> 🛑 **The rule under all eleven: a measurement that says something is broken is a claim
> about the MEASUREMENT until the measurement has itself been checked.** Three separate
> "faults" were reported by the harness in one evening on 2026-08-29 — a contrast
> failure, a dead Enter key, and every overlay losing focus — and **all three were the
> harness.** Two more followed on 2026-08-30, both from trap 9, and both were the harness.

🆕 **To actually SEE a deep section (trap 8), extract it rather than scroll to it.** Read the
section's rendered `outerHTML` out of the live page, write it into a standalone document that
links the same three stylesheets, and screenshot *that*. It paints, because it is no longer
deep. It is how the Lexicon wall, the sources page and the names index were checked on
2026-08-30 — and it is the only way this project has ever got a real picture of the back
matter.

**Measuring, not eyeballing, is what found every fault in §5.** The three that a
screenshot could never have shown:

```js
// which grid items overflow the six-column mobile grid (finds the 3/9-with-no-range bug)
getComputedStyle(section).gridTemplateColumns.split(/\s+/).length   // must be 6 at ≤900px

// which font subsets are actually reached (diff this against the precache list in sw.js)
performance.getEntriesByType('resource').filter(r => /woff2/.test(r.name))

// what a translucent ink really composites to — an opacity on text is an unmeasured colour
```

Reduced motion is checked with `--force-prefers-reduced-motion=reduce`, and an override
must be written at the **specificity of the rule it overrides**.

---

## 🧰 THE HARNESS ITSELF — `_shot.html`

`_*.html` is in `.gitignore` **on purpose**: a harness must be served from this origin to
reach the page's DOM, so it lives in the repo root and is never committed. Rebuild it when
you need it — it is twenty lines, and every one of them is a trap this file already names.

```html
<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;background:#fff}iframe{border:0;display:block}</style>
<iframe id="f"></iframe>
<script>
// state BEFORE the frame loads, or the page reads an empty localStorage and
// paints the first-visit invitation over whatever you came to look at
try { localStorage.setItem('panim:onboarded', '1'); } catch (e) {}
var p = new URLSearchParams(location.search), f = document.getElementById('f');
f.src = '/index.html';
f.style.width = (+p.get('w') || 1440) + 'px';
f.style.height = (+p.get('h') || 900) + 'px';
f.addEventListener('load', function () {
  var d = f.contentDocument, w = f.contentWindow;
  w.__errs = []; w.addEventListener('error', function (e) { w.__errs.push(String(e.message)); });
  var kill = d.createElement('style');            // transitions read the OLD value
  kill.textContent = '*,*::before,*::after{transition:none!important;animation:none!important}'
    + 'html{scroll-behavior:auto!important}.reveal{opacity:1!important;transform:none!important}';
  d.head.appendChild(kill);
  setTimeout(function () {
    var el = d.querySelector(p.get('sel') || '#sources');
    if (el) w.scrollTo(0, el.getBoundingClientRect().top + w.scrollY - 40);
    document.title = 'READY ' + JSON.stringify({ errors: w.__errs /* + your measurements */ });
  }, 2500);
});
</script>
```

**Then, with `python3 tools/serve.py` running:**

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1460,960 --virtual-time-budget=12000 \
  --screenshot=out.png "http://localhost:8899/_shot.html?w=1440&h=900&sel=%23sources"
```

🛑 **THE IFRAME IS WHY IT WORKS AT PHONE WIDTHS.** `--window-size` will not go to 402px
(trap 1 above). The frame will, and the page inside it believes it.

🛑 **MEASUREMENTS COME BACK IN `document.title`**, read with `--dump-dom | grep -o 'READY[^<]*'`.
A `<pre>` appended to the harness would be captured in the screenshot; the title is not.

⚠️ **`--virtual-time-budget` MUST EXCEED THE `setTimeout`**, or Chrome shoots the page before
the render settles and you photograph a half-built section. 2500ms wait, 12000ms budget.

