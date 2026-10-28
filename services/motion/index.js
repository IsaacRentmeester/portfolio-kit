// Motion service: hero line reveal, staggered section entrances, river drift.
// Content is visible by default; motion only starts once this script runs.
const NAME = "[motion]";

export function startMotion({ enabled }) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!enabled || reduce) return { ok: true, data: "off" };
  try {
    heroLines();
    entrances();
    counters();
    riverDrift();
    return { ok: true, data: "on" };
  } catch (err) {
    console.warn(`${NAME} failed, page stays static:`, err);
    document.documentElement.classList.remove("motion");
    return { ok: false, error: `${NAME} ${err.message}` };
  }
}

function heroLines() {
  const lines = document.querySelectorAll(".hero__line > span");
  const after = document.querySelectorAll(".hero__foot, .hero__top");
  lines.forEach((el, i) =>
    el.animate(
      [{ transform: "translateY(105%)" }, { transform: "translateY(0)" }],
      { duration: 950, delay: 120 + i * 110, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" }
    )
  );
  after.forEach((el) =>
    el.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], {
      duration: 700, delay: 650, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards",
    })
  );
}

// Every [data-reveal] group: its children rise in, one after another, once.
function entrances() {
  const groups = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver(
    (seen) => {
      for (const s of seen) {
        if (!s.isIntersecting) continue;
        io.unobserve(s.target);
        [...s.target.children].forEach((child, i) =>
          child.animate(
            [{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "none" }],
            { duration: 700, delay: Math.min(i, 8) * 80, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" }
          )
        );
      }
    },
    { rootMargin: "0px 0px -12% 0px" }
  );
  groups.forEach((g) => io.observe(g));
}

// Stat numbers count up from zero the first time they scroll into view.
function counters() {
  const nums = document.querySelectorAll("[data-count]");
  const io = new IntersectionObserver((seen) => {
    for (const s of seen) {
      if (!s.isIntersecting) continue;
      io.unobserve(s.target);
      const el = s.target, end = Number(el.dataset.count), dec = Number(el.dataset.decimals), suf = el.dataset.suffix ?? "", pre = el.dataset.prefix ?? "";
      const t0 = performance.now(), dur = 1400;
      const tick = (t) => {
        const f = Math.min(1, (t - t0) / dur), v = end * (1 - Math.pow(1 - f, 4));
        el.textContent = pre + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-US")) + suf;
        if (f < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }, { threshold: 0.6 });
  nums.forEach((n) => io.observe(n));
}

// The river picture drifts slower than the page while it is on screen.
function riverDrift() {
  const img = document.querySelector(".river img");
  if (!img) return;
  const box = img.parentElement;
  let ticking = false;
  const update = () => {
    const r = box.getBoundingClientRect();
    const p = (r.top + r.height) / (innerHeight + r.height); // 1 → 0 as it scrolls past
    img.style.transform = `translateY(${(p - 1) * 16}%) scale(1.04)`;
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}
