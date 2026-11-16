# Trakyo Docs — trakyo.io/docs

This repository is the public docs site at **[trakyo.io/docs](https://trakyo.io/docs)**:

- **Help Center** — step-by-step guides for Trakyo customers, written by the support team.
  Lives in [`pages/help/`](pages/help/).
- **API docs** — the developer docs and the API reference. Everything else in [`pages/`](pages/).
  The reference itself is generated from the live API, so nobody writes it by hand.

Search covers everything. Every page is also published as plain text for AI assistants
(`trakyo.io/docs/llms-full.txt`, and `.md` after any page's address).

---

## Writing a Help Center article (support team)

You need a GitHub account with access to this repository. Nothing to install: everything
happens in your browser.

### 0. Your own branch

You work on your own copy of the site, called a **branch**, named `writers/` and your first
name: `writers/anna`. Nothing you do there reaches trakyo.io/docs until Harry publishes it.

- **Once:** on the repository's main page, click the branch dropdown (top left, says
  `main`), type `writers/anna`, and click **Create branch writers/anna from main**.
- **Every time you start:** switch that dropdown to your branch first. Everything below
  happens on it.

### 1. Create the file

1. With your branch selected, open [`pages/help/`](pages/help/).
2. Click **Add file → Create new file**.
3. Type the name as `topic/article-name.md`, for example `integrations/connect-stripe.md`.
   Typing the `/` makes the topic folder. Use lowercase and dashes, no spaces.
   - The **topic** becomes a group in the sidebar and a card on the landing page
     (`getting-started` shows as "Getting started"). Reuse an existing topic when it fits.
   - **New topic?** Also add a file named `topic.json` in its folder, copied from
     [`templates/topic.json`](templates/topic.json): its title, a one-line description for
     its card, an icon name from [lucide.dev/icons](https://lucide.dev/icons) (e.g. `plug`),
     and its place in the list. Without it the folder name is used and the card has no icon.
   - The **article name** becomes the page's address:
     `trakyo.io/docs/help/integrations/connect-stripe`.
4. Copy everything from [`templates/article.md`](templates/article.md) into the file and
   replace the example text with yours.

### 2. Fill in the top block

```
---
title: Connect Stripe
description: Link Stripe so Trakyo can attribute every payment.
order: 2
draft: true
---
```

- **title** — what the article is about, as a customer would say it.
- **description** — one sentence. It shows in search results.
- **order** — its place in the topic's list (1 = first).
- **draft: true** — keeps the article off the live site. Delete the line when it is ready.

### 3. Add screenshots

1. Save the screenshot as a `.png` or `.jpg`, named like `connect-stripe-1.png`.
2. With your branch selected, open your topic folder (`pages/help/integrations/`), click
   **Add file → Upload files**, drop the pictures in, and click **Commit changes**.
3. In the article, write:

   ```
   ![The Integrations page with the Stripe Connect button](./connect-stripe-1.png)
   ```

   The text in `[ ]` describes the picture (for screen readers and search).

**Screenshots are public.** Use the demo account, or blur every real customer name,
email, link and revenue figure before uploading.

### 4. Add a video

Upload the video to **YouTube (unlisted)** or **Loom**, copy its **embed code**
(YouTube: Share → Embed; Loom: Share → Embed) and paste it on its own line:

```
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" title="Connect Stripe walkthrough" allowfullscreen></iframe>
```

Never upload a video file to this repository.

### 5. Formatting

| You want | You write |
|---|---|
| A section heading | `## Step 1: Open Integrations` |
| Bold (buttons, menu names) | `**Connect**` |
| Numbered steps | `1. Click …` on each line |
| A link to another article | `[Connect Stripe](/docs/help/integrations/connect-stripe)` |
| A link into the app | `[Integrations](https://app.trakyo.io/integrations)` |
| A tip box | `:::tip` on one line, your text, then `:::` on its own line |
| Other boxes | `:::note`, `:::warning`, `:::danger` (same shape); `:::note[Before you start]` adds a title |

Don't use `<!-- … -->` comments or `<img>` tags: both break the page. The checks below catch them.

### 6. Save, check, and send it to Harry

1. Click **Commit changes…**, keep **Commit directly to the `writers/anna` branch**, and
   click **Commit changes**. Do this as often as you like. Never open a pull request:
   Harry does that.
2. Wait a minute. Next to your newest change (top of the file list) a dot turns into a green
   tick (the site builds with your article) or a red cross (click it, then **Details**: the
   message says what to fix, in plain words).
3. **Your preview** is your branch's copy of the whole site, drafts included:
   `https://writer-anna-trakyo-docs-site.trakyo.workers.dev/docs/` (your name in place of
   `anna`). Bookmark it. It updates a few minutes after every change; the green tick's
   **Preview** line links to it too.
4. To change a file, open it on your branch and click the pencil. To fix a page that is
   already live, click **Edit this page** at the bottom of it on trakyo.io/docs, switch the
   branch dropdown to yours, then click the pencil.
5. When you're done, tell Harry. He publishes everything on your branch; anything still
   marked `draft: true` stays hidden. The site updates by itself about two minutes later,
   and you keep working on the same branch.

**Rules:** write only about features every customer has (no betas unless Harry says so),
one task per article, and check every step in the app before publishing.

### Writing with Claude

[Claude Code](https://claude.ai/code) can write and edit articles for you, on your branch.

1. Open claude.ai/code, choose the **Trakyo/docs** repository, and set the branch next to it
   to yours (`writers/anna`).
2. Say what you want, in your own words: "Write an article on connecting Stripe. Here are my
   notes: …". Paste screenshots so it can see the screens. It already knows this guide's rules.
3. It saves its work to your branch. Check it on your preview and ask for changes in the same
   chat. Don't click **Create PR**.
4. Pictures: Claude writes the picture line, but upload the image files yourself (step 3).
5. This repository is public: never paste customer names, emails, links or revenue into the
   chat. Claude only knows what you tell it, so still check every step in the app.

### When the Help Center appears

The Help Center switches on by itself when the first article **without** `draft: true` is
merged: `trakyo.io/docs` becomes the landing page (a card per topic), the tabs become
**Help Center · API Docs · API Reference** with **Contact support** and **Open Trakyo** on
the right, and every page gets an **Edit this page** link. Until then the site shows the API
docs only, exactly as before.

---

## For Harry: running the site

- **Look and feel**: [`zudoku.config.tsx`](zudoku.config.tsx) (colours, logo, tabs, the
  support links in `slots`), [`hub/home.mdx`](hub/home.mdx) (the landing page; its topic
  cards come from each folder's `topic.json`), [`public/`](public/) (logos, favicon).
  Every change goes through a pull request you review ([CODEOWNERS](.github/CODEOWNERS)).
- **Preview locally**: `npm ci && npm run dev`, then open the address it prints. Drafts show
  in preview, never on the live site.
- **Publishing**: merging to `main` deploys (`.github/workflows/deploy.yml`). To redeploy by
  hand: Actions → Deploy → Run workflow.
- **Writers' work**: each writer commits to their own branch `writers/<name>`. To publish it:
  **Pull requests → New pull request**, compare `writers/<name>` into `main`, **Create pull
  request**, review on its Preview link, then **Squash and merge**. Afterwards the branch is
  brought up to date with main by itself (`preview.yml`, job `writer-branch`), so the next
  pull request from it shows only new work. Don't press **Delete branch** on those, and keep
  Settings → General → **Automatically delete head branches** off.
- **Previews**: every pull request and every writer's branch gets its own copy of the site
  with drafts shown (`.github/workflows/preview.yml`): `pr-<number>`, linked in a comment and
  deleted when the pull request closes, and `writer-<name>`, at an address that never changes
  and linked from a **Preview** check on the branch's newest commit. They are Cloudflare
  Previews of `trakyo-docs-site` on Trakyo's workers.dev address, public but not indexed. The
  live site is never touched. Forks and Dependabot get none. If a preview failed, the run its
  comment or check links to says why.
- **Undo a bad publish**: open the merged pull request → **Revert** → merge the revert.
  Faster, in an emergency: Cloudflare → Workers → `trakyo-docs-site` → Deployments → roll
  back.
- **API reference freshness**: every hour, the deploy workflow compares the live
  `api.trakyo.io/openapi.json` with the one the site was built from
  (`trakyo.io/docs/openapi.sha256`) and redeploys if it changed.
- **When something fails**, the deploy workflow opens an issue in this repository.
- **The Cloudflare side**: Worker `trakyo-docs-site`, route `trakyo.io/docs*` (attached in
  Cloudflare, not in `wrangler.jsonc`, see the comment there). The deploy token lives in
  Settings → Environments → `production` and can only edit this one Worker.

## For engineers: API docs

- API pages are everything in `pages/` except `pages/help/`; the sidebar is in
  `zudoku.config.tsx`. Internal links use `/docs/...`.
- **Open the docs pull request when the API change ships to production, not before.** This
  repository is public, so an early pull request announces an unreleased feature.
- Every error code the API returns needs `pages/errors/<code>.mdx` (it is the error's
  `doc_url`). The checks fail a pull request when a code in the live API has no page, and
  the deploy opens an issue when an API release adds one.
- Rate limits, scopes and error codes are also stated in the API's own code: keep them in step.
