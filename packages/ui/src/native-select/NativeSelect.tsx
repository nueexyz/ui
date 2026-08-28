import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Icon } from "../Icon";
import { styles } from "./native-select.stylex";

export type NativeSelectProps = Omit<ComponentProps<"select">, "size"> & {
  size?: "md" | "sm";
  xstyle?: stylex.StyleXStyles;
};

export function NativeSelect({
  className,
  children,
  size = "md",
  style,
  xstyle,
  ...props
}: NativeSelectProps) {
  const stylexProps = stylex.props(styles.select, styles[size], xstyle);
  return (
    <span {...stylex.props(styles.root)}>
      <select
        {...props}
        className={[stylexProps.className, className].filter(Boolean).join(" ")}
        style={{ ...stylexProps.style, ...style }}
      >
        {children}
      </select>
      <Icon aria-hidden="true" name="chevronDown" {...stylex.props(styles.icon)} />
    </span>
  );
}

export function NativeSelectOption(props: ComponentProps<"option">) {
  return <option {...props} />;
}
export function NativeSelectOptGroup(props: ComponentProps<"optgroup">) {
  return <optgroup {...props} />;
}
