import { colorVars, radiusVars } from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

const pulse = stylex.keyframes({ "0%, 100%": { opacity: 1 }, "50%": { opacity: 0.5 } });

export const styles = stylex.create({
  root: {
    animationDuration: "1.5s",
    animationIterationCount: "infinite",
    animationName: pulse,
    animationTimingFunction: "ease-in-out",
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.md,
    "@media (prefers-reduced-motion: reduce)": { animationName: "none" },
  },
});
