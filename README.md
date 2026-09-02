# nooeh

An open-code React design system for StyleX apps, built with Base UI.

## Start

```sh
pnpm dlx @nooeh/ui init --framework vite

pnpm dlx @nooeh/ui add button
```

`init` installs StyleX, configures the Vite compiler, and creates `nooeh.json`.
By default, components go in `@/components/ui` and local token source goes in
`src/styles`. Use `--ui` or `--styles` to choose other destinations.

```txt
src/styles/
  color-palette.stylex.ts
  semantic.stylex.ts
  themes.stylex.ts
```

Nooeh copies component, token, and theme source into your app. Configure the
StyleX compiler for your bundler before adding components. Vite projects should
keep a normal CSS import in their application entry point so Vite can emit
StyleX's generated CSS.

`init --framework vite` adds StyleX's variable-module resolution. Nooeh uses
local `defineVars()` tokens, so keep this configuration before React.

```ts
stylex.vite({
  unstable_moduleResolution: { type: "commonJS" },
});
```

```ts
import "./index.css";
```

Nooeh does not prescribe theme state, storage, or a React provider. Your app
can apply the generated dark theme classes wherever it owns color-mode state.

```tsx
import * as stylex from "@stylexjs/stylex";

import { darkColorTheme, darkShadowTheme } from "./styles/themes.stylex";

const darkThemeClasses = stylex.props(darkColorTheme, darkShadowTheme).className?.split(" ") ?? [];

for (const className of darkThemeClasses) {
  document.documentElement.classList.toggle(className, colorMode === "dark");
}
```

To create a product theme, override Nooeh's semantic variable groups with
`stylex.createTheme()`. Components keep using the same semantic tokens.

## What you get

- Editable local StyleX tokens with light defaults and dark themes.
- Added component source uses local tokens that live in your project.
- Your app owns theme state and can override Nooeh semantic variable groups
  with `stylex.createTheme()`.
- Accessible React primitives from Base UI with nooeh visual defaults.
- Component source in your project, ready to read and change.

## Need help?

```sh
nooeh list
nooeh docs button
nooeh doctor
```

Run `nooeh doctor` after setup to check aliases, the StyleX compiler, and the
application CSS entry point.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Apache-2.0. See [LICENSE](./LICENSE).
