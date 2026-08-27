/* oxlint-disable jsx-a11y/label-has-associated-control -- The caller provides htmlFor or nests the control. */
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./label.stylex";

export type LabelProps = ComponentProps<"label"> & { xstyle?: stylex.StyleXStyles };

export function Label({ className, style, xstyle, ...props }: LabelProps) {
  const stylexProps = stylex.props(styles.root, xstyle);
  return (
    <label
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}
