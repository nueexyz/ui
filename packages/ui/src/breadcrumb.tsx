import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import { Icon } from "./Icon";
import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@dumo/tokens/tokens.stylex";

const styles = stylex.create({
  root: { minWidth: 0 },
  list: {
    alignItems: "center",
    color: colorVars.fgSecondary,
    display: "flex",
    flexWrap: "wrap",
    fontSize: typographyVars.fontSizeSm,
    gap: spacingVars.space2,
    lineHeight: typographyVars.lineHeightNormal,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  item: { alignItems: "center", display: "inline-flex", gap: spacingVars.space2 },
  link: {
    borderRadius: radiusVars.sm,
    color: colorVars.fgSecondary,
    outline: "none",
    textDecoration: "none",
    ":hover": { color: colorVars.fgPrimary, textDecoration: "underline" },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  page: { color: colorVars.fgPrimary, fontWeight: typographyVars.fontWeightMedium },
  separator: { alignItems: "center", color: colorVars.fgTertiary, display: "inline-flex" },
  ellipsis: {
    alignItems: "center",
    color: colorVars.fgTertiary,
    display: "inline-flex",
    height: sizeVars.iconMd,
    justifyContent: "center",
    width: sizeVars.iconMd,
  },
});

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
