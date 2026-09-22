"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content is visible in the server HTML and without JavaScript. */
export function EngineeringMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window) || !Element.prototype.animate) return;
    const animations = new Set<Animation>();
    const animate = (element: Element, frames: Keyframe[], delay = 0, duration = 480) => {
      const animation = element.animate(frames, { duration, delay, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (preference.matches) continue;
        if (entry.target.matches(".architecture")) {
          // Draw the two existing connections once, in reading order; never imply live telemetry.
          entry.target.querySelectorAll<SVGPathElement>(".architecture-connector path").forEach((path, index) => {
            const length = path.getTotalLength();
            animate(path, [{ strokeDasharray: `${length}`, strokeDashoffset: length }, { strokeDasharray: `${length}`, strokeDashoffset: 0 }], index * 220, 620);
          });
        } else {
          const revealItems = entry.target.parentElement ? [...entry.target.parentElement.children].filter(element => element.matches(".home-solution, .service-row, .industry-links > a, .process-grid > article, .solution-card, .device-card")) : [];
          const index = revealItems.indexOf(entry.target);
          const delay = index < 0 ? 0 : Math.min(index * 65, 260);
          const distance = entry.target.matches(".section-heading") ? 24 : 14;
          animate(entry.target, [{ opacity: .18, transform: `translateY(${distance}px)` }, { opacity: 1, transform: "translateY(0)" }], delay, entry.target.matches(".section-heading") ? 680 : 520);
        }
      }
    }, { threshold: .15 });
    document.querySelectorAll("[data-reveal], .architecture, .section-heading, .service-row, .home-solution, .industry-links > a, .process-grid > article, .solution-card, .device-card").forEach(element => observer.observe(element));
    const progress = document.querySelector<HTMLElement>("[data-scroll-progress]");
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      if (!progress) return;
      const available = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${available > 0 ? Math.min(scrollY / available, 1) : 0})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
    updateProgress();
    addEventListener("scroll", onScroll, { passive: true });
    const cancel = () => { animations.forEach(animation => animation.cancel()); animations.clear(); };
    const onPreference = () => { if (preference.matches) cancel(); };
    preference.addEventListener("change", onPreference);
    return () => { observer.disconnect(); cancel(); preference.removeEventListener("change", onPreference); removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, [pathname]);
  return null;
}
