/**
 * trakyo-docs-site worker script — runs only for requests that DON'T match a static
 * asset (Cloudflare serves matching assets directly, without invoking this).
 *
 * Why it exists: this worker owns the `trakyo.io/docs*` route, and that
 * pattern also matches non-docs sibling paths like /docs-pricing. Those must
 * pass through to the origin (Webflow marketing site) untouched. Docs paths
 * that reach here are misses (no such page) — hand them to the assets binding
 * so `not_found_handling` serves the Zudoku 404 page.
 *
 * @see https://developers.cloudflare.com/workers/static-assets/binding/
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/docs" || url.pathname.startsWith("/docs/")) {
      return env.ASSETS.fetch(request);
    }

    // Non-docs path on trakyo.io (e.g. /docs-pricing) → origin pass-through.
    // On any other host (workers.dev, local dev) there is no origin behind us —
    // fetch(request) would recurse into this worker — so redirect to the docs.
    if (url.hostname === "trakyo.io") {
      return fetch(request);
    }
    return Response.redirect(`${url.origin}/docs/`, 302);
  },
};
