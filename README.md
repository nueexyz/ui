# Dumo

Dumo is an open-code React component system built with Base UI and StyleX. Its official path is
to copy component source files into your project, so the components remain yours to read and
change.

## What Dumo provides

- Accessible interaction primitives from Base UI with Dumo's visual defaults.
- Semantic StyleX tokens, light and dark themes, and a small global reset.
- A registry-aware CLI that installs a component together with its Dumo dependencies.
- Storybook documentation for foundations and 53 components.

## Requirements

- React 19+
- A StyleX-enabled bundler. The CLI can configure the standard Vite `plugins` array.
- TypeScript path aliases. The default UI destination is `@/components/ui`.

## Start with Vite

Install the runtime and build dependencies in an existing Vite React app:

```sh
pnpm add @base-ui/react @dumo/tokens @phosphor-icons/react @stylexjs/stylex
pnpm add -D @stylexjs/unplugin
pnpm dlx @dumo/ui init --framework vite
pnpm dlx @dumo/ui add button
```

`init --framework vite` creates `dumo.json`, adds the StyleX Vite plugin, and creates and
imports `src/styles/dumo.css`. It also creates `src/dumo-theme.ts` and applies the light theme
before React renders. It safely updates TypeScript, JavaScript, and module Vite config files
only when they use a literal `plugins: [...]` array; otherwise it stops before changing project
files and tells you to add the StyleX configuration manually.

Use the generated helper to switch color modes. It replaces only the Dumo theme classes on
`<html>`.

```tsx
import { applyDumoTheme } from "./dumo-theme";

applyDumoTheme("dark");
```

## CLI

```sh
dumo init [--framework vite] [--ui-alias @/components/ui]
dumo add <component> [--skip-dependencies] [--dry-run]
dumo list
dumo docs [component]
dumo doctor
```

`add --dry-run` never writes a config, component, or dependency. URL registry items are
validated before Dumo writes them, and every registry file must remain inside the configured
UI directory.

## Packages

- `@dumo/ui`: the public `dumo` CLI and global CSS. Install component source with `dumo add`.
- `@dumo/tokens`: StyleX token and theme definitions.
- `@dumo/cli`: CLI implementation used by `@dumo/ui`.
- `@dumo/registry`: registry metadata and packaged component source.

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
