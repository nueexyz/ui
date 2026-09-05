"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    cursor: "pointer",
    display: "inline-flex",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    gap: spacingVars.space1,
    justifyContent: "center",
    outline: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color, color, opacity",
    transitionTimingFunction: motionVars.easingStandard,
    ":hover": { backgroundColor: colorVars.interactionHover },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": { cursor: "not-allowed" },
  },
  sm: {
    height: sizeVars.controlSm,
    minWidth: sizeVars.controlSm,
    paddingInline: spacingVars.space2,
  },
  md: {
    height: sizeVars.controlMd,
    minWidth: sizeVars.controlMd,
    paddingInline: spacingVars.space3,
  },
  lg: {
    height: sizeVars.controlLg,
    minWidth: sizeVars.controlLg,
    paddingInline: spacingVars.space4,
  },
  default: { backgroundColor: "transparent" },
  outline: { backgroundColor: colorVars.bgSurface, borderColor: colorVars.strokeDefault },
  pressed: { backgroundColor: colorVars.bgSurfacePressed, color: colorVars.fgPrimary },
  disabled: {
    backgroundColor: colorVars.interactionDisabled,
    borderColor: colorVars.strokeDefault,
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
    ":hover": { backgroundColor: colorVars.interactionDisabled },
  },
});

export type ToggleSize = "lg" | "md" | "sm";
export type ToggleVariant = "default" | "outline";

export type ToggleProps = Omit<ComponentProps<typeof TogglePrimitive>, "className" | "style"> & {
  size?: ToggleSize;
  variant?: ToggleVariant;
  xstyle?: stylex.StyleXStyles;
};

export function Toggle({ size = "md", variant = "default", xstyle, ...props }: ToggleProps) {
  function getToggleStyles(state: TogglePrimitive.State) {
    return stylex.props(
      styles.root,
      styles[size],
      styles[variant],
      state.pressed && styles.pressed,
      state.disabled && styles.disabled,
      xstyle,
    );
  }
  return (
    <TogglePrimitive
      {...props}
      className={(state) => getToggleStyles(state).className}
      style={(state) => getToggleStyles(state).style}
    />
  );
}
