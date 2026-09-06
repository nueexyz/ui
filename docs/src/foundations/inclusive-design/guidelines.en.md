# Inclusive Design

Accessibility is part of choosing components and arranging content, not a finishing touch.

## Compose with meaning

Use Button for actions, Input with Field for entry, and Checkbox or Radio Group for choices. Do not replace them with clickable `div` elements.

| Check           | How                                                                                   |
| --------------- | ------------------------------------------------------------------------------------- |
| Names           | Label inputs and provide names for icon-only buttons                                  |
| Keyboard        | Check Tab order and Enter, Space, and Escape                                          |
| Focus           | Keep focus visible and return it appropriately after a modal closes                   |
| State           | Use text, icons, and semantic selection props alongside color                         |
| Targets         | Separate visible size from hit area; consider `sizeVars.touchTarget`                  |
| Zoom and motion | Preserve content and actions at 200% zoom, on narrow screens, and with reduced motion |

## Explain errors

Place errors near the input and explain what to change. Do not rely on a page-level toast alone. Explain how to meet a requirement instead of showing only a disabled button.

## Verify

Automated checks are a starting point, not a guarantee of accessibility. Also check keyboard interactions, screen reader names, roles and states, and the color combinations in use.
