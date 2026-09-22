import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "../globals.css";
import "../editorial.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/shared";
import { siteOrigin } from "@/lib/metadata";
import { EngineeringMotion } from "@/components/engineering-motion";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { translate } from "@/i18n/copy";

const geist = localFont({ src: "../../../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2", variable: "--type-body", display: "swap", weight: "100 900" });
const wordmark = localFont({ src: "../../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2", variable: "--type-wordmark", display: "swap", weight: "200 800", preload: false });
const display = localFont({ src: "../../../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-600-normal.woff2", variable: "--type-display", display: "swap", weight: "600" });

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin() ?? "http://localhost:3000"),
  title: { default: "Embuilded | Embedded intelligence for the built world", template: "%s | Embuilded" },
  description: "Field engineering, connected hardware and TRACI intelligence for construction, infrastructure and the built environment.",
  robots: process.env.SITE_INDEXABLE === "true" ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: "website", siteName: "Embuilded", locale: "en_GB" },
  twitter: { card: "summary_large_image" }
};
export const viewport: Viewport = { themeColor: "#f8f8f6" };
export function generateStaticParams() { return routing.locales.map(locale => ({locale})); }
export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{locale: string}> }>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <html lang={locale} className={`${geist.variable} ${wordmark.variable} ${display.variable}`}><body><NextIntlClientProvider locale={locale} messages={{}}><a className="skip-link" href="#main">{translate("Skip to content", locale)}</a><SiteHeader /><main id="main">{children}</main><SiteFooter /><EngineeringMotion /></NextIntlClientProvider></body></html>;
}
