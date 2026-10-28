// Journey map controller: draws the route, moves between stops (buttons, dots, list,
// arrow keys) and plays the whole story. The route draws itself up to the current stop.
import { journeyCard } from "../components/journey.js";
import { esc } from "../components/sections.js";

export function mountJourney({ root, journey, photos, base }) {
  if (!journey.ok) { root.querySelector(".journey__card").textContent = "Map unavailable."; return; }
  const { stops, width, height, project } = journey.data;
  const svg = root.querySelector(".journey__svg");
  const pins = root.querySelector(".journey__pins");
  const card = root.querySelector(".journey__card");
  const steps = root.querySelector(".journey__steps");
  const milesEl = root.querySelector(".journey__miles-num");
  const playBtn = root.querySelector("[data-play]");
  const photo = (key) => (key && photos[key]?.src ? photos[key] : null);

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  // Each leg is a gentle arc so repeated legs (Green Bay → out east → back) stay readable.
  const legs = stops.slice(1).map((b, i) => {
    const a = stops[i];
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
    const bend = Math.min(80, len * 0.22);
    return `M${a.x},${a.y} Q${mx - (dy / len) * bend},${my + (dx / len) * bend} ${b.x},${b.y}`;
  });
  // Faint state/province outlines, Great Lakes and codes underneath the route, for orientation.
  const ringPath = (r) => r.map(([lon, lat], i) => { const [x, y] = project(lon, lat); return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`; }).join("") + "Z";
  const baseLayer = base ? `
    <g class="jr-base" aria-hidden="true">
      ${base.regions.map((g) => `<path class="jr-region" d="${g.rings.map(ringPath).join("")}"/>`).join("")}
      ${base.lakes.map((r) => `<path class="jr-lake" d="${ringPath(r)}"/>`).join("")}
      ${base.regions.map((g) => { const [x, y] = project(...g.label); return x > 20 && x < width - 20 && y > 16 && y < height - 10 ? `<text class="jr-code" x="${x.toFixed(0)}" y="${y.toFixed(0)}">${esc(g.code)}</text>` : ""; }).join("")}
    </g>` : "";
  svg.innerHTML = baseLayer +
    legs.map((d) => `<path class="jr-ghost" d="${d}"/>`).join("") +
    legs.map((d, i) => `<path class="jr-leg" data-leg="${i + 1}" d="${d}" pathLength="1"/>`).join("");

  // One pin per unique place; stops at the same place share it.
  const places = [];
  stops.forEach((s, i) => {
    let p = places.find((q) => q.place === s.place);
    if (!p) places.push((p = { place: s.place, x: s.x, y: s.y, label: s.label ?? "below", idx: [] }));
    p.idx.push(i);
  });
  pins.innerHTML = places.map((p) => `
    <button class="jr-pin jr-pin--${p.label}" type="button" data-go="${p.idx[0]}" style="left:${(p.x / width) * 100}%;top:${(p.y / height) * 100}%"
      aria-label="${esc(p.place)}"><span class="jr-pin__label">${esc(p.place.split(",")[0])}</span></button>`).join("");
  steps.innerHTML = stops.map((s, i) => `<li><button type="button" data-go="${i}"><span>${esc(s.when)}</span> ${esc(s.title)}</button></li>`).join("");

  let current = 0, timer = 0, shownMiles = 0;

  function countMiles(to) {
    const from = shownMiles, t0 = performance.now(), dur = 700;
    const tick = (t) => {
      const f = Math.min(1, (t - t0) / dur);
      shownMiles = Math.round(from + (to - from) * (1 - Math.pow(1 - f, 3)));
      milesEl.textContent = shownMiles.toLocaleString("en-US");
      if (f < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function go(i) {
    current = Math.max(0, Math.min(stops.length - 1, i));
    const s = stops[current];
    card.innerHTML = journeyCard(s, photo(s.photo));
    card.animate?.([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], { duration: 420, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
    svg.querySelectorAll(".jr-leg").forEach((p) => p.classList.toggle("is-on", Number(p.dataset.leg) <= current));
    pins.querySelectorAll(".jr-pin").forEach((b) => {
      const idx = places.find((p) => p.idx.includes(Number(b.dataset.go)))?.idx ?? [];
      b.classList.toggle("is-here", idx.includes(current));
      b.classList.toggle("is-past", idx.some((k) => k < current));
    });
    steps.querySelectorAll("button").forEach((b) => b.setAttribute("aria-current", String(Number(b.dataset.go) === current)));
    countMiles(s.milesSoFar);
  }

  function stop() { clearInterval(timer); timer = 0; playBtn.textContent = "Play my story"; }
  function play() {
    if (timer) return stop();
    if (current === stops.length - 1) go(0);
    playBtn.textContent = "Pause";
    timer = setInterval(() => { current < stops.length - 1 ? go(current + 1) : stop(); }, 2600);
  }

  root.addEventListener("click", (e) => {
    const el = e.target.closest("[data-go],[data-step],[data-play]");
    if (!el) return;
    if (el.dataset.play !== undefined) return play();
    stop();
    go(el.dataset.go !== undefined ? Number(el.dataset.go) : current + Number(el.dataset.step));
  });
  root.addEventListener("keydown", (e) => {
    if (e.target.closest("input")) return;
    if (e.key === "ArrowRight") { stop(); go(current + 1); }
    if (e.key === "ArrowLeft") { stop(); go(current - 1); }
  });

  go(0);
  return { play, go };
}
