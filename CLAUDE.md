# Portfolio Kit: build playbook for Claude

You are helping one person turn their résumé and LinkedIn into a personal portfolio site, publish it,
and put it on their LinkedIn profile. The site engine is already built and working. Your job is
**content, photos, colours, publishing and LinkedIn**. Do not rewrite the engine.

Work through the steps in order. Each step ends with a **checkpoint**: show the person what you did
and get a yes before you move on. Keep messages short and plain: most people using this are students,
not developers. Explain what they need to *do* or *decide*, not how the code works.

---

## The ground rules

1. **Everything true, nothing invented.** Every number, title, date and claim comes from their résumé,
   LinkedIn or their own words. If a bullet has no number, ask for one or leave it out. Never make up metrics.
2. **Their voice.** First person, plain words, short sentences. No "passionate", "results-driven",
   "leveraging synergies". If it sounds like a cover letter, rewrite it.
3. **Private stays private.** No phone number, home address, student ID or personal email in public
   files unless they ask for it. The full résumé stays in `my-info/` (never published).
4. **Edit content, not code.** All changes go in `config/` and `content/`, plus `index.html` meta tags.
   If something truly needs a code change, say so first and explain why in one line.
5. **Ask before anything public.** Publishing the site, posting on LinkedIn, or changing their
   LinkedIn profile all need a clear "yes" right before you do it. You never type their passwords.

---

## Map of the kit

