"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MagnifyingGlass, Camera, Cpu, Network, Tag, User } from "@phosphor-icons/react";
import { solutions, solutionCategories, devices } from "@/content/site";

export function Catalog({ kind }: { kind: "solutions" | "devices" }) {
  const isSolutions = kind === "solutions";
  const allLabel = isSolutions ? "All solutions" : "All devices";
  const categories = isSolutions ? solutionCategories : [allLabel, ...new Set(devices.map(device => device.category))];
  const [category, setCategory] = useState(allLabel);
  const [query, setQuery] = useState("");
  const records = isSolutions ? solutions : devices;
  const matching = records.filter(item => (category === allLabel || item.category === category) && `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(query.trim().toLowerCase()));
  const icons = { camera: Camera, sensor: Cpu, network: Network, tag: Tag, worker: User };
  return <div className="catalog wrap">
    <div className="catalog-toolbar"><div className="filter-group" role="group" aria-label={`Filter ${kind}`}>{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-field"><span className="sr-only">Search {kind}</span><MagnifyingGlass size={17} aria-hidden="true" /><input type="search" value={query} placeholder={`Search ${kind}`} onChange={event => setQuery(event.target.value)} /></label></div>
    <p className="result-count" aria-live="polite">{matching.length} {isSolutions ? (matching.length === 1 ? "solution" : "solutions") : (matching.length === 1 ? "device category" : "device categories")}</p>
    {matching.length > 0 ? <div className={isSolutions ? "solution-grid" : "device-grid"}>{matching.map(item => {
      if ("slug" in item) return <Link className="solution-card" href={`/solutions/${item.slug}`} key={item.slug}><div className="solution-card-header"><span className="solution-card-number" aria-hidden="true">{item.number}</span><span className="mono">{item.category}</span></div><div className="solution-card-body"><h2>{item.title}</h2><p>{item.description}</p><span className="card-link">Explore solution<ArrowUpRight size={20} aria-hidden="true" /></span></div></Link>;
      const Icon = icons[item.icon as keyof typeof icons] ?? Cpu;
      return <article className="device-card" key={item.title}><div className="device-icon"><Icon size={51} weight="light" aria-hidden="true" /><span className="mono">{item.category}</span></div><h2>{item.title}</h2><p>{item.description}</p><Link href={`/solutions/${item.solution}`} className="card-link">Explore application<ArrowUpRight size={20} aria-hidden="true" /></Link></article>;
    })}</div> : <div className="empty-results"><h2>No matches yet.</h2><p>Try a different search or explore all {kind}.</p><button className="button button-secondary" onClick={() => { setCategory(allLabel); setQuery(""); }}>Reset filters<ArrowUpRight size={18} aria-hidden="true" /></button></div>}
  </div>;
}
