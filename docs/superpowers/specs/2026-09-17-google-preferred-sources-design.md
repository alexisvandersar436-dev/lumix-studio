# Google Preferred Sources footer integration

## Goal

Add Google's official Preferred Sources control to Lumix Studio without interrupting the site's primary sales journey or weakening mobile usability and performance.

## Placement and presentation

- Display the control in the footer on every public page.
- Add a compact row immediately above the copyright line.
- Use the heading `Sigue a Lumix en Google` and the supporting text `Encuentra nuestras novedades con mayor facilidad.`
- Keep the official Google button visually secondary to Lumix's contact and quotation actions.
- On desktop, place the copy and button on opposite sides of the row.
- On mobile, stack the copy above a full-width button.
- Match the existing Lumix typography, colors, borders, and spacing. Do not imitate or alter Google's button artwork.

## Integration

- Load Google's official Preferred Sources publisher library asynchronously.
- Render Google's standard localized control with the light theme and Spanish language preference.
- Add the control to all ten indexable pages that share the Lumix footer.
- Reserve sufficient button space in the layout to reduce movement while the external control loads.
- Keep the page usable if Google's script is unavailable; the footer and all primary actions must continue to work.

## Eligibility safeguard

- Confirm that `lumixstudio.co` appears in Google's Source Preferences tool before production deployment.
- If the domain is not selectable, keep the integration local and do not deploy a nonfunctional promotion.

## Accessibility and responsive behavior

- Preserve keyboard navigation and Google's accessible button behavior.
- Maintain readable contrast and a touch target of at least 44 pixels.
- Avoid horizontal overflow at 320 pixels and above.
- Do not add animations or fixed-position elements.

## Verification

- Confirm the external script is asynchronous and loaded only once per page.
- Check the footer on desktop and mobile widths.
- Confirm the button opens Google's Preferred Sources selection flow and returns the visitor to Lumix.
- Run the existing site and SEO checks.
- Review the complete local preview before any deployment.

## Out of scope

- Publishing an articles or news section.
- Creating a Google Search Profile.
- Claiming that the button guarantees rankings, inclusion in AI answers, Top Stories, or Discover.
- Deploying before the user approves the real local preview.
