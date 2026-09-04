## Version v0.4.2

Released on 2026-09-04.

- Added separate body and heading typeface tokens. Set
  `typographyVars.fontFamilyBody` and `typographyVars.fontFamilyHeading` in
  your theme when your product uses distinct reading and display typefaces.

## Version v0.4.1

Released on 2026-09-03.

- `nuee init --framework vite` no longer adds `@nuee/ui` to your project.
  The reset stylesheet is generated locally, so component imports continue to
  resolve through your configured UI alias.

## Version v0.4.0

Released on 2026-09-03.

- Components now accept StyleX `xstyle` customisation only. Replace native
  `className` and inline `style` overrides with `xstyle` when upgrading.
- Removed the generated StyleX-to-native style bridge, so installed components
  use one consistent StyleX styling path.

## Version v0.3.2

Released on 2026-09-03.

- Components that need shared StyleX helpers now install every required local
  file, preventing Vite import-resolution failures.
- Added components preserve the UI and styles aliases configured in `nuee.json`.
  Existing Vite and StyleX settings remain under the project's control.
- Releases now build every registered component in a Vite consumer app before
  publishing, catching package integration problems earlier.
