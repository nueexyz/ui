## Usage guidelines

### When to use

Use `Message` for a conversation entry that groups the sender, content, and metadata. It is not a page-level status component: use [Banner](?path=/docs/components-banner--docs) for persistent guidance or Toast for a brief operation result.

### Structure and alignment

Use `MessageContent` for the message body and `MessageFooter` for supporting metadata such as time or delivery status. `Bubble` provides the bubble presentation; `Message` groups the conversation entry. Keep sender identity available even when consecutive messages omit repeated avatars.

> Use `align="start"` or `align="end"` consistently with the conversation's participants. Alignment alone must not identify the sender. Preserve chronological reading order in the document, and do not announce an entire conversation again when one new message arrives.
