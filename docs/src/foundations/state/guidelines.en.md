# State

Distinguishing availability from persistent selection helps people tell what they can do from what they have already chosen. Treat momentary input response, selection, and request outcomes as separate information.

## Selection guidelines

| Situation                            | Recommended choice                                                        | Code                                                    |
| ------------------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------- |
| Pointer enters the control           | `interactionHover`; `interactionSolidHover` for filled action buttons     | `backgroundColor: colorVars.interactionHover`           |
| While pressing the control           | `interactionPressed`; `interactionSolidPressed` for filled action buttons | `backgroundColor: colorVars.interactionPressed`         |
| Show the current keyboard position   | `strokeFocus` with a focus outline                                        | `outlineColor: colorVars.strokeFocus`                   |
| Keep a selected item identifiable    | `interactionSelected` with a selection indicator                          | `backgroundColor: colorVars.interactionSelected`        |
| The control is currently unavailable | `fgDisabled` with the control’s `disabled` attribute                      | `color: colorVars.fgDisabled`                           |
| Waiting for a request                | Status text and `Spinner`                                                 | `<Spinner />`                                           |
| An input value needs correction      | `FieldError` and an explanation beside the input                          | `<FieldError>Enter a valid email address.</FieldError>` |

Use `interactionPressed` only while pressing. Use `interactionSelected` for persistent selection. Combining them makes selection and input feedback hard to distinguish.

### Implementation

Prefer semantic props such as `disabled`, `checked`, and `aria-invalid`. A visually disabled control must not remain clickable. Prevent duplicate submissions during loading while explaining what is happening.

Set `outlineStyle`, `outlineWidth`, and `outlineOffset` alongside the focus color. Connect selection to `checked` or `aria-pressed`, and mark pending regions with `aria-busy`. For input errors, set `aria-invalid` and connect the error description ID through `aria-describedby`.

> Check default, hover, pressed, focused, and disabled states in both themes. Test selection and focus together. Explain why a control is unavailable nearby when that information is needed.

### State and outcome colors

`interaction*` tokens express hover, press, selection, and availability. Layer translucent colors over the existing surface; use `interactionSolid*` on filled action backgrounds.

`bgFeedback*`, `fgFeedback*`, and `strokeFeedback*` express the background, content, and border for information, success, warning, and error. Keep pointer state separate from the outcome of a task.

## Examples

### When focus returns to a selected item

A selected item should keep its selection treatment when focus returns. The focus indicator adds the current keyboard position. Using only a pressed color for selection loses that information once the control is released.

### Apply state styles

Start with `Button` for an action and `Toggle` for persistent selection. The example shows how CSS properties connect to state when building a new control. Hover over **Pin project**, press, and release. The selected background, border, and check mark remain while the pressed layer disappears. Tab to the control to add focus without losing selection.

> Hover and pressed colors are translucent layers. This example combines selection and pointer layers over `bgSubtle`, with a border and check mark to distinguish selection. Use `interactionSolidHover` and `interactionSolidPressed` over a filled primary-action background. Color alone does not provide HTML state or behavior.
