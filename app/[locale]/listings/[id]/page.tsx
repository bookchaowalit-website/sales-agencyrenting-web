import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingView } from "@/components/agency-views";
import { LOCALES } from "@/lib/copy";
import { readLocale } from "@/lib/locale-page";
import { sampleProperties, sortProperties } from "@/lib/sampleData";

type Props = { params: Promise<{ locale: string; id: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.flatMap((locale) => sampleProperties.map((property) => ({ locale, id: property.id })));
}

const find = (id: string) => sampleProperties.find((property) => property.id === id);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = find(id);
  return property ? { title: property.title, description: `${property.location}. Sample listing for a design demo.` } : {};
}

export default async function Listing({ params }: Props) {
  const locale = await readLocale(params);
  const property = find((await params).id);
  if (!property) notFound();
  return <ListingView locale={locale} property={property} properties={sortProperties(sampleProperties, "date-new")} />;
}
