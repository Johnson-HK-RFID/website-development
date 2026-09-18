# Design and Content Decisions

## Building construction and bilingual presentation — 18 September 2026

The latest user direction replaces blue accents and generated hero imagery with neutral surfaces, construction orange, Barlow Condensed display headings and real building-site photography. English and Traditional Chinese share the preserved page structure. Read [BUILDING_DESIGN.md](BUILDING_DESIGN.md) for reference analysis and locale behavior, and [PHOTOGRAPHY.md](PHOTOGRAPHY.md) for sources and motion.

## Direction

An engineering-led corporate website for built-world operators and integration partners. The layout prioritizes clear commercial options, structured technical information and a consistent route from site requirements to discussion.

The source documents define company positioning and content architecture but do not specify a visual identity. The current presentation uses graphite, off-white, concrete grey and construction orange. Self-hosted Barlow Condensed provides English display typography; Geist and system CJK fonts provide body and Chinese typography. The Manrope wordmark and its geometry are retained. The user supplied the reference direction; final brand approval remains a company decision.

`DESIGN_VARIANCE: 7`, `MOTION_INTENSITY: 3`, `VISUAL_DENSITY: 3`. Motion is limited to brief interaction feedback and ordinary scrolling, with reduced-motion support. Controls use a consistent 2-pixel radius; content uses open layouts and square surfaces. Color tokens follow the system light/dark preference, with one consistent theme throughout each page. Both themes have been checked for contrast.

See [UI_REDESIGN.md](UI_REDESIGN.md) for the audit and redesign decisions. The user explicitly required all existing text and content structure to remain intact; a rendered-content baseline checks that constraint across all 15 routes.

## Source mapping

- Preserve Embuilded as the company, TRACI as its core platform and the five named TRACI plugins.
- Preserve all nine initial routes and generate six detail routes from the initial solution-page list.
- The homepage features Gas, HookCam, Vision, Worker and Asset through their corresponding solution entries. BCDS links to the TRACI plugin family because no independent BCDS solution page is specified.
- Outrigger Monitoring appears in the full solution catalog, matching the initial detail-page list.
- Siren is named in the source brand hierarchy but lacks category or capability details. It is not presented as a specification-ready product.
- Device cards describe supported categories rather than invented SKUs or technical specifications.
- Case studies have an explicit empty state; no fictional projects, clients or results are shown.
- Website copy is based on the provided drafts. Copy refinements are review proposals, not new factual claims or approved legal statements.

## Visual assets

The live website uses the credited CC0 photographs recorded in [PHOTOGRAPHY.md](PHOTOGRAPHY.md). The earlier generated architectural asset is retained in the repository for history but is no longer displayed. Its historical generation record follows.

- Generation method: built-in image generation tool.
- Original saved asset: `website/public/images/built-world-concept.png`.
- Web asset: `website/public/images/built-world-concept.webp`, 1536 × 1024, quality 82, 272,032 bytes.
- Icons: compact, regular-weight Phosphor SVGs for controls and specific device categories. Large decorative broadcasting, document, layered-stack and person glyphs have been removed. The existing logo geometry is rendered as an SVG.
- TRACI diagram: semantic HTML labels with SVG connections based on the source device/intelligence/evidence architecture. It is a conceptual system explanation, not an operational dashboard. The central intelligence stage connects to the partner-platform interface below.
- The existing concept image is presented in a wide architectural crop with reduced saturation in CSS. Its unchanged caption sits below the image.

### Image prompt

Use case: stylized-concept. Asset type: architectural hero image for the Embuilded corporate website. Create a refined photorealistic architectural concept image, landscape 1536x1024: elevated view across a modern coastal city construction site with unfinished pale concrete towers, structural framing, a single orange tower crane, orderly work areas, and distant hazy high-rise buildings. Hong Kong built-environment character without showing identifiable buildings or actual company installations. Sophisticated architectural editorial photography, soft bright overcast daylight, cool grey concrete, muted tones and natural textures. Wide calm composition, buildings concentrated in center and right, clear foreground structure. No people close up, no signs, no letters, no logos, no UI overlays, no technology light trails, no futuristic holograms. This is an illustrative concept scene, not a representation of a real Embuilded project.

## Interaction decisions

- Catalog categories combine with text search; empty results offer a reset action.
- Mobile navigation is a disclosure menu with named controls, Escape handling and closing after navigation.
- Contact links can preselect the relevant service or solution.
- Without delivery configuration, the inquiry form creates a real local project-brief file. With an approved receiver, the same form supports consent, validation, pending, success and error states.
- No platform logins, ecommerce, CMS or production TRACI connection were introduced.
