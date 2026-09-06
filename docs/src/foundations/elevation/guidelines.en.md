# Elevation

Use elevation to explain relationships. Do not increase shadows or stacking values merely to attract attention.

## Choose a level

| Relationship                      | Choice                                               |
| --------------------------------- | ---------------------------------------------------- |
| Groups on the same surface        | Spacing and borders; `shadowVars.subtle` when needed |
| Small floating menus and popovers | `shadowVars.floating`                                |
| Modal surfaces                    | `shadowVars.overlay`                                 |
| Modal backdrop and content        | `layerVars.modalBackdrop`, `layerVars.modal`         |
| Popups and notifications          | `layerVars.popup`, `layerVars.notification`          |

Use the portals and layers managed by components. If a menu is covered, inspect its parent stacking context and portal location before adding a value such as `z-index: 9999`.

## Example

Consider Popover or Dropdown Menu for short supporting choices, and Dialog or Drawer for tasks that require focus before continuing. A shadow does not replace focus management or background blocking.

## Check

Check borders and shadows in both themes. Keep text and borders crisp when stacking toasts. Document the stacking order and interactions before adding a new layer role.
