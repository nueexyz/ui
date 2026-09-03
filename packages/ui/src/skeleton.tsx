import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, radiusVars } from "@nuee/tokens/semantic.stylex";

const pulse = stylex.keyframes({ "0%, 100%": { opacity: 1 }, "50%": { opacity: 0.5 } });

const styles = stylex.create({
  root: {
    animationDuration: "1.5s",
    animationIterationCount: "infinite",
    animationName: pulse,
    animationTimingFunction: "ease-in-out",
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.sm,
    "@media (prefers-reduced-motion: reduce)": { animationName: "none" },
  },
});

export type SkeletonProps = ComponentProps<"div"> & { xstyle?: stylex.StyleXStyles };

export function Skeleton({ className, style, xstyle, ...props }: SkeletonProps) {
  const stylexProps = stylex.props(styles.root, xstyle);
  return (
    <div
      {...props}
      aria-hidden="true"
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}
