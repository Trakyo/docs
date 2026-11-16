/**
 * For pull request previews only: removes `draft: true` from the top block of
 * every Help Center article, so the build that follows keeps drafts (Zudoku
 * leaves them out of production builds) and the writer can see them.
 *
 * Run by CI's `preview` job on its own throwaway checkout, never by a deploy.
 * Never commit what it changes.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const HELP = join(import.meta.dirname, "..", "pages", "help");

for (const entry of readdirSync(HELP, { recursive: true })) {
  if (!entry.endsWith(".md")) continue;
  const file = join(HELP, entry);
  const text = readFileSync(file, "utf8");
  // Same `draft: true` spelling gen-help-nav.mjs reads, and only inside the top block.
  const shown = text.replace(/^---\r?\n[\s\S]*?\r?\n---/, (top) => top.replace(/^draft:[ \t]*true[ \t]*\r?\n/m, ""));
  if (shown !== text) {
    writeFileSync(file, shown);
    console.log(`draft shown in the preview: pages/help/${entry}`);
  }
}
