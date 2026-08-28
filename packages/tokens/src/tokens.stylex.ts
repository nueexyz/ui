import * as stylex from "@stylexjs/stylex";

export const colorVars = stylex.defineVars({
  bgCanvas: "initial",
  bgSurface: "initial",
  bgSurfacePressed: "initial",
  bgSubtle: "initial",
  bgRaised: "initial",
  bgRaisedPressed: "initial",
  bgActionPrimary: "initial",
  bgActionDestructive: "initial",
  bgFeedbackInfo: "initial",
  bgFeedbackSuccess: "initial",
  bgFeedbackWarning: "initial",
  bgFeedbackError: "initial",
  fgPrimary: "initial",
  fgSecondary: "initial",
  fgTertiary: "initial",
  fgDisabled: "initial",
  fgInverse: "initial",
  fgOnActionDestructive: "initial",
  fgAction: "initial",
  fgFeedbackInfo: "initial",
  fgFeedbackSuccess: "initial",
  fgFeedbackWarning: "initial",
  fgFeedbackError: "initial",
  strokeDefault: "initial",
  strokeStrong: "initial",
  strokeFocus: "initial",
  strokeAction: "initial",
  strokeFeedbackInfo: "initial",
  strokeFeedbackSuccess: "initial",
  strokeFeedbackWarning: "initial",
  strokeFeedbackError: "initial",
  interactionDefault: "initial",
  interactionHover: "initial",
  interactionPressed: "initial",
  interactionSelected: "initial",
  interactionDisabled: "initial",
  interactionFocus: "initial",
});

export const spacingVars = stylex.defineVars({
  space0: "0",
  space1: "0.25rem",
  space2: "0.5rem",
  space3: "0.75rem",
  space4: "1rem",
  space5: "1.25rem",
  space6: "1.5rem",
  space8: "2rem",
  space10: "2.5rem",
  space12: "3rem",
});

export const sizeVars = stylex.defineVars({
  controlSm: "2rem",
  controlMd: "2.25rem",
  controlLg: "2.5rem",
  iconSm: "0.875rem",
  iconMd: "1rem",
  contentSm: "24rem",
  contentMd: "32rem",
  touchTarget: "2.75rem",
  stroke: "0.0625rem",
  focusRing: "0.125rem",
});

export const radiusVars = stylex.defineVars({
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  full: "9999px",
});

export const shadowVars = stylex.defineVars({
  subtle: "initial",
  floating: "initial",
  overlay: "initial",
});

export const typographyVars = stylex.defineVars({
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontSizeXs: "0.75rem",
  fontSizeSm: "0.875rem",
  fontSizeMd: "1rem",
  fontSizeLg: "1.125rem",
  fontSizeXl: "1.5rem",
  lineHeightTight: "1.25",
  lineHeightNormal: "1.5",
  fontWeightRegular: "400",
  fontWeightMedium: "500",
  fontWeightSemibold: "600",
});

export const opacityVars = stylex.defineVars({
  disabled: "0.8",
});

export const motionVars = stylex.defineVars({
  durationFast: "120ms",
  durationNormal: "180ms",
  durationSlow: "240ms",
  easingStandard: "cubic-bezier(0.2, 0, 0, 1)",
  easingEnter: "cubic-bezier(0.16, 1, 0.3, 1)",
  easingExit: "cubic-bezier(0.4, 0, 1, 1)",
});
