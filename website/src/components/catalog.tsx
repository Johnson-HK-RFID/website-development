"use client";
import { useCopy } from "@/i18n/copy";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, MagnifyingGlass, SecurityCamera, Circuitry, Network, Barcode, IdentificationBadge } from "@phosphor-icons/react";
import { solutions, solutionCategories, devices } from "@/content/site";
export function Catalog({ kind }: {
    kind: "solutions" | "devices";
}) {
 const t = useCopy();
    const isSolutions = kind === "solutions";
    const allLabel = isSolutions ? "All solutions" : "All devices";
    const categories = isSolutions ? solutionCategories : [allLabel, ...new Set(devices.map(device => device.category))];
    const [category, setCategory] = useState(allLabel);
    const [query, setQuery] = useState("");
    const records = isSolutions ? solutions : devices;
    const matching = records.filter(item => (category === allLabel || item.category === category) && `${item.title} ${item.description} ${item.category} ${t(item.title)} ${t(item.description)} ${t(item.category)}`.toLowerCase().includes(query.trim().toLowerCase()));
    const icons = { camera: SecurityCamera, sensor: Circuitry, network: Network, tag: Barcode, worker: IdentificationBadge };
    const solutionImages: Record<string, { src: string; position: string }> = {
      "gas-monitoring": { src: "/images/field/hong-kong-site.webp", position: "58% 64%" },
      hookcam: { src: "/images/field/tower.webp", position: "50% 42%" },
      "outrigger-monitoring": { src: "/images/industries/construction.webp", position: "66% 35%" },
      "worker-tracking": { src: "/images/field/hong-kong-workers.webp", position: "50% 24%" },
      "site-vision": { src: "/images/field/buildings.webp", position: "50% 58%" },
      "rfid-asset-tracking": { src: "/images/industries/infrastructure.webp", position: "48% 28%" },
    };
    return <div className="catalog wrap">
    <div className="catalog-toolbar"><div className="filter-group" role="group" aria-label={t(`Filter ${kind}`)}>{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{t(item)}</button>)}</div><label className="search-field"><span className="sr-only">{t(`Search ${kind}`)}</span><MagnifyingGlass size={17} aria-hidden="true"/><input type="search" value={query} placeholder={t(`Search ${kind}`)} onChange={event => setQuery(event.target.value)}/></label></div>
    <p className="result-count" aria-live="polite">{matching.length} {t(isSolutions ? (matching.length === 1 ? "solution" : "solutions") : (matching.length === 1 ? "device category" : "device categories"))}</p>
    {matching.length > 0 ? <div className={isSolutions ? "solution-grid" : "device-grid"}>{matching.map(item => {
                if ("slug" in item)
                    return <Link className="solution-card" href={`/solutions/${item.slug}`} key={item.slug}><div className="solution-card-header"><span className="solution-card-number" aria-hidden="true">{item.number}</span><span className="mono">{t(item.category)}</span></div><div className="solution-card-body"><h2>{t(item.title)}</h2><p>{t(item.description)}</p><span className="card-link">{t("Explore solution")}<ArrowUpRight size={20} aria-hidden="true"/></span></div><div className="solution-card-media" aria-hidden="true"><Image src={solutionImages[item.slug].src} alt="" fill sizes="(max-width: 767px) 100vw, 22vw" style={{ objectPosition: solutionImages[item.slug].position }}/></div></Link>;
                const Icon = icons[item.icon as keyof typeof icons] ?? Circuitry;
                return <article className="device-card" key={item.title}><div className="device-icon"><Icon size={24} weight="regular" aria-hidden="true"/><span className="mono">{t(item.category)}</span></div><h2>{t(item.title)}</h2><p>{t(item.description)}</p><Link href={`/solutions/${item.solution}`} className="card-link">{t("Explore application")}<ArrowUpRight size={18} aria-hidden="true"/></Link></article>;
            })}</div> : <div className="empty-results"><h2>{t("No matches yet.")}</h2><p>{t(`Try a different search or explore all ${kind}.`)}</p><button className="button button-secondary" onClick={() => { setCategory(allLabel); setQuery(""); }}>{t("Reset filters")}<ArrowUpRight size={18} aria-hidden="true"/></button></div>}
  </div>;
}
