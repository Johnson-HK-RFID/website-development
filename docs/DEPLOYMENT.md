# Deployment and Operations

## Repository and application

Delivery repository: `Johnson-HK-RFID/website-development`.

The Next.js application lives in `website/`. Use that directory as the service root. Keep this website in a separate Zeabur project and deployment from TRACI production.

## Local development and preview

```sh
cd website
npm ci
npm run dev
```

For a production preview:

```sh
npm run build
npm start
```

The production start script copies public/static assets into the standalone build and starts the generated server. It uses `PORT` when supplied, otherwise Next.js defaults to 3000. Development binds to localhost. Production binds to `0.0.0.0` by default for container compatibility.

## Zeabur deployment

1. Create a separate website project and connect the delivery repository.
2. Set the service root to `website/`.
3. Use the included Dockerfile, with build context `website/`, or a Node.js service using `npm ci`, `npm run build`, and `npm start`.
4. Set the build and runtime variables below. For Docker, pass `SITE_URL` and `SITE_INDEXABLE` as build arguments as well as runtime variables. Never pass the webhook token as a build argument.
5. Deploy a preview with indexing disabled. Test the public routes, inquiry flow and image delivery.
6. Connect the approved domain. Rebuild with the actual `SITE_URL`; enable indexing only when launch content is approved.

The Dockerfile uses Node.js 24 and a non-root runtime user. A container build and a live Zeabur deployment require the corresponding runtime/account and are separate verification steps from local Next.js checks.

## Configuration

| Variable | Purpose | Default behavior |
| --- | --- | --- |
| `SITE_URL` | Public origin used by canonical metadata and sitemap | No canonical URLs or sitemap entries when absent; social-image base falls back to local preview |
| `SITE_INDEXABLE` | Set exactly `true` only for a launch-ready production build | Robots excludes crawling and metadata uses noindex |
| `CONTACT_WEBHOOK_URL` | Approved HTTPS endpoint for inquiry delivery | Sending unavailable; visitors can download a project brief |
| `CONTACT_WEBHOOK_TOKEN` | Server-only bearer credential for that endpoint | Sending remains unavailable without a nonempty token |
| `CONTACT_EMAIL` | Optional approved contact email shown on the Contact page | No email address is displayed |
| `PORT` | Runtime listening port | 3000 |

Static metadata, robots and sitemap reflect build-time settings. Rebuild when changing domain or indexing policy. Contact configuration is evaluated on the server for each Contact request.

## Inquiry delivery contract

When configured, the server sends JSON to the approved HTTPS endpoint with `Authorization: Bearer <token>`. The payload contains `name`, `email`, `company`, `service`, `message`, `consent`, `source` and `submittedAt`.

The receiver must durably accept the inquiry before returning a successful 2xx response. Endpoint redirects are rejected. Requests time out after eight seconds; a failure is shown to the visitor without clearing their input. Configure the receiver or hosting edge with shared rate limiting and monitoring before public launch. The form includes a honeypot, origin checking, field validation and a request-body limit; these do not replace infrastructure-level abuse controls.

Without a receiver, the page offers a local text-file download and explicitly states that the brief has not been sent. No credentials, company mailbox or delivery destination have been invented.

## Content updates

Edit `website/src/content/site.ts` to add or update solution, device, service, industry, plugin and case-study entries. Solution pages are generated from the structured entries. Validate related slugs and internal links when changing content.

Approved case-study records are currently absent. The homepage displays a clear empty state. Brand assets, product specifications and project claims require approved source material before publication.

No analytics provider has been selected or embedded. Add only the approved analytics integration after determining its configuration and applicable visitor-notice requirements.

## Validation and source protection

Run the commands in the root README and inspect the actual reports. `scripts/verify-sources.ps1` checks the protected source files against their SHA-256 baseline. Keep all action plans and delivery records in `docs/`; do not edit the preserved source directory.

## Publishing from the Windows workspace

After all changes are reviewed and committed, run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/publish.ps1
```

The script checks the target remote, branch, working tree and source checksums. If necessary, it opens the standard GitHub device login flow. It then pushes `main` without force and verifies the remote commit. Browser authentication must be completed by an account with write access to the target repository. A non-fast-forward rejection requires review rather than an overwrite.
