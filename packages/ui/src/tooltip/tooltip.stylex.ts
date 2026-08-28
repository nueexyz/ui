import {
  colorVars,
  motionVars,
  radiusVars,
  shadowVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
  positioner: { zIndex: 70 },
  popup: {
    backgroundColor: colorVars.fgPrimary,
    borderRadius: radiusVars.sm,
    boxShadow: shadowVars.floating,
    color: colorVars.bgCanvas,
    fontSize: typographyVars.fontSizeXs,
    lineHeight: typographyVars.lineHeightNormal,
    maxWidth: "18rem",
    paddingBlock: spacingVars.space1,
    paddingInline: spacingVars.space3,
    transform: "scale(1)",
    transformOrigin: "var(--transform-origin)",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: motionVars.easingEnter,
    "@media (prefers-reduced-motion: reduce)": {
      transform: "none",
      transitionDuration: "0.01ms",
    },
  },
  popupTransitioning: { opacity: 0, transform: "scale(0.98)" },
  popupEnding: {
    transitionDuration: motionVars.durationFast,
    transitionTimingFunction: motionVars.easingExit,
  },
  arrow: { fill: colorVars.fgPrimary, height: spacingVars.space2, width: spacingVars.space3 },
});
