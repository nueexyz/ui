import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./switch.stylex";

export type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "md" | "sm";
  xstyle?: stylex.StyleXStyles;
};

export function Switch({ className, size = "md", style, xstyle, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      {...props}
      className={(state) => {
        const stylexProps = stylex.props(
          styles.root,
          styles[size],
          state.checked && styles.checked,
          xstyle,
        );
        const customClassName = typeof className === "function" ? className(state) : className;
        return [stylexProps.className, customClassName].filter(Boolean).join(" ");
      }}
      style={(state) => {
        const stylexProps = stylex.props(
          styles.root,
          styles[size],
          state.checked && styles.checked,
          xstyle,
        );
        const customStyle = typeof style === "function" ? style(state) : style;
        return { ...stylexProps.style, ...customStyle };
      }}
    >
      <SwitchPrimitive.Thumb
        className={(state) =>
          stylex.props(
            styles.thumb,
            styles[`thumb${size}`],
            state.checked && styles[`thumbChecked${size}`],
          ).className
        }
      />
    </SwitchPrimitive.Root>
  );
}
