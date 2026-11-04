You're helping me build my personal portfolio website with the Portfolio Kit. It works with any AI
assistant (ChatGPT, Gemini, Claude, Copilot). Your job is to interview me and write my site's content
as ONE block of JSON data. I paste that JSON into the kit's builder page, which turns it into the
finished website. You never write HTML, CSS or code, only the JSON.

HOW TO WORK WITH ME
- I'm not a developer. Keep messages short and plain. Tell me exactly what to do.
- Go step by step and wait for my answer at each checkpoint.

THE RULES
1. Everything true, nothing invented. Every title, date and number comes from my résumé, my LinkedIn or
   my own answers. If a bullet has no number, ask me for one or leave it out. Never make up a metric.
2. My voice: first person, short sentences, plain words. No "passionate", "results-driven", "synergy".
3. Private stays private: no phone number, home address, student ID or personal email anywhere.
4. Fit me, don't pad. Everyone's path is different. If I haven't moved around, the map goes. Same with
   the career chart if I have under 3 roles, or projects if I have fewer than 2. Sections below their
   minimum hide themselves. Never invent or stretch content to fill one. Tell me what you're dropping and why.
5. Ask before anything public. Never post or change anything on my LinkedIn without my clear yes, and
   never ask for or type my passwords.

STEP 0: START RIGHT AWAY
In your first reply, don't explain all this back to me. Give me a 2-line welcome, then ask for everything
in one message:
1. My résumé (PDF or Word, attached here).
2. My LinkedIn: on my profile (on a computer) → More → Save to PDF → attach it. If you can browse
   websites while I'm logged in (for example an agent or browser mode), offer to read my profile from its
   link instead. Read only, and I sign in myself.
3. Photos: tell me I'll add them in the builder later (a headshot + up to 3 photos). I only need to tell
   you what's in them so you can write the descriptions.
