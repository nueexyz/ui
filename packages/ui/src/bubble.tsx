import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, radiusVars, spacingVars, typographyVars } from "@nooeh/tokens/semantic.stylex";

const styles = stylex.create({
  root: {
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    maxWidth: "min(32rem, 85%)",
    paddingBlock: spacingVars.space3,
    paddingInline: spacingVars.space4,
    whiteSpace: "pre-wrap",
  },
  incoming: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: radiusVars.sm,
    borderRadius: radiusVars.sm,
  },
  outgoing: {
    alignSelf: "flex-end",
    borderBottomRightRadius: radiusVars.sm,
    borderRadius: radiusVars.sm,
  },
  variantDefault: { backgroundColor: colorVars.bgSubtle, color: colorVars.fgPrimary },
  outline: {
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderStyle: "solid",
    borderWidth: 1,
    color: colorVars.fgPrimary,
  },
});

export type BubbleProps = ComponentProps<"div"> & {
  side?: "incoming" | "outgoing";
  variant?: "default" | "outline";
  xstyle?: stylex.StyleXStyles;
};

export function Bubble({
  className,
  side = "incoming",
  style,
  variant = "default",
  xstyle,
  ...props
}: BubbleProps) {
  const resolved = stylex.props(
    styles.root,
    styles[side],
    variant === "default" ? styles.variantDefault : styles[variant],
    xstyle,
  );
  return (
    <div
      {...props}
      className={[resolved.className, className].filter(Boolean).join(" ")}
      data-side={side}
      style={{ ...resolved.style, ...style }}
    />
  );
}
