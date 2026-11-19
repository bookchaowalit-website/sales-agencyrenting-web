# Agency Renting

A bilingual (English/Thai) design demo of a property desk for Thailand, on the shared
**Reader shell** since 2026-11-19 (`app/reader-shell.css`, `components/reader-shell.tsx`, see
`READER.md`). Listings come from a static sample dataset (`lib/sampleData.ts`); there is no
brokerage, agent team, phone line or inbox behind it, and the pages say so. All page copy lives in
`lib/copy.ts`; the views are server components in `components/agency-views.tsx`.

Mobile companion: [bookchaowalit-agencyrenting-mobile](https://github.com/bookchaowalit-mobile/bookchaowalit-agencyrenting-mobile)
Portfolio: [bookchaowalit.com](https://bookchaowalit.com)

## Routes

| Route | What it is |
|---|---|
| `/` | Redirects to `/en` |
| `/[locale]` | Home (`en` or `th`; anything else 404s): head and the featured sample listings |
| `/[locale]/listings` | Every sample listing; GET search (`?q=`) and rent/sale chips (`?mode=`); old `?property=<id>` links redirect to the listing page |
| `/[locale]/listings/[id]` | One listing: facts, photo, features, nearby places, previous/next |
| `/[locale]/articles` | Guides: none published yet (the draft guide in `content/articles/` has unsourced figures) |
| `/[locale]/about`, `/[locale]/contact` | What the demo is, and where to reach the project (bookchaowalit.com) |
| `/api/properties`, `/api/articles`, `/api/health` | JSON routes |
| `/more-projects` | 308 to https://bookchaowalit.com/ |

## What this pass found

- **ESLint had never been configured at all.** `npm run lint` (`next
  lint`) dropped into its first-run interactive setup wizard instead of
  running — meaning lint had presumably never actually been run against
  this codebase. Added a `.eslintrc.json` (`next/core-web-vitals`), which
  surfaced 2 real errors (unescaped quote characters in a JSX search-filter
  badge) and 5 `<img>`-vs-`next/image` performance warnings, left as-is
  since fixing them would mean touching third-party remote image URLs.
- `app/layout.tsx` had `viewport` nested inside the `metadata` export —
  deprecated by Next.js's App Router metadata API — and no `metadataBase`,
  which made every relative Open Graph/Twitter image resolve against
  `localhost` in production. Both were build-time warnings on every single
  build; fixed by splitting out a proper `viewport` export and setting
  `metadataBase`. Also removed a stale `// SEO TODO: Add Open Graph tags`
  comment sitting directly below Open Graph tags that were already fully
  implemented above it.
- The same dead `categories` object in `more-projects/page.tsx` found in
  several sibling repos this pass — defined, never referenced.
- `@next/mdx` was pinned to `^16.0.1` while `next` itself was `14.0.0` — a
  version mismatch that happened to not break anything only because no
  `.mdx` page route exists under `app/` to invoke it (article content is
  read via `gray-matter`/`fs` directly, entirely independent of
  `@next/mdx`). Attempting to align it to `^14.2.35` instead surfaced the
  real state of things: even version-matched, it needs a peer
  (`@mdx-js/loader`) that was never installed and isn't a transitive
  dependency of anything else in the project — so the wrapper had never
  actually been exercised. Since nothing uses it, removed `@next/mdx` and
  the unused `next-mdx-remote` dependency entirely rather than chase a
  peer install for machinery with no caller.
- `next` bumped `14.0.0` → `^14.2.35` (in step with `eslint-config-next`),
  clearing a critical-severity Next.js vulnerability list and most others
  (13 → 5 `npm audit` findings) without any breaking change. The remaining
  5 all require Next 14→16, not attempted here. (Superseded: now on Next
  15.5.27 + React 19, see below.)
- `next` 14.2.35 → 15.5.27 with React 19: Next 14 has no patched release for
  the critical Image Optimization RCE (GHSA-2xp9-vwfh-vxw4). `npm audit`
  reports 0 findings.

Verified live end-to-end after every fix: the `/` → `/en` redirect, all
five locale routes, an invalid locale (`/xx`) correctly 404ing, and both
API routes returning real sample data (8 properties, 1 article) — on the
actual Next.js 14.2.35 production build, not just the dev server.

## Known limitation

The contact form has no backend. Submitting it now says so explicitly
("Demo form — nothing was sent", in English and Thai) and keeps the typed
text, instead of the earlier 2-second fake send that claimed "Message Sent!
We'll get back to you within 24 hours". The search/filter and listings are
real client-side logic against real (if static) data.

## Stack

Next.js 15 (App Router, path-based `[locale]` i18n, no i18n library) ·
React 19 · TypeScript · Tailwind CSS · Radix UI primitives · `gray-matter`
for article frontmatter.

## Local development

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm test        # node:test unit tests for lib/sampleData.ts filtering/sorting
npm run build
```

CI (`.github/workflows/ci.yml`) runs the same steps. `NEXT_PUBLIC_SITE_URL`
overrides the canonical origin used by metadata, `robots.txt`, and the
bilingual `sitemap.xml`.