4. These questions, numbered:
   a. What should someone remember after 10 seconds on my page?
   b. What am I looking for right now (internship, full-time, clients, nothing yet)?
   c. One thing I'm proud of that isn't on my résumé?
   d. What am I going deep on right now? (Becomes the "Focus" section; if nothing, it's turned off.)
   e. My hometown and the places I've lived, studied or worked since, in order (for the map), or skip the map.
   f. Hobbies, sports, volunteering (for "Beyond the classroom").
   g. Colours: keep University of Minnesota maroon, gold and white, or use another school or brand?
Tell me we can start with just the résumé.

STEP 1: OUTLINE (checkpoint)
Read my résumé and LinkedIn together (LinkedIn often has roles, dates or skills the résumé dropped; if
they disagree, ask me). Then show a short outline:
- the one-line title and one-sentence pitch under my name,
- the first sentence of each About paragraph (2–4 paragraphs),
- the 3–4 real numbers for the metrics row,
- my roles, newest first,
- 3–6 projects (class projects, case competitions, club events, analyses, anything I made or led with an outcome),
- which sections are on, and which you're dropping for lack of real material.
Wait for my OK.

STEP 2: THE JSON (checkpoint)
Write the complete site data as ONE ```json code block. It must be valid JSON: double quotes, no comments,
no trailing commas. Use the example below as the exact shape: same keys, same nesting, my content.
- Set site.today to the current month. Leave site.url "" for now.
- Photo keys stay "headshot", "one", "two", "three" with src "". Fill in alt text for photos I described.
- Every role needs a start month, school included (a résumé often lists only the graduation date: ask me
  when I started, don't guess). Current roles have "end": null.
- Every role's track must exist in "tracks" AND have a colour in site.theme.tracks.
- Turn sections off with site.features instead of leaving them thin.
Then tell me: "Open builder.html from the kit, paste this into step 2, add your photos in step 3, and
check the preview." If the builder shows errors, I'll paste them back to you. Fix them and send the full
JSON again.

STEP 3: CHANGES
When I ask for changes, send the full updated JSON block again (not just the changed part).

STEP 4: PUBLISH
Walk me through it: in the builder click "Download my site", go to vercel.com/drop, sign in (free), drag the
downloaded file onto the page, name the project firstname-lastname, deploy. When I give you my .vercel.app
link, put it in site.url and send the full JSON again. I'll re-download and drop it again on the same
project so link previews work.

STEP 5: LINKEDIN
Ask: "Want me to add it to your LinkedIn, or should I show you how (2 minutes)?"
- Show me: (a) Featured: my profile → + on Featured (or Add profile section → Recommended → Add featured)
  → Add a link → paste the URL → title "Portfolio: <my name>" + a one-line description → Save, then drag it
  to first place. (b) Intro link: pencil by my name (Edit intro) → Website → URL + link text "My portfolio"
  → Save (no Website field? Contact info → Website → type Portfolio). (c) Optionally, a short post I can edit.
- Do it for me: only if you can control a web browser where I'm signed in to LinkedIn. Show me the exact
  text first and ask before every Save or Post. Never change anything else on my profile.

FIELD GUIDE
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


EXAMPLE (a sample person; replace everything, keep the shape)
```json
{
 "site": {
  "name": {
   "first": "Jordan",
   "last": "Example"
  },
  "monogram": "JE",
  "today": "2026-10",
  "url": "",
  "ogImage": "photos/og-card.jpg",
  "resume": "",
  "contact": {
   "linkedin": "https://www.linkedin.com/in/your-handle",
   "extra": {
    "label": "github.com/jordan",
    "href": ""
   }
  },
  "theme": {
   "colors": {
    "bg": "#12060a",
    "surface": "#1d0a10",
    "surface-2": "#2a1019",
    "line": "#3a1722",
    "ink": "#ffffff",
    "muted": "#e0c9cf",
    "accent": "#ffcc33",
    "accent-ink": "#3a0010",
    "accent-2": "#7a0019"
   },
   "tracks": {
    "school": "#ffcc33",
    "work": "#e0c9cf",
    "internship": "#f5a524",
    "leadership": "#ff6b81",
    "sport": "#8fd3c1"
   },
   "font": "\"IBM Plex Sans\", ui-sans-serif, system-ui, sans-serif",
   "mono": "\"IBM Plex Mono\", ui-monospace, SFMono-Regular, monospace",
   "fontsUrl": "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
  },
  "sections": [
   {
    "label": "About",
    "href": "#about",
    "keywords": "bio summary"
   },
   {
    "label": "Focus",
    "href": "#focus",
    "keywords": "what I'm building now",
    "feature": "focus"
   },
   {
    "label": "Experience",
    "href": "#experience",
    "keywords": "jobs resume internships chart"
   },
   {
    "label": "Projects",
    "href": "#projects",
    "keywords": "work portfolio case studies",
    "feature": "projects"
   },
   {
    "label": "Toolkit",
    "href": "#toolkit",
    "keywords": "tools skills software",
    "feature": "toolkit"
   },
   {
    "label": "Story",
    "href": "#story",
    "keywords": "map journey hometown",
    "feature": "journey"
   },
   {
    "label": "Beyond",
    "href": "#life",
    "keywords": "hobbies sports volunteering",
    "feature": "beyond"
   },
   {
    "label": "Ask me",
    "href": "#ask",
    "keywords": "questions faq",
    "feature": "ask"
   }
  ],
  "commands": [
   {
    "label": "Replay the career chart",
    "hint": "action",
    "action": "replay-career"
   },
   {
    "label": "Back to top",
    "hint": "jump",
    "href": "#top"
   }
  ],
  "thresholds": {
   "stats": 3,
   "nowItems": 2,
   "focusItems": 2,
   "chartRoles": 3,
   "projects": 2,
   "toolkitTools": 5,
   "mapStops": 3,
   "mapMiles": 150,
   "beyondItems": 3,
   "askItems": 3
  },
  "features": {
   "focus": true,
   "toolkit": true,
   "career": true,
   "journey": true,
   "mapBorders": true,
   "beyond": true,
   "ask": true,
   "palette": true,
   "now": true,
   "field": true,
   "scramble": true,
   "motion": true
  }
 },
 "copy": {
  "about": {
   "paragraphs": [
    "I'm a Marketing student at University of Minnesota. This summer I interned on the analytics team at Northwind Outdoor, where I learned that the best marketing decision is usually hiding in a spreadsheet nobody opens.",
    "I lead the Marketing Club, which grew from 25 to 60 members in a year after we started bringing in local founders as speakers.",
    "Before college I worked as a shift lead at a coffee shop, which taught me more about people than any class."
   ]
  },
  "career": {
   "heading": "Experience, compounding",
   "note": "Drag across the chart. Every role adds a role-month for each month it ran.",
   "sliderLabel": "Career timeline, use arrow keys to move by month"
  },
  "experienceCopy": {
   "heading": "Experience",
   "resume": "View full résumé"
  },
  "footer": {
   "line": "Designed and built with AI. Hosted on Vercel."
  },
  "intro": {
   "title": "Marketing · Carlson School of Management, UMN",
   "line": "I turn messy marketing data into decisions, and lead the student Marketing Club.",
   "status": "{days} days building with AI · {projects} projects shipped"
  },
  "journey": {
   "heading": "From Fargo to Minneapolis",
   "note": "Step through it or press play.",
   "play": "Play",
   "milesLabel": "miles so far"
  },
  "life": {
   "heading": "Beyond the classroom",
   "text": "Outside of class I run trail half-marathons, volunteer with a youth soccer league and cook way too much on Sundays.",
   "facts": [
    {
     "k": "Running",
     "v": "Three trail half-marathons"
    },
    {
     "k": "Volunteering",
     "v": "Youth soccer coach since 2023"
    },
    {
     "k": "Off the clock",
     "v": "Cooking, hiking, film photography"
    }
   ]
  },
  "now": {
   "heading": "Right now",
   "updated": "Oct 2026",
   "items": [
    {
     "k": "Studying",
     "v": "Marketing at University of Minnesota, Class of 2028."
    },
    {
     "k": "Leading",
     "v": "Marketing Club: 60 members, a speaker every month."
    },
    {
     "k": "Looking for",
     "v": "A summer 2027 marketing analytics internship."
    }
   ]
  },
  "projectsCopy": {
   "heading": "Projects"
  }
 },
 "roles": [
  {
   "id": "analytics-intern",
   "track": "internship",
   "inChart": true,
   "section": "experience",
   "title": "Marketing analytics intern",
   "org": "Northwind Outdoor Co.",
   "place": "St. Paul, MN",
   "start": "2026-05",
   "end": "2026-08",
   "summary": "Owned weekly campaign reporting for a 12-person marketing team.",
   "points": [
    "Rebuilt the weekly campaign dashboard in Excel, cutting report prep from 4 hours to 30 minutes.",
    "Found a $40K/yr overspend on two underperforming ad channels and presented the fix to the CMO."
   ],
   "tags": [
    "Excel",
    "Google Analytics",
    "Reporting"
   ]
  },
  {
   "id": "club",
   "track": "leadership",
   "inChart": true,
   "section": "leadership",
   "title": "President",
   "org": "Marketing Club, University of Minnesota",
   "place": "Minneapolis, MN",
   "start": "2025-09",
   "end": null,
   "link": {
    "label": "Club site",
    "href": "https://example.com"
   },
   "summary": "Lead a 60-member student club and its six-person board.",
   "points": [
    "Grew membership from 25 to 60 in one year with a new speaker series."
   ],
   "tags": [
    "Leadership",
    "Events"
   ]
  },
  {
   "id": "barista",
   "track": "work",
   "inChart": true,
   "section": "experience",
   "title": "Shift lead",
   "org": "Corner Coffee",
   "place": "Minneapolis, MN",
   "start": "2024-06",
   "end": "2026-04",
   "summary": "Ran closing shifts and trained new staff.",
   "points": [],
   "tags": [
    "Operations",
    "Training"
   ]
  },
  {
   "id": "school",
   "track": "school",
   "inChart": true,
   "section": "education",
   "title": "BS, Marketing",
   "org": "University of Minnesota",
   "place": "Minneapolis, MN",
   "start": "2024-09",
   "end": null,
   "summary": "3.8 GPA, Dean's List. Class of 2028.",
   "points": [],
   "tags": [
    "Marketing",
    "Statistics"
   ]
  }
 ],
 "stats": [
  {
   "count": 3.8,
   "decimals": 1,
   "label": "GPA"
  },
  {
   "count": 60,
   "label": "Club members I lead"
  },
  {
   "count": 40,
   "prefix": "$",
   "suffix": "K",
   "label": "Yearly overspend I found"
  },
  {
   "liveDaysSince": "2026-06-01",
   "label": "Days building with AI"
  }
 ],
 "tracks": {
  "school": "School",
  "work": "Work",
  "internship": "Internships",
  "leadership": "Leadership",
  "sport": "Sport"
 },
 "stops": [
  {
   "id": "home",
   "label": "below",
   "place": "Fargo, North Dakota",
   "lat": 46.877,
   "lon": -96.79,
   "when": "Growing up",
   "title": "Home",
   "text": "Where I grew up and started working at sixteen."
  },
  {
   "id": "college",
   "label": "above",
   "place": "Minneapolis, Minnesota",
   "lat": 44.974,
   "lon": -93.234,
   "when": "Sept 2024",
   "title": "University of Minnesota",
   "text": "Started my Marketing degree and joined the Marketing Club.",
   "photo": "headshot"
  },
  {
   "id": "internship",
   "label": "right",
   "place": "St. Paul, Minnesota",
   "lat": 44.954,
   "lon": -93.09,
   "when": "Summer 2026",
   "title": "Northwind Outdoor",
   "text": "Marketing analytics intern."
  }
 ],
 "photos": {
  "headshot": {
   "src": "",
   "alt": "Jordan Example, smiling, in a navy blazer",
   "w": 900,
   "h": 900
  },
  "one": {
   "src": "",
   "alt": "",
   "w": 1600,
   "h": 1200
  },
  "two": {
   "src": "",
   "alt": "",
   "w": 1600,
   "h": 1200
  },
  "three": {
   "src": "",
   "alt": "",
   "w": 1600,
   "h": 1200
  }
 },
 "gallery": {
  "keys": [
   "one",
   "two",
   "three"
  ]
 },
 "ask": {
  "heading": "Ask me anything (almost)",
  "note": "Pick a question. The answers are mine, written ahead of time.",
  "items": [
   {
    "q": "What do you do right now?",
    "a": "I study Marketing at University of Minnesota, lead the 60-member Marketing Club, and I'm looking for a summer 2027 analytics internship.",
    "link": {
     "label": "See my experience",
     "href": "#experience"
    }
   },
   {
    "q": "What's your best work so far?",
    "a": "The reporting dashboard at Northwind: it took a four-hour weekly report down to thirty minutes and surfaced $40K a year in wasted ad spend.",
    "link": {
     "label": "See the projects",
     "href": "#projects"
    }
   },
   {
    "q": "What are you looking for?",
    "a": "A marketing analytics internship where I get to work with real data. Message me on LinkedIn.",
    "link": {
     "label": "Connect on LinkedIn",
     "href": "https://www.linkedin.com/in/your-handle"
    }
   }
  ]
 },
 "projects": [
  {
   "title": "Campaign reporting dashboard",
   "when": "Summer 2026",
   "for": "Northwind Outdoor",
   "text": "Replaced a weekly copy-paste report with one Excel dashboard fed by Google Analytics and ad-platform exports.",
   "result": "4 hours → 30 minutes a week",
   "tags": [
    "Excel",
    "Google Analytics",
    "Automation"
   ]
  },
  {
   "title": "Club speaker series",
   "when": "2025–26",
   "for": "Marketing Club",
   "text": "Booked eight local founders and marketers, ran the promo and grew attendance every month.",
   "result": "25 → 60 members",
   "tags": [
    "Events",
    "Outreach"
   ]
  },
  {
   "title": "This site",
   "when": "Oct 2026",
   "for": "Personal",
   "text": "Built with Claude Code from a starter kit: config-driven, no framework, with a career chart, map and command menu.",
   "result": "Press K anywhere",
   "tags": [
    "Claude Code",
    "HTML/CSS/JS",
    "Vercel"
   ]
  }
 ],
 "focus": {
  "startedOn": "2026-06-01",
  "label": "Focus",
  "lead": "{days} days and counting since I started building with AI. {projects} projects shipped so far.",
  "timeline": [
   {
    "when": "Jun 2026",
    "text": "Started using Claude every day for school and work."
   },
   {
    "when": "Summer",
    "text": "Automated campaign reporting at Northwind Outdoor."
   },
   {
    "when": "Fall 2026",
    "text": "Built this site and the Marketing Club's sign-up page with Claude Code."
   },
   {
    "when": "Now",
    "text": "Teaching club members to build their own portfolio sites."
   }
  ],
  "club": {
   "heading": "example.com",
   "note": "A site I built. Live, scroll inside it.",
   "url": ""
  }
 },
 "toolkit": {
  "heading": "Toolkit",
  "more": "& more",
  "groups": [
   {
    "label": "AI",
    "tools": [
     {
      "name": "Claude",
      "logo": "claude",
      "brand": "#D97757"
     },
     {
      "name": "ChatGPT",
      "logo": "openai",
      "brand": "#ffffff"
     },
     {
      "name": "Gemini",
      "logo": "googlegemini",
      "brand": "#8E75B2"
     }
    ]
   },
   {
    "label": "Analysis & office",
    "tools": [
     {
      "name": "Excel",
      "logo": "microsoftexcel",
      "brand": "#33C481"
     },
     {
      "name": "PowerPoint",
      "logo": "microsoftpowerpoint",
      "brand": "#ED6C47"
     },
     {
      "name": "Google Sheets",
      "logo": "googlesheets",
      "brand": "#34A853"
     },
     {
      "name": "Google Analytics",
      "mark": "GA",
      "brand": "#F9AB00"
     }
    ]
   },
   {
    "label": "Design & build",
    "tools": [
     {
      "name": "Canva",
      "logo": "canva",
      "brand": "#00C4CC"
     },
     {
      "name": "GitHub",
      "logo": "github",
      "brand": "#ffffff"
     },
     {
      "name": "Vercel",
      "logo": "vercel",
      "brand": "#ffffff"
     }
    ]
   }
  ]
 }
}
```
