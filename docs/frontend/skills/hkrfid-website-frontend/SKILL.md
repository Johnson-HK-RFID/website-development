---
name: hkrfid-website-frontend
description: Develop the HKRFID-HQ/Embuilded-website- frontend from its existing repository drafts, applying project-specific taste-skill guidance while preserving original remote files. Use for this website's requirement interpretation, visual design, implementation and review.
---

# Embuilded Website Frontend

## Scope and status

This is a project-local adaptation informed by [taste-skill](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md), not a modification of its upstream package. It is self-contained and does not require a globally installed skill.

The three source drafts in the user-provided repository ZIP have been read. Use the source brief below and the linked requirement records. Detailed copy, brand assets and visual settings are still open; do not treat proposed visual choices as source-approved decisions.

Read the [requirements supplement](../../../requirements-draft.md) and [traceability register](../../../requirements-traceability.md) for current decisions. Apply this skill to this company website, not unrelated frontend projects.

## Source brief

- Embuilded Intelligence Limited is the company; TRACI is the technology platform. Preserve the positioning, "Embedded intelligence for the built world."
- The audience includes complete-solution buyers, main contractors, built-world operators, SSSS and 4S providers, AI/CCTV partners and system integrators. Make the partner proposition clear: retain the partner's platform while using Embuilded infrastructure.
- Preserve the nine initial routes: `/`, `/traci`, `/solutions`, `/devices`, `/services`, `/partners`, `/industries`, `/about` and `/contact`.
- Keep the three commercial layers distinct: field engineering, connected hardware + engineering, and managed device & software services.
- Use structured content for plugins, solutions, devices, industries, services and case studies. Distinguish the homepage solution labels from the initial solution-page list until their mapping is resolved.
- The source recommends Next.js, Tailwind CSS, MDX or structured content, GitHub and Zeabur. Keep the corporate website application and deployment separate from TRACI production. LaFenice is a potential design reference, not a production dependency.
- Brand colors, typography, diagrams and imagery remain undefined. Product specifications, real case studies and contact destinations are missing. Do not manufacture those details.
- The local ZIP permits source review; it does not establish authenticated remote access or a known Git commit. Obtain the remote baseline before pushing changes.

## Project constraints

- Use existing drafts in `HKRFID-HQ/Embuilded-website-` as the content and functionality baseline. Later explicit user clarifications take precedence and must be recorded.
- Support English and Traditional Chinese (Hong Kong), as explicitly requested on 18 September 2026. Preserve English URLs and use `/zh-HK` for Chinese equivalents.
- Preserve all original remote paths, file contents and modes. Add supplemental documents and application files at unused paths; do not translate, rename or edit original files in place.
- The assistant-authored local planning draft may be updated as requested. It is not an original remote source document.
- The user has authorized pushing new deliverables. Use the preservation checks below without asking for the same authorization again. Authentication and actual repository permissions still have to work.
- The current delivery target is `Johnson-HK-RFID/website-development`. The user has explicitly authorized `main` for this new repository; the original HKRFID-HQ repository remains the source of requirements.

## Source-first workflow

1. Verify the target repository, read its applicable instructions and record the baseline branch and commit. Inventory the original files before generating a destination layout.
2. Read the drafts and relevant assets. Link each extracted requirement to a source path, heading and commit in the traceability register.
3. Preserve the meaning of drafts when summarizing requirements. Keep technical qualifiers, units and limitations. Mark unclear or conflicting statements as open decisions.
4. Define the page tree, visitor actions and content coverage from that evidence. Do not add membership, ecommerce, a CMS, language variants or contact integrations merely because they are common website features.
5. If source access fails, continue independent documentation and access setup. Do not invent business copy, a sitemap, brand identity or a supposedly finished source-based homepage.

## Adapt taste-skill to the brief

Before implementing visual components, record a short design interpretation naming the page type, audience, brand evidence and intended tone. Cite the source evidence. Record `DESIGN_VARIANCE`, `MOTION_INTENSITY` and `VISUAL_DENSITY` with a brief justification; leave them undecided while the brief is unread.

Project-specific choices override generic aesthetic defaults:

- Preserve documented brand colors, typography and approved logos. Select layout and spacing to support the actual content and visitor task.
- Preserve required technical detail. Use structured sections, accessible tables or appropriate disclosure when justified; do not remove specifications to meet generic marketing-copy limits.
- Use a consistent visual system and clear hierarchy. Layout variation is useful only when it improves the content structure.
- Use repository-approved product photography and diagrams as factual evidence. Generated imagery may be a clearly identified concept asset when appropriate; never present it as a real product, installation, customer or certification.
- Do not invent customer logos, testimonials, statistics, capabilities or contact details for visual completeness.
- Choose animation for a concrete communication or interaction need. A static, usable implementation is valid. Support reduced motion for animated behavior and avoid effects that obscure required content.
- Treat theme support as a brief-dependent decision. Do not add a theme switch or override an existing brand presentation without a requirement or documented proposal.
- Keep essential actions readable and accessible across responsive layouts. Preserve one clear label per action intent where repeated.

