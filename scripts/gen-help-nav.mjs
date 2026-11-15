/**
 * Builds the Help Center sidebar from the folder tree, so a writer adds an
 * article by adding a .md file to pages/help/<topic>/, with no config edit.
 *
 * One folder = one sidebar group, labelled from the folder name
 * ("getting-started" → "Getting started"). Articles are sorted by their
 * `order:` front matter number, then file name; groups by the smallest
 * `order` they contain. Each article's sidebar label is its `title:`.
 *
 * `draft: true` articles are left out, because Zudoku leaves them out of
 * production builds too. `--drafts` (used by `npm run dev`) keeps them, so a
 * draft can be previewed locally.
 *
 * A topic folder may hold a topic.json to name and describe it:
 *   { "title": "Getting started", "description": "One line for the landing page card.",
 *     "icon": "rocket", "order": 1 }
 * (icon: any name from https://lucide.dev/icons; order: the topic's place, else
 * its first article's `order`). Without it the folder name is the title.
 *
 * Writes help-nav.generated.json (the sidebar, imported by zudoku.config.tsx; a
 * JSON file, not node:fs in the config, because Zudoku also bundles the config
 * into the browser) and hub/topics.generated.mjs (the landing page's cards,
 * importing only the icons it uses). An empty list means the Help Center is not
 * live yet.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HELP = join(ROOT, "pages", "help");
const withDrafts = process.argv.includes("--drafts");

// shortcut: reads two scalar keys with a regex instead of a YAML parser; enough for `order: 3` and `draft: true`.
const frontMatter = (file) => readFileSync(file, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
const orderOf = (fm) => Number(fm.match(/^order:\s*(-?\d+)\s*$/m)?.[1] ?? Number.MAX_SAFE_INTEGER);
const isDraft = (fm) => /^draft:\s*true\s*$/m.test(fm);
const label = (dir) => dir.replace(/[-_]+/g, " ").replace(/^\w/, (c) => c.toUpperCase());
const pascal = (name) => name.replace(/(^|[-_])(\w)/g, (_, __, c) => c.toUpperCase());
const topicInfo = (dir) => {
  const file = join(HELP, dir, "topic.json");
  return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
};

const topics = existsSync(HELP)
  ? readdirSync(HELP).filter((d) => statSync(join(HELP, d)).isDirectory())
  : [];

const nav = topics
  .map((dir) => {
    const articles = readdirSync(join(HELP, dir))
      .filter((f) => f.endsWith(".md"))
      .map((f) => ({ f, fm: frontMatter(join(HELP, dir, f)) }))
      .filter((a) => withDrafts || !isDraft(a.fm))
      .map((a) => ({ f: a.f, order: orderOf(a.fm) }))
      .sort((a, b) => a.order - b.order || a.f.localeCompare(b.f));
    const info = topicInfo(dir);
    return { dir, info, articles, first: info.order ?? Math.min(...articles.map((a) => a.order)) };
  })
  .filter((t) => t.articles.length > 0)
  .sort((a, b) => a.first - b.first || a.dir.localeCompare(b.dir))
  .map((t) => ({
    type: "category",
    label: t.info.title ?? label(t.dir),
    ...(t.info.icon ? { icon: t.info.icon } : {}),
    // read by the landing page only; Zudoku ignores it
    description: t.info.description ?? "",
    items: t.articles.map((a) => `help/${t.dir}/${a.f.replace(/\.md$/, "")}`),
  }));

writeFileSync(join(ROOT, "help-nav.generated.json"), JSON.stringify(nav.map(({ description, ...c }) => c), null, 2) + "\n");

const icons = [...new Set(nav.filter((t) => t.icon).map((t) => pascal(t.icon)))];
writeFileSync(
  join(ROOT, "hub", "topics.generated.mjs"),
  `// Written by scripts/gen-help-nav.mjs. Do not edit.\n` +
    (icons.length ? `import { ${icons.join(", ")} } from "zudoku/icons";\n` : "") +
    `export const topics = [\n` +
    nav
      .map((t) => `  { title: ${JSON.stringify(t.label)}, description: ${JSON.stringify(t.description)}, href: ${JSON.stringify("/" + t.items[0])}, count: ${t.items.length}, Icon: ${t.icon ? pascal(t.icon) : "null"} },`)
      .join("\n") +
    `\n];\n`,
);
const count = nav.reduce((n, t) => n + t.items.length, 0);
console.log(
  `[gen-help-nav] ${count} article(s) in ${nav.length} topic(s)${withDrafts ? " (drafts included)" : ""}` +
    (count === 0 ? " — Help Center not live, site is the API docs only" : ""),
);
