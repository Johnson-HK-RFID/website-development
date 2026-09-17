"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { navigation } from "@/content/site";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return <Link href="/" className={`brand${inverse ? " brand-inverse" : ""}`} aria-label="Embuilded home"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>embuilded<span className="brand-period">.</span></span></Link>;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) { setOpen(false); trigger.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return <header className="site-header">
    <div className="header-inner">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined}>{item.label}</Link>)}
      </nav>
      <Link href="/contact" className="header-contact">Let’s talk <ArrowUpRight size={17} aria-hidden="true" /></Link>
      <button ref={trigger} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={24} /> : <List size={24} />}</button>
    </div>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation"><Link href="/" onClick={() => setOpen(false)}>Home</Link>{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={18} aria-hidden="true" /></Link>)}<Link href="/contact" onClick={() => setOpen(false)}>Let’s talk<ArrowUpRight size={18} aria-hidden="true" /></Link></nav>}
  </header>;
}
