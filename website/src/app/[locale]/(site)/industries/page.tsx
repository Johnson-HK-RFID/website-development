import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useCopy } from "@/i18n/copy";
import { IndustryPhoto } from "@/components/industry-photo";
import { pageMetadata } from "@/lib/metadata";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ContactBand, PageIntro } from "@/components/shared";
import { industries, solutions } from "@/content/site";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {const {locale}=await params; setRequestLocale(locale); return pageMetadata("/industries", "Industries", "Connected engineering for construction, infrastructure, property and facilities, and industrial environments.");}
export default function IndustriesPage({params}: {params: Promise<{locale: string}>}) {
 const {locale}=use(params); setRequestLocale(locale);
 const t = useCopy(); return <><PageIntro scene="infrastructure" label={t("INDUSTRIES")} title={<>{t("Different environments.")}<br />{t("A connected approach.")}</>} description={t("Bring field engineering, connected hardware and operational intelligence to the places where your teams work.")}/><section className="wrap pb-20" aria-label={t("Industry applications")}>{industries.map(industry => <article className="industry-detail" id={industry.slug} key={industry.slug}><div><h2>{t(industry.title)}</h2><p>{t(industry.description)}</p><span className="mono">{t(industry.focus)}</span></div><div className="industry-media"><IndustryPhoto industry={industry.slug}/><div className="industry-solution-links">{industry.solutions.map(slug => { const solution = solutions.find(item => item.slug === slug)!; return <Link key={slug} href={`/solutions/${slug}`}>{t(solution.title)}<ArrowUpRight size={20} aria-hidden="true"/></Link>; })}</div></div></article>)}</section><ContactBand title={t("Let\u2019s understand your environment.")}/></>; }
