# Typography

Choose type sizes for information hierarchy and reading length. Use `fontFamilyBody` for content and `fontFamilyHeading` for headings.

## Choose a style

| Use                               | Starting point                      |
| --------------------------------- | ----------------------------------- |
| Page title                        | `fontSizeXl` + `fontWeightSemibold` |
| Section heading                   | `fontSizeLg` + `fontWeightSemibold` |
| Longer reading content            | `fontSizeMd` + `lineHeightNormal`   |
| Controls and compact descriptions | `fontSizeSm` + `lineHeightNormal`   |
| Supporting metadata               | `fontSizeXs`                        |

Start with `lineHeightTight` for short headings and `lineHeightNormal` for multiline content. These combinations guide new screens; they do not replace typography already defined by Button, Toast, or Field.

## Alignment

Align adjacent titles and button labels on the title's first baseline instead of fixing the title height to the button. Align checkboxes with the first line of a label and description group, even when the description wraps.

## Avoid

Do not shrink essential guidance or long translations to fit a fixed area. Allow wrapping and content-driven height. Check 200% zoom and long Korean and English text.
