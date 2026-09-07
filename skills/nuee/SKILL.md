---
name: nuee
description: Build and revise React screens with the nuée design system and StyleX. Use when a project uses nuée components or the user requests nuée; consult its design guidance and locally installed component APIs.
---

# nuée

nuée copies React components and StyleX tokens into the consumer project. Treat
those local files as the API authority; do not assume a runtime `@nuee/ui` import.

## Find the project contract

Read `nuee.json`, then resolve `aliases.ui` and `aliases.styles` using the project's
TypeScript or JavaScript path configuration. Inspect the relevant component and
token files before choosing props or values. Preserve local modifications.

For missing components, use the project's established package manager with
`@nuee/ui add <component>`. Run `init` only when setting up nuée is part of the
request. Neither command requires a local copy of the design documentation.

## Read guidance for the task

In a nuée source checkout, read `docs/src/foundations/overview/guidelines.en.md`
and the relevant topic under `docs/src/foundations/`. Component guidance lives in
`docs/src/components/<component>/overview.en.md` and `guidelines.en.md`; example
React files live beside `docs.mdx`. Korean versions omit `.en`.

Outside that checkout, read the corresponding files from the
[nuée repository](https://github.com/nueexyz/ui/tree/main/docs/src).
Start with [Overview](https://github.com/nueexyz/ui/blob/main/docs/src/foundations/overview/guidelines.en.md),
then retrieve only the topics needed:

- Layout and spacing for grouping information and actions.
- Typography for text roles; color and state for semantic styling.
- Accessibility for names, keyboard operation, focus, and feedback.
- Component guidance for composition and behavior.
- `patterns/search-and-filter` for search and result updates.

If working from a released version, prefer documentation at its matching Git tag
when available. Current repository documentation may describe newer APIs. Verify
all names against the consumer's source. If guidance cannot be retrieved, state
that limitation and continue from the available source without inventing APIs.

## Apply the guidance

Use local semantic tokens with `stylex.create` and apply styles through
`stylex.props`. Follow the component's supported styling contract rather than
adding arbitrary `className`, `style`, or typography props. Use the project's
configured import aliases, not the aliases in documentation examples blindly.

Keep document hierarchy separate from visual text size. Preserve the components'
keyboard behavior, accessible names, focus indicators, and reduced-motion support.
Check the resulting screen in its relevant states and themes using the project's
existing validation workflow.
