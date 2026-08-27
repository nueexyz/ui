import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./card.stylex";

type StyleProps = {
  xstyle?: stylex.StyleXStyles;
};

type ElementProps = ComponentProps<"div"> & StyleProps;
type HeadingProps = ComponentProps<"h3"> & StyleProps;
type ParagraphProps = ComponentProps<"p"> & StyleProps;

export function Card({ className, style, xstyle, ...props }: ElementProps) {
  const stylexProps = stylex.props(styles.card, xstyle);

  return (
    <div
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function CardHeader({ className, style, xstyle, ...props }: ElementProps) {
  const stylexProps = stylex.props(styles.header, xstyle);

  return (
    <div
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function CardTitle({ children, className, style, xstyle, ...props }: HeadingProps) {
  const stylexProps = stylex.props(styles.title, xstyle);

  return (
    <h3
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, style, xstyle, ...props }: ParagraphProps) {
  const stylexProps = stylex.props(styles.description, xstyle);

  return (
    <p
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function CardContent({ className, style, xstyle, ...props }: ElementProps) {
  const stylexProps = stylex.props(styles.content, xstyle);

  return (
    <div
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function CardFooter({ className, style, xstyle, ...props }: ElementProps) {
  const stylexProps = stylex.props(styles.footer, xstyle);

  return (
    <div
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}
