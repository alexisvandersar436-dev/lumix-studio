# Lumix Studio

Production website for https://lumixstudio.co, approved September 8, 2026.

Ten static HTML routes, responsive WebP imagery and progressive scroll animation. The contact form prepares a WhatsApp message; it does not submit or store customer data. The retired receptionist widget is not loaded.

Netlify publishes the repository root and bundles the existing netlify/functions backend. Production secrets remain in the hosting environment and must never be committed. Existing backend functions and configuration were preserved for this release.

Each route includes its own metadata and structured data. robots.txt and sitemap.xml describe the public website. The 404 page is excluded from indexing.

The approved source templates and local review notes are retained in the owner's Codex workspace. Local preview serving code is not part of production.
