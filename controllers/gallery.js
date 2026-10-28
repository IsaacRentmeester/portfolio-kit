// Gallery viewer: tap a photo to open it full screen; arrows, swipe or ←/→ to move; Esc closes.
import { asset } from "../components/sections.js";

export function mountGallery({ root, dialog, items }) {
  const img = dialog.querySelector(".viewer__img");
  const alt = dialog.querySelector(".viewer__alt");
  const meta = dialog.querySelector(".viewer__meta");
  let i = 0, startX = null;

  function show(k) {
    i = (k + items.length) % items.length;
    const p = items[i];
    img.src = asset(p.src); img.alt = p.alt; img.width = p.w; img.height = p.h;
    meta.textContent = `${i + 1} of ${items.length}${p.credit ? ` · Photo: ${p.credit}` : ""}`;
    img.animate?.([{ opacity: 0, transform: "scale(0.98)" }, { opacity: 1, transform: "none" }], { duration: 300, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
  }
  function open(k) { show(k); dialog.showModal(); dialog.querySelector(".viewer__next").focus(); }

  root.addEventListener("click", (e) => { const b = e.target.closest("[data-photo]"); if (b) open(Number(b.dataset.photo)); });
  dialog.addEventListener("click", (e) => {
    if (e.target.closest("[data-move]")) return show(i + Number(e.target.closest("[data-move]").dataset.move));
    if (e.target.closest("[data-close]") || e.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") show(i + 1);
    if (e.key === "ArrowLeft") show(i - 1);
  });
  dialog.addEventListener("pointerdown", (e) => { startX = e.clientX; });
  dialog.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX; startX = null;
    if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1));
  });
  return { open };
}
