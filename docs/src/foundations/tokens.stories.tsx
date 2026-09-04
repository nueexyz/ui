import {
  colorVars,
  motionVars,
  opacityVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import { Button } from "@nuee/ui/button";
import { Icon } from "@nuee/ui/icon";
import { Input } from "@nuee/ui/input";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const meta = {
  title: "Foundations/Tokens",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const move = stylex.keyframes({
  "0%": { transform: "translateX(0)" },
  "50%": { transform: "translateX(100%)" },
  "100%": { transform: "translateX(0)" },
});

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space8,
    marginInline: "auto",
    maxWidth: "64rem",
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
  list: {
    borderBlockStartColor: colorVars.strokeDefault,
    borderBlockStartStyle: "solid",
    borderBlockStartWidth: sizeVars.stroke,
    display: "flex",
    flexDirection: "column",
  },
  row: {
    alignItems: "center",
    borderBlockEndColor: colorVars.strokeDefault,
    borderBlockEndStyle: "solid",
    borderBlockEndWidth: sizeVars.stroke,
    display: "grid",
    gap: spacingVars.space4,
    gridTemplateColumns: "minmax(11rem, 1fr) minmax(11rem, 2fr)",
    minHeight: sizeVars.touchTarget,
    paddingBlock: spacingVars.space3,
    "@media (max-width: 40rem)": {
      alignItems: "stretch",
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  metadata: { display: "flex", flexDirection: "column", gap: spacingVars.space1 },
  tokenName: {
    color: colorVars.fgPrimary,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: typographyVars.fontSizeSm,
  },
  usage: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
    lineHeight: typographyVars.lineHeightNormal,
  },
  value: {
    color: colorVars.fgTertiary,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: typographyVars.fontSizeXs,
  },
  preview: { color: colorVars.fgPrimary, minWidth: 0 },
  fontFamilySample: (fontFamily: string) => ({ fontFamily }),
  typeSample: (fontSize: string, fontWeight: string, lineHeight: string) => ({
    fontSize,
    fontWeight,
    lineHeight,
  }),
  measure: (width: string) => ({
    backgroundColor: colorVars.bgActionPrimary,
    borderRadius: radiusVars.full,
    height: sizeVars.stroke,
    width,
  }),
  contentSample: (width: string) => ({
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.strokeDefault,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "flex",
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
    height: sizeVars.controlLg,
    justifyContent: "center",
    maxWidth: "100%",
    width,
  }),
  iconSample: (size: string) => ({ height: size, width: size }),
  touchTarget: {
    alignItems: "center",
    borderColor: colorVars.strokeStrong,
    borderRadius: radiusVars.md,
    borderStyle: "dashed",
    borderWidth: sizeVars.stroke,
    display: "inline-flex",
    height: sizeVars.touchTarget,
    justifyContent: "center",
    width: sizeVars.touchTarget,
  },
  strokeSample: (borderWidth: string) => ({
    alignItems: "center",
    borderColor: colorVars.strokeStrong,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeXs,
    height: sizeVars.controlLg,
    paddingInline: spacingVars.space4,
  }),
  focusSample: (outlineWidth: string) => ({
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeXs,
    height: sizeVars.controlMd,
    outlineColor: colorVars.strokeFocus,
    outlineOffset: sizeVars.stroke,
    outlineStyle: "solid",
    outlineWidth,
    paddingInline: spacingVars.space4,
  }),
  radiusBox: (borderRadius: string) => ({
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.strokeStrong,
    borderRadius,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    height: sizeVars.touchTarget,
    width: sizeVars.touchTarget,
  }),
  disabledSample: {
    backgroundColor: colorVars.bgActionPrimary,
    borderRadius: radiusVars.md,
    color: colorVars.fgInverse,
    opacity: opacityVars.disabled,
    paddingBlock: spacingVars.space2,
    paddingInline: spacingVars.space4,
    width: "fit-content",
  },
  motionTrack: {
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.full,
    maxWidth: sizeVars.contentSm,
    overflow: "hidden",
    padding: spacingVars.space1,
    width: "100%",
  },
  motionDot: (animationDuration: string) => ({
    animationDuration,
    animationIterationCount: "infinite",
    animationName: move,
    animationTimingFunction: motionVars.easingStandard,
    backgroundColor: colorVars.bgActionPrimary,
    borderRadius: radiusVars.full,
    height: sizeVars.iconMd,
    width: sizeVars.iconMd,
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
      <div {...stylex.props(styles.list)}>{children}</div>
    </main>
  );
}

function TokenRow({
  children,
  name,
  usage,
  value,
}: {
  children: ReactNode;
  name: string;
  usage: string;
  value: string;
}) {
  return (
    <div {...stylex.props(styles.row)}>
      <div {...stylex.props(styles.metadata)}>
        <code {...stylex.props(styles.tokenName)}>{name}</code>
        <span {...stylex.props(styles.usage)}>{usage}</span>
        <TokenValue token={value} />
      </div>
      <div {...stylex.props(styles.preview)}>{children}</div>
    </div>
  );
}

function TokenValue({ token }: { token: string }) {
  const elementRef = useRef<HTMLSpanElement>(null);
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
    <span ref={elementRef} {...stylex.props(styles.value)}>
      {value}
    </span>
  );
}

const fontSizeTokens = [
  ["fontSizeXs", typographyVars.fontSizeXs, "Supporting information and token values"],
  ["fontSizeSm", typographyVars.fontSizeSm, "Body text and form labels"],
  ["fontSizeMd", typographyVars.fontSizeMd, "Emphasized body text"],
  ["fontSizeLg", typographyVars.fontSizeLg, "Section headings"],
  ["fontSizeXl", typographyVars.fontSizeXl, "Page titles"],
] as const;

const lineHeightTokens = [
  ["lineHeightTight", typographyVars.lineHeightTight, "Headings and single-line text"],
  ["lineHeightNormal", typographyVars.lineHeightNormal, "Body text and multi-line text"],
] as const;

const fontWeightTokens = [
  ["fontWeightRegular", typographyVars.fontWeightRegular, "Default body text"],
  ["fontWeightMedium", typographyVars.fontWeightMedium, "Labels and subtle emphasis"],
  ["fontWeightSemibold", typographyVars.fontWeightSemibold, "Headings and strong emphasis"],
] as const;

export const Typography: Story = {
  render: () => (
    <Page
      title="Typography"
      description="Use font sizes, weights, and line heights that support information hierarchy and reading flow."
    >
      <TokenRow
        name="typographyVars.fontFamilyBody"
        usage="Body text, form controls, and product UI"
        value={typographyVars.fontFamilyBody}
      >
        <span {...stylex.props(styles.fontFamilySample(typographyVars.fontFamilyBody))}>
          Nuee Aa Bb
        </span>
      </TokenRow>
      <TokenRow
        name="typographyVars.fontFamilyHeading"
        usage="Display, title, and heading text"
        value={typographyVars.fontFamilyHeading}
      >
        <span {...stylex.props(styles.fontFamilySample(typographyVars.fontFamilyHeading))}>
          Nuee Aa Bb
        </span>
      </TokenRow>
      {fontSizeTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`typographyVars.${name}`} usage={usage} value={value}>
          <span
            {...stylex.props(
              styles.typeSample(
                value,
                typographyVars.fontWeightRegular,
                typographyVars.lineHeightNormal,
              ),
            )}
          >
            Nuee Aa Bb
          </span>
        </TokenRow>
      ))}
      {lineHeightTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`typographyVars.${name}`} usage={usage} value={value}>
          <span
            {...stylex.props(
              styles.typeSample(typographyVars.fontSizeSm, typographyVars.fontWeightRegular, value),
            )}
          >
            Line height for
            <br />
            two-line text
          </span>
        </TokenRow>
      ))}
      {fontWeightTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`typographyVars.${name}`} usage={usage} value={value}>
          <span
            {...stylex.props(
              styles.typeSample(typographyVars.fontSizeSm, value, typographyVars.lineHeightNormal),
            )}
          >
            Nuee Aa Bb
          </span>
        </TokenRow>
      ))}
    </Page>
  ),
};

