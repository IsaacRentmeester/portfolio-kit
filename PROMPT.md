# Prompts to copy

Three blocks: the message you send a friend, the prompt for the **Claude desktop app** (recommended),
and the prompt for **plain claude.ai chat** (no install).

---

## 1. Message to send a friend

> Hey! I made a starter kit so you can build a personal portfolio site like mine
> (https://isaacrentmeester.vercel.app) and put it on your LinkedIn. Claude does most of the work.
> You'll need: your résumé, your LinkedIn saved as a PDF, a headshot, and about 45 minutes.
>
> 1. Download the kit: https://github.com/IsaacRentmeester/portfolio-kit/archive/refs/heads/main.zip
>    (unzip it; the folder is called portfolio-kit-main)
> 2. Open the Claude desktop app → Code tab → open the portfolio-kit-main folder → type "hi".
>    Claude takes it from there: it asks for your résumé, reads your LinkedIn, and walks you through going live.
>    (No desktop app? The README has a claude.ai-only version.)
>
> It ships in UMN maroon and gold. Claude can switch it to any colours you want.

---

## 2. Claude desktop app (Code tab) or Claude Code — recommended

Unzip the kit, open the **portfolio-kit-main** folder in the Claude desktop app's **Code** tab
(or run `claude` inside it) and type anything, even "hi". Claude reads the kit's `CLAUDE.md` and
immediately asks for your résumé, LinkedIn and photos. If you'd rather be explicit, paste:

```
I want to build my personal portfolio website with this kit and put it on my LinkedIn.

Read CLAUDE.md first and follow its steps in order, checking in with me at each checkpoint.
I'm not a developer: keep explanations short and tell me exactly what to click or upload.

My résumé and LinkedIn PDF are in my-info/ (or I'll attach them now).
Start with Step 1: tell me what you have and what you still need from me.
```

Updating later, in the same folder:

```
Update my portfolio: <what changed: new job, new project, new photo>. Then run the check and republish.
```

---

## 3. Plain claude.ai chat (no install)

1. In claude.ai: **Settings → Capabilities** → turn on **Code execution and file creation**.
2. Start a new chat. Attach: `chat-template/portfolio-template.html` from the kit, your résumé,
   your LinkedIn PDF (profile → More → Save to PDF), and optionally a headshot + up to 3 photos.
3. Paste:

```
You're helping me build my personal portfolio site from the attached template, then put it on LinkedIn.

THE TEMPLATE
- portfolio-template.html is a finished, working one-page site. All of its content lives in ONE block
  between "PORTFOLIO DATA" comments: `window.PORTFOLIO = {...}`. The comment above it lists every field.
- Edit ONLY that data block (and the <title>, meta description and og: tags in <head>). Never edit or
  re-type the engine script below it. Use your file tools to edit the file in place, then give me the file.
- It currently holds a sample person, "Jordan Example". Replace all of it.
- Default colours are University of Minnesota maroon (#7a0019), gold (#ffcc33) and white. Keep them unless
  I ask for others (site.theme.colors / site.theme.tracks).
- Photos: if I attached any, resize to ~1600px long side, JPEG, under 400 KB each, add them to
  window.__ASSETS as data: URLs keyed by a path like "photos/headshot.jpg", and use that same path as
  photos.<key>.src. If you can't, leave src "" (the page hides empty photos).
- Toolkit logos: only use logo names that already exist in window.__ASSETS (assets/logos/<name>.svg);
  otherwise use mark: "Ab" with a brand colour.
- site.resume must be "" or a full https:// link (a PDF can't live inside this file).

THE RULES
- Everything true: every title, date and number comes from my résumé, LinkedIn or my answers. Never invent a metric.
- My voice: first person, short sentences, plain words, no buzzwords ("passionate", "results-driven"...).
- Private stays private: no phone number, home address or student ID anywhere.
- Dates are "YYYY-MM"; current roles have end: null. Every role's track must exist in tracks AND in site.theme.tracks.
- Fit the person, don't pad. Every path is different. Sections below their minimum in site.thresholds
  (map: 3+ stops and 150+ miles; projects 2+; toolkit 5+ tools; career chart 3+ roles; ask 3+; etc.) hide
  themselves automatically. Never invent or stretch content to fill one. Tell me which sections were
  dropped and why, and fix any copy that mentions them.

THE STEPS (check in with me after each)
0. First, before anything else: tell me what you received and ask for anything missing (résumé, LinkedIn PDF
   from profile → More → Save to PDF, photos). If you have web or browser tools that can open my LinkedIn
   profile, offer to read it from my profile link instead of the PDF.
1. Read my résumé and LinkedIn. Ask me, in one message: what I want people to remember in 10 seconds; what
   I'm looking for; one thing I'm proud of that's not on my résumé; what I'm going deep on right now (Focus
   section); the places I've lived/studied/worked in order (map, real lat/lon); hobbies (Beyond section);
   colours (keep maroon/gold?).
2. Show me a short outline: sidebar one-liner, About paragraphs, the 3–4 real numbers, roles, 3–6 projects,
   which sections are on and which you're dropping for lack of real material. Wait for my OK.
3. Fill the data block and hand me the finished HTML file. I'll open it in my browser to check it.
4. Make changes I ask for until I'm happy.
5. Publishing: tell me to go to vercel.com/drop, sign in (free), drag the HTML file onto it, name the project
   firstname-lastname and deploy. When I give you my .vercel.app link, put it into the canonical / og:url /
   og:image tags and give me the final file to drop again on the same project.
6. LinkedIn: give me click-by-click steps to (a) add the link to my Featured section (Add profile section →
   Recommended → Add featured → Add a link), (b) add it to my intro (Edit intro → Website, link text
   "My portfolio"; or Contact info → Website → Portfolio), and (c) a short optional post I can edit.
   If you have browser tools connected to my logged-in LinkedIn, offer to do (a)–(c) for me, but show me
   the exact text first and ask before every Save or Post.
```

Note: the chat route has no link-preview image unless you add `photos/og-card.jpg` to the site;
the Claude desktop app route handles that for you.
