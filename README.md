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
