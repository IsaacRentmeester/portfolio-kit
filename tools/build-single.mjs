// Builds the whole site into ONE self-contained HTML file: dist/<first>-<last>.html
// Usage: node tools/build-single.mjs              (needs internet once: it runs esbuild through npx)
//        node tools/build-single.mjs --template   sample copy with every logo inlined → chat-template/portfolio-template.html
//                                                 (the file people upload to a claude.ai chat when they don't use Claude Code)
// Use it to publish as a claude.ai artifact, to drop on Netlify Drop, or to email/AirDrop the page.
// What doesn't carry over: project videos (posters show instead) and the résumé PDF (link a hosted copy instead).
// Errors start with [single].
import { readFile, writeFile, mkdir, access, readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const template = process.argv.includes("--template");
const fail = (m) => { console.error(`[single] ${m}`); process.exit(1); };
const exists = (p) => access(root + p).then(() => true, () => false);
const mime = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml" };

const { site } = await import(root + "config/site.config.js");
const copy = { ...(await import(root + "content/copy.js")) };
const { roles, stats, tracks } = await import(root + "content/profile.js");
const { stops } = await import(root + "content/journey.js");
const { photos, gallery } = await import(root + "content/photos.js");
const { ask } = await import(root + "content/ask.js");
const { projects } = await import(root + "content/projects.js");
const { focus } = await import(root + "content/focus.js");
const { toolkit } = await import(root + "content/toolkit.js");
const data = { site, copy, roles, stats, tracks, stops, photos, gallery, ask, projects, focus, toolkit };

// 1. Bundle the engine into one script. Content goes in separately as a readable data block (step 3).
let js;
try {
  js = execFileSync("npx", ["--yes", "esbuild@0.24.0", "tools/single-entry.js", "--bundle", "--format=iife", "--log-level=warning", "--minify"], { cwd: root, encoding: "utf8", maxBuffer: 64 << 20 });
} catch (e) { fail("esbuild failed (are you online?): " + e.message); }

// 2. Inline every image the page uses as a data: URL, looked up through window.__ASSETS (see components/sections.js).
const files = new Set();
for (const p of Object.values(photos)) if (p.src) files.add(p.src);
for (const p of projects) if (p.media?.poster) files.add(p.media.poster);
if (template) for (const f of await readdir(root + "assets/logos")) { if (f.endsWith(".svg")) files.add(`assets/logos/${f}`); }
else if (site.features.toolkit) for (const g of toolkit.groups) for (const t of g.tools) if (t.logo) files.add(`assets/logos/${t.logo}.svg`);
const assets = {};
let bytes = 0;
for (const f of files) {
  if (!(await exists(f))) { console.warn(`[single] skipped missing file: ${f}`); continue; }
  const buf = await readFile(root + f);
  bytes += buf.length;
  assets[f] = `data:${mime[extname(f).toLowerCase()] ?? "application/octet-stream"};base64,${buf.toString("base64")}`;
}
// Project videos can't be inlined at a sane size: drop them so the poster shows.
if (projects.some((p) => p.media?.video)) console.warn("[single] project videos are left out; their posters show instead");
js = js.replace(/video src="\$\{[^}]+\}"/g, 'video');
if (site.resume) console.warn(`[single] résumé button points to "${site.resume}", which only works on a hosted site. Set resume to a full https:// link or "" for the single file.`);

// The editable part: every word, date and setting on the page, in one block near the top of <body>.
function dataBlock() {
  const json = JSON.stringify(data, null, 2).replace(/<\//g, "<\\/");
  return `<!-- ===================== PORTFOLIO DATA: edit this block, not the engine below ===================== -->
<script>
/* Everything on the page comes from window.PORTFOLIO. The engine script further down never needs editing.
   site     name, contact.linkedin, resume ("" hides it), theme.colors / theme.tracks (colours), features (true/false per section)
   copy     intro (sidebar title, one-liner, status), about.paragraphs, now (Right now card), life (Beyond text + facts), footer, headings
   roles    jobs/leadership/school, newest first: id, track, section, title, org, place, start "YYYY-MM", end "YYYY-MM" or null, summary, points[], tags[]
   stats    3-4 real numbers: { count, decimals?, prefix?, suffix?, label } or { liveDaysSince: "YYYY-MM-DD", label }
   tracks   track key -> label (every key needs a colour in site.theme.tracks)
   stops    map stops, oldest first: id, place, lat, lon, when, title, text, label ("above"/"below"/"left"/"right"), photo?
   photos   key -> { src, alt, w, h }  (src "" = no photo; in this single file, images live in window.__ASSETS)
   gallery  { keys: [up to 3 photo keys for Beyond] }
   ask      { heading, note, items: [{ q, a, link: { label, href } }] }
   projects [{ title, when, for, text, result, tags[], link? }]   first one is featured
   focus    { startedOn, label, lead ({days}/{projects} fill in), timeline: [{ when, text }], club: { heading, note, url ("" hides) } }
   toolkit  { heading, more, groups: [{ label, tools: [{ name, logo? | mark, brand }] }] }   logo only if it is in __ASSETS */
window.PORTFOLIO = ${json};
</script>
<!-- ===================== END PORTFOLIO DATA ===================== -->`;
}

// 3. Inline the CSS and stitch the page together. The script goes at the end of <body> so #app exists.
const css = (await Promise.all(["tokens", "base", "dev", "depth"].map((n) => readFile(root + `styles/${n}.css`, "utf8")))).join("\n");
let html = await readFile(root + "index.html", "utf8");
html = html
  .replace(/\s*<link rel="stylesheet" href="styles\/[^"]+">/g, "")
  .replace(/\s*<script type="module" src="main.js"><\/script>/, () => `\n  <style>\n${css}\n  </style>`)
  .replace("</body>", () => `${dataBlock()}\n<script>window.__ASSETS=${JSON.stringify(assets)};</script>\n<script>\n${js.replace(/<\/script/gi, "<\\/script")}\n</script>\n</body>`);

const name = `${site.name.first}-${site.name.last}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
const out = template ? "chat-template/portfolio-template.html" : `dist/${name}.html`;
await mkdir(root + out.split("/")[0], { recursive: true });
await writeFile(root + out, html);
const mb = (Buffer.byteLength(html) / 1048576).toFixed(1);
console.log(`[single] wrote ${out} (${mb} MB, ${Object.keys(assets).length} images inlined)`);
if (mb > 8) console.warn("[single] that's big: shrink photos to ~1600px / under 400 KB each");
