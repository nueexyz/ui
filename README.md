# nooeh

An open-code React design system built with Base UI and StyleX.

## Start

```sh
pnpm dlx @nooeh/ui init
# Or, for a Vite app:
pnpm dlx @nooeh/ui init --framework vite

pnpm dlx @nooeh/ui add button
```

`init` installs StyleX and creates `nooeh.json` with project-local component
and token paths. By default, components go in `src/components/ui` and token
source goes in `src/design/nooeh`. Use `--ui` or `--tokens` to choose other
locations. The Vite option also adds the StyleX plugin, imports nooeh's global
CSS, and applies the default light theme.

For another bundler, configure its StyleX compiler and add this to the
application entry point:

```ts
import "./design/nooeh.css";
import { applyNooehTheme } from "./design/nooeh/theme";

applyNooehTheme();
```

Call `applyNooehTheme("dark")` when your application switches mode. It updates
`data-theme` for your CSS and the internal StyleX theme classes for nooeh.

## What you get

- Editable local StyleX tokens with light and dark themes.
- Added component source uses local tokens that live in your project.
- Direct `@nooeh/ui` package exports retain `@nooeh/tokens` internally.
- Accessible React primitives from Base UI with nooeh visual defaults.
- Component source in your project, ready to read and change.

## Need help?

```sh
nooeh list
nooeh docs button
nooeh doctor
```

Run `nooeh doctor` after setup to check the StyleX compiler, global CSS import,
and theme application.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Apache-2.0. See [LICENSE](./LICENSE).
