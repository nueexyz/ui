import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, MouseEvent } from "react";

import { Button, type ButtonProps } from "../button";
import { Input, type InputProps } from "../input";
import { Textarea, type TextareaProps } from "../textarea";
import { styles } from "./input-group.stylex";

type StyleProps = { xstyle?: stylex.StyleXStyles };
type AddonAlignment = "block-end" | "block-start" | "inline-end" | "inline-start";

export type InputGroupProps = ComponentProps<"div"> & StyleProps & { invalid?: boolean };

export function InputGroup({
  className,
  invalid = false,
  style,
  xstyle,
  ...props
}: InputGroupProps) {
  const stylexProps = stylex.props(styles.root, invalid && styles.invalid, xstyle);
  return (
    <div
      {...props}
      data-invalid={invalid || undefined}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function InputGroupAddon({
  align = "inline-start",
  className,
  onClick,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps & { align?: AddonAlignment }) {
  const stylexProps = stylex.props(styles.addon, styles[align], xstyle);
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || (event.target as HTMLElement).closest("button")) return;
    event.currentTarget.parentElement?.querySelector<HTMLElement>("input, textarea")?.focus();
  };

  return (
    <div
      {...props}
      role="presentation"
      data-align={align}
      onClick={handleClick}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function InputGroupInput({ xstyle, ...props }: InputProps) {
  return <Input {...props} xstyle={[styles.control, xstyle]} />;
}

export function InputGroupTextarea({ xstyle, ...props }: TextareaProps) {
  return <Textarea {...props} xstyle={[styles.control, styles.textarea, xstyle]} />;
}

export function InputGroupButton({
  size = "sm",
  variant = "ghost",
  xstyle,
  ...props
}: ButtonProps) {
  return <Button {...props} size={size} variant={variant} xstyle={[styles.button, xstyle]} />;
}

export function InputGroupText({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"span"> & StyleProps) {
  const stylexProps = stylex.props(styles.text, xstyle);
  return (
    <span
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}
