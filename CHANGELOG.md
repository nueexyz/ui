## Version v0.3.2

Released on 2026-09-03.

- Components that need shared StyleX helpers now install every required local
  file, preventing Vite import-resolution failures.
- Added components preserve the UI and styles aliases configured in `nuee.json`.
  Existing Vite and StyleX settings remain under the project's control.
- Releases now build every registered component in a Vite consumer app before
  publishing, catching package integration problems earlier.