const spacingTokens = [
  ["space0", spacingVars.space0, "No spacing"],
  ["space1", spacingVars.space1, "Inside icons and fine adjustments"],
  ["space2", spacingVars.space2, "Between nearby elements"],
  ["space3", spacingVars.space3, "Inside controls and small groups"],
  ["space4", spacingVars.space4, "Between default elements"],
  ["space5", spacingVars.space5, "Inside spacious controls"],
  ["space6", spacingVars.space6, "Inside cards and section groups"],
  ["space8", spacingVars.space8, "Page padding"],
  ["space10", spacingVars.space10, "Between large sections"],
  ["space12", spacingVars.space12, "Screen-level separation"],
] as const;

export const Spacing: Story = {
  render: () => (
    <Page
      title="Spacing"
      description="Use a 4px scale to control relationships between elements and screen density."
    >
      {spacingTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`spacingVars.${name}`} usage={usage} value={value}>
          <div {...stylex.props(styles.measure(value))} />
        </TokenRow>
      ))}
    </Page>
  ),
};

const contentSizeTokens = [
  ["contentSm", sizeVars.contentSm, "Popovers and narrow panels"],
  ["contentMd", sizeVars.contentMd, "Dialogs and default panels"],
] as const;

export const Size: Story = {
  render: () => (
    <Page
      title="Size"
      description="Size tokens define control height, displayed icon size, and actual target area independently."
    >
      <TokenRow
        name="sizeVars.controlSm"
        usage="Controls in toolbars and dense screens"
        value={sizeVars.controlSm}
      >
        <Button size="sm" variant="secondary">
          Small button
        </Button>
      </TokenRow>
      <TokenRow
        name="sizeVars.controlMd"
        usage="Default controls in forms and standard screens"
        value={sizeVars.controlMd}
      >
        <Input aria-label="Default input example" placeholder="Default input" />
      </TokenRow>
      <TokenRow
        name="sizeVars.controlLg"
        usage="Standalone controls that need more space"
        value={sizeVars.controlLg}
      >
        <Button size="lg" variant="secondary">
          Large button
        </Button>
      </TokenRow>
      <TokenRow
        name="sizeVars.iconSm"
        usage="Supporting icon in a small control"
        value={sizeVars.iconSm}
      >
        <Icon
          aria-label="Small information icon"
          name="info"
          {...stylex.props(styles.iconSample(sizeVars.iconSm))}
        />
      </TokenRow>
      <TokenRow name="sizeVars.iconMd" usage="Icon in a default control" value={sizeVars.iconMd}>
        <Icon
          aria-label="Default information icon"
          name="info"
          {...stylex.props(styles.iconSample(sizeVars.iconMd))}
        />
      </TokenRow>
      <TokenRow
        name="sizeVars.touchTarget"
        usage="Minimum target area for icon buttons"
        value={sizeVars.touchTarget}
      >
        <span {...stylex.props(styles.touchTarget)}>
          <Icon
            aria-hidden="true"
            name="info"
            {...stylex.props(styles.iconSample(sizeVars.iconMd))}
          />
        </span>
      </TokenRow>
      {contentSizeTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`sizeVars.${name}`} usage={usage} value={value}>
          <div {...stylex.props(styles.contentSample(value))}>{usage}</div>
        </TokenRow>
      ))}
      <TokenRow
        name="sizeVars.stroke"
        usage="Default border for controls and surfaces"
        value={sizeVars.stroke}
      >
        <span {...stylex.props(styles.strokeSample(sizeVars.stroke))}>Default border</span>
      </TokenRow>
      <TokenRow
        name="sizeVars.focusRing"
        usage="Ring that indicates keyboard focus"
        value={sizeVars.focusRing}
      >
        <span {...stylex.props(styles.focusSample(sizeVars.focusRing))}>Keyboard focus</span>
      </TokenRow>
    </Page>
  ),
};

