import type { MetadataRoute } from "next";
import { navigation, solutions } from "@/content/site";
import { siteOrigin } from "@/lib/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  if (!origin) return [];
  return ["/", ...navigation.map(item => item.href), "/contact", ...solutions.map(solution => `/solutions/${solution.slug}`)].flatMap(path => {
    const languages = { en: `${origin}${path}`, "zh-HK": `${origin}/zh-HK${path === "/" ? "" : path}` };
    return Object.values(languages).map(url => ({url, alternates: {languages}, changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.7}));
  });
}
