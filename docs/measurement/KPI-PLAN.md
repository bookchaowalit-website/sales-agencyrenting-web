---
title: "Agency Renting — KPI and Instrumentation Plan"
status: draft
created: 2026-10-23
updated: 2026-10-23
description: "How the Agency Renting demo would be measured, which events are planned, and what is live today (Sentry errors only)."
template: architecture-docs templates/sdlc/kpi-and-instrumentation-plan.md
---

# Agency Renting — KPI and Instrumentation Plan

Agency Renting is a Tier B showcase: a bilingual (EN/TH) real-estate demo over 9 sample properties
(`lib/sampleData.ts`) with a contact form that sends nothing. No real listings, visitors or leads are claimed. This plan
defines what to measure if it is ever used for real; today only error reporting is live.

## Document control

| Field | Value |
|---|---|
| Product | bookchaowalit-website/sales-agencyrenting-web (https://agencyrenting.bookchaowalit.com) |
| Version / status | 0.1 / **draft** — definitions only; no analytics installed, no baselines |
| Metric owner | Owner (bookchaowalit) |
| AI maker | Claude Code (b-tier-b repo agent, 2026-10-23) |
| AI reviewer | not reviewed yet |
| Charter objectives | OBJ-01 from `PRODUCT.md`: a visitor identifies a fitting property and its next step |
| Analytics source of truth | Planned: PostHog Cloud EU free tier (owner decision D4: decided, but no account or project key yet). Live today: Sentry `personal-yu0/sales-agencyrenting-web`, errors only (SPEC-001). Vercel Web Analytics/Speed Insights components are in the layout; whether they are enabled on the Vercel project is not verified. |
| Dashboard | none |
| Next review | 2026-11-15 (Big Loop M1) |

## KPI tree

```text
OBJ-01 A visitor finds a fitting property and takes the next step
  └─ KPI-O-01 Contact intent rate: sessions with a contact step / sessions with a listing view
       ├─ KPI-L-01 Search success: searches with ≥ 1 result / searches
       ├─ KPI-L-02 Listing detail rate: sessions that open a property / sessions on /listings
       ├─ KPI-G-01 Client error events per 1,000 page views (Sentry)
       └─ KPI-G-02 Zero-result searches / searches (must not rise after filter changes)
```

## KPI definitions

| KPI ID | Type | Formula | Source / events | Baseline | Target | Alert |
|---|---|---|---|---|---|---|
| KPI-O-01 | outcome | sessions with `contact_cta_clicked` or `contact_form_submitted` / sessions with `listing_viewed` | PostHog (planned) | not yet measured | set after 30 days of data | — |
| KPI-L-01 | leading | `listing_search_submitted` with `result_count ≥ 1` / all `listing_search_submitted` | PostHog (planned) | not yet measured | ≥ 80% | < 60% for 7 days |
| KPI-L-02 | leading | sessions with `listing_viewed` / sessions with a `/[locale]/listings` page view | PostHog (planned) | not yet measured | — | — |
| KPI-G-01 | guardrail | Sentry error events / (page views / 1,000) | Sentry (live once deployed) + page views (planned) | not yet measured | ≤ 1 | > 5 in a day |
| KPI-G-02 | guardrail | 1 − KPI-L-01 | PostHog (planned) | not yet measured | ≤ 20% | > 40% for 7 days |

A rate is "not measurable" below 100 sessions (or 100 searches) in the window.

## Event specification (planned, not implemented)

| Event | When | Properties (allow-list) |
|---|---|---|
| `listing_search_submitted` | search/filter applied on `/[locale]/listings` | `locale`, `mode` (rent/sale), `location`, `type`, `price_band`, `bedrooms`, `result_count` |
| `listing_viewed` | a property card or detail is opened | `locale`, `property_id` (sample id), `type` |
| `contact_cta_clicked` | "Contact"/"Call" on a card or agent | `locale`, `source` (card/agent/hero) |
| `contact_form_submitted` | contact form submit (the demo sends nothing) | `locale`, `subject` (enum only) |

Never send names, email, phone, message text, free-text search, IP or full URLs with query strings. Sentry already strips
request data, user, breadcrumbs, extra, frame locals, the `nextjs` request path and URL queries (`lib/sentry.ts`).

## Instrumentation verification (before G10)

| # | Check | Result |
|---|---|---|
| 1–2 | Events fire once each with only the allow-listed properties | not run: no analytics installed (D4 has no key yet) |
| 3 | No personal data in events | by design (allow-list above); Sentry scrubbing unit-tested in `tests/sentry.test.ts` |
| 4–5 | Dashboard and alerts | not set up |
| 6 | Baselines captured | waived — dated action: capture 30 days after the PostHog key exists |
| 7 | Consent | needed before PostHog goes live for EU/TH visitors (cookie-less mode or a banner) — owner decision |
