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
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.lg,
    borderStyle: "dashed",
    borderWidth: sizeVars.stroke,
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space6,
    justifyContent: "center",
    minWidth: 0,
    padding: spacingVars.space8,
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space2,
    maxWidth: sizeVars.contentSm,
  },
  media: {
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.lg,
    color: colorVars.fgSecondary,
    display: "flex",
    height: sizeVars.touchTarget,
    justifyContent: "center",
    width: sizeVars.touchTarget,
  },
  title: {
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeLg,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightTight,
    margin: 0,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  content: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space4,
    maxWidth: sizeVars.contentSm,
    width: "100%",
  },
});
