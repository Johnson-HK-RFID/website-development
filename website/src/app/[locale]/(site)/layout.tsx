import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";

// Keep page-level not-found/error boundaries inside the locale document layout.
export default async function SiteLayout({children, params}: {children: ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return children;
}
