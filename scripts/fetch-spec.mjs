/**
 * Pull the live auto-generated OpenAPI spec into apis/openapi.json (gitignored).
 *
 * The API generates the spec from the same schemas it validates requests with,
 * so the reference can never drift from what the API actually accepts.
 *
 * Runs automatically via the predev/prebuild hooks. Override the source with
 * TRAKYO_SPEC_URL (e.g. a local copy of the API).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SPEC_URL = process.env.TRAKYO_SPEC_URL ?? "https://api.trakyo.io/openapi.json";
const OUT_PATH = join(dirname(fileURLToPath(import.meta.url)), "..", "apis", "openapi.json");
// --strict (used by prebuild): a fetch failure fails the build — never ship
// docs from a stale spec. Without it (predev): fall back to the cached file
// so local dev works offline.
const STRICT = process.argv.includes("--strict");

function fallbackOrDie(reason) {
  if (!STRICT && existsSync(OUT_PATH)) {
    console.warn(`[fetch-spec] ${reason} — reusing cached apis/openapi.json (dev fallback)`);
    process.exit(0);
  }
  console.error(`[fetch-spec] ${reason}`);
  process.exit(1);
}

let res;
try {
  res = await fetch(SPEC_URL);
} catch (err) {
  fallbackOrDie(`fetch failed for ${SPEC_URL}: ${err.message}`);
}
if (!res.ok) fallbackOrDie(`${SPEC_URL} → HTTP ${res.status}`);

const spec = await res.json();
if (!spec.openapi?.startsWith("3.1")) {
  fallbackOrDie(`unexpected spec version: ${spec.openapi}`);
}

await mkdir(dirname(OUT_PATH), { recursive: true });
await writeFile(OUT_PATH, JSON.stringify(spec, null, 2));
console.log(
  `[fetch-spec] ${SPEC_URL} → apis/openapi.json (${Object.keys(spec.paths).length} paths, OpenAPI ${spec.openapi})`
);
