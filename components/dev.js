// Two-column developer layout. Presentational only: data in, HTML string out.
// Class hooks used by controllers (career__*, journey__*, ask__*) are kept on purpose.
import { esc, asset } from "./sections.js";

const ym = (s) => (s ? new Date(s + "-01T12:00").toLocaleString("en-US", { month: "short", year: "numeric" }) : "Present");
const tagList = (tags = []) => tags.length ? `<ul class="tags">${tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : "";
// Logos sit in a CSS variable, which resolves relative to the stylesheet, so normal paths need a leading /.
const logoSrc = (name) => { const a = asset(`assets/logos/${name}.svg`); return a.startsWith("data:") ? a : "/" + a; };
const ext = (href) => (href.startsWith("http") ? ' target="_blank" rel="noopener"' : "");

// Fills {days} (live counter) and {projects} in a line of copy.
const fill = (text, days, projects) => esc(text).replace("{days}", `<span data-live-days="${days}">0</span>`).replace("{projects}", String(projects));

export const sidebar = (site, intro, photo, nav, days, projects) => `
  <header class="side">
    <div class="side__top">
      ${photo ? `<img class="side__photo" src="${asset(photo.src)}" alt="${esc(photo.alt)}" width="${photo.w}" height="${photo.h}" fetchpriority="high">` : ""}
      <h1 class="side__name"><a href="#top">${esc(site.name.first)} ${esc(site.name.last)}</a></h1>
      <p class="side__title">${esc(intro.title)}</p>
      <p class="side__line">${esc(intro.line)}</p>
      <p class="side__status"><span class="dot"></span>${fill(intro.status, days, projects)}</p>
    </div>
    <nav class="side__nav" aria-label="Sections">
      <ul>${nav.map((n) => `<li><a href="${n.href}" data-spy="${n.href.slice(1)}"><span class="side__bar"></span>${esc(n.label)}</a></li>`).join("")}</ul>
    </nav>
    <div class="side__actions">
      ${site.resume ? `<a class="btn btn--primary" href="${site.resume}" target="_blank" rel="noopener">Résumé <span aria-hidden="true">↗</span></a>` : ""}
      <a class="btn${site.resume ? "" : " btn--primary"}" href="${site.contact.linkedin}" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>
      ${site.features.palette ? `<button class="btn btn--ghost" type="button" data-open-palette>Search <kbd>K</kbd></button>` : ""}
    </div>
  </header>`;

export const section = (id, label, inner, extra = "") => `
  <section class="sec" id="${id}" aria-label="${esc(label)}" ${extra}>
    <h2 class="sec__label">${esc(label)}</h2>
    ${inner}
  </section>`;

const nowCard = (now) => now ? `
  <aside class="now" data-ui aria-label="${esc(now.heading)}">
    <p class="now__head"><span class="dot" aria-hidden="true"></span>${esc(now.heading)}<span class="now__date">Updated ${esc(now.updated)}</span></p>
    <ul class="now__list">${now.items.map((it) => `<li><span class="now__k">${esc(it.k)}</span><span class="now__v">${esc(it.v)}</span></li>`).join("")}</ul>
  </aside>` : "";

export const about = (copy, stats, now) => section("about", "About", `
  <div class="prose" data-reveal>${copy.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
  ${nowCard(now)}
  <dl class="metrics" data-reveal>
    ${stats.map((s) => {
      const days = s.liveDaysSince ? Math.max(0, Math.floor((Date.now() - new Date(s.liveDaysSince + "T00:00")) / 86400000)) : null;
      const n = days ?? s.count;
      return `<div class="metric"><dd class="metric__n" data-count="${n}" data-decimals="${s.decimals ?? 0}" data-prefix="${esc(s.prefix ?? "")}" data-suffix="${esc(s.suffix ?? "")}">${esc(s.prefix ?? "")}${s.decimals ? n.toFixed(s.decimals) : n}${esc(s.suffix ?? "")}</dd><dt>${esc(s.label)}</dt></div>`;
    }).join("")}
  </dl>`);

export const focusBlock = (ai, days, projects) => section("focus", ai.label, `
  <p class="lead" data-reveal>${fill(ai.lead, days, projects)}</p>
  <ol class="tl" data-reveal>
    ${ai.timeline.map((t) => `<li><span class="tl__when">${esc(t.when)}</span><span class="tl__text">${esc(t.text)}</span></li>`).join("")}
  </ol>
  ${ai.club?.url ? `<figure class="browser" data-ui>
    <div class="browser__bar"><span></span><span></span><span></span><a href="${ai.club.url}" target="_blank" rel="noopener">${esc(ai.club.heading)} ↗</a></div>
    <iframe src="${ai.club.url}" title="${esc(ai.club.heading)}" loading="lazy" referrerpolicy="no-referrer"></iframe>
    <figcaption>${esc(ai.club.note)}</figcaption>
  </figure>` : ""}`);

export const careerBlock = (copy) => `
  <div class="career" data-ui>
    <div class="career__head"><h3>${esc(copy.heading)}</h3><p>${esc(copy.note)}</p></div>
    <div class="career__chart">
      <svg class="career__svg" viewBox="0 0 1000 380" preserveAspectRatio="none" aria-hidden="true"></svg>
      <div class="career__track" role="slider" tabindex="0" aria-label="${esc(copy.sliderLabel)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100"></div>
      <div class="career__axis" aria-hidden="true"></div>
    </div>
    <div class="career__panel" aria-live="polite">
      <p class="career__date"></p><p class="career__value"></p>
      <ul class="career__roles"></ul>
    </div>
  </div>`;

const entry = (r, tracks) => `
  <li class="entry" id="role-${r.id}">
    <p class="entry__when">${ym(r.start)} — ${ym(r.end)}</p>
    <div class="entry__body">
      <h3 class="entry__title">${esc(r.title)} · <span>${esc(r.org)}</span>${r.link ? ` <a class="entry__link" href="${r.link.href}" target="_blank" rel="noopener" aria-label="${esc(r.link.label)}">↗</a>` : ""}</h3>
      <p class="entry__sum">${esc(r.summary)}</p>
      ${r.points.length ? `<ul class="entry__pts">${r.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
      ${tagList(r.tags)}
    </div>
  </li>`;

export const experience = (copy, careerCopy, roles, tracks, resume) => section("experience", copy.heading, `
  ${careerBlock(careerCopy)}
  <ol class="entries" data-reveal>${roles.filter((r) => r.section !== "life").map((r) => entry(r, tracks)).join("")}</ol>
  ${resume ? `<a class="more" href="${resume}" target="_blank" rel="noopener">${esc(copy.resume)} <span aria-hidden="true">↗</span></a>` : ""}`);

export const projectsBlock = (copy, items) => section("projects", copy.heading, `
  <ul class="projects" data-reveal>
    ${items.map((p) => `
      <li class="proj">
        ${p.media ? `<figure class="proj__media"><video src="${asset(p.media.video)}" poster="${asset(p.media.poster)}" width="${p.media.w}" height="${p.media.h}" muted loop playsinline preload="metadata" aria-label="${esc(p.title)} teaser"></video></figure>` : ""}
        <div class="proj__top"><h3>${esc(p.title)}</h3><span class="proj__when">${esc(p.when)} · ${esc(p.for)}</span></div>
        <p>${esc(p.text)}</p>
        <p class="proj__result">${esc(p.result)}</p>
        ${tagList(p.tags)}
        ${p.link ? `<a class="proj__link" href="${p.link.href}"${ext(p.link.href)}>${esc(p.link.label)} ↗</a>` : ""}
      </li>`).join("")}
  </ul>`);

export const toolkitBlock = (tk) => section("toolkit", tk.heading, `
  <div class="kit" data-reveal>
    ${tk.groups.map((g) => `
      <div class="kit__group">
        <p class="kit__label">${esc(g.label)}</p>
        <ul class="kit__tools">
          ${g.tools.map((t) => `<li class="tool" style="--brand:${t.brand}">${t.logo
            ? `<span class="tool__logo" style="--logo:url('${logoSrc(t.logo)}')" aria-hidden="true"></span>`
            : `<span class="tool__mark" aria-hidden="true">${esc(t.mark)}</span>`}<span class="tool__name">${esc(t.name)}</span></li>`).join("")}
          ${tk.more ? `<li class="tool tool--more"><span class="tool__mark" aria-hidden="true">+</span><span class="tool__name">${esc(tk.more)}</span></li>` : ""}
        </ul>
      </div>`).join("")}
  </div>`);

export const storyBlock = (copy) => section("story", "Story", `
  <div class="story" data-ui>
    <div class="story__head"><h3>${esc(copy.heading)}</h3><p>${esc(copy.note)}</p></div>
    <div class="journey__map">
      <svg class="journey__svg" aria-hidden="true"></svg>
      <div class="journey__pins"></div>
      <p class="journey__miles"><span class="journey__miles-num">0</span> ${esc(copy.milesLabel)}</p>
    </div>
    <div class="story__controls">
      <button class="chip" type="button" data-step="-1">Back</button>
      <button class="chip" type="button" data-step="1">Next</button>
      <button class="btn btn--primary" type="button" data-play>${esc(copy.play)}</button>
    </div>
    <div class="journey__card" aria-live="polite"></div>
    <ol class="journey__steps" aria-label="All stops"></ol>
  </div>`);

export const lifeBlock = (copy, photos) => section("life", copy.heading, `
  <p class="prose" data-reveal>${esc(copy.text)}</p>
  <dl class="facts" data-reveal>${copy.facts.map((f) => `<div><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join("")}</dl>
  <div class="shots" data-reveal>
    ${photos.map((p, i) => `<button class="shot" type="button" data-photo="${i}" aria-label="View photo larger"><img src="${asset(p.src)}" alt="${esc(p.alt)}" width="${p.w}" height="${p.h}" loading="lazy" decoding="async"></button>`).join("")}
  </div>`);

export const askBlock = (ask, who) => section("ask", "Ask me", `
  <div class="ask__qs" role="tablist" aria-label="Questions">
    ${ask.items.map((it, i) => `<button class="ask__q" type="button" role="tab" id="ask-tab-${i}" aria-controls="ask-panel" aria-selected="${i === 0}" data-ask="${i}">${esc(it.q)}</button>`).join("")}
  </div>
  <div class="ask__panel" id="ask-panel" role="tabpanel" aria-live="polite">
    <p class="ask__who">${esc(who)}</p>
    <p class="ask__a"></p>
    <a class="ask__link" href="#"></a>
  </div>`);

export const devFooter = (site, copy) => `
  <footer class="foot">
    <p>${esc(copy.line)}</p>
    <p><a href="${site.contact.linkedin}" target="_blank" rel="noopener">LinkedIn</a> · ${site.contact.extra?.href ? `<a href="${site.contact.extra.href}" target="_blank" rel="noopener">${esc(site.contact.extra.label)}</a> · ` : ""}${site.resume ? `<a href="${site.resume}" target="_blank" rel="noopener">Résumé</a> · ` : ""}<a href="#top">Top</a></p>
  </footer>`;
