# Portfolio Kit

Build a personal portfolio website from your résumé and LinkedIn with Claude, put it online for free,
and feature it on your LinkedIn profile. Same engine as
[isaacrentmeester.vercel.app](https://isaacrentmeester.vercel.app), with University of Minnesota
maroon, gold and white by default.

**What you get:** a one-page site with a sticky sidebar, an About section with your key numbers, a
draggable career chart, experience and projects, a tool-logo grid, a "how I got here" map, photos, an
"Ask me" Q&A and a ⌘K search menu. Works on phones. Free to host.
Sections that don't fit your story (no moves → no map, one job → no chart) drop off automatically,
so the page is never padded.

## Get the kit

**[Download the zip](https://github.com/IsaacRentmeester/portfolio-kit/archive/refs/heads/main.zip)** and unzip it
(the folder is `portfolio-kit-main`). Or on GitHub: **Use this template → Create a new repository**.

## What you need

- Your **résumé** (PDF or Word)
- Your **LinkedIn as a PDF**: on a computer, your profile → **More** → **Save to PDF**
- A **headshot**, plus up to 3 photos of you doing things you care about (optional)
- **Claude**: the desktop app (best) or claude.ai
- About **45 minutes**

## Pick a way

| | Claude desktop app (recommended) | claude.ai chat only |
|---|---|---|
| You need | Claude desktop app with the **Code** tab, or Claude Code | Any browser, file creation turned on |
| How | Open this folder in Claude and type **hi**. Claude asks for your résumé, LinkedIn and photos | Attach `chat-template/portfolio-template.html` + your files, paste prompt **3** |
| Photos, résumé PDF, link-preview image | ✅ all handled | Photos ✅, résumé must be a link, no preview image |
| Updating later | "Update my portfolio: …" | Re-attach the file and ask |

Both end the same way: a free `yourname.vercel.app` link and step-by-step help adding it to LinkedIn
(Featured section + the link under your name). Claude can even add it to LinkedIn for you if you use
Claude in Chrome; it asks before every click that saves or posts.

## Files

```
my-info/            your private inputs (résumé, LinkedIn PDF). Never published.
config/             site.config.js: name, links, colours, which sections show
content/            every word on the page: profile.js, copy.js, projects.js, ask.js, journey.js…
photos/ files/      public photos and the public résumé copy (no phone number)
index.html          page title + link-preview tags (lines marked FILL)
CLAUDE.md           the step-by-step playbook Claude follows
PROMPT.md           prompts to copy, and a message to send friends
guides/             deploy-vercel.md, add-to-linkedin.md (click-by-click)
chat-template/      the one-file version for claude.ai chat
engine/ components/ controllers/ services/ styles/   the site engine. No need to touch.
tools/              check.mjs (pre-publish check), build-single.mjs (one-file build)
```

## Run it locally

Needs [Node.js](https://nodejs.org) 18+.

```bash
node serve.mjs
```

Open http://localhost:4848. Before publishing:

```bash
node tools/check.mjs
```

## Deploy

Vercel, free. See [guides/deploy-vercel.md](guides/deploy-vercel.md): drag and drop at vercel.com/drop,
`npx vercel --prod`, or GitHub + Vercel for auto-updates. Static site: no build step, no env vars.

## Credits

Engine by Isaac Rentmeester, built with Claude Code. Logos from [Simple Icons](https://simpleicons.org) (CC0).
Map outlines from [Natural Earth](https://www.naturalearthdata.com) (public domain).