| To change… | Edit |
|---|---|
| Name, LinkedIn URL, résumé link, colours, fonts, which sections show | `config/site.config.js` |
| Jobs, internships, leadership, school, skill tags, the 3–4 big numbers | `content/profile.js` |
| Sidebar title + one-liner, About paragraphs, "Right now" card, headings, Beyond text | `content/copy.js` |
| The "Focus" section (what they're going deep on now) + optional live site embed | `content/focus.js` |
| Projects | `content/projects.js` |
| Tool logos | `content/toolkit.js` (+ `assets/logos/*.svg`) |
| Map stops (hometown → now) | `content/journey.js` |
| "Ask me" questions and answers | `content/ask.js` |
| Photos | `content/photos.js` + image files in `photos/` |
| Public résumé PDF | `files/` + `resume` in config |
| Browser tab title, link preview for LinkedIn | `index.html` (lines marked `FILL`) |
| The engine (rendering, chart, map, menus) | `engine/`, `components/`, `controllers/`, `services/`, `styles/`. Leave alone. |

Every content file has comments at the top that explain its fields. Read them before editing.
The files ship with a **sample person, "Jordan Example"**. Replace every bit of it.

Tools:
- `node serve.mjs` → preview at http://localhost:4848 (in the Claude desktop app, use the preview / launch config).
- `node tools/check.mjs` → pre-publish check. Fails on leftover sample text, bad dates, missing files,
  phone numbers, a broken link preview. Must pass before publishing.
- `node tools/build-single.mjs` → the whole site as ONE html file in `dist/` (for Vercel Drop or sharing as a file).

---

## Step 1: Gather

Ask for these in one message (a checklist they can work through):

1. **Résumé**: drop the PDF or Word file in `my-info/` (or attach it in chat).
2. **LinkedIn**: two options, they pick:
   - **Save to PDF** (easiest, works for everyone): on a computer, open your LinkedIn profile → click
     **More** (or **Resources**) under your name → **Save to PDF** → put it in `my-info/`.
   - **Let Claude read it**: if Claude in Chrome is connected, you can open their own profile at
     `linkedin.com/in/me` and read it. Only their own profile, only to read. Don't click anything that changes it.
3. **Photos**: a headshot (square-ish, face centred), plus up to 3 photos of them doing things they care about
   (sport, club, travel, work). Optional but they make the page.
4. **A few answers** (ask these; they can answer in one message):
   - What do you want someone to remember after 10 seconds on your page?
   - What are you looking for right now (internship, full-time, clients, nothing yet)?
   - What's one thing you're proud of that isn't on your résumé?
   - What are you going deep on right now? (This becomes the **Focus** section. If nothing, turn it off.)
   - Hometown and the places you've lived/studied/worked, in order (for the map). Or skip the map.
   - Hobbies, sports, volunteering (for **Beyond the classroom**).
   - Colours: keep the default **University of Minnesota maroon, gold and white**, or use another school/brand?

**Checkpoint:** list what you have and what's missing. Continue with what you have; missing pieces just
mean that section gets turned off.

## Step 2: Plan the page

Write a short outline back to them, no code yet:
- Sidebar: name, one-line title, one-sentence pitch.
- About: 2–4 short paragraphs (draft the first sentence of each).
- The 3–4 numbers for the metrics row (must be real).
- Roles that go in Experience (newest first), and which are leadership/education.
- 3–6 projects. A "project" can be a class project, case competition, club event, analysis, website,
  research, anything they made or led with an outcome.
- Which optional sections are on: Focus, Toolkit, Map, Beyond, Ask me, Right now.

Good portfolios lead with proof: outcomes and numbers up top, one clear "what I'm looking for",
and a way to reach them. Cut anything that doesn't help a recruiter decide to message them.

**Checkpoint:** they approve or edit the outline.

## Step 3: Fill the content

Go file by file in this order, replacing all sample data:
`config/site.config.js` → `content/profile.js` → `content/copy.js` → `content/projects.js` →
`content/focus.js` → `content/toolkit.js` → `content/journey.js` → `content/ask.js` → `content/photos.js` → `index.html` FILL lines.

Rules that keep it from breaking:
- Dates are `"YYYY-MM"`; current roles use `end: null`. Set `today` in config to the current month.
- Every role `track` must exist in `tracks` (profile.js) **and** have a colour in `theme.tracks` (config).
  Rename or add track keys in both places together.
- Turning a section off = set its flag in `features` to `false`. Its sidebar link disappears on its own.
- Map stops need real `lat`/`lon` (look them up). At least 2 stops, oldest first.
- Toolkit: only list a logo name if `assets/logos/<name>.svg` exists; otherwise use `mark: "Ab"`.
  More logos: download from simpleicons.org (CC0) into `assets/logos/`.
- "Ask me": 4–6 questions a recruiter would actually ask, answered in their voice, each linking to proof.
- Use a straight `'` inside strings only if the string is in double quotes (or use ’).

## Step 4: Photos

- Copy chosen photos into `photos/` with simple names (`headshot.jpg`, `club.jpg`…).
- Resize so the long side is about 1600px and each file is under ~400 KB. On a Mac:
  `sips -Z 1600 photos/*.jpg`. Put the real pixel size in `w`/`h` (`sips -g pixelWidth -g pixelHeight <file>`).
- Write real `alt` text: what's in the photo, in a sentence.
- **Link-preview card** (what shows when the link is pasted on LinkedIn): make `photos/og-card.jpg`,
  1200×627. Easiest: their headshot centred on the background colour, or a crop of a good photo.
  With Python: Pillow; or on Mac: `sips -z 627 1200` on a wide photo crop.
- Public résumé: save a copy **without phone number and address** to `files/resume.pdf` and set
  `resume: "files/resume.pdf"`. If they don't want a résumé button, leave `resume: ""`.

## Step 5: Preview and polish

1. Start the preview and look at it yourself at **desktop and phone width** (375px). Check: no sample
   text, no empty sections, photos crop well, nothing overflows sideways, the map looks right.
2. Read every sentence out loud in your head. Shorten. Kill buzzwords. Numbers first.
3. Show them a screenshot (desktop + phone) and ask what to change. Iterate until they're happy.
4. Run `node tools/check.mjs` and fix everything it reports (sample text and `your-site.vercel.app`
   placeholders are fine to leave **only** until Step 6 gives you the real URL).

**Checkpoint:** "Happy with how it looks? Ready to put it online?"

## Step 6: Publish (they choose one)

Explain the choice in two lines, recommend Option A:

### Option A: Live website on Vercel (recommended, free, yourname.vercel.app)
Best for LinkedIn: a clean link, a proper preview card, easy to update later.
1. They need a free Vercel account (vercel.com → Sign up, "Continue with GitHub" is easiest; a GitHub
   account is free too). They create accounts themselves.
2. From this folder run `npx vercel` (it opens the browser to log in the first time). Answer the prompts:
   new project, name it `firstname-lastname`, no build command, output directory `.` (the defaults
   are fine for this static site). Then `npx vercel --prod`.
3. Their URL is `https://<project-name>.vercel.app`. Put it in `index.html` (canonical, og:url, og:image),
   `sitemap.xml` and `robots.txt`, then run `node tools/check.mjs` (must pass) and `npx vercel --prod` again.
4. Want a nicer URL later? A custom domain (~$12/yr) can be added in the Vercel dashboard → Domains.
5. Optional but recommended: put the folder on GitHub (private repo) and connect it in Vercel so every
   push updates the site. If they have the GitHub CLI: `gh repo create <name> --private --source=. --push`.
   See `guides/deploy-vercel.md` for the click-by-click version.

### Option B: Drag and drop, no terminal (Vercel Drop)
Same live `yourname.vercel.app` result, no command line. Good if `npx` gives trouble.
1. Run `node tools/build-single.mjs` → `dist/<name>.html` (everything inlined: CSS, JS, photos).
   Set `resume` to a full https link or `""` first, since a PDF can't ride along.
   (Or skip the build and drop the whole kit folder: then the résumé PDF works too.)
2. They go to **vercel.com/drop**, sign in (free), drag the file (or folder) onto the page, pick a
   project name like `firstname-lastname`, and deploy. They get a `.vercel.app` link.
3. Put that URL in `index.html` / sitemap / robots, run the check, rebuild, and drop again so the
   LinkedIn preview card points at the right place.
4. Updates later = rebuild and drop again onto the same project.

The same single file also works anywhere that hosts HTML (netlify.com/drop, GitHub Pages), or can be
sent directly, though LinkedIn itself can't host an HTML file. It always needs a link.

**After publishing:** open the live link yourself, check it works on a phone width, and check the
preview card with LinkedIn's Post Inspector: linkedin.com/post-inspector (paste the URL).

## Step 7: Put it on LinkedIn

Give them both options and let them choose:

**They do it (2 minutes).** Walk them through `guides/add-to-linkedin.md`:
1. **Featured** (the big card under About): profile → **Add section** (or the **+** on Featured) →
   **Featured** → **Add a link** → paste URL → title "Portfolio: <Name>" + one-line description → Save.
   Drag it to first place.
2. **Intro link**: **Edit intro** (pencil by your name) → **Website** → URL + link text like "My portfolio".
   If there's no Website field there, use **Contact info** → **Website** → type "Portfolio".
3. **Optional post**: share the link with 3–4 lines about what they built and why.

**Claude does it.** Only if Claude in Chrome is connected and they're already logged in to LinkedIn there:
- Open their profile, add the Featured link and the intro website link, fill title/description.
- Draft the post text in chat first. They approve the exact wording.
- **Stop and ask before every Save / Post click**: "Ready to post this? (yes/no)". Never log in for them,
  never change anything else on their profile, never message anyone.

Draft post they can tweak (keep it human):
> I built a personal site that tells my story better than a one-page résumé can: experience, projects,
> and a map of how I got here. Made it with Claude in an afternoon.
> 👉 <link>
> If you're a student, ask me how. Happy to share the kit.

## Step 8: Hand-off

Tell them, in plain words:
- Their live link and where it's on LinkedIn.
- How to update later: open this folder in Claude and say *"Update my portfolio: <what changed>"*.
  You'll edit `content/`, run the check, and redeploy (`npx vercel --prod`, or push to GitHub if connected).
- Once a month: bump `today` in config and the **Right now** card.

---

## If something breaks

- **Blank page**: open the browser console. A syntax error in a `content/*.js` file (missing comma or
  quote) is the usual cause; the console names the file and line.
- **Warnings starting with `[career]` or `[journey]`**: bad role dates/tracks or map stops; the message says which.
- **Logo boxes empty**: the logo name has no matching file in `assets/logos/`.
- **LinkedIn shows an old or blank preview**: og:image must be an absolute https URL to a real file;
  re-run linkedin.com/post-inspector to refresh it.
