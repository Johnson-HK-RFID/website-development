import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const baseURL = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
const artifacts = path.resolve("../.artifacts/browser");
await mkdir(artifacts, { recursive:true });
const executablePath = process.env.TEST_BROWSER_PATH ?? ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
const browser = await chromium.launch({ headless:true, ...(executablePath ? {executablePath} : {}) });
const context = await browser.newContext({ baseURL, viewport:{width:1440,height:1000}, reducedMotion:"reduce" });
const page = await context.newPage();
const errors = [];
const internalLinks = new Set();
page.on("pageerror", error => errors.push(error.message));
const paths = ["/", "/traci", "/solutions", "/devices", "/services", "/partners", "/industries", "/about", "/contact", "/solutions/gas-monitoring", "/solutions/hookcam", "/solutions/outrigger-monitoring", "/solutions/worker-tracking", "/solutions/site-vision", "/solutions/rfid-asset-tracking"];
const report = { baseURL, browser:await browser.version(), routes:[], layouts:[], checks:[], accessibility:[] };
try {
  for (const route of paths) {
    const response = await page.goto(route, {waitUntil:"load"});
    await page.evaluate(() => document.fonts.ready);
    assert.equal(response.status(),200,route);
    assert.equal(await page.locator("h1").count(),1,`${route}: single h1`);
    assert.ok((await page.title()).includes("Embuilded"),`${route}: title`);
    for (const image of await page.locator("img").all()) assert.equal(await image.evaluate(img => img.complete && img.naturalWidth > 0),true,`${route}: image loading`);
    report.routes.push({path:route,status:response.status(),title:await page.title()});
    for (const href of await page.locator('a[href^="/"]').evaluateAll(links=>links.map(link=>link.getAttribute("href")))) internalLinks.add(href);
    {
      const audit = await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();
      report.accessibility.push({path:route,violations:audit.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
    }
  }
  const optimizedImage = await page.evaluate(async () => {
    const response = await fetch("/_next/image?url=%2Fimages%2Fbuilt-world-concept.webp&w=640&q=75");
    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);
    const result = { status: response.status, width: bitmap.width, bytes: blob.size };
    bitmap.close();
    return result;
  });
  assert.equal(optimizedImage.status, 200);
  assert.equal(optimizedImage.width, 640, "Standalone image optimizer must resize, not silently return the original");
  report.checks.push(`Image optimization verified: 640px, ${optimizedImage.bytes} bytes.`);
  for (const href of internalLinks) {
    const url = new URL(href,baseURL);
    const response = await context.request.get(url.pathname+url.search);
    assert.equal(response.status(),200,`Internal link: ${href}`);
    if (url.hash) assert.ok((await response.text()).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`Missing anchor: ${href}`);
  }
  report.checks.push(`Verified ${internalLinks.size} unique internal destinations, including anchor targets.`);
  for (const width of [375,768,1280,1440]) {
    await page.setViewportSize({width,height:1000});
    for (const route of ["/","/solutions","/contact","/services","/traci","/partners","/industries","/about","/devices","/solutions/gas-monitoring"]) {
      await page.goto(route,{waitUntil:"load"});
      await page.evaluate(() => document.fonts.ready);
      const size = await page.evaluate(() => ({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
      assert.ok(size.scroll<=size.viewport+1,`${route} overflows at ${width}: ${size.scroll}`);
      report.layouts.push({path:route,width,overflow:false});
      if (route==="/" && [375,1440].includes(width)) await page.screenshot({path:path.join(artifacts,`home-${width}.png`),fullPage:true});
    }
  }
  await page.setViewportSize({width:375,height:812});
  await page.goto("/");
  await page.getByRole("button",{name:"Open navigation"}).click();
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("button",{name:"Open navigation"}).getAttribute("aria-expanded"),"false");
  await page.getByRole("button",{name:"Open navigation"}).click();
  await page.getByRole("navigation",{name:"Mobile navigation"}).getByRole("link",{name:"Solutions",exact:true}).click();
  await page.waitForURL("**/solutions");
  assert.equal(await page.getByRole("button",{name:"Open navigation"}).getAttribute("aria-expanded"),"false");
  report.checks.push("Mobile navigation opens, closes on Escape, follows links and closes after navigation.");

  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/solutions");
  await page.getByRole("button",{name:"Site safety",exact:true}).click();
  assert.equal(await page.locator(".solution-card").count(),3);
  await page.getByRole("searchbox",{name:"Search solutions"}).fill("zzzz-no-match");
  assert.equal(await page.getByRole("heading",{name:"No matches yet."}).count(),1);
  await page.getByRole("button",{name:"Reset filters"}).click();
  assert.equal(await page.locator(".solution-card").count(),6);
  await page.getByRole("searchbox",{name:"Search solutions"}).fill("HookCam");
  assert.equal(await page.locator(".solution-card").count(),1);
  report.checks.push("Solution category filtering, search, empty state and reset.");
  await page.goto("/devices");
  await page.getByRole("button",{name:"Vision",exact:true}).click();
  assert.equal(await page.locator(".device-card").count(),2);
  report.checks.push("Device category filtering.");

  await page.goto("/contact?service=HookCam");
  assert.equal(await page.getByLabel("Area of interest").inputValue(),"HookCam");
  await page.getByRole("button",{name:"Download project brief",exact:true}).click();
  assert.ok(await page.locator("#name-error").isVisible());
  await page.getByLabel("Your name",{exact:true}).fill("Project Coordinator");
  await page.getByLabel("Work email",{exact:true}).fill("coordinator@example.com");
  await page.getByLabel("Company / organisation",{exact:true}).fill("Example organisation");
  await page.getByLabel("Tell us about your project",{exact:true}).fill("We need camera positioning and field connectivity support for a new construction site.");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button",{name:"Download project brief",exact:true}).click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(),"embuilded-project-brief.txt");
  await download.saveAs(path.join(artifacts,"test-project-brief.txt"));
  assert.ok((await page.getByRole("status").textContent()).includes("not been sent"));
  await page.screenshot({path:path.join(artifacts,"contact-1440.png"),fullPage:true});
  report.checks.push("Contact preselection, field validation, actual file download and truthful completion message.");

  const payload = { name:"Project Coordinator",email:"coordinator@example.com",company:"Example organisation",service:"HookCam",message:"We need camera positioning and field connectivity support.",consent:true };
  assert.equal((await context.request.post("/api/inquiry",{data:payload})).status(),503);
  assert.equal((await context.request.post("/api/inquiry",{data:{...payload,email:"invalid"}})).status(),400);
  assert.equal((await context.request.post("/api/inquiry",{data:payload,headers:{Origin:"https://unrelated.example"}})).status(),403);
  assert.equal((await context.request.post("/api/inquiry",{data:"x".repeat(17000),headers:{"Content-Type":"application/json"}})).status(),413);
  assert.equal((await context.request.get("/missing-page")).status(),404);
  assert.ok((await (await context.request.get("/robots.txt")).text()).includes("Disallow: /"));
  report.checks.push("API validation, cross-origin rejection, size limit, unconfigured delivery, custom 404 and preview indexing protection.");
  assert.deepEqual(errors,[],"No browser runtime errors");
  await writeFile(path.join(artifacts,"report.json"),JSON.stringify(report,null,2));
  const violations = report.accessibility.flatMap(item => item.violations.map(v=>({path:item.path,...v})));
  console.log(JSON.stringify({routes:report.routes.length,layouts:report.layouts.length,checks:report.checks,accessibilityViolations:violations},null,2));
  assert.deepEqual(violations,[],"Accessibility violations require review");
} catch(error) {
  await writeFile(path.join(artifacts,"report.json"),JSON.stringify({...report,error:String(error),runtimeErrors:errors},null,2));
  await page.screenshot({path:path.join(artifacts,"failure.png"),fullPage:true});
  throw error;
} finally { await browser.close(); }
