# Embuilded Website Delivery Plan

## Scope and source protection

Build the corporate website from the preserved strategy, content architecture and build plan. The complete directory `references/website-requirements/aa55356c7615/source/Embuilded-website--main` is read-only for this project. Track progress here and in supplemental documents.

Delivery repository: `https://github.com/Johnson-HK-RFID/website-development.git`. The user's latest instruction authorizes delivery to `main`, subject to preserving any existing remote history and files.

## Milestones

- [x] Read and map original requirements.
- [x] Record the protected source checksums.
- [x] Set up a local Node.js, Git and GitHub CLI toolchain.
- [x] Inspect the delivery repository: the target is empty and has no remote refs.
- [x] Establish GitHub write authentication; the signed-in account has ADMIN access.
- [x] Define the visual system and source-backed content model.
- [x] Implement the nine main pages and six solution pages.
- [x] Implement filtering, responsive navigation and the inquiry flow.
- [x] Add metadata, sitemap, deployment configuration and operating instructions.
- [x] Verify source preservation, content, accessibility, responsive layout and production build.
- [x] Commit the website, preserved references and delivery documentation.
- [ ] Push to main and verify the remote commit.

## Current activity

Implementation and functional verification are complete. All seven inquiry unit tests passed. Browser tests verified 15 routes, 40 viewport/page combinations, 39 internal destinations and the main interactions, with no automated WCAG A/AA violations. Color contrast findings were corrected. A final performance audit identified a missing native image library in the Windows standalone build; the build now explicitly includes these libraries and an image-resizing regression check. The final production package is being rechecked before push. GitHub authentication is complete and the empty target repository is verified. See [VERIFICATION.md](VERIFICATION.md) for the verification record.

## Decisions

- Next.js App Router, TypeScript, Tailwind CSS and structured content.
- English public copy for the first review, based on the source drafts; additional locales remain a future decision.
- Design interpretation: an engineering-led corporate site for built-world operators and integration partners, with precise typography, restrained motion and useful system diagrams.
- `DESIGN_VARIANCE: 6`, `MOTION_INTENSITY: 3`, `VISUAL_DENSITY: 4`.
- Provisional visual palette: ink, off-white and safety orange. These are review choices, not existing approved brand assets.
- No fabricated customers, installations, certifications, device specifications or outcome statistics.
- Case-study content requires approved source material. A composed empty state will distinguish this from published case studies.
- Contact delivery requires a real destination. Provide a functional project-brief download without credentials, plus a server-validated delivery integration when configured. Never report a sent message without delivery confirmation.

## External dependencies

A contact delivery destination, deployment credentials, final domain and approved brand/project assets remain open. GitHub write authentication is complete. Continue independent implementation and testing while operational configuration remains open.
