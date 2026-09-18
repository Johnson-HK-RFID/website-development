import { useCopy } from "@/i18n/copy";
import { ActionLink } from "@/components/shared";
export default function NotFound() {
 const t = useCopy(); return <section className="not-found wrap"><div className="eyebrow justify-center">{t("PAGE NOT FOUND")}</div><h1>{t("Let\u2019s get you")}<br />{t("back on site.")}</h1><p>{t("The page you\u2019re looking for isn\u2019t available. Explore our solutions or return to the homepage.")}</p><ActionLink href="/">{t("Back to home")}</ActionLink></section>; }
