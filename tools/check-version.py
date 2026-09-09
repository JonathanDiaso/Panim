#!/usr/bin/env python3
"""Prove SHELL, ASSET_V and every ?v= on the site agree.

WHY THIS EXISTS. Four places move on a version bump and nothing checked them.
docs/FRONT-DOOR.md 3.1 lists the four and NEXT.md carried it as an invariant --
"they drifted four versions once and offline silently stopped precaching" -- and
then on 2026-09-09 they drifted again, one version, in the v73 bump: SHELL and
every ?v= went to 73 and ASSET_V stayed at 72.

WHAT THE DRIFT ACTUALLY COSTS, because it is not obvious from reading sw.js.
The worker precaches `u + '?v=' + ASSET_V` while the page requests `?v=<the
number in index.html>`. Different URL, different cache key: every precached
asset becomes a miss and the site stops working offline. Nothing throws, nothing
logs, and the site looks perfect online -- which is the same trap js/offline.js
was written for one version earlier.

A number a human has to keep in step in four files is a number that will drift.
Run this after any bump; it exits non-zero and names the disagreement.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ["index.html", "accessibility.html", "404.html"]


def main() -> int:
    sw = (ROOT / "sw.js").read_text(encoding="utf-8")

    shell = re.search(r"var SHELL\s*=\s*'panim-shell-v(\d+)'", sw)
    asset = re.search(r"var ASSET_V\s*=\s*'(\d+)'", sw)
    if not shell or not asset:
        print("!! could not find SHELL and/or ASSET_V in sw.js -- has it been renamed?")
        return 2

    found = {"sw.js SHELL": {shell.group(1)}, "sw.js ASSET_V": {asset.group(1)}}
    for name in PAGES:
        p = ROOT / name
        if not p.exists():
            continue
        # a page with no versioned asset at all is reported, not skipped: 404.html
        # having lost its ?v= is itself the kind of thing this is looking for
        found[name] = set(re.findall(r"\?v=(\d+)", p.read_text(encoding="utf-8"))) or {"(none)"}

    every = set().union(*found.values())
    for where, versions in found.items():
        print("  %-22s -> %s" % (where, ", ".join(sorted(versions))))

    if len(every) == 1:
        print("\nversion v%s, agreed in every place" % every.pop())
        return 0

    print("\n!! VERSION DRIFT: %s" % ", ".join(sorted(every)))
    print("   All four move together or the service worker precaches URLs the page")
    print("   never requests, and the site silently stops working offline.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
