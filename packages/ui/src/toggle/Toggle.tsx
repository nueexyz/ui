import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./toggle.stylex";

export type ToggleSize = "lg" | "md" | "sm";
export type ToggleVariant = "default" | "outline";

export type ToggleProps = ComponentProps<typeof TogglePrimitive> & {
  size?: ToggleSize;
  variant?: ToggleVariant;
  xstyle?: stylex.StyleXStyles;
};

export function Toggle({
  className,
  size = "md",
  style,
  variant = "default",
  xstyle,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive
      {...props}
      className={(state) => {
        const stylexProps = stylex.props(
          styles.root,
          styles[size],
          styles[variant],
          state.pressed && styles.pressed,
          state.disabled && styles.disabled,
          xstyle,
        );
        const customClassName = typeof className === "function" ? className(state) : className;
        return [stylexProps.className, customClassName].filter(Boolean).join(" ");
      }}
      style={(state) => {
        const stylexProps = stylex.props(
          styles.root,
          styles[size],
          styles[variant],
          state.pressed && styles.pressed,
          state.disabled && styles.disabled,
          xstyle,
        );
        return { ...stylexProps.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    />
  );
}
