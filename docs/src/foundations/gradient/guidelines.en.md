# Gradient

nuée currently has no shared semantic gradient tokens. Build the default UI with solid surfaces and semantic colors.

## When to consider a gradient

Consider a local gradient for a specific brand or decorative content need that a solid surface cannot meet. Until repeated use establishes a shared pattern, do not assume an API such as `gradientVars` exists.

## When to avoid it

Do not add gradients to communicate input errors, selected buttons, or disabled states. Use existing state tokens and component props.

## Check

Text must remain readable over both the lightest and darkest parts. Check each theme and the result without images. Keep decoration from obscuring the primary action. Before adopting a shared pattern, define its start and end colors, direction, use cases, and contrast checks.
