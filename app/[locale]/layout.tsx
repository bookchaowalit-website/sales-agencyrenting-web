import type { ReactNode } from "react";
import { localeParams } from "@/lib/locale-page";

export const dynamicParams = false;
export const generateStaticParams = localeParams;

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return children;
}
