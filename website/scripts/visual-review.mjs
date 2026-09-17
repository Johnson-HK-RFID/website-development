import { chromium } from "playwright";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";

const output = new URL("../../.artifacts/redesign/", import.meta.url);
await mkdir(output, { recursive: true });
const executablePath = process.env.TEST_BROWSER_PATH ?? ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
const context = await browser.newContext({ colorScheme: "light", reducedMotion: "reduce" });
const page = await context.newPage();
page.setDefaultNavigationTimeout(90000);
const results = [];
try {
  for (const width of [375, 768, 960, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/traci", "/solutions", "/devices", "/contact", "/services", "/partners", "/about", "/industries", "/solutions/gas-monitoring"]) {
      const response = await page.goto(`${process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000"}${route}`, { waitUntil: "load" });
      assert.equal(response.status(), 200, route);
      await page.evaluate(() => document.fonts.ready);
      const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
      await page.screenshot({ path: fileURLToPath(new URL(`${name}-${width}.png`, output)), fullPage: true });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      results.push({ route, width, overflow });
    }
  }
  const contrast = [];
  for (const colorScheme of ["light", "dark"]) {
    await page.emulateMedia({ colorScheme });
    await page.setViewportSize({ width: 960, height: 1000 });
    for (const route of ["/", "/traci", "/solutions", "/devices", "/contact", "/services", "/partners", "/about", "/industries", "/solutions/gas-monitoring"]) {
      await page.goto(`${process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000"}${route}`, { waitUntil: "load" });
      const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      contrast.push({ route, colorScheme, violations: audit.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })) });
      if (colorScheme === "dark" && ["/", "/traci", "/contact"].includes(route)) await page.screenshot({ path: fileURLToPath(new URL(`${route === "/" ? "home" : route.slice(1)}-dark.png`, output)), fullPage: true });
    }
  }
  const report = { layouts: results, accessibility: contrast };
  await writeFile(new URL("visual-report.json", output), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ layouts: results.length, overflows: results.filter(r => r.overflow), violations: contrast.filter(r => r.violations.length) }, null, 2));
  if (results.some(r => r.overflow) || contrast.some(r => r.violations.length)) process.exitCode = 1;
} finally { await browser.close(); }
