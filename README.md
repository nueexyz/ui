# Dumo

Dumo is an open-code React component system built with Base UI and StyleX. It distributes
component source files into your project, so the components remain yours to read and change.

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
imports `src/styles/dumo.css`. It expects the usual `src/main.tsx` entry and a
`vite.config.ts` file with a `plugins: []` array. For another bundler, run `dumo init` and
configure `@stylexjs/unplugin` yourself.

Wrap the application with a Dumo theme. The theme classes provide the semantic color and
shadow variables used by every component.

```tsx
import { lightColorTheme, lightShadowTheme } from "@dumo/tokens/themes.stylex";
import * as stylex from "@stylexjs/stylex";

const theme = stylex.props(lightColorTheme, lightShadowTheme);

export function App() {
  return <main {...theme}>{/* application */}</main>;
}
```

Switch to `darkColorTheme` and `darkShadowTheme` for dark mode.

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

- `@dumo/ui`: compiled React components, global CSS, and the public `dumo` CLI.
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

The Storybook build is the visual documentation surface. Component interactions inherit Base
UI's accessible primitives; changes that alter focus, keyboard navigation, dialogs, menus, or
toasts should be checked in Storybook with a keyboard and screen reader before release.

## License

Apache-2.0. See [LICENSE](./LICENSE).
