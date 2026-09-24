# Embuilded Website — Agent Handoff

## Start here

This repository contains a bilingual corporate website for Embuilded Intelligence Limited. The working application is in `website/`. The requirements source is read-only and lives at `references/website-requirements/aa55356c7615/source/Embuilded-website--main`.

The current product concept is **embedded intelligence for the built world**: connect field devices, engineering, operational data and evidence into practical systems for building construction and related operations. TRACI is the platform layer connecting devices, intelligence, workflows and evidence. The target audience includes contractors, construction operators, engineering buyers, system integrators and technology partners in Hong Kong and international markets.

## Basis for development

Work is based on:

1. The protected requirement drafts and reference content in the path above.
2. The adapted frontend guidance in `docs/frontend/skills/hkrfid-website-frontend/SKILL.md`.
3. The approved English business-copy snapshot enforced by `npm run test:content`.
4. The Traditional Chinese dictionary in `website/src/i18n/zh-HK.json`.
5. The design and implementation records in `BUILDING_DESIGN.md`, `EDITORIAL_DESIGN.md`, `DESIGN_DECISIONS.md`, `PHOTOGRAPHY.md` and `VERIFICATION.md`.

## Current design direction

- Editorial construction-company presentation inspired by established engineering and contractor websites.
- Warm off-white paper, charcoal and restrained construction orange; no blue-purple AI gradients.
- Real building-construction photography, with Hong Kong context where possible.
- No emoji, decorative AI icons, fake telemetry, fake dashboards or unsupported project claims.
- Homepage: full-viewport, muted, looping Hong Kong construction timelapse with no playback chrome. Reduced-motion and data-saving visits receive the poster.
- Photography is integrated into useful layout space. There is no standalone stock-photo gallery and no public stock-source caption.
- Inner pages use a contextual top image. Page entry uses a short layered rise/fade; the image carries very slow drift. Reduced-motion mode disables these effects.
- English routes use `/`; Traditional Chinese routes use `/zh-HK`.

## Technical architecture

- Next.js 16 App Router, React 19 and TypeScript.
- `next-intl` locale routing and translation.
- Local fonts, images and video. No runtime stock-media dependency.
- Shared UI components: `website/src/components/`.
- Business data: `website/src/content/site.ts`.
- Primary visual overrides: `website/src/app/editorial.css`; base system: `website/src/app/globals.css`.
- Progressive motion: `website/src/components/engineering-motion.tsx`.
- Inquiry form supports local brief download and optional configured delivery.

## Media and licensing

Public pages must not display Pexels, photographer or CC0 attribution captions. Retain all evidence internally:

- `docs/frontend/field-media-manifest.json`
- `docs/frontend/photography-manifest.json`
- `docs/PHOTOGRAPHY.md`

Do not imply that stock workers, sites or projects belong to Embuilded.

## Commands

From the repository root in PowerShell:

```powershell
Set-ExecutionPolicy -Scope Process Bypass -Force
. .\scripts\tool-env.ps1
.\scripts\verify-sources.ps1
```

From `website/`:

```powershell
. ..\scripts\tool-env.ps1
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:content
npm run test:film
npm run test:media
npm run test:i18n
npm run test:browser
npm run test:visual
```

Start the built site with `npm run start`. On this Windows environment, restart the local Next.js server between large browser suites if the image optimizer reports `NoFallbackError`.

## Delivery

- GitHub: `https://github.com/Johnson-HK-RFID/website-development.git`
- Branch: `main`
- Production: `https://website-development-rust.vercel.app/`
- Vercel project: `rfid4/website-development`
- Vercel root directory: `website`

After a clean commit, run `scripts/publish.ps1`. Then wait for GitHub Actions and Vercel, and verify the public production alias in a real browser.

## Current state and next work

The core bilingual site, navigation, solution/device filtering, inquiry brief, SEO routes, responsive layouts, homepage film, integrated construction photography, inner-page hero media and motion system are implemented. Before new work, read the newest entries at the top of `ACTION_PLAN.md` and `VERIFICATION.md`. Record each material iteration there with what changed, why, validation results, commit, CI run and deployment.

