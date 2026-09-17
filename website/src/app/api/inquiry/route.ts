import { deliveryConfigured, deliverInquiry, validateInquiry } from "@/lib/inquiry";

export const runtime = "nodejs";
const MAX_BODY = 16000;
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowed = new Set([new URL(request.url).origin]);
  try { if (process.env.SITE_URL) allowed.add(new URL(process.env.SITE_URL).origin); } catch { /* An invalid optional origin does not expand access. */ }
  if (origin && !allowed.has(origin)) return Response.json({ message: "This request could not be verified." }, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return Response.json({ message: "Use a JSON request." }, { status: 415 });
  if (Number(request.headers.get("content-length")) > MAX_BODY) return Response.json({ message: "Your request is too long." }, { status: 413 });
  let input: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return Response.json({ message: "Please include your project details." }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) { await reader.cancel(); return Response.json({ message: "Your request is too long." }, { status: 413 }); }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return Response.json({ message: "Please check your project details." }, { status: 400 }); }
  const result = validateInquiry(input);
  if (!result.ok) return Response.json({ message: "Please check the highlighted fields.", errors: result.errors }, { status: 400 });
  if (!deliveryConfigured()) return Response.json({ message: "Message delivery is currently unavailable. Download your project brief to keep a copy." }, { status: 503 });
  const delivered = await deliverInquiry(result.value, process.env.CONTACT_WEBHOOK_URL!, process.env.CONTACT_WEBHOOK_TOKEN!);
  if (!delivered) return Response.json({ message: "Your message could not be delivered. Please try again, or download your project brief." }, { status: 502 });
  return Response.json({ message: "Your project inquiry has been received. Thank you for getting in touch." });
}
