import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./radio-group.stylex";

export type RadioGroupProps = ComponentProps<typeof RadioGroupPrimitive> & {
  xstyle?: stylex.StyleXStyles;
};

export function RadioGroup({ className, style, xstyle, ...props }: RadioGroupProps) {
  const stylexProps = stylex.props(styles.group, xstyle);
  return (
    <RadioGroupPrimitive
      {...props}
      className={(state) => {
        const customClassName = typeof className === "function" ? className(state) : className;
        return [stylexProps.className, customClassName].filter(Boolean).join(" ");
      }}
      style={(state) => ({
        ...stylexProps.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    />
  );
}

export type RadioGroupItemProps = ComponentProps<typeof RadioPrimitive.Root> & {
  xstyle?: stylex.StyleXStyles;
};

export function RadioGroupItem({ className, style, xstyle, ...props }: RadioGroupItemProps) {
  return (
    <RadioPrimitive.Root
      {...props}
      className={(state) => {
        const stylexProps = stylex.props(styles.item, state.checked && styles.checked, xstyle);
        const customClassName = typeof className === "function" ? className(state) : className;
        return [stylexProps.className, customClassName].filter(Boolean).join(" ");
      }}
      style={(state) => {
        const stylexProps = stylex.props(styles.item, state.checked && styles.checked, xstyle);
        return { ...stylexProps.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    >
      <RadioPrimitive.Indicator {...stylex.props(styles.indicator)}>
        <span {...stylex.props(styles.dot)} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}
