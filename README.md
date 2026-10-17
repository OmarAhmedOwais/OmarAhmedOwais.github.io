# Omar Ahmed — Software Engineer Portfolio
Live site: https://omarahmedowais.github.io/

A responsive, dependency-free portfolio with real product screenshots, verified company logos, expandable contribution notes, an accessible screenshot viewer, resume download, contact card, and profile sharing.

## Update and deploy
GitHub Pages publishes the `main` branch from the repository root. Upload changed files or push a commit. No custom domain or build process is required.

## Analytics setup
Set `ga4MeasurementId` in `analytics-config.js` to the owner's GA4 web data stream ID (`G-...`). It is intentionally empty until supplied; analytics is not active.

With a valid ID, the consent banner appears. No Google script loads until the visitor accepts. Visitors can decline or withdraw through Analytics preferences. Advertising storage, advertising personalization, and Google signals are disabled. Configure GA4 Enhanced Measurement to disable form interactions and site-search collection; this portfolio uses explicit click events and sends a canonical URL without query strings. The site has no newsletter signup or contact form.

Events: `page_view`, `resume_download`, `project_visit`, `project_preview`, `project_details`, `contact_email`, `copy_email`, `save_contact`, `linkedin_connect`, and `github_follow`. These measure engagement and do not identify visitors or enable unsolicited contact. Test the configured stream in GA4 DebugView/Realtime after deployment. No successful GA connection is claimed while the ID is empty.

## Discoverability and keeping in touch
Canonical URL, Open Graph and Twitter cards, a locally hosted social image, Person structured data, robots.txt, sitemap.xml, RSS feed, email copy, share action, contact-card download, and GitHub/LinkedIn links are included. Submit sitemap.xml to the owner's Google Search Console property after verifying ownership. Search ranking and traffic are not guaranteed. RSS updates are manual: add a new truthful item to feed.xml when publishing new work.

## Assets and attribution
Public screenshots captured October 17, 2026:
- EduMarket: https://edumarket.io/
- Spark: https://sparkplatform.app/
- Views: https://views.properties/en
- Jam3ty: https://jam3ty.net/ (public sign-in page only)

Company logos were obtained from their official public websites, except Raise Right from its official LinkedIn company page. Logos identify employment history and remain the property of their respective owners. Professional project descriptions explain Omar's contributions; current public UI screenshots do not imply sole authorship or ownership of the full product.

## Development
Run `python3 -m http.server 8000` in this folder. Edit index.html for content, style.css for presentation, and script.js for interactions. Replace Omar-Ahmed-Resume.pdf to update the resume. An optional professional portrait can be added later.
