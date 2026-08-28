import { colorVars, opacityVars, radiusVars, sizeVars } from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
  root: { opacity: { default: 1, ":disabled": opacityVars.disabled }, width: "100%" },
  control: {
    alignItems: "center",
    display: "flex",
    height: sizeVars.touchTarget,
    position: "relative",
    touchAction: "none",
    width: "100%",
  },
  track: {
    backgroundColor: colorVars.interactionSelected,
    borderRadius: radiusVars.full,
    height: "0.375rem",
    overflow: "hidden",
    width: "100%",
  },
  indicator: {
    backgroundColor: colorVars.bgActionPrimary,
    borderRadius: radiusVars.full,
    height: "100%",
  },
  thumb: {
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeAction,
    borderRadius: radiusVars.full,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    height: "1.25rem",
    outline: "none",
    width: "1.25rem",
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
});
