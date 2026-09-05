"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { colorVars, spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

const styles = stylex.create({
  root: { display: "flex", gap: spacingVars.space2, width: "100%" },
  vertical: { flexDirection: "column" },
  horizontal: { alignItems: "baseline", flexDirection: "row", gap: spacingVars.space4 },
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

export type FieldProps = Omit<ComponentProps<typeof FieldPrimitive.Root>, "className" | "style"> &
  StyleProps & { orientation?: FieldOrientation };

export function Field({ orientation = "vertical", xstyle, ...props }: FieldProps) {
  return (
    <FieldPrimitive.Root
      {...props}
      data-orientation={orientation}
      {...stylex.props(styles.root, styles[orientation], xstyle)}
    />
  );
}

export function FieldLabel({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof FieldPrimitive.Label>, "className" | "style"> & StyleProps) {
  return <FieldPrimitive.Label {...props} {...stylex.props(styles.label, xstyle)} />;
}

export function FieldDescription({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof FieldPrimitive.Description>, "className" | "style"> & StyleProps) {
  return <FieldPrimitive.Description {...props} {...stylex.props(styles.description, xstyle)} />;
}

export function FieldError({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof FieldPrimitive.Error>, "className" | "style"> & StyleProps) {
  return <FieldPrimitive.Error {...props} {...stylex.props(styles.error, xstyle)} />;
}

export function FieldSet({
  xstyle,
  ...props
}: Omit<ComponentProps<"fieldset">, "className" | "style"> & StyleProps) {
  return <fieldset {...props} {...stylex.props(styles.set, xstyle)} />;
}

export function FieldLegend({
  xstyle,
  ...props
}: Omit<ComponentProps<"legend">, "className" | "style"> & StyleProps) {
  return <legend {...props} {...stylex.props(styles.legend, xstyle)} />;
}

export function FieldGroup({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.group, xstyle)} />;
}

export function FieldContent({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.content, xstyle)} />;
}

export function FieldTitle({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.title, xstyle)} />;
}
