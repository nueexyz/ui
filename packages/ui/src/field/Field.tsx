import { Field as FieldPrimitive } from "@base-ui/react/field";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./field.stylex";

type StyleProps = { xstyle?: stylex.StyleXStyles };
type FieldOrientation = "horizontal" | "vertical";

function mergeClassName<State>(
  generatedClassName: string | undefined,
  className: string | ((state: State) => string | undefined) | undefined,
) {
  if (typeof className === "function") {
    return (state: State) => [generatedClassName, className(state)].filter(Boolean).join(" ");
  }

  return [generatedClassName, className].filter(Boolean).join(" ");
}

function getStyleProps(
  baseStyle: stylex.StyleXStyles,
  className: string | undefined,
  style: ComponentProps<"div">["style"],
  xstyle: stylex.StyleXStyles | undefined,
) {
  const stylexProps = stylex.props(baseStyle, xstyle);
  return {
    className: [stylexProps.className, className].filter(Boolean).join(" "),
    style: { ...stylexProps.style, ...style },
  };
}

export type FieldProps = ComponentProps<typeof FieldPrimitive.Root> &
  StyleProps & { orientation?: FieldOrientation };

export function Field({
  className,
  orientation = "vertical",
  style,
  xstyle,
  ...props
}: FieldProps) {
  const stylexProps = stylex.props(styles.root, styles[orientation], xstyle);

  return (
    <FieldPrimitive.Root
      {...props}
      data-orientation={orientation}
      className={mergeClassName(stylexProps.className, className)}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function FieldLabel({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<typeof FieldPrimitive.Label> & StyleProps) {
  const stylexProps = stylex.props(styles.label, xstyle);
  return (
    <FieldPrimitive.Label
      {...props}
      className={mergeClassName(stylexProps.className, className)}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function FieldDescription({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<typeof FieldPrimitive.Description> & StyleProps) {
  const stylexProps = stylex.props(styles.description, xstyle);
  return (
    <FieldPrimitive.Description
      {...props}
      className={mergeClassName(stylexProps.className, className)}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function FieldError({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<typeof FieldPrimitive.Error> & StyleProps) {
  const stylexProps = stylex.props(styles.error, xstyle);
  return (
    <FieldPrimitive.Error
      {...props}
      className={mergeClassName(stylexProps.className, className)}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function FieldSet({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"fieldset"> & StyleProps) {
  return <fieldset {...props} {...getStyleProps(styles.set, className, style, xstyle)} />;
}

export function FieldLegend({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"legend"> & StyleProps) {
  return <legend {...props} {...getStyleProps(styles.legend, className, style, xstyle)} />;
}

export function FieldGroup({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  return <div {...props} {...getStyleProps(styles.group, className, style, xstyle)} />;
}

export function FieldContent({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  return <div {...props} {...getStyleProps(styles.content, className, style, xstyle)} />;
}

export function FieldTitle({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  return <div {...props} {...getStyleProps(styles.title, className, style, xstyle)} />;
}
