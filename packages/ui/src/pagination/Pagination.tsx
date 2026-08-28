import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Icon } from "../Icon";
import { styles } from "./pagination.stylex";

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
      aria-label="페이지 탐색"
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
    <PaginationLink aria-label="이전 페이지" size="default" {...props}>
      <Icon aria-hidden="true" name="chevronLeft" />
      {children ?? "이전"}
    </PaginationLink>
  );
}

export function PaginationNext({ children, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink aria-label="다음 페이지" size="default" {...props}>
      {children ?? "다음"}
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
