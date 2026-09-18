import { setRequestLocale } from "next-intl/server";
import { getCopy } from "@/i18n/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import { ActionLink, ContactBand } from "@/components/shared";
import { solutions } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;
export function generateStaticParams() { return solutions.map(solution => ({ slug: solution.slug })); }
export async function generateMetadata({ params }: {
    params: Promise<{
        slug: string; locale: string;
    }>;
}): Promise<Metadata> {
    const { slug, locale } = await params; setRequestLocale(locale);
    const solution = solutions.find(item => item.slug === slug);
    return pageMetadata(`/solutions/${slug}`, solution?.title ?? "Solution not found", solution?.description ?? "Explore connected solutions from Embuilded.");
}
export default async function SolutionPage({ params }: {
    params: Promise<{
        slug: string; locale: string;
    }>;
}) {
 const {locale}=await params; setRequestLocale(locale);
 const t = await getCopy();
    const { slug } = await params;
    const solution = solutions.find(item => item.slug === slug);
    if (!solution)
        notFound();
    const related = solutions.filter(item => solution.related.includes(item.slug));
    return <><section className="page-intro wrap"><nav className="breadcrumb" aria-label={t("Breadcrumb")}><Link href="/solutions">{t("Solutions")}</Link><ArrowRight size={13} aria-hidden="true"/><span>{t(solution.title)}</span></nav><div className="detail-intro"><div><div className="eyebrow">{t(solution.category.toUpperCase())}</div><h1>{t(solution.title)}</h1><p>{t(solution.description)}</p><div className="intro-actions"><ActionLink href={`/contact?service=${encodeURIComponent(solution.title)}`}>{t("Let\u2019s talk")}</ActionLink></div></div><div className="detail-visual"><span aria-hidden="true">{solution.number}</span><div>{solution.focus.map(focus => <span className="tag" key={focus}>{t(focus)}</span>)}</div></div></div></section>
    <section className="section wrap detail-body"><div><h2>{t("Built around")}<br />{t("your operation.")}</h2><p>{t(solution.intro)}</p><p className="detail-note">{t("Hardware selection, monitoring parameters and integration scope are established during project scoping.")}</p></div><div><h2 className="mb-7">{t("What we\u2019ll work through.")}</h2><ul className="scope-list">{solution.scope.map(item => <li key={item}><Check size={18} aria-hidden="true"/>{t(item)}</li>)}</ul></div></section>
    <section className="page-panel"><div className="wrap"><div className="section-heading"><h2>{t("Connect the wider picture.")}</h2></div><div className="capability-grid">{related.map(item => <article key={item.slug}><h3>{t(item.title)}</h3><p>{t(item.description)}</p><Link className="text-link" href={`/solutions/${item.slug}`}>{t("Explore solution")}<ArrowUpRight size={18} aria-hidden="true"/></Link></article>)}</div></div></section><ContactBand title={`Let’s scope your ${solution.shortTitle.toLowerCase()} requirements.`}/></>;
}
