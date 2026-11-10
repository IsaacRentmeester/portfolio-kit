# Portfolio Kit

Build a personal portfolio website from your résumé and LinkedIn with any AI (ChatGPT, Gemini, Claude),
put it online for free,
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
- **Any AI assistant**: ChatGPT, Gemini, Claude, Copilot…
- About **45 minutes**

## Pick a way

| | **A. Any AI chat** (easiest) | **B. AI with folder access** (most features) |
|---|---|---|
| Works with | ChatGPT, Gemini, Claude, Copilot, any chat | Claude desktop app (Code tab) or Claude Code, ChatGPT Codex, Gemini CLI, Cursor, Copilot |
| Start | Double-click **`builder.html`** → **Copy the prompt** → paste it into a new chat with your résumé + LinkedIn PDF | Open this folder in the tool and type **hi** |
| Then | Your AI interviews you and writes your site's text as one block of data. Paste it into the builder, add photos, preview, download | The AI reads the playbook (`AGENTS.md`), asks for your résumé and LinkedIn, and edits the site for you |
| Photos | ✅ added in the builder | ✅ |
| Résumé button, link-preview image | Résumé must be a link; no preview image | ✅ both |
| Updating later | Ask your AI for changes, paste the new data, download again | "Update my portfolio: …" |

Both end the same way: a free `yourname.vercel.app` link (drag and drop at vercel.com/drop) and
step-by-step help adding it to LinkedIn (Featured section + the link under your name). If your AI can
control a browser you're signed in to (Claude in Chrome, ChatGPT agent mode, Gemini in Chrome), it can
add it to LinkedIn for you; it asks before every click that saves or posts.

## Files

```
my-info/            your private inputs (résumé, LinkedIn PDF). Never published.
config/             site.config.js: name, links, colours, which sections show
content/            every word on the page: profile.js, copy.js, projects.js, ask.js, journey.js…
photos/ files/      public photos and the public résumé copy (no phone number)
index.html          page title + link-preview tags (lines marked FILL)
builder.html        way A: paste your AI's data, add photos, preview, download your site
chat/               way A: full-prompt.md (the prompt), data-guide.md, example-data.json
AGENTS.md           way B: the step-by-step playbook any AI agent follows
CLAUDE.md GEMINI.md  pointers to AGENTS.md (Claude and Gemini look for these names)
PROMPT.md           prompts to copy, and a message to send friends
guides/             deploy-vercel.md, add-to-linkedin.md, club-session.md (running it with a group)
engine/ components/ controllers/ services/ styles/   the site engine. No need to touch.
tools/              check.mjs (pre-publish check), build-single.mjs (one-file site; --builder rebuilds builder.html)
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
