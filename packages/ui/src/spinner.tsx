import { colorVars, motionVars, radiusVars, sizeVars } from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

const spin = stylex.keyframes({ to: { transform: "rotate(360deg)" } });

const styles = stylex.create({
  root: {
    animationDuration: motionVars.durationLoading,
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
    "@media (prefers-reduced-motion: reduce)": {
      animationDuration: motionVars.durationLoadingReduced,
    },
  },
});

export type SpinnerProps = Omit<ComponentProps<"output">, "className" | "style"> & {
  label?: string;
};

export function Spinner({ label = "Loading", ...props }: SpinnerProps) {
  return <output {...props} aria-label={label} {...stylex.props(styles.root)} />;
}
