import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, MouseEvent } from "react";

import { Button, type ButtonProps } from "./button";
import { Input, type InputProps } from "./input";
import { Textarea, type TextareaProps } from "./textarea";
import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nooeh/tokens/semantic.stylex";

const styles = stylex.create({
  root: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "flex",
    flexWrap: "wrap",
    minHeight: sizeVars.controlMd,
    minWidth: 0,
    width: "100%",
    ":focus-within": {
      borderColor: colorVars.strokeFocus,
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  invalid: { borderColor: colorVars.strokeFeedbackError },
  addon: {
    alignItems: "center",
    color: colorVars.fgSecondary,
    cursor: "text",
    display: "flex",
    flexShrink: 0,
    fontSize: typographyVars.fontSizeSm,
    gap: spacingVars.space2,
    minHeight: sizeVars.controlMd,
  },
  "inline-start": { order: -1, paddingInlineStart: spacingVars.space3 },
  "inline-end": { order: 1, paddingInlineEnd: spacingVars.space3 },
  "block-start": {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    order: -1,
    paddingInline: spacingVars.space3,
    width: "100%",
  },
  "block-end": {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    order: 1,
    paddingInline: spacingVars.space3,
    width: "100%",
  },
  control: {
    appearance: "none",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderStyle: "none",
    borderWidth: 0,
    borderRadius: radiusVars.sm,
    boxShadow: "none",
    flex: 1,
    minWidth: 0,
    outline: "none",
    ":hover": { borderColor: "transparent" },
    ":focus-visible": {
      borderColor: "transparent",
      outlineColor: "transparent",
      outlineOffset: 0,
      outlineStyle: "none",
      outlineWidth: 0,
    },
  },
  textarea: { minHeight: "5rem" },
  button: { flexShrink: 0, margin: spacingVars.space1 },
  text: {
    alignItems: "center",
    color: colorVars.fgSecondary,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeSm,
    gap: spacingVars.space2,
  },
});

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
