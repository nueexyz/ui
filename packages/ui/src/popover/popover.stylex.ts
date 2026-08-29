import {
  colorVars,
  motionVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
  positioner: { zIndex: 60 },
  popup: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    boxShadow: shadowVars.floating,
    color: colorVars.fgPrimary,
    maxWidth: "calc(100vw - 2rem)",
    outline: "none",
    padding: spacingVars.space4,
    transform: "scale(1)",
    transformOrigin: "var(--transform-origin)",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: motionVars.easingEnter,
    width: "18rem",
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
  header: { display: "flex", flexDirection: "column", gap: spacingVars.space1 },
  title: {
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
});
