# Agency Renting — design

Since 2026-11-19 every page uses the shared **Reader shell** (`app/reader-shell.css`,
`components/reader-shell.tsx`, rules in `READER.md`), replacing the dark amber home page and the
mismatched shadcn inner pages with one look: Geist plus self-hosted Noto Sans Thai, the `--rs-*`
light/dark tokens, one top bar (with the language switch and the hub link) and one footer.

- Home: page head with two actions, then the featured sample listings as rows.
- Listings: GET search and rent/sale chips whose counts follow the search; a count line; rows; a
  translated empty state with Clear filters.
- Listing: back link, type and rent/sale tags, facts in the meta line, photo, description, features,
  nearby places, a sample-data note and previous/next.
- Guides, About, Contact: honest text; no team, office, phone, inbox or invented figures.
- Floor: text ≥ 12px, targets ≥ 44px, 4.5:1 text in light and dark, forced colors, Thai line height 1.8.
