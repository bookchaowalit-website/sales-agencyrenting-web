import type { Metadata } from "next";
import { AboutView } from "@/components/agency-views";
import { COPY } from "@/lib/copy";
import { pageMetadata, readLocale } from "@/lib/locale-page";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await readLocale(params);
  return pageMetadata(locale, "/about", COPY[locale].aboutTitle);
}

export default async function Page({ params }: Props) {
  return <AboutView locale={await readLocale(params)} />;
}
