# Design Token

A token names a reusable design decision. Even when two values look alike, choose the token that matches the role: background, content, or boundary.

## When to use tokens

Use tokens for color, typography, spacing, corners, shadows, target sizes, and motion. Prefer an existing component's `size` or `variant` prop before overriding its styles.

## Choose a group

| Role                                          | Token group                             |
| --------------------------------------------- | --------------------------------------- |
| Surface, text, boundary, state                | `colorVars`                             |
| Gaps and padding                              | `spacingVars`                           |
| Controls, icons, content width, touch targets | `sizeVars`                              |
| Font, size, weight, line height               | `typographyVars`                        |
| Corners, shadows, stacking                    | `radiusVars`, `shadowVars`, `layerVars` |
| Duration, easing, disabled opacity            | `motionVars`, `opacityVars`             |

Use semantic tokens instead of raw palette values in new screens. Keep an unmatched value local first. Add a shared token only when the same intent recurs across multiple uses.

## Example

```tsx
import * as stylex from "@stylexjs/stylex";
import { colorVars, spacingVars } from "@/styles/semantic.stylex";

const styles = stylex.create({
  panel: {
    backgroundColor: colorVars.bgSurface,
    color: colorVars.fgPrimary,
    padding: spacingVars.space6,
  },
});
```

Source-installed projects use the style alias in `nuee.json`; this repository's examples may import the token package. Check names in the actual token file before writing a screen. Do not invent tokens.
