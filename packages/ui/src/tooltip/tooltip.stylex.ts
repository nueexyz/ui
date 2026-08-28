import {
  colorVars,
  radiusVars,
  shadowVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
  positioner: { zIndex: 70 },
  popup: {
    backgroundColor: colorVars.fgPrimary,
    borderRadius: radiusVars.sm,
    boxShadow: shadowVars.floating,
    color: colorVars.bgCanvas,
    fontSize: typographyVars.fontSizeXs,
    lineHeight: typographyVars.lineHeightNormal,
    maxWidth: "18rem",
    paddingBlock: spacingVars.space1,
    paddingInline: spacingVars.space3,
  },
  arrow: { fill: colorVars.fgPrimary, height: spacingVars.space2, width: spacingVars.space3 },
});
