import { pageMetadata } from "@/lib/metadata";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { PageIntro } from "@/components/shared";
import { InquiryForm } from "@/components/inquiry-form";
import { deliveryConfigured, inquiryServices } from "@/lib/inquiry";

export const metadata = pageMetadata("/contact", "Let’s talk", "Outline your site, operational challenge and integration requirements in an Embuilded project brief.");
export const dynamic = "force-dynamic";
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const initialService = inquiryServices.includes(service ?? "") ? service! : "General project";
  const canSend = deliveryConfigured();
  const email = process.env.CONTACT_EMAIL;
  const validEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
  return <><PageIntro label="LET’S TALK" title={<>Every connection starts<br />with a conversation.</>} description={canSend ? "Tell us about your environment, the challenge and the systems you already use. Let’s explore where Embuilded can help." : "Prepare a project brief with your site requirements, existing systems and the support you need. Download a copy to share when you’re ready."} /><section className="wrap contact-layout"><aside className="contact-aside"><h2>Start with your site.</h2><p>A useful first brief gives us the context to have a practical discussion.</p><ul className="check-list">{["The environment and operating challenge", "Existing devices and platforms", "Engineering or integration support", "Your project scope and timing"].map(item => <li key={item}><Check size={18} aria-hidden="true" />{item}</li>)}</ul>{validEmail && <p><a href={`mailto:${validEmail}`}>{validEmail}</a></p>}<div className="contact-aside-note"><h2>Already have a platform?</h2><p>Tell us where you need support in the field. We can discuss engineering, connected hardware or managed device services.</p></div></aside><InquiryForm canSend={canSend} initialService={initialService} /></section></>;
}
