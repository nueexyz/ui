import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./skeleton.stylex";

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
