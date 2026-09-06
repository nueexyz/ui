## Version v0.5.0

Not yet released.

- Read documentation in Korean or English while keeping examples in English.
    Document controls and sidebar names stay in English. Language, theme, and
    motion menus use native controls styled to match nuée.
- Component examples keep their own spacing, typography, and table styles
    without inheriting Storybook document formatting.
- Preview examples without Storybook hook errors, and see selected text clearly
    in dark mode. Foundations now follow a deliberate reading order.

- Documentation themes now update examples and code together without clearing
    the current example. Most examples render directly in the page, avoiding
    repeated preview startup. Sidebar icons now use Phosphor.

- Component documentation now opens as a single page with content-sized
    previews, resizable examples, and code copying from the top right.
- Foundations explain when to use nuée components, tokens, and interaction
    patterns. The same guidance is available as `llms.txt` and `llms-full.txt` for
    AI-assisted screen creation.

- Horizontal fields align checkboxes with the first line of their label,
    including fields with supporting descriptions.
- Use `nuee init --vite` instead of `--framework vite` for Vite setup.
    Initialization suggests aliases from your TypeScript configuration.

- Stacked notifications keep crisp borders and shadows by narrowing older cards
    without scaling their contents.

- Press Escape to dismiss notifications one at a time, newest first. Holding the
    key does not dismiss the entire stack.
- Content Row titles and action labels now share their first text baseline,
    adapting to different button sizes without manual spacing adjustments.
- Icon-only buttons align with text actions in Content Row. Storybook now
    preserves component font sizes when loading the reset stylesheet.
- Toast status and loading icons align with the title's first line. Actions
    align with the title's first text baseline, and the close icon aligns with the
    center of that line, even when descriptions wrap.

- Customize the dismiss-all toast label with `clearAllProps.children`. It keeps
    a subtle background and border, while individual toast actions appear without
    backgrounds or borders, including on hover.
- Toast spacing and loading indicators now follow shared design tokens.
    Accordion, Message, Bubble, Table, Marker, Drawer, and Scroll Area also
    respect shared tokens for matching dimensions, borders, and spacing.

- Pressed controls in light mode now use a stronger, translucent highlight that
    preserves their underlying surface. Selected controls also look consistent
    with or without an explicitly applied light theme.
- Added Timeline for vertically ordered activity, status, and event histories.
    Compose items with clear state markers, content, descriptions, and semantic
    times.
- Dark-mode feedback surfaces now make each status easier to distinguish while
    preserving a consistent visual weight across information, success, warning,
    and error.
- Feedback surfaces no longer pair a soft status background with a competing
    colored border. Feedback borders remain for validation states that need a
    clear field boundary.
- Disabled content now sits clearly below secondary text in both color modes.
- Text selection uses a neutral highlight that adapts to surrounding text.
    Dark-mode default and strong borders are more subdued, while feedback and
    focus colors remain distinct.
- Toggle, Toggle Group, and segmented Tabs now share a higher-contrast selected
    surface in both color modes.
- Bubble documentation now uses the same outgoing primary treatment as Message.
- Storybook motion settings can be changed repeatedly without reloading. Popup
    closing transitions now respect reduced-motion settings as well.
- Interactive controls now use consistent motion timings for hover, selection,
    disabled, and open states. Reduced-motion transitions use a shared instant
    duration while keyboard menu highlighting remains immediate.
- Calendar dates remain readable in dark mode, and today has a subtle
    token-based background in both color modes. Date Picker triggers no longer
    include a calendar icon.
- Dark mode now separates primary, secondary, and tertiary content more clearly.
    Skeleton placeholders and disabled switches have stronger token-based contrast
    in both themes.
- Initialization preserves unreadable user tokens and checks supported Vite
    configuration before changing project files. Unsupported configuration shapes
    require manual compiler setup.
- Component installation validates registry data, source syntax, and the project
    manifest before writing components. Boolean CLI flags can precede component
    names, and aliases follow explicit TypeScript paths and inheritance.
- `nuee doctor` recognizes direct Vite compiler imports and exits unsuccessfully
    when setup cannot be verified. Other bundlers still need manual verification.
- Calendar arrow keys move focus correctly. Range interiors remain distinct from
    endpoints, and selected dates keep readable backgrounds while hovered.
- Styled component types reject native `className` and `style` overrides; use
    `xstyle` on components that expose it. Banner accepts React content in its
    title. Select and Combobox separators use valid token-based spacing.
- Carousel callback changes no longer restart selection subscriptions. Button
    Group styles direct nuée buttons or custom components that forward `xstyle`.

- Components generated with `nuee new`, Table, and Button Group now keep styling
    on the StyleX `xstyle` path. Replace native CSS overrides with `xstyle` when
    upgrading.

## Version v0.4.2

Released on 2026-09-04.

- Added Calendar, Date Picker, and Carousel components. Install only the
    packages you need with `nuee add calendar`, `date-picker`, or `carousel`.
- Calendar now keeps DayPicker CSS slot overrides internal; customize its root
    through nuée's `xstyle` API instead.
- Fixed Date Picker controlled state so clearing a selection with
    `value={undefined}` also clears the displayed value.
- Redesigned dark mode around charcoal surfaces, clearer elevation, and paired
    foreground colors so components remain readable when the theme changes.
- Removed the incomplete Message Scroller component from the registry. Compose
    conversation lists with Message Group until a complete scroller returns.
- Added separate body and heading typeface tokens. Set
    `typographyVars.fontFamilyBody` and `typographyVars.fontFamilyHeading` in your
    theme when your product uses distinct reading and display typefaces.
- `nuee add` now installs a component's documented building blocks together, so
    `nuee add field` also includes Checkbox and Input.
- `nuee add` skips external packages already declared in your project and
    installs missing packages without an unnecessary confirmation prompt.
- When an installed component would change, `nuee add` now shows the affected
    files and asks once before overwriting them.
- Bubble now separates visual variants from alignment. Use `variant="primary"`
    for sent messages and `align="end"` to position a bubble at the end.
- Message now uses the same alignment vocabulary and provides Group and Avatar
    slots for composing message lists without implicit layout behaviour.
- Attachment content now keeps equal visual space on both sides of its media and
    text.

## Version v0.4.1

Released on 2026-09-03.

- `nuee init --framework vite` no longer adds `@nuee/ui` to your project. The
    reset stylesheet is generated locally, so component imports continue to
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
