import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/copy";
import { sampleProperties } from "@/lib/sampleData";
import { SITE_URL } from "@/lib/site";

const PAGES = ["", "/listings", ...sampleProperties.map((property) => `/listings/${property.id}`), "/articles", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: `${SITE_URL}/en${page}`,
    changeFrequency: "weekly" as const,
    priority: page === "" ? 1 : 0.7,
    alternates: { languages: Object.fromEntries(LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${page}`])) },
  }));
}
