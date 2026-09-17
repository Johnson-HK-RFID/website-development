import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/metadata";
export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();
  const indexable = process.env.SITE_INDEXABLE === "true" && !!origin;
  return { rules: { userAgent: "*", ...(indexable ? { allow: "/", disallow: "/api/" } : { disallow: "/" }) }, ...(indexable ? { sitemap: `${origin}/sitemap.xml` } : {}) };
}
