import {
  colorVars,
  motionVars,
  opacityVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: { alignItems: "center", display: "flex", gap: spacingVars.space2 },
  group: { display: "flex" },
  slot: {
    appearance: "none",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: 0,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    fontFamily: typographyVars.fontFamily,
    fontSize: typographyVars.fontSizeSm,
    height: sizeVars.controlLg,
    marginInlineStart: -1,
    outline: "none",
    textAlign: "center",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color, box-shadow, opacity",
    width: sizeVars.controlLg,
    ":first-child": {
      borderBottomLeftRadius: radiusVars.sm,
      borderTopLeftRadius: radiusVars.sm,
      marginInlineStart: 0,
    },
    ":last-child": { borderBottomRightRadius: radiusVars.sm, borderTopRightRadius: radiusVars.sm },
    ":hover:not(:disabled)": { borderColor: colorVars.strokeStrong },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
      zIndex: 1,
    },
    ":disabled": { cursor: "not-allowed", opacity: opacityVars.disabled },
  },
  separator: { color: colorVars.fgTertiary, paddingInline: spacingVars.space1 },
});
