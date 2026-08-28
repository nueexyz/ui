import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import { Icon } from "../Icon";
import { styles } from "./breadcrumb.stylex";

function getStyleProps(
  baseStyle: stylex.StyleXStyles,
  className: string | undefined,
  style: ComponentProps<"div">["style"],
) {
  const stylexProps = stylex.props(baseStyle);
  return {
    className: [stylexProps.className, className].filter(Boolean).join(" "),
    style: { ...stylexProps.style, ...style },
  };
}

export function Breadcrumb({ className, style, ...props }: ComponentProps<"nav">) {
  return (
    <nav aria-label="Breadcrumb" {...props} {...getStyleProps(styles.root, className, style)} />
  );
}

export function BreadcrumbList({ className, style, ...props }: ComponentProps<"ol">) {
  return <ol {...props} {...getStyleProps(styles.list, className, style)} />;
}

export function BreadcrumbItem({ className, style, ...props }: ComponentProps<"li">) {
  return <li {...props} {...getStyleProps(styles.item, className, style)} />;
}

export function BreadcrumbLink({ children, className, style, ...props }: ComponentProps<"a">) {
  return (
    <a {...props} {...getStyleProps(styles.link, className, style)}>
      {children}
    </a>
  );
}

export function BreadcrumbPage({ className, style, ...props }: ComponentProps<"span">) {
  return <span aria-current="page" {...props} {...getStyleProps(styles.page, className, style)} />;
}

export function BreadcrumbSeparator({
  children,
  className,
  style,
  ...props
}: ComponentProps<"li"> & { children?: ReactNode }) {
  return (
    <li
      aria-hidden="true"
      role="presentation"
      {...props}
      {...getStyleProps(styles.separator, className, style)}
    >
      {children ?? <Icon name="chevronRight" />}
    </li>
  );
}

export function BreadcrumbEllipsis({ className, style, ...props }: ComponentProps<"span">) {
  return (
    <span aria-hidden="true" {...props} {...getStyleProps(styles.ellipsis, className, style)}>
      …
    </span>
  );
}
