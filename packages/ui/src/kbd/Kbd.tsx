import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./kbd.stylex";

type StyleProps = { xstyle?: stylex.StyleXStyles };

export function Kbd({ className, style, xstyle, ...props }: ComponentProps<"kbd"> & StyleProps) {
  const stylexProps = stylex.props(styles.root, xstyle);
  return (
    <kbd
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function KbdGroup({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"span"> & StyleProps) {
  const stylexProps = stylex.props(styles.group, xstyle);
  return (
    <span
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}
