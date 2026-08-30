import { Field as FieldPrimitive } from "@base-ui/react/field";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { getNativeStyleProps } from "./stylex-props";

import { colorVars, spacingVars, typographyVars } from "@nooeh/tokens/tokens.stylex";

const styles = stylex.create({
  root: { display: "flex", gap: spacingVars.space2, width: "100%" },
  vertical: { flexDirection: "column" },
  horizontal: { alignItems: "center", flexDirection: "row", gap: spacingVars.space4 },
  label: {
    color: colorVars.fgPrimary,
    cursor: "default",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightNormal,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  error: {
    color: colorVars.fgFeedbackError,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
  },
  set: {
    borderStyle: "none",
    borderWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space6,
    margin: 0,
    minWidth: 0,
    padding: 0,
  },
  legend: {
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeMd,
    fontWeight: typographyVars.fontWeightMedium,
    marginBottom: spacingVars.space3,
    padding: 0,
  },
  group: { display: "flex", flexDirection: "column", gap: spacingVars.space6, width: "100%" },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacingVars.space1,
    minWidth: 0,
  },
  title: {
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightNormal,
  },
});

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
  return (
    <fieldset
      {...props}
      {...getNativeStyleProps(stylex.props(styles.set, xstyle), className, style)}
    />
  );
}

export function FieldLegend({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"legend"> & StyleProps) {
  return (
    <legend
      {...props}
      {...getNativeStyleProps(stylex.props(styles.legend, xstyle), className, style)}
    />
  );
}

export function FieldGroup({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  return (
    <div
      {...props}
      {...getNativeStyleProps(stylex.props(styles.group, xstyle), className, style)}
    />
  );
}

export function FieldContent({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  return (
    <div
      {...props}
      {...getNativeStyleProps(stylex.props(styles.content, xstyle), className, style)}
    />
  );
}

export function FieldTitle({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  return (
    <div
      {...props}
      {...getNativeStyleProps(stylex.props(styles.title, xstyle), className, style)}
    />
  );
}
