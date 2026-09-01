import * as stylex from "@stylexjs/stylex";

import { colorPalette } from "./color-palette.stylex";

export const colorVars = stylex.defineVars({
  bgCanvas: colorPalette.neutral100,
  bgSurface: colorPalette.neutral0,
  bgSurfacePressed: "oklch(97% 0 0)",
  bgSubtle: colorPalette.neutral50,
  bgRaised: colorPalette.neutral0,
  bgRaisedPressed: "oklch(97% 0 0)",
  bgActionPrimary: colorPalette.primarySolid,
  bgActionDestructive: colorPalette.redFeedback,
  bgFeedbackInfo: colorPalette.blueWeak,
  bgFeedbackSuccess: colorPalette.greenWeak,
  bgFeedbackWarning: colorPalette.yellowWeak,
  bgFeedbackError: colorPalette.redWeak,
  fgPrimary: colorPalette.neutral950,
  fgSecondary: colorPalette.neutral600,
  fgTertiary: colorPalette.neutral500,
  fgDisabled: colorPalette.alphaBlack50,
  fgInverse: colorPalette.neutral0,
  fgOnActionDestructive: colorPalette.neutral0,
  fgAction: colorPalette.primarySolid,
  fgFeedbackInfo: colorPalette.blueSolid,
  fgFeedbackSuccess: colorPalette.greenFeedback,
  fgFeedbackWarning: colorPalette.yellowFeedback,
  fgFeedbackError: colorPalette.redFeedback,
  strokeDefault: colorPalette.neutral200,
  strokeStrong: colorPalette.neutral300,
  strokeFocus: colorPalette.blueBadge,
  strokeAction: colorPalette.primarySolid,
  strokeFeedbackInfo: colorPalette.blueMuted,
  strokeFeedbackSuccess: colorPalette.greenMuted,
  strokeFeedbackWarning: colorPalette.yellowMuted,
  strokeFeedbackError: colorPalette.redMuted,
  interactionDefault: "transparent",
  interactionHover: colorPalette.alphaBlack6,
  interactionPressed: "oklch(97% 0 0)",
  interactionSolidHover: colorPalette.alphaWhite10,
  interactionSolidPressed: "oklch(97% 0 0)",
  interactionSelected: "oklch(97% 0 0)",
  interactionDisabled: colorPalette.alphaBlack8,
  interactionFocus: colorPalette.blueBadge,
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
  subtle: "0 1px 4px oklch(0% 0 0 / 8%)",
  floating: "0 2px 10px oklch(0% 0 0 / 10%)",
  overlay: "0 4px 16px oklch(0% 0 0 / 12%)",
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
