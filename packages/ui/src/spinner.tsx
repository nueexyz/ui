import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, radiusVars, sizeVars } from "@nooeh/tokens/tokens.stylex";

const spin = stylex.keyframes({ to: { transform: "rotate(360deg)" } });

const styles = stylex.create({
  root: {
    animationDuration: "700ms",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.full,
    borderRightColor: colorVars.fgPrimary,
    borderStyle: "solid",
    borderWidth: sizeVars.focusRing,
    display: "inline-block",
    height: sizeVars.iconMd,
    width: sizeVars.iconMd,
    "@media (prefers-reduced-motion: reduce)": { animationDuration: "1.5s" },
  },
});

export type SpinnerProps = ComponentProps<"output"> & {
  label?: string;
  xstyle?: stylex.StyleXStyles;
};

export function Spinner({ className, label = "Loading", style, xstyle, ...props }: SpinnerProps) {
  const stylexProps = stylex.props(styles.root, xstyle);
  return (
    <output
      {...props}
      aria-label={label}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}
