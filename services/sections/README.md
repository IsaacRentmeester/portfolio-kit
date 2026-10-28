# sections service

Decides which sections appear. A section shows only if its `features` flag is on **and** it has enough
real content (`thresholds` in `config/site.config.js`). Thin sections drop off the page and the sidebar
instead of padding it.

- **Input:** `decideSections(data)`, the same data object the engine renders.
- **Output:** `{ show: { focus, career, projects, toolkit, journey, beyond, ask, now, stats }, hidden: [{ key, reason }] }`.
- Hidden sections are logged in the browser console as `[sections] hidden: …` and reported by `node tools/check.mjs`.
