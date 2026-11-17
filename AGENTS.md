# Working in this repository (for AI assistants)

This is the public docs site at trakyo.io/docs, built with Zudoku. Read README.md first.

## Helping someone write a Help Center article

- Articles live in `pages/help/<topic>/<article>.md`: plain Markdown (`.md`, never `.mdx`),
  one topic folder deep, lowercase names with dashes. Start from `templates/article.md`.
- A new topic folder gets a `topic.json` (copy `templates/topic.json`): title, one-line
  description, a lucide.dev icon name, order.
- Front matter: `title`, `description` (one sentence), `order` (number), and `draft: true`
  while it is not ready. Drafts never reach the live site.
- Write for customers who are not technical: short sentences, numbered steps, bold for
  buttons and menu names (`**Integrations**`), one task per article, and say what the
  reader should see when it worked.
- **No fluff in the intro.** One or two plain sentences saying what the article covers and
  what the feature does — "The Trakyo integration with GoHighLevel tracks the leads who
  fill in your forms, surveys and quizzes, and who book calls on your GHL calendars."
  No selling, no "no more guessing", no promises about what the reader will feel. Write
  more only when there is genuinely more to say about the article itself. The same goes
  for the rest of the article: state what a thing does, and stop.
- Describe only what the product really does. If you are not sure how a screen or setting
  behaves, ask the writer to check in the app rather than guessing. Never describe beta or
  unreleased features: this repository and site are public.
- Pictures: `![What it shows](./file-name.png)`, the file in the same folder as the article.
  Never `<img>` tags. Never HTML comments (`<!-- -->`): they fail the build. Every picture
  is centred in the column by the site itself (`theme.customCss` in `zudoku.config.tsx`),
  so never add alignment markup.
- A picture pairing two logos (an integration banner) shows both at the **same artwork
  height**, measured from the artwork itself, not from the file's own padding. Centre them
  on a plain background with a `+` between.
- Separate the sections of an article with `---` on its own line between them, including
  before the first one.
- Videos: paste the YouTube or Loom embed `<iframe>`; never commit video files.
- Callouts: `:::tip`, `:::note`, `:::warning`, `:::danger`, closed by `:::` on its own line.
- Links to other docs pages start with `/docs/` (e.g. `/docs/help/integrations/connect-stripe`).
- No customer data anywhere: names, emails, revenue, links.
- To check your work: `npm ci && npm run fetch-spec && npm run check`, then `npm run build`.
  `npm run dev` previews the site with drafts included.
- **Where to save:** the support team shares one branch, `writers/support`. Commit and push
  every change there (`git push origin HEAD:writers/support`), never to another branch, and
  never force-push: someone else's work may be on it. Before you start and before every push,
  run `git pull --no-rebase origin writers/support`; if that reports a conflict, stop and tell
  the writer which file, rather than choosing a side. **Never open a pull request**: Harry
  opens them. The shared preview, drafts included, is
  `https://writer-support-trakyo-docs-site.trakyo.workers.dev/docs/`, updated a few minutes
  after each push.

## API docs (engineers)

- Every page in `pages/` except `pages/help/`. Their sidebar is listed by hand in
  `zudoku.config.tsx` (`apiNavigation`); the Help Center sidebar is generated from the folders
  by `scripts/gen-help-nav.mjs`.
- The API reference under `/docs/api` is generated from the live `api.trakyo.io/openapi.json`
  at build time. Do not hand-write it.
- Every error code in the live spec needs `pages/errors/<code>.mdx`; `scripts/check.mjs`
  enforces it.
- Open a pull request here only once the API change it documents is live in production.

## Never

- Change `.github/`, `wrangler.jsonc`, `worker.js` or `scripts/` as part of an article.
- Add a `routes` entry to `wrangler.jsonc` (see the comment there), or deploy by hand.
