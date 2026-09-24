# Engineering Photography and Motion

Date: 22 September 2026

## Design interpretation

Building construction is the primary engineering context. Real cranes, scaffolding and high-rise structures support the positioning without inventing company projects. The photographic opening replaces the generated architectural concept in the live interface. The previous bridge/dam proposal was superseded before delivery. See [BUILDING_DESIGN.md](BUILDING_DESIGN.md) for the neutral and construction-orange visual direction.

The user's request for sourced photography takes precedence over the upstream taste-skill preference for generated assets. None of these third-party photographs represents an Embuilded installation, customer, product or case study.

## Selected photographs

### September 22 additions

The editorial iteration adds three Pexels images and one locally encoded, silent film. These use the [Pexels License](https://www.pexels.com/license/), not CC0. The license permits website use and editing, prohibits implied endorsement, and does not permit redistribution as a stock library. In-context captions identify illustrative stock scenes; no person or site is presented as an Embuilded employee or project.

| Placement | Source | Author |
| --- | --- | --- |
| Homepage opening | [Tower crane and concrete structure](https://www.pexels.com/photo/construction-site-with-big-tower-crane-7121536/) | Audrey Walsh |
| Partnership areas | [Residential construction in evening light](https://www.pexels.com/photo/crane-on-a-building-5027559/) | Ilya |
| Services and services-page image | [Workers assembling reinforcement](https://www.pexels.com/video/men-working-on-construction-site-10810476/) | This Viktọ |
| Homepage background film and poster | [Hong Kong construction-site timelapse](https://www.pexels.com/video/time-lapse-video-of-a-construction-site-5698648/) | Site Engine |

Source dimensions, optimized byte sizes and SHA-256 hashes are tracked in [field-media-manifest.json](frontend/field-media-manifest.json). Images are local WebP files. The homepage field series now includes three photographs made in Hong Kong: a large building site, a facade construction team and an urban tower crane. The 1440-pixel H.264 timelapse is approximately 1.95 MB at 24 fps, with source audio removed and fast-start metadata. It autoplays muted and loops without a click or visible playback control. Reduced-motion, data-saving and no-JavaScript conditions show the local poster without loading video. The 15-second duration is the source clip length, not a project metric. The original files and processing evidence remain in ignored local review artifacts.

### Existing CC0 collection

Each individual Wikimedia Commons file description identifies the photograph as **CC0 1.0**. The two building-site photographs were dedicated to the public domain by their respective contributors. The facade and industrial photographs were published on Unsplash before its June 2017 license change and carry individual CC0 evidence on Commons. This assessment uses each image's license section rather than Commons' general metadata license. See the [Creative Commons deed](https://creativecommons.org/publicdomain/zero/1.0/).

| Application | Photograph and source | Photographer | Rationale |
| --- | --- | --- | --- |
| Homepage, About and Construction | [LOHAS Park construction, February 2024](https://commons.wikimedia.org/w/index.php?oldid=895957891) | Hongang PettyHtan Loong01 | Tower cranes, scaffold protection and high-rise building structures in Hong Kong |
| Existing Infrastructure section | [LOHAS Park buildings under construction, April 2024](https://commons.wikimedia.org/w/index.php?oldid=946263127) | RMEYETUNGTA 152 | Building works rather than bridge or road imagery; the existing business category remains intact |
| Property & facilities | [Urban building](https://commons.wikimedia.org/w/index.php?oldid=1065858747) | Richard Pouncy Jr. | Building envelope and lighting establish the property context |
| Industrial | [Industrial Manufacturing](https://commons.wikimedia.org/w/index.php?oldid=808670457) | Ant Rozetsky | Steel structure and overhead lifting equipment support the secondary industrial application |

The [asset manifest](frontend/photography-manifest.json) records source revisions, license evidence, downloads, processing and SHA-256 hashes. Larger images include photographer/source and CC0 links. Homepage industry thumbnails link to the corresponding credited sections and use empty alt attributes to avoid repeating the link names. English and Traditional Chinese descriptions accurately identify the scenes.

## Delivery

- Local optimized WebP files reside in `website/public/images/industries/`; Next.js supplies responsive sizes without third-party image requests.
- The primary construction master is 1920 pixels wide. The other masters are 1440 pixels wide. Files are encoded at WebP quality 78 without upscaling; exact byte counts are recorded in the manifest.
- The homepage hero loads eagerly with high fetch priority. Secondary photographs load lazily. Reserved aspect ratios avoid image-induced layout shifts.
- Responsive crops, per-image focal points, restrained desaturation and a dark hero overlay support legibility. The protected source directory is unchanged.
- Existing English business copy and section order remain intact. Captions, credits and language navigation are separately tested additions.

## Motion specification

| Element | Behavior | Purpose |
| --- | --- | --- |
| Industry photographs | 480 ms entrance, opacity 0.35 to 1 and vertical displacement 12 px to 0, once per page visit | Introduce the physical environment as it enters view |
| Industry image links | 1.025 hover scale over 450 ms on pointer devices | Modest interaction feedback |
| TRACI connections | Two existing SVG connections draw over 620 ms each, 220 ms apart | Explain the progression from devices through intelligence to evidence |

No looping effects, autoplay video, scroll interception or simulated live signals are used. IntersectionObserver and the Web Animations API enhance visible server HTML. Reduced-motion changes cancel active animations; navigation cleans up observers and listeners. Missing browser APIs fall back to static content.

## Verification

`npm run test:media` checks asset hashes, image delivery, responsive layouts, credits, light/dark accessibility, motion, reduced motion, client navigation and no-JavaScript rendering. The bilingual suite checks localized layouts and navigation. Completed results are recorded in [VERIFICATION.md](VERIFICATION.md).
