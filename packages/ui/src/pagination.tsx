"use client";

import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

const styles = stylex.create({
  root: { display: "flex", justifyContent: "center", width: "100%" },
  content: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space1,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  item: { display: "inline-flex" },
  link: {
    alignItems: "center",
    backgroundColor: {
      default: "transparent",
      ":hover": colorVars.interactionHover,
      ":active": colorVars.interactionPressed,
    },
    borderColor: "transparent",
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    gap: spacingVars.space1,
    justifyContent: "center",
    minHeight: sizeVars.controlMd,
    outline: "none",
    textDecoration: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color, color",
    transitionTimingFunction: motionVars.easingStandard,
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    "[aria-disabled='true']": {
      color: colorVars.fgDisabled,
      cursor: "not-allowed",
      pointerEvents: "none",
    },
  },
  icon: { width: sizeVars.controlMd },
  default: { paddingInline: spacingVars.space3 },
  active: { backgroundColor: colorVars.bgSurfacePressed, borderColor: colorVars.strokeStrong },
  ellipsis: {
    alignItems: "center",
    color: colorVars.fgTertiary,
    display: "inline-flex",
    height: sizeVars.controlMd,
    justifyContent: "center",
    width: sizeVars.controlMd,
  },
});

export function Pagination({ ...props }: Omit<ComponentProps<"nav">, "className" | "style">) {
  return <nav aria-label="Pagination" {...props} {...stylex.props(styles.root)} />;
}

export function PaginationContent({ ...props }: Omit<ComponentProps<"ul">, "className" | "style">) {
  return <ul {...props} {...stylex.props(styles.content)} />;
}

export function PaginationItem({ ...props }: Omit<ComponentProps<"li">, "className" | "style">) {
  return <li {...props} {...stylex.props(styles.item)} />;
}

export type PaginationLinkProps = Omit<ComponentProps<"a">, "className" | "style"> & {
  isActive?: boolean;
  size?: "default" | "icon";
};

export function PaginationLink({
  children,
  isActive = false,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      {...props}
      {...stylex.props(styles.link, styles[size], isActive && styles.active)}
    >
      {children}
    </a>
  );
}

export function PaginationPrevious({ children, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink aria-label="Previous page" size="default" {...props}>
      <CaretLeftIcon aria-hidden="true" />
      {children ?? "Previous"}
    </PaginationLink>
  );
}

export function PaginationNext({ children, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink aria-label="Next page" size="default" {...props}>
      {children ?? "Next"}
      <CaretRightIcon aria-hidden="true" />
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  ...props
}: Omit<ComponentProps<"span">, "className" | "style">) {
  return (
    <span aria-hidden="true" {...props} {...stylex.props(styles.ellipsis)}>
      …
    </span>
  );
}
