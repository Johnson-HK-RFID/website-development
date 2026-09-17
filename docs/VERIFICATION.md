# Verification Record

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

The browser report and review screenshots are generated under `.artifacts/browser/`, outside version control. Automated accessibility results do not constitute a complete manual accessibility certification.

## Performance review

The initial mobile Lighthouse run scored 77 for performance, 100 for accessibility, 100 for best practices and 66 for SEO. Its only failing SEO audit was the intentional preview `noindex` directive. The run reported FCP 1.2 seconds, LCP 3.9 seconds, TBT 430 milliseconds and CLS 0.002. Lighthouse also warned that the host CPU was slower than its expected baseline; these are local simulated measurements, not production field data.

The audit exposed a real packaging issue: the Windows standalone output omitted Sharp's dynamically loaded DLLs and silently served the original 272,032-byte image. The build now explicitly includes native image dependencies, and the hero image has a high fetch priority and corrected responsive sizing. A browser regression check verifies that the image endpoint returns an actual 640-pixel image. This follows the [Next.js standalone file-tracing guidance](https://nextjs.org/docs/app/api-reference/config/next-config-js/output).

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
