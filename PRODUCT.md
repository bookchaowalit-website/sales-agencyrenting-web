# Agency Renting — Product brief

<!-- impeccable:product-schema 1 -->

> Product truth inferred from the existing README, routes, sample listings, and implementation. Confirm any missing product decisions in a future init pass.

## Platform

web

## Users

People comparing homes in Thailand and the bilingual agent helping them narrow a shortlist.

## Product Purpose

Agency Renting turns a property search into a confident next conversation: browse real sample listings, narrow by place and property facts, then contact an agent. Success means a visitor can identify a fitting property and its next step without wading through generic real-estate marketing.

## Positioning

It is a bilingual property shortlist and contact surface, not a live nationwide marketplace. The current app uses an in-memory sample dataset and a simulated contact submit.

## Operating Context

The homepage and listings routes are real Next.js surfaces with client-side search/filter behavior and filesystem-backed article content. Images and listing facts are demo data; there is no production inventory sync or CRM handoff.

## Capabilities and Constraints

- Browse featured Thailand properties and open listing details.
- Search and filter by location, type, price, bedrooms, and sale/rent mode.
- Switch between English and Thai routes.
- Keep contact copy honest: submission is currently a UI simulation.
- Preserve accessible controls, mobile browsing, and readable listing facts.

## Evidence on Hand

- `README.md`, `app/[locale]/page.tsx`, `components/PropertySearch.tsx`, `components/PropertyCard.tsx`, and `lib/sampleData.ts`.
- Demo inventory includes Bangkok, Phuket, Chiang Mai, and Hua Hin examples.

## Product Principles

- Place and property facts lead; polish follows.
- A shortlist should feel calm, comparable, and actionable.
- Bilingual copy is part of the experience, not a footer translation.
- Never imply a live listing feed or completed contact handoff.

## Accessibility & Inclusion

Use semantic landmarks and forms, visible focus, strong contrast, text equivalents for property imagery, reduced motion, and no search outcome that depends on color alone.

## Status today (2026-10-23)

- **What it is:** a bilingual (EN/TH) real-estate agency **demo** for Thailand on Next.js 15. It is not a creative-agency
  booking platform with calendars, contracts or escrow; an older portfolio card said so and was corrected
  (`portfolio-site-web` CARD-CLAIMS-REVIEW-2026-10).
- **Works:** `/en` and `/th` home, listings search/filter/sort over 9 sample properties served by `/api/properties` from
  `lib/sampleData.ts`, property cards, filesystem articles, agent profiles, EN/TH switch, invalid locales 404. 23 automated
  tests (filters, sorting, articles, Sentry scrubbing) run on every push with the shared CI and security scan.
- **Does not work (by design):** no real inventory, no CRM or lead handoff; the contact form sends nothing and says so
  ("Demo form — nothing was sent"). No visitors, leads or revenue are claimed. No product analytics (KPI plan is draft; D4).
- **Live:** https://agencyrenting.bookchaowalit.com (200), the CVE-patched build `2a46d4a` deployed by CLI on 2026-10-23
  (D9a). Later commits on `main` (Sentry, shared CI) wait for a deploy: the Vercel project is linked to the old repository
  name, so pushes do not deploy (owner action D9).
