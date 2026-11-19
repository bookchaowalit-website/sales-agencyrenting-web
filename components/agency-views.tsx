import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleHeader, EmptyState, EntryList, Pager, Prose, Reader, ReaderFoot, ReaderHead, ReaderTop, TagFilter, matchesQuery, neighbours, type Entry } from "@/components/reader-shell";
import { COPY, MODES, money, searchFields, typeLabel, type Locale, type Mode } from "@/lib/copy";
import type { Property } from "@/lib/sampleData";
import { formatListingDate } from "@/lib/utils";

const SOURCE = "https://github.com/bookchaowalit-website/sales-agencyrenting-web";
type Section = "home" | "listings" | "guides" | "about" | "contact";

/** Top bar, main and footer for one locale. `path` is the page path after the locale, for the language link. */
export function Frame({ locale, path, section, children }: { locale: Locale; path: string; section: Section; children: ReactNode }) {
  const t = COPY[locale];
  const other: Locale = locale === "en" ? "th" : "en";
  return (
    <div lang={locale}>
      <Reader>
        <ReaderTop
          name="Agency Renting"
          tagline={t.tagline}
          home={`/${locale}`}
          links={[
            { href: `/${locale}/listings`, label: t.nav.listings, current: section === "listings" },
            { href: `/${locale}/articles`, label: t.nav.guides, current: section === "guides" },
            { href: `/${locale}/about`, label: t.nav.about, current: section === "about" },
            { href: `/${locale}/contact`, label: t.nav.contact, current: section === "contact" },
            { href: `/${other}${path}`, label: t.nav.other },
          ]}
        />
        <main id="main" className="rs-main">{children}</main>
        <ReaderFoot source={SOURCE} note={t.footNote} />
      </Reader>
    </div>
  );
}

export function listingEntry(property: Property, locale: Locale): Entry {
  const t = COPY[locale];
  return {
    href: `/${locale}/listings/${property.id}`,
    title: property.title,
    summary: property.location,
    meta: [money(property, locale), t.beds(property.bedrooms), t.size(property.size)],
    tags: [typeLabel(property.property_type, locale), t.modes[property.price_type === "rent" ? "rent" : "sale"]],
  };
}

export function HomeView({ locale, featured }: { locale: Locale; featured: Property[] }) {
  const t = COPY[locale];
  return (
    <Frame locale={locale} path="" section="home">
      <ReaderHead eyebrow={t.homeEyebrow} title={t.homeTitle} lede={t.homeLede}>
        <Link className="rs-button" href={`/${locale}/listings`}>{t.browse}</Link>
        <Link className="rs-plain" href={`/${locale}/about`}>{t.howItWorks}</Link>
      </ReaderHead>
      <section aria-labelledby="picks">
        <h2 id="picks" className="ar-section-title">{t.picks}</h2>
        <p className="ar-section-note">{t.picksNote}</p>
        <EntryList entries={featured.map((property) => listingEntry(property, locale))} headingLevel={3} />
      </section>
    </Frame>
  );
}

/** Filters the listings by search words and rent/sale. Counts per mode follow the search. */
export function filterListings(properties: Property[], query: string, mode: Mode) {
  const matching = properties.filter((property) => matchesQuery(searchFields(property), query));
  const shown = matching.filter((property) => mode === "all" || property.price_type === mode);
  const counts = Object.fromEntries(MODES.map((item) => [item, item === "all" ? matching.length : matching.filter((property) => property.price_type === item).length])) as Record<Mode, number>;
  return { shown, counts };
}

function listingsHref(locale: Locale, query: string, mode: Mode): string {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (mode !== "all") params.set("mode", mode);
  const search = params.toString();
  return `/${locale}/listings${search ? `?${search}` : ""}`;
}

