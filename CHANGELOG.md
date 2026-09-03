## Version v0.3.0

Released on 2026-09-03.

- `init` and `add` now finish with one concise confirmation line, making their
  output easier to scan in terminals and automation logs.
- Dependency installation during `add` now stays quiet after confirmation,
  keeping package-manager progress and runtime warnings out of normal output.
- Components that share StyleX helpers now install those helpers too, preventing
  Vite import-resolution errors after `add`.
- `add` now accepts multiple component names in one command, so related UI
  components can be installed together.
- Checkbox controls now meet the minimum pointer target size. Banners only
  announce content when the new `announce` prop opts in to a live region.
- Packages, CLI commands, generated configuration, and local token imports now
  use the Nuee name and the `@nuee/*` npm scope. Install with
  `pnpm dlx @nuee/ui`; only projects that directly import `@nooeh/*` packages
  need to replace those paths before upgrading.

## Version v0.2.8

Released on 2026-09-02.

- Vite setup now imports Nooeh's reset stylesheet automatically. Added
  components keep the same box model and form font metrics as their
  documentation examples.
