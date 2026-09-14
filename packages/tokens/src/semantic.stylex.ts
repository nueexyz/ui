import * as stylex from "@stylexjs/stylex";

import { colorPalette } from "./color-palette.stylex";

export const colorVars = stylex.defineVars({
  bgCanvas: colorPalette.neutral100,
  bgSurface: colorPalette.neutral0,
  bgSurfacePressed: "oklch(97% 0 0)",
  bgInverse: colorPalette.neutral950,
  bgSubtle: colorPalette.neutral50,
  bgRaised: colorPalette.neutral0,
  bgRaisedPressed: "oklch(97% 0 0)",
  bgCurrent: colorPalette.alphaBlack6,
  bgOverlay: colorPalette.alphaBlack40,
  bgSkeleton: colorPalette.neutral200,
  bgActionPrimary: colorPalette.primarySolid,
  bgActionDestructive: colorPalette.redFeedback,
  bgMessageOutgoing: colorPalette.primarySolid,
  bgFeedbackInfo: colorPalette.blueWeak,
  bgFeedbackSuccess: colorPalette.greenWeak,
  bgFeedbackWarning: colorPalette.yellowWeak,
  bgFeedbackError: colorPalette.redWeak,
  fgPrimary: colorPalette.neutral950,
  fgSecondary: colorPalette.neutral600,
  fgTertiary: colorPalette.neutral500,
  fgDisabled: colorPalette.neutral500,
  fgInverse: colorPalette.neutral0,
  fgOnActionPrimary: colorPalette.neutral0,
  fgOnActionDestructive: colorPalette.neutral0,
  fgOnMessageOutgoing: colorPalette.neutral0,
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
  // Translucent state layers preserve the underlying surface; press is stronger than hover.
  interactionPressed: colorPalette.alphaBlack10,
  interactionSolidHover: colorPalette.alphaWhite10,
  interactionSolidPressed: colorPalette.alphaWhite20,
  // Persistent selected surface for segmented controls, matching the explicit light theme.
  interactionSelected: colorPalette.neutral0,
  interactionDisabled: colorPalette.alphaBlack8,
  interactionFocus: colorPalette.blueBadge,
});

export const spacingVars = stylex.defineVars({
  space0: "0",
  space0_5: "0.125rem",
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
  controlXs: "1.5rem",
  controlSm: "2rem",
  controlMd: "2.25rem",
  controlLg: "2.5rem",
  controlXl: "3rem",
  iconXs: "0.75rem",
  iconSm: "0.875rem",
  iconMd: "1rem",
  iconLg: "1.25rem",
  contentXs: "18rem",
  contentSm: "24rem",
  contentMd: "32rem",
  trackSm: "0.375rem",
  trackMd: "0.5rem",
  touchTarget: "2.75rem",
  stroke: "0.0625rem",
  focusRing: "0.125rem",
});

export const radiusVars = stylex.defineVars({
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "9999px",
});

export const shadowVars = stylex.defineVars({
  subtle: "0 1px 4px oklch(0% 0 0 / 8%)",
  floating: "0 2px 10px oklch(0% 0 0 / 10%)",
  overlay: "0 4px 16px oklch(0% 0 0 / 12%)",
});

export const layerVars = stylex.defineVars({
  modalBackdrop: "50",
  modal: "51",
  popup: "60",
  notification: "70",
});

export const typographyVars = stylex.defineVars({
  /** @deprecated Use fontFamilyBody or fontFamilyHeading instead. */
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontFamilyBody:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontFamilyHeading:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
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
  disabled: "0.6",
});

export const motionVars = stylex.defineVars({
  durationInstant: "0.01ms",
  durationFast: "120ms",
  durationNormal: "180ms",
  durationSlow: "240ms",
  durationLoading: "700ms",
  durationLoadingReduced: "1.5s",
  easingStandard: "cubic-bezier(0.2, 0, 0, 1)",
  easingEnter: "cubic-bezier(0.16, 1, 0.3, 1)",
  easingExit: "cubic-bezier(0.4, 0, 1, 1)",
});
