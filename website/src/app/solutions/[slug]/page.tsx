import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import { ActionLink, ContactBand } from "@/components/shared";
import { solutions } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;
export function generateStaticParams() { return solutions.map(solution => ({ slug: solution.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions.find(item => item.slug === slug);
  return pageMetadata(`/solutions/${slug}`, solution?.title ?? "Solution not found", solution?.description ?? "Explore connected solutions from Embuilded.");
}
export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = solutions.find(item => item.slug === slug);
  if (!solution) notFound();
  const related = solutions.filter(item => solution.related.includes(item.slug));
  return <><section className="page-intro wrap"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/solutions">Solutions</Link><ArrowRight size={13} aria-hidden="true" /><span>{solution.title}</span></nav><div className="detail-intro"><div><div className="eyebrow">{solution.category.toUpperCase()}</div><h1>{solution.title}</h1><p>{solution.description}</p><div className="intro-actions"><ActionLink href={`/contact?service=${encodeURIComponent(solution.title)}`}>Let’s talk</ActionLink></div></div><div className="detail-visual"><span aria-hidden="true">{solution.number}</span><div>{solution.focus.map(focus => <span className="tag" key={focus}>{focus}</span>)}</div></div></div></section>
    <section className="section wrap detail-body"><div><h2>Built around<br />your operation.</h2><p>{solution.intro}</p><p className="detail-note">Hardware selection, monitoring parameters and integration scope are established during project scoping.</p></div><div><h2 className="mb-7">What we’ll work through.</h2><ul className="scope-list">{solution.scope.map(item => <li key={item}><Check size={18} aria-hidden="true" />{item}</li>)}</ul></div></section>
    <section className="page-panel"><div className="wrap"><div className="section-heading"><h2>Connect the wider picture.</h2></div><div className="capability-grid">{related.map(item => <article key={item.slug}><h3>{item.title}</h3><p>{item.description}</p><Link className="text-link" href={`/solutions/${item.slug}`}>Explore solution<ArrowUpRight size={18} aria-hidden="true" /></Link></article>)}</div></div></section><ContactBand title={`Let’s scope your ${solution.shortTitle.toLowerCase()} requirements.`} /></>;
}