These rules retain the useful design discipline of the reference while fitting the user's source and preservation requirements. They do not introduce a new business brief.

## Implementation boundaries

### Current visual-overhaul constraint

The user has explicitly authorized a full redesign of the delivered application while retaining all copy, section order, URLs and behavior. This permits editing application files in `website/`; the protected requirement snapshots remain unchanged. Apply the upstream taste-skill redesign protocol directly and use [UI_REDESIGN.md](../../../UI_REDESIGN.md) as the current visual decision record.

- Preserve the rendered content baseline, heading order, field order, anchors and metadata.
- Follow [BUILDING_DESIGN.md](../../../BUILDING_DESIGN.md), which supersedes the earlier blue direction: neutral black, concrete grey, white and restrained construction orange. Use Barlow Condensed for English display headings, Geist for body copy and readable system Traditional Chinese fallbacks. Retain the existing wordmark geometry and typeface.
- Reference the photographic scale, typography hierarchy and project-led composition of the five construction websites supplied by the user. Do not copy their proprietary fonts, logos, imagery or claims.
- Prioritize building construction, cranes, scaffolding and high-rise structures. Do not use bridge or road photography as the primary engineering identity.
- Reserve compact SVG icons for actual controls and recognizable device categories. Do not reintroduce decorative emoji, large generic document/person/broadcast glyphs, fake waveforms or dashboard-like illustrations.
- Use semantic diagram labels and SVG connections to explain relationships. A system diagram is not a product screenshot or evidence of live operational data.
- Review the actual rendered desktop, 960-pixel tablet and mobile screens, including both system color schemes. Passing automated checks alone does not establish visual quality.
- The user has requested open-license engineering photography. Follow [PHOTOGRAPHY.md](../../../PHOTOGRAPHY.md): use individually verified CC0 sources, local responsive assets and accurate scene descriptions; preserve source and license records. New photography may add captions and source credits without rewriting existing business copy.
- The 22 September user direction is recorded in [EDITORIAL_DESIGN.md](../../../EDITORIAL_DESIGN.md), superseding the condensed uppercase presentation above. Use sentence-case Geist headings, construction photography, worker footage and deliberate editorial composition; retain the existing wordmark.
- Verified Pexels License assets are now allowed alongside CC0 assets. Preserve individual source, author, license and checksum records. Stock workers and sites must not imply company employment, endorsement or completed projects.
- The user's later Imprezz reference explicitly supersedes click-to-play video. Use motion intensity 6: a muted, looping, inline construction timelapse, once-per-visit staggered entrances, reading progress and purposeful hover/focus feedback. Provide pause/resume, reduced-motion and data-saving poster fallbacks; retain visible server-rendered content and avoid simulated-live interfaces.

### Technical boundaries

- Evaluate Next.js App Router and TypeScript against the existing project before scaffolding. If adding files at the root would modify originals, choose an unused application directory and document its commands.
- Check declared dependencies and compatible versions before imports. Prefer a coherent existing component and icon family rather than adding competing libraries.
- Default presentation to Server Components and isolate interactive client code. Add state, animation libraries and backend services only when the confirmed flow requires them.
- Keep source-backed content separate from presentation where practical so translations and claim reviews can be traced.
- Use real link destinations. For required forms and remote data, implement applicable validation, loading, empty, failure and successful completion states. Never show successful delivery without delivery confirmation.

## Verification and delivery

Check required content against the traceability register. Exercise critical interactions, keyboard navigation, narrow and wide layouts, long copy and required locales. Verify contrast, focus, image alternatives and reduced-motion behavior where applicable. Run the relevant type, lint and production-build checks; record what ran and any blockers honestly.

Before a push:

1. Compare the proposed tree against the recorded original tree. Every original path, mode and file object must match. New paths must not collide with existing content.
2. Review the staged change list explicitly. It must contain additions only for the first delivery under this constraint; do not stage unrelated workspace files or credentials.
3. Build the new branch from existing remote history. Never replace it with an unrelated local root commit or force-push.
4. If the default branch advanced, inspect the new tree for path collisions and preservation conflicts before updating the work. Stop dependent work on a collision rather than overwriting another contributor's file.
5. Use the user's explicitly authorized target branch. For the new empty delivery repository, this is `main`; for later work, preserve the actual remote history and avoid force-pushing. Verify the remote commit and report its URL. Do not imply a deployment or successful authentication that did not occur.

The user can review source-based improvements as new documents and application files while the original drafts remain intact.
