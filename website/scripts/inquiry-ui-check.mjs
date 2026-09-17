import { chromium } from "playwright";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

const executablePath = process.env.TEST_BROWSER_PATH ?? ["C:/Program Files/Google/Chrome/Application/chrome.exe","C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
const browser = await chromium.launch({headless:true,...(executablePath ? {executablePath}: {})});
const context = await browser.newContext({baseURL:process.env.TEST_BASE_URL ?? "http://127.0.0.1:3001"});
const page = await context.newPage();
try {
  await page.goto("/contact?service=Partnership");
  const sendButton = page.getByRole("button",{name:"Send inquiry",exact:true});
  assert.ok(await sendButton.isVisible(),"Run this test against a server with dummy delivery configuration.");
  await page.getByLabel("Your name",{exact:true}).fill("Project Coordinator");
  await page.getByLabel("Work email",{exact:true}).fill("coordinator@example.com");
  await page.getByLabel("Company / organisation",{exact:true}).fill("Example organisation");
  const message = "We need field engineering and integration support for a partner platform.";
  await page.getByLabel("Tell us about your project",{exact:true}).fill(message);
  await sendButton.click();
  assert.ok(await page.locator("#consent-error").isVisible());
  await page.getByRole("checkbox").check();
  let attempt = 0;
  await page.route("**/api/inquiry",async route => {
    attempt++;
    const request = route.request().postDataJSON();
    assert.equal(request.service,"Partnership");
    assert.equal(request.consent,true);
    await new Promise(resolve=>setTimeout(resolve,350));
    await route.fulfill({status:attempt===1 ? 502 : 200,contentType:"application/json",body:JSON.stringify({message:attempt===1 ? "Your message could not be delivered. Please try again." : "Your project inquiry has been received. Thank you for getting in touch."})});
  });
  await sendButton.click();
  await page.getByRole("button",{name:"Sending your inquiry…"}).waitFor();
  assert.ok(await page.getByRole("button",{name:"Sending your inquiry…"}).isDisabled());
  await page.getByRole("alert").waitFor();
  assert.equal(await page.getByLabel("Tell us about your project",{exact:true}).inputValue(),message);
  await sendButton.click();
  await page.getByRole("status").waitFor();
  assert.ok((await page.getByRole("status").textContent()).includes("has been received"));
  assert.equal(await page.getByLabel("Tell us about your project",{exact:true}).inputValue(),"");
  assert.equal(attempt,2);
  console.log("PASS: consent, pending state, failed delivery with retained input, retry, successful delivery and reset. Network responses were mocked; no inquiry was sent.");
} finally { await browser.close(); }
