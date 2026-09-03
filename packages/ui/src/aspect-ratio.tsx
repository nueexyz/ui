import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

const styles = stylex.create({
  root: (ratio: number) => ({
    aspectRatio: ratio,
    overflow: "hidden",
    position: "relative",
    width: "100%",
  }),
});

export type AspectRatioProps = ComponentProps<"div"> & {
  ratio?: number;
  xstyle?: stylex.StyleXStyles;
};

export function AspectRatio({ ratio = 1, xstyle, ...props }: AspectRatioProps) {
  const stylexProps = stylex.props(styles.root(ratio), xstyle);
  return <div {...props} {...stylexProps} />;
}
