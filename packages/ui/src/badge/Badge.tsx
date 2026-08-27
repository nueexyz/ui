import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./badge.stylex";

type BadgeVariant = "primary" | "secondary" | "destructive" | "outline" | "ghost";

export type BadgeProps = ComponentProps<"span"> & {
  variant?: BadgeVariant;
  xstyle?: stylex.StyleXStyles;
};

export function Badge({ className, style, variant = "primary", xstyle, ...props }: BadgeProps) {
  const stylexProps = stylex.props(styles.root, styles[variant], xstyle);
  return (
    <span
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}
