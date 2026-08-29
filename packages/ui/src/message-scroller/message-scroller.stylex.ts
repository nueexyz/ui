import { colorVars, motionVars, radiusVars, spacingVars } from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: { minHeight: 0, overflow: "hidden", position: "relative" },
  viewport: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space4,
    height: "100%",
    overflowY: "auto",
    overscrollBehavior: "contain",
    scrollBehavior: "smooth",
    scrollbarColor: `${colorVars.strokeStrong} transparent`,
    "@media (prefers-reduced-motion: reduce)": { scrollBehavior: "auto" },
  },
  action: {
    borderRadius: radiusVars.full,
    bottom: spacingVars.space3,
    left: "50%",
    minWidth: "2rem",
    opacity: 1,
    position: "absolute",
    transform: "translateX(-50%)",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "opacity, transform",
  },
});
