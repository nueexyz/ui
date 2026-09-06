# Layout

Show how information and actions relate. Do not group unrelated items merely because they fit on the same row.

## Choose a component

| Situation                                              | Start with             |
| ------------------------------------------------------ | ---------------------- |
| A row with a title, description, and supporting action | Content Row            |
| An input with a name, description, and error           | Field                  |
| An independent information group                       | Card                   |
| Short contextual choices                               | Popover, Dropdown Menu |
| A focused task                                         | Dialog, Drawer         |
| Results and comparable values                          | Table                  |

## Width and spacing

Consider `sizeVars.contentSm` for a short input group and `contentMd` for reading areas. Keep the layout within the available width on narrow screens. Follow Spacing for gaps that communicate relationships.

## First-line alignment

Align Content Row titles and actions on their first baseline. Align Checkbox to the first title line when paired with FieldContent. A wrapping description should not require manual top or bottom padding.

## Narrow screens

Move secondary actions to the next row or a related menu when space is limited. Keep the primary action visible. Avoid fixed heights, overflowing widths, and horizontal scrolling as default solutions.
