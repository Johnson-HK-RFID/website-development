import { useCopy } from "@/i18n/copy";
import Image from "next/image";
import { photography, photographyLicense } from "@/content/photography";
/** Compact photos sit inside named navigation links; full photos include source credits. */
export function IndustryPhoto({ industry, compact = false }: {
    industry: string;
    compact?: boolean;
}) {
 const t = useCopy();
    const photo = photography[industry];
    if (!photo)
        return null;
    const picture = <div className="industry-photo-frame" data-reveal><Image src={photo.src} alt={compact ? "" : t(photo.alt)} fill sizes={compact ? "(max-width: 767px) calc((100vw - 68px) / 2), (max-width: 1199px) calc((100vw - 110px) / 2), 310px" : "(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) 50vw, 600px"} style={{ objectPosition: photo.position }}/></div>;
    if (compact)
        return picture;
    return <figure className="industry-photo" data-industry-photo={industry}>
    {picture}
    <figcaption><span>{t("Illustrative industry scene")}</span><span>{t("Photo:")} <a href={photo.source}>{photo.author}</a> · <a href={photographyLicense}>CC0</a></span></figcaption>
  </figure>;
}
