import { chromium } from "playwright";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const baseline = new URL("../tests/fixtures/redesign-content.json", import.meta.url);
const capture = process.argv.includes("--capture");
const paths = ["/", "/traci", "/solutions", "/devices", "/services", "/partners", "/industries", "/about", "/contact", "/solutions/gas-monitoring", "/solutions/hookcam", "/solutions/outrigger-monitoring", "/solutions/worker-tracking", "/solutions/site-vision", "/solutions/rfid-asset-tracking"];
const executablePath = process.env.TEST_BROWSER_PATH ?? ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, colorScheme: "light", reducedMotion: "reduce" });
const records = {};
try {
  for (const path of paths) {
    await page.goto(`${process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000"}${path}`, { waitUntil: "load" });
    records[path] = await page.evaluate(() => {
      const normalize = text => text.replace(/\s+/g, "");
      const main = document.querySelector("main").cloneNode(true);
      // The September photography addition introduces only these new, self-contained
      // figures and source credits. Keep the original business-copy fixture unchanged;
      // photo content, credits and delivery are checked separately by test:media.
      main.querySelectorAll("figure[data-industry-photo], figure[data-building-photo]").forEach(figure => figure.remove());
      const header = document.querySelector("header").cloneNode(true);
      header.querySelectorAll("[data-locale-switch]").forEach(element => element.remove());
      return {
        text: normalize(main.textContent),
        header: normalize(header.textContent),
        footer: normalize(document.querySelector("footer").textContent),
        title: document.title,
        headings: [...main.querySelectorAll("h1,h2,h3")].map(el => [el.tagName, normalize(el.textContent)]),
        links: [...main.querySelectorAll("a")].map(el => [el.getAttribute("href"), normalize(el.textContent)]),
        fields: [...main.querySelectorAll("input,select,textarea")].map(el => [el.tagName, el.name, el.type]),
        anchors: [...main.querySelectorAll("[id]")].map(el => el.id)
      };
    });
    if (capture && ["/", "/traci", "/devices"].includes(path)) {
      await mkdir(new URL("../../.artifacts/redesign/", import.meta.url), { recursive: true });
      await page.screenshot({ path: fileURLToPath(new URL(`../../.artifacts/redesign/before-${path === "/" ? "home" : path.slice(1)}.png`, import.meta.url)), fullPage: true });
    }
  }
  if (capture) {
    await mkdir(new URL("../../.artifacts/redesign/", import.meta.url), { recursive: true });
    await mkdir(new URL("../tests/fixtures/", import.meta.url), { recursive: true });
    await writeFile(baseline, JSON.stringify(records, null, 2));
    console.log(`Captured content, headings, links, form fields and anchors for ${paths.length} routes.`);
  } else {
    const expected = JSON.parse(await readFile(baseline, "utf8"));
    // The concept image has been replaced by credited building photography.
    // This is the only removed caption; the original business-copy fixture stays intact.
    for (const path of ["/", "/about"]) expected[path].text = expected[path].text.replace("Architecturalconcept", "");
    for (const path of paths) assert.deepEqual(records[path], expected[path], `Content preservation: ${path}`);
    console.log(`PASS: existing text, headings, links, fields, anchors and titles preserved across ${paths.length} routes; new photo figures verified separately by test:media.`);
  }
} finally { await browser.close(); }
