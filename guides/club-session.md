# Running a club session (45–60 min)

For whoever is leading a room through the kit. Members leave with a live site on their LinkedIn.

## Before the meeting
- Put the QR code (`assets/social/kit-download-qr.png`) or this link on the first slide:
  https://github.com/IsaacRentmeester/portfolio-kit/archive/refs/heads/main.zip
- Tell people to bring a **laptop** (phones can't unzip or drag files easily), their **résumé PDF**, and to be
  logged in to **ChatGPT, Gemini or Claude** (free accounts work).
- Do one run yourself the day before so you've seen every screen.

## Run of show
| Time | Step | What people do |
|---|---|---|
| 0–5 | Demo | Show a finished site (yours) and its LinkedIn Featured card. |
| 5–10 | Get the kit | Scan the QR / open the link, unzip, double-click **builder.html**. |
| 10–15 | LinkedIn PDF | LinkedIn on a laptop → their profile → **More** → **Save to PDF**. |
| 15–30 | Talk to the AI | Builder step 1 **Copy the prompt** → new chat → paste + attach résumé and LinkedIn PDF → answer its questions → approve the outline. |
| 30–40 | Build | Paste the AI's JSON into builder step 2 → **Check and preview** → fix anything it lists → add photos. |
| 40–50 | Go live | **Download my site** → vercel.com/drop → sign in → drag the zip → name it `firstname-lastname` → Deploy. |
| 50–60 | LinkedIn | Ask the AI "add it to my LinkedIn" and follow the steps (Featured → Add a link; Edit intro → Website). |

People who finish early: give the AI their new link so it fills in `site.url`, then re-download and drop again.

## When something goes wrong
| What they see | Fix |
|---|---|
| "Copy the prompt" does nothing | Click **Show the prompt**, select all the text, copy it by hand. |
| No **More → Save to PDF** on LinkedIn | It's under **Resources** on some profiles; or skip it and use just the résumé. |
| The AI stops halfway through the JSON | Say: "Continue, then send the whole JSON again in one code block." |
| Builder says "The JSON has a typo" | Paste that message back to the AI; it sends a fixed version. |
| Builder lists problems (missing date, sample text) | Click **Copy this list**, paste it to the AI, paste back its new JSON. |
| A section they wanted is missing | Too little content for it (e.g. map needs 3 places, 150+ miles). Add real details or skip it. |
| Mac unzipped the download into a folder | Drag the **folder** onto vercel.com/drop instead. That works too. |
| The live link shows **404** | They dropped a single renamed .html file. Drop the `…-site.zip` (it has `index.html` inside). |
| Vercel name is taken | Add a middle initial or number: `jordan-r-example`. |
| Want to edit later | The builder remembers the last JSON on that computer. Also save the AI chat; ask it for changes there. |
