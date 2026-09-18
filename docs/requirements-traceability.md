# Embuilded Requirements Traceability

Status: implementation and visual redesign verified and delivered to GitHub main; local and GitHub Actions checks passed. The redesign preserves all existing page text and structure, verified against a rendered-content fixture.

## Source baseline

### Explicit user additions, 18 September 2026

| ID | Requirement | Implementation and acceptance |
| --- | --- | --- |
| USER-018 | Building construction imagery; no blue/purple visual identity; reference five construction websites | [Building design record](BUILDING_DESIGN.md), local CC0 building photographs, neutral/orange tokens, rendered responsive review |
| USER-019 | English and Chinese website | Fifteen English routes and fifteen Traditional Chinese equivalents; language control, localized metadata, search, validation and brief downloads; `test:i18n` |
| USER-020 | Preserve existing content and protected originals | Original English content fixture retained with explicit photo/language-control allowances; source checksum verification |

Source: user-provided `Embuilded-website--main.zip`, extracted into snapshot `aa55356c7615`. The archive label is `main`; its remote commit is unknown. Use the [source manifest](../references/website-requirements/aa55356c7615/source-manifest.json) to identify the reviewed artifact.

- **Strategy:** [WEBSITE_STRATEGY.md](../references/website-requirements/aa55356c7615/source/Embuilded-website--main/WEBSITE_STRATEGY.md)
- **Architecture:** [CONTENT_ARCHITECTURE.md](../references/website-requirements/aa55356c7615/source/Embuilded-website--main/CONTENT_ARCHITECTURE.md)
- **Tasks:** [TASKS.md](../references/website-requirements/aa55356c7615/source/Embuilded-website--main/TASKS.md)

## Source requirements

Acceptance conditions below are proposed checks derived from the cited source sections. They are not executed test results or additional product scope.

| ID | Source section | Requirement | Proposed acceptance condition |
| --- | --- | --- | --- |
| WEB-001 | Strategy / Core positioning; Brand hierarchy | Present Embuilded as the company and TRACI as its platform. | Company, platform, plugins and services are consistently distinguished. |
| WEB-002 | Strategy / Website audiences; Main message for channel partners | Address end users and channel partners, including partners retaining their own platforms. | Homepage and Partners copy provide relevant paths and preserve the partner proposition. |
| WEB-003 | Architecture / Primary navigation; Tasks / Phase 3 | Provide the nine named top-level pages and initial routes. | All listed routes resolve and the navigation reaches each page. |
| WEB-004 | Architecture / Home | Cover the nine listed homepage sections. | Each section has source-backed content or an explicitly unresolved content dependency. |
| WEB-005 | Architecture / TRACI | Explain the modular platform and nine capability categories. | All source capabilities are covered without adding unsupported guarantees. |
| WEB-006 | Architecture / Plugins | Represent Safety, Vision, Asset, BCDS and SSSS as TRACI plugins. | Plugin entries retain their source names; unspecified descriptions remain open. |
| WEB-007 | Architecture / Solutions | Provide the six initial solution pages. | Gas Monitoring, HookCam, Outrigger Monitoring, Worker Tracking, Site Vision and RFID / Asset Tracking have content entries and agreed routes. |
| WEB-008 | Strategy / Three commercial layers; Architecture / Services | Preserve three distinct service layers. | Service descriptions cover the source scope and maintain the commercial distinctions. |
| WEB-009 | Architecture / Partners | Explain engineering-only, hardware + engineering and managed-device engagement models. | Partner content explains all three models and compatibility with a partner's platform. |
| WEB-010 | Architecture / Industries | Cover four named industry categories. | Construction, Infrastructure, Property and facilities, and Industrial are represented. |
| WEB-011 | Tasks / Phase 3; Phase 4 | Use the recommended stack and reusable content types. | Technical decisions address the source stack, and products can be added through structured content. |
| WEB-012 | Tasks / Architecture boundary | Separate the corporate website from TRACI production. | Application configuration and deployment do not depend on changing production TRACI services. |
| WEB-013 | Tasks / Phase 5 | Plan Zeabur staging, domain, analytics, contact form and SEO setup. | Each integration has recorded configuration and verification before it is marked complete. |

WEB-001 through WEB-012 are represented in the first implementation. WEB-013 has metadata, preview indexing controls, sitemap generation, inquiry delivery support, a Dockerfile and deployment instructions. Live Zeabur deployment, domain configuration, analytics selection and a real inquiry receiver remain pending. Case studies have an explicit empty state until approved records are supplied.

Implementation lives in `website/src/app/`, with reusable content in `website/src/content/site.ts`. Validation evidence is recorded in [VERIFICATION.md](VERIFICATION.md); delivery and open dependencies are tracked in [ACTION_PLAN.md](ACTION_PLAN.md). The original source task checkboxes remain untouched and describe the author's planning status.

## User constraints

| ID | Constraint | Current evidence |
| --- | --- | --- |
| USER-001 | Base the website on repository drafts. | All three substantive source documents reviewed; requirements mapped above. |
| USER-002 | Preserve original source files. | Original ZIP retained locally; all four extracted source files match their recorded SHA-256 checksums. The source repository has not been modified. |
| USER-004 | Prefer Next.js. | Also recommended in Tasks / Phase 3. |
| USER-005 | Adapt taste-skill to the project. | Original snapshot retained; source-specific workflow and the implemented visual decisions are documented. Final brand approval remains open. |
| USER-006 | New deliverables may be pushed to the repository. | Delivered to the authorized main branch in Johnson-HK-RFID/website-development. Remote commit verified and GitHub Actions passed. |

## Open decisions

| Topic | Evidence or clarification required |
| --- | --- |
| Visual identity | Approved logo, colors, typography, diagrams and imagery; source design-system tasks are unfinished. |
| Content completeness | Case studies, device specifications, About copy, contact details and solution/plugin descriptions. |
| Website locales | Resolved by the 18 September user instruction: English default and Traditional Chinese (Hong Kong). |
| Integration details | Domain, analytics provider, form delivery destination and staging configuration. |

When additional evidence arrives, append its source and update the corresponding decision without rewriting the preserved drafts.
