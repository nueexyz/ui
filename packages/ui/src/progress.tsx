"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { colorVars, motionVars, radiusVars, sizeVars } from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlLayoutStyles } from "./control-layout";

const styles = stylex.create({
  root: {
    backgroundColor: colorVars.strokeDefault,
    borderRadius: radiusVars.full,
    height: sizeVars.trackMd,
    overflow: "hidden",
    width: "100%",
  },
  indicator: {
    backgroundColor: colorVars.bgActionPrimary,
    height: "100%",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "width",
    transitionTimingFunction: motionVars.easingStandard,
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: motionVars.durationInstant,
    },
  },
});

export type ProgressProps = Omit<
  ComponentProps<typeof ProgressPrimitive.Root>,
  "className" | "style"
> & {
  xstyle?: ControlLayoutStyles;
};

export function Progress({ xstyle, ...props }: ProgressProps) {
  const stylexProps = stylex.props(styles.root, xstyle);
  return (
    <ProgressPrimitive.Root {...props} className={stylexProps.className} style={stylexProps.style}>
      <ProgressPrimitive.Indicator {...stylex.props(styles.indicator)} />
    </ProgressPrimitive.Root>
  );
}
