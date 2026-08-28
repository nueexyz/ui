import {
  colorVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  list: {
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.md,
    display: "inline-flex",
    minHeight: sizeVars.controlMd,
    padding: spacingVars.space1,
  },
  trigger: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderWidth: 0,
    borderRadius: radiusVars.sm,
    color: colorVars.fgSecondary,
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: typographyVars.fontFamily,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    height: sizeVars.controlSm,
    justifyContent: "center",
    outline: "none",
    paddingInline: spacingVars.space3,
    ":hover": { color: colorVars.fgPrimary },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": { cursor: "not-allowed", opacity: 0.38 },
  },
  triggerActive: {
    backgroundColor: colorVars.bgSurface,
    boxShadow: shadowVars.subtle,
    color: colorVars.fgPrimary,
  },
  panel: {
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    marginTop: spacingVars.space2,
    outline: "none",
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
});
