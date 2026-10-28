// Ambient layer: cursor-reactive dot field, decoding section labels, scroll progress line.
// Each mount is independent and does nothing when reduced motion is on (the field draws once, static).
const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// Accent-coloured dot field behind the page. Dots near the cursor brighten and lean away; idle = no frames drawn.
export function mountField(host, { gap = 30, radius = 170 } = {}) {
  const cv = document.createElement("canvas");
  cv.className = "field";
  cv.setAttribute("aria-hidden", "true");
  host.prepend(cv);
  const ctx = cv.getContext("2d");
  if (!ctx) { cv.remove(); return; }
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#ffcc33";
  let w = 0, h = 0, dpr = 1, mx = -9999, my = -9999, lx = mx, ly = my, raf = 0;

  function size() {
    dpr = Math.min(2, devicePixelRatio || 1);
    w = innerWidth; h = innerHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    const off = (scrollY * 0.15) % gap; // slow parallax drift with scroll
    for (let y = -off; y < h + gap; y += gap) {
      for (let x = gap / 2; x < w; x += gap) {
        const dx = x - lx, dy = y - ly, d = Math.hypot(dx, dy);
        const t = d < radius ? 1 - d / radius : 0;
        const push = t * t * 9;
        const px = x + (d ? (dx / d) * push : 0), py = y + (d ? (dy / d) * push : 0);
        ctx.fillStyle = t ? accent : "rgba(255,255,255,0.055)";
        ctx.globalAlpha = t ? 0.06 + t * 0.4 : 1;
        ctx.fillRect(px - 0.75 - t, py - 0.75 - t, 1.5 + t * 2, 1.5 + t * 2);
      }
    }
    ctx.globalAlpha = 1;
  }
  function tick() {
    lx += (mx - lx) * 0.18; ly += (my - ly) * 0.18;
    draw();
    raf = Math.abs(mx - lx) + Math.abs(my - ly) > 0.5 ? requestAnimationFrame(tick) : 0;
  }
  const kick = () => { if (!raf && !reduce()) raf = requestAnimationFrame(tick); };
  addEventListener("resize", size, { passive: true });
  addEventListener("scroll", () => (reduce() ? draw() : kick()), { passive: true });
  addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    if (lx < -999) { lx = e.clientX; ly = e.clientY; }
    mx = e.clientX; my = e.clientY; kick();
  }, { passive: true });
  document.addEventListener("pointerleave", () => { mx = my = -9999; lx = ly = -9999; draw(); });
  size();
}

// Section labels "decode" from random glyphs into their text the first time they scroll in.
export function mountScramble(labels) {
  if (reduce()) return;
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_";
  const io = new IntersectionObserver((seen) => {
    for (const e of seen) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const el = e.target, text = el.textContent, t0 = performance.now(), dur = 520;
      el.setAttribute("aria-label", text);
      const step = (t) => {
        const f = Math.min(1, (t - t0) / dur), done = Math.floor(f * text.length);
        el.textContent = text.slice(0, done) + [...text.slice(done)].map((c) => (c === " " ? " " : glyphs[(Math.random() * glyphs.length) | 0])).join("");
        if (f < 1) requestAnimationFrame(step); else { el.textContent = text; el.removeAttribute("aria-label"); }
      };
      requestAnimationFrame(step);
    }
  }, { threshold: 1 });
  labels.forEach((l) => io.observe(l));
}

// Thin accent line at the top of the window that fills as you scroll.
export function mountProgress(host) {
  const bar = document.createElement("div");
  bar.className = "progress";
  bar.setAttribute("aria-hidden", "true");
  host.append(bar);
  const set = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener("scroll", set, { passive: true });
  addEventListener("resize", set, { passive: true });
  set();
}
