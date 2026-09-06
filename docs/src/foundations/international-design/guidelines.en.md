# International Design

Keep essential information and actions available as text length and reading direction change.

## Layout

Allow content height and wrapping to adapt to translations. Where left and right depend on reading direction, consider logical properties such as `paddingInline`, `marginInlineStart`, and `textAlign: start`.

## Content

Format dates, times, numbers, and currencies for the product's locale and time zone. Translate complete sentences instead of joining word fragments. Account for units and plurals.

## Direction

Distinguish directional icons, such as back arrows, from images that must not be mirrored, such as logos. Verify the components in use instead of assuming all of nuée fully supports RTL.

## Check

Test long English text, Korean wrapping, large numbers, and time zone differences. Do not truncate essential labels or shrink text to accommodate a translation.
