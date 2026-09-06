# Iconography

Icons help people find familiar actions. Pair them with labels when the meaning needs explanation.

## Choose an icon

Check the Icon registry and existing Phosphor icons first. Use the same icon and weight for the same role. Choose from `sizeVars.iconXs`, `iconSm`, `iconMd`, and `iconLg`.

An icon's visible size is different from its touch target. Provide enough space to press small icons, and prefer the existing icon size props on Button.

## Accessible names

Add an `aria-label` to icon-only buttons. Hide decorative icons beside text with `aria-hidden` to avoid repeating the label. A tooltip does not replace a required accessible name.

## Alignment

Align Toast status icons to the title's first line and keep the close icon at that line on the right. Do not move icons to the center of the entire message when the description wraps. Keep one icon for the same action.
