import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useCopy } from "@/i18n/copy";
import { IndustryPhoto } from "@/components/industry-photo";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ActionLink, Architecture, BuildingImage, ContactBand, ServiceList, TextLink } from "@/components/shared";
import { industries, solutions, caseStudies } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {const {locale}=await params; setRequestLocale(locale); return pageMetadata("/", "Embedded intelligence for the built world", "Field engineering, connected hardware and TRACI intelligence for construction, infrastructure and the built environment.", true);}
export default function Home({params}: {params: Promise<{locale: string}>}) {
 const {locale}=use(params); setRequestLocale(locale);
 const t = useCopy();
    return <>
    <section className="home-hero wrap">
      <div className="hero-copy"><div className="eyebrow"><span className="accent-line"/>{t("CONNECTED IN THE FIELD")}</div><h1>{t("Embedded intelligence")}<br />{t("for the ")}<span>{t("built world.")}</span></h1><p>{t("Field devices, operational data and evidence.")}<br className="desktop-break"/>{t(" Connected into practical systems.")}</p><div className="hero-actions"><ActionLink href="/solutions">{t("Explore solutions")}</ActionLink><TextLink href="/traci">{t("Meet TRACI")}</TextLink></div></div>
      <div className="hero-visual"><BuildingImage priority/><div className="hero-image-note"><span className="mono">{t("THE BUILT WORLD, CONNECTED")}</span></div></div>
    </section>

    <section className="value-strip"><div className="wrap value-strip-inner"><span className="value-strip-label">{t("From the field.")}<br /><strong>{t("To the bigger picture.")}</strong></span><div><span>{t("Connect devices")}</span></div><ArrowRight className="strip-arrow" size={18} aria-hidden="true"/><div><span>{t("Make data useful")}</span></div><ArrowRight className="strip-arrow" size={18} aria-hidden="true"/><div><span>{t("Capture evidence")}</span></div></div></section>

    <section className="section wrap"><div className="section-heading"><h2>{t("Real environments.")}<br /><span className="muted-heading">{t("Connected solutions.")}</span></h2><p>{t("Start with the challenge on your site. Build the right combination of devices, engineering and intelligence.")}</p></div><div className="home-solutions">{solutions.filter(s => s.slug !== "outrigger-monitoring").map((solution, i) => <Link key={solution.slug} href={`/solutions/${solution.slug}`} className={`home-solution ${i === 0 ? "home-solution-featured" : ""}`}><div className="solution-topline"><span className="mono">{t(solution.category)}</span><ArrowUpRight size={20} aria-hidden="true"/></div><div><h3>{t(solution.title)}</h3><p>{t(solution.description)}</p></div></Link>)}</div><div className="section-bottom"><TextLink href="/solutions">{t("View all solutions")}</TextLink><Link className="subtle-link" href="/traci#plugins">{t("Explore TRACI BCDS and the plugin family ")}<ArrowRight size={16} aria-hidden="true"/></Link></div></section>

    <section className="services-section"><div className="wrap services-grid"><div className="section-heading"><h2>{t("Three ways")}<br />{t("to move forward.")}</h2><p>{t("Use the engineering you need.")}<br />{t("Add the hardware that fits.")}<br />{t("Connect it with managed services.")}</p><TextLink href="/services">{t("Explore our services")}</TextLink></div><ServiceList /></div></section>

    <section className="section wrap platform-section"><div className="platform-copy"><div className="eyebrow">{t("THE TRACI PLATFORM")}</div><h2>{t("One connected view.")}<br />{t("From device to evidence.")}</h2><p>{t("A modular device, intelligence and evidence platform for the built world. Connect the field with the systems your teams use.")}</p><ActionLink href="/traci" secondary>{t("Meet TRACI")}</ActionLink></div><Architecture /></section>

    <section className="partner-section"><div className="wrap partner-inner"><div><span className="partner-prelude">{t("Built for collaboration.")}</span><h2>{t("Keep your platform.")}<br /><span>{t("We connect the field.")}</span></h2></div><div className="partner-copy"><p>{t("Your software. Your customer relationship. Our field engineering, connected devices and managed infrastructure underneath it.")}</p><ActionLink href="/partners" light>{t("Explore partnerships")}</ActionLink></div></div></section>

    <section className="section wrap"><div className="section-heading"><h2>{t("Built around your environment.")}</h2><p>{t("Practical systems for the places where work happens.")}</p></div><div className="industry-links">{industries.map((industry, index) => <Link key={industry.slug} href={`/industries#${industry.slug}`}><IndustryPhoto industry={industry.slug} compact/><span className="mono">0{index + 1}</span><h3>{t(industry.title)}</h3><ArrowUpRight size={24} aria-hidden="true"/></Link>)}</div></section>

    <section className="case-section wrap"><div><h2>{t("Field notes & case studies")}</h2>{caseStudies.length === 0 ? <p>{t("Project stories are being prepared. In the meantime, explore how our solutions fit your site.")}</p> : caseStudies.map(study => <p key={study.slug}>{t(study.description)}</p>)}</div><TextLink href="/solutions">{t("Explore solutions")}</TextLink></section>
    <ContactBand />
  </>;
}
