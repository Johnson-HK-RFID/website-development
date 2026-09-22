"use client";

import Image from "next/image";
import { Pause, Play } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useCopy } from "@/i18n/copy";

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

/** Autoplays only when motion and data-saving preferences permit it; the poster is always present. */
export function SiteFilm() {
  const t = useCopy();
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);

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
    void video.current?.play().catch(() => setPlaying(false));
  }, [enabled]);

  const toggle = () => {
    const element = video.current;
    if (!element) return;
    if (element.paused) void element.play(); else element.pause();
  };

  return <figure className="site-film hero-film" data-field-media>
    <div className="film-stage">
      <Image src="/images/field/timelapse.webp" alt="" fill priority sizes="100vw"/>
      {enabled && <video ref={video} autoPlay muted loop playsInline preload="auto" poster="/images/field/timelapse.webp" aria-hidden="true" tabIndex={-1} onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)}>
        <source src="/media/construction-timelapse.mp4" type="video/mp4"/>
      </video>}
      {enabled && <button className="film-control" type="button" onClick={toggle} aria-label={t(playing ? "Pause construction timelapse" : "Play construction timelapse")}>
        {playing ? <Pause size={16} weight="fill" aria-hidden="true"/> : <Play size={16} weight="fill" aria-hidden="true"/>}
        <span>{t(playing ? "Pause film" : "Play film")}</span>
      </button>}
    </div>
    <figcaption>{t("Illustrative Hong Kong construction timelapse")} · <a href="https://www.pexels.com/video/time-lapse-video-of-a-construction-site-5698648/">Site Engine</a> / <a href="https://www.pexels.com/license/">Pexels</a></figcaption>
  </figure>;
}
