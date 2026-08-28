import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./bubble.stylex";

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
