import {
  colorVars,
  motionVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  popup: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    boxShadow: shadowVars.floating,
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    maxWidth: "20rem",
    outline: "none",
    padding: spacingVars.space4,
    transform: "translateY(0) scale(1)",
    transformOrigin: "var(--transform-origin)",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: motionVars.easingEnter,
    zIndex: 60,
    "@media (prefers-reduced-motion: reduce)": { transform: "none", transitionDuration: "0.01ms" },
  },
  transitioning: { opacity: 0, transform: "translateY(0.25rem) scale(0.98)" },
});
