import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Separator } from "../separator";
import { styles } from "./button-group.stylex";

type StyleProps = { xstyle?: stylex.StyleXStyles };

export type ButtonGroupProps = ComponentProps<"div"> &
  StyleProps & { orientation?: "horizontal" | "vertical" };

export function ButtonGroup({
  className,
  orientation = "horizontal",
  style,
  xstyle,
  ...props
}: ButtonGroupProps) {
  const stylexProps = stylex.props(styles.root, styles[orientation], xstyle);
  return (
    <div
      {...props}
      data-orientation={orientation}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function ButtonGroupText({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"span"> & StyleProps) {
  const stylexProps = stylex.props(styles.text, xstyle);
  return (
    <span
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function ButtonGroupSeparator({
  orientation = "vertical",
  xstyle,
  ...props
}: ComponentProps<typeof Separator> & StyleProps) {
  return <Separator {...props} orientation={orientation} xstyle={[styles.separator, xstyle]} />;
}
