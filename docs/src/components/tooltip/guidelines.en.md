## Usage guidelines

### When to use

Use `Tooltip` for a short, supplementary explanation of a control, such as an icon's action or keyboard shortcut. Keep required instructions visible in the page. Use [Popover](?path=/docs/components-popover--docs) when the content needs links, buttons, or interaction.

### Content and access

Keep the explanation brief and specific to the trigger. A tooltip does not replace an accessible name: give an icon-only trigger an `aria-label` even when a tooltip is present. Avoid repeating a long visible label without adding useful information.

> Do not rely on hover for information required by touch or keyboard users. Check focus-triggered display and Escape dismissal. Keep focus on the trigger; do not put focusable controls in `TooltipContent`.
