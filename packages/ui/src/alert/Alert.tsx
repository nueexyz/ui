import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import { styles } from "./alert.stylex";

type AlertVariant = "default" | "destructive";
type StyleProps = { xstyle?: stylex.StyleXStyles };

export type AlertProps = ComponentProps<"div"> &
  StyleProps & {
    icon?: ReactNode;
    variant?: AlertVariant;
  };

export function Alert({
  children,
  className,
  icon,
  style,
  variant = "default",
  xstyle,
  ...props
}: AlertProps) {
  const stylexProps = stylex.props(
    styles.root,
    Boolean(icon) && styles.withIcon,
    styles[variant],
    xstyle,
  );

  return (
    <div
      {...props}
      role="alert"
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    >
      {icon ? <span {...stylex.props(styles.icon)}>{icon}</span> : null}
      <div {...stylex.props(styles.content)}>{children}</div>
    </div>
  );
}

export function AlertTitle({
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

export function AlertDescription({
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