const radiusTokens = [
  ["sm", radiusVars.sm, "Small controls"],
  ["md", radiusVars.md, "Default controls"],
  ["lg", radiusVars.lg, "Cards and large surfaces"],
  ["full", radiusVars.full, "Circular icons and badges"],
] as const;

export const Radius: Story = {
  render: () => (
    <Page title="Radius" description="Use corner radii that fit each element’s size and character.">
      {radiusTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`radiusVars.${name}`} usage={usage} value={value}>
          <div {...stylex.props(styles.radiusBox(value))} />
        </TokenRow>
      ))}
    </Page>
  ),
};

export const Opacity: Story = {
  render: () => (
    <Page
      title="Opacity"
      description="Differentiate availability while preserving the element’s meaning."
    >
      <TokenRow
        name="opacityVars.disabled"
        usage="Unavailable controls"
        value={opacityVars.disabled}
      >
        <div {...stylex.props(styles.disabledSample)}>Disabled</div>
      </TokenRow>
    </Page>
  ),
};

const motionTokens = [
  ["durationFast", motionVars.durationFast, "Hover and small state changes"],
  ["durationNormal", motionVars.durationNormal, "Surface and content transitions"],
  ["durationSlow", motionVars.durationSlow, "Large surface transitions, such as Dialog and Toast"],
] as const;

export const Motion: Story = {
  render: () => (
    <Page
      title="Motion"
      description="Communicate changes quickly without disrupting content comprehension."
    >
      {motionTokens.map(([name, duration, usage]) => (
        <TokenRow key={name} name={`motionVars.${name}`} usage={usage} value={duration}>
          <div {...stylex.props(styles.motionTrack)}>
            <div {...stylex.props(styles.motionDot(duration))} />
          </div>
        </TokenRow>
      ))}
      <TokenRow
        name="motionVars.easingStandard"
        usage="Default easing for state changes"
        value={motionVars.easingStandard}
      >
        <div {...stylex.props(styles.motionTrack)}>
          <div {...stylex.props(styles.motionDot(motionVars.durationNormal))} />
        </div>
      </TokenRow>
      <TokenRow
        name="motionVars.easingEnter"
        usage="When a new element appears"
        value={motionVars.easingEnter}
      >
        <div {...stylex.props(styles.motionTrack)}>
          <div {...stylex.props(styles.motionDot(motionVars.durationNormal))} />
        </div>
      </TokenRow>
      <TokenRow
        name="motionVars.easingExit"
        usage="When an element disappears"
        value={motionVars.easingExit}
      >
        <div {...stylex.props(styles.motionTrack)}>
          <div {...stylex.props(styles.motionDot(motionVars.durationFast))} />
        </div>
      </TokenRow>
    </Page>
  ),
};
