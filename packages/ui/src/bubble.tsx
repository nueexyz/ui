import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, radiusVars, spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: {
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    maxWidth: "min(32rem, 100%)",
    paddingBlock: spacingVars.space3,
    paddingInline: spacingVars.space4,
    whiteSpace: "pre-wrap",
  },
  alignStart: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: radiusVars.sm,
    borderRadius: radiusVars.sm,
  },
  alignEnd: {
    alignSelf: "flex-end",
    borderBottomRightRadius: radiusVars.sm,
    borderRadius: radiusVars.sm,
  },
  default: { backgroundColor: colorVars.bgSubtle, color: colorVars.fgPrimary },
  primary: {
    backgroundColor: colorVars.bgMessageOutgoing,
    color: colorVars.fgOnMessageOutgoing,
  },
  outline: {
    borderColor: colorVars.strokeDefault,
    borderStyle: "solid",
    borderWidth: 1,
    color: colorVars.fgPrimary,
  },
});

export type BubbleAlign = "start" | "end";
export type BubbleVariant = "default" | "primary" | "outline";

export type BubbleProps = Omit<ComponentProps<"div">, "className" | "style"> & {
  align?: BubbleAlign;
  variant?: BubbleVariant;
  xstyle?: stylex.StyleXStyles;
};

export function Bubble({ align = "start", variant = "default", xstyle, ...props }: BubbleProps) {
  return (
    <div
      {...props}
      data-align={align}
      data-variant={variant}
      {...stylex.props(
        styles.root,
        align === "start" ? styles.alignStart : styles.alignEnd,
        styles[variant],
        xstyle,
      )}
    />
  );
}
