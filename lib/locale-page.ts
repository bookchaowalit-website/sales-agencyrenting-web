import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "./copy";

/**
 * Canonical, hreflang pair and og:url for one page, built from its own path (never the filter query),
 * so /th and each listing are indexed as themselves rather than folded into /en.
 * `path` is the part after the locale: "" for home, "/listings/1" for a listing.
 */
export function pageMetadata(locale: Locale, path: string, title?: string): Metadata {
  const url = `/${locale}${path}`;
  return {
    ...(title ? { title } : {}),
    alternates: { canonical: url, languages: { en: `/en${path}`, th: `/th${path}`, "x-default": `/en${path}` } },
    openGraph: {
      type: "website",
      siteName: "Agency Renting",
      url,
      locale: locale === "th" ? "th_TH" : "en_US",
      title: title ? `${title} | Agency Renting` : "Agency Renting | Sample property desk",
      description: "A bilingual design demo of a property desk for Thailand, with sample listings.",
    },
  };
}

export const localeParams = () => LOCALES.map((locale) => ({ locale }));

/** The [locale] segment, or a 404 for anything that is not en/th. */
export async function readLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
