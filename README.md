# nooeh

An open-code, StyleX-native design system for React. Add component source to
your app, then own and adapt it.

## Start

```sh
pnpm dlx @nooeh/ui init
pnpm dlx @nooeh/ui add button
```

`init` installs the StyleX dependencies and creates the nooeh theme files.
`add` copies each component and its nooeh dependencies into your project, so
you can read and change them as your own code.

For a conventional Vite app, use the Vite adapter to configure its StyleX
plugin and application entry point:

```sh
pnpm dlx @nooeh/ui init --framework vite
```

## What you get

- Semantic StyleX tokens with light and dark themes.
- Accessible React components built on Base UI.
- Component source installed directly in your project.

## CLI

```sh
nooeh list
nooeh docs [component]
nooeh doctor
```

Run `nooeh doctor` after setup to verify the UI alias, StyleX compiler, global
CSS import, and theme application.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Apache-2.0. See [LICENSE](./LICENSE).
