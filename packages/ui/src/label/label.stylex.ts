import { colorVars, spacingVars, typographyVars } from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    alignItems: "center",
    color: colorVars.fgPrimary,
    cursor: "default",
    display: "inline-flex",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    gap: spacingVars.space2,
    lineHeight: typographyVars.lineHeightTight,
    userSelect: "none",
  },
});
