# Embuilded Website Requirements Supplement

Status: first implementation verified and delivered to GitHub main. Final brand assets and operational configuration remain open.

## 1. Source baseline

This supplement records the requirements in the user-provided `Embuilded-website--main.zip`. The original documents are preserved in the [source reference directory](../references/README.md).

| Source | Coverage |
| --- | --- |
| [WEBSITE_STRATEGY.md](../references/website-requirements/aa55356c7615/source/Embuilded-website--main/WEBSITE_STRATEGY.md) | Positioning, brand hierarchy, audiences and commercial layers |
| [CONTENT_ARCHITECTURE.md](../references/website-requirements/aa55356c7615/source/Embuilded-website--main/CONTENT_ARCHITECTURE.md) | Navigation, homepage sections, platform capabilities and content categories |
| [TASKS.md](../references/website-requirements/aa55356c7615/source/Embuilded-website--main/TASKS.md) | Delivery phases, recommended stack, initial routes and deployment boundary |

The ZIP contains these three substantive documents and a title-only README. It contains no application code, logo files or photography. The archive is labeled `main`, but no remote commit has been verified. Snapshot identity and archive checksum are recorded in the [manifest](../references/website-requirements/aa55356c7615/source-manifest.json).

Original files remain unchanged. Record proposed improvements in supplemental files and preserve the draft meaning. Subsequent explicit user clarifications take precedence.

## 2. Positioning and audiences

Company: **Embuilded Intelligence Limited**. Core positioning: **Embedded intelligence for the built world.**

Embuilded connects field devices, operational data and evidence for construction, infrastructure and the wider built environment. TRACI is its core technology platform. The company also provides field engineering, connected hardware integration and managed device services.

The strategy identifies end users seeking complete solutions, main contractors and built-world operators, SSSS and 4S providers, AI and CCTV partners, and system integrators.

The partner proposition is to retain the partner's own platform while using Embuilded's field engineering, connected devices and managed infrastructure.

## 3. Brand and service structure

- Company: Embuilded Intelligence Limited.
- Technology platform: TRACI.
- Platform plugins: Safety, Vision, Asset, BCDS and SSSS.
- Devices and solutions: Gas, HookCam, Outrigger, Worker, Siren, RFID and related systems.
- Services: field engineering, systems integration and managed services.

The three commercial layers are Field Engineering Services, Connected Hardware + Engineering, and Managed Device & Software Services. Preserve these distinctions when writing service copy and engagement options.

## 4. Information architecture

The build plan specifies nine initial routes:

| Navigation | Route |
| --- | --- |
| Home | `/` |
| TRACI | `/traci` |
| Solutions | `/solutions` |
| Devices | `/devices` |
| Services | `/services` |
| Partners | `/partners` |
| Industries | `/industries` |
| About | `/about` |
| Contact | `/contact` |

The content architecture also calls for initial solution pages covering Gas Monitoring, HookCam, Outrigger Monitoring, Worker Tracking, Site Vision, and RFID / Asset Tracking. Their detail-page URL patterns are not specified in the drafts.

### Homepage

Preserve the intended sequence: positioning hero; what TRACI does; key solutions; three ways to work with Embuilded; TRACI architecture; partner proposition; industries; case studies; contact action.

The homepage solution shorthand names Gas, HookCam, Vision, Worker, Asset and BCDS. This differs from the initial solution-page list. Record a mapping decision before treating those labels as identical page inventories.

### TRACI

Describe a modular device, intelligence and evidence platform for the built world. Required capability coverage includes connectivity, device health and lifecycle management, telemetry and events, alerts, evidence capture, rules and workflows, reporting, API integration, and multi-site operations.

### Services, partners and industries

Use the source descriptions for field deployment, connected hardware and managed device/software services. The three partner engagement models are engineering only, hardware + engineering, and managed device service.

Industries are Construction, Infrastructure, Property and facilities, and Industrial.

## 5. Technology and content model

The build plan recommends Next.js, Tailwind CSS, MDX or structured content files, GitHub and Zeabur. The implementation uses TypeScript, App Router and structured content files.

Create reusable content types for plugins, solutions, devices, industries, services and case studies. New products should be addable mainly through content entries without rewriting page components.

The public website must remain a separate application and deployment from TRACI production. LaFenice may inform design language and product concepts; it is not the corporate website application.

Deployment tasks include a separate Zeabur website project, GitHub connection, preview/staging, the Embuilded domain, analytics, a contact form, SEO metadata and a sitemap. These are planned tasks, not completed integrations.

## 6. Open decisions

- Brand colors, typography, grid, components, diagram style and photography direction are explicitly unfinished in the build plan.
- Homepage, TRACI, Services, Partners, solution and About copy has been drafted from the source documents and requires company review.
- Devices, About and Contact have initial routes but limited detailed content requirements.
- Actual case studies, product specifications, approved imagery, contact details and form delivery destination are not provided.
- Public website languages, domain value and analytics provider are not specified.
- Detailed BCDS and SSSS plugin claims require further source material. The homepage-to-solution-page mapping is recorded in [DESIGN_DECISIONS.md](DESIGN_DECISIONS.md).

Do not invent evidence, performance claims, customers, certifications, contact details or completed integrations to fill these gaps.

## 7. Development and preservation

Use the [traceability register](requirements-traceability.md) to connect implementation decisions to the source drafts. Use the [project frontend skill](frontend/skills/hkrfid-website-frontend/SKILL.md) for project constraints during later design and implementation.

Keep original source files unchanged. The application occupies the new `website/` directory. Before a push, inspect the actual target history and preserve existing paths and file objects. The user explicitly authorized `main` in the new `Johnson-HK-RFID/website-development` repository. Do not overwrite originals or force-push.

## 8. Current status

Both source references are available locally: the company requirements ZIP and the original taste-skill snapshot. The company drafts have been read, and this supplement now reflects their contents.

The application in `website/` implements the nine main pages, six solution detail pages, structured catalogs, responsive navigation and an inquiry workflow. Draft copy and visual decisions are documented in [DESIGN_DECISIONS.md](DESIGN_DECISIONS.md). Deployment configuration is documented in [DEPLOYMENT.md](DEPLOYMENT.md).

The production build, seven inquiry tests, linting, 15-route browser checks, 40 responsive layout checks and automated accessibility checks passed. Corrected findings include color contrast and native image libraries missing from the standalone build. See [VERIFICATION.md](VERIFICATION.md) for evidence and limits, and [ACTION_PLAN.md](ACTION_PLAN.md) for delivery status.

The user's delivery target is `Johnson-HK-RFID/website-development`, with `main` explicitly authorized. The implementation was pushed to that initially empty repository, its remote commit verified, and its GitHub Actions checks passed. The original source repository remains the requirements baseline. No live hosting deployment has been performed.
