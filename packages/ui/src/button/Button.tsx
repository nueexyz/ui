import { Button as ButtonPrimitive } from "@base-ui/react/button";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import { styles } from "./button.stylex";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ComponentProps<typeof ButtonPrimitive> & {
  children: ReactNode;
  isLoading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  xstyle?: stylex.StyleXStyles;
};

export function Button({
  children,
  className,
  disabled,
  isLoading = false,
  size = "md",
  style,
  variant = "primary",
  xstyle,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled && !isLoading);
  const isInteractionDisabled = Boolean(disabled || isLoading);
  const hasSolidBackground = variant === "primary" || variant === "destructive";
  const stylexProps = stylex.props(
    styles.root,
    styles[variant],
    styles[size],
    hasSolidBackground ? styles.solidInteraction : styles.surfaceInteraction,
    isDisabled && styles.disabled,
    isDisabled && variant === "ghost" && styles.disabledGhost,
    isInteractionDisabled && styles.disabledInteraction,
    xstyle,
  );
  const mergedClassName = [stylexProps.className, className].filter(Boolean).join(" ");

  return (
    <ButtonPrimitive
      {...props}
      className={mergedClassName}
      disabled={disabled || isLoading}
      style={{ ...stylexProps.style, ...style }}
    >
      <span {...stylex.props(styles.content)}>
        {isLoading ? <span aria-hidden="true" {...stylex.props(styles.spinner)} /> : null}
        {children}
      </span>
    </ButtonPrimitive>
  );
}
