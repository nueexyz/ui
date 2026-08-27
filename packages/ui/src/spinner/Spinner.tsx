import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./spinner.stylex";

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
