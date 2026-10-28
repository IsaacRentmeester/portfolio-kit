// Sections service: decides which sections have enough real content to show.
// Input: the data object + site.thresholds. Output: { show: { key: bool }, hidden: [{ key, reason }] }.
// A section shows only when its feature flag is on AND it clears its threshold, so a thin
// section disappears (and its sidebar link with it) instead of padding the page. Notes start with [sections].
import { miles } from "../journey/index.js";

const n = (a) => (Array.isArray(a) ? a.length : 0);
const real = (s) => typeof s === "string" && s.trim().length > 0;

export function decideSections(data) {
  const { site, copy, roles, stats, stops, photos, gallery, ask, projects, focus, toolkit } = data;
  const t = site.thresholds ?? {};
  const f = site.features;
  const tools = (toolkit?.groups ?? []).reduce((sum, g) => sum + n(g.tools), 0);
  const route = (stops ?? []).reduce((sum, s, i) => (i ? sum + miles(stops[i - 1], s) : 0), 0);
  const shots = (gallery?.keys ?? []).filter((k) => real(photos?.[k]?.src));
  const lifeBits = n(copy.life?.facts) + (real(copy.life?.text) ? 1 : 0) + shots.length;

  // key: [feature flag, passes threshold?, reason when it doesn't]
  const rules = {
    focus: [f.focus, n(focus?.timeline) >= (t.focusItems ?? 2), `focus needs ${t.focusItems ?? 2}+ timeline items`],
    career: [f.career, roles.filter((r) => r.inChart !== false).length >= (t.chartRoles ?? 3), `career chart needs ${t.chartRoles ?? 3}+ roles`],
    projects: [true, n(projects) >= (t.projects ?? 2), `projects needs ${t.projects ?? 2}+ projects`],
    toolkit: [f.toolkit, tools >= (t.toolkitTools ?? 5), `toolkit needs ${t.toolkitTools ?? 5}+ tools`],
    journey: [f.journey, n(stops) >= (t.mapStops ?? 3) && route >= (t.mapMiles ?? 150), `map needs ${t.mapStops ?? 3}+ stops and ${t.mapMiles ?? 150}+ miles of travel`],
    beyond: [f.beyond, lifeBits >= (t.beyondItems ?? 3), `beyond needs ${t.beyondItems ?? 3}+ of: text, facts, photos`],
    ask: [f.ask, n(ask?.items) >= (t.askItems ?? 3), `ask me needs ${t.askItems ?? 3}+ questions`],
    now: [f.now, n(copy.now?.items) >= (t.nowItems ?? 2), `right now card needs ${t.nowItems ?? 2}+ lines`],
    stats: [true, n(stats) >= (t.stats ?? 3), `metrics row needs ${t.stats ?? 3}+ numbers`],
  };

  const show = {}, hidden = [];
  for (const [key, [on, enough, reason]] of Object.entries(rules)) {
    show[key] = Boolean(on) && enough;
    if (on && !enough) hidden.push({ key, reason });
  }
  return { show, hidden };
}
