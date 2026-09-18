"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useCopy } from "@/i18n/copy";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useCopy();
  return <nav className="language-switcher" data-locale-switch aria-label={t("Language")}>
    {([['en', 'EN'], ['zh-HK', '繁中']] as const).map(([language, label]) => {
      const href = language === 'en' ? pathname : `/zh-HK${pathname === '/' ? '' : pathname}`;
      return <a key={language} href={href} lang={language} hrefLang={language} aria-current={locale === language ? 'page' : undefined}
        onClick={event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
          event.preventDefault();
          window.location.assign(href + window.location.search + window.location.hash);
        }}>{label}</a>;
    })}
  </nav>;
}
