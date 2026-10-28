// Pre-publish check. Usage: node tools/check.mjs
// Loads config + content the same way the page does and fails loudly on anything that would look broken or leak.
// Errors start with [check]. Exit code 1 = fix before publishing.
import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const exists = (p) => access(root + p).then(() => true, () => false);
const problems = [], notes = [];
const bad = (m) => problems.push(m), note = (m) => notes.push(m);

const { site } = await import(root + "config/site.config.js");
const { roles, tracks, stats } = await import(root + "content/profile.js");
const { projects } = await import(root + "content/projects.js");
const { photos, gallery } = await import(root + "content/photos.js");
const { stops } = await import(root + "content/journey.js");
const { focus } = await import(root + "content/focus.js");
const copy = { ...(await import(root + "content/copy.js")) };
const { ask } = await import(root + "content/ask.js");
const { toolkit } = await import(root + "content/toolkit.js");
const { decideSections } = await import(root + "services/sections/index.js");
const html = await readFile(root + "index.html", "utf8");
const all = (await Promise.all(["config/site.config.js", "content/profile.js", "content/copy.js", "content/projects.js",
  "content/ask.js", "content/journey.js", "content/focus.js", "content/toolkit.js", "index.html"].map((f) => readFile(root + f, "utf8")))).join("\n");

// 1. Sample data left behind.
for (const s of ["Jordan Example", "Northwind", "your-handle", "your-site.vercel.app", "Marketing Club", "Fargo"]) {
  if (all.includes(s)) bad(`sample text still in the site: "${s}"`);
}
// 2. Private info that shouldn't be public.
if (/\(?\b\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/.test(all)) bad("looks like a phone number in the content; remove it");
// 3. Roles: dates and tracks (same rules as services/career).
const YM = /^\d{4}-(0[1-9]|1[0-2])$/;
for (const r of roles) {
  if (!YM.test(r.start) || (r.end !== null && !YM.test(r.end))) bad(`role "${r.id}": dates must be "YYYY-MM" (end: null = present)`);
  if (!(r.track in tracks)) bad(`role "${r.id}": track "${r.track}" is not in tracks`);
  if (!(r.track in site.theme.tracks)) bad(`role "${r.id}": track "${r.track}" has no colour in config theme.tracks`);
}
if (!YM.test(site.today)) bad(`config today must be "YYYY-MM"`);
if (stats.length > 4) note("more than 4 stats: the metrics row is built for 3–4");
// 4. Files that must exist.
const need = [];
if (site.resume) need.push(site.resume);
for (const [k, p] of Object.entries(photos)) if (p.src) need.push(p.src);
for (const p of projects) if (p.media) need.push(p.media.video, p.media.poster);
for (const f of need) if (!(await exists(f))) bad(`missing file: ${f}`);
for (const [k, p] of Object.entries(photos)) if (p.src && !p.alt) bad(`photo "${k}" needs alt text`);
if (!photos.headshot?.src) note("no headshot yet (photos.headshot.src)");
// Sections below their threshold drop off the page on their own. Say which, so nothing vanishes by surprise.
const { hidden } = decideSections({ site, copy, roles, stats, stops, photos, gallery, ask, projects, focus, toolkit });
for (const h of hidden) note(`hidden (not enough content yet): ${h.reason}. Add more, lower it in config thresholds, or turn the feature off.`);
// 5. Link preview for LinkedIn.
const og = html.match(/property="og:image" content="([^"]+)"/)?.[1] ?? "";
if (!og.startsWith("https://")) bad("og:image in index.html must be an absolute https:// URL");
const ogFile = og.replace(/^https:\/\/[^/]+\//, "");
if (ogFile && !(await exists(ogFile))) bad(`og:image file not found locally: ${ogFile} (make a 1200×627 JPG)`);
if (!site.contact.linkedin.includes("linkedin.com/in/")) bad("contact.linkedin should be your linkedin.com/in/... URL");

for (const n of notes) console.log(`[check] note: ${n}`);
if (problems.length) {
  for (const p of problems) console.error(`[check] FIX: ${p}`);
  console.error(`[check] ${problems.length} thing(s) to fix before publishing.`);
  process.exit(1);
}
console.log("[check] all good. Ready to publish.");
