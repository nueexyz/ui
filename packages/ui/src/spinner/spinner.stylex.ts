import { colorVars, radiusVars, sizeVars } from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

const spin = stylex.keyframes({ to: { transform: "rotate(360deg)" } });

export const styles = stylex.create({
  root: {
    animationDuration: "700ms",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.full,
    borderRightColor: colorVars.fgPrimary,
    borderStyle: "solid",
    borderWidth: sizeVars.focusRing,
    display: "inline-block",
    height: sizeVars.iconMd,
    width: sizeVars.iconMd,
    "@media (prefers-reduced-motion: reduce)": { animationDuration: "1.5s" },
  },
});
