// The page engine. start(data) renders everything from one data object, so the same engine runs
// from the content/ files (main.js) or from an inline data block (the single-file template).
// No copy or styling lives here.
import { mapBase } from "../content/map-base.js";
import * as d from "../components/dev.js";
import { asset } from "../components/sections.js";
import { palette } from "../components/career.js";
import { viewerDialog } from "../components/journey.js";
import { createCareer } from "../services/career/index.js";
import { createJourney } from "../services/journey/index.js";
import { startMotion } from "../services/motion/index.js";
import { mountCareer } from "../controllers/career.js";
import { mountJourney } from "../controllers/journey.js";
import { mountPalette } from "../controllers/palette.js";
import { mountGallery } from "../controllers/gallery.js";
import { mountAsk, mountSpy, mountSpotlight, mountGlow, mountTilt, mountVideos } from "../controllers/interactive.js";
import { mountField, mountScramble, mountProgress } from "../controllers/ambient.js";

// data: { site, copy, roles, stats, tracks, stops, photos, gallery, ask, projects, focus, toolkit }
export function start({ site, copy, roles, stats, tracks, stops, photos, gallery, ask, projects, focus, toolkit }) {
  // Theme: colours and fonts from config become CSS variables before anything draws.
  const root = document.documentElement.style;
  for (const [k, v] of Object.entries(site.theme.colors)) root.setProperty(`--${k}`, v);
  for (const [k, v] of Object.entries(site.theme.tracks)) root.setProperty(`--track-${k}`, v);
  root.setProperty("--font", site.theme.font);
  root.setProperty("--mono", site.theme.mono);
  if (site.theme.fontsUrl) document.head.append(Object.assign(document.createElement("link"), { rel: "stylesheet", href: site.theme.fontsUrl }));

  // The small avatar next to "Ask me" answers. A leading / because CSS variables resolve against the stylesheet.
  if (photos.headshot?.src) { const h = asset(photos.headshot.src); root.setProperty("--headshot", `url("${h.startsWith("data:") ? h : "/" + h}")`); }

  const app = document.getElementById("app");
  const f = site.features;
  // Sidebar links only for sections that are switched on.
  const nav = site.sections.filter((s) => !s.feature || f[s.feature]);
  const shots = !f.beyond ? [] : gallery.keys.map((k) => photos[k]).filter((p) => p?.src);

  app.innerHTML = `
    <div class="shell" id="top">
      ${d.sidebar(site, copy.intro, photos.headshot?.src ? photos.headshot : null, nav, focus.startedOn, projects.length)}
      <main class="main" id="main">
        ${d.about(copy.about, stats, f.now ? copy.now : null)}
        ${f.focus ? d.focusBlock(focus, focus.startedOn, projects.length) : ""}
        ${d.experience(copy.experienceCopy, copy.career, roles, tracks, site.resume)}
        ${projects.length ? d.projectsBlock(copy.projectsCopy, projects) : ""}
        ${f.toolkit ? d.toolkitBlock(toolkit) : ""}
        ${f.journey ? d.storyBlock(copy.journey) : ""}
        ${f.beyond ? d.lifeBlock(copy.life, shots) : ""}
        ${f.ask ? d.askBlock(ask, site.name.first) : ""}
        ${d.devFooter(site, copy.footer)}
      </main>
    </div>
    ${shots.length ? viewerDialog() : ""}
    ${f.palette ? palette() : ""}`;

  // Live "days since" counters ({days} in copy, liveDaysSince in stats).
  app.querySelectorAll("[data-live-days]").forEach((el) => {
    const days = Math.max(0, Math.floor((Date.now() - new Date(el.dataset.liveDays + "T00:00").getTime()) / 86400000));
    el.textContent = days;
  });

  const $ = (s) => app.querySelector(s);
  mountSpy({ links: [...app.querySelectorAll(".side__nav [data-spy]")] });
  mountSpotlight(document.body);
  mountGlow(app, ".career, .story, .ask__panel, .proj, .entry, .browser, .now");
  if (f.field) mountField(document.body);
  if (f.scramble) mountScramble(app.querySelectorAll(".sec__label"));
  mountProgress(document.body);
  mountTilt(app, ".shot", 7);
  mountTilt(app, ".proj:first-child", 3);
  mountVideos(app);
  if (f.ask) mountAsk({ root: $("#ask"), ask });
  const journeyCtl = f.journey ? mountJourney({ root: $("#story"), journey: createJourney({ stops }), photos, base: f.mapBorders ? mapBase : null }) : null;
  if (shots.length) mountGallery({ root: $("#life"), dialog: $(".viewer"), items: shots });
  let careerCtl = { replay() {} };
  if (f.career) careerCtl = mountCareer({ root: $(".career"), career: createCareer({ roles, tracks, today: site.today }), tracks });

  // Clicking a role in the chart panel scrolls to that entry.
  app.addEventListener("click", (e) => {
    const a = e.target.closest("[data-open-role]");
    if (a) document.getElementById(`role-${a.dataset.openRole}`)?.classList.add("is-flash");
  });

  if (f.palette) {
    const jump = (label, href, keywords = "") => ({ label, hint: "jump", href, keywords });
    const commands = [
      ...nav.map((s) => jump(s.label, s.href, s.keywords)),
      ...(f.journey ? [{ label: "Play my story", hint: "action", action: "play-journey", keywords: "map" }] : []),
      ...roles.map((r) => ({ label: r.org, hint: r.title.toLowerCase(), href: `#role-${r.id}`, keywords: `${r.title} ${tracks[r.track]} ${r.place}` })),
      ...projects.map((p) => ({ label: p.title, hint: "project", href: "#projects", keywords: p.tags.join(" ") })),
      ...site.commands,
      ...(site.resume ? [{ label: "Download résumé (PDF)", hint: "file", href: site.resume }] : []),
      { label: "Open LinkedIn", hint: "link", href: site.contact.linkedin },
    ];
    const actions = {
      "replay-career": () => { $(".career")?.scrollIntoView({ behavior: "smooth" }); careerCtl.replay(); },
      "play-journey": () => { $("#story")?.scrollIntoView({ behavior: "smooth" }); journeyCtl?.go(0); journeyCtl?.play(); },
    };
    const pal = mountPalette({ dialog: $(".palette"), commands, actions });
    app.querySelectorAll("[data-open-palette]").forEach((b) => b.addEventListener("click", pal.open));
  }

  startMotion({ enabled: f.motion });
}
