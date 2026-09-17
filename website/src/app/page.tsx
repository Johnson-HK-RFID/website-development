import Link from "next/link";
import { ArrowRight, ArrowUpRight, Broadcast, Stack, FileText } from "@phosphor-icons/react/dist/ssr";
import { ActionLink, Architecture, ConceptImage, ContactBand, ServiceList, TextLink } from "@/components/shared";
import { industries, solutions, caseStudies } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("/", "Embedded intelligence for the built world", "Field engineering, connected hardware and TRACI intelligence for construction, infrastructure and the built environment."), title: { absolute: "Embuilded | Embedded intelligence for the built world" } };

export default function Home() {
  return <>
    <section className="home-hero wrap">
      <div className="hero-copy"><div className="eyebrow"><span className="accent-line" />CONNECTED IN THE FIELD</div><h1>Embedded intelligence<br />for the <span>built world.</span></h1><p>Field devices, operational data and evidence.<br className="desktop-break" /> Connected into practical systems.</p><div className="hero-actions"><ActionLink href="/solutions">Explore solutions</ActionLink><TextLink href="/traci">Meet TRACI</TextLink></div></div>
      <div className="hero-visual"><ConceptImage priority /><div className="hero-image-note"><span className="mono">THE BUILT WORLD, CONNECTED</span><ArrowUpRight size={24} aria-hidden="true" /></div><div className="image-corner" aria-hidden="true" /></div>
    </section>

    <section className="value-strip"><div className="wrap value-strip-inner"><span className="value-strip-label">From the field.<br /><strong>To the bigger picture.</strong></span><div><Broadcast size={26} weight="light" aria-hidden="true" /><span>Connect devices</span></div><ArrowRight className="strip-arrow" size={18} aria-hidden="true" /><div><Stack size={26} weight="light" aria-hidden="true" /><span>Make data useful</span></div><ArrowRight className="strip-arrow" size={18} aria-hidden="true" /><div><FileText size={26} weight="light" aria-hidden="true" /><span>Capture evidence</span></div></div></section>

    <section className="section wrap"><div className="section-heading"><h2>Real environments.<br /><span className="muted-heading">Connected solutions.</span></h2><p>Start with the challenge on your site. Build the right combination of devices, engineering and intelligence.</p></div><div className="home-solutions">{solutions.filter(s => s.slug !== "outrigger-monitoring").map((solution, i) => <Link key={solution.slug} href={`/solutions/${solution.slug}`} className={`home-solution ${i === 0 ? "home-solution-featured" : ""}`}><div className="solution-topline"><span className="mono">{solution.category}</span><ArrowUpRight size={23} aria-hidden="true" /></div>{i === 0 && <div className="signal-visual" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>}<div><h3>{solution.title}</h3><p>{solution.description}</p></div></Link>)}</div><div className="section-bottom"><TextLink href="/solutions">View all solutions</TextLink><Link className="subtle-link" href="/traci#plugins">Explore TRACI BCDS and the plugin family <ArrowRight size={16} aria-hidden="true" /></Link></div></section>

    <section className="services-section"><div className="wrap services-grid"><div className="section-heading"><h2>Three ways<br />to move forward.</h2><p>Use the engineering you need.<br />Add the hardware that fits.<br />Connect it with managed services.</p><TextLink href="/services">Explore our services</TextLink></div><ServiceList /></div></section>

    <section className="section wrap platform-section"><div className="platform-copy"><div className="eyebrow">THE TRACI PLATFORM</div><h2>One connected view.<br />From device to evidence.</h2><p>A modular device, intelligence and evidence platform for the built world. Connect the field with the systems your teams use.</p><ActionLink href="/traci" secondary>Meet TRACI</ActionLink></div><Architecture /></section>

    <section className="partner-section"><div className="wrap partner-inner"><div><span className="partner-prelude">Built for collaboration.</span><h2>Keep your platform.<br /><span>We connect the field.</span></h2></div><div className="partner-copy"><p>Your software. Your customer relationship. Our field engineering, connected devices and managed infrastructure underneath it.</p><ActionLink href="/partners" light>Explore partnerships</ActionLink></div></div></section>

    <section className="section wrap"><div className="section-heading"><h2>Built around your environment.</h2><p>Practical systems for the places where work happens.</p></div><div className="industry-links">{industries.map((industry, index) => <Link key={industry.slug} href={`/industries#${industry.slug}`}><span className="mono">0{index + 1}</span><h3>{industry.title}</h3><ArrowUpRight size={24} aria-hidden="true" /></Link>)}</div></section>

    <section className="case-section wrap"><div className="case-symbol" aria-hidden="true"><FileText size={48} weight="light" /></div><div><h2>Field notes & case studies</h2>{caseStudies.length === 0 ? <p>Project stories are being prepared. In the meantime, explore how our solutions fit your site.</p> : caseStudies.map(study => <p key={study.slug}>{study.description}</p>)}</div><TextLink href="/solutions">Explore solutions</TextLink></section>
    <ContactBand />
  </>;
}
