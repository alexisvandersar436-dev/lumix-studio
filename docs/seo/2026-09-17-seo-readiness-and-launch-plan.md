# Lumix Studio SEO readiness and launch plan

Date: 2026-09-17  
Canonical domain: `https://lumixstudio.co/`  
Review scope: 10 HTML pages, shared assets, Netlify configuration, live domain, mobile layout, and public Google visibility.

## Executive result

The review build has a strong technical SEO foundation and passes the automated local audit with no technical failures. The live domain is accessible and crawlable, but the new review build is not deployed and Google Search Console ownership has not been verified from the site. A public Google search check did not surface `lumixstudio.co` results during this review.

The remaining launch-critical sequence is:

1. Approve and deploy the review build.
2. Verify the `lumixstudio.co` domain property in Google Search Console, preferably with a DNS TXT record.
3. Submit `https://lumixstudio.co/sitemap.xml` in Search Console.
4. Inspect the homepage and priority service URLs, then request indexing.
5. Monitor Page Indexing, Crawl Stats, Core Web Vitals, and search queries after launch.

Submitting a sitemap is a discovery hint rather than a guarantee of indexing. Google also evaluates content quality, technical accessibility, and canonical signals.

## Checklist status

| Requirement | Status | Evidence / action |
|---|---|---|
| `sitemap.xml` | Ready | Contains all 10 canonical URLs and accurate `2026-09-17` modification dates. |
| `robots.txt` | Ready | Allows crawling and references the canonical sitemap. |
| Remove `noindex` | Ready | All 10 pages use `index,follow,max-image-preview:large`; no `noindex` directives remain. |
| Canonical tags | Ready | Unique self-referencing HTTPS canonical on every page. |
| Meta titles | Ready | Unique on all pages; 44–56 characters. |
| Meta descriptions | Ready | Unique on all pages; 138–154 characters. |
| One H1 per page | Ready | Exactly one H1 on each of 10 pages. |
| Heading hierarchy | Ready | No skipped heading levels or empty headings. |
| Image alt text | Ready | All 15 image uses have descriptive alt text and explicit dimensions. |
| Schema markup | Ready | Valid JSON-LD on every page: Organization, WebSite, WebPage, BreadcrumbList, and relevant Service types. |
| Internal links | Ready | 155 internal links; every page receives internal links; no orphan pages. |
| Broken links | Ready | No broken internal routes or fragments. Instagram and WhatsApp destinations returned HTTP 200. |
| Image compression | Ready | Content images use WebP, responsive `srcset` variants where useful, and lazy loading below the fold. The social image is an optimized 1200 × 630 PNG. |
| Core Web Vitals groundwork | Improved | Hero image is preloaded and prioritized; below-fold images are lazy-loaded; images reserve dimensions; JavaScript is deferred; static assets receive cache headers. Field metrics require the deployed build and real traffic. |
| Mobile responsiveness | Ready | All 10 routes tested at a 390 px browser viewport: 16 px body text, one H1, and no horizontal overflow. |
| HTTPS | Ready | Live HTTP and `www` variants resolve to the HTTPS apex domain. Netlify rules reinforce 301 canonical redirects and HSTS. |
| Clean URL slugs | Ready | Lowercase, hyphenated, descriptive routes with consistent trailing slashes. |
| Open Graph image | Ready | Every page includes the 1200 × 630 Lumix social image, dimensions, alt text, and matching Twitter card tags. |
| Search Console verification | Account action required | No verification token is installed. Use DNS verification after deployment, or provide the HTML verification token for insertion. |
| Backlink strategy | Prepared | See the 90-day plan below. |

## Search Console launch steps

These steps require the owner’s Google account and DNS access:

1. Open Google Search Console and add a **Domain property** for `lumixstudio.co`.
2. Copy the TXT verification record Google provides into the domain’s DNS settings.
3. Complete ownership verification.
4. Submit `https://lumixstudio.co/sitemap.xml` under **Sitemaps**.
5. Use **URL Inspection** for these priority URLs:
   - `https://lumixstudio.co/`
   - `https://lumixstudio.co/servicios/`
   - `https://lumixstudio.co/diseno-web-guatemala/`
   - `https://lumixstudio.co/seo-local-guatemala/`
   - `https://lumixstudio.co/contacto/`
6. Request indexing for the homepage and priority service pages. Use the sitemap for discovery of the remaining pages.
7. Check Page Indexing and Crawl Stats weekly for the first month. Record the reason for any excluded URL before changing the site.
8. Review Core Web Vitals after enough field data is collected; lab tests alone cannot confirm real-user results.

## 90-day backlink strategy

The goal is to earn relevant, trustworthy references—not to manufacture link volume. Do not buy ranking links, use automated link services, or submit the site to low-quality bulk directories.

### Days 1–30: establish trusted business references

- If Lumix qualifies as a service-area business, claim and verify its Google Business Profile and add the canonical website URL.
- Make the website, business name, telephone, email, and service area consistent across Instagram and every legitimate business profile.
- Select three to five credible Guatemalan business, professional, or industry listings where Lumix genuinely belongs. Prefer verified organizations and real memberships over generic directories.
- Ask existing vendors, technology partners, and professional associations to add Lumix to their partner or member pages when that relationship is real.

### Days 31–60: earn links through client work

- Publish two detailed case studies with the client’s permission: business challenge, design approach, screenshots, and measurable result.
- Give each featured client a short project summary and image they may publish on their own site, with a natural attribution link to the case study.
- Create one partner case study with a photographer, copywriter, marketing consultant, or business advisor serving the same audience.
- Add a concise “Website by Lumix Studio” credit only when a client voluntarily approves it; never make followed links a contractual requirement.

### Days 61–90: create a link-worthy local resource

- Expand the current website guide into a genuinely useful Guatemala-focused resource, checklist, or cost-planning worksheet.
- Pitch the resource to relevant local entrepreneur communities, chambers, coworking spaces, training programs, and business publications as an educational reference.
- Offer one practical workshop or webinar for small businesses and give the hosting organization a landing page they can cite.
- Turn the strongest questions from the workshop into two original articles, then pitch expert commentary—not duplicated guest posts—to relevant publications.

### Measurement

- Target six to ten new, relevant referring domains in the first 90 days.
- Track referring domains, linked page, link context, first-seen date, and resulting qualified visits.
- Favor branded and natural anchors such as “Lumix Studio,” the article title, or the plain URL.
- Review suspicious links monthly, but do not disavow normal low-value links without evidence of a manual action or a sustained manipulative pattern.

## Authoritative references

- [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: Canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: Ask Google to recrawl URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Google spam policies for links](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google Business Profile eligibility and setup](https://support.google.com/business/answer/7039811)
- [Netlify HTTPS and HSTS guidance](https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/)

