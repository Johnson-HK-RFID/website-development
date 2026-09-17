# Embuilded Website

Corporate website for Embuilded Intelligence Limited, built with Next.js App Router, TypeScript and Tailwind CSS.

## Development

Use Node.js 24 LTS. From `website/`:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Copy `website/.env.example` to `website/.env.local` for local configuration.

The Windows workspace also includes optional portable-tool setup scripts. Run `scripts/bootstrap-tools.ps1` to download official tool archives. Load `scripts/tool-env.ps1` in a PowerShell session to use them. These helpers set process-local environment values only; `.tools/` is excluded from Git.

## Structure

| Location | Purpose |
| --- | --- |
| `website/src/app/` | Nine main pages, six solution pages, metadata and inquiry endpoint |
| `website/src/content/site.ts` | Structured solutions, devices, services, plugins, industries and case studies |
| `website/src/components/` | Shared layout, searchable catalogs and inquiry form |
| `docs/ACTION_PLAN.md` | Current delivery status and remaining work |
| `docs/DEPLOYMENT.md` | Configuration and deployment instructions |
| `docs/DESIGN_DECISIONS.md` | Visual rationale, content mapping and asset provenance |
| `docs/VERIFICATION.md` | Executed checks, results and remaining limitations |
| `references/website-requirements/` | Preserved user-supplied source requirements |

## Verification

```sh
cd website
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

With the server running separately, `npm run test:browser` checks all pages, responsive layouts, WCAG A/AA rules, navigation, filtering, the project-brief download and endpoint failure behavior. It uses an installed Chrome/Edge executable on Windows. On another environment, install Playwright Chromium (`npx playwright install chromium`) or set `TEST_BROWSER_PATH`. Results are written to `.artifacts/browser/` outside the application.

## Inquiry delivery

The default review configuration provides a project-brief download without sending personal data. Configure an approved HTTPS `CONTACT_WEBHOOK_URL` and `CONTACT_WEBHOOK_TOKEN` to enable sending. `CONTACT_EMAIL` optionally exposes an approved public email address. No contact destination is invented or hard-coded.

## Source preservation

The original source directory is never edited. Use `scripts/verify-sources.ps1` to compare its files to the stored checksums. Plans, clarifications and implementation records are maintained in `docs/`.

The public website remains independent of TRACI production. Deployment and domain setup are separate from committing the source code.
