import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useCopy } from "@/i18n/copy";
import { pageMetadata } from "@/lib/metadata";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ActionLink, Architecture, ContactBand, PageIntro } from "@/components/shared";
import { capabilities, plugins } from "@/content/site";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {const {locale}=await params; setRequestLocale(locale); return pageMetadata("/traci", "TRACI platform", "A modular device, intelligence and evidence platform for the built world. Connect field devices, workflows and your existing systems.");}
export default function TraciPage({params}: {params: Promise<{locale: string}>}) {
 const {locale}=use(params); setRequestLocale(locale);
 const t = useCopy();
    return <><PageIntro scene="tower" label={t("TRACI")} title={<>{t("The field, connected.")}<br />{t("The evidence, in context.")}</>} description={t("A modular device, intelligence and evidence platform for the built world. Connect field operations with the systems your teams already use.")}><ActionLink href="/contact?service=TRACI%20platform">{t("Let\u2019s talk")}</ActionLink></PageIntro>
    <section className="page-panel"><div className="wrap wide-architecture"><Architecture /></div></section>
    <section className="section wrap"><div className="section-heading"><h2>{t("From individual signals")}<br />{t("to connected operations.")}</h2><p>{t("Build around the capabilities your operation needs.")}</p></div><div className="capability-grid">{capabilities.map(([title, description]) => <article key={title}><h3>{t(title)}</h3><p>{t(description)}</p></article>)}</div></section>
    <section className="page-panel" id="plugins"><div className="wrap"><div className="section-heading"><h2>{t("A modular plugin family.")}</h2><p>{t("Explore the TRACI modules around your operational requirements.")}</p></div><div className="plugin-grid">{plugins.map(plugin => <Link key={plugin} href={`/contact?service=${encodeURIComponent(plugin)}`}>{t(plugin)}<ArrowUpRight size={18} aria-hidden="true"/></Link>)}</div><p className="note">{t("Module selection, functionality and integration scope are defined for each project. Discuss your requirements to identify the right fit.")}</p></div></section>
    <ContactBand title={t("Your platform. A connected field.")} description={t("Bring TRACI capabilities into the way your operation works.")}/></>;
}
