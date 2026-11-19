import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "./copy";

export const localeParams = () => LOCALES.map((locale) => ({ locale }));

/** The [locale] segment, or a 404 for anything that is not en/th. */
export async function readLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
