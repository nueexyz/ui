## Version v0.3.0

Released on 2026-09-03.

- Packages, CLI commands, generated configuration, and local token imports now
  use the Nuee name and the `@nuee/*` npm scope. Install with
  `pnpm dlx @nuee/ui`; only projects that directly import `@nooeh/*` packages
  need to replace those paths before upgrading.

## Version v0.2.8

Released on 2026-09-02.

- Vite setup now imports Nooeh's reset stylesheet automatically. Added
  components keep the same box model and form font metrics as their
  documentation examples.
