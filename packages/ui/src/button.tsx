import { Button as ButtonPrimitive } from "@base-ui/react/button";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nooeh/tokens/tokens.stylex";

const spin = stylex.keyframes({
  to: { transform: "rotate(360deg)" },
});

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
  primary: {
    backgroundColor: colorVars.bgActionPrimary,
    borderColor: colorVars.bgActionPrimary,
    color: colorVars.fgInverse,
  },
  secondary: {
    backgroundColor: colorVars.bgSurface,
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
  },
  disabledGhost: {
    backgroundColor: colorVars.interactionDefault,
    borderColor: colorVars.interactionDefault,
  },
  disabledInteraction: {
    "::before": { backgroundColor: colorVars.interactionDefault },
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
  spinner: {
    animationDuration: "700ms",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
    borderColor: "currentColor",
    borderRadius: radiusVars.full,
    borderRightColor: colorVars.interactionDefault,
    borderStyle: "solid",
    borderWidth: sizeVars.focusRing,
    height: sizeVars.iconMd,
    width: sizeVars.iconMd,
  },
});

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ComponentProps<typeof ButtonPrimitive> & {
  children: ReactNode;
  isLoading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  xstyle?: stylex.StyleXStyles;
};

export function Button({
  children,
  className,
  disabled,
  isLoading = false,
  size = "md",
  style,
  variant = "primary",
  xstyle,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled && !isLoading);
  const isInteractionDisabled = Boolean(disabled || isLoading);
  const hasSolidBackground = variant === "primary" || variant === "destructive";
  const stylexProps = stylex.props(
    styles.root,
    styles[variant],
    styles[size],
    hasSolidBackground ? styles.solidInteraction : styles.surfaceInteraction,
    isDisabled && styles.disabled,
    isDisabled && variant === "ghost" && styles.disabledGhost,
    isInteractionDisabled && styles.disabledInteraction,
    xstyle,
  );
  const mergedClassName = [stylexProps.className, className].filter(Boolean).join(" ");

  return (
    <ButtonPrimitive
      {...props}
      className={mergedClassName}
      disabled={disabled || isLoading}
      style={{ ...stylexProps.style, ...style }}
    >
      <span {...stylex.props(styles.content)}>
        {isLoading ? <span aria-hidden="true" {...stylex.props(styles.spinner)} /> : null}
        {children}
      </span>
    </ButtonPrimitive>
  );
}
