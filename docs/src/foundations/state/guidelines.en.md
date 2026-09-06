# State

States show what can be used, what is selected, and whether work is in progress.

## Distinguish states

| State                | Meaning                                   |
| -------------------- | ----------------------------------------- |
| Hover and pressed    | Temporary feedback during interaction     |
| Focus visible        | The current keyboard position             |
| Selected and checked | A choice that remains active              |
| Disabled             | Unavailable under the current conditions  |
| Loading              | A request is in progress                  |
| Error                | Work failed and needs correction or retry |

Use `interactionPressed` only while pressing. Use `interactionSelected` for persistent selection. Combining them makes selection and input feedback hard to distinguish.

## Implementation

Prefer semantic props such as `disabled`, `checked`, and `aria-invalid`. A visually disabled control must not remain clickable. Prevent duplicate submissions during loading while explaining what is happening.

## Check

Check default, hover, pressed, focused, and disabled states in both themes. Test selection and focus together. Explain why a control is unavailable nearby when that information is needed.
