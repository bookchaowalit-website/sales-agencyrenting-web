import { HomeView } from "@/components/agency-views";
import { readLocale } from "@/lib/locale-page";
import { getFeaturedProperties } from "@/lib/sampleData";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  return <HomeView locale={locale} featured={getFeaturedProperties(5)} />;
}
