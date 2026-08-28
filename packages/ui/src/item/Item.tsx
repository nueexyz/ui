import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./item.stylex";

export type ItemSize = "default" | "sm" | "xs";
export type ItemVariant = "default" | "muted" | "outline";

export type ItemProps = ComponentProps<"div"> & {
  size?: ItemSize;
  variant?: ItemVariant;
  xstyle?: stylex.StyleXStyles;
};

function getStyleProps(
  stylexProps: ReturnType<typeof stylex.props>,
  className: string | undefined,
  style: ComponentProps<"div">["style"],
) {
  return {
    className: [stylexProps.className, className].filter(Boolean).join(" "),
    style: { ...stylexProps.style, ...style },
  };
}

export function Item({
  className,
  size = "default",
  style,
  variant = "default",
  xstyle,
  ...props
}: ItemProps) {
  return (
    <div
      {...props}
      {...getStyleProps(
        stylex.props(
          styles.root,
          size === "default" ? styles.sizeDefault : styles[size],
          variant === "default" ? styles.variantDefault : styles[variant],
          xstyle,
        ),
        className,
        style,
      )}
    />
  );
}

export function ItemGroup({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...getStyleProps(stylex.props(styles.group), className, style)} />;
}

export type ItemMediaProps = ComponentProps<"div"> & {
  variant?: "avatar" | "icon" | "image";
};

export function ItemMedia({ className, style, variant = "icon", ...props }: ItemMediaProps) {
  return (
    <div
      {...props}
      {...getStyleProps(stylex.props(styles.media, styles[`media${variant}`]), className, style)}
    />
  );
}

export function ItemContent({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...getStyleProps(stylex.props(styles.content), className, style)} />;
}

export function ItemTitle({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...getStyleProps(stylex.props(styles.title), className, style)} />;
}

export function ItemDescription({ className, style, ...props }: ComponentProps<"p">) {
  return <p {...props} {...getStyleProps(stylex.props(styles.description), className, style)} />;
}

export function ItemActions({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...getStyleProps(stylex.props(styles.actions), className, style)} />;
}
