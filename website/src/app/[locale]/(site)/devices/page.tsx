import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useCopy } from "@/i18n/copy";
import { pageMetadata } from "@/lib/metadata";
import { Catalog } from "@/components/catalog";
import { ContactBand, PageIntro } from "@/components/shared";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {const {locale}=await params; setRequestLocale(locale); return pageMetadata("/devices", "Connected devices", "Cameras, sensors, gateways, gas systems, HookCam and RFID field systems with engineering and integration support.");}
export default function DevicesPage({params}: {params: Promise<{locale: string}>}) {
 const {locale}=use(params); setRequestLocale(locale);
 const t = useCopy(); return <><PageIntro scene="industrial" label={t("DEVICES")} title={<>{t("Hardware is the start.")}<br />{t("Integration makes it work.")}</>} description={t("Cameras, sensors, gateways and related field systems, supported by engineering from deployment to commissioning.")}/><Catalog kind="devices"/><section className="page-panel"><div className="wrap"><h2>{t("The right device for the right conditions.")}</h2><p className="note">{t("This is a guide to our device categories. Specific models, technical specifications and suitability are confirmed against your site requirements.")}</p></div></section><ContactBand title={t("Let\u2019s connect the right hardware.")}/></>; }
