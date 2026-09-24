import Image from "next/image";
import { useCopy } from "@/i18n/copy";

export const fieldScenes = {
  tower: { file: "tower", alt: "Tower crane above the exposed concrete floors of a building under construction" },
  buildings: { file: "buildings", alt: "Tower cranes and residential buildings under construction in evening light" },
  crew: { file: "hong-kong-workers", alt: "Construction team working across bamboo scaffolding on a Hong Kong building facade" },
  site: { file: "hong-kong-site", alt: "Active Hong Kong building site with tower cranes and residential towers" },
};

export function FieldPhoto({ scene, priority = false, className = "" }: { scene: keyof typeof fieldScenes; priority?: boolean; className?: string }) {
  const t = useCopy(); const photo = fieldScenes[scene];
  return <figure className={`field-photo ${className}`} data-field-media>
    <div className="field-photo-frame" {...(!priority ? { "data-reveal": true } : {})}>
      <Image src={`/images/field/${photo.file}.webp`} alt={t(photo.alt)} fill sizes="(max-width: 767px) 100vw, 60vw" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined}/>
    </div>
  </figure>;
}
