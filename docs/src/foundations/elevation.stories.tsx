import {
  colorVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const meta = {
  title: "Foundations/Elevation",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space8,
    marginInline: "auto",
    maxWidth: "72rem",
    padding: spacingVars.space8,
  },
  header: { display: "flex", flexDirection: "column", gap: spacingVars.space2 },
  heading: {
    fontSize: typographyVars.fontSizeXl,
    lineHeight: typographyVars.lineHeightTight,
    margin: 0,
  },
  introduction: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  grid: {
    display: "grid",
    gap: spacingVars.space4,
    gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
  },
  example: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space3,
  },
  preview: {
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.lg,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    minHeight: "10rem",
    overflow: "hidden",
    padding: spacingVars.space4,
    position: "relative",
  },
  basement: { backgroundColor: colorVars.bgCanvas },
  defaultLayer: { backgroundColor: colorVars.bgSurface },
  floatingLayer: {
    backgroundColor: colorVars.bgRaised,
    boxShadow: shadowVars.floating,
  },
  overlayLayer: {
    backgroundColor: colorVars.bgRaised,
    boxShadow: shadowVars.overlay,
  },
  nestedLayer: {
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    padding: spacingVars.space4,
  },
  localLayer: {
    backgroundColor: colorVars.bgRaised,
    borderRadius: radiusVars.md,
    boxShadow: shadowVars.subtle,
    color: colorVars.fgPrimary,
    marginBlockStart: spacingVars.space4,
    padding: spacingVars.space4,
  },
  label: {
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  token: {
    color: colorVars.fgSecondary,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: typographyVars.fontSizeXs,
  },
  shadowPreview: (boxShadow: string) => ({
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.lg,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    boxShadow,
    height: "8rem",
  }),
});

function Page({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <main {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.heading)}>{title}</h1>
        <p {...stylex.props(styles.introduction)}>{description}</p>
      </header>
      {children}
    </main>
  );
}

function Example({
  children,
  description,
  name,
  token,
  value,
}: {
  children: ReactNode;
  description: string;
  name: string;
  token: string;
  value?: string;
}) {
  return (
    <article {...stylex.props(styles.example)}>
      {children}
      <strong {...stylex.props(styles.label)}>{name}</strong>
      <p {...stylex.props(styles.description)}>{description}</p>
      <code {...stylex.props(styles.token)}>{token}</code>
      {value ? <TokenValue token={value} /> : null}
    </article>
  );
}

function TokenValue({ token }: { token: string }) {
  const elementRef = useRef<HTMLElement>(null);
  const [value, setValue] = useState(token);

  useLayoutEffect(() => {
    const variableName = token.match(/var\((--[^,)]+)/)?.[1];
    const element = elementRef.current;
    const resolvedValue =
      variableName && element
        ? getComputedStyle(element).getPropertyValue(variableName).trim()
        : "";
    const nextValue = resolvedValue || token;

    setValue((currentValue) => (currentValue === nextValue ? currentValue : nextValue));
  }, [token]);

  return (
    <code ref={elementRef} {...stylex.props(styles.token)}>
      {value}
    </code>
  );
}

export const GlobalLevels: Story = {
  render: () => (
    <Page
      title="Global levels"
      description="Distinguish content levels across the screen. Express elevation with background, shadow, and border together."
    >
      <div {...stylex.props(styles.grid)}>
        <Example
          name="Basement"
          description="The lowest base for the app shell and screen."
          token="colorVars.bgCanvas"
        >
          <div {...stylex.props(styles.preview, styles.basement)}>
            <div {...stylex.props(styles.nestedLayer, styles.defaultLayer)}>Default content</div>
          </div>
        </Example>
        <Example
          name="Default"
          description="The default level for primary page content."
          token="colorVars.bgSurface"
        >
          <div {...stylex.props(styles.preview, styles.defaultLayer)}>
            <span {...stylex.props(styles.label)}>Main content</span>
          </div>
        </Example>
        <Example
          name="Modal"
          description="Dialogs and overlays that open above the current flow."
          token="colorVars.bgRaised + shadowVars.overlay"
        >
          <div {...stylex.props(styles.preview, styles.basement)}>
            <div {...stylex.props(styles.nestedLayer, styles.overlayLayer)}>Dialog</div>
          </div>
        </Example>
        <Example
          name="Critical modal"
          description="A flow that must be acknowledged first. It uses the same surface as a modal and sits at the top of the stack."
          token="colorVars.bgRaised + shadowVars.overlay"
        >
          <div {...stylex.props(styles.preview, styles.basement)}>
            <div {...stylex.props(styles.nestedLayer, styles.overlayLayer)}>Critical dialog</div>
          </div>
        </Example>
      </div>
    </Page>
  ),
};

export const LocalLevels: Story = {
  render: () => (
    <Page
      title="Local levels"
      description="Distinguish relationships between content and actions on the same screen. Adding a shadow does not necessarily create a higher global layer."
    >
      <div {...stylex.props(styles.grid)}>
        <Example
          name="Main content"
          description="The reference content for the current area."
          token="colorVars.bgSurface"
        >
          <div {...stylex.props(styles.preview, styles.defaultLayer)}>
            <span {...stylex.props(styles.label)}>Content</span>
          </div>
        </Example>
        <Example
          name="Floating action"
          description="An action fixed or floating above content."
          token="colorVars.bgRaised + shadowVars.subtle"
        >
          <div {...stylex.props(styles.preview, styles.defaultLayer)}>
            <div {...stylex.props(styles.localLayer)}>Floating action</div>
          </div>
        </Example>
        <Example
          name="Transient feedback"
          description="Temporary toasts and status messages."
          token="colorVars.bgRaised + shadowVars.overlay"
        >
          <div {...stylex.props(styles.preview, styles.defaultLayer)}>
            <div {...stylex.props(styles.nestedLayer, styles.overlayLayer)}>Changes saved</div>
          </div>
        </Example>
      </div>
    </Page>
  ),
};

const shadowTokens = [
  [
    "shadowVars.subtle",
    shadowVars.subtle,
    "Supports the boundary of actions or navigation fixed above content.",
  ],
  [
    "shadowVars.floating",
    shadowVars.floating,
    "Separates elements that float above content, such as menus and popovers.",
  ],
  [
    "shadowVars.overlay",
    shadowVars.overlay,
    "Emphasizes elements that need attention, such as dialogs and toasts.",
  ],
] as const;

export const Shadow: Story = {
  render: () => (
    <Page
      title="Shadow"
      description="Use shadows when the background alone does not establish enough separation. In dark mode, use higher opacity to preserve depth."
    >
      <div {...stylex.props(styles.grid)}>
        {shadowTokens.map(([name, token, description]) => (
          <Example key={name} name={name} description={description} token={name} value={token}>
            <div {...stylex.props(styles.shadowPreview(token))} />
          </Example>
        ))}
      </div>
    </Page>
  ),
};
