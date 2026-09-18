import { headers } from "next/headers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { translate } from "@/i18n/copy";
import "./globals.css";

const body = localFont({src:"../../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2", variable:"--type-body", display:"swap"});
const display = localFont({src:"../../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-600-normal.woff2", variable:"--type-display", display:"swap"});
export const metadata: Metadata = {title:"404 | Embuilded", robots:{index:false,follow:false}};

export default async function GlobalNotFound() {
  const locale = (await headers()).get("x-website-locale") === "zh-HK" ? "zh-HK" : "en";
  const t = (text:string) => translate(text,locale);
  const home = locale === "zh-HK" ? "/zh-HK" : "/";
  return <html lang={locale} className={`${body.variable} ${display.variable}`}><body>
    <main className="not-found wrap"><div className="eyebrow justify-center">{t("PAGE NOT FOUND")}</div>
      <h1>{t("Let’s get you")}<br/>{t("back on site.")}</h1>
      <p>{t("The page you’re looking for isn’t available. Explore our solutions or return to the homepage.")}</p>
      <a className="button" href={home}>{t("Back to home")}</a>
    </main>
  </body></html>;
}
