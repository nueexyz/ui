import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, motionVars, radiusVars } from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
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

export type ProgressProps = ComponentProps<typeof ProgressPrimitive.Root> & {
  xstyle?: stylex.StyleXStyles;
};

export function Progress({ className, style, xstyle, ...props }: ProgressProps) {
  const stylexProps = stylex.props(styles.root, xstyle);
  return (
    <ProgressPrimitive.Root
      {...props}
      className={(state) =>
        [stylexProps.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ")
      }
      style={(state) => ({
        ...stylexProps.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    >
      <ProgressPrimitive.Indicator {...stylex.props(styles.indicator)} />
    </ProgressPrimitive.Root>
  );
}
