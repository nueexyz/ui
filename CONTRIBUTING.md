# Contributing

## Public contract

The public contract consists of published package exports, semantic tokens, CLI commands and configuration, and documented component props and keyboard behavior. Storybook stories are the executable examples for component behavior.

## Before opening a pull request

- Add or update a Storybook story for every public component or token change.
- Run `pnpm check`, `pnpm test`, and `pnpm docs:build`.

## Release rule

Use `patch` for contract-preserving fixes, `minor` for additive public API, and
`major` for removals or incompatible behavior. Record migration steps in the
release notes when a published contract changes.

Do not use a patch release to alter a documented token meaning or keyboard
interaction.
