import { Input as InputPrimitive } from "@base-ui/react/input";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./input.stylex";

export type InputProps = ComponentProps<typeof InputPrimitive> & {
  xstyle?: stylex.StyleXStyles;
};

export function Input({
  "aria-invalid": ariaInvalid,
  className,
  style,
  xstyle,
  ...props
}: InputProps) {
  const isInvalid = ariaInvalid === true || ariaInvalid === "true";
  const stylexProps = stylex.props(styles.root, isInvalid && styles.invalid, xstyle);
  const mergedClassName = [stylexProps.className, className].filter(Boolean).join(" ");

  return (
    <InputPrimitive
      {...props}
      aria-invalid={ariaInvalid}
      className={mergedClassName}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}
