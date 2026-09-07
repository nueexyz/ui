# nuée

A design system built with React and StyleX.

## Installation

```sh
pnpm dlx @nuee/ui init
pnpm dlx @nuee/ui add button
```

For Vite, use `init --vite` to configure the StyleX plugin and reset stylesheet.

## Usage

Components are copied into your project.

```tsx
import { Button } from "@/components/ui/button";

export function SaveButton() {
  return <Button>Save</Button>;
}
```

## Agent skill

To use nuée guidance with a coding agent, optionally install
[the nuée skill](skills/nuee/SKILL.md) in your agent's skill directory. Copy the
`skills/nuee` folder; for Codex, use `~/.codex/skills/nuee`.

The skill reads the relevant design documentation and checks your local component
APIs. `init` only sets up nuée; it does not create agent instructions or copy docs
into your project.
