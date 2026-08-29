import { colorVars, radiusVars, spacingVars, typographyVars } from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: { color: colorVars.fgPrimary, fontFamily: typographyVars.fontFamily, margin: 0 },
  display: {
    fontSize: "2rem",
    fontWeight: typographyVars.fontWeightSemibold,
    letterSpacing: "-0.025em",
    lineHeight: typographyVars.lineHeightTight,
  },
  title: {
    fontSize: typographyVars.fontSizeXl,
    fontWeight: typographyVars.fontWeightSemibold,
    letterSpacing: "-0.015em",
    lineHeight: typographyVars.lineHeightTight,
  },
  heading: {
    fontSize: typographyVars.fontSizeLg,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightTight,
  },
  body: {
    fontSize: typographyVars.fontSizeMd,
    fontWeight: typographyVars.fontWeightRegular,
    lineHeight: typographyVars.lineHeightNormal,
  },
  label: {
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightNormal,
  },
  caption: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightRegular,
    lineHeight: typographyVars.lineHeightNormal,
  },
  code: {
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.sm,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    paddingBlock: spacingVars.space1,
    paddingInline: spacingVars.space2,
  },
});
