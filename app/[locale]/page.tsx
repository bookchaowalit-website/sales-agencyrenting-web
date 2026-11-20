import type { Metadata } from "next";
import { HomeView } from "@/components/agency-views";
import { pageMetadata, readLocale } from "@/lib/locale-page";
import { getFeaturedProperties } from "@/lib/sampleData";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return pageMetadata(await readLocale(params), "");
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  return <HomeView locale={locale} featured={getFeaturedProperties(5)} />;
}
