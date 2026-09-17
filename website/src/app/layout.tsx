import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/shared";
import { siteOrigin } from "@/lib/metadata";

const geist = localFont({ src: "../../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2", variable: "--type-body", display: "swap", weight: "100 900" });
const wordmark = localFont({ src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2", variable: "--type-wordmark", display: "swap", weight: "200 800", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin() ?? "http://localhost:3000"),
  title: { default: "Embuilded | Embedded intelligence for the built world", template: "%s | Embuilded" },
  description: "Field engineering, connected hardware and TRACI intelligence for construction, infrastructure and the built environment.",
  robots: process.env.SITE_INDEXABLE === "true" ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: "website", siteName: "Embuilded", locale: "en_GB" },
  twitter: { card: "summary_large_image" }
};
export const viewport: Viewport = { themeColor: "#fafbfc" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geist.variable} ${wordmark.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><SiteHeader /><main id="main">{children}</main><SiteFooter /></body></html>;
}
