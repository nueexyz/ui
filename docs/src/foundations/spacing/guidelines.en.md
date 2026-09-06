# Spacing

Use spacing to communicate relationships. Keep related items close and separate different task groups.

## Choose a gap

| Relationship                 | Starting point                 |
| ---------------------------- | ------------------------------ |
| Icons and short labels       | `space1`, `space2`             |
| Elements in one row or field | `space2`, `space3`             |
| Related fields and rows      | `space3`, `space4`             |
| Padding in cards and panels  | `space4`, `space6`             |
| Different sections           | `space8`, `space10`, `space12` |

Choose values from `spacingVars`. Reserve `space0_5` for small boundary adjustments, not the primary layout of a new screen.

## Example

Use more space between setting groups than between a title and its description. On narrow screens, reduce outer panel margins while keeping labels and errors readable as distinct content.

## Avoid

Do not hide alignment problems with arbitrary margins. Check baselines, line heights, control sizes, and layout properties first. Use the same token for the same relationship throughout the screen.
