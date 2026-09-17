import { test } from "node:test";
import assert from "node:assert/strict";
import { validateInquiry, projectBrief, deliverInquiry } from "../src/lib/inquiry.ts";
const valid = { name:"Project Coordinator", email:"coordinator@example.com", company:"Example organisation", service:"Site Vision", message:"We need camera positioning and connectivity support for a new site.", consent:true };

test("valid inquiry is trimmed and contains only expected fields", () => { const result = validateInquiry({ ...valid, name:"  Project Coordinator  ", extra:"discard" }); assert.equal(result.ok,true); if(result.ok) { assert.equal(result.value.name, valid.name); assert.equal("extra" in result.value,false); } });
test("missing consent blocks sending but permits local brief download", () => { assert.equal(validateInquiry({ ...valid, consent:false }).ok,false); assert.equal(validateInquiry({ ...valid, consent:false },false).ok,true); });
test("invalid email, unknown service and short message have field errors", () => { const result = validateInquiry({ ...valid, email:"invalid", service:"invented", message:"short" }); assert.equal(result.ok,false); if(!result.ok) { assert.ok(result.errors.email); assert.ok(result.errors.service); assert.ok(result.errors.message); } });
test("malformed, oversized and honeypot input is rejected", () => { for(const input of [null,[],"value",{...valid,message:"x".repeat(5001)},{...valid,website:"spam"}]) assert.equal(validateInquiry(input).ok,false); });
test("download contains the actual project brief and never claims it was sent", () => { const text = projectBrief(valid); assert.ok(text.includes(valid.message)); assert.ok(text.includes(valid.email)); assert.ok(text.includes("has not been sent")); });
test("delivery only succeeds after a successful endpoint response", async () => {
  let body = "";
  const fakeFetch = (async (_url: unknown, options: RequestInit) => { body = String(options.body); assert.equal(options.redirect,"error"); return new Response(null,{status:202}); }) as typeof fetch;
  assert.equal(await deliverInquiry(valid,"https://example.com/inquiry","test-token",fakeFetch),true);
  assert.equal(JSON.parse(body).message,valid.message);
  assert.equal(await deliverInquiry(valid,"https://example.com/inquiry","test-token",(async () => new Response(null,{status:503})) as typeof fetch),false);
});
test("delivery refuses insecure URLs, missing credentials and network failures", async () => {
  const fail = (async () => { throw new Error("unavailable"); }) as typeof fetch;
  assert.equal(await deliverInquiry(valid,"http://example.com","token",fail),false);
  assert.equal(await deliverInquiry(valid,"https://example.com","",fail),false);
  assert.equal(await deliverInquiry(valid,"https://example.com","token",fail),false);
});
