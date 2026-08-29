import { colorVars, radiusVars, sizeVars, spacingVars } from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: { alignItems: "center", display: "inline-flex", width: "fit-content" },
  default: { gap: spacingVars.space1 },
  outline: {
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    gap: 0,
    overflow: "hidden",
  },
  outlineItem: {
    borderColor: "transparent",
    borderRadius: 0,
    marginInlineStart: -1,
  },
});
