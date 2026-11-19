import type { Metadata } from "next";
import { ContactView } from "@/components/agency-views";
import { COPY } from "@/lib/copy";
import { readLocale } from "@/lib/locale-page";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await readLocale(params);
  return { title: COPY[locale].contactTitle };
}

export default async function Page({ params }: Props) {
  return <ContactView locale={await readLocale(params)} />;
}
