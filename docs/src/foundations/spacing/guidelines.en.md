# Spacing

Different gaps distinguish related information from separate tasks. Repeating the same spacing for the same relationship makes groups visible without adding borders everywhere.

## Selection guidelines

| Situation                    | Recommended choice             | Code                          |
| ---------------------------- | ------------------------------ | ----------------------------- |
| Icons and short labels       | `space1`, `space2`             | `gap: spacingVars.space2`     |
| Elements in one row or field | `space2`, `space3`             | `gap: spacingVars.space3`     |
| Related fields and rows      | `space3`, `space4`             | `gap: spacingVars.space4`     |
| Padding in cards and panels  | `space4`, `space6`             | `padding: spacingVars.space6` |
| Different sections           | `space8`, `space10`, `space12` | `gap: spacingVars.space8`     |

Choose values from `spacingVars`. Reserve `space0_5` for small boundary adjustments, not the primary layout of a new screen.

## Examples

### Space a settings section

Start with `space2` between a title and description, `space4` between related fields, and `space8` between separate settings groups. Making all three gaps equal obscures where a description belongs and where the next group begins.

> Do not hide alignment problems with arbitrary margins. Check baselines, line heights, control sizes, and layout properties first. Use the same token for the same relationship throughout the screen.
