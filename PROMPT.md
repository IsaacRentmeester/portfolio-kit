# Prompts to copy

Three blocks: the message you send a friend, the route for **any AI chat** (ChatGPT, Gemini, Claude…),
and the route for **AI tools that can open this folder** (Claude desktop app, Claude Code, ChatGPT Codex,
Gemini CLI, Cursor, Copilot).

---

## 1. Message to send a friend

> Hey! I made a kit so you can build a personal portfolio site like mine (https://isaacrentmeester.vercel.app)
> and put it on your LinkedIn. It works with ChatGPT, Gemini or Claude, and your AI does most of the work.
> You'll need your résumé, your LinkedIn saved as a PDF, a headshot, and about 45 minutes.
>
> 1. Download it: https://github.com/IsaacRentmeester/portfolio-kit/archive/refs/heads/main.zip and unzip it.
> 2. Double-click builder.html → "Copy the prompt" → paste it into a new ChatGPT, Gemini or Claude chat
>    with your résumé and LinkedIn PDF attached. Your AI interviews you and writes your site.
> 3. Paste what it writes back into the builder, add photos, preview, and download your site.
> 4. Drag the downloaded zip onto vercel.com/drop to put it online for free, then ask your AI "add it to my LinkedIn".
>
> Have the Claude desktop app, Codex or Gemini CLI? Open the folder in it and type "hi" instead.
> It ships in UMN maroon and gold, and your AI can change the colours.

---

## 2. Any AI chat (ChatGPT, Gemini, Claude, Copilot), no install

1. Double-click **`builder.html`** in the kit (it opens in your browser).
2. Click **Copy the prompt**. (Or open `chat/full-prompt.md` and copy all of it.)
3. Start a new chat in ChatGPT, Gemini or Claude. Paste the prompt and attach your résumé and your
   LinkedIn PDF (LinkedIn profile → More → Save to PDF).
4. Answer its questions. It sends your site as one block of JSON.
5. Paste that into step 2 of the builder → **Check and preview**. If it lists problems, click
   **Copy this list**, paste it back to your AI, and paste its new JSON.
6. Add photos, check the preview at desktop and phone width, **Download my site**.
7. Drag the downloaded `…-site.zip` onto **vercel.com/drop** (free sign-in; if your Mac unzipped it, drag the folder). Give your AI the link, paste the
   updated JSON, download again and drop it on the same project.
8. Ask your AI: **"Add it to my LinkedIn."**

Updating later: open a chat, attach your downloaded site file or paste your last JSON, say what changed,
and paste the new JSON into the builder.

---

## 3. AI tools that can open this folder

Unzip the kit and open the **portfolio-kit-main** folder in your tool, then type anything, even "hi":

| Tool | How to open the folder |
|---|---|
| Claude desktop app | **Code** tab → open folder |
| Claude Code | `cd portfolio-kit-main` then `claude` |
| ChatGPT Codex | `cd portfolio-kit-main` then `codex` (or open it in the Codex app) |
| Gemini CLI | `cd portfolio-kit-main` then `gemini` |
| Cursor / VS Code + Copilot | File → Open Folder, then use the agent chat |

The tool reads the playbook (`AGENTS.md`; Claude and Gemini get pointed to it by `CLAUDE.md` / `GEMINI.md`)
and immediately asks for your résumé, LinkedIn and photos. If it doesn't, paste:

```
I want to build my personal portfolio website with this kit and put it on my LinkedIn.

Read AGENTS.md first and follow its steps in order, checking in with me at each checkpoint.
I'm not a developer: keep explanations short and tell me exactly what to click or upload.

My résumé and LinkedIn PDF are in my-info/ (or I'll attach them now).
Start with Step 1: tell me what you have and what you still need from me.
```

Updating later, in the same folder:

```
Update my portfolio: <what changed: new job, new project, new photo>. Then run the check and republish.
```
