import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  card: {
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space1,
    paddingBlock: spacingVars.space6,
    paddingInline: spacingVars.space6,
  },
  title: {
    fontSize: typographyVars.fontSizeLg,
    fontWeight: typographyVars.fontWeightSemibold,
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
    paddingBlockEnd: spacingVars.space6,
    paddingInline: spacingVars.space6,
  },
  footer: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space3,
    paddingBlockEnd: spacingVars.space6,
    paddingInline: spacingVars.space6,
  },
});
