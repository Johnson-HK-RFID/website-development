import type { MetadataRoute } from "next";
import { navigation, solutions } from "@/content/site";
import { siteOrigin } from "@/lib/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  if (!origin) return [];
  return ["/", ...navigation.map(item => item.href), "/contact", ...solutions.map(solution => `/solutions/${solution.slug}`)].map(path => ({ url: `${origin}${path}`, changeFrequency: "monthly", priority: path === "/" ? 1 : 0.7 }));
}
