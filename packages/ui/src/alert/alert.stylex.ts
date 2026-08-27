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
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.lg,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    display: "grid",
    gap: spacingVars.space1,
    paddingBlock: spacingVars.space3,
    paddingInline: spacingVars.space4,
    width: "100%",
  },
  default: {},
  destructive: {
    backgroundColor: colorVars.bgFeedbackError,
    borderColor: colorVars.strokeFeedbackError,
    color: colorVars.fgFeedbackError,
  },
  title: {
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightTight,
  },
  description: {
    color: "currentColor",
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    opacity: 0.82,
  },
});
