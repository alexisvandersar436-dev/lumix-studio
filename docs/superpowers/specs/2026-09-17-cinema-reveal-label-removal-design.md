# Cinema reveal label removal

## Goal

Remove the low-contrast `Una presencia que se siente.` label from the homepage photo reveal while preserving the stronger `Tan real como tú.` message.

## Change

- Remove only the small label inside `.cinema-reveal` on the homepage.
- Keep the reveal container, large statement, photograph, animation timing, positioning, and mobile behavior unchanged.
- Do not replace the label with a badge, background, icon, or additional copy.

## Verification

- Confirm the small label no longer appears during the desktop reveal.
- Confirm `Tan real como tú.` still animates and remains readable.
- Confirm mobile behavior is unchanged.
- Run the existing site checks and review the local homepage before deployment.
