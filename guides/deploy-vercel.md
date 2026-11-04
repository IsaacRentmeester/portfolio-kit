# Put your site online with Vercel (free)

You get a link like `https://jordan-example.vercel.app`. Three ways, easiest first.
Your AI can walk you through any of them. You only do the sign-ups yourself.

## Way 1: Drag and drop (no terminal)

1. Go to **vercel.com/drop** and sign up / log in (free Hobby plan; "Continue with GitHub" or email).
2. Ask your AI: *"Build the single file"*. It makes `dist/<your-name>.html`.
   (Or just use the whole portfolio folder.)
3. Drag the file or folder onto the page. Name the project `firstname-lastname`. Deploy.
4. Copy your `.vercel.app` link and tell your AI, so it can fix the link-preview tags, then drop again.

To update later: change things with your AI, rebuild, drop onto the same project again.

## Way 2: One command (your AI runs it)

1. Have a Vercel account (step 1 above).
2. Tell your AI: *"Publish my site to Vercel."* It runs `npx vercel` in this folder. The first time,
   a browser window opens. Log in and come back.
3. Answers to the prompts: set up and deploy → yes; link to existing project → no;
   name → `firstname-lastname`; directory → `./`; modify settings → no.
4. Your AI runs `npx vercel --prod` for the final live link.

To update later: *"Update my site"*. Your AI edits and runs `npx vercel --prod` again.

## Way 3: GitHub + Vercel (auto-updates, best long term)

1. Free GitHub account (github.com).
2. Ask your AI: *"Put this on GitHub as a private repo."* (It uses `gh repo create … --private`.)
3. On vercel.com → **Add New… → Project** → import that repo → Framework **Other**, no build command → **Deploy**.
4. From now on, every change your AI commits and pushes goes live by itself in about a minute.

## Custom domain (optional, ~$12/year)

Vercel dashboard → your project → **Settings → Domains** → add `yourname.com` (buy it there or anywhere).
Then update the URLs in `index.html`, `sitemap.xml` and `robots.txt`.
