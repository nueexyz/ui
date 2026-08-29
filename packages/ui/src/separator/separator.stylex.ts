import { colorVars, sizeVars } from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: { backgroundColor: colorVars.strokeDefault, flexShrink: 0 },
  horizontal: { height: sizeVars.stroke, width: "100%" },
  vertical: { alignSelf: "stretch", minHeight: sizeVars.touchTarget, width: sizeVars.stroke },
});
