# Portfolio data: field guide

The whole site is one JSON object. Keep every key from the example; change the values.
Text is plain text (no HTML, no Markdown). Dates are "YYYY-MM". `null` means "present" for end dates.

## site
- `name.first`, `name.last`: their name. `monogram`: 2–3 initials.
- `today`: the current month, "YYYY-MM". The career chart runs up to it.
- `url`: their live link once published (e.g. "https://jordan-lee.vercel.app"), else "".
- `ogImage`: leave as is.
- `resume`: a full https:// link to a public résumé (no phone number), or "" to hide résumé buttons.
- `contact.linkedin`: their linkedin.com/in/... link. `contact.extra`: one more footer link `{ label, href }`, href "" hides it.
- `theme.colors`: page colours. Default is University of Minnesota maroon (#7a0019), gold (#ffcc33) and white.
  `accent` = their colour, `accent-ink` = text on the accent (dark if the accent is light), `accent-2` = big background glow.
- `theme.tracks`: a colour for every key in `tracks`.
- `sections`: sidebar links. Leave as is (sections that are off or too thin hide themselves).
- `thresholds`: minimum real content per section. Leave as is.
- `features`: true/false per section: focus, toolkit, career (chart), journey (map), mapBorders, beyond, ask,
  palette (⌘K menu), now ("Right now" card), field, scramble, motion (effects).

## copy
- `intro.title`: under their name, e.g. "Finance · Carlson School of Management, UMN".
- `intro.line`: one-sentence pitch. `intro.status`: small status line; `{days}` = days since focus.startedOn,
  `{projects}` = number of projects. Rewrite it if those don't fit.
- `about.paragraphs`: 2–4 short paragraphs, first person.
- `now`: "Right now" card: `heading`, `updated` ("Oct 2026"), `items` [{ k, v }] 2–4 lines.
- `career`, `experienceCopy`, `projectsCopy`: headings. Leave unless asked.
- `journey`: map heading ("From <hometown> to <now>"), note, play, milesLabel.
- `life`: "Beyond the classroom": `heading`, `text`, `facts` [{ k, v }].
- `footer.line`: e.g. "Designed and built with ChatGPT. Hosted on Vercel."

## roles (newest first)
`{ id, track, inChart, section, title, org, place, start, end, link?, summary, points[], tags[] }`
- `id`: short unique slug. `track`: a key of `tracks`. `section`: "experience" | "leadership" | "education" | "life".
- `inChart`: false keeps it off the career chart. `link`: optional `{ label, href }`.

## tracks
Key → label, e.g. `{ "school": "School", "work": "Work", "internship": "Internships" }`. Every key needs a colour in `site.theme.tracks`.

## stats
3–4 real numbers: `{ count, decimals?, prefix?, suffix?, label }` or `{ liveDaysSince: "YYYY-MM-DD", label }`.

## stops (map, oldest first)
`{ id, label, place, lat, lon, when, title, text, photo? }`. Real coordinates. `label`: "above" | "below" | "left" | "right".
`photo`: one of the photo keys below.

## photos and gallery
Keys are fixed: `headshot`, `one`, `two`, `three`. Keep `src: ""`; the builder fills it when they add photos.
Write `alt` (what's in the photo) once you know which photos they'll use. `gallery.keys`: which of one/two/three show in Beyond.

## ask
`{ heading, note, items: [{ q, a, link: { label, href } }] }`, 3–6 recruiter questions answered in their voice.

## projects (first one is featured)
`{ title, when, for, text, result, tags[], link? }`. `result` = short outcome, e.g. "4 hours → 30 minutes".

## focus
`{ startedOn: "YYYY-MM-DD", label, lead, timeline: [{ when, text }], club: { heading, note, url } }`.
What they're going deep on now. `club.url` embeds a live site; "" hides it.

## toolkit
`{ heading, more, groups: [{ label, tools: [{ name, logo? or mark, brand }] }] }`.
`logo` must be one of: adobe, adobeacrobatreader, blender, canva, claude, github, gmail, googlecalendar, googledocs,
googledrive, googlegemini, googlesheets, googleslides, instagram, microsoftexcel, microsoftpowerpoint, microsoftword,
netlify, openai, playwright, quickbooks, shadcnui, supabase, vercel, zoom. Otherwise use `mark`: 1–2 letters.
`brand`: hover colour.
