import type { Metadata } from "next";

export function siteOrigin(): string | null {
  try { const url = new URL(process.env.SITE_URL ?? ""); return ["https:", "http:"].includes(url.protocol) ? url.origin : null; } catch { return null; }
}

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const origin = siteOrigin();
  return { title, description, ...(origin ? { alternates: { canonical: `${origin}${path}` }, openGraph: { url: `${origin}${path}`, title, description } } : {}) };
}
