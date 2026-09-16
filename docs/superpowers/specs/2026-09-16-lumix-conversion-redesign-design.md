# Lumix Studio conversion redesign

Date: 2026-09-16

## Objective

Improve the existing Lumix Studio website as a client-acquisition experience for small and growing businesses in Guatemala. Preserve the current warm editorial identity, human photography, forest-green and ivory palette, typography, cinematic motion, responsive behavior, static HTML/CSS/JavaScript stack, Netlify functions, forms, and WhatsApp contact paths.

The redesign must help a new visitor quickly understand what Lumix does, see representative work, choose an appropriate solution, trust the studio, and start a qualified conversation.

## Scope

This is a focused restructuring and refinement of the current site, not a rebuild. The work covers the homepage journey, shared plan presentation, calls to action, founder and trust content, project concepts, process communication, mobile readability, accessibility, performance hygiene, and related SEO consistency.

Existing service pages, the Guatemala guide, contact flow, 404 page, Netlify functions, sitemap, robots file, metadata system, structured data, and working navigation remain in place unless a small consistency fix is required.

## Verified starting point

- The deployed site and recovered source match.
- The site uses static HTML, CSS, and JavaScript with no frontend framework.
- The public homepage has valid canonical, Open Graph, Twitter, Organization, WebSite, and WebPage metadata.
- `robots.txt` allows public crawling and references a sitemap containing the ten public pages.
- WhatsApp links point to `+502 4493-1218` and already include prefilled messages.
- The contact form prepares a WhatsApp message for the visitor to review and send; it does not silently transmit or store a submission.
- Motion is progressive enhancement and respects `prefers-reduced-motion`.
- There are three existing design concepts: Cafetería, Servicios profesionales, and Tienda local. They are not client case studies and must remain explicitly disclosed as concepts.
- No verified client results, testimonials, awards, project counts, or performance statistics are available.
- No dark-mode implementation or theme switch exists in the recovered source or deployed public assets. This project will preserve the established light visual system and will not invent a new theme requirement.

## Design direction

Keep the existing premium-but-approachable editorial character: warm ivory surfaces, forest green, muted sage, restrained clay, human photography, serif accents, deliberate asymmetry, thin rules, small radii, generous spacing, and controlled motion.

Avoid generic agency patterns, glossy SaaS styling, excessive glass effects, neon glows, floating particles, anonymous corporate language, fake proof, and decorative motion that delays action.

## Homepage information architecture

The homepage will follow this conversion sequence:

1. Navigation
2. Hero with direct positioning and two clear actions
3. Compact trust and delivery indicators
4. What Lumix solves / service pathways
5. Proyectos Lumix
6. How Lumix works
7. Plans
8. Founder and studio trust
9. Final contact invitation
10. Footer

The current cinematic photography and distinctive editorial moments remain, but the long introductory journey will be compressed or repositioned so it does not delay the service and proof content.

## Hero

Retain the existing human café photograph, editorial scale, and core sentiment: “Tu negocio ya tiene valor. Hagamos que se note.”

The supporting message will state plainly that Lumix creates professional digital experiences for businesses in Guatemala that want to look better, get found, generate opportunities, and turn visits into customer conversations.

Actions:

- Primary: “Solicitar cotización” → contact page
- Secondary: “Ver proyectos” → homepage project section
- WhatsApp remains persistently available through the existing floating contact action.

Include the short invitation: “Cuéntanos sobre tu negocio y te mostramos cómo podemos ayudarte.” The hero must remain visually calm and must not gain a third competing button.

## Trust indicators

Add a compact, low-noise strip immediately after the hero. It will use only truthful, already offered capabilities such as:

- Diseño personalizado
- Responsive
- Dominio, hosting y SSL
- WhatsApp y formularios
- SEO local
- Acompañamiento

This is not a statistics bar. It should communicate delivery confidence without looking like a corporate certification row.

## Services

Preserve the three existing pillars and their destination pages:

- Diseño web
- SEO local
- Automatización

Present each in terms of the customer problem and next action. Keep the current custom visual treatments where they remain readable. The section should answer what Lumix does before asking the visitor to compare plans.

## Proyectos Lumix

Reframe the current concept showcase as the primary proof section and place it before process and plans.

Heading: “Proyectos Lumix”

Supporting copy: “No solo diseñamos páginas. Creamos experiencias pensadas para convertir visitas en oportunidades.”

Use the three existing concepts only:

- Cafetería — “Menú, ubicación y pedidos directos por WhatsApp”
- Servicios profesionales — “Servicios claros y solicitudes de consulta”
- Tienda local — “Catálogo visual y consultas de disponibilidad”

Every item must display “Concepto Lumix” prominently and retain the explicit disclosure that it is not client work or evidence of results. Each item includes a strong visual preview, category, outcome-oriented line, and contextual CTA. Do not create fake live-project URLs.

Desktop may use a controlled asymmetric or selected-project presentation. Mobile must use normal-flow cards or an accessible selection pattern with no hover dependency.

## Process

Move process before plans and communicate five short stages:

1. Cuéntanos sobre tu negocio
2. Diseñamos la experiencia
3. Construimos y conectamos
4. Publicamos
5. Te acompañamos

