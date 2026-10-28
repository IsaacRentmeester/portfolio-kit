// Page copy. Edit words here. SAMPLE data.
export const intro = {
  title: "Marketing · Carlson School of Management, UMN", // under your name in the sidebar
  line: "I turn messy marketing data into decisions, and lead the student Marketing Club.", // one sentence pitch
  // Small status line. {days} = days since focus.startedOn (content/focus.js), {projects} = number of projects.
  status: "{days} days building with AI · {projects} projects shipped",
};

// 2–4 short paragraphs in your own voice. First person. No buzzwords.
export const about = {
  paragraphs: [
    "I'm a Marketing student at University of Minnesota. This summer I interned on the analytics team at Northwind Outdoor, where I learned that the best marketing decision is usually hiding in a spreadsheet nobody opens.",
    "I lead the Marketing Club, which grew from 25 to 60 members in a year after we started bringing in local founders as speakers.",
    "Before college I worked as a shift lead at a coffee shop, which taught me more about people than any class.",
  ],
};

// "Right now" card in About (feature: now). 3–4 lines. Bump `updated` when it changes.
export const now = {
  heading: "Right now",
  updated: "Oct 2026",
  items: [
    { k: "Studying", v: "Marketing at University of Minnesota, Class of 2028." },
    { k: "Leading", v: "Marketing Club: 60 members, a speaker every month." },
    { k: "Looking for", v: "A summer 2027 marketing analytics internship." },
  ],
};

export const career = {
  heading: "Experience, compounding",
  note: "Drag across the chart. Every role adds a role-month for each month it ran.",
  sliderLabel: "Career timeline, use arrow keys to move by month",
};

export const experienceCopy = { heading: "Experience", resume: "View full résumé" };
export const projectsCopy = { heading: "Projects" };

// The map section (feature: journey). Stops live in content/journey.js.
export const journey = {
  heading: "From Fargo to Minneapolis",
  note: "Step through it or press play.",
  play: "Play",
  milesLabel: "miles so far",
};

// "Beyond the classroom" (feature: beyond). Photos come from content/photos.js → gallery.
export const life = {
  heading: "Beyond the classroom",
  text: "Outside of class I run trail half-marathons, volunteer with a youth soccer league and cook way too much on Sundays.",
  facts: [
    { k: "Running", v: "Three trail half-marathons" },
    { k: "Volunteering", v: "Youth soccer coach since 2023" },
    { k: "Off the clock", v: "Cooking, hiking, film photography" },
  ],
};

export const footer = {
  line: "Designed and built with Claude Code. Hosted on Vercel.",
};
