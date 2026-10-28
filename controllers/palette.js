// Command menu controller: K, / or Cmd/Ctrl+K opens it; type to filter; Enter runs.
import { paletteItems } from "../components/career.js";

export function mountPalette({ dialog, commands, actions }) {
  const input = dialog.querySelector(".palette__input");
  const list = dialog.querySelector(".palette__list");
  let shown = commands;
  let active = 0;

  const render = () => {
    list.innerHTML = paletteItems(shown, active);
    input.setAttribute("aria-activedescendant", shown.length ? `pal-${active}` : "");
    list.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  };
  const filter = () => {
    const q = input.value.trim().toLowerCase();
    shown = q ? commands.filter((c) => (c.label + " " + (c.keywords ?? "")).toLowerCase().includes(q)) : commands;
    active = 0;
    render();
  };
  const run = (c) => {
    if (!c) return;
    dialog.close();
    if (c.action) return actions[c.action]?.();
    if (c.href?.startsWith("#")) {
      const target = document.querySelector(c.href);
      if (target?.tagName === "DETAILS") target.open = true;
      target?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      history.replaceState(null, "", c.href);
    } else if (c.href) {
      window.open(c.href, "_blank", "noopener");
    }
  };
  const open = () => {
    if (dialog.open) return;
    input.value = "";
    filter();
    dialog.showModal();
    input.focus();
  };

  input.addEventListener("input", filter);
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(shown.length - 1, active + 1); render(); }
    if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(0, active - 1); render(); }
    if (e.key === "Enter") { e.preventDefault(); run(shown[active]); }
  });
  list.addEventListener("click", (e) => { const li = e.target.closest("[data-index]"); if (li) run(shown[Number(li.dataset.index)]); });
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

  document.addEventListener("keydown", (e) => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && (e.key === "k" || e.key === "/"))) {
      e.preventDefault();
      open();
    }
  });
  return { open };
}
