---
name: lumix-seo-readiness
description: Audit and prepare Lumix Studio SEO changes for lumixstudio.co, including public-page crawlability, search descriptions, Google index evidence, AI search access, and Netlify release readiness. Use for this repository's SEO work and pre-release search checks.
---

# Lumix SEO readiness

Work against the current repository and live site; treat historical audit figures as observations with dates, not current facts. This skill supplements general SEO knowledge with Lumix-specific constraints.

## Repository and release boundary

- Canonical site: `https://lumixstudio.co/`. The repository contains static HTML pages with page-specific head metadata and JSON-LD. Inspect `netlify.toml`: Netlify currently publishes the repository root and bundles `netlify/functions`.
- Audit or local-fix requests do not authorize a push, merge, Netlify deployment, or submission of customer messages. Obtain explicit release authorization for the prepared result unless the user has already provided it for this release. Local branches, previews and validation can proceed.
- Preserve contact-form behavior, WhatsApp destinations, booking URLs, backend functions, secrets and domain redirects unless changes to them are needed and authorized. Never add credentials to a skill or report.
- Derive routes from actual `index.html` pages and the sitemap. Do not hardcode an audit count. Exclude 404s, internal work files and redirects from the list of pages intended to rank.

## Audit and fix

1. Compare the public routes with `sitemap.xml`. Verify canonical HTTPS URLs, valid XML, accurate modification dates, and absence of excluded/error URLs. Update modification dates only when the page actually changes; do not advance dates to suggest freshness.
2. For every public page, inspect title, main description, canonical, robots directives, viewport, language, headings, images and structured data. Keep WebPage JSON-LD and social metadata consistent with that page. Titles and descriptions should be specific and useful; character counts are editorial guides, not indexing requirements. Do not promise that Google will use the supplied description verbatim.
3. Read main content from raw HTML as well as the rendered page. Confirm that service, price, contact and location information is available without JavaScript or a login. Check hidden content, `nosnippet`, `data-nosnippet`, restrictive `max-snippet`, and crawler-specific meta directives when relevant.
4. Check live status codes, redirect destinations, `X-Robots-Tag`, content types, robots.txt and resources. Resolve all internal links, including fragments across pages. Confirm a nonexistent URL returns a real 404. A locally passing file check does not prove deployed header behavior.
5. Read the current Search Console index report with its update date. Distinguish an indexed URL, an excluded URL, a successful live eligibility test, and a requested indexing action. For excluded important URLs, inspect crawl access, fetch result, declared/selected canonical and discovery evidence; do not assume a successful fetch explains Google's exclusion. Do not repeatedly submit unchanged URLs or mark validation complete before a correction exists.
6. Inspect mobile readability and contact paths on modified pages. Do not send enquiries as a test. Use field performance data if available; otherwise identify lab measurements as such. Do not invent a performance or authority score.

The repository's `work/check-site.py` provides existing static checks with Python's standard library. Inspect it before running because its content assumptions can become stale. If Python is unavailable, use an available HTML parser to check equivalent invariants and state what was tested; do not silently claim that script passed. Keep temporary dependencies, servers and reports outside production files where possible.

## Search intent and truthful offers

- `/diseno-web-guatemala/`: web-design service searches, including diseño de páginas web en Guatemala.
- `/planes/`: prices and plan comparisons, including cuánto cuesta una página web en Guatemala.
- `/seo-local-guatemala/`: local SEO, with accurate audit/consulting coverage where applicable.
- `/guia-pagina-web-guatemala/`: preparation and buying guidance.

Strengthen these existing pages before making overlapping keyword pages. Put direct answers in visible content and use descriptive contextual links. Adding a phrase alone does not establish relevance, trust or a ranking improvement.

Verify current prices and terms from the source and owner instructions. Do not invent prices for plans quoted to scope, project counts, client outcomes, testimonials, addresses, reviews or package limits. Treat promotions as dated offers and preserve their eligibility and exclusions. Real work examples are preferable to fabricated proof or stock imagery labeled as clients.

For the existing Impulso promotion, read `docs/seo/impulso-offer.json` and run `node .agents/skills/lumix-seo-readiness/scripts/check-offer.cjs` from the repository root. This checks price arithmetic, documented amounts, advertised dates and the complete offer terms. It does not replace editorial review of where each price is presented.

## AI and search crawler access

Read current primary guidance before changing crawler controls:

- [OpenAI crawlers](https://developers.openai.com/api/docs/bots): `OAI-SearchBot` governs automatic ChatGPT search crawling. `ChatGPT-User` is user-triggered access; `GPTBot` is training-related. Search visibility does not require granting training access.
- [Anthropic crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler): distinguish `Claude-SearchBot`, `Claude-User`, and training-related `ClaudeBot`.
- [Google crawlers](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers): Googlebot affects Search. `Google-Extended` is a control token, not a separate HTTP user agent, and covers specified Gemini training/grounding uses rather than Google ranking.
- [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features): normal Search eligibility and useful content apply; no special AI schema or machine-readable AI text file guarantees inclusion.

Evaluate the existing wildcard robots group before adding bot-specific groups. Preserve restrictions on internal paths; a new specific group can override wildcard restrictions. Do not broaden training permissions or weaken firewall/security settings merely to pursue citations. Requests with simulated user-agent names can reveal basic blocking but cannot prove access from genuine crawler networks. Check verified bot logs or provider live tools when available.

## Review output

When competitor research is requested, inspect their actual service, price and supporting pages. Record the research date and verify current offers directly when search snippets differ. Infer targeting from titles, headings and links, but do not present keyword presence as measured ranking, backlink authority or conversion success. Compare inclusions, renewals and price conditions before comparing headline prices. Adapt useful decision support and content structure to Lumix's verified offer; do not import competitor prose, results, package limits or guarantees. Keep recommendations distinct from implemented local changes.

Report confirmed findings separately from hypotheses and untested areas. Include page-by-page eligibility, current index evidence, local versus deployed differences, checks performed and remaining blockers. “Can be indexed,” “indexed,” “ranking,” and “cited in an AI answer” are different outcomes. Never claim universal indexing or citations.

Provide a reviewable local diff and preview. Before an authorized release, check against the then-current production branch, re-run appropriate checks, and inspect Netlify branch settings. After publication, verify actual public responses and inspect important URLs again. Indexing requests enter a queue; they are not indexing confirmations. Track Guatemala service queries alongside enquiries and bookings using equal reporting periods.
