---
title: "SPEC-001 — Shared CI, security scan, errors-only Sentry and KPI plan"
status: implemented
tags: [spec, sdd, tdd, ci, sentry, security]
created: 2026-10-23
updated: 2026-10-23
description: "Move CI to the shared platform workflows with a security scan, clear the dependency findings, report errors to Sentry without personal data, and record a truthful product status and KPI plan."
---

# SPEC-001 — Shared CI, security scan, errors-only Sentry and KPI plan

Standard: ADR-0004 (TDD + SDD). Plan: Big Loop, b-tier-b wave (L3 for Tier B showcases).

## Document control

| Field | Value |
|---|---|
| Spec ID / version | SPEC-001 / 1.0 |
| Status | implemented |
| Repository | bookchaowalit-website/sales-agencyrenting-web |
| Owner (maker) | Claude Code (b-tier-b repo agent) |
| Approver | Owner (bookchaowalit) |

## 1. Problem and intent

- **Problem:** `ci.yml` was a hand-written job (lint, typecheck, test, build) with no security scan; the app reported no
  errors; there was no KPI plan or spec; the portfolio card had described a creative-agency booking platform with escrow,
  which this repo is not (CARD-CLAIMS-REVIEW-2026-10, corrected there).
- **Outcome:** every push and PR runs the shared `ci-node.yml` and `security.yml` (platform-ci-workflows v1.1.1, `87dc5e1`)
  green; runtime errors reach Sentry `personal-yu0/sales-agencyrenting-web` with no visitor data; `PRODUCT.md` and
  `docs/measurement/KPI-PLAN.md` say what is real.

## 2. Behaviour — scenarios

| AC | Given / When / Then | Test |
|---|---|---|
| AC-01 | A push to `main` runs lint (`--max-warnings=5`, kept from the old job), typecheck, `npm test` and the build | `.github/workflows/ci.yml` — run 39907360068 green |
| AC-02 | Without `NEXT_PUBLIC_SENTRY_DSN` Sentry stays disabled | `tests/sentry.test.ts` "stays disabled…" |
| AC-03 | With a DSN: errors only — no default PII, tracing, trace headers, breadcrumbs; transactions dropped | `tests/sentry.test.ts` "reports errors only…" |
| AC-04 | Request, user, breadcrumbs, extra and frame locals are removed | "drops request data…", "removes local variables…" |
| AC-05 | The `nextjs` context (request_path) and every non-platform context are dropped; query strings are cut from transaction and tags | "drops the request path…" |
| AC-06 | ?query/#hash is cut from URLs in exception messages, frame `filename`/`abs_path` and `debug_meta` images | "strips query strings and hashes…" |
| AC-07 | Listing filter/sort and article parsing behave as before | `tests/properties.test.ts`, `tests/articles.test.ts` (unchanged) |
| AC-08 | Security scan: no unreviewed vulnerability | `security` job, run 39907360068 |

## 3. Red-first evidence

| Step | Result |
|---|---|
| `tests/sentry.test.ts` before `lib/sentry.ts` existed | `ERR_MODULE_NOT_FOUND … lib/sentry.ts`, 17 pass / 1 fail |
| AC-05 case against the first scrubber | 21 pass / 1 fail |
| AC-06 case against the second scrubber | 22 pass / 1 fail |
| After implementation | 23 / 23 pass; `tsc --noEmit` clean; lint 5 warnings (`no-img-element`, pre-existing, within the limit); build OK |
| First CI run 39906939858 | `web` green; `security` red: source-map-js 1.2.1 (GHSA-68fv-2mgg-jv7q), braces, postcss-selector-parser → fixed in d348a2f |

## 4. Interfaces and data

| Area | Change |
|---|---|
| Sentry | `@sentry/nextjs` ^11.8.0; `lib/sentry.ts`, `instrumentation.ts` (server/edge + `onRequestError`), `instrumentation-client.ts`. DSN from `NEXT_PUBLIC_SENTRY_DSN` (Vercel env). No `withSentryConfig`, no source maps upload, no replay. |
| Dependencies | `postcss` ^8.5.31 (dev dep + override, written as a range instead of `$postcss`, which npm 10 could not resolve when adding a dependency) → source-map-js 1.2.2. `sharp` ^0.35.5 and `next` 15.5.28 from the CVE patch (2a46d4a). Lockfile written with npm 10. |
| Accepted findings | `osv-scanner.toml`: braces GHSA-vfj7-8cjw-p6xm (no fix) and postcss-selector-parser GHSA-rj75-hqrm-r3gf (fix only in 7.x; tailwindcss 3 needs 6.x); build-time only on first-party input; `ignoreUntil = 2027-01-31`. |

## 5. UI review sign-off

`next build` + `next start`, `shot.mjs` at 375/768/1440, every image opened:

- After Sentry (`~/work/b-tier-b/shots/sales-agencyrenting-web-sentry/`): `/`, `/en`, `/th/listings`, `/en/contact`.
- Final build after the postcss bump (`…/sales-agencyrenting-web-final/`): `/th`, `/en/listings`.
- All 200, no horizontal overflow. Console: only 404s for `/_vercel/insights/script.js` and
  `/_vercel/speed-insights/script.js`, which exist only on Vercel (live has no console errors).
- No visual change from this spec. Pre-existing issues seen, not in scope (follow-ups): on `/[locale]/listings` the stat-tile
  labels, the result-count heading and agent names are near-invisible light grey; one agent photo (Siriporn) fails to load
  on the contact page; Thai hero lines on `/th` sit very tight (tone marks touch the line above); the home page is dark and
  the inner pages light; `/en/contact` lists each contact line twice (faint and normal).

Sign-off: pass (no regression).

## 6. Out of scope

Deploying; PostHog events (planned in the KPI plan, D4 has no key yet); the UPGRADE-PLAN P0 article split; the UI follow-ups above.

## 7. Deploy state

https://agencyrenting.bookchaowalit.com returns 200 (`/en`, `/th`, `/en/listings`, `/en/contact`; `/xx` 404) and serves the CVE
patch `2a46d4a` (CLI deploy 2026-10-23, D9a, per the parent session). This spec's commits are on `main` only: the Vercel
project is linked to the old repository name, so pushes do not deploy (owner action D9). Sentry reports from production only
after the next deploy.
