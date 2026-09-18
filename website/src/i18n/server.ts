import { getLocale } from "next-intl/server";
import { translate } from "./copy";

export async function getCopy() {
  const locale = await getLocale();
  return (text: string) => translate(text, locale);
}