export function ListingsView({ locale, properties, query, mode }: { locale: Locale; properties: Property[]; query: string; mode: Mode }) {
  const t = COPY[locale];
  const { shown, counts } = filterListings(properties, query, mode);
  const narrowed = Boolean(query) || mode !== "all";
  return (
    <Frame locale={locale} path="/listings" section="listings">
      <ReaderHead title={t.listingsTitle} lede={t.listingsLede} />
      <div className="rs-toolbar">
        {/* The Reader shell's SearchForm, written out so its labels follow the page language. */}
        <form className="rs-search" role="search" action={`/${locale}/listings`} method="get">
          <label>
            <span className="rs-search-label">{t.searchLabel}</span>
            <input type="search" name="q" defaultValue={query} placeholder={t.searchPlaceholder} autoComplete="off" enterKeyHint="search" />
          </label>
          {mode !== "all" ? <input type="hidden" name="mode" value={mode} /> : null}
          <button className="rs-button" type="submit">{t.search}</button>
          {query ? <Link className="rs-plain" href={listingsHref(locale, "", mode)}>{t.clear}</Link> : null}
        </form>
        <TagFilter label={t.modeLabel} options={MODES.map((item) => ({ href: listingsHref(locale, query, item), label: t.modes[item], count: counts[item], current: mode === item }))} />
      </div>
      <p className="rs-count" role="status">{t.count(shown.length, properties.length, narrowed)}</p>
      {shown.length ? (
        <EntryList entries={shown.map((property) => listingEntry(property, locale))} />
      ) : (
        <EmptyState title={t.emptyTitle} action={<Link className="rs-button" href={`/${locale}/listings`}>{t.clearFilters}</Link>}>{t.emptyBody}</EmptyState>
      )}
    </Frame>
  );
}

export function ListingView({ locale, property, properties }: { locale: Locale; property: Property; properties: Property[] }) {
  const t = COPY[locale];
  const { previous, next } = neighbours(properties, properties.findIndex((item) => item.id === property.id));
  const listed = property.listedDate || property.created_at;
  return (
    <Frame locale={locale} path={`/listings/${property.id}`} section="listings">
      <article>
        <ArticleHeader
          back={{ href: `/${locale}/listings`, label: t.back }}
          tags={[typeLabel(property.property_type, locale), t.modes[property.price_type === "rent" ? "rent" : "sale"]]}
          title={property.title}
          lede={property.location}
          meta={[money(property, locale), t.beds(property.bedrooms), t.baths(property.bathrooms), t.size(property.size), ...(listed ? [`${t.listed} ${formatListingDate(listed)}`] : [])]}
        />
        <Prose>
          {property.images[0] ? (
            <figure>
              {/* Sample photo from Unsplash; decorative, the title and facts above describe the listing. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={property.images[0]} alt="" width={800} height={600} />
            </figure>
          ) : null}
          <p lang="en">{property.description}</p>
          {property.features?.length ? (<><h2>{t.features}</h2><ul lang="en">{property.features.map((item) => <li key={item}>{item}</li>)}</ul></>) : null}
          {property.nearbyPlaces?.length ? (<><h2>{t.nearby}</h2><ul lang="en">{property.nearbyPlaces.map((item) => <li key={item}>{item}</li>)}</ul></>) : null}
          <blockquote><p>{t.sampleNote}</p></blockquote>
        </Prose>
        <Pager
          label={t.pager}
          previous={previous ? { href: `/${locale}/listings/${previous.id}`, title: previous.title, label: t.previous } : undefined}
          next={next ? { href: `/${locale}/listings/${next.id}`, title: next.title, label: t.next } : undefined}
        />
      </article>
    </Frame>
  );
}

export function GuidesView({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  return (
    <Frame locale={locale} path="/articles" section="guides">
      <ReaderHead title={t.guidesTitle} lede={t.guidesLede} />
      <EmptyState title={t.guidesEmptyTitle} action={<Link className="rs-button" href={`/${locale}/listings`}>{t.browse}</Link>}>{t.guidesEmptyBody}</EmptyState>
    </Frame>
  );
}

export function AboutView({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  return (
    <Frame locale={locale} path="/about" section="about">
      <ReaderHead title={t.aboutTitle} lede={t.aboutLede} />
      <Prose>{t.aboutBody.map((text) => <p key={text}>{text}</p>)}</Prose>
    </Frame>
  );
}

export function ContactView({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  return (
    <Frame locale={locale} path="/contact" section="contact">
      <ReaderHead title={t.contactTitle} lede={t.contactLede}>
        <a className="rs-button" href="https://bookchaowalit.com/">{t.contactCta}</a>
      </ReaderHead>
      <Prose><p>{t.contactBody}</p></Prose>
    </Frame>
  );
}
