import Image from "next/image";
import { useCopy } from "@/i18n/copy";

export const fieldScenes = {
  tower: { author: "Audrey Walsh", source: "https://www.pexels.com/photo/construction-site-with-big-tower-crane-7121536/", alt: "Tower crane above the exposed concrete floors of a building under construction" },
  buildings: { author: "Ilya", source: "https://www.pexels.com/photo/crane-on-a-building-5027559/", alt: "Tower cranes and residential buildings under construction in evening light" },
  crew: { author: "This Viktọ", source: "https://www.pexels.com/video/men-working-on-construction-site-10810476/", alt: "Workers in hard hats assembling steel reinforcement on a concrete building floor" },
};

export function FieldPhoto({ scene, priority = false, className = "" }: { scene: keyof typeof fieldScenes; priority?: boolean; className?: string }) {
  const t = useCopy(); const photo = fieldScenes[scene];
  return <figure className={`field-photo ${className}`} data-field-media>
    <div className="field-photo-frame" {...(!priority ? { "data-reveal": true } : {})}>
      <Image src={`/images/field/${scene}.webp`} alt={t(photo.alt)} fill sizes="(max-width: 767px) 100vw, 60vw" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined}/>
    </div>
    <figcaption>{t("Illustrative construction scene")} · <a href={photo.source}>{photo.author}</a> / <a href="https://www.pexels.com/license/">Pexels</a></figcaption>
  </figure>;
}
