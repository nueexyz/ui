import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: {
    alignItems: "center",
    borderRadius: radiusVars.full,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    gap: spacingVars.space1,
    justifyContent: "center",
    lineHeight: typographyVars.lineHeightTight,
    minHeight: sizeVars.iconMd,
    paddingBlock: spacingVars.space1,
    paddingInline: spacingVars.space2,
    whiteSpace: "nowrap",
  },
  primary: {
    backgroundColor: colorVars.bgActionPrimary,
    borderColor: colorVars.bgActionPrimary,
    color: colorVars.fgInverse,
  },
  secondary: {
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.bgSubtle,
    color: colorVars.fgPrimary,
  },
  destructive: {
    backgroundColor: colorVars.bgFeedbackError,
    borderColor: colorVars.strokeFeedbackError,
    color: colorVars.fgFeedbackError,
  },
  outline: {
    backgroundColor: colorVars.interactionDefault,
    borderColor: colorVars.strokeDefault,
    color: colorVars.fgPrimary,
  },
  ghost: {
    backgroundColor: colorVars.interactionDefault,
    borderColor: colorVars.interactionDefault,
    color: colorVars.fgPrimary,
  },
});

type BadgeVariant = "primary" | "secondary" | "destructive" | "outline" | "ghost";

export type BadgeProps = ComponentProps<"span"> & {
  variant?: BadgeVariant;
  xstyle?: stylex.StyleXStyles;
};

export function Badge({ variant = "primary", xstyle, ...props }: BadgeProps) {
  const stylexProps = stylex.props(styles.root, styles[variant], xstyle);
  return <span {...props} {...stylexProps} />;
}
