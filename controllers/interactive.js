// Small interactive controllers for v5: section bar, hero roles, Ask me, planner, stage gallery.
const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

// Section bar: shows after the hero, highlights the section in view, fills a progress line.
export function mountBar({ bar, hero }) {
  const links = [...bar.querySelectorAll("[data-spy]")];
  const progress = bar.querySelector(".bar__progress");
  new IntersectionObserver(([e]) => { bar.hidden = e.isIntersecting; }, { threshold: 0.15 }).observe(hero);
  const spy = new IntersectionObserver((seen) => {
    for (const s of seen) if (s.isIntersecting) links.forEach((l) => l.toggleAttribute("aria-current", l.dataset.spy === s.target.id));
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((l) => { const t = document.getElementById(l.dataset.spy); if (t) spy.observe(t); });
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// Hero line under the name cycles through roles.
export function mountRoles(root) {
  const items = [...root.querySelectorAll(".hero__role-item")];
  if (items.length < 2 || reduce()) return;
  let i = 0;
  setInterval(() => {
    items[i].classList.remove("is-on");
    i = (i + 1) % items.length;
    items[i].classList.add("is-on");
  }, 2600);
}

// Ask me: pick a question, the answer types itself out.
export function mountAsk({ root, ask }) {
  const tabs = [...root.querySelectorAll("[data-ask]")];
  const answer = root.querySelector(".ask__a");
  const link = root.querySelector(".ask__link");
  let timer = 0;
  function show(k) {
    const it = ask.items[k];
    tabs.forEach((t, j) => t.setAttribute("aria-selected", String(j === k)));
    root.querySelector(".ask__panel").setAttribute("aria-labelledby", `ask-tab-${k}`);
    link.textContent = `${it.link.label} →`;
    link.href = it.link.href;
    link.target = it.link.href.startsWith("http") ? "_blank" : "";
    clearInterval(timer);
    if (reduce()) { answer.textContent = it.a; return; }
    let n = 0;
    answer.textContent = "";
    link.style.opacity = 0;
    timer = setInterval(() => {
      n += 3;
      answer.textContent = it.a.slice(0, n);
      if (n >= it.a.length) { clearInterval(timer); link.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: "forwards", easing: ease }); }
    }, 16);
  }
  root.addEventListener("click", (e) => { const b = e.target.closest("[data-ask]"); if (b) show(Number(b.dataset.ask)); });
  root.querySelector("[role=tablist]").addEventListener("keydown", (e) => {
    const k = tabs.indexOf(document.activeElement);
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (k < 0 || !d) return;
    e.preventDefault();
    const n = (k + d + tabs.length) % tabs.length;
    tabs[n].focus(); show(n);
  });
  show(0);
}

// Planner demo: pick a persona, the prompt fills in and the week rebuilds.
export function mountPlanner({ root, planner }) {
  const grid = root.querySelector(".planner__grid");
  const prompt = root.querySelector(".planner__prompt");
  const span = planner.endHour - planner.startHour;
  const fmt = (h) => { const hr = Math.floor(h), m = h % 1 ? "30" : "00"; return `${((hr + 11) % 12) + 1}:${m}${hr < 12 ? "a" : "p"}`; };
  function show(key) {
    const p = planner.personas[key];
    root.querySelectorAll("[data-persona]").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.persona === key)));
    prompt.innerHTML = planner.prompt
      .replace("{who}", `<mark>${p.who}</mark>`).replace("{fixed}", `<mark>${p.fixed}</mark>`).replace("{protect}", `<mark>${p.protect}</mark>`);
    grid.innerHTML = p.blocks.map(([d, h, len, label, kind], i) => `
      <div class="plan-block" style="--d:${d};--top:${((h - planner.startHour) / span) * 100}%;--h:${(len / span) * 100}%;--c:var(--plan-${kind});--i:${i}">
        <strong>${label}</strong><span>${fmt(h)}</span>
      </div>`).join("");
    if (!reduce()) grid.querySelectorAll(".plan-block").forEach((b, i) =>
      b.animate([{ opacity: 0, transform: "translateY(10px) scale(0.96)" }, { opacity: 1, transform: "none" }], { duration: 420, delay: i * 35, easing: ease, fill: "backwards" }));
  }
  root.addEventListener("click", (e) => { const b = e.target.closest("[data-persona]"); if (b) show(b.dataset.persona); });
  show(Object.keys(planner.personas)[0]);
}

