"use client";

import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import { CaretRightIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

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
    transitionDuration: motionVars.durationFast,
    transitionProperty: "color, text-decoration-color",
    transitionTimingFunction: motionVars.easingStandard,
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

export function Breadcrumb({ ...props }: Omit<ComponentProps<"nav">, "className" | "style">) {
  return <nav aria-label="Breadcrumb" {...props} {...stylex.props(styles.root)} />;
}

export function BreadcrumbList({ ...props }: Omit<ComponentProps<"ol">, "className" | "style">) {
  return <ol {...props} {...stylex.props(styles.list)} />;
}

export function BreadcrumbItem({ ...props }: Omit<ComponentProps<"li">, "className" | "style">) {
  return <li {...props} {...stylex.props(styles.item)} />;
}

export function BreadcrumbLink({
  children,
  ...props
}: Omit<ComponentProps<"a">, "className" | "style">) {
  return (
    <a {...props} {...stylex.props(styles.link)}>
      {children}
    </a>
  );
}

export function BreadcrumbPage({ ...props }: Omit<ComponentProps<"span">, "className" | "style">) {
  return <span aria-current="page" {...props} {...stylex.props(styles.page)} />;
}

export function BreadcrumbSeparator({
  children,
  ...props
}: Omit<ComponentProps<"li">, "className" | "style"> & { children?: ReactNode }) {
  return (
    <li aria-hidden="true" role="presentation" {...props} {...stylex.props(styles.separator)}>
      {children ?? <CaretRightIcon />}
    </li>
  );
}

export function BreadcrumbEllipsis({
  ...props
}: Omit<ComponentProps<"span">, "className" | "style">) {
  return (
    <span aria-hidden="true" {...props} {...stylex.props(styles.ellipsis)}>
      …
    </span>
  );
}
