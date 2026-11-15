/**
 * Checks the content before it is published. Run after `npm run fetch-spec`
 * (it reads apis/openapi.json) and BEFORE the build, so a writer sees these
 * plain-words messages instead of a build stack trace. Every problem is printed
 * as a GitHub annotation on the file; any error exits 1.
 *
 * 1. Error pages. Every API error response links to trakyo.io/docs/errors/<code>,
 *    so every code the live API can return needs pages/errors/<code>.mdx.
 *    A missing page is an error (that link would 404). A page for a code the
 *    API no longer has is only a warning: a page may go up shortly before the
 *    API change that needs it.
 * 2. Help Center articles (pages/help/<topic>/<article>.md): plain .md, inside a
 *    topic folder, with a title; every ./picture it shows exists (a missing one
 *    fails the build with a bundler error); images in Markdown syntax (a raw <img> tag
 *    breaks under /docs); no HTML comments (they fail Zudoku's build with
 *    "chunks[startIndex].slice is not a function").
 * 3. Files: no video files (embed YouTube or Loom instead) and nothing over
 *    10 MB (Cloudflare refuses files over 25 MiB; big images make slow pages).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const MAX_BYTES = 10 * 1024 * 1024;
const VIDEO = /\.(mp4|mov|m4v|webm|avi|mkv)$/i;

let errors = 0;
const report = (level, file, message) => {
  if (level === "error") errors++;
  console.log(`::${level} file=${file}::${message}`);
};

const walk = (dir) =>
  readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
const exists = (path) => {
  try {
    statSync(join(ROOT, path));
    return true;
  } catch {
    return false;
  }
};

// 1. Error pages against the codes in the live spec.
const spec = JSON.parse(readFileSync(join(ROOT, "apis/openapi.json"), "utf8"));
const codes = new Set();
(function collect(node) {
  if (!node || typeof node !== "object") return;
  for (const code of node.properties?.error?.properties?.code?.enum ?? []) codes.add(code);
  for (const child of Object.values(node)) collect(child);
})(spec);
if (codes.size === 0) report("error", "apis/openapi.json", "Found no error codes in the API spec: its shape changed, update scripts/check.mjs.");
const pages = new Set(readdirSync(join(ROOT, "pages/errors")).filter((f) => f.endsWith(".mdx")).map((f) => f.slice(0, -4)));
for (const code of codes) {
  if (!pages.has(code)) report("error", `pages/errors/${code}.mdx`, `The API returns the error code "${code}" but there is no page for it, so its doc_url (trakyo.io/docs/errors/${code}) is a 404. Add pages/errors/${code}.mdx and list it in zudoku.config.tsx.`);
}
for (const page of pages) {
  if (!codes.has(page)) report("warning", `pages/errors/${page}.mdx`, `The live API has no error code "${page}". Fine if the API change that adds it is about to ship; otherwise delete the page.`);
}

// 2. Help Center articles (and each topic's optional topic.json).
for (const file of exists("pages/help") ? walk("pages/help") : []) {
  if (file.endsWith("topic.json")) {
    let topic;
    try {
      topic = JSON.parse(readFileSync(join(ROOT, file), "utf8"));
    } catch {
      report("error", file, 'topic.json is not valid JSON. Copy the shape from templates/topic.json (quotes around every name and text, commas between lines).');
      continue;
    }
    if (typeof topic.title !== "string") report("error", file, 'topic.json needs a "title".');
    if (topic.icon !== undefined && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(topic.icon)) report("error", file, 'The "icon" must be a name from lucide.dev/icons, lowercase with dashes, e.g. "life-buoy".');
    continue;
  }
  const depth = relative("pages/help", file).split("/").length;
  if (file.endsWith(".mdx")) report("error", file, "Help Center articles are plain .md files. Rename it to .md.");
  if (!file.endsWith(".md")) continue;
  if (depth !== 2) {
    report("error", file, "Put each article inside one topic folder: pages/help/<topic>/<article>.md, with its pictures next to it.");
    continue;
  }
  const text = readFileSync(join(ROOT, file), "utf8");
  const frontMatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
  if (!frontMatter || !/^title:\s*\S/m.test(frontMatter)) report("error", file, "The article needs a title at the top (copy the block between the --- lines from templates/article.md).");
  if (/<img\b/i.test(text)) report("error", file, 'Use Markdown for images: ![What it shows](./name.png). A raw <img> tag shows a broken image on the site.');
  for (const [, target] of text.matchAll(/!\[[^\]]*\]\((\.\/[^)\s]+)\)/g)) {
    if (!exists(join(file, "..", target))) report("error", file, `The picture ${target} is not in this folder. Upload it next to the article (same branch), or fix the name: it must match exactly, capitals included.`);
  }
  if (text.includes("<!--")) report("error", file, "Remove the <!-- … --> comment: the site's build cannot read HTML comments and fails.");
}

// 3. Files writers can add.
for (const dir of ["pages", "public", "hub"].filter(exists)) {
  for (const file of walk(dir)) {
    if (VIDEO.test(file)) report("error", file, "Don't add video files. Upload the video to YouTube (unlisted) or Loom and paste its embed code into the article.");
    else if (statSync(join(ROOT, file)).size > MAX_BYTES) report("error", file, "This file is over 10 MB. Compress the image (e.g. tinypng.com) or crop it.");
  }
}

console.log(errors ? `\n${errors} problem(s) to fix before publishing.` : `Checks passed (${codes.size} error codes, all with a page).`);
process.exit(errors ? 1 : 0);
