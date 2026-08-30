import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

export function getNativeStyleProps(
  stylexProps: ReturnType<typeof stylex.props>,
  className?: string,
  style?: ComponentProps<"div">["style"],
): Pick<ComponentProps<"div">, "className" | "style"> {
  return {
    className: [stylexProps.className, className].filter(Boolean).join(" "),
    style: { ...stylexProps.style, ...style },
  };
}
