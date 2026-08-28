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
    alignItems: "stretch",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "inline-flex",
    gap: spacingVars.space1,
    padding: spacingVars.space1,
    width: "fit-content",
  },
  horizontal: { flexDirection: "row" },
  vertical: { flexDirection: "column" },
  text: {
    alignItems: "center",
    color: colorVars.fgSecondary,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    paddingInline: spacingVars.space3,
  },
  separator: { alignSelf: "stretch", height: "auto" },
});
