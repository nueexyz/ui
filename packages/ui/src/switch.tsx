import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, motionVars, radiusVars, sizeVars } from "@nooeh/tokens/semantic.stylex";

const styles = stylex.create({
  root: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: colorVars.interactionDisabled,
    borderStyle: "none",
    borderWidth: 0,
    borderRadius: radiusVars.full,
    cursor: "pointer",
    display: "inline-flex",
    flexShrink: 0,
    outline: "none",
    padding: "0.125rem",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, opacity",
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": { cursor: "not-allowed" },
  },
  sm: { height: "1.5rem", width: "2rem" },
  md: { height: "1.5rem", width: "2.5rem" },
  checked: { backgroundColor: colorVars.bgActionPrimary },
  disabled: { backgroundColor: colorVars.interactionDisabled, cursor: "not-allowed" },
  thumb: {
    backgroundColor: colorVars.bgSurface,
    borderRadius: radiusVars.full,
    display: "block",
    transform: "translateX(0)",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "transform",
  },
  thumbsm: { height: "1rem", width: "1rem" },
  thumbmd: { height: "1.25rem", width: "1.25rem" },
  thumbCheckedsm: { transform: "translateX(0.75rem)" },
  thumbCheckedmd: { transform: "translateX(1rem)" },
});

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
          state.checked && styles.checked,
          state.disabled && styles.disabled,
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
