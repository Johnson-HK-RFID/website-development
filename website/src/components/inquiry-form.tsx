"use client";
import { useCopy } from "@/i18n/copy";
import { useLocale } from "next-intl";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, DownloadSimple } from "@phosphor-icons/react";
import { inquiryServices, projectBrief, validateInquiry, type InquiryErrors } from "@/lib/inquiry";
export function InquiryForm({ initialService, canSend }: {
    initialService: string;
    canSend: boolean;
}) {
 const t = useCopy();
 const locale = useLocale();
    const formRef = useRef<HTMLFormElement>(null);
    const [errors, setErrors] = useState<InquiryErrors>({});
    const [status, setStatus] = useState<{
        message: string;
        error: boolean;
    } | null>(null);
    const [pending, setPending] = useState(false);
    async function processForm(mode: "send" | "download") {
        if (!formRef.current)
            return;
        setStatus(null);
        const data = new FormData(formRef.current);
        const input = Object.fromEntries(data.entries());
        const result = validateInquiry({ ...input, consent: data.get("consent") === "on" }, mode === "send");
        if (!result.ok) {
            setErrors(result.errors);
            const firstKey = Object.keys(result.errors)[0];
            const field = formRef.current.elements.namedItem(firstKey);
            if (field instanceof HTMLElement)
                field.focus();
            return;
        }
        setErrors({});
        if (mode === "download") {
            const url = URL.createObjectURL(new Blob([projectBrief({ ...result.value, service: t(result.value.service) }, locale)], { type: "text/plain;charset=utf-8" }));
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "embuilded-project-brief.txt";
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            setStatus({ message: "Your project brief has been downloaded. It has not been sent to Embuilded.", error: false });
            return;
        }
        setPending(true);
        try {
            const response = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(result.value), signal: AbortSignal.timeout(12000) });
            const body = await response.json();
            if (!response.ok) {
                if (body.errors)
                    setErrors(body.errors);
                setStatus({ message: body.message ?? "Your message could not be delivered. Please try again.", error: true });
            }
            else {
                setStatus({ message: body.message, error: false });
                formRef.current?.reset();
            }
        }
        catch {
            setStatus({ message: "We couldn’t connect. Your details are still here; try again or download your brief.", error: true });
        }
        finally {
            setPending(false);
        }
    }
    function onSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); void processForm(canSend ? "send" : "download"); }
    const fieldError = (name: keyof InquiryErrors) => errors[name] ? <span id={`${name}-error`} className="field-error">{t(errors[name])}</span> : null;
    const describedBy = (name: keyof InquiryErrors) => errors[name] ? `${name}-error` : undefined;
    return <form ref={formRef} className="inquiry-form" noValidate onSubmit={onSubmit} aria-label={t("Project inquiry")}>
    <div className="form-grid">
      <div className="form-field"><label htmlFor="name">{t("Your name")}</label><input id="name" name="name" autoComplete="name" required maxLength={100} placeholder={t("Full name")} aria-invalid={!!errors.name} aria-describedby={describedBy("name")}/>{fieldError("name")}</div>
      <div className="form-field"><label htmlFor="email">{t("Work email")}</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder={t("you@company.com")} aria-invalid={!!errors.email} aria-describedby={describedBy("email")}/>{fieldError("email")}</div>
      <div className="form-field"><label htmlFor="company">{t("Company / organisation")}</label><input id="company" name="company" autoComplete="organization" required maxLength={150} placeholder={t("Company name")} aria-invalid={!!errors.company} aria-describedby={describedBy("company")}/>{fieldError("company")}</div>
      <div className="form-field"><label htmlFor="service">{t("Area of interest")}</label><select id="service" name="service" defaultValue={initialService} aria-invalid={!!errors.service} aria-describedby={describedBy("service")}>{inquiryServices.map(service => <option key={service} value={service}>{t(service)}</option>)}</select>{fieldError("service")}</div>
      <div className="form-field form-field-wide"><label htmlFor="message">{t("Tell us about your project")}</label><textarea id="message" name="message" required minLength={20} maxLength={5000} placeholder={t("Your site, the challenge, existing systems and the support you need.")} aria-invalid={!!errors.message} aria-describedby={describedBy("message")}/>{fieldError("message")}</div>
    </div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">{t("Website")}</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
    {canSend && <><label className="form-consent"><input name="consent" type="checkbox" aria-invalid={!!errors.consent} aria-describedby={describedBy("consent")}/><span>{t("I agree that Embuilded may use these details to respond to this inquiry.")}</span></label>{fieldError("consent")}</>}
    {fieldError("form")}
    <div className="form-actions"><button className="button" type="submit" disabled={pending}>{t(pending ? "Sending your inquiry…" : canSend ? "Send inquiry" : "Download project brief")}{canSend ? <ArrowUpRight size={19} aria-hidden="true"/> : <DownloadSimple size={19} aria-hidden="true"/>}</button>{canSend && <button className="button button-secondary" type="button" disabled={pending} onClick={() => void processForm("download")}>{t("Download a copy")}<DownloadSimple size={18} aria-hidden="true"/></button>}</div>
    <p className="form-privacy">{t(canSend ? "When you send an inquiry, these details are shared with Embuilded to respond to your project. Only include information needed for the initial discussion." : "Your details stay in this browser until you download your brief. Downloading saves a copy to your device; it does not send an inquiry.")}</p>
    {status && <div role={status.error ? "alert" : "status"} className={`form-status${status.error ? " form-status-error" : ""}`}>{t(status.message)}</div>}
  </form>;
}
