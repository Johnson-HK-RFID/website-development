# Verification Record

## Building construction and bilingual release — 18 September 2026

Current design: [BUILDING_DESIGN.md](BUILDING_DESIGN.md). The earlier blue redesign and its Lighthouse scores below are historical results, not measurements of this release.

| Check | Result |
| --- | --- |
| ESLint | Passed after the bilingual implementation and test additions |
| TypeScript and production build | Passed the final production build; locale pages are prerendered, with dynamic contact and global 404 responses |
| Inquiry unit tests | Seven passed |
| English content preservation | All fifteen routes matched the retained baseline, with explicit allowances for photo captions and language navigation |
| Chinese routes and metadata | Fifteen routes passed, including canonical/alternate links and localized navigation |
| Chinese responsive layouts | Twenty-four page/viewport combinations passed at 375, 768, 960 and 1440 pixels |
| Chinese accessibility | Eight light/dark WCAG A/AA audits passed with no automated violations |
| Bilingual interactions | Language switching preserved route/query/fragment; Chinese catalog search, client navigation, validation and downloaded brief passed |
| No-JavaScript locale behavior | Chinese server content and language links passed |
| Photography and motion | Four asset hashes, eight responsive photo layouts and four light/dark accessibility audits passed; image credits, local delivery, one-shot motion, reduced motion and no-JavaScript fallbacks passed |
| English browser regression | Fifteen routes, forty responsive layouts and fifty-four internal destinations passed; no automated WCAG A/AA violations or browser runtime errors |
| Localized 404 response | English and Chinese unknown paths and unknown solution slugs return HTTP 404 with complete localized HTML |
| Protected requirements | All four source files matched the recorded SHA-256 baseline |

Manual review covered the building-led desktop opening, Chinese mobile opening and full Chinese TRACI page. The review identified and corrected oversized Chinese footer labels. Representative captures are linked from the design record. Photography license evidence and processed-file hashes are recorded in the manifest.

Vercel configuration and import instructions are included. No live Vercel deployment or webhook delivery is claimed; those depend on the user's project/domain and approved inquiry endpoint. Automated accessibility checks supplement, rather than replace, manual assistive-technology review. No new Lighthouse score is claimed for this release.

## Visual redesign review

The subsequent visual overhaul preserves the first implementation's content. A versioned fixture records main, header and footer text, heading order, links, form fields, anchors and titles across all 15 routes. The redesigned pages passed comparison against that fixture. Forty layout checks covered 375, 768, 960 and 1440 pixels. Twenty light/dark accessibility audits found no WCAG A/AA violations. The production build, lint checks and seven inquiry tests passed. [GitHub Actions run 35176110208](https://github.com/Johnson-HK-RFID/website-development/actions/runs/35176110208) passed all checks for implementation commit `7e6a9d82722c96b312a4573702b6ef45cf777f59`, including production browser checks and content preservation.

The interface now uses self-hosted Geist, a graphite/cool-white/blue palette, a wide architectural hero, compact functional SVGs and a typographic architecture diagram. See [UI_REDESIGN.md](UI_REDESIGN.md) for the audit, constraints and current status. The original implementation results below remain a historical baseline.

Final local production checks also passed: all 15 routes, 40 layout combinations, 39 internal destinations, image resizing, navigation, catalogs, the inquiry download, endpoint behavior and the content fixture. No browser runtime errors or automated WCAG A/AA violations were recorded.

### Redesign performance

| Mobile Lighthouse measure | Result |
| --- | --- |
| Performance | 90 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 66; indexing intentionally disabled for review |
| First contentful paint | 1.1 seconds |
| Largest contentful paint | 3.0 seconds |
| Total blocking time | 250 milliseconds |
| Cumulative layout shift | 0 |

Image delivery and LCP request discovery passed. The report warns that the local CPU is slower than the expected baseline. LCP remains above the 2.5-second target in this simulated run; measure again on staging before making production performance claims. Reports are stored in `.artifacts/redesign/lighthouse.report.json` and `.html`. This audit does not measure production field INP.

## Scope

Local verification covers the first implementation of the Embuilded corporate website: nine main pages, six solution pages, catalogs, navigation, metadata and the inquiry workflow. Tests ran against the production standalone server on Windows with Node.js 24.21.0 and Chrome 152.0.7977.83. This record was updated on 17 September 2026.

## Executed checks

