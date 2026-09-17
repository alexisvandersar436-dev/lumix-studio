# Numbered Automation Flow Design

## Goal

Make the homepage automation diagram read as a clear three-step process without unexplained or visually inconsistent symbols.

## Approved design

The three existing flow cards remain in the same order, with the same connecting line, wording, colors, and responsive layout:

1. `01` — Nueva consulta
2. `02` — Lumix conecta
3. `03` — Seguimiento listo

The decorative asterisk beside “Lumix conecta” and the isolated checkmark beside “Seguimiento listo” will be removed. Each card will receive the same compact numeric label in the same position so the composition feels balanced and the sequence is immediately understandable.

## Desktop behavior

- Keep the existing vertical three-card diagram.
- Align each number and label consistently within its card.
- Preserve the highlighted middle card to communicate Lumix’s role in the process.
- Keep the connecting line visually centered behind the cards.

## Mobile behavior

- Preserve the same three-step order and vertical flow.
- Keep numbers legible without increasing the cards’ overall height unnecessarily.
- Prevent labels and numbers from colliding at narrow widths.

## Accessibility

- Numbers will be real text rather than decorative pseudo-elements.
- The sequence will remain understandable without relying on color.
- Existing contrast and readable labels will be preserved.

## Verification

- Confirm the old asterisk and checkmark no longer appear.
- Confirm `01`, `02`, and `03` each appear once.
- Review desktop, tablet, and mobile layouts.
- Run the existing site checker and confirm no missing assets or page regressions.

## Scope

This change affects only the automation flow diagram. It does not alter the service description, links, plans, page structure, or deployment state.
