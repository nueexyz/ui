import { colorVars, motionVars, radiusVars, sizeVars } from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: colorVars.interactionDisabled,
    borderStyle: "none",
    borderWidth: 0,
    borderRadius: radiusVars.full,
    cursor: "pointer",
    display: "inline-flex",
    flexShrink: 0,
    outline: "none",
    padding: "0.125rem",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, opacity",
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": { cursor: "not-allowed" },
  },
  sm: { height: "1.5rem", width: "2rem" },
  md: { height: "1.5rem", width: "2.5rem" },
  checked: { backgroundColor: colorVars.bgActionPrimary },
  disabled: { backgroundColor: colorVars.interactionDisabled, cursor: "not-allowed" },
  thumb: {
    backgroundColor: colorVars.bgSurface,
    borderRadius: radiusVars.full,
    display: "block",
    transform: "translateX(0)",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "transform",
  },
  thumbsm: { height: "1rem", width: "1rem" },
  thumbmd: { height: "1.25rem", width: "1.25rem" },
  thumbCheckedsm: { transform: "translateX(0.75rem)" },
  thumbCheckedmd: { transform: "translateX(1rem)" },
});
