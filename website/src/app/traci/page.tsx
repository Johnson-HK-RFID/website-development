import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ActionLink, Architecture, ContactBand, PageIntro } from "@/components/shared";
import { capabilities, plugins } from "@/content/site";

export const metadata = pageMetadata("/traci", "TRACI platform", "A modular device, intelligence and evidence platform for the built world. Connect field devices, workflows and your existing systems.");
export default function TraciPage() {
  return <><PageIntro label="TRACI" title={<>The field, connected.<br />The evidence, in context.</>} description="A modular device, intelligence and evidence platform for the built world. Connect field operations with the systems your teams already use."><ActionLink href="/contact?service=TRACI%20platform">Let’s talk</ActionLink></PageIntro>
    <section className="page-panel"><div className="wrap wide-architecture"><Architecture /></div></section>
    <section className="section wrap"><div className="section-heading"><h2>From individual signals<br />to connected operations.</h2><p>Build around the capabilities your operation needs.</p></div><div className="capability-grid">{capabilities.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="page-panel" id="plugins"><div className="wrap"><div className="section-heading"><h2>A modular plugin family.</h2><p>Explore the TRACI modules around your operational requirements.</p></div><div className="plugin-grid">{plugins.map(plugin => <Link key={plugin} href={`/contact?service=${encodeURIComponent(plugin)}`}>{plugin}<ArrowUpRight size={18} aria-hidden="true" /></Link>)}</div><p className="note">Module selection, functionality and integration scope are defined for each project. Discuss your requirements to identify the right fit.</p></div></section>
    <ContactBand title="Your platform. A connected field." description="Bring TRACI capabilities into the way your operation works." /></>;
}
