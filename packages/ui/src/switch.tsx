import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, motionVars, radiusVars, sizeVars } from "@nuee/tokens/semantic.stylex";

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
    transitionTimingFunction: motionVars.easingStandard,
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
  disabledThumb: { backgroundColor: colorVars.fgDisabled },
  thumb: {
    backgroundColor: colorVars.bgSurface,
    borderRadius: radiusVars.full,
    display: "block",
    transform: "translateX(0)",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, transform",
    transitionTimingFunction: motionVars.easingStandard,
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: motionVars.durationInstant,
    },
  },
  thumbsm: { height: "1rem", width: "1rem" },
  thumbmd: { height: "1.25rem", width: "1.25rem" },
  thumbCheckedsm: { transform: "translateX(0.75rem)" },
  thumbCheckedmd: { transform: "translateX(1rem)" },
});

export type SwitchProps = Omit<
  ComponentProps<typeof SwitchPrimitive.Root>,
  "className" | "style"
> & {
  size?: "md" | "sm";
  xstyle?: stylex.StyleXStyles;
};

export function Switch({ size = "md", xstyle, ...props }: SwitchProps) {
  function getRootStyles(state: SwitchPrimitive.Root.State) {
    return stylex.props(
      styles.root,
      styles[size],
      state.checked && styles.checked,
      state.disabled && styles.disabled,
      xstyle,
    );
  }
  return (
    <SwitchPrimitive.Root
      {...props}
      className={(state) => getRootStyles(state).className}
      style={(state) => getRootStyles(state).style}
    >
      <SwitchPrimitive.Thumb
        className={(state) =>
          stylex.props(
            styles.thumb,
            styles[`thumb${size}`],
            state.checked && styles[`thumbChecked${size}`],
            state.disabled && styles.disabledThumb,
          ).className
        }
      />
    </SwitchPrimitive.Root>
  );
}
