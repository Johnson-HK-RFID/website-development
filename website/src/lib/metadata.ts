import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { translate } from "@/i18n/copy";

export function siteOrigin(): string | null {
  try { const url = new URL(process.env.SITE_URL ?? ""); return ["https:", "http:"].includes(url.protocol) ? url.origin : null; } catch { return null; }
}

export async function pageMetadata(path: string, title: string, description: string, home = false): Promise<Metadata> {
  const locale = await getLocale();
  title = translate(title, locale);
  description = translate(description, locale);
  const origin = siteOrigin();
  const prefix = locale === "zh-HK" ? "/zh-HK" : "";
  const localizedPath = prefix + (path === "/" && prefix ? "" : path);
  return { title: home ? {absolute: `Embuilded | ${title}`} : title, description,
    alternates: { canonical: localizedPath, languages: {en: path, "zh-HK": `/zh-HK${path === "/" ? "" : path}`, "x-default": path} },
    openGraph: { ...(origin ? {url: `${origin}${localizedPath}`} : {}), title, description, locale: locale === "zh-HK" ? "zh_HK" : "en_GB", alternateLocale: locale === "zh-HK" ? "en_GB" : "zh_HK" }
  };
}
