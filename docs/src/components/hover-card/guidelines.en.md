## Usage guidelines

### When to use

Use Hover `Card` for an optional preview of a link destination, such as a person's profile summary. The link must still make sense and lead to useful content without the preview. Use [Tooltip](?path=/docs/components-tooltip--docs) for a short control explanation and `Popover` for explicitly opened interactive content.

### Preview, not a required step

Keep the preview focused on identifying the destination. Put required details and actions on the destination page as well. Do not make completing a form or finding an essential action depend on keeping a hover card open.

> Provide a real destination in `HoverCardTrigger`'s `href`; the example's placeholder is not a product route. Check the ordinary link flow on touch devices and with keyboard navigation. Opening a preview must not be necessary to follow the link.
