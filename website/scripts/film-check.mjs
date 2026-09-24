import { chromium } from "playwright";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";

const manifest = JSON.parse(await readFile(new URL("../../docs/frontend/field-media-manifest.json", import.meta.url), "utf8"));
for (const asset of manifest) {
  const bytes = await readFile(new URL(`../../${asset.file}`, import.meta.url));
  assert.equal(createHash("sha256").update(bytes).digest("hex"), asset.sha256);
  assert.equal(asset.license, "Pexels License");
}
const executablePath = process.env.TEST_BROWSER_PATH ?? ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
try {
  for (const [route, width] of [["/", 1440], ["/zh-HK", 375]]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "no-preference" });
    const requests = [];
    page.on("request", request => { if (request.url().includes("construction-timelapse.mp4")) requests.push(request.url()); });
    await page.goto(base + route);
    await page.waitForFunction(() => document.querySelector(".hero-film video")?.currentTime > .1);
    const video = page.locator(".hero-film video");
    assert(requests.length > 0, "Film must load and play without a click");
    assert(await video.evaluate(v => v.autoplay && v.muted && v.loop && v.playsInline && !v.controls && !v.paused && v.duration >= 14.5 && v.duration < 16));
    assert.equal(await page.locator(".film-control").count(), 0, "The ambient hero film must not expose playback chrome");
    await page.close();
  }
  const reduced = await browser.newPage({ reducedMotion: "reduce" });
  const reducedRequests = [];
  reduced.on("request", request => { if (request.url().includes(".mp4")) reducedRequests.push(request.url()); });
  await reduced.goto(base);
  await reduced.waitForTimeout(500);
  assert.equal(reducedRequests.length, 0);
  assert.equal(await reduced.locator(".hero-film video").count(), 0);
  assert.equal(await reduced.locator(".film-control").count(), 0);
  await reduced.locator(".hero-film img").evaluate(image => image.decode());
  await reduced.close();
  const staticPage = await browser.newPage({ javaScriptEnabled: false });
  await staticPage.goto(base);
  assert.equal(await staticPage.locator(".hero-film video").count(), 0);
  await staticPage.locator(".hero-film img").evaluate(image => image.decode());
  await staticPage.close();
  console.log("PASS: licensed media hashes; control-free muted autoplay in both locales; reduced-motion and no-JavaScript poster fallbacks.");
} finally { await browser.close(); }
