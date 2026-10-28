// Shared helpers for components. esc() makes any text safe to drop into HTML.
export const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Resolves a file path. The single-file build (tools/build-single.mjs) swaps files for inline data
// through window.__ASSETS; on a normal site this just returns the path.
export const asset = (path = "") => (globalThis.__ASSETS && globalThis.__ASSETS[path]) || path;
