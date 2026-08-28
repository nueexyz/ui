import * as stylex from "@stylexjs/stylex";
import { createElement, type CSSProperties, type HTMLAttributes } from "react";

import { styles } from "./typography.stylex";

type TypographyElement = "blockquote" | "code" | "h1" | "h2" | "h3" | "p" | "span";
type TypographyVariant = "body" | "caption" | "code" | "display" | "heading" | "label" | "title";

const defaultElementMap: Record<TypographyVariant, TypographyElement> = {
  body: "p",
  caption: "span",
  code: "code",
  display: "h1",
  heading: "h3",
  label: "span",
  title: "h2",
};

export type TypographyProps = HTMLAttributes<HTMLElement> & {
  as?: TypographyElement;
  variant?: TypographyVariant;
  xstyle?: stylex.StyleXStyles;
};

export function Typography({
  as,
  className,
  style,
  variant = "body",
  xstyle,
  ...props
}: TypographyProps) {
  const element = as ?? defaultElementMap[variant];
  const stylexProps = stylex.props(styles.root, styles[variant], xstyle);

  return createElement(element, {
    ...props,
    className: [stylexProps.className, className].filter(Boolean).join(" "),
    style: { ...stylexProps.style, ...style } as CSSProperties,
  });
}
