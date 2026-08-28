import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "flex",
    gap: spacingVars.space1,
    minHeight: sizeVars.controlMd,
    padding: spacingVars.space1,
  },
  trigger: {
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderWidth: 0,
    borderRadius: radiusVars.sm,
    color: colorVars.fgPrimary,
    cursor: "pointer",
    fontFamily: typographyVars.fontFamily,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    height: sizeVars.controlSm,
    outline: "none",
    paddingInline: spacingVars.space3,
    ":hover": { backgroundColor: colorVars.bgSubtle },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  triggerOpen: { backgroundColor: colorVars.bgSubtle },
});
