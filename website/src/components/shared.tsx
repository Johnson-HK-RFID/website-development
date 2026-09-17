import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import { navigation, services } from "@/content/site";
import { Brand } from "./site-header";

export function ActionLink({ href, children, secondary = false, light = false }: { href: string; children: ReactNode; secondary?: boolean; light?: boolean }) {
  return <Link className={`button${secondary ? " button-secondary" : ""}${light ? " button-light" : ""}`} href={href}>{children}<ArrowUpRight size={19} aria-hidden="true" /></Link>;
}
export function TextLink({ href, children }: { href: string; children: ReactNode }) { return <Link href={href} className="text-link">{children}<ArrowRight size={18} aria-hidden="true" /></Link>; }

export function PageIntro({ label, title, description, children }: { label: string; title: ReactNode; description: string; children?: ReactNode }) {
  return <section className="page-intro wrap"><div className="eyebrow">{label}</div><h1>{title}</h1><p>{description}</p>{children && <div className="intro-actions">{children}</div>}</section>;
}

export function ConceptImage({ className = "", priority = false, caption = true }: { className?: string; priority?: boolean; caption?: boolean }) {
  return <figure className={`concept-image ${className}`}><div className="concept-image-frame"><Image src="/images/built-world-concept.webp" alt="Architectural concept of concrete structures and a tower crane overlooking a coastal city" fill sizes={priority ? "(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) calc(100vw - 80px), (max-width: 1431px) calc(100vw - 112px), 1320px" : "(max-width: 767px) calc(100vw - 48px), 50vw"} loading="eager" fetchPriority={priority ? "high" : undefined} /></div>{caption && <figcaption>Architectural concept</figcaption>}</figure>;
}

function Connection() {
  return <svg className="architecture-connector" viewBox="0 0 64 12" fill="none" aria-hidden="true"><path d="M0 6H61M56 1L61 6L56 11" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export function Architecture({ compact = false }: { compact?: boolean }) {
  return <div className={`architecture${compact ? " architecture-compact" : ""}`} aria-label="TRACI connects field devices to intelligence, evidence and your platform">
    <div className="architecture-label"><span className="mono">TRACI / SYSTEM OVERVIEW</span><span className="architecture-wordmark">traci<span>.</span></span></div>
    <div className="architecture-flow">
      <div className="architecture-node"><strong>Devices</strong><span>Cameras · Sensors · Gateways</span></div>
      <Connection />
      <div className="architecture-node core-node"><strong>Intelligence</strong><span>Events · Rules · Workflows</span></div>
      <Connection />
      <div className="architecture-node"><strong>Evidence</strong><span>Capture · Review · Reporting</span></div>
    </div>
    <div className="architecture-platform"><span>YOUR PLATFORM</span><div>API <i /> MQTT <i /> Webhooks</div></div>
  </div>;
}

export function ServiceList({ full = false }: { full?: boolean }) {
  return <div className="service-list">{services.map(service => <article id={service.id} key={service.id} className="service-row"><span className="service-number mono">{service.number}</span><div><h3>{service.title}</h3><p>{service.description}</p>{full && <ul className="check-list">{service.items.map(item => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul>}</div><Link href={full ? `/contact?service=${encodeURIComponent(service.title)}` : `/services#${service.id}`} className="circle-link" aria-label={`${full ? "Discuss" : "Explore"} ${service.title}`}><ArrowUpRight size={24} aria-hidden="true" /></Link></article>)}</div>;
}

export function ContactBand({ title = "Bring your next project into focus.", description = "Tell us what is happening on your site. We’ll help connect the pieces." }: { title?: string; description?: string }) {
  return <section className="contact-band"><div className="wrap contact-band-inner"><div><h2>{title}</h2><p>{description}</p></div><ActionLink href="/contact">Let’s talk</ActionLink></div></section>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="wrap"><div className="footer-top"><div className="footer-brand"><Brand inverse /><p>Embedded intelligence<br />for the built world.</p></div><div className="footer-nav"><h2>Explore</h2>{navigation.slice(0, 4).map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div><div className="footer-nav"><h2>Connect</h2>{navigation.slice(4).map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href="/contact">Let’s talk</Link></div><div className="footer-statement"><span className="mono">FIELD TO PLATFORM</span><p>Practical systems.<br />Connected operations.</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Embuilded Intelligence Limited</span><span>Devices. Intelligence. Evidence.</span></div></div></footer>;
}
