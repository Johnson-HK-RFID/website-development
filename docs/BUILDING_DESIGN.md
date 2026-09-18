# Building Construction and Bilingual Design

Date: 18 September 2026

## Decision and scope

The user rejected the blue/purple visual direction, requested building construction imagery and supplied five construction-company references. The same instruction adds English and Chinese. This record supersedes the palette and typography decisions in the earlier UI redesign; the protected requirement snapshots remain unchanged.

The audience remains contractors, built-world operators, engineering buyers and integration partners. The presentation should make the physical working environment immediately recognizable while keeping TRACI's technical relationships clear. Existing English business copy, section order, field order and original URLs remain the baseline. Photography captions and a language control are deliberate additions.

## Reference interpretation

| Reference | Observed approach | Application to Embuilded |
| --- | --- | --- |
| [Suffolk](https://suffolk.com/) | Large image/video opening, bold oversized sans-serif type and clear contrast | Full-width building-site opening with concise existing copy and visible calls to action |
| [McCownGordon](https://mccowngordon.com/) | Project and service content gives the business a concrete context | Use site imagery around existing industries and keep the solution structure clear |
| [Layton](https://www.laytonconstruction.com/) | Construction footage, strong split composition and expressive type hierarchy | Prioritize real building context and distinguish headings from technical body text |
| [Turner](https://www.turnerconstruction.com/) | Project imagery with restrained typography and generous space | Maintain breathing room and straightforward navigation |
| [Holder](https://www.holderconstruction.com/) | Full-width construction imagery and direct, prominent statements | Use photographic scale and robust headings to establish an engineering identity |

Four references were inspected in rendered desktop captures. McCownGordon's text was accessible, but its site returned HTTP 403 to the automated visual browser; no exact font or visual measurement is claimed for that reference. Reference screenshots are local review artifacts, not redistributed site assets. These references inform composition rather than a replica. Their proprietary fonts, videos and photographs are not included in this repository.

## Visual system

- **Surfaces:** off-white `#f8f8f6`, concrete grey, neutral graphite `#20201e` and white.
- **Accent:** construction orange `#b44516`, reserved for actions, markers, diagram edges and interaction feedback. No blue or purple accents.
- **English display type:** locally served Barlow Condensed 600. Its compact proportions allow strong engineering headings without expanding the original content.
- **Body type:** locally served Geist, with PingFang TC and Microsoft JhengHei fallbacks for Traditional Chinese. Chinese headings use a readable sans-serif proportion rather than forcing Latin condensed metrics.
- **Wordmark:** existing geometry and Manrope type retained.
- **Font licensing:** upstream font license notices are distributed in `website/public/licenses/` with the locally served fonts.
- **Opening:** a real Hong Kong building site with a dark overlay, existing positioning and two existing actions. Attribution sits beside the image rather than interrupting the message.
- **Other imagery:** building construction, a building facade and an industrial hall support the existing industry sections. See [PHOTOGRAPHY.md](PHOTOGRAPHY.md).
- **Diagrams and controls:** semantic labels and compact SVG controls. No decorative emoji or fabricated operational dashboards.
- **Design dials:** variance 7, motion 3, density 3. Variation comes from photographic scale, typographic hierarchy and alternating section treatment; motion remains brief and functional.

## Bilingual implementation

All fifteen existing pages have English and Traditional Chinese equivalents. English retains `/`, `/traci`, `/solutions`, and the other existing paths; Chinese uses `/zh-HK` and `/zh-HK/...`. A visible EN / Traditional Chinese control preserves the current page, query parameters and fragment during ordinary clicks. Without JavaScript, the language links still navigate to the equivalent page.

`src/app/[locale]` shares the page structure. `next-intl` provides locale context and locale-aware links. Native Next.js rewrites map original English URLs to the internal `en` segment. This avoids a proxy rewrite origin mismatch encountered when the standalone server's binding host differs from the request host. Explicit `/en` URLs redirect to the canonical unprefixed English path. Locale is selected from the URL, without automatic browser-language redirection.

The small request proxy passes only the URL language to the global 404 response; it does not rewrite URLs. Next.js's `globalNotFound` option supplies a complete localized error document, including its language and styles, without requiring client-side rendering. Page-level error boundaries live inside the locale document layout.

`src/i18n/zh-HK.json` maps the preserved English copy to Traditional Chinese. Product names and technical identifiers such as TRACI, HookCam, RFID, API and MQTT remain recognizable. Pages, navigation, accessible labels, image descriptions, catalog controls, validation, form status, downloaded project briefs and metadata are localized. Future copy changes must update the dictionary and run the bilingual checks.

Catalog searches accept English and Chinese terms. The inquiry form displays translated service labels while retaining canonical English service values for backend integration. User-entered Unicode content is preserved. The existing delivery configuration and honest download-only fallback remain in place.

Each page declares its language, canonical URL and English/Chinese alternate links. The configured public sitemap includes both locales. The preview remains excluded from indexing unless the existing deployment environment explicitly enables indexing. No new public deployment is implied by a repository push.

## Verification

Review captures: [English desktop opening](frontend/previews/building-home-desktop.webp) and [Traditional Chinese mobile opening](frontend/previews/building-home-chinese-mobile.webp).

Run the production build, type and lint checks, inquiry unit tests, existing English content comparison, browser suite, media/motion suite and bilingual suite. Inspect desktop, tablet and mobile captures manually. See [VERIFICATION.md](VERIFICATION.md) for the completed results and [ACTION_PLAN.md](ACTION_PLAN.md) for delivery status.

The original English content fixture is retained. Its comparison excludes only the new photography figures, the replaced architectural-concept caption and the new language control. It continues comparing headings, business copy, links, field order, anchors and document titles.
