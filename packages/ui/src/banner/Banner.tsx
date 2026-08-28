import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import { styles } from "./banner.stylex";

export type BannerVariant = "error" | "info" | "neutral" | "warning";
export type BannerSize = "md" | "sm";

type StyleProps = { xstyle?: stylex.StyleXStyles };

export type BannerProps = ComponentProps<"div"> &
  StyleProps & {
    action?: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    size?: BannerSize;
    title?: ReactNode;
    variant?: BannerVariant;
  };

export function Banner({
  action,
  children,
  className,
  description,
  icon,
  role,
  size = "md",
  style,
  title,
  variant = "info",
  xstyle,
  ...props
}: BannerProps) {
  const stylexProps = stylex.props(
    styles.root,
    styles[size],
    styles[variant],
    Boolean(icon) && styles.withIcon,
    Boolean(action) && styles.withAction,
    Boolean(icon) && Boolean(action) && styles.withIconAndAction,
    xstyle,
  );

  return (
    <div
      {...props}
      role={role ?? (variant === "error" || variant === "warning" ? "alert" : "status")}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    >
      {icon ? (
        <span {...stylex.props(styles.icon, size === "sm" && styles.iconAlignedCenter)}>
          {icon}
        </span>
      ) : null}
      <div {...stylex.props(styles.content)}>
        {title ? <BannerTitle>{title}</BannerTitle> : null}
        {description ? <BannerDescription>{description}</BannerDescription> : null}
        {children}
      </div>
      {action ? <div {...stylex.props(styles.action)}>{action}</div> : null}
    </div>
  );
}

export function BannerTitle({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  const stylexProps = stylex.props(styles.title, xstyle);
  return (
    <div
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function BannerDescription({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  const stylexProps = stylex.props(styles.description, xstyle);
  return (
    <div
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}
