import { Field as FieldPrimitive } from "@base-ui/react/field";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";

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

export type FieldProps = ComponentProps<typeof FieldPrimitive.Root> &
  StyleProps & { orientation?: FieldOrientation };

export function Field({ orientation = "vertical", xstyle, ...props }: FieldProps) {
  const stylexProps = stylex.props(styles.root, styles[orientation], xstyle);

  return <FieldPrimitive.Root {...props} data-orientation={orientation} {...stylexProps} />;
}

export function FieldLabel({
  xstyle,
  ...props
}: ComponentProps<typeof FieldPrimitive.Label> & StyleProps) {
  const stylexProps = stylex.props(styles.label, xstyle);
  return <FieldPrimitive.Label {...props} {...stylexProps} />;
}

export function FieldDescription({
  xstyle,
  ...props
}: ComponentProps<typeof FieldPrimitive.Description> & StyleProps) {
  const stylexProps = stylex.props(styles.description, xstyle);
  return <FieldPrimitive.Description {...props} {...stylexProps} />;
}

export function FieldError({
  xstyle,
  ...props
}: ComponentProps<typeof FieldPrimitive.Error> & StyleProps) {
  const stylexProps = stylex.props(styles.error, xstyle);
  return <FieldPrimitive.Error {...props} {...stylexProps} />;
}

export function FieldSet({ xstyle, ...props }: ComponentProps<"fieldset"> & StyleProps) {
  return <fieldset {...props} {...stylex.props(styles.set, xstyle)} />;
}

export function FieldLegend({ xstyle, ...props }: ComponentProps<"legend"> & StyleProps) {
  return <legend {...props} {...stylex.props(styles.legend, xstyle)} />;
}

export function FieldGroup({ xstyle, ...props }: ComponentProps<"div"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.group, xstyle)} />;
}

export function FieldContent({ xstyle, ...props }: ComponentProps<"div"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.content, xstyle)} />;
}

export function FieldTitle({ xstyle, ...props }: ComponentProps<"div"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.title, xstyle)} />;
}
