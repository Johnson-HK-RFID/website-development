import { plugins, services, solutions } from "../content/site.ts";

export const inquiryServices = ["General project", ...services.map(service => service.title), "TRACI platform", ...plugins, ...solutions.map(solution => solution.title), "Partnership"];
export type Inquiry = { name: string; email: string; company: string; service: string; message: string; consent: boolean };
export type InquiryErrors = Partial<Record<keyof Inquiry | "form", string>>;
export type ValidationResult = { ok: true; value: Inquiry } | { ok: false; errors: InquiryErrors };

export function validateInquiry(input: unknown, requireConsent = true): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false, errors: { form: "Please check your project details." } };
  const value = input as Record<string, unknown>;
  const errors: InquiryErrors = {};
  const text = (key: string) => typeof value[key] === "string" ? value[key].trim() : "";
  const result: Inquiry = { name: text("name"), email: text("email"), company: text("company"), service: text("service"), message: text("message"), consent: value.consent === true };
  if (result.name.length < 2 || result.name.length > 100) errors.name = "Enter your name (2-100 characters).";
  if (result.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) errors.email = "Enter a valid email address.";
  if (!result.company || result.company.length > 150) errors.company = "Enter your company or organisation (up to 150 characters).";
  if (!inquiryServices.includes(result.service)) errors.service = "Choose a service or solution.";
  if (result.message.length < 20 || result.message.length > 5000) errors.message = "Describe your project in 20-5,000 characters.";
  if (requireConsent && !result.consent) errors.consent = "Confirm that we may use these details to respond.";
  if (text("website")) errors.form = "We couldn’t process this request.";
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value: result };
}

export function projectBrief(inquiry: Inquiry) {
  return ["EMBUILDED | PROJECT BRIEF", "", `Name: ${inquiry.name}`, `Email: ${inquiry.email}`, `Company: ${inquiry.company}`, `Area of interest: ${inquiry.service}`, "", "PROJECT REQUIREMENTS", inquiry.message, "", "This is a downloaded project brief. It has not been sent to Embuilded."].join("\n");
}

export function deliveryConfigured() {
  try { return new URL(process.env.CONTACT_WEBHOOK_URL ?? "").protocol === "https:" && !!process.env.CONTACT_WEBHOOK_TOKEN?.trim(); } catch { return false; }
}

export async function deliverInquiry(inquiry: Inquiry, endpoint: string, token: string, send: typeof fetch = fetch): Promise<boolean> {
  if (!token.trim()) return false;
  try {
    if (new URL(endpoint).protocol !== "https:") return false;
    const response = await send(endpoint, {
      method: "POST", redirect: "error", signal: AbortSignal.timeout(8000),
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...inquiry, source: "embuilded-website", submittedAt: new Date().toISOString() })
    });
    return response.ok;
  } catch { return false; }
}
