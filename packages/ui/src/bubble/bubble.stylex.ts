import { colorVars, radiusVars, spacingVars, typographyVars } from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    maxWidth: "min(32rem, 85%)",
    paddingBlock: spacingVars.space3,
    paddingInline: spacingVars.space4,
    whiteSpace: "pre-wrap",
  },
  incoming: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: radiusVars.sm,
    borderRadius: radiusVars.sm,
  },
  outgoing: {
    alignSelf: "flex-end",
    borderBottomRightRadius: radiusVars.sm,
    borderRadius: radiusVars.sm,
  },
  variantDefault: { backgroundColor: colorVars.bgSubtle, color: colorVars.fgPrimary },
  outline: {
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderStyle: "solid",
    borderWidth: 1,
    color: colorVars.fgPrimary,
  },
});
