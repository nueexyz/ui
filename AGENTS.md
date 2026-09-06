# AGENTS.md

Project-specific guidance for AI coding agents.

## Changelog

User-facing changes go into `CHANGELOG.md`. Keep it readable as release notes for users, not as a commit log.

- Use reverse chronological order, with the newest version at the top.
- Start each version with `## Version v{version}`, followed by `Released on {date}.`.
- Use `-` list items. Wrap lines at roughly 80 columns and indent continuation lines with four spaces.
- Write user-facing descriptions: what changed, why it matters, and what users should do. Avoid implementation jargon.

## UI composition

Before creating or changing screens, read
`docs/src/foundations/overview/guidelines.md` and the relevant topic's
`guidelines.md` in `docs/src/foundations/`. Use these rules for component choice,
semantic tokens, layout, states, accessible interactions, and interface copy.
Verify names and supported props against the component source; documentation
does not authorize inventing APIs. State any necessary exception.

Documentation examples live beside each component's `docs.mdx` as ordinary
React files. Display their actual source with `?raw`; do not reconstruct code
from Storybook metadata or regular expressions.
