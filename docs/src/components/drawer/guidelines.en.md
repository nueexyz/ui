## Usage guidelines

### When to use

Use `Drawer` for an edge panel containing a focused task or supporting controls, such as list filters. Use [Dialog](?path=/docs/components-dialog--docs) for a compact, centered task, and a page when the work needs independent navigation.

### Choose interaction before position

The default `Drawer` is modal. A transparent overlay changes appearance, not background interactivity. For a panel that must stay open while users operate the page, use `modal={false}` with `overlay="none"` and verify that the panel does not cover needed controls.

Choose the opening edge from the layout and reading space. Do not treat a bottom `Drawer` as an automatic mobile replacement for every `Dialog`. When changing presentation at a breakpoint, preserve draft values and avoid losing focus through a remount.

### Closing and gestures

> Provide a visible close or cancel action using `DrawerClose`. A swipe handle is an additional affordance, not the only exit. Decide how unsaved values behave before enabling dismissal. Check keyboard access and long content at narrow viewport widths.

### Composition and styling

DrawerContent includes the portal, backdrop, popup, and content region. Do not
wrap it in DrawerPopup. Its `xstyle` applies directly around children for gap
and inner layout. Other props and `ref` apply to the popup. Configure the
backdrop and swipe handle through Drawer `overlay` and `showSwipeHandle`.
