# Design and Content Decisions

## Direction

An engineering-led corporate website for built-world operators and integration partners. The layout prioritizes clear commercial options, structured technical information and a consistent route from site requirements to discussion.

The source documents define company positioning and content architecture but do not specify a visual identity. Ink, off-white, muted green and a safety-orange action color are proposed review choices. Manrope provides the main typography; IBM Plex Mono distinguishes concise technical labels. The wordmark is a provisional typographic treatment, not an assertion of an approved corporate logo.

`DESIGN_VARIANCE: 6`, `MOTION_INTENSITY: 3`, `VISUAL_DENSITY: 4`. Motion is limited to brief hover feedback and ordinary scrolling, with reduced-motion support. Buttons use small radii, panels remain square, and circular controls are reserved for compact row actions.

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

The architectural image is an AI-generated concept, identified as such in its visible caption. It is not a photograph of an Embuilded installation or evidence of company work.

- Generation method: built-in image generation tool.
- Original saved asset: `website/public/images/built-world-concept.png`.
- Web asset: `website/public/images/built-world-concept.webp`, 1536 × 1024, quality 82, 272,032 bytes.
- Icons: Phosphor.
- TRACI diagram: semantic HTML and library icons based on the source device/intelligence/evidence architecture. It is a conceptual system explanation, not an operational dashboard.

### Image prompt

Use case: stylized-concept. Asset type: architectural hero image for the Embuilded corporate website. Create a refined photorealistic architectural concept image, landscape 1536x1024: elevated view across a modern coastal city construction site with unfinished pale concrete towers, structural framing, a single orange tower crane, orderly work areas, and distant hazy high-rise buildings. Hong Kong built-environment character without showing identifiable buildings or actual company installations. Sophisticated architectural editorial photography, soft bright overcast daylight, cool grey concrete, muted tones and natural textures. Wide calm composition, buildings concentrated in center and right, clear foreground structure. No people close up, no signs, no letters, no logos, no UI overlays, no technology light trails, no futuristic holograms. This is an illustrative concept scene, not a representation of a real Embuilded project.

## Interaction decisions

- Catalog categories combine with text search; empty results offer a reset action.
- Mobile navigation is a disclosure menu with named controls, Escape handling and closing after navigation.
- Contact links can preselect the relevant service or solution.
- Without delivery configuration, the inquiry form creates a real local project-brief file. With an approved receiver, the same form supports consent, validation, pending, success and error states.
- No platform logins, ecommerce, CMS or production TRACI connection were introduced.
