# Color

Use color to distinguish roles and states. Before adding decorative colors, check whether neutral surfaces and text hierarchy provide enough separation.

## Choose a role

| Use                                | Token                     |
| ---------------------------------- | ------------------------- |
| Outer page background              | `colorVars.bgCanvas`      |
| Content surface                    | `colorVars.bgSurface`     |
| Subtle separation                  | `colorVars.bgSubtle`      |
| Raised surface, such as a popup    | `colorVars.bgRaised`      |
| Headings and essential content     | `colorVars.fgPrimary`     |
| Supporting information             | `colorVars.fgSecondary`   |
| Standard divider                   | `colorVars.strokeDefault` |
| Boundary that must remain distinct | `colorVars.strokeStrong`  |

Pair strong action backgrounds with `fgOnActionPrimary` or `fgOnActionDestructive`. Pair feedback tokens such as `fgFeedbackError` with a specific explanation.

## Example

Use `fgSecondary` for a setting's description, but keep essential errors prominent. Separate cards on the same surface with spacing and borders before adding a shadow to every card.

## Check

Keep the same semantic token across light and dark modes. Semantic tokens do not guarantee contrast for every foreground and background combination. Test the actual pairing and communicate state through more than color.
