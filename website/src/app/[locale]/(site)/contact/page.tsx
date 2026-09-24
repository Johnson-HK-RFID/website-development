import { setRequestLocale } from "next-intl/server";
import { getCopy } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { PageIntro } from "@/components/shared";
import { InquiryForm } from "@/components/inquiry-form";
import { deliveryConfigured, inquiryServices } from "@/lib/inquiry";
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {const {locale}=await params; setRequestLocale(locale); return pageMetadata("/contact", "Let’s talk", "Outline your site, operational challenge and integration requirements in an Embuilded project brief.");}
export const dynamic = "force-dynamic";
export default async function ContactPage({ searchParams, params }: {
 params: Promise<{locale: string}>;
    searchParams: Promise<{
        service?: string;
    }>;
}) {
 const {locale}=await params; setRequestLocale(locale);
 const t = await getCopy();
    const { service } = await searchParams;
    const initialService = inquiryServices.includes(service ?? "") ? service! : "General project";
    const canSend = deliveryConfigured();
    const email = process.env.CONTACT_EMAIL;
    const validEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
    return <><PageIntro scene="crane" label={t("LET\u2019S TALK")} title={<>{t("Every connection starts")}<br />{t("with a conversation.")}</>} description={canSend ? "Tell us about your environment, the challenge and the systems you already use. Let’s explore where Embuilded can help." : "Prepare a project brief with your site requirements, existing systems and the support you need. Download a copy to share when you’re ready."}/><section className="wrap contact-layout"><aside className="contact-aside"><h2>{t("Start with your site.")}</h2><p>{t("A useful first brief gives us the context to have a practical discussion.")}</p><ul className="check-list">{["The environment and operating challenge", "Existing devices and platforms", "Engineering or integration support", "Your project scope and timing"].map(item => <li key={item}><Check size={18} aria-hidden="true"/>{t(item)}</li>)}</ul>{validEmail && <p><a href={`mailto:${validEmail}`}>{validEmail}</a></p>}<div className="contact-aside-note"><h2>{t("Already have a platform?")}</h2><p>{t("Tell us where you need support in the field. We can discuss engineering, connected hardware or managed device services.")}</p></div></aside><InquiryForm canSend={canSend} initialService={initialService}/></section></>;
}
