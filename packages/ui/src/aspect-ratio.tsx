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

export type AspectRatioProps = Omit<ComponentProps<"div">, "className" | "style"> & {
  ratio?: number;
  xstyle?: stylex.StyleXStyles;
};

export function AspectRatio({ ratio = 1, xstyle, ...props }: AspectRatioProps) {
  return <div {...props} {...stylex.props(styles.root(ratio), xstyle)} />;
}