The presentation should be easy to scan and link to the existing detailed process page. It must not use scroll hijacking or animation that prevents reading.

## Plans

Keep Impulso, Crecimiento, and Expansión, and retain personalized quotations rather than fixed prices.

### Impulso

- Decision headline: “Necesito verme profesional”
- Promise: establish or improve a credible digital presence.
- Use existing inclusions: responsive website, domain, hosting, SSL, WhatsApp, and contact form.
- CTA: “Solicitar cotización”

### Crecimiento

- Label: “Más elegido”
- Decision headline: “Quiero que me encuentren y me contacten”
- Promise: improve visibility and lead capture.
- Use existing inclusions: Impulso foundation, WhatsApp or reservations, Google Business, and basic/local SEO.
- CTA: “Quiero crecer”

This card receives stronger visual emphasis through color and hierarchy, not increased height or aggressive effects.

### Expansión

- Decision headline: “Quiero automatizar parte de mi negocio”
- Promise: connect advanced customer and operational flows.
- Use existing inclusions: Crecimiento foundation, automation, online appointments, and priority support.
- CTA: “Hablar sobre mi proyecto”

Shared plan components on the homepage and plans page must stay consistent. Buttons and feature-list starts should align at desktop sizes without forcing awkward empty space on mobile.

## Founder and trust

Combine the strongest parts of the existing studio introduction and personal note into a more concise trust sequence. Identify Nestor Ordonez as founder without making the section self-promotional.

The core message: Lumix was created to make professional digital solutions accessible to businesses without a cold, overly corporate agency experience. Keep the established “escuchamos primero y diseñamos después” idea.

Do not add a founder photograph unless an approved real photograph already exists. The current monogram treatment is acceptable.

## Calls to action and WhatsApp

Use contextual language rather than repeating one phrase everywhere. Approved patterns include:

- Solicitar cotización
- Ver proyectos
- Quiero mejorar mi presencia digital
- Hablar por WhatsApp
- Cuéntanos sobre tu proyecto
- Hablar sobre mi proyecto

WhatsApp messages should include the source context when useful, such as the selected plan or concept. The general message will remain natural and specific to improving a business’s digital presence.

All WhatsApp links must retain `target="_blank"` and `rel="noopener noreferrer"`.

## SEO and semantics

Preserve the existing indexable architecture and unique service pages. Strengthen natural associations with Lumix Studio Guatemala, diseño web en Guatemala, páginas web para negocios, desarrollo web, SEO local, and digital solutions without keyword stuffing.

Requirements:

- One clear H1 per page
- Logical H2/H3 order after restructuring
- Descriptive image alt text
- Canonical and social metadata retained
- Existing Organization/WebSite/WebPage graph retained
- Service and breadcrumb schema retained on service pages
- Sitemap coverage maintained if URLs remain unchanged
- Internal links from projects, services, plans, process, and guide remain crawlable
- No claims of guaranteed rankings or AI inclusion

## Accessibility and responsive behavior

- Keep the skip link, keyboard navigation, visible focus treatment, menu semantics, and progressive enhancement.
- Increase meaningful mobile text and CTA labels that currently render below 12px; decorative browser-preview microcopy may remain visually small only when it is not required to understand or operate the page.
- Touch targets must be at least approximately 44px high.
- No horizontal overflow at 320, 390, 768, 1024, and 1440px checks.
- Project content must not depend on hover.
- Tabs or selectors must keep accurate `aria-pressed`, `aria-controls`, and hidden states.
- Preserve readable content with JavaScript disabled.

## Motion and performance

Reuse the existing motion system. Prefer transform and opacity. Preserve `prefers-reduced-motion` handling and prevent motion from delaying navigation or CTA response.

Retain responsive WebP sources, explicit image dimensions, lazy loading below the fold, and high-priority loading for the hero. Do not add new dependencies or third-party scripts.

The cinematic hero may be simplified if necessary for clarity, but its visual identity should remain recognizable.

## Implementation boundaries

- Work in a fresh copy of the current production source for this task.
- Preserve Netlify functions and environment variable behavior.
- Do not deploy, publish, push, or change production accounts.
- Do not create client claims, testimonials, statistics, or real-project labels.
- Do not add fixed pricing.
- Do not create dark mode as part of this scope.
- Avoid unrelated refactors.

## Validation

Before handoff:

- Run JavaScript syntax checks and the existing structural/link checker.
- Verify all local page and asset references.
- Test navigation, mobile menu, project selector/cards, plans, process link, contact form preparation, and WhatsApp URLs.
- Check desktop, tablet, and mobile layouts, including 320px and 390px widths.
- Verify no horizontal overflow, missing assets, broken images, or console errors.
- Check heading hierarchy, metadata, canonical URLs, structured data, sitemap, and robots file.
- Confirm reduced-motion fallback and keyboard focus behavior.
- Review the homepage against the six visitor questions in the brief.

## Success criteria

Within the first screen and early scroll, a visitor should understand that Lumix Studio helps Guatemalan businesses build a professional digital presence, improve visibility, capture inquiries, connect through WhatsApp, and automate selected customer journeys.

Before reaching the plans, the visitor should have seen the offered service categories, representative Lumix concepts, and a simple explanation of the working process. The page should feel like the same Lumix brand—clearer, more credible, and easier to act on.
