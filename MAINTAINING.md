# Maintaining the kit (Isaac's notes)

`AGENTS.md` (the playbook; `CLAUDE.md`/`GEMINI.md` import it) is written **for the person using the kit**, not for Isaac. Maintainer notes live here.

- Source: forked from `~/Desktop/Claude/portfolio` (Isaac's live site) on 2026-10-28. Engine changes made for the kit:
  theme colours/fonts from `config` (applied in `engine/app.js`), accent via `color-mix` instead of hard-coded gold,
  `main.js` split into data loading + `engine/app.js` `start(data)`, `asset()` helper so the single-file build can
  inline images, sections/résumé/projects hide when off or empty, map has a minimum zoom (`minSpan`).
- Sample person "Jordan Example" (UMN Marketing). `tools/check.mjs` fails while any sample text is left.
- After changing the engine, styles, sample content, `chat/prompt.md` or `chat/data-guide.md`, rebuild the any-chatbot route: `node tools/build-single.mjs --builder` (writes builder.html, chat/full-prompt.md, chat/example-data.json). Commit the outputs: people download them.
- Make the zip to send: `npm`-free: `zip -r share/portfolio-kit.zip . -x '.git/*' 'dist/*' 'share/*' 'my-info/*' '*.DS_Store'`
  (then add `my-info/README.md` back: `zip share/portfolio-kit.zip my-info/README.md`).
- Dev server: `portfolio-kit` in `~/Desktop/Claude/.claude/launch.json` (port 4848).
- Thresholds (Isaac's call, 2026-10-28): every optional section has a minimum in `config` `thresholds`; below it,
  `services/sections` hides the section and its sidebar link so thin profiles don't get padded. The sample person
  clears every threshold on purpose (hometown is Fargo so the map passes the 150-mile rule).
- Social thumbnail: `assets/social/thumbnail.html` → headless Chrome `--window-size=1200,627 --screenshot` → `portfolio-kit-thumbnail.jpg` (used on Isaac's LinkedIn project; also good as the GitHub social preview).
- Multi-model (2026-11-04, Isaac's call): works with ChatGPT, Gemini, Claude and others. Agent tools read `AGENTS.md`
  (Codex/Cursor/Copilot natively, Claude via `@AGENTS.md` in CLAUDE.md, Gemini CLI via `@./AGENTS.md` in GEMINI.md).
  Plain chats use `builder.html`: the chatbot only writes JSON; `services/validate` checks it and `services/page`
  assembles the one-file site (same code as `tools/check.mjs` / `tools/build-single.mjs`). Keep `SAMPLE_MARKERS` in
  `services/validate` in sync with the sample person.
