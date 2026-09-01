# nooeh

An open-code React design system for StyleX apps, built with Base UI.

## Start

```sh
pnpm dlx @nooeh/ui init --framework vite

pnpm dlx @nooeh/ui add button
```

`init` installs StyleX, configures the Vite compiler, and creates `nooeh.json`.
By default, components go in `@/components/ui` and local token source goes in
`@/styles`. Use `--ui` or `--styles` to choose other aliases.

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

`init --framework vite` writes the required StyleX module resolution for the
default `@/styles` alias. If you configure Vite yourself, include it too.

```ts
stylex.vite({
  useCSSLayers: true,
  aliases: { "@/styles/*": ["/ROOT/src/styles/*"] },
  unstable_moduleResolution: {
    type: "commonJS",
    rootDir: new URL(".", import.meta.url).pathname,
  },
});
```

```ts
import "./index.css";
```

Apply a local theme at the root of the subtree it should affect.

```tsx
import * as stylex from "@stylexjs/stylex";
import { darkColorTheme, darkShadowTheme } from "@/styles/themes.stylex";

<div {...stylex.props(darkColorTheme, darkShadowTheme)}>
  <App />
</div>;
```

To create a product theme, override Nooeh's semantic variable groups with
`stylex.createTheme()`. Components keep using the same semantic tokens.

## What you get

- Editable local StyleX tokens with light and dark themes.
- Added component source uses local tokens that live in your project.
- Product themes can override Nooeh semantic variable groups with
  `stylex.createTheme()`.
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
