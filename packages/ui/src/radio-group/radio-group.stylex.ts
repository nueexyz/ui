import {
  colorVars,
  opacityVars,
  radiusVars,
  sizeVars,
  spacingVars,
} from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  group: { display: "flex", flexDirection: "column", gap: spacingVars.space3 },
  item: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.full,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    cursor: "pointer",
    display: "inline-flex",
    height: "1.5rem",
    justifyContent: "center",
    outline: "none",
    width: "1.5rem",
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": { cursor: "not-allowed", opacity: opacityVars.disabled },
  },
  checked: { borderColor: colorVars.strokeAction },
  indicator: { alignItems: "center", display: "inline-flex", justifyContent: "center" },
  dot: {
    backgroundColor: colorVars.bgActionPrimary,
    borderRadius: radiusVars.full,
    height: "0.75rem",
    width: "0.75rem",
  },
});
