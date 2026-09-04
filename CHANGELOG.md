## Version v0.4.2

Released on 2026-09-04.

- Added Calendar, Date Picker, and Carousel components. Install only the
  packages you need with `nuee add calendar`, `date-picker`, or `carousel`.
- Calendar now keeps DayPicker CSS slot overrides internal; customize its root
  through Nuee's `xstyle` API instead.
- Fixed Date Picker controlled state so clearing a selection with
  `value={undefined}` also clears the displayed value.
- Redesigned dark mode around charcoal surfaces, clearer elevation, and paired
  foreground colors so components remain readable when the theme changes.
- Removed the incomplete Message Scroller component from the registry. Compose
  conversation lists with Message Group until a complete scroller returns.
- Added separate body and heading typeface tokens. Set
  `typographyVars.fontFamilyBody` and `typographyVars.fontFamilyHeading` in
  your theme when your product uses distinct reading and display typefaces.
- `nuee add` now installs a component's documented building blocks together,
  so `nuee add field` also includes Checkbox and Input.
- `nuee add` skips external packages already declared in your project and
  installs missing packages without an unnecessary confirmation prompt.
- When an installed component would change, `nuee add` now shows the affected
  files and asks once before overwriting them.
- Bubble now separates visual variants from alignment. Use `variant="primary"`
  for sent messages and `align="end"` to position a bubble at the end.
- Message now uses the same alignment vocabulary and provides Group and Avatar
  slots for composing message lists without implicit layout behaviour.
- Attachment content now keeps equal visual space on both sides of its media
  and text.

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
