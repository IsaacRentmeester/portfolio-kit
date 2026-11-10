// Builder app: the any-chatbot route. Paste the JSON a chatbot wrote, add photos, preview, download a ready-to-drop zip.
// Uses the same services as the folder route: validate (checks) and page (assembles the site).
// Kit data (engine, CSS, logos, sample, prompt) is embedded at build time as window.__KIT (tools/build-single.mjs --builder).
// Errors show in the page; console messages start with [builder].
import { validate } from "../services/validate/index.js";
import { assemblePage } from "../services/page/index.js";
import { createZip } from "../services/zip/index.js";

const KIT = window.__KIT;
const $ = (s) => document.querySelector(s);
const STORE = "portfolio-kit:json";
const PHOTO_KEYS = [
  { key: "headshot", label: "Headshot", hint: "Face centred" },
  { key: "one", label: "Photo 1", hint: "Beyond the classroom" },
  { key: "two", label: "Photo 2", hint: "Beyond the classroom" },
  { key: "three", label: "Photo 3", hint: "Beyond the classroom" },
];

const state = { data: null, photos: {}, html: "" }; // photos: key -> { dataUrl, w, h }

// ---------- Step 1: copy the prompt ----------
$("#copy-prompt").addEventListener("click", async () => {
  const ok = await copy(KIT.prompt);
  flash($("#copy-prompt"), ok ? "Copied ✓" : "Select the text below and copy it");
  if (!ok) $("#prompt-fallback").hidden = false;
});
$("#prompt-text").value = KIT.prompt;

// ---------- Step 2: paste and check the JSON ----------
const input = $("#json");
try { input.value = localStorage.getItem(STORE) ?? ""; } catch {}
input.addEventListener("input", () => { try { localStorage.setItem(STORE, input.value); } catch {} });
$("#check").addEventListener("click", check);
$("#load-sample").addEventListener("click", () => { input.value = JSON.stringify(KIT.sample, null, 2); check(); });

function check() {
  const out = $("#report");
  const parsed = parse(input.value);
  if (parsed.error) return report(out, [parsed.error], [], false);
  state.data = parsed.data;
  const { problems, notes } = validate(withPhotos(state.data));
  const isSample = problems.some((p) => p.startsWith("sample text"));
  report(out, problems, notes, !problems.length, isSample);
  render();
}

// Accepts the chatbot's whole reply: finds the JSON even inside ```json fences or with text around it.
function parse(text) {
  const t = text.trim();
  if (!t) return { error: "Paste the JSON your AI wrote into the box first." };
  const fenced = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  let body = fenced ? fenced[1] : t;
  const a = body.indexOf("{"), b = body.lastIndexOf("}");
  if (a === -1 || b <= a) return { error: "I couldn't find any JSON. Copy the whole code block your AI sent (it starts with { and ends with })." };
  body = body.slice(a, b + 1);
  try {
    return { data: JSON.parse(body) };
  } catch (e) {
    return { error: `The JSON has a typo (${e.message}). Paste this message back to your AI and ask it to send the full JSON again.` };
  }
}

function report(el, problems, notes, ok, isSample = false) {
  el.hidden = false;
  el.className = `report ${ok ? "report--ok" : "report--bad"}`;
  const li = (s) => `<li>${escapeHtml(s)}</li>`;
  el.innerHTML = ok
    ? `<p><strong>Looks good.</strong> Add photos below, then check the preview.</p>${notes.length ? `<ul class="notes">${notes.map(li).join("")}</ul>` : ""}`
    : `<p><strong>${isSample && problems.length > 1 ? "This is still the sample (that's fine for a test drive)." : "A few things to fix."}</strong> Copy this list and paste it back to your AI:</p>
       <ul>${problems.map(li).join("")}</ul>${notes.length ? `<ul class="notes">${notes.map(li).join("")}</ul>` : ""}
       <button class="btn btn--small" type="button" data-copy-report>Copy this list</button>`;
  el.querySelector("[data-copy-report]")?.addEventListener("click", (e) =>
    copy(`The Portfolio Kit builder found these problems. Please fix them and send the full JSON again:\n- ${problems.join("\n- ")}`).then((ok) => flash(e.target, ok ? "Copied ✓" : "Copy failed")));
}

