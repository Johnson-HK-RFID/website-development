import { useCopy } from "@/i18n/copy";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import { navigation, services } from "@/content/site";
import { photography } from "@/content/photography";
import { Brand } from "./site-header";
export function ActionLink({ href, children, secondary = false, light = false }: {
    href: string;
    children: ReactNode;
    secondary?: boolean;
    light?: boolean;
}) {
 return <Link className={`button${secondary ? " button-secondary" : ""}${light ? " button-light" : ""}`} href={href}>{children}<ArrowUpRight size={19} aria-hidden="true"/></Link>;
}
export function TextLink({ href, children }: {
    href: string;
    children: ReactNode;
}) {
 return <Link href={href} className="text-link">{children}<ArrowRight size={18} aria-hidden="true"/></Link>; }
export function PageIntro({ label, title, description, children }: {
    label: string;
    title: ReactNode;
    description: string;
    children?: ReactNode;
}) {
 const t = useCopy();
    return <section className="page-intro wrap"><div className="eyebrow">{t(label)}</div><h1>{title}</h1><p>{t(description)}</p>{children && <div className="intro-actions">{children}</div>}</section>;
}
export function BuildingImage({ className = "", priority = false }: { className?: string; priority?: boolean }) {
 const t = useCopy(); const photo=photography.construction;
 return <figure className={`concept-image ${className}`} data-building-photo><div className="concept-image-frame"><Image src={photo.src} alt={t(photo.alt)} fill sizes={priority ? "100vw" : "(max-width: 767px) calc(100vw - 48px), 50vw"} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} style={{objectPosition:photo.position}} /></div></figure>;
}

function Connection() {
    return <svg className="architecture-connector" viewBox="0 0 64 12" fill="none" aria-hidden="true"><path d="M0 6H61M56 1L61 6L56 11" stroke="currentColor" strokeWidth="1.5"/></svg>;
}
export function Architecture({ compact = false }: {
    compact?: boolean;
}) {
 const t = useCopy();
    return <div className={`architecture${compact ? " architecture-compact" : ""}`} aria-label={t("TRACI connects field devices to intelligence, evidence and your platform")}>
    <div className="architecture-label"><span className="mono">{t("TRACI / SYSTEM OVERVIEW")}</span><span className="architecture-wordmark">traci<span>.</span></span></div>
    <div className="architecture-flow">
      <div className="architecture-node"><strong>{t("Devices")}</strong><span>{t("Cameras \u00B7 Sensors \u00B7 Gateways")}</span></div>
      <Connection />
      <div className="architecture-node core-node"><strong>{t("Intelligence")}</strong><span>{t("Events \u00B7 Rules \u00B7 Workflows")}</span></div>
      <Connection />
      <div className="architecture-node"><strong>{t("Evidence")}</strong><span>{t("Capture \u00B7 Review \u00B7 Reporting")}</span></div>
    </div>
    <div className="architecture-platform"><span>{t("YOUR PLATFORM")}</span><div>API <i /> MQTT <i /> Webhooks</div></div>
  </div>;
}
export function ServiceList({ full = false }: {
    full?: boolean;
}) {
 const t = useCopy();
    return <div className="service-list">{services.map(service => <article id={service.id} key={service.id} className="service-row"><span className="service-number mono">{service.number}</span><div><h3>{t(service.title)}</h3><p>{t(service.description)}</p>{full && <ul className="check-list">{service.items.map(item => <li key={item}><Check size={17} aria-hidden="true"/>{t(item)}</li>)}</ul>}</div><Link href={full ? `/contact?service=${encodeURIComponent(service.title)}` : `/services#${service.id}`} className="circle-link" aria-label={`${t(full ? "Discuss" : "Explore")} ${t(service.title)}`}><ArrowUpRight size={24} aria-hidden="true"/></Link></article>)}</div>;
}
export function ContactBand({ title = "Bring your next project into focus.", description = "Tell us what is happening on your site. We’ll help connect the pieces." }: {
    title?: string;
    description?: string;
}) {
 const t = useCopy();
    return <section className="contact-band"><div className="wrap contact-band-inner"><div><h2>{t(title)}</h2><p>{t(description)}</p></div><ActionLink href="/contact">{t("Let\u2019s talk")}</ActionLink></div></section>;
}
export function SiteFooter() {
 const t = useCopy();
    return <footer className="site-footer"><div className="wrap"><div className="footer-top"><div className="footer-brand"><Brand inverse/><p>{t("Embedded intelligence")}<br />{t("for the built world.")}</p></div><div className="footer-nav"><h2>{t("Explore")}</h2>{navigation.slice(0, 4).map(item => <Link key={item.href} href={item.href}>{t(item.label)}</Link>)}</div><div className="footer-nav"><h2>{t("Connect")}</h2>{navigation.slice(4).map(item => <Link key={item.href} href={item.href}>{t(item.label)}</Link>)}<Link href="/contact">{t("Let\u2019s talk")}</Link></div><div className="footer-statement"><span className="mono">{t("FIELD TO PLATFORM")}</span><p>{t("Practical systems.")}<br />{t("Connected operations.")}</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()}{t(" Embuilded Intelligence Limited")}</span><span>{t("Devices. Intelligence. Evidence.")}</span></div></div></footer>;
}
