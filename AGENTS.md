# Embuilded Website Agent Entry Point

Read [`docs/AGENT_HANDOFF.md`](docs/AGENT_HANDOFF.md) before changing the website. It contains the current product concept, design direction, architecture, protected-source rule, commands, deployment target and completed work.

Non-negotiable rules:

- Never modify `references/website-requirements/aa55356c7615/source/Embuilded-website--main`.
- Develop the Next.js application under `website/`.
- Preserve English and Traditional Chinese routes and existing approved business copy unless the user requests a copy change.
- Keep photography sources and licences in the internal manifests; do not show stock-library attribution captions in the public interface.
- Use the established warm neutral, charcoal and construction-orange visual system. Avoid emoji, blue-purple AI gradients, fabricated dashboards and generic AI imagery.
- Run `scripts/verify-sources.ps1` and the relevant website checks before committing.
- Publish only to `https://github.com/Johnson-HK-RFID/website-development.git` on `main` through `scripts/publish.ps1`.

