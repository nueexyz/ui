import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

const spin = stylex.keyframes({
  to: { transform: "rotate(360deg)" },
});

export const styles = stylex.create({
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
      backgroundColor: {
        default: colorVars.interactionDefault,
        ":hover": colorVars.interactionHover,
        ":active": colorVars.interactionPressed,
        ":disabled": colorVars.interactionDefault,
      },
      content: '""',
      inset: 0,
      pointerEvents: "none",
      position: "absolute",
      zIndex: 0,
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
  sm: {
    borderRadius: radiusVars.sm,
    height: sizeVars.controlSm,
    paddingInline: spacingVars.space3,
  },
  md: {
    borderRadius: radiusVars.md,
    height: sizeVars.controlMd,
    paddingInline: spacingVars.space4,
  },
  lg: {
    borderRadius: radiusVars.md,
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
