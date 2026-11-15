import type { UserConfig } from "vite";

/**
 * Merged into Zudoku's Vite config (user config wins on scalar overrides).
 * Zudoku hardcodes build.sourcemap: true — without this override the deploy
 * ships ~165 public .map files (~12 MB, 57% of the artifact) exposing the
 * bundle source at trakyo.io/docs/assets/*.map.
 *
 * @see https://zudoku.dev/docs (Zudoku merges a project-root vite.config.*)
 */
export default {
  build: { sourcemap: false },
} satisfies UserConfig;
