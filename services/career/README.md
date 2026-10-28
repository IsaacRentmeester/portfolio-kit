# career service

Turns `content/profile.js` roles into the data behind the career chart.

- **Input:** `createCareer({ roles, tracks, today: "YYYY-MM" })`.
- **Output:** `{ ok, data }` / `{ ok:false, error }`.
  - `series()` → `{ points: [{ i, label, value, active }], events, first, last, max }`.
  - `at(0..1)` → the month nearest that position, plus the roles active then.
- **The number:** months of experience stacked. Each month adds one per role running that month, so overlapping roles make the line climb faster. Roles with `inChart: false` are left out.
- **Errors:** prefixed `[career]` (bad date format, unknown track, missing field).
