import Image from "next/image";
import { useCopy } from "@/i18n/copy";

const images = [
  { file: "hong-kong-site", author: "José Alan Galant", source: "https://www.pexels.com/photo/construction-site-in-city-14192787/", alt: "Active Hong Kong building site with tower cranes and residential towers" },
  { file: "hong-kong-workers", author: "Fu Shan Un", source: "https://www.pexels.com/photo/building-facade-with-bamboo-scaffolding-14101358/", alt: "Construction team working across bamboo scaffolding on a Hong Kong building facade" },
  { file: "hong-kong-crane", author: "King Ho", source: "https://www.pexels.com/photo/construction-crane-towering-over-building-13031842/", alt: "Tower crane and a high-rise building under construction in Hong Kong" },
];

export function FieldGallery() {
  const t = useCopy();
  return <div className="field-gallery" aria-label={t("Hong Kong field scenes")}>
    {images.map((image, index) => <figure className={`field-gallery-item field-gallery-item-${index + 1}`} data-field-media key={image.file}>
      <div className="field-gallery-frame" data-reveal>
        <Image src={`/images/field/${image.file}.webp`} alt={t(image.alt)} fill sizes="(max-width: 767px) 88vw, 40vw"/>
        <span className="field-gallery-index mono">0{index + 1}</span>
      </div>
      <figcaption>{t("Hong Kong construction scene")} · <a href={image.source}>{image.author}</a> / <a href="https://www.pexels.com/license/">Pexels</a></figcaption>
    </figure>)}
  </div>;
}
