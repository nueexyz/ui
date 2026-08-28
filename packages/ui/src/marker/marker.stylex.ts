import { colorVars, spacingVars, typographyVars } from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    alignItems: "center",
    color: colorVars.fgSecondary,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    gap: spacingVars.space2,
    lineHeight: typographyVars.lineHeightNormal,
    minWidth: 0,
  },
  variantDefault: {},
  border: {
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    paddingBottom: spacingVars.space2,
  },
  separator: {
    display: "flex",
    width: "100%",
    "::before": {
      backgroundColor: colorVars.strokeDefault,
      content: "",
      flex: 1,
      height: 1,
    },
    "::after": {
      backgroundColor: colorVars.strokeDefault,
      content: "",
      flex: 1,
      height: 1,
    },
  },
  icon: { alignItems: "center", display: "inline-flex", flexShrink: 0 },
  content: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
});
