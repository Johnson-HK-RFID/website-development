import { chromium } from "playwright";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import AxeBuilder from "@axe-core/playwright";
import { photography, photographyLicense } from "../src/content/photography.ts";

const output = new URL("../../.artifacts/photography/review/", import.meta.url);
await mkdir(output, { recursive: true });
const manifest = JSON.parse(await readFile(new URL("../../docs/frontend/photography-manifest.json", import.meta.url), "utf8"));
for (const asset of manifest) {
  const bytes = await readFile(new URL(`../../${asset.file}`, import.meta.url));
  assert.equal(createHash("sha256").update(bytes).digest("hex"), asset.sha256, asset.id);
  assert.equal(asset.license, "CC0-1.0");
}
const executablePath = process.env.TEST_BROWSER_PATH ?? ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
const report = { layouts: [], motion: [], errors: [] };
async function instrument(context) {
  await context.addInitScript(() => {
    window.__motion = [];
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (frames, options) {
      window.__motion.push({ route: location.pathname, photo: this.matches("[data-reveal]"), connector: this.matches(".architecture-connector path"), options });
      return animate.call(this, frames, options);
    };
  });
}
try {
  const context = await browser.newContext({ reducedMotion: "reduce", colorScheme: "light" });
  await instrument(context);
  const page = await context.newPage();
  page.on("pageerror", error => report.errors.push(error.message));
  for (const width of [375, 768, 960, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/industries"]) {
      await page.goto(base + route, { waitUntil: "load" });
      assert.equal(await page.locator(".industry-photo-frame").count(), 4);
      for (const img of await page.locator(".industry-photo-frame img").all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(image => Promise.race([image.decode(), new Promise((_, reject) => setTimeout(() => reject(new Error("Image decode timed out: " + image.src)), 30000))]));
        assert(await img.evaluate(image => image.naturalWidth > 0 && image.loading === "lazy"));
        const currentSrc = await img.evaluate(image => image.currentSrc);
        assert.equal(new URL(currentSrc).origin, new URL(base).origin, "Images must be self-hosted");
      }
      if (route === "/industries") {
        for (const [key, photo] of Object.entries(photography)) {
          const figure = page.locator(`figure[data-industry-photo="${key}"]`);
          assert.equal(await figure.locator("img").getAttribute("alt"), photo.alt);
          assert.equal(await figure.locator("figcaption").textContent(), `Illustrative industry scenePhoto: ${photo.author} · CC0`);
          assert.deepEqual(await figure.locator("a").evaluateAll(links => links.map(link => link.href)), [photo.source, photographyLicense]);
        }
      } else {
        assert.deepEqual(await page.locator(".industry-links img").evaluateAll(images => images.map(image => image.alt)), ["", "", "", ""]);
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
      assert.equal(await page.evaluate(() => window.__motion.length), 0, "Reduced motion must suppress JS animation");
      await page.evaluate(() => document.fonts.ready);
      const name = route === "/" ? "home-industries" : "industries";
      if (route === "/") await page.locator(".industry-links").screenshot({ path: fileURLToPath(new URL(`${name}-${width}.png`, output)) });
      else await page.screenshot({ path: fileURLToPath(new URL(`${name}-${width}.png`, output)), fullPage: true });
      report.layouts.push({ route, width, images: 4, overflow: false });
    }
  }
  for (const colorScheme of ["light", "dark"]) {
    await page.emulateMedia({ colorScheme });
    for (const route of ["/", "/industries"]) {
      await page.goto(base + route);
      const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      assert.deepEqual(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [], `${route} ${colorScheme}`);
    }
  }
  await context.close();

  const animated = await browser.newContext({ reducedMotion: "no-preference", viewport: { width: 960, height: 800 } });
  await instrument(animated);
  const moving = await animated.newPage();
  moving.on("pageerror", error => report.errors.push(error.message));
  await moving.goto(base);
  await moving.locator(".industry-links").scrollIntoViewIfNeeded();
  await moving.waitForFunction(() => window.__motion.filter(item => item.photo).length > 0);
  await moving.waitForFunction(() => document.getAnimations().filter(animation => animation.effect?.getTiming().iterations !== Infinity).every(animation => animation.playState !== "running"));
  const count = await moving.evaluate(() => window.__motion.filter(item => item.photo).length);
  await moving.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await moving.locator(".industry-links").scrollIntoViewIfNeeded();
  await moving.waitForTimeout(600);
  assert.equal(await moving.evaluate(() => window.__motion.filter(item => item.photo).length), count, "Photos must not replay on scroll");
  assert(await moving.locator(".field-gallery-item").first().evaluate(element => getComputedStyle(element).animationName.includes("field-float")), "Field gallery should carry restrained ambient movement");
  report.motion.push("Photo entrances play once; the field gallery retains restrained ambient movement");

  // Exercise client-side navigation as well as direct page loads.
  await moving.locator('.industry-links a[href="/industries#construction"]').click();
  await moving.waitForURL("**/industries#construction");
  await moving.waitForFunction(() => window.__motion.some(item => item.photo && item.route === "/industries"));
  await moving.goto(base + "/traci");
  await moving.locator(".architecture").scrollIntoViewIfNeeded();
  await moving.waitForFunction(() => window.__motion.filter(item => item.connector).length === 2);
  const connections = await moving.evaluate(() => window.__motion.filter(item => item.connector));
  assert(connections[0].options.delay < connections[1].options.delay);
  await moving.emulateMedia({ reducedMotion: "reduce" });
  await moving.waitForFunction(() => document.getAnimations().every(animation => animation.playState !== "running"));
  assert.equal(await moving.locator(".architecture-connector path").first().evaluate(path => getComputedStyle(path).strokeDasharray), "none");
  report.motion.push("TRACI connections play in sequence; changing to reduced motion cancels active animations");
  await animated.close();

  const staticContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 800 } });
  const staticPage = await staticContext.newPage();
  await staticPage.goto(base + "/industries");
  for (const figure of await staticPage.locator("figure[data-industry-photo]").all()) {
    await figure.scrollIntoViewIfNeeded();
    assert(await figure.isVisible());
    assert.equal(await figure.evaluate(element => getComputedStyle(element).opacity), "1");
    await figure.locator("img").evaluate(image => Promise.race([image.decode(), new Promise((_, reject) => setTimeout(() => reject(new Error("Image decode timed out: " + image.src)), 15000))]));
  }
  await staticPage.goto(base + "/traci");
  assert(await staticPage.locator(".architecture").isVisible());
  report.motion.push("Images, captions and diagram remain visible without JavaScript");
  await staticContext.close();
  assert.deepEqual(report.errors, []);
  await writeFile(new URL("report.json", output), JSON.stringify(report, null, 2));
  console.log(`PASS: 4 asset hashes; 8 responsive photo layouts; 4 light/dark accessibility audits; credits; local image delivery; motion, reduced motion and no-JavaScript fallbacks.`);
} finally { await browser.close(); }
