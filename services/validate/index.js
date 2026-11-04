// Validate service: checks a portfolio data object before it's published.
// Input: the same data object the engine renders ({ site, copy, roles, ... }).
// Output: { problems: string[], notes: string[] }. problems = must fix, notes = worth knowing.
// Used by tools/check.mjs (folder route) and builder.html (any-chatbot route). No file access here.
import { decideSections } from "../sections/index.js";

// Text from the sample person. If any of it is still on the page, it isn't theirs yet.
export const SAMPLE_MARKERS = ["Jordan Example", "Northwind", "your-handle", "Marketing Club", "Fargo"];
const YM = /^\d{4}-(0[1-9]|1[0-2])$/;
const PHONE = /\(?\b\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/;
const SAFE_HREF = /^(https?:\/\/|mailto:|#|files\/|photos\/)/i;
const REQUIRED = ["site", "copy", "roles", "stats", "tracks", "stops", "photos", "gallery", "ask", "projects", "focus", "toolkit"];

export function validate(data) {
  const problems = [], notes = [];
  const bad = (m) => problems.push(m), note = (m) => notes.push(m);
  if (!data || typeof data !== "object") return { problems: ["no data found"], notes };
  const missing = REQUIRED.filter((k) => !(k in data));
  if (missing.length) return { problems: [`missing top-level part(s): ${missing.join(", ")}`], notes };
  const { site, roles, stats, tracks, photos } = data;
  const text = JSON.stringify(data);

  // 1. Leftover sample text, and private info.
  for (const s of SAMPLE_MARKERS) if (text.includes(s)) bad(`sample text still in the site: "${s}"`);
  if (PHONE.test(text)) bad("looks like a phone number in the content; remove it");

  // 2. Basics.
  if (!site?.name?.first || !site?.name?.last) bad("site.name needs first and last");
  if (!YM.test(site?.today ?? "")) bad('site.today must be "YYYY-MM" (the current month)');
  if (!String(site?.contact?.linkedin ?? "").includes("linkedin.com/in/")) bad("site.contact.linkedin should be a linkedin.com/in/... link");

  // 3. Roles: same rules as services/career.
  for (const r of roles ?? []) {
    const id = r.id ?? r.title ?? "?";
    for (const k of ["id", "title", "org", "track", "start"]) if (!r[k]) bad(`role "${id}" is missing "${k}"`);
    if (r.start && !YM.test(r.start)) bad(`role "${id}": start must be "YYYY-MM"`);
    if (r.end !== null && r.end !== undefined && !YM.test(r.end)) bad(`role "${id}": end must be "YYYY-MM" or null (present)`);
    if (r.track && !(r.track in (tracks ?? {}))) bad(`role "${id}": track "${r.track}" is not in tracks`);
    if (r.track && !(r.track in (site?.theme?.tracks ?? {}))) bad(`role "${id}": track "${r.track}" has no colour in site.theme.tracks`);
  }
  if ((stats ?? []).length > 4) note("more than 4 stats: the metrics row is built for 3–4");

  // 4. Links: only web, email, page anchors or the site's own files.
  const hrefs = [...text.matchAll(/"(?:href|url|linkedin)":"([^"]*)"/g)].map((m) => m[1]).concat(site?.resume ?? []).filter(Boolean);
  for (const h of hrefs) if (!SAFE_HREF.test(h)) bad(`link not allowed: "${h}" (use https://, mailto: or #section)`);

  // 5. Photos need alt text.
  for (const [k, p] of Object.entries(photos ?? {})) if (p?.src && !p.alt) bad(`photo "${k}" needs alt text (describe the photo)`);
  if (!photos?.headshot?.src) note("no headshot yet");

  // 6. Sections too thin to show (they hide themselves).
  try {
    for (const h of decideSections(data).hidden) note(`hidden (not enough content yet): ${h.reason}`);
  } catch (e) {
    bad(`couldn't read the sections: ${e.message}`);
  }
  return { problems, notes };
}