// ---------- Step 3: photos (stay on this computer; shrunk to ~1600px) ----------
$("#photos").innerHTML = PHOTO_KEYS.map(({ key, label, hint }) => `
  <label class="slot" data-key="${key}">
    <input type="file" accept="image/*" data-photo="${key}">
    <span class="slot__img" aria-hidden="true"></span>
    <span class="slot__label">${label}</span><span class="slot__hint">${hint}</span>
    <button class="slot__clear" type="button" data-clear="${key}" hidden>Remove</button>
  </label>`).join("");
$("#photos").addEventListener("change", async (e) => {
  const key = e.target.dataset.photo;
  const file = e.target.files?.[0];
  if (!key || !file) return;
  try {
    state.photos[key] = await shrink(file, key === "headshot" ? 900 : 1600);
    paintSlot(key);
    if (state.data) check();
  } catch (err) {
    console.warn("[builder] photo failed", err);
    alert("That photo couldn't be read. Try a JPG or PNG.");
  }
});
$("#photos").addEventListener("click", (e) => {
  const key = e.target.dataset?.clear;
  if (!key) return;
  e.preventDefault();
  delete state.photos[key];
  paintSlot(key);
  if (state.data) check();
});
function paintSlot(key) {
  const slot = document.querySelector(`.slot[data-key="${key}"]`);
  const p = state.photos[key];
  slot.querySelector(".slot__img").style.backgroundImage = p ? `url(${p.dataUrl})` : "";
  slot.classList.toggle("has-photo", Boolean(p));
  slot.querySelector(".slot__clear").hidden = !p;
}

function shrink(file, max) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.round(img.naturalWidth * scale), h = Math.round(img.naturalHeight * scale);
      const c = Object.assign(document.createElement("canvas"), { width: w, height: h });
      c.getContext("2d").drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(img.src);
      resolve({ dataUrl: c.toDataURL("image/jpeg", 0.85), w, h });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

// Puts chosen photos into the data (src + real size); the image bytes go in assets.
function withPhotos(data) {
  const d = structuredClone(data);
  d.photos ??= {};
  for (const { key } of PHOTO_KEYS) {
    const p = state.photos[key];
    d.photos[key] ??= { src: "", alt: "", w: 1200, h: 900 };
    if (p) Object.assign(d.photos[key], { src: `photos/${key}.jpg`, w: p.w, h: p.h });
    else d.photos[key].src = "";
  }
  return d;
}

function assets(data) {
  const a = {};
  for (const { key } of PHOTO_KEYS) if (state.photos[key]) a[`photos/${key}.jpg`] = state.photos[key].dataUrl;
  for (const g of data.toolkit?.groups ?? []) for (const t of g.tools ?? []) {
    const path = `assets/logos/${t.logo}.svg`;
    if (t.logo && KIT.logos[path]) a[path] = KIT.logos[path];
  }
  return a;
}

// ---------- Step 4: preview ----------
function render() {
  if (!state.data) return;
  const data = withPhotos(state.data);
  try {
    state.html = assemblePage({ data, assets: assets(data), css: KIT.css, engineJs: KIT.engineJs });
  } catch (e) {
    console.warn("[builder] render failed", e);
    return report($("#report"), [`The page couldn't be built: ${e.message}`], [], false);
  }
  $("#preview").srcdoc = state.html;
  $("#preview-wrap").hidden = false;
  $("#download").disabled = false;
}
document.querySelectorAll("[data-width]").forEach((b) => b.addEventListener("click", () => {
  $("#preview").style.width = b.dataset.width;
  document.querySelectorAll("[data-width]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
}));

// ---------- Step 5: download ----------
// A zip with index.html inside: Vercel serves index.html at the main link (any other file name 404s there).
$("#download").addEventListener("click", () => {
  if (!state.html) return;
  const n = state.data.site?.name ?? {};
  const base = `${n.first ?? "my"}-${n.last ?? "portfolio"}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "") || "my-portfolio";
  const file = `${base}-site.zip`;
  const zip = createZip([{ name: "index.html", data: state.html }]);
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([zip], { type: "application/zip" })), download: file });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  $("#after-download").hidden = false;
  $("#file-name").textContent = file;
  $("#folder-name").textContent = `${base}-site`;
});

// ---------- helpers ----------
async function copy(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}
function flash(btn, text) {
  const old = btn.dataset.label ?? btn.textContent;
  btn.dataset.label = old;
  btn.textContent = text;
  setTimeout(() => (btn.textContent = old), 1800);
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

if (input.value.trim()) check();
