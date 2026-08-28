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
  positioner: { zIndex: 60 },
  popup: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    boxShadow: shadowVars.floating,
    color: colorVars.fgPrimary,
    maxWidth: "calc(100vw - 2rem)",
    outline: "none",
    padding: spacingVars.space4,
    width: "18rem",
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
