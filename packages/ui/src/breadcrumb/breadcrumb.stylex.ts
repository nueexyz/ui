import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: { minWidth: 0 },
  list: {
    alignItems: "center",
    color: colorVars.fgSecondary,
    display: "flex",
    flexWrap: "wrap",
    fontSize: typographyVars.fontSizeSm,
    gap: spacingVars.space2,
    lineHeight: typographyVars.lineHeightNormal,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  item: { alignItems: "center", display: "inline-flex", gap: spacingVars.space2 },
  link: {
    borderRadius: radiusVars.sm,
    color: colorVars.fgSecondary,
    outline: "none",
    textDecoration: "none",
    ":hover": { color: colorVars.fgPrimary, textDecoration: "underline" },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  page: { color: colorVars.fgPrimary, fontWeight: typographyVars.fontWeightMedium },
  separator: { alignItems: "center", color: colorVars.fgTertiary, display: "inline-flex" },
  ellipsis: {
    alignItems: "center",
    color: colorVars.fgTertiary,
    display: "inline-flex",
    height: sizeVars.iconMd,
    justifyContent: "center",
    width: sizeVars.iconMd,
  },
});
