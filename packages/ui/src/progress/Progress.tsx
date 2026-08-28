import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./progress.stylex";

export type ProgressProps = ComponentProps<typeof ProgressPrimitive.Root> & {
  xstyle?: stylex.StyleXStyles;
};

export function Progress({ className, style, xstyle, ...props }: ProgressProps) {
  const stylexProps = stylex.props(styles.root, xstyle);
  return (
    <ProgressPrimitive.Root
      {...props}
      className={[stylexProps.className, typeof className === "string" ? className : undefined]
        .filter(Boolean)
        .join(" ")}
      style={{ ...stylexProps.style, ...(typeof style === "object" ? style : undefined) }}
    >
      <ProgressPrimitive.Indicator {...stylex.props(styles.indicator)} />
    </ProgressPrimitive.Root>
  );
}
