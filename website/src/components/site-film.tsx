"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCopy } from "@/i18n/copy";

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

/** Autoplays only when motion and data-saving preferences permit it; the poster is always present. */
export function SiteFilm() {
  const t = useCopy();
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as NavigatorWithConnection).connection;
    const update = () => setEnabled(!reduced.matches && !connection?.saveData);
    update();
    reduced.addEventListener("change", update);
    return () => reduced.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) { video.current?.pause(); return; }
    void video.current?.play().catch(() => undefined);
  }, [enabled]);

  return <figure className="site-film hero-film" data-field-media>
    <div className="film-stage">
      <Image src="/images/field/timelapse.webp" alt="" fill priority sizes="100vw"/>
      {enabled && <video ref={video} autoPlay muted loop playsInline preload="auto" poster="/images/field/timelapse.webp" aria-hidden="true" tabIndex={-1}>
        <source src="/media/construction-timelapse.mp4" type="video/mp4"/>
      </video>}
    </div>
    <figcaption>{t("Illustrative Hong Kong construction timelapse")} · <a href="https://www.pexels.com/video/time-lapse-video-of-a-construction-site-5698648/">Site Engine</a> / <a href="https://www.pexels.com/license/">Pexels</a></figcaption>
  </figure>;
}
