"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
} from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlPlacementStyles } from "./control-layout";

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
    padding: spacingVars.space0_5,
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
});

const sizeStyles = stylex.create({
  sm: { height: sizeVars.controlXs, width: sizeVars.controlSm },
  md: { height: sizeVars.controlXs, width: sizeVars.controlLg },
});

const thumbSizeStyles = stylex.create({
  sm: { height: sizeVars.iconMd, width: sizeVars.iconMd },
  md: { height: sizeVars.iconLg, width: sizeVars.iconLg },
});

const thumbCheckedStyles = stylex.create({
  sm: { transform: `translateX(${spacingVars.space3})` },
  md: { transform: `translateX(${spacingVars.space4})` },
});

export type SwitchProps = Omit<
  ComponentProps<typeof SwitchPrimitive.Root>,
  "className" | "style"
> & {
  size?: "md" | "sm";
  xstyle?: ControlPlacementStyles;
};

export function Switch({ size = "md", xstyle, ...props }: SwitchProps) {
  function getRootStyles(state: SwitchPrimitive.Root.State) {
    return stylex.props(
      styles.root,
      sizeStyles[size],
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
            thumbSizeStyles[size],
            state.checked && thumbCheckedStyles[size],
            state.disabled && styles.disabledThumb,
          ).className
        }
      />
    </SwitchPrimitive.Root>
  );
}
