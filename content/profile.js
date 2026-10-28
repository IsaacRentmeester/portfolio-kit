// Your record: every job, internship, leadership role and school. Source of truth: résumé + LinkedIn.
// SAMPLE data. Dates "YYYY-MM"; end: null = present. Newest first.
// track: one key from `tracks` below (sets the chart colour). section: "experience" | "leadership" | "education" | "life".
// section "life" keeps a role out of the Experience list (it still shows in the chart).
// inChart: false keeps a role in the list but out of the career chart. tags show as skill chips.
// link (optional): { label, href } shows a ↗ next to the title.
export const roles = [
  {
    id: "analytics-intern", track: "internship", inChart: true, section: "experience",
    title: "Marketing analytics intern", org: "Northwind Outdoor Co.", place: "St. Paul, MN",
    start: "2026-05", end: "2026-08",
    summary: "Owned weekly campaign reporting for a 12-person marketing team.",
    points: [
      "Rebuilt the weekly campaign dashboard in Excel, cutting report prep from 4 hours to 30 minutes.",
      "Found a $40K/yr overspend on two underperforming ad channels and presented the fix to the CMO.",
    ],
    tags: ["Excel", "Google Analytics", "Reporting"],
  },
  {
    id: "club", track: "leadership", inChart: true, section: "leadership",
    title: "President", org: "Marketing Club, University of Minnesota", place: "Minneapolis, MN",
    start: "2025-09", end: null, link: { label: "Club site", href: "https://example.com" },
    summary: "Lead a 60-member student club and its six-person board.",
    points: [
      "Grew membership from 25 to 60 in one year with a new speaker series.",
    ],
    tags: ["Leadership", "Events"],
  },
  {
    id: "barista", track: "work", inChart: true, section: "experience",
    title: "Shift lead", org: "Corner Coffee", place: "Minneapolis, MN",
    start: "2024-06", end: "2026-04",
    summary: "Ran closing shifts and trained new staff.",
    points: [],
    tags: ["Operations", "Training"],
  },
  {
    id: "school", track: "school", inChart: true, section: "education",
    title: "BS, Marketing", org: "University of Minnesota", place: "Minneapolis, MN",
    start: "2024-09", end: null,
    summary: "3.8 GPA, Dean's List. Class of 2028.",
    points: [],
    tags: ["Marketing", "Statistics"],
  },
];

// Track keys and their labels. Colours for each key live in config/site.config.js → theme.tracks.
export const tracks = { school: "School", work: "Work", internship: "Internships", leadership: "Leadership", sport: "Sport" };

// The metrics row under About: 3–4 numbers. Every number must be real and provable.
// count + optional decimals/prefix/suffix, OR liveDaysSince: "YYYY-MM-DD" to count days up to today.
export const stats = [
  { count: 3.8, decimals: 1, label: "GPA" },
  { count: 60, label: "Club members I lead" },
  { count: 40, prefix: "$", suffix: "K", label: "Yearly overspend I found" },
  { liveDaysSince: "2026-06-01", label: "Days building with AI" },
];
