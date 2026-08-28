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
    borderColor: "transparent",
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    display: "flex",
    minWidth: 0,
    width: "100%",
  },
  variantDefault: { backgroundColor: "transparent" },
  muted: { backgroundColor: colorVars.bgSubtle },
  outline: { backgroundColor: colorVars.bgSurface, borderColor: colorVars.strokeDefault },
  xs: { gap: spacingVars.space2, minHeight: sizeVars.controlSm, padding: spacingVars.space2 },
  sm: { gap: spacingVars.space3, minHeight: sizeVars.touchTarget, padding: spacingVars.space3 },
  sizeDefault: { gap: spacingVars.space3, minHeight: "4rem", padding: spacingVars.space4 },
  group: { display: "flex", flexDirection: "column", gap: spacingVars.space2, width: "100%" },
  media: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    justifyContent: "center",
    overflow: "hidden",
  },
  mediaicon: {
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.md,
    color: colorVars.fgSecondary,
    height: sizeVars.controlMd,
    width: sizeVars.controlMd,
  },
  mediaavatar: { borderRadius: radiusVars.full },
  mediaimage: {
    borderRadius: radiusVars.md,
    height: sizeVars.touchTarget,
    width: sizeVars.touchTarget,
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacingVars.space1,
    minWidth: 0,
  },
  title: {
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightTight,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  actions: { alignItems: "center", display: "flex", flexShrink: 0, gap: spacingVars.space2 },
});
