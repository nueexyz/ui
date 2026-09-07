# Search and filter projects

Let people finish adjusting several criteria before the results change. Separating draft and applied filters also makes it clear which choices produced the list currently on screen.

## Choose when changes apply

| Situation                                   | Recommended choice          | Rationale                                                                |
| ------------------------------------------- | --------------------------- | ------------------------------------------------------------------------ |
| A short local list with one search field    | Immediate filtering         | Each keystroke is inexpensive and the result is easy to follow           |
| Several criteria that users adjust together | Apply filters               | Intermediate choices do not repeatedly replace the results               |
| Server search while typing                  | Delayed immediate filtering | Reduces requests; also requires cancellation or ignoring stale responses |

The example uses **Apply filters**. Its data is local so the difference between editing criteria and applying them is easy to inspect. This is a composition example, not a server search implementation.

## Try the interaction

1. Choose **Archived**. The results and applied-filter summary still show all four projects, and the page identifies unapplied changes.
2. Select **Apply filters**. Only the two archived projects remain. The summary now says **Archived**.
3. Enter **Customer** and press Enter. No archived project matches; the input and applied summary remain visible.
4. Select **Clear filters**. Both draft and applied filters reset immediately, restoring all four projects.
