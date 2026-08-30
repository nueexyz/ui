import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Icon } from "./Icon";
import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nooeh/tokens/tokens.stylex";

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
    transitionProperty: "background-color, border-color",
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

function nativeProps(
  resolved: ReturnType<typeof stylex.props>,
  className?: string,
  style?: ComponentProps<"div">["style"],
) {
  return {
    className: [resolved.className, className].filter(Boolean).join(" "),
    style: { ...resolved.style, ...style },
  };
}

export function Pagination({ className, style, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Pagination"
      {...props}
      {...nativeProps(stylex.props(styles.root), className, style)}
    />
  );
}

export function PaginationContent({ className, style, ...props }: ComponentProps<"ul">) {
  return <ul {...props} {...nativeProps(stylex.props(styles.content), className, style)} />;
}

export function PaginationItem({ className, style, ...props }: ComponentProps<"li">) {
  return <li {...props} {...nativeProps(stylex.props(styles.item), className, style)} />;
}

export type PaginationLinkProps = ComponentProps<"a"> & {
  isActive?: boolean;
  size?: "default" | "icon";
};

export function PaginationLink({
  children,
  className,
  isActive = false,
  size = "icon",
  style,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      {...props}
      {...nativeProps(
        stylex.props(styles.link, styles[size], isActive && styles.active),
        className,
        style,
      )}
    >
      {children}
    </a>
  );
}

export function PaginationPrevious({ children, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink aria-label="Previous page" size="default" {...props}>
      <Icon aria-hidden="true" name="chevronLeft" />
      {children ?? "Previous"}
    </PaginationLink>
  );
}

export function PaginationNext({ children, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink aria-label="Next page" size="default" {...props}>
      {children ?? "Next"}
      <Icon aria-hidden="true" name="chevronRight" />
    </PaginationLink>
  );
}

export function PaginationEllipsis({ className, style, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      {...props}
      {...nativeProps(stylex.props(styles.ellipsis), className, style)}
    >
      …
    </span>
  );
}
