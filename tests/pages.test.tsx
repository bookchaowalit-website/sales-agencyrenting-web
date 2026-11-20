import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

const redirect = vi.fn((url: string) => { throw new Error(`REDIRECT ${url}`); });
const notFound = vi.fn(() => { throw new Error("NOT_FOUND"); });
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "geist" }), Noto_Sans_Thai: () => ({ variable: "noto" }) }));
vi.mock("next/navigation", () => ({ redirect: (url: string) => redirect(url), notFound: () => notFound() }));

import Home, { generateMetadata as homeMeta } from "@/app/[locale]/page";
import Listings, { generateMetadata as listingsMeta } from "@/app/[locale]/listings/page";
import Listing, { generateMetadata as listingMeta, generateStaticParams } from "@/app/[locale]/listings/[id]/page";
import Guides, { generateMetadata as guidesMeta } from "@/app/[locale]/articles/page";
import About from "@/app/[locale]/about/page";
import Contact from "@/app/[locale]/contact/page";
import LocaleLayout, { generateStaticParams as localeParams } from "@/app/[locale]/layout";
import RootLayout, { metadata } from "@/app/layout";
import RootPage from "@/app/page";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import nextConfig from "@/next.config";
import { filterListings } from "@/components/agency-views";
import { COPY, money, parseMode, typeLabel } from "@/lib/copy";
import { sampleProperties } from "@/lib/sampleData";

const params = (locale: string) => Promise.resolve({ locale });
const search = (values: Record<string, string> = {}) => Promise.resolve(values);
const html = async (node: Promise<React.ReactElement> | React.ReactElement) => renderToStaticMarkup(await node);

describe("home", () => {
  it("renders the head, the featured picks and the hub links in English", async () => {
    const out = await html(Home({ params: params("en") }));
    expect(out).toContain("<h1>Find the address that fits your next chapter.</h1>");
    expect(out).toContain("Luxury Condo in Central Bangkok");
    expect(out).toContain('href="https://bookchaowalit.com/"');
    expect(out).toContain('href="/th"');
    expect(out).not.toMatch(/120\+|15\+ years/);
  });

  it("renders Thai with lang=th and a Thai empty-free head", async () => {
    const out = await html(Home({ params: params("th") }));
    expect(out).toContain('lang="th"');
    expect(out).toContain(COPY.th.homeTitle);
    expect(out).toContain('href="/en"');
  });

  it("404s an unknown locale", async () => {
    await expect(Home({ params: params("fr") })).rejects.toThrow("NOT_FOUND");
  });
});

describe("listings", () => {
  it("lists every sample listing with counts per mode and the smoke marker", async () => {
    const out = await html(Listings({ params: params("en"), searchParams: search() }));
    expect(out).toContain("Property Listings");
    expect(out).toContain(`${sampleProperties.length} listings`);
    for (const property of sampleProperties) expect(out).toContain(property.title);
    expect(out).toContain('aria-current="page"');
  });

  it("narrows by search and mode, and keeps the mode in the search form", async () => {
    const out = await html(Listings({ params: params("en"), searchParams: search({ q: "phuket", mode: "rent" }) }));
    expect(out).toContain("Showing 1 of 8 listings");
    expect(out).toContain('name="mode" value="rent"');
    expect(out).toContain("Clear");
  });

  it("shows a translated empty state with Clear filters", async () => {
    const out = await html(Listings({ params: params("th"), searchParams: search({ q: "zzzz" }) }));
    expect(out).toContain(COPY.th.emptyTitle);
    expect(out).toContain(COPY.th.clearFilters);
    expect(out).toContain(COPY.th.search);
  });

  it("sends the old ?property= links to the listing page", async () => {
    await expect(Listings({ params: params("en"), searchParams: search({ property: "2" }) })).rejects.toThrow("REDIRECT /en/listings/2");
  });

  it("has a title per locale", async () => {
    expect((await listingsMeta({ params: params("th"), searchParams: search() })).title).toBe(COPY.th.listingsTitle);
  });
});

describe("listing page", () => {
  it("shows facts, the sample note and previous/next", async () => {
    const out = await html(Listing({ params: Promise.resolve({ locale: "en", id: "1" }) }));
    expect(out).toContain("<h1>Luxury Condo in Central Bangkok</h1>");
    expect(out).toContain("฿15,000,000");
    expect(out).toContain(COPY.en.sampleNote);
    expect(out).toContain('rel="prev"');
    expect(out).not.toContain("+66");
  });

  it("404s an unknown id, and builds params for both locales", async () => {
    await expect(Listing({ params: Promise.resolve({ locale: "en", id: "99" }) })).rejects.toThrow("NOT_FOUND");
    expect(generateStaticParams()).toHaveLength(sampleProperties.length * 2);
    expect((await listingMeta({ params: Promise.resolve({ locale: "en", id: "1" }) })).title).toBe("Luxury Condo in Central Bangkok");
    expect(await listingMeta({ params: Promise.resolve({ locale: "en", id: "99" }) })).toEqual({});
  });
});

