// Page service: assembles the complete one-file website from data + the engine.
// Input:  { data, assets: { "path": "data:..." }, css: string, engineJs: string }
// Output: the full HTML document as a string (no network needed except Google Fonts).
// Pure string work, so the same code runs in Node (tools/build-single.mjs) and in the browser (builder.html).
// Link-preview tags use data.site.url (the live link) when it's set.

const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const safeJson = (v, space) => JSON.stringify(v, null, space).replace(/</g, "\\u003c");

// The readable, editable part of the file: every word, date and setting on the page.
export function dataBlock(data) {
  return `<!-- ===================== PORTFOLIO DATA: edit this block, not the engine below ===================== -->
<script>
/* Everything on the page comes from window.PORTFOLIO. Field guide: chat/data-guide.md in the Portfolio Kit. */
window.PORTFOLIO = ${safeJson(data, 2)};
</script>
<!-- ===================== END PORTFOLIO DATA ===================== -->`;
}

export function assemblePage({ data, assets = {}, css, engineJs }) {
  const { site, copy } = data;
  const name = `${site.name.first} ${site.name.last}`.trim();
  const initials = (site.monogram || `${site.name.first?.[0] ?? ""}${site.name.last?.[0] ?? ""}`).slice(0, 3);
  const desc = copy?.intro?.line || site.description || "";
  const url = /^https:\/\//.test(site.url ?? "") ? site.url.replace(/\/?$/, "/") : "";
  const ogImage = url && site.ogImage ? new URL(site.ogImage, url).href : "";
  const bg = site.theme?.colors?.bg ?? "#12060a";
  const accent = site.theme?.colors?.accent ?? "#ffcc33";
  const mark = site.theme?.colors?.["accent-2"] ?? "#7a0019";
  const icon = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='${mark}'/><text x='4' y='23' font-family='sans-serif' font-weight='700' font-size='17' fill='${accent}'>${esc(initials)}</text></svg>`)}`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(name)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="theme-color" content="${esc(bg)}">
  <meta property="og:type" content="profile">
  <meta property="og:title" content="${esc(name)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta name="twitter:card" content="${ogImage ? "summary_large_image" : "summary"}">${url ? `
  <link rel="canonical" href="${esc(url)}">
  <meta property="og:url" content="${esc(url)}">` : ""}${ogImage ? `
  <meta property="og:image" content="${esc(ogImage)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="627">
  <meta property="og:image:alt" content="${esc(name)}">` : ""}
  <link rel="icon" href="${icon}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <style>
${css}
  </style>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <div id="app"><noscript><p style="padding:2rem">${esc(name)}. ${esc(desc)} This page needs JavaScript.</p></noscript></div>
${dataBlock(data)}
<script>window.__ASSETS=${safeJson(assets)};</script>
<script>
${engineJs.replace(/<\/script/gi, "<\\/script")}
</script>
</body>
</html>
`;
}
