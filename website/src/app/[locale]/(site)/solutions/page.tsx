import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useCopy } from "@/i18n/copy";
import { pageMetadata } from "@/lib/metadata";
import { Catalog } from "@/components/catalog";
import { ContactBand, PageIntro } from "@/components/shared";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {const {locale}=await params; setRequestLocale(locale); return pageMetadata("/solutions", "Connected solutions", "Explore Gas Monitoring, HookCam, Outrigger Monitoring, Worker Tracking, Site Vision and RFID / Asset Tracking.");}
export default function SolutionsPage({params}: {params: Promise<{locale: string}>}) {
 const {locale}=use(params); setRequestLocale(locale);
 const t = useCopy(); return <><PageIntro label={t("SOLUTIONS")} title={<>{t("Start with your site.")}<br />{t("Connect what matters.")}</>} description={t("Practical combinations of field devices, engineering and TRACI capabilities, shaped around the environment you work in.")}/><Catalog kind="solutions"/><ContactBand title={t("Have a different challenge?")} description={t("Start with your requirements. We\u2019ll help shape the right approach.")}/></>; }
