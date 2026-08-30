import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nooeh/tokens/tokens.stylex";

const styles = stylex.create({
  root: {
    alignItems: "center",
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "dashed",
    borderWidth: sizeVars.stroke,
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space6,
    justifyContent: "center",
    minWidth: 0,
    padding: spacingVars.space8,
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space2,
    maxWidth: sizeVars.contentSm,
  },
  media: {
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.sm,
    color: colorVars.fgSecondary,
    display: "flex",
    height: sizeVars.touchTarget,
    justifyContent: "center",
    width: sizeVars.touchTarget,
  },
  title: {
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeLg,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightTight,
    margin: 0,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  content: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space4,
    maxWidth: sizeVars.contentSm,
    width: "100%",
  },
});

type StyleProps = { xstyle?: stylex.StyleXStyles };

function createStyleProps(
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

export function Empty({ className, style, xstyle, ...props }: ComponentProps<"div"> & StyleProps) {
  return <div {...props} {...createStyleProps(styles.root, className, style, xstyle)} />;
}

export function EmptyHeader({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  return <div {...props} {...createStyleProps(styles.header, className, style, xstyle)} />;
}

export function EmptyMedia({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  return (
    <div
      {...props}
      aria-hidden="true"
      {...createStyleProps(styles.media, className, style, xstyle)}
    />
  );
}

export function EmptyTitle({
  children,
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"h3"> & StyleProps) {
  return (
    <h3 {...props} {...createStyleProps(styles.title, className, style, xstyle)}>
      {children}
    </h3>
  );
}

export function EmptyDescription({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"p"> & StyleProps) {
  return <p {...props} {...createStyleProps(styles.description, className, style, xstyle)} />;
}

export function EmptyContent({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  return <div {...props} {...createStyleProps(styles.content, className, style, xstyle)} />;
}
