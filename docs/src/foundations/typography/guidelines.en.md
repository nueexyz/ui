# Typography

Combining size, weight, and line height by role helps people scan headings and read the content they need. Choose type after deciding the information's priority and how much reading it requires.

## Selection guidelines

| Situation                       | Recommended choice                  | Code                                            |
| ------------------------------- | ----------------------------------- | ----------------------------------------------- |
| Page title                      | `fontSizeXl` + `fontWeightSemibold` | `<Heading level={1} size="page">…</Heading>`    |
| Section heading                 | `fontSizeLg` + `fontWeightSemibold` | `<Heading level={2} size="section">…</Heading>` |
| Longer reading content          | `fontSizeMd` + `lineHeightNormal`   | `fontSize: typographyVars.fontSizeMd`           |
| Supporting text beside controls | `fontSizeSm` + `lineHeightNormal`   | `fontSize: typographyVars.fontSizeSm`           |
| Supporting metadata             | `fontSizeXs`                        | `fontSize: typographyVars.fontSizeXs`           |

Start with `lineHeightTight` for short headings and `lineHeightNormal` for multiline content. These combinations guide new screens; they do not replace typography already defined by `Button`, Toast, or `Field`.

### Alignment

Align adjacent titles and button labels on the title's first baseline instead of fixing the title height to the button. Align checkboxes with the first line of a label and description group, even when the description wraps.

> Do not shrink essential guidance or long translations to fit a fixed area. Allow wrapping and content-driven height. Check 200% zoom and long Korean and English text.

### Letter spacing and line height

`typographyVars` currently has no letter-spacing token. Default tracking follows the font and browser settings. Do not tighten all body text simply to make documentation look denser.

Use `lineHeightTight` (1.25) for short headings and `lineHeightNormal` (1.5) for multi-line body text. These values multiply the font size. Adjust grouping and layout spacing first, and preserve content when users increase text spacing. See [Accessibility](?path=/docs/foundations-accessibility--docs) for verification.

## Examples

### When a description wraps to two lines

Use `lineHeightTight` for the short heading and `lineHeightNormal` for the description. Align an adjacent button with the heading's first line and let the description grow below it. Fixing the heading to the button height makes that relationship fragile when text wraps.

### Apply styles to semantic elements

Apply text styles to `p` or `span`. The example assigns tokens to `fontSize`, `fontWeight`, and `lineHeight`, with color chosen separately for the information's role. Repeated combinations inside components use shared typography styles.

Use [Heading](?path=/docs/components-heading--docs) to choose an HTML heading level independently from its visual size.
