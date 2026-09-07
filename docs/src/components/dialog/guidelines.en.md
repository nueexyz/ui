## Usage guidelines

### When to use

Use `Dialog` for a bounded task such as renaming an item or editing a few related fields. Choose inline editing when it keeps the task clear without interrupting the page. Use a dedicated page for work that needs navigation, a shareable URL, or substantial content.

### Dialog or Drawer

Choose [Drawer](?path=/docs/components-drawer--docs) when an edge panel suits the content and available space. Both can interrupt the page; the entry animation does not determine whether the background stays interactive. Do not switch to `Drawer` solely because a device has touch input.

Use [Alert Dialog](?path=/docs/components-alert-dialog--docs) when the immediate purpose is confirming a consequential action rather than editing content.

### Completion and dismissal

Decide whether closing cancels a draft or preserves it, and handle unsaved changes consistently for the close button, Escape, and outside interaction. Avoid stacking dialogs for ordinary steps; keep one clear path through the task.

> `DialogContent` includes a close button by default. Localize `closeLabel` for the product language. If hiding it with `showCloseButton={false}`, provide another visible way to exit. Check focus on entry and its return after closing.
