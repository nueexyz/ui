import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./marker.stylex";

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
