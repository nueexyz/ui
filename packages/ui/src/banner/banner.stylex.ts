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
    alignItems: "start",
    borderRadius: radiusVars.sm,
    color: colorVars.fgPrimary,
    display: "grid",
    width: "100%",
  },
  md: {
    columnGap: spacingVars.space3,
    paddingBlock: spacingVars.space3,
    paddingInline: spacingVars.space4,
  },
  sm: {
    alignItems: "center",
    borderRadius: radiusVars.sm,
    columnGap: spacingVars.space2,
    paddingBlock: spacingVars.space2,
    paddingInline: spacingVars.space3,
  },
  withIcon: { gridTemplateColumns: `${sizeVars.iconMd} minmax(0, 1fr)` },
  withAction: { gridTemplateColumns: `minmax(0, 1fr) auto` },
  withIconAndAction: {
    gridTemplateColumns: `${sizeVars.iconMd} minmax(0, 1fr) auto`,
  },
  icon: {
    alignItems: "center",
    alignSelf: "start",
    display: "inline-flex",
    height: sizeVars.iconMd,
    justifyContent: "center",
    width: sizeVars.iconMd,
  },
  iconAlignedCenter: { alignSelf: "center" },
  content: { display: "grid", gap: spacingVars.space1, minWidth: 0 },
  action: { alignItems: "center", display: "flex", gap: spacingVars.space2 },
  info: { backgroundColor: colorVars.bgFeedbackInfo, color: colorVars.fgFeedbackInfo },
  warning: {
    backgroundColor: colorVars.bgFeedbackWarning,
    color: colorVars.fgFeedbackWarning,
  },
  error: { backgroundColor: colorVars.bgFeedbackError, color: colorVars.fgFeedbackError },
  neutral: { backgroundColor: colorVars.bgSubtle, color: colorVars.fgSecondary },
  title: {
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightSemibold,
    lineHeight: typographyVars.lineHeightTight,
  },
  description: {
    color: "currentColor",
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    opacity: 0.82,
  },
});
