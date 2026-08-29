import { colorVars, motionVars, radiusVars } from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
  root: {
    backgroundColor: colorVars.strokeDefault,
    borderRadius: radiusVars.full,
    height: "0.5rem",
    overflow: "hidden",
    width: "100%",
  },
  indicator: {
    backgroundColor: colorVars.bgActionPrimary,
    height: "100%",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "width",
  },
});
