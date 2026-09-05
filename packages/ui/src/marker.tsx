import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";

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

export type MarkerProps = Omit<ComponentProps<"div">, "className" | "style"> & {
  variant?: "border" | "default" | "separator";
  xstyle?: stylex.StyleXStyles;
};

export function Marker({ variant = "default", xstyle, ...props }: MarkerProps) {
  return (
    <div
      {...props}
      {...stylex.props(
        styles.root,
        variant === "default" ? styles.variantDefault : styles[variant],
        xstyle,
      )}
    />
  );
}

export function MarkerIcon({ ...props }: Omit<ComponentProps<"span">, "className" | "style">) {
  return <span aria-hidden="true" {...props} {...stylex.props(styles.icon)} />;
}

export function MarkerContent({ ...props }: Omit<ComponentProps<"span">, "className" | "style">) {
  return <span {...props} {...stylex.props(styles.content)} />;
}
