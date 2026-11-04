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
const { validate } = await import(root + "services/validate/index.js");
const html = await readFile(root + "index.html", "utf8");

// 1–3. Content rules shared with builder.html: sample text, phone numbers, dates, tracks, links, photos, thin sections.
const result = validate({ site, copy, roles, stats, tracks, stops, photos, gallery, ask, projects, focus, toolkit });
problems.push(...result.problems);
notes.push(...result.notes);
for (const s of ["your-site.vercel.app", "Jordan Example"]) if (html.includes(s)) bad(`index.html still has placeholder "${s}" (the FILL lines)`);
// 4. Files that must exist.
const need = [];
if (site.resume) need.push(site.resume);
for (const [k, p] of Object.entries(photos)) if (p.src) need.push(p.src);
for (const p of projects) if (p.media) need.push(p.media.video, p.media.poster);
for (const f of need) if (!(await exists(f))) bad(`missing file: ${f}`);
// 5. Link preview for LinkedIn.
const og = html.match(/property="og:image" content="([^"]+)"/)?.[1] ?? "";
if (!og.startsWith("https://")) bad("og:image in index.html must be an absolute https:// URL");
const ogFile = og.replace(/^https:\/\/[^/]+\//, "");
if (ogFile && !(await exists(ogFile))) bad(`og:image file not found locally: ${ogFile} (make a 1200×627 JPG)`);

for (const n of notes) console.log(`[check] note: ${n}`);
if (problems.length) {
  for (const p of problems) console.error(`[check] FIX: ${p}`);
  console.error(`[check] ${problems.length} thing(s) to fix before publishing.`);
  process.exit(1);
}
console.log("[check] all good. Ready to publish.");