| Check | Result |
| --- | --- |
| Production build | Passed; all public routes generated and the standalone server started successfully. |
| TypeScript and ESLint | Passed. |
| Inquiry unit tests | 7 passed: validation, consent, input limits, honeypot, downloadable brief, confirmed delivery and network/security failures. |
| Public pages | 15 routes returned HTTP 200, with one main heading, page titles and loaded images. |
| Internal links | 39 unique destinations and fragment targets verified. |
| Responsive layouts | 40 page/viewport combinations passed at 375, 768, 1280 and 1440 pixels; no horizontal overflow. |
| Automated accessibility | No axe WCAG A/AA violations across all 15 pages. |
| Interactive behavior | Mobile navigation and Escape handling, catalog filtering, search, empty-state reset and contact preselection passed. |
| Default inquiry flow | Required-field validation, real file download and explicit confirmation that no inquiry was sent passed. |
| Configured inquiry UI | Consent, disabled pending state, failure with retained input, retry, success and reset passed using intercepted test responses. No real inquiry was delivered. |
| Endpoint behavior | Unconfigured delivery, invalid input, cross-origin requests and oversized payloads returned the expected 503, 400, 403 and 413 responses. |
| Error and preview behavior | Custom 404 and preview indexing controls verified. |
| Browser runtime | No uncaught browser errors recorded. |
| Source preservation | All four source requirement files match the manifest SHA-256 hashes; staged source blobs were also checked. |
| Standalone image optimization | Passed: a 640-pixel request returns a 640-pixel, 40,461-byte WebP instead of the 272,032-byte original. |
| GitHub verification | [Workflow 35172276874](https://github.com/Johnson-HK-RFID/website-development/actions/runs/35172276874) passed all checks on Linux for implementation commit `e23a97c66eaccca4c56759e54294180b47ac744d`. |

The browser report and review screenshots are generated under `.artifacts/browser/`, outside version control; CI also uploads its browser report as a workflow artifact. Automated accessibility results do not constitute a complete manual accessibility certification.

## Performance review

The initial mobile Lighthouse run scored 77 for performance, 100 for accessibility, 100 for best practices and 66 for SEO. Its only failing SEO audit was the intentional preview `noindex` directive. The run reported FCP 1.2 seconds, LCP 3.9 seconds, TBT 430 milliseconds and CLS 0.002. Lighthouse also warned that the host CPU was slower than its expected baseline; these are local simulated measurements, not production field data.

The audit exposed a real packaging issue: the Windows standalone output omitted Sharp's dynamically loaded DLLs and silently served the original 272,032-byte image. The build now explicitly includes native image dependencies, and the hero image has a high fetch priority and corrected responsive sizing. A browser regression check verifies that the image endpoint returns an actual 640-pixel image. This follows the [Next.js standalone file-tracing guidance](https://nextjs.org/docs/app/api-reference/config/next-config-js/output).

The repeat mobile audit after the fix scored **83 performance, 100 accessibility, 100 best practices and 66 SEO**. FCP was 1.2 seconds, LCP 3.0 seconds, TBT 470 milliseconds and CLS 0.002. LCP request discovery passed, and estimated image-delivery savings dropped to 4 KiB. Reports are saved as `.artifacts/lighthouse-final.report.json` and `.html`. Further performance review should focus on main-thread work and be repeated on staging; the current simulated LCP and TBT leave room for improvement. Preview indexing remains deliberately disabled.

## Reproduction

From `website/`, install the lockfile dependencies with `npm ci`, then run:

```sh
npm run lint
npm test
npm run build
npm run typecheck
npm start
```

In a separate terminal, run `npm run test:browser`. On systems without an installed Chrome or Edge executable, run `npx playwright install chromium` first. The Windows workspace can load the portable toolchain with `scripts/tool-env.ps1`.

To test configured form states, start a separate production server with a non-production HTTPS `CONTACT_WEBHOOK_URL` and a dummy `CONTACT_WEBHOOK_TOKEN`, then run `node scripts/inquiry-ui-check.mjs` with `TEST_BASE_URL` pointing to that server. The script intercepts the inquiry API; it does not deliver test data to the configured receiver.

Run `scripts/verify-sources.ps1` from PowerShell to repeat the protected-source check. The GitHub workflow repeats lint, unit tests, build, type checking, source verification and browser checks on Linux.

## Remaining external validation

- Confirm approved company copy, branding, product details and real case studies.
- Configure an approved contact receiver, then test an authorized end-to-end inquiry delivery.
- Configure the final domain and indexing only for the approved public release.
- Select analytics and configure a separate Zeabur deployment. No live deployment has been performed.
- Verify the supplied Dockerfile in the deployment environment; the local standalone server has been tested, but a local Docker image build has not.
- Measure performance again on staging with the final infrastructure and media.
