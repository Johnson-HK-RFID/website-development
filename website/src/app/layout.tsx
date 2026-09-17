import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/shared";
import { siteOrigin } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin() ?? "http://localhost:3000"),
  title: { default: "Embuilded | Embedded intelligence for the built world", template: "%s | Embuilded" },
  description: "Field engineering, connected hardware and TRACI intelligence for construction, infrastructure and the built environment.",
  robots: process.env.SITE_INDEXABLE === "true" ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: "website", siteName: "Embuilded", locale: "en_GB" },
  twitter: { card: "summary_large_image" }
};
export const viewport: Viewport = { themeColor: "#182322" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><SiteHeader /><main id="main">{children}</main><SiteFooter /></body></html>;
}
