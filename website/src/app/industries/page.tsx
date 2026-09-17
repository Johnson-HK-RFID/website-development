import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ContactBand, PageIntro } from "@/components/shared";
import { industries, solutions } from "@/content/site";
export const metadata = pageMetadata("/industries", "Industries", "Connected engineering for construction, infrastructure, property and facilities, and industrial environments.");
export default function IndustriesPage() { return <><PageIntro label="INDUSTRIES" title={<>Different environments.<br />A connected approach.</>} description="Bring field engineering, connected hardware and operational intelligence to the places where your teams work." /><section className="wrap pb-20" aria-label="Industry applications">{industries.map(industry => <article className="industry-detail" id={industry.slug} key={industry.slug}><div><h2>{industry.title}</h2><p>{industry.description}</p><span className="mono">{industry.focus}</span></div><div className="industry-solution-links">{industry.solutions.map(slug => { const solution = solutions.find(item => item.slug === slug)!; return <Link key={slug} href={`/solutions/${slug}`}>{solution.title}<ArrowUpRight size={20} aria-hidden="true" /></Link>; })}</div></article>)}</section><ContactBand title="Let’s understand your environment." /></>; }
