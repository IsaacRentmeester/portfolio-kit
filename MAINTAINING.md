# Maintaining the kit (Isaac's notes)

`CLAUDE.md` here is written **for the person using the kit**, not for Isaac. Maintainer notes live here.

- Source: forked from `~/Desktop/Claude/portfolio` (Isaac's live site) on 2026-10-28. Engine changes made for the kit:
  theme colours/fonts from `config` (applied in `engine/app.js`), accent via `color-mix` instead of hard-coded gold,
  `main.js` split into data loading + `engine/app.js` `start(data)`, `asset()` helper so the single-file build can
  inline images, sections/résumé/projects hide when off or empty, map has a minimum zoom (`minSpan`).
- Sample person "Jordan Example" (UMN Marketing). `tools/check.mjs` fails while any sample text is left.
- After changing the engine or sample content, rebuild the chat template: `node tools/build-single.mjs --template`.
- Make the zip to send: `npm`-free: `zip -r share/portfolio-kit.zip . -x '.git/*' 'dist/*' 'share/*' 'my-info/*' '*.DS_Store'`
  (then add `my-info/README.md` back: `zip share/portfolio-kit.zip my-info/README.md`).
- Dev server: `portfolio-kit` in `~/Desktop/Claude/.claude/launch.json` (port 4848).
- Thresholds (Isaac's call, 2026-10-28): every optional section has a minimum in `config` `thresholds`; below it,
  `services/sections` hides the section and its sidebar link so thin profiles don't get padded. The sample person
  clears every threshold on purpose (hometown is Fargo so the map passes the 150-mile rule).
