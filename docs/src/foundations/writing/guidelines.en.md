# Writing

Labels should explain the user's action and its result.

## Buttons and inputs

Use specific labels such as “Save,” “Send invitation,” and “Delete project” instead of repeating “Confirm.” Use one term for the same action. Keep input names in labels and use placeholders for examples.

## Message structure

| Message             | Include                                                |
| ------------------- | ------------------------------------------------------ |
| Error               | What failed and what the user can do next              |
| Empty state         | What is missing and how to get started                 |
| Delete confirmation | The target, whether it can be restored, and the action |
| Completion          | What actually finished                                 |

## Example

“Include @ in the email address” explains the next step more clearly than “Invalid value.” Do not guess a cause that the API has not confirmed. If you cannot distinguish a connection failure from missing permission, report only what is known.

## Check

Actions should be distinguishable from their labels alone. Keep essential conditions when shortening text. Use the same target name in headings, buttons, and notifications, and align accessible names with visible labels.
