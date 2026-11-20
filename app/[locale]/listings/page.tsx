import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ListingsView } from "@/components/agency-views";
import { COPY, parseMode } from "@/lib/copy";
import { pageMetadata, readLocale } from "@/lib/locale-page";
import { sampleProperties, sortProperties } from "@/lib/sampleData";

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };
const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await readLocale(params);
  // The canonical drops ?q= and ?mode=: filtered views fold into the listings page.
  return pageMetadata(locale, "/listings", COPY[locale].listingsTitle);
}

export default async function Listings({ params, searchParams }: Props) {
  const locale = await readLocale(params);
  const query = await searchParams;
  // Old links used ?property=<id>; send them to the listing's own page.
  const property = one(query.property);
  if (property && sampleProperties.some((item) => item.id === property)) redirect(`/${locale}/listings/${property}`);
  return <ListingsView locale={locale} properties={sortProperties(sampleProperties, "date-new")} query={one(query.q).trim().slice(0, 80)} mode={parseMode(one(query.mode))} />;
}
