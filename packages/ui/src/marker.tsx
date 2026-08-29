import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, spacingVars, typographyVars } from "@dumo/tokens/tokens.stylex";

const styles = stylex.create({
  root: {
    alignItems: "center",
    color: colorVars.fgSecondary,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    gap: spacingVars.space2,
    lineHeight: typographyVars.lineHeightNormal,
    minWidth: 0,
  },
  variantDefault: {},
  border: {
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    paddingBottom: spacingVars.space2,
  },
  separator: {
    display: "flex",
    width: "100%",
    "::before": {
      backgroundColor: colorVars.strokeDefault,
      content: "",
      flex: 1,
      height: 1,
    },
    "::after": {
      backgroundColor: colorVars.strokeDefault,
      content: "",
      flex: 1,
      height: 1,
    },
  },
  icon: { alignItems: "center", display: "inline-flex", flexShrink: 0 },
  content: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
});

function mergeProps(
  resolved: ReturnType<typeof stylex.props>,
  className: string | undefined,
  style: ComponentProps<"div">["style"],
) {
  return {
    className: [resolved.className, className].filter(Boolean).join(" "),
    style: { ...resolved.style, ...style },
  };
}

export type MarkerProps = ComponentProps<"div"> & {
  variant?: "border" | "default" | "separator";
  xstyle?: stylex.StyleXStyles;
};

export function Marker({ className, style, variant = "default", xstyle, ...props }: MarkerProps) {
  return (
    <div
      {...props}
      {...mergeProps(
        stylex.props(
          styles.root,
          variant === "default" ? styles.variantDefault : styles[variant],
          xstyle,
        ),
        className,
        style,
      )}
    />
  );
}

export function MarkerIcon({ className, style, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      {...props}
      {...mergeProps(stylex.props(styles.icon), className, style)}
    />
  );
}

export function MarkerContent({ className, style, ...props }: ComponentProps<"span">) {
  return <span {...props} {...mergeProps(stylex.props(styles.content), className, style)} />;
}
