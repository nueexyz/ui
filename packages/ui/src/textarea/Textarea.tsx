import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./textarea.stylex";

export type TextareaProps = ComponentProps<"textarea"> & {
  xstyle?: stylex.StyleXStyles;
};

export function Textarea({
  "aria-invalid": ariaInvalid,
  className,
  style,
  xstyle,
  ...props
}: TextareaProps) {
  const isInvalid = ariaInvalid === true || ariaInvalid === "true";
  const stylexProps = stylex.props(styles.root, isInvalid && styles.invalid, xstyle);

  return (
    <textarea
      {...props}
      aria-invalid={ariaInvalid}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}
