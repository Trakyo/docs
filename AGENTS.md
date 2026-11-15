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
- Describe only what the product really does. If you are not sure how a screen or setting
  behaves, ask the writer to check in the app rather than guessing. Never describe beta or
  unreleased features: this repository and site are public.
- Pictures: `![What it shows](./file-name.png)`, the file in the same folder as the article.
  Never `<img>` tags. Never HTML comments (`<!-- -->`): they fail the build.
- Videos: paste the YouTube or Loom embed `<iframe>`; never commit video files.
- Callouts: `:::tip`, `:::note`, `:::warning`, `:::danger`, closed by `:::` on its own line.
- Links to other docs pages start with `/docs/` (e.g. `/docs/help/integrations/connect-stripe`).
- No customer data anywhere: names, emails, revenue, links.
- To check your work: `npm ci && npm run fetch-spec && npm run check`, then `npm run build`.
  `npm run dev` previews the site with drafts included.

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
