# journey service

Places the stops from `content/journey.js` on the map and measures the road between them.

- **Input:** `createJourney({ stops, width, height, pad })`.
- **Output:** `{ ok, data: { stops: [...stop, x, y, milesSoFar], totalMiles, width, height } }` or `{ ok:false, error }`.
- **Miles:** straight-line (great-circle) distance between consecutive stops, summed.
- **Errors:** prefixed `[journey]` (fewer than two stops, missing lat/lon).
