# nooeh

An open-code React design system built with Base UI and StyleX. Copy component
source into your app and adapt it to your product.

## Start

```sh
pnpm dlx @nooeh/ui init
# Or, for a Vite app:
pnpm dlx @nooeh/ui init --framework vite

pnpm dlx @nooeh/ui add button
```

`init` installs StyleX, creates `nooeh.json`, and copies editable token and
theme source into `src/styles/nooeh`. Use `--tokens src/design-system/nooeh` to
choose another project-local location. The Vite option also adds the StyleX
plugin, imports nooeh's global CSS, and applies the default light theme.

For another bundler, configure its StyleX compiler and add this to the
application entry point:

```ts
import "./styles/nooeh.css";
import { applyNooehTheme } from "./styles/nooeh/theme";

applyNooehTheme();
```

Call `applyNooehTheme("dark")` when your application switches mode. It updates
`data-theme` for your CSS and the internal StyleX theme classes for nooeh.

## What you get

- Editable local StyleX tokens with light and dark themes.
- No `@nooeh/tokens` runtime dependency; token source lives in your project.
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
