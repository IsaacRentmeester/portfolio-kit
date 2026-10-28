// Career service: turns role dates into a month-by-month series for the chart.
// value(t) = total months logged across every chart role up to month t (concurrent roles stack).
import { ok, fail, validateRoles } from "./contract.js";

const toIndex = (ym) => { const [y, m] = ym.split("-").map(Number); return y * 12 + (m - 1); };
const toLabel = (i) => new Date(Math.floor(i / 12), i % 12, 1).toLocaleString("en-US", { month: "short", year: "numeric" });

export function createCareer({ roles, tracks, today }) {
  const checked = validateRoles(roles, Object.keys(tracks));
  if (!checked.ok) return { status: checked, series: () => checked, at: () => checked };

  const now = toIndex(today);
  const chartRoles = roles.filter((r) => r.inChart).map((r) => ({
    ...r, s: toIndex(r.start), e: r.end ? toIndex(r.end) : now,
  }));
  const first = Math.min(...chartRoles.map((r) => r.s));

  const points = [];
  let total = 0;
  for (let i = first; i <= now; i++) {
    const active = chartRoles.filter((r) => i >= r.s && i <= r.e);
    total += active.length;
    points.push({ i, label: toLabel(i), value: total, active: active.map((r) => r.id) });
  }
  // Start markers: the month each role began.
  const events = chartRoles.map((r) => ({ id: r.id, i: r.s, track: r.track })).sort((a, b) => a.i - b.i);

  return {
    status: checked,
    series: () => ok({ points, events, first, last: now, max: total }),
    // Point nearest to a 0–1 position along the timeline.
    at(fraction) {
      if (typeof fraction !== "number" || Number.isNaN(fraction)) return fail("at() needs a number from 0 to 1");
      const k = Math.round(Math.min(1, Math.max(0, fraction)) * (points.length - 1));
      return ok({ ...points[k], index: k, roles: chartRoles.filter((r) => points[k].active.includes(r.id)) });
    },
  };
}
