// Journey service: validates the stops, projects them onto the map, and measures the road.
// Returns { ok: true, data } or { ok: false, error } — errors are prefixed [journey].
const NAME = "[journey]";
const fail = (m) => { console.warn(`${NAME} ${m}`); return { ok: false, error: `${NAME} ${m}` }; };

const R_MILES = 3958.8;
const rad = (d) => (d * Math.PI) / 180;
export function miles(a, b) {
  const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R_MILES * Math.asin(Math.sqrt(h));
}

// width/height: the map's drawing box. pad: room around the outermost stops.
// minSpan: smallest map width in degrees, so stops a few miles apart don't zoom in to street level.
export function createJourney({ stops, width = 1000, height = 560, pad = 70, minSpan = 9 }) {
  if (!Array.isArray(stops) || stops.length < 2) return { ok: false, error: fail("need at least two stops").error };
  for (const s of stops) {
    if (!s.id || !s.place || typeof s.lat !== "number" || typeof s.lon !== "number") return fail(`stop "${s.id ?? "?"}" needs id, place, lat, lon`);
  }
  // Equirectangular, with longitude squeezed by cos(mid-latitude) so shapes don't stretch.
  const midLat = rad((Math.max(...stops.map((s) => s.lat)) + Math.min(...stops.map((s) => s.lat))) / 2);
  const px = stops.map((s) => ({ ...s, u: s.lon * Math.cos(midLat), v: -s.lat }));
  const widen = ([lo, hi], span) => (hi - lo >= span ? [lo, hi] : [(lo + hi) / 2 - span / 2, (lo + hi) / 2 + span / 2]);
  const [uMin, uMax] = widen([Math.min(...px.map((p) => p.u)), Math.max(...px.map((p) => p.u))], minSpan * Math.cos(midLat));
  const [vMin, vMax] = widen([Math.min(...px.map((p) => p.v)), Math.max(...px.map((p) => p.v))], minSpan * 0.5);
  const scale = Math.min((width - pad * 2) / (uMax - uMin), (height - pad * 2) / (vMax - vMin));
  const offX = (width - (uMax - uMin) * scale) / 2, offY = (height - (vMax - vMin) * scale) / 2;

  let total = 0;
  const placed = px.map((p, i) => {
    if (i) total += miles(px[i - 1], p);
    return { ...p, x: offX + (p.u - uMin) * scale, y: offY + (p.v - vMin) * scale, milesSoFar: Math.round(total) };
  });
  // Same projection for anything else drawn on the map (state outlines, lakes, labels).
  const project = (lon, lat) => [offX + (lon * Math.cos(midLat) - uMin) * scale, offY + (-lat - vMin) * scale];
  return { ok: true, data: { stops: placed, totalMiles: Math.round(total), width, height, project } };
}
