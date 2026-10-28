// Journey map and AI section markup. The map's dots and route are drawn by controllers/journey.js.
import { esc, asset } from "./sections.js";

export const journeyShell = (copy, total) => `
  <section class="journey" id="journey" aria-labelledby="journey-h">
    <div class="journey__head grid" data-reveal>
      <h2 id="journey-h">${esc(copy.heading)}</h2>
      <p>${esc(copy.note)}</p>
    </div>
    <div class="journey__body grid">
      <div class="journey__map" data-ui>
        <svg class="journey__svg" aria-hidden="true"></svg>
        <div class="journey__pins"></div>
        <p class="journey__miles"><span class="journey__miles-num">0</span> ${esc(copy.milesLabel)}</p>
      </div>
      <div class="journey__panel">
        <div class="journey__controls">
          <button class="chip" type="button" data-step="-1">Back</button>
          <button class="chip" type="button" data-step="1">Next</button>
          <button class="button" type="button" data-play>${esc(copy.play)}</button>
        </div>
        <div class="journey__card" aria-live="polite"></div>
        <ol class="journey__steps" aria-label="All stops"></ol>
      </div>
    </div>
  </section>`;

export const journeyCard = (stop, photo) => `
  ${photo ? `<figure class="journey__photo"><img src="${asset(photo.src)}" alt="${esc(photo.alt)}" width="${photo.w}" height="${photo.h}" loading="lazy"></figure>` : ""}
  <h3 class="journey__title">${esc(stop.title)}</h3>
  <p class="journey__when">${esc(stop.when)} · ${esc(stop.place)}</p>
  <p class="journey__text">${esc(stop.text)}</p>`;

// Full-screen photo viewer (opened from the Beyond photos).
export const viewerDialog = () => `
  <dialog class="viewer" aria-label="Photo viewer">
    <figure class="viewer__fig">
      <img class="viewer__img" alt="">
      <figcaption class="viewer__cap"><span class="viewer__alt" hidden></span><span class="viewer__meta"></span></figcaption>
    </figure>
    <button class="viewer__btn viewer__prev" type="button" data-move="-1" aria-label="Previous photo">‹</button>
    <button class="viewer__btn viewer__next" type="button" data-move="1" aria-label="Next photo">›</button>
    <button class="viewer__close" type="button" data-close aria-label="Close">Close</button>
  </dialog>`;
