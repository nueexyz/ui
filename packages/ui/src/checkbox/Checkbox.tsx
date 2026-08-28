import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Icon } from "../Icon";
import { styles } from "./checkbox.stylex";

export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
  xstyle?: stylex.StyleXStyles;
};

export function Checkbox({ className, style, xstyle, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      {...props}
      className={(state) => {
        const stylexProps = stylex.props(
          styles.root,
          xstyle,
          state.checked && styles.checked,
          state.disabled && styles.disabled,
        );
        const customClassName = typeof className === "function" ? className(state) : className;
        return [stylexProps.className, customClassName].filter(Boolean).join(" ");
      }}
      style={(state) => {
        const stylexProps = stylex.props(
          styles.root,
          xstyle,
          state.checked && styles.checked,
          state.disabled && styles.disabled,
        );
        const customStyle = typeof style === "function" ? style(state) : style;
        return { ...stylexProps.style, ...customStyle };
      }}
    >
      <CheckboxPrimitive.Indicator {...stylex.props(styles.indicator)}>
        <Icon aria-hidden="true" name="check" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
