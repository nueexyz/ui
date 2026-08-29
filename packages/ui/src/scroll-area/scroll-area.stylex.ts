import { colorVars, motionVars, radiusVars } from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: { overflow: "hidden", position: "relative" },
  viewport: { height: "100%", width: "100%" },
  content: { minWidth: "100%" },
  scrollbar: {
    display: "flex",
    padding: 2,
    touchAction: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color",
    userSelect: "none",
    ":hover": { backgroundColor: colorVars.interactionHover },
  },
  vertical: { height: "100%", width: 10 },
  horizontal: { flexDirection: "column", height: 10, width: "100%" },
  thumb: {
    backgroundColor: colorVars.strokeStrong,
    borderRadius: radiusVars.full,
    flex: 1,
    minHeight: 20,
    minWidth: 20,
  },
  corner: { backgroundColor: "transparent" },
});
