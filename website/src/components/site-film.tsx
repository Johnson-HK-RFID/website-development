"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Play, ArrowClockwise } from "@phosphor-icons/react";
import { useCopy } from "@/i18n/copy";

const subscribe = () => () => {};

/** Explicit playback keeps the initial page free of video requests and autoplay. */
export function SiteFilm() {
  const t = useCopy();
  const enhanced = useSyncExternalStore(subscribe, () => true, () => false);
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const play = async () => {
    const element = video.current;
    if (!element) return;
    setFailed(false);
    element.src = "/media/construction-crew.mp4";
    setStarted(true);
    try { await element.play(); element.focus(); } catch { setFailed(true); setStarted(false); }
  };
  return <figure className="site-film" data-field-media>
    <div className="film-stage" data-reveal>
      <video ref={video} controls={started} playsInline preload="none" tabIndex={started ? 0 : -1} aria-label={t("Construction film: workers assembling steel reinforcement. Silent, 18 seconds.")} poster="/images/field/crew.webp" onError={() => { setFailed(true); setStarted(false); }} hidden={!started}/>
      {!started && <Image src="/images/field/crew.webp" alt={t("Workers in hard hats assembling steel reinforcement on a concrete building floor")} fill sizes="(max-width: 767px) 100vw, 90vw"/>}
      {enhanced && !started && <button className="film-play" onClick={play}>{failed ? <ArrowClockwise size={24} aria-hidden/> : <Play size={24} weight="fill" aria-hidden/>}<span>{t(failed ? "Retry film" : "Watch the site film")}<small>{t("18 seconds · No sound")}</small></span></button>}
    </div>
    <figcaption><span>{t("Illustrative construction scene")} · <a href="https://www.pexels.com/video/men-working-on-construction-site-10810476/">This Viktọ</a> / <a href="https://www.pexels.com/license/">Pexels</a></span><span>{t("Workers assemble reinforcement for a concrete building. Stock footage, not an Embuilded project.")}</span></figcaption>
    {failed && <p role="status">{t("The film could not load. Please try again.")}</p>}
    <noscript><p>{t("Enable JavaScript to play the film. The scene is shown above.")}</p></noscript>
  </figure>;
}
