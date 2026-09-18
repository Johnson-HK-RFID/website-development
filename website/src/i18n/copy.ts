import { useLocale } from "next-intl";
import zh from "./zh-HK.json";

export function translate(text: string, locale: string): string {
  if (locale !== "zh-HK") return text;
  const translation = (zh as Record<string, string>)[text.trim()];
  return translation === undefined ? text : translation;
}

export function useCopy() {
  const locale = useLocale();
  return (text: string) => translate(text, locale);
}
