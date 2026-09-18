"use client";
import { useCopy } from "@/i18n/copy";

import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { navigation } from "@/content/site";
export function Brand({ inverse = false }: {
    inverse?: boolean;
}) {
 const t = useCopy();
    return <Link href="/" className={`brand${inverse ? " brand-inverse" : ""}`} aria-label={t("Embuilded home")}><svg className="brand-mark" viewBox="0 0 23 23" fill="currentColor" aria-hidden="true"><rect width="23" height="5"/><rect y="9" width="16.56" height="5"/><rect y="18" width="23" height="5"/></svg><span>embuilded<span className="brand-period">.</span></span></Link>;
}
export function SiteHeader() {
 const t = useCopy();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const trigger = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && open) {
                setOpen(false);
                trigger.current?.focus();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);
    return <header className="site-header">
    <div className="header-inner">
      <Brand />
      <nav className="desktop-nav" aria-label={t("Main navigation")}>
        {navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined}>{t(item.label)}</Link>)}
      </nav>
      <Link href="/contact" className="header-contact">{t("Let\u2019s talk ")}<ArrowUpRight size={17} aria-hidden="true"/></Link>
      <LanguageSwitcher />
      <button ref={trigger} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={t(open ? "Close navigation" : "Open navigation")} onClick={() => setOpen(!open)}>{open ? <X size={24}/> : <List size={24}/>}</button>
    </div>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label={t("Mobile navigation")}><Link href="/" onClick={() => setOpen(false)}>{t("Home")}</Link>{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined} onClick={() => setOpen(false)}>{t(item.label)}<ArrowUpRight size={18} aria-hidden="true"/></Link>)}<Link href="/contact" onClick={() => setOpen(false)}>{t("Let\u2019s talk")}<ArrowUpRight size={18} aria-hidden="true"/></Link></nav>}
  </header>;
}
