"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import type { ControlLayoutStyles } from "./control-layout";

const styles = stylex.create({
  root: {
    alignItems: "center",
    appearance: "none",
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    cursor: "pointer",
    display: "inline-flex",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    gap: spacingVars.space2,
    isolation: "isolate",
    justifyContent: "center",
    lineHeight: typographyVars.lineHeightTight,
    outline: "none",
    overflow: "hidden",
    position: "relative",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color, color, opacity",
    transitionTimingFunction: motionVars.easingStandard,
    userSelect: "none",
    whiteSpace: "nowrap",
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": {
      cursor: "not-allowed",
    },
    "::before": {
      backgroundColor: colorVars.interactionDefault,
      content: '""',
      inset: 0,
      pointerEvents: "none",
      position: "absolute",
      transitionDuration: motionVars.durationFast,
      transitionProperty: "background-color",
      transitionTimingFunction: motionVars.easingStandard,
      zIndex: 0,
    },
  },
  solidInteraction: {
    "::before": {
      backgroundColor: {
        default: colorVars.interactionDefault,
        ":hover": colorVars.interactionSolidHover,
        ":active": colorVars.interactionSolidPressed,
      },
    },
  },
  surfaceInteraction: {
    "::before": {
      backgroundColor: {
        default: colorVars.interactionDefault,
        ":hover": colorVars.interactionHover,
        ":active": colorVars.interactionPressed,
      },
    },
  },
  content: {
    alignItems: "center",
    display: "inline-flex",
    gap: spacingVars.space2,
    position: "relative",
    zIndex: 1,
  },
  iconContent: {
    gap: 0,
    // Give icon-only buttons a text baseline without adding visible content.
    "::before": { content: '"\\200b"' },
  },
  primary: {
    backgroundColor: colorVars.bgActionPrimary,
    borderColor: colorVars.bgActionPrimary,
    color: colorVars.fgOnActionPrimary,
  },
  secondary: {
    backgroundColor: colorVars.interactionDefault,
    borderColor: colorVars.strokeDefault,
    color: colorVars.fgPrimary,
  },
  ghost: {
    backgroundColor: colorVars.interactionDefault,
    borderColor: colorVars.interactionDefault,
    color: colorVars.fgPrimary,
  },
  destructive: {
    backgroundColor: colorVars.bgActionDestructive,
    borderColor: colorVars.bgActionDestructive,
    color: colorVars.fgOnActionDestructive,
  },
  disabled: {
    backgroundColor: colorVars.interactionDisabled,
    borderColor: colorVars.strokeDefault,
    color: colorVars.fgDisabled,
    "::before": { backgroundColor: colorVars.interactionDefault },
  },
  disabledGhost: {
    backgroundColor: colorVars.interactionDefault,
    borderColor: colorVars.interactionDefault,
  },
  sm: {
    borderRadius: radiusVars.sm,
    height: sizeVars.controlSm,
    paddingInline: spacingVars.space3,
  },
  md: {
    borderRadius: radiusVars.sm,
    height: sizeVars.controlMd,
    paddingInline: spacingVars.space4,
  },
  lg: {
    borderRadius: radiusVars.sm,
    height: sizeVars.controlLg,
    paddingInline: spacingVars.space5,
  },
  "icon-xs": {
    borderRadius: radiusVars.sm,
    height: sizeVars.controlXs,
    paddingInline: 0,
    width: sizeVars.controlXs,
  },
  "icon-sm": {
    borderRadius: radiusVars.sm,
    height: sizeVars.controlSm,
    paddingInline: 0,
    width: sizeVars.controlSm,
  },
  icon: {
    borderRadius: radiusVars.sm,
    height: sizeVars.controlMd,
    paddingInline: 0,
    width: sizeVars.controlMd,
  },
  "icon-lg": {
    borderRadius: radiusVars.sm,
    height: sizeVars.controlLg,
    paddingInline: 0,
    width: sizeVars.controlLg,
  },
  square: { paddingInline: 0 },
  circle: { borderRadius: radiusVars.full, paddingInline: 0 },
  iconSm: { width: sizeVars.controlSm },
  iconMd: { width: sizeVars.controlMd },
  iconLg: { width: sizeVars.controlLg },
});

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg" | "icon-xs" | "icon-sm" | "icon" | "icon-lg";

export type ButtonProps = Omit<ComponentProps<typeof ButtonPrimitive>, "className" | "style"> & {
  children: ReactNode;
  size?: ButtonSize;
  /** Use an icon size for icon-only buttons, and add an accessible name. */
  shape?: "default" | "square" | "circle";
  variant?: ButtonVariant;
  xstyle?: ControlLayoutStyles;
};

export function Button({
  children,
  disabled,
  size = "md",
  shape = "default",
  variant = "primary",
  xstyle,
  ...props
}: ButtonProps) {
  const isIconSize = size.startsWith("icon");
  const hasSolidBackground = variant === "primary" || variant === "destructive";

  return (
    <ButtonPrimitive
      {...props}
      disabled={disabled}
      {...stylex.props(
        styles.root,
        styles[variant],
        styles[size],
        shape !== "default" && styles[shape],
        !isIconSize && shape !== "default" && size === "sm" && styles.iconSm,
        !isIconSize && shape !== "default" && size === "md" && styles.iconMd,
        !isIconSize && shape !== "default" && size === "lg" && styles.iconLg,
        hasSolidBackground ? styles.solidInteraction : styles.surfaceInteraction,
        disabled && styles.disabled,
        disabled && variant === "ghost" && styles.disabledGhost,
        xstyle,
      )}
    >
      <span {...stylex.props(styles.content, isIconSize && styles.iconContent)}>{children}</span>
    </ButtonPrimitive>
  );
}
