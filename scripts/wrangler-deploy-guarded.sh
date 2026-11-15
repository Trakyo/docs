#!/usr/bin/env bash
# =============================================================================
# `wrangler deploy` that will not override settings changed outside this repo
# (ENG-1238). Every CI Worker deploy in .github/workflows/ runs through it, and
# scripts/__tests__/wrangler-deploy-guarded.test.ts fails on one that does not.
#
# Usage, from the Worker's directory, with the arguments `wrangler deploy` takes:
#   bash "$GITHUB_WORKSPACE/scripts/release/wrangler-deploy-guarded.sh" --config wrangler.jsonc
#
# WHY. A CI `wrangler deploy` replaces the Worker's remote configuration with the
# repo's. When the Worker was last changed in the Cloudflare dashboard, wrangler
# prints the difference ("differs from the remote configuration … Uploading the
# Worker will override the remote configuration with your local one") and, being
# non-interactive, carries on. On 2026-10-23 that deleted affiliate-resolver's
# HEALTHCHECK_AFFILIATE_RESOLVER, a Text variable added in the dashboard; its
# Healthchecks check sat Down for ~3 hours while the Worker ran normally.
#
# HOW. `--strict`. In a non-interactive run wrangler then refuses instead: it logs
# "Aborting the upload operation because of conflicts", exits 1 and uploads
# nothing, wherever it would otherwise have overridden remote state — a
# destructive diff against a Worker last deployed from the dashboard, a Worker
# last changed through the script API, a `vars` entry that would replace a
# remote secret, or a Workflow owned by another Worker. Secrets are not part of
# the diff and a deploy never deletes them. A Worker's first deploy has nothing
# remote to compare, so it is unaffected.
#   @see https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy
#        ("--strict … prevents deployments if the deployment would potentially
#        override remote settings in non-interactive environments")
#   @see https://github.com/cloudflare/workers-sdk/pull/10507 (added in wrangler 4.41.0)
#   Source, wrangler 4.116.0 and 4.118.0 (the versions this repo pins):
#   getDeployConfirmFunction() returns false and sets process.exitCode = 1 when
#   strict and non-interactive; preUploadApiChecks() then returns aborted: true
#   before the upload. The test above pins that code in the installed wrangler.
#
# BACKSTOP. The output is captured. If wrangler prints the destructive-diff
# warning and still exits 0 (a version that stopped honouring --strict), the job
# fails anyway. That check depends on wrangler's wording; --strict does not.
#
# THE WAY OUT of a refusal. It means someone changed the Worker in the dashboard.
# Read the diff in the refused run, keep what is meant to stay — non-secret
# values as `vars` in wrangler.jsonc, secrets with `wrangler secret put <NAME>
# --name <worker>` — then re-run this deploy workflow by hand on the same branch
# with `override_dashboard_config` ticked: one deploy without --strict, recorded
# against whoever started it. wrangler before 4.128.0 (both pins here) also lists
# `observability.redact_query_string: false`, a remote default it does not know,
# as removed, so after any dashboard edit the override is needed once even when
# nothing real is left in the diff.
#   @see https://github.com/cloudflare/workers-sdk/pull/15379
#
# Exit status: wrangler's own, or 1 for the backstop, or 2 for a caller that
# passes its own strictness flag (this script owns it).
# =============================================================================
set -uo pipefail

for arg in "$@"; do
  case "$arg" in
    --strict | --strict=* | --no-strict)
      echo "::error title=wrangler-deploy-guarded.sh::pass the deploy arguments only — this script decides --strict (got $arg)"
      exit 2
      ;;
  esac
done

log=$(mktemp)
trap 'rm -f "$log"' EXIT

# wrangler's output without colour codes (it colours it on CI runners).
plain_log() { perl -pe 's/\e\[[0-9;]*m//g' "$log"; }

# The keys wrangler's dashboard-diff warning marks as removed ("-" lines), as one
# comma-separated line. Names only: the values are printed in the run log by
# wrangler already and may be secrets set as plain text, so annotations never
# repeat them.
removed_keys() {
  plain_log | awk '
    /differs from the remote configuration/ { inside = 1; next }
    inside && /Uploading the Worker will override|Aborting the upload operation|Total Upload:/ { inside = 0 }
    inside && /^[ \t]*-[ \t]/ {
      line = $0
      sub(/^[ \t]*-[ \t]*/, "", line)
      key = "(an array entry)"
      if (match(line, /^"?[A-Za-z_][A-Za-z0-9_]*"?:/)) { key = substr(line, 1, RLENGTH - 1); gsub(/"/, "", key) }
      if (!(key in seen)) { seen[key] = 1; out = out (out == "" ? "" : ", ") key }
    }
    END { print out }'
}

if [ "${OVERRIDE_DASHBOARD_CONFIG:-}" = "true" ]; then
  echo "::warning title=Deploying without --strict::override_dashboard_config is ticked (run started by ${GITHUB_ACTOR:-unknown}): anything set on this Worker outside the repo is replaced by the repo's configuration."
  npx wrangler deploy "$@" 2>&1 | tee "$log"
  rc=${PIPESTATUS[0]}
  keys=$(removed_keys)
  if [ -n "$keys" ] && [ "$rc" -eq 0 ]; then
    echo "::warning title=Dashboard settings overridden::this deploy removed or replaced: $keys"
  elif [ -n "$keys" ]; then
    # Failed after the diff: whether the upload already happened is in the log.
    echo "::warning title=Override deploy failed::wrangler reported it would remove or replace ($keys) and then exited $rc. If the log above shows the Worker as Uploaded they are gone; otherwise nothing changed."
  fi
  exit "$rc"
fi

npx wrangler deploy --strict "$@" 2>&1 | tee "$log"
rc=${PIPESTATUS[0]}
keys=$(removed_keys)

if [ "$rc" -ne 0 ]; then
  # Not `plain_log | grep -q`: under pipefail, grep stopping early could fail the
  # pipeline with perl's SIGPIPE and hide the match.
  if grep -q "Aborting the upload operation because of conflicts" < <(plain_log); then
    echo "::error title=Deploy refused — this Worker was changed outside the repo::wrangler --strict would not override the Worker's remote state${keys:+ (it would have removed: $keys)}. Read the warning above. Keep what should stay: non-secret values as vars in wrangler.jsonc, secrets with wrangler secret put. Then re-run this workflow on the same branch with override_dashboard_config ticked. See .claude/CLAUDE.md § Cloudflare Worker Deployments."
  fi
  exit "$rc"
fi

if [ -n "$keys" ]; then
  echo "::error title=Dashboard settings overridden despite --strict::wrangler reported removing ($keys) and deployed anyway, so --strict no longer protects this Worker. Restore those settings (as secrets or wrangler.jsonc vars) and re-check scripts/release/wrangler-deploy-guarded.sh against this wrangler version."
  exit 1
fi
exit 0
