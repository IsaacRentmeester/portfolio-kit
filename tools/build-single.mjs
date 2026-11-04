// Builds the one-file outputs. Needs internet once: it runs esbuild through npx.
//   node tools/build-single.mjs             → dist/<first>-<last>.html: your site as ONE file (for vercel.com/drop)
//   node tools/build-single.mjs --builder   → builder.html + chat/full-prompt.md + chat/example-data.json
//                                             (the any-chatbot route; run after changing the engine, styles or sample)
// The page itself is assembled by services/page (shared with builder.html), checks come from services/validate.
// What doesn't carry over into one file: project videos (posters show instead) and the résumé PDF (link a hosted copy).
// Errors start with [single].
import { readFile, writeFile, mkdir, access, readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const builderMode = process.argv.includes("--builder");
const fail = (m) => { console.error(`[single] ${m}`); process.exit(1); };
const exists = (p) => access(root + p).then(() => true, () => false);
const mime = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml" };
const dataUrl = async (f) => `data:${mime[extname(f).toLowerCase()] ?? "application/octet-stream"};base64,${(await readFile(root + f)).toString("base64")}`;
const bundle = (entry) => {
  try {
    return execFileSync("npx", ["--yes", "esbuild@0.24.0", entry, "--bundle", "--format=iife", "--log-level=warning", "--minify"], { cwd: root, encoding: "utf8", maxBuffer: 64 << 20 });
  } catch (e) { fail("esbuild failed (are you online?): " + e.message); }
};

const { assemblePage } = await import(root + "services/page/index.js");
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

const css = (await Promise.all(["tokens", "base", "dev", "depth"].map((n) => readFile(root + `styles/${n}.css`, "utf8")))).join("\n");
const engineJs = bundle("tools/single-entry.js");

if (builderMode) {
  // Every logo, so whatever tools the chatbot lists can show.
  const logos = {};
  for (const f of await readdir(root + "assets/logos")) if (f.endsWith(".svg")) logos[`assets/logos/${f}`] = await dataUrl(`assets/logos/${f}`);
  const guide = await readFile(root + "chat/data-guide.md", "utf8");
  const example = JSON.stringify(data, null, 1);
  const prompt = (await readFile(root + "chat/prompt.md", "utf8"))
    .replace("{{DATA_GUIDE}}", () => guide.replace(/^# .*\n+/, ""))
    .replace("{{EXAMPLE_JSON}}", () => example);
  await writeFile(root + "chat/full-prompt.md", prompt);
  await writeFile(root + "chat/example-data.json", JSON.stringify(data, null, 2) + "\n");

  const kit = JSON.stringify({ css, engineJs, logos, sample: data, prompt }).replace(/</g, "\\u003c");
  const builderCss = await readFile(root + "builder/builder.css", "utf8");
  const html = (await readFile(root + "builder/index.html", "utf8"))
    .replace("__BUILDER_CSS__", () => builderCss)
    .replace("__KIT_JSON__", () => kit)
    .replace("__BUILDER_JS__", () => bundle("builder/app.js").replace(/<\/script/gi, "<\\/script"));
  await writeFile(root + "builder.html", html);
  console.log(`[single] wrote builder.html (${(Buffer.byteLength(html) / 1048576).toFixed(1)} MB), chat/full-prompt.md (${prompt.length} chars), chat/example-data.json`);
} else {
  // Inline every image the page uses as a data: URL, looked up through window.__ASSETS (see components/sections.js).
  const files = new Set();
  for (const p of Object.values(photos)) if (p.src) files.add(p.src);
  for (const p of projects) if (p.media?.poster) files.add(p.media.poster);
  if (site.features.toolkit) for (const g of toolkit.groups) for (const t of g.tools) if (t.logo) files.add(`assets/logos/${t.logo}.svg`);
  const assets = {};
  for (const f of files) {
    if (!(await exists(f))) { console.warn(`[single] skipped missing file: ${f}`); continue; }
    assets[f] = await dataUrl(f);
  }
  if (projects.some((p) => p.media?.video)) console.warn("[single] project videos are left out; their posters show instead");
  if (site.resume && !/^https:\/\//.test(site.resume)) console.warn(`[single] résumé "${site.resume}" only works on a hosted folder. Use a full https:// link or "" for the one file.`);

  const html = assemblePage({ data, assets, css, engineJs: engineJs.replace(/video src="\$\{[^}]+\}"/g, "video") });
  const name = `${site.name.first}-${site.name.last}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  await mkdir(root + "dist", { recursive: true });
  await writeFile(root + `dist/${name}.html`, html);
  const mb = (Buffer.byteLength(html) / 1048576).toFixed(1);
  console.log(`[single] wrote dist/${name}.html (${mb} MB, ${Object.keys(assets).length} images inlined)`);
  if (mb > 8) console.warn("[single] that's big: shrink photos to ~1600px / under 400 KB each");
}
