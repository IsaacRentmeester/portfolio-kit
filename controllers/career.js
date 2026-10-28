// Career chart controller: draws the series into the SVG and handles scrubbing
// (mouse, touch drag, arrow keys) plus a one-time replay when the chart scrolls in.
import { careerRoles } from "../components/career.js";

const W = 1000, H = 380, PAD_T = 24, PAD_B = 28;

export function mountCareer({ root, career, tracks }) {
  const res = career.series();
  if (!res.ok) { root.querySelector(".career__panel").textContent = "Chart unavailable."; return { replay() {} }; }
  const { points, events, max } = res.data;
  const svg = root.querySelector(".career__svg");
  const track = root.querySelector(".career__track");
  const axis = root.querySelector(".career__axis");
  const dateEl = root.querySelector(".career__date");
  const valueEl = root.querySelector(".career__value");
  const rolesEl = root.querySelector(".career__roles");

  const n = points.length - 1;
  const x = (k) => (k / n) * W;
  const y = (v) => H - PAD_B - (v / max) * (H - PAD_T - PAD_B);
  const line = points.map((p, k) => `${k ? "L" : "M"}${x(k).toFixed(1)},${y(p.value).toFixed(1)}`).join("");
  const area = `${line}L${W},${H - PAD_B}L0,${H - PAD_B}Z`;

  svg.innerHTML = `
    <path class="cc-area" d="${area}"/>
    <path class="cc-line" d="${line}" pathLength="1"/>
    <line class="cc-cursor" x1="0" x2="0" y1="${PAD_T}" y2="${H - PAD_B}"/>`;
  const cursor = svg.querySelector(".cc-cursor");
  // Dots are HTML, positioned in %, so they stay round when the SVG stretches.
  const pct = (k, v) => `left:${(x(k) / W) * 100}%;top:${(y(v) / H) * 100}%`;
  const dots = document.createElement("div");
  dots.className = "cc-dots";
  dots.setAttribute("aria-hidden", "true");
  dots.innerHTML = events.map((e) => { const k = points.findIndex((p) => p.i === e.i); return `<span class="cc-event" style="${pct(k, points[k].value)};background:var(--track-${e.track})"></span>`; }).join("") + `<span class="cc-head"></span>`;
  svg.after(dots);
  const head = dots.querySelector(".cc-head");

  // Year ticks under the chart
  axis.innerHTML = points.map((p, k) => (p.i % 12 === 0 ? `<span style="left:${(k / n) * 100}%">${Math.floor(p.i / 12)}</span>` : "")).join("");

  // Visual position glides continuously (0..n); the panel only updates when the month changes.
  let pos = n, target = n, current = -1, lastRoles = "", loop = 0;
  const valueAt = (f) => {
    const i = Math.floor(f), j = Math.min(n, i + 1), t = f - i;
    return points[i].value + (points[j].value - points[i].value) * t;
  };

  function draw() {
    const xv = (pos / n) * W;
    cursor.setAttribute("x1", xv); cursor.setAttribute("x2", xv);
    head.style.left = `${(pos / n) * 100}%`;
    head.style.top = `${(y(valueAt(pos)) / H) * 100}%`;
    const k = Math.round(pos);
    if (k !== current) panel(k);
  }

  function panel(k) {
    current = k;
    const at = career.at(k / n);
    if (!at.ok) return;
    const p = at.data;
    dateEl.textContent = p.label;
    valueEl.textContent = `${p.value} role-months logged`;
    const ids = p.roles.map((r) => r.id).join();
    if (ids !== lastRoles) { lastRoles = ids; rolesEl.innerHTML = careerRoles(p.roles, tracks); }
    track.setAttribute("aria-valuenow", Math.round((k / n) * 100));
    track.setAttribute("aria-valuetext", `${p.label}: ${p.roles.map((r) => r.org).join(", ") || "no roles"}`);
  }

  // Ease the marker toward the target each frame for a smooth glide.
  function glide() {
    pos += (target - pos) * 0.35;
    if (Math.abs(target - pos) < 0.002) pos = target;
    draw();
    loop = pos === target ? 0 : requestAnimationFrame(glide);
  }
  function moveTo(f, instant = false) {
    target = Math.max(0, Math.min(n, f));
    if (instant || matchMedia("(prefers-reduced-motion: reduce)").matches) { pos = target; draw(); return; }
    if (!loop) loop = requestAnimationFrame(glide);
  }
  function show(k) { moveTo(k); }

  const fromPointer = (e) => {
    const r = track.getBoundingClientRect();
    moveTo(((e.clientX - r.left) / r.width) * n);
  };
  let dragging = false;
  track.addEventListener("pointerdown", (e) => {
    dragging = true; root.classList.add("is-dragging");
    try { track.setPointerCapture(e.pointerId); } catch {} stopReplay(); fromPointer(e);
  });
  track.addEventListener("pointermove", (e) => { if (dragging || e.pointerType === "mouse") { stopReplay(); fromPointer(e); } });
  const end = () => {
    dragging = false; root.classList.remove("is-dragging");
    moveTo(Math.round(target)); // settle on the nearest month
  };
  track.addEventListener("pointerup", end);
  track.addEventListener("pointercancel", end);
  track.addEventListener("mouseleave", () => { if (!dragging) moveTo(Math.round(target)); });
  track.addEventListener("keydown", (e) => {
    const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 12, PageDown: -12 }[e.key];
    if (step) { e.preventDefault(); stopReplay(); show(Math.round(target) + step); }
    if (e.key === "Home") { e.preventDefault(); show(0); }
    if (e.key === "End") { e.preventDefault(); show(n); }
  });

  // Replay: the cursor sweeps from the first month to today.
  let raf = 0;
  function stopReplay() { cancelAnimationFrame(raf); raf = 0; }
  function replay() {
    stopReplay();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return moveTo(n, true);
    const t0 = performance.now(), dur = 3200;
    const tick = (t) => {
      const f = Math.min(1, (t - t0) / dur);
      moveTo((1 - Math.pow(1 - f, 3)) * n, true);
      if (f < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  moveTo(n, true);
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); replay(); } }, { threshold: 0.4 });
  io.observe(track);
  return { replay };
}
