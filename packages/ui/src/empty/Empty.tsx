import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./empty.stylex";

type StyleProps = { xstyle?: stylex.StyleXStyles };

function createStyleProps(
  baseStyle: stylex.StyleXStyles,
  className: string | undefined,
  style: ComponentProps<"div">["style"],
  xstyle: stylex.StyleXStyles | undefined,
) {
  const stylexProps = stylex.props(baseStyle, xstyle);
  return {
    className: [stylexProps.className, className].filter(Boolean).join(" "),
    style: { ...stylexProps.style, ...style },
  };
}

export function Empty({ className, style, xstyle, ...props }: ComponentProps<"div"> & StyleProps) {
  return <div {...props} {...createStyleProps(styles.root, className, style, xstyle)} />;
}

export function EmptyHeader({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  return <div {...props} {...createStyleProps(styles.header, className, style, xstyle)} />;
}

export function EmptyMedia({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  return (
    <div
      {...props}
      aria-hidden="true"
      {...createStyleProps(styles.media, className, style, xstyle)}
    />
  );
}

export function EmptyTitle({
  children,
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"h3"> & StyleProps) {
  return (
    <h3 {...props} {...createStyleProps(styles.title, className, style, xstyle)}>
      {children}
    </h3>
  );
}

export function EmptyDescription({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"p"> & StyleProps) {
  return <p {...props} {...createStyleProps(styles.description, className, style, xstyle)} />;
}

export function EmptyContent({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  return <div {...props} {...createStyleProps(styles.content, className, style, xstyle)} />;
}
