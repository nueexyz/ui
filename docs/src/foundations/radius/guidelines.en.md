# Radius

Use corners consistently for elements with the same role. Roundness alone should not signal action priority.

## Choose a radius

| Use                        | Starting point          |
| -------------------------- | ----------------------- |
| Small controls and badges  | `radiusVars.sm`         |
| General surfaces           | `radiusVars.md`         |
| Large panels and previews  | `radiusVars.lg` or `xl` |
| Circular avatars and pills | `radiusVars.full`       |

Existing components already define their corners. These values are starting points for new surfaces, not instructions to override each component.

## Nested surfaces

Check inner and outer corners together with their spacing. Avoid applying one radius mechanically to every nested surface or repeatedly adding new values.

## Check

Ensure images, focus rings, and popups are not clipped. Inspect the content before adding `overflow: hidden` to create rounded edges; it can hide focus indicators and menus.
