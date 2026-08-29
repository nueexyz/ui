import { colorVars, spacingVars, typographyVars } from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: { display: "flex", gap: spacingVars.space2, width: "100%" },
  vertical: { flexDirection: "column" },
  horizontal: { alignItems: "center", flexDirection: "row", gap: spacingVars.space4 },
  label: {
    color: colorVars.fgPrimary,
    cursor: "default",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightNormal,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  error: {
    color: colorVars.fgFeedbackError,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
  },
  set: {
    borderStyle: "none",
    borderWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space6,
    margin: 0,
    minWidth: 0,
    padding: 0,
  },
  legend: {
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeMd,
    fontWeight: typographyVars.fontWeightMedium,
    marginBottom: spacingVars.space3,
    padding: 0,
  },
  group: { display: "flex", flexDirection: "column", gap: spacingVars.space6, width: "100%" },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacingVars.space1,
    minWidth: 0,
  },
  title: {
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightNormal,
  },
});
