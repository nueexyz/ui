import { typographyVars } from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

export const typographyStyles = stylex.create({
  body: {
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeMd,
    fontWeight: typographyVars.fontWeightRegular,
    lineHeight: typographyVars.lineHeightNormal,
  },
  description: {
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightRegular,
    lineHeight: typographyVars.lineHeightNormal,
  },
  caption: {
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightRegular,
    lineHeight: typographyVars.lineHeightNormal,
  },
  label: {
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightNormal,
  },
  title: {
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightTight,
  },
  page: {
    fontFamily: typographyVars.fontFamilyHeading,
    fontSize: typographyVars.fontSizeXl,
    fontWeight: typographyVars.fontWeightSemibold,
    lineHeight: typographyVars.lineHeightTight,
  },
  section: {
    fontFamily: typographyVars.fontFamilyHeading,
    fontSize: typographyVars.fontSizeLg,
    fontWeight: typographyVars.fontWeightSemibold,
    lineHeight: typographyVars.lineHeightTight,
  },
  subsection: {
    fontFamily: typographyVars.fontFamilyHeading,
    fontSize: typographyVars.fontSizeMd,
    fontWeight: typographyVars.fontWeightSemibold,
    lineHeight: typographyVars.lineHeightTight,
  },
});
