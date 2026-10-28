// Presentational pieces for the new v2 sections: stats, career chart, record, palette.
import { esc } from "./sections.js";

const fmtYM = (ym) => (ym ? new Date(ym + "-01T12:00").toLocaleString("en-US", { month: "short", year: "numeric" }) : "Now");

const daysSince = (ymd) => Math.max(0, Math.floor((Date.now() - new Date(ymd + "T00:00").getTime()) / 86400000));

export const stats = (items) => `
  <section class="stats grid" aria-label="By the numbers">
    <dl class="stats__list" data-reveal>
      ${items.map((s) => {
        const count = s.liveDaysSince ? daysSince(s.liveDaysSince) : s.count;
        const shown = s.text ? esc(s.text) : (s.decimals ? count.toFixed(s.decimals) : count.toLocaleString("en-US")) + esc(s.suffix ?? "");
        return `
        <div class="stat${s.liveDaysSince ? " stat--live" : ""}">
          <dt class="stat__label">${esc(s.label)}</dt>
          <dd class="stat__num"${count != null && !s.text ? ` data-count="${count}" data-decimals="${s.decimals ?? 0}" data-suffix="${esc(s.suffix ?? "")}"` : ""}>${shown}</dd>
        </div>`;
      }).join("")}
    </dl>
  </section>`;

// The chart is drawn by the career controller into the <svg>; this is the frame.
export const careerShell = (copy) => `
  <section class="career grid" id="career" aria-labelledby="career-h">
    <div class="career__head" data-reveal>
      <h2 id="career-h">${esc(copy.heading)}</h2>
      <p>${esc(copy.note)}</p>
    </div>
    <div class="career__chart" data-ui>
      <svg class="career__svg" viewBox="0 0 1000 380" preserveAspectRatio="none" aria-hidden="true"></svg>
      <div class="career__track" role="slider" tabindex="0" aria-label="${esc(copy.sliderLabel)}"
           aria-valuemin="0" aria-valuemax="100" aria-valuenow="100"></div>
      <div class="career__axis" aria-hidden="true"></div>
    </div>
    <div class="career__panel" aria-live="polite">
      <p class="career__date"></p>
      <p class="career__value"></p>
      <ul class="career__roles"></ul>
    </div>
  </section>`;

export const careerRoles = (roles, tracks) => roles.length
  ? roles.map((r) => `<li><a href="#role-${r.id}" data-open-role="${r.id}"><span class="career__dot" style="--track: var(--track-${r.track})"></span><span><strong>${esc(r.title)}</strong> ${esc(r.org)}</span><span class="career__tag">${esc(tracks[r.track])}</span></a></li>`).join("")
  : `<li class="career__none">Between seasons.</li>`;

export const record = (copy, roles, tracks, project) => `
  <section class="record grid" id="record" aria-labelledby="record-h">
    <div class="record__head" data-reveal>
      <h2 id="record-h">${esc(copy.heading)}</h2>
      <p>${esc(copy.note)}</p>
    </div>
    <div class="record__list" data-reveal>
      ${roles.map((r) => `
        <details class="role" id="role-${r.id}" style="--track: var(--track-${r.track})">
          <summary>
            <span class="role__title">${esc(r.title)}</span>
            <span class="role__org">${esc(r.org)}</span>
            <span class="role__dates">${fmtYM(r.start)} – ${fmtYM(r.end)}</span>
            <span class="role__sign" aria-hidden="true"></span>
          </summary>
          <div class="role__body">
            <p class="role__summary">${esc(r.summary)}</p>
            <ul>${r.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
            <p class="role__meta">${esc(tracks[r.track])} · ${esc(r.place)}${r.link ? ` · <a class="link" href="${r.link.href}" target="_blank" rel="noopener">${esc(r.link.label)}</a>` : ""}</p>
          </div>
        </details>`).join("")}
    </div>
    <p class="record__project" data-reveal><strong>${esc(project.title)}</strong>, ${esc(project.date)}, with ${esc(project.with)}. ${esc(project.text)}</p>
  </section>`;

export const palette = () => `
  <dialog class="palette" aria-label="Command menu">
    <form method="dialog" class="palette__form">
      <label class="visually-hidden" for="palette-q">Jump to</label>
      <input id="palette-q" class="palette__input" type="text" autocomplete="off" spellcheck="false"
             placeholder="Jump to a section, a role, a link…" role="combobox" aria-expanded="true" aria-controls="palette-list">
      <ul id="palette-list" class="palette__list" role="listbox"></ul>
      <p class="palette__foot">Enter to go · arrows to move · Esc to close</p>
    </form>
  </dialog>`;

export const paletteItems = (items, active) => items.length
  ? items.map((c, i) => `<li role="option" id="pal-${i}" class="palette__item" aria-selected="${i === active}" data-index="${i}"><span>${esc(c.label)}</span><span class="palette__hint">${esc(c.hint)}</span></li>`).join("")
  : `<li class="palette__empty">Nothing matches. Try “projects” or “résumé”.</li>`;