describe("guides, about, contact", () => {
  it("are honest: no published guide, no team, no phone or inbox", async () => {
    const { generateMetadata: aboutMeta } = await import("@/app/[locale]/about/page");
    const { generateMetadata: contactMeta } = await import("@/app/[locale]/contact/page");
    expect((await aboutMeta({ params: params("en") })).title).toBe("About this desk");
    expect((await contactMeta({ params: params("th") })).title).toBe("ติดต่อ");
    expect(await html(Guides({ params: params("en") }))).toContain(COPY.en.guidesEmptyTitle);
    expect((await guidesMeta({ params: params("en") })).title).toBe("Guides");
    const about = await html(About({ params: params("th") }));
    expect(about).toContain(COPY.th.aboutTitle);
    const contact = await html(Contact({ params: params("en") }));
    expect(contact).toContain("no agent, phone line or inbox");
    expect(contact).not.toMatch(/info@|\+66/);
  });
});

describe("site frame", () => {
  it("layouts, root redirect, sitemap, robots and redirects", () => {
    expect(localeParams()).toEqual([{ locale: "en" }, { locale: "th" }]);
    expect(renderToStaticMarkup(LocaleLayout({ children: <p>x</p> }))).toBe("<p>x</p>");
    expect(renderToStaticMarkup(RootLayout({ children: <p>y</p> }))).toContain('lang="en"');
    expect(String(metadata.metadataBase)).toBe("https://agencyrenting.bookchaowalit.com/");
    expect(() => RootPage()).toThrow("REDIRECT /en");
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain("https://agencyrenting.bookchaowalit.com/en/listings/1");
    expect(urls.some((url) => url.includes("more-projects"))).toBe(false);
    expect(robots().sitemap).toBe("https://agencyrenting.bookchaowalit.com/sitemap.xml");
  });

  it("sends /more-projects to the hub for good", async () => {
    expect(await nextConfig.redirects!()).toContainEqual({ source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true });
  });
});

describe("per-page canonical and hreflang", () => {
  it("points each page at itself, pairs the two languages and drops the filter query", async () => {
    const th = await homeMeta({ params: params("th") });
    expect(th.alternates?.canonical).toBe("/th");
    expect(th.alternates?.languages).toEqual({ en: "/en", th: "/th", "x-default": "/en" });
    expect(th.openGraph?.url).toBe("/th");
    const listing = await listingMeta({ params: Promise.resolve({ locale: "en", id: "1" }) });
    expect(listing.alternates?.canonical).toBe("/en/listings/1");
    expect(listing.alternates?.languages).toEqual({ en: "/en/listings/1", th: "/th/listings/1", "x-default": "/en/listings/1" });
    expect(listing.openGraph?.url).toBe("/en/listings/1");
    const listings = await listingsMeta({ params: params("th"), searchParams: search({ q: "condo", mode: "rent" }) });
    expect(listings.alternates?.canonical).toBe("/th/listings");
    expect((await guidesMeta({ params: params("en") })).alternates?.canonical).toBe("/en/articles");
    expect(metadata.alternates).toBeUndefined();
    expect((metadata.openGraph as { url?: string }).url).toBeUndefined();
  });
});

describe("Thai place search", () => {
  it("finds listings by Thai city names", () => {
    expect(filterListings(sampleProperties, "ภูเก็ต", "all").shown.map((p) => p.location)).toEqual(["Patong Beach, Phuket"]);
    expect(filterListings(sampleProperties, "เชียงใหม่", "all").shown.map((p) => p.location)).toEqual(["Nimmanhaemin, Chiang Mai"]);
    expect(filterListings(sampleProperties, "กรุงเทพฯ", "all").shown).toHaveLength(3);
  });
});

describe("helpers", () => {
  it("filters, counts, formats", () => {
    const { shown, counts } = filterListings(sampleProperties, "คอนโด", "all");
    expect(shown.every((property) => property.property_type === "condo")).toBe(true);
    expect(counts.all).toBe(shown.length);
    expect(parseMode("sale")).toBe("sale");
    expect(parseMode("<script>")).toBe("all");
    expect(typeLabel("castle", "en")).toBe("Castle");
    expect(money({ ...sampleProperties[0], price: 1000, price_type: "rent" }, "th")).toBe("฿1,000/เดือน");
  });
});
