import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
const paths = ["/", "/traci", "/solutions", "/devices", "/services", "/partners", "/industries", "/about", "/contact", "/solutions/gas-monitoring", "/solutions/hookcam", "/solutions/outrigger-monitoring", "/solutions/worker-tracking", "/solutions/site-vision", "/solutions/rfid-asset-tracking"];
const output = new URL("../../.artifacts/bilingual/", import.meta.url);
await mkdir(output, {recursive:true});
const executablePath = process.env.TEST_BROWSER_PATH ?? ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
const browser = await chromium.launch({headless:true, ...(executablePath ? {executablePath} : {})});
const context = await browser.newContext({viewport:{width:1440,height:1000}, reducedMotion:"reduce", colorScheme:"light"});
const page = await context.newPage();
const errors = [];
page.on("pageerror", e => errors.push(e.message));
const report = {routes:[], layouts:[], interactions:[], errors};
const local = path => `/zh-HK${path === "/" ? "" : path}`;
try {
  for (const path of paths) {
    const route = local(path);
    const response = await page.goto(base + route, {waitUntil:"load"});
    assert.equal(response.status(),200,route);
    assert.equal(await page.locator("html").getAttribute("lang"),"zh-HK");
    assert.equal(await page.locator("h1").count(),1);
    assert.match(await page.locator("main").innerText(), /[\u3400-\u9fff]/);
    assert.equal(await page.locator('link[rel="canonical"]').evaluate(el => new URL(el.href).pathname),route);
    assert.equal(await page.locator('link[hreflang="en"]').evaluate(el => new URL(el.href).pathname),path);
    assert.equal(await page.locator('[data-locale-switch] a[lang="en"]').getAttribute("href"),path);
    const links = await page.locator('main a[href^="/"]').evaluateAll(els => els.map(el => el.getAttribute("href")));
    assert(links.every(href => href.startsWith("/zh-HK")),`${route}: localized links ${links}`);
    // Catch untranslated prose without rejecting product names, protocol labels or credits.
    const prose = await page.locator("main p, main h1, main h2, main label, main button, main option").allTextContents();
    const untranslated = prose.filter(text => text.trim().split(/\s+/).length >= 5 && !/[\u3400-\u9fff]/.test(text));
    assert.deepEqual(untranslated,[],`${route}: untranslated prose`);
    report.routes.push({route,status:response.status(),title:await page.title()});
  }
  for (const width of [375,768,960,1440]) {
    await page.setViewportSize({width,height:1000});
    for (const route of ["/zh-HK", "/zh-HK/traci", "/zh-HK/solutions", "/zh-HK/devices", "/zh-HK/contact", "/zh-HK/industries"]) {
      await page.goto(base+route);
      await page.evaluate(() => document.fonts.ready);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),`${route} ${width}: overflow`);
      report.layouts.push({route,width});
      if (route === "/zh-HK" || (width === 1440 && route === "/zh-HK/traci")) {
        await page.screenshot({path:fileURLToPath(new URL(`${route.replaceAll("/","-")}-${width}.png`,output)),fullPage:true});
      }
    }
  }
  for (const colorScheme of ["light","dark"]) {
    await page.emulateMedia({colorScheme});
    for (const route of ["/zh-HK", "/zh-HK/traci", "/zh-HK/solutions", "/zh-HK/contact"]) {
      await page.goto(base+route);
      const audit=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();
      assert.deepEqual(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),[],`${route} ${colorScheme}`);
    }
  }
  await page.goto(base+"/contact?service=Field%20Engineering#main");
  await page.locator('[data-locale-switch] a[lang="zh-HK"]').click();
  await page.waitForURL("**/zh-HK/contact?service=Field%20Engineering#main");
  assert.equal(await page.locator("select[name=service]").inputValue(),"Field Engineering");
  await page.locator('[data-locale-switch] a[lang="en"]').click();
  await page.waitForURL("**/contact?service=Field%20Engineering#main");
  report.interactions.push("Language switch retains page, service query and fragment in both directions");

  await page.goto(base+"/zh-HK/solutions");
  await page.locator('input[type="search"]').fill("氣體");
  assert.equal(await page.locator(".solution-card").count(),1);
  await page.locator(".solution-card").first().click();
  await page.waitForURL("**/zh-HK/solutions/gas-monitoring");
  report.interactions.push("Chinese search and client-side solution navigation");

  await page.goto(base+"/zh-HK/contact");
  await page.locator('button[type="submit"]').click();
  assert.match(await page.locator("#name-error").innerText(),/[\u3400-\u9fff]/);
  await page.locator("#name").fill("陳先生");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#company").fill("工程測試公司");
  await page.locator("#message").fill("我們需要為新建樓宇配置氣體監測及設備連線，請協助規劃整合方案。");
  const downloadPromise = page.waitForEvent("download");
  await page.locator('button[type="submit"]').click();
  const download = await downloadPromise;
  const text = await readFile(await download.path(),"utf8");
  assert(text.includes("陳先生") && text.includes("工程測試公司"));
  assert.match(text, /項目/);
  assert.match(await page.locator('[role="status"]').innerText(),/[\u3400-\u9fff]/);
  report.interactions.push("Chinese validation, form data, downloaded brief and completion status");

  await page.setViewportSize({width:375,height:812});
  await page.goto(base+"/zh-HK");
  await page.locator(".menu-toggle").click();
  await page.locator('.mobile-nav a[href="/zh-HK/solutions"]').click();
  await page.waitForURL("**/zh-HK/solutions");
  assert.equal(await page.locator(".menu-toggle").getAttribute("aria-expanded"),"false");
  report.interactions.push("Chinese mobile menu navigates and closes");

  const noJS=await browser.newContext({javaScriptEnabled:false});
  const staticPage=await noJS.newPage();
  await staticPage.goto(base+"/zh-HK/about");
  assert.match(await staticPage.locator("main").innerText(),/[\u3400-\u9fff]/);
  await staticPage.locator('[data-locale-switch] a[lang="en"]').click();
  await staticPage.waitForURL("**/about");
  assert.equal(await staticPage.locator("html").getAttribute("lang"),"en");
  const missing = await staticPage.goto(base + "/zh-HK/missing-page");
  assert.equal(missing.status(),404);
  assert.equal(await staticPage.locator("html").getAttribute("lang"),"zh-HK");
  assert.match(await staticPage.locator("main").innerText(),/[\u3400-\u9fff]/);
  await noJS.close();
  report.interactions.push("Server-rendered Chinese and language links work without JavaScript");
  for (const route of ["/missing-page", "/zh-HK/missing-page", "/zh-HK/solutions/missing-solution"]) {
    const response = await page.goto(base + route);
    assert.equal(response.status(), 404, route);
    assert.equal(await page.locator("html").getAttribute("lang"), route.startsWith("/zh-HK") ? "zh-HK" : "en");
    assert.equal(await page.locator("main h1").count(), 1);
  }
  report.interactions.push("Unknown pages and solution slugs retain the locale and return 404");
  assert.deepEqual(errors,[]);
  await writeFile(new URL("report.json",output),JSON.stringify(report,null,2));
  console.log("PASS: 15 Chinese routes, localized metadata and links, 24 responsive layouts, 8 accessibility audits, bilingual interactions and no-JavaScript rendering.");
} finally {await browser.close();}
