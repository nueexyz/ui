# Nooeh Design System

`nooeh/ds` is an open-code design system for React, built with Base UI and StyleX. It includes
semantic tokens, UI components, documentation, a registry, and a CLI. Its official path is to
copy component source files into your project, so the components remain yours to read and change.

## What Nooeh provides

- Accessible interaction primitives from Base UI with Nooeh's visual defaults.
- Semantic StyleX tokens, light and dark themes, and a small global reset.
- A registry-aware CLI that installs a component together with its Nooeh dependencies.
- Storybook documentation for foundations and 53 components.

## Requirements

- React 19+
- A StyleX-enabled bundler. The CLI can configure the standard Vite `plugins` array.
- TypeScript path aliases. The default UI destination is `@/components/ui`.

## Start with Vite

Install the runtime and build dependencies in an existing Vite React app:

```sh
pnpm add @base-ui/react @nooeh/tokens @phosphor-icons/react @stylexjs/stylex
pnpm add -D @stylexjs/unplugin
pnpm dlx @nooeh/ui init --framework vite
pnpm dlx @nooeh/ui add button
```

`init --framework vite` creates `nooeh.json`, adds the StyleX Vite plugin, and creates and
imports `src/styles/nooeh.css`. It also creates `src/nooeh-theme.ts` and applies the light theme
before React renders. It safely updates TypeScript, JavaScript, and module Vite config files
only when they use a literal `plugins: [...]` array; otherwise it stops before changing project
files and tells you to add the StyleX configuration manually.

Use the generated helper to switch color modes. It replaces only the Nooeh theme classes on
`<html>`.

```tsx
import { applyNooehTheme } from "./nooeh-theme";

applyNooehTheme("dark");
```

## CLI

```sh
nooeh init [--framework vite] [--ui-alias @/components/ui]
nooeh add <component> [--skip-dependencies] [--dry-run]
nooeh list
nooeh docs [component]
nooeh doctor
```

`add --dry-run` never writes a config, component, or dependency. URL registry items are
validated before Nooeh writes them, and every registry file must remain inside the configured
UI directory.

## Packages

- `@nooeh/ui`: the public `nooeh` CLI and global CSS. Install component source with `nooeh add`.
- `@nooeh/tokens`: StyleX token and theme definitions.
- `@nooeh/cli`: CLI implementation used by `@nooeh/ui`.
- `@nooeh/registry`: registry metadata and packaged component source.

## Development

```sh
pnpm check
pnpm test
pnpm build
pnpm docs:build
```

The Storybook build is the visual documentation surface. The a11y addon runs axe checks,
including color contrast, for each story. Component interactions inherit Base UI's accessible
primitives; changes that alter focus, keyboard navigation, dialogs, menus, or toasts should
also be checked in Storybook with a keyboard and screen reader before release.

## License

Apache-2.0. See [LICENSE](./LICENSE).
