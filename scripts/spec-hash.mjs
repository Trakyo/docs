/**
 * Prints the sha256 of an OpenAPI document (a file path, or stdin), normalised
 * through JSON.parse/stringify so formatting never counts as a change.
 *
 * The build writes it to dist/docs/openapi.sha256 (served at
 * trakyo.io/docs/openapi.sha256); the hourly job in deploy.yml compares it with
 * the live api.trakyo.io/openapi.json to decide whether the reference is stale.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const text = readFileSync(process.argv[2] ?? 0, "utf8");
console.log(createHash("sha256").update(JSON.stringify(JSON.parse(text))).digest("hex"));
