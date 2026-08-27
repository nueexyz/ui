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

export function AspectRatio({ className, ratio = 1, style, xstyle, ...props }: AspectRatioProps) {
  const stylexProps = stylex.props(styles.root(ratio), xstyle);
  return (
    <div
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}