// Stage gallery: one big photo, thumbnails, Back/Next, arrow keys, swipe; click opens the viewer.
export function mountStage({ root, items, viewer }) {
  const img = root.querySelector(".stage__img");
  const n = root.querySelector(".stage__n");
  const credit = root.querySelector(".stage__credit");
  const thumbs = [...root.querySelectorAll("[data-thumb]")];
  let i = 0, startX = null, swiped = false;
  function show(k) {
    i = (k + items.length) % items.length;
    const p = items[i];
    img.src = p.src; img.alt = p.alt; img.width = p.w; img.height = p.h;
    n.textContent = i + 1; credit.textContent = p.credit ? `Photo: ${p.credit}` : "";
    thumbs.forEach((t, j) => t.setAttribute("aria-selected", String(j === i)));
    thumbs[i].scrollIntoView({ block: "nearest", inline: "center", behavior: reduce() ? "auto" : "smooth" });
    if (!reduce()) img.animate([{ opacity: 0.2, transform: "scale(1.03)" }, { opacity: 1, transform: "none" }], { duration: 500, easing: ease });
  }
  root.addEventListener("click", (e) => {
    const t = e.target.closest("[data-thumb],[data-stage],[data-stage-open]");
    if (!t) return;
    if (t.dataset.thumb !== undefined) show(Number(t.dataset.thumb));
    else if (t.dataset.stage !== undefined) show(i + Number(t.dataset.stage));
    else if (swiped) swiped = false;
    else viewer?.open(i);
  });
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") show(i + 1);
    if (e.key === "ArrowLeft") show(i - 1);
  });
  const main = root.querySelector(".stage__main");
  main.addEventListener("pointerdown", (e) => { startX = e.clientX; });
  main.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX; startX = null;
    if (Math.abs(dx) > 50) { swiped = true; show(i + (dx < 0 ? 1 : -1)); }
  });
}

// Sidebar scroll-spy: the link for the section in view gets aria-current.
export function mountSpy({ links }) {
  const targets = links.map((l) => document.getElementById(l.dataset.spy)).filter(Boolean);
  const io = new IntersectionObserver((seen) => {
    for (const s of seen) if (s.isIntersecting) links.forEach((l) => l.toggleAttribute("aria-current", l.dataset.spy === s.target.id));
  }, { rootMargin: "-35% 0px -60% 0px" });
  targets.forEach((t) => io.observe(t));
}

// A soft light that follows the pointer on desktop (skipped for touch and reduced motion).
export function mountSpotlight(el) {
  if (reduce() || !matchMedia("(pointer: fine)").matches) return;
  addEventListener("pointermove", (e) => {
    el.style.setProperty("--mx", `${e.clientX}px`);
    el.style.setProperty("--my", `${e.clientY}px`);
  }, { passive: true });
}

// Card glow: tracks the pointer inside cards so a soft light follows it (CSS reads --gx/--gy).
export function mountGlow(root, selector) {
  if (reduce() || !matchMedia("(pointer: fine)").matches) return;
  root.addEventListener("pointermove", (e) => {
    const card = e.target.closest(selector);
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--gx", `${e.clientX - r.left}px`);
    card.style.setProperty("--gy", `${e.clientY - r.top}px`);
  }, { passive: true });
}

// 3D tilt toward the pointer (max a few degrees), resets on leave.
export function mountTilt(root, selector, max = 6) {
  if (reduce() || !matchMedia("(pointer: fine)").matches) return;
  root.querySelectorAll(selector).forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      el.classList.add("is-tilting");
      el.style.transform = `rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`;
    });
    el.addEventListener("pointerleave", () => { el.classList.remove("is-tilting"); el.style.transform = ""; });
  });
}

// Card videos: play muted while on screen, pause when scrolled away. Reduced motion keeps the poster.
export function mountVideos(root) {
  if (reduce()) return;
  const vids = [...root.querySelectorAll(".proj__media video")];
  const io = new IntersectionObserver((seen) => {
    for (const s of seen) s.isIntersecting ? s.target.play().catch(() => {}) : s.target.pause();
  }, { threshold: 0.35 });
  vids.forEach((v) => io.observe(v));
}
