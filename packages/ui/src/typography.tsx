import * as stylex from "@stylexjs/stylex";
import { createElement, type HTMLAttributes } from "react";

import { colorVars, radiusVars, spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: { color: colorVars.fgPrimary, fontFamily: typographyVars.fontFamily, margin: 0 },
  display: {
    fontSize: "2rem",
    fontWeight: typographyVars.fontWeightSemibold,
    letterSpacing: "-0.025em",
    lineHeight: typographyVars.lineHeightTight,
  },
  title: {
    fontSize: typographyVars.fontSizeXl,
    fontWeight: typographyVars.fontWeightSemibold,
    letterSpacing: "-0.015em",
    lineHeight: typographyVars.lineHeightTight,
  },
  heading: {
    fontSize: typographyVars.fontSizeLg,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightTight,
  },
  body: {
    fontSize: typographyVars.fontSizeMd,
    fontWeight: typographyVars.fontWeightRegular,
    lineHeight: typographyVars.lineHeightNormal,
  },
  label: {
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightNormal,
  },
  caption: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightRegular,
    lineHeight: typographyVars.lineHeightNormal,
  },
  code: {
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.sm,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    paddingBlock: spacingVars.space1,
    paddingInline: spacingVars.space2,
  },
});

type TypographyElement = "blockquote" | "code" | "h1" | "h2" | "h3" | "p" | "span";
type TypographyVariant = "body" | "caption" | "code" | "display" | "heading" | "label" | "title";

const defaultElementMap: Record<TypographyVariant, TypographyElement> = {
  body: "p",
  caption: "span",
  code: "code",
  display: "h1",
  heading: "h3",
  label: "span",
  title: "h2",
};

export type TypographyProps = HTMLAttributes<HTMLElement> & {
  as?: TypographyElement;
  variant?: TypographyVariant;
  xstyle?: stylex.StyleXStyles;
};

export function Typography({ as, variant = "body", xstyle, ...props }: TypographyProps) {
  const element = as ?? defaultElementMap[variant];
  return createElement(element, {
    ...props,
    ...stylex.props(styles.root, styles[variant], xstyle),
  });
}
