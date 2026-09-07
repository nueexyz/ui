## Usage guidelines

### When to use

Use Toast to confirm a completed action without taking the user away from their task, such as moving an item to an archive. Use [Banner](?path=/docs/components-banner--docs) when the condition must remain visible, and `FieldError` when a value needs correction. A toast must not be the only record of a failure that blocks the task.

### Actions and persistence

Keep the title about the result. Add a description only when it explains the consequence or next step. Offer Undo only when its handler actually restores the data; dismissing the notification does not undo the operation.

Use one notification lifecycle for a pending operation and its result instead of adding separate, competing messages. Reserve high priority for time-sensitive information that warrants interrupting an announcement. A red icon alone does not justify higher priority.

### Dismissal

> Escape dismisses the newest notification, one at a time. Dismiss all clears notifications, not requests. Keep any required retry or recovery action available in the page after the toast disappears. Set `clearAllProps.children` to the product's wording.
