import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Noto_Sans_Thai } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Font variables sit on <html>: the Reader shell tokens live on :root and read them from there.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const notoThai = Noto_Sans_Thai({ variable: "--font-noto-thai", subsets: ["thai"], weight: ["400", "600", "700"], preload: false });

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Agency Renting | Sample property desk", template: "%s | Agency Renting" },
  description: "A bilingual (English and Thai) design demo of a property desk for Thailand, with sample condos, houses and land for rent or sale.",
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "Bookchaowalit",
  icons: { icon: "/icon.svg" },
  alternates: { canonical: "/en", languages: { en: "/en", th: "/th" } },
  openGraph: { type: "website", url: "/en", siteName: "Agency Renting", title: "Agency Renting | Sample property desk", description: "A bilingual design demo of a property desk for Thailand, with sample listings." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${notoThai.variable}`}>
      <body>{children}</body>
    </html>
  );
}
