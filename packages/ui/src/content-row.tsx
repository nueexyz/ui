import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@dumo/tokens/tokens.stylex";

const styles = stylex.create({
  root: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    display: "flex",
    minWidth: 0,
    width: "100%",
  },
  variantDefault: { backgroundColor: "transparent" },
  muted: { backgroundColor: colorVars.bgSubtle },
  outline: { backgroundColor: colorVars.bgSurface, borderColor: colorVars.strokeDefault },
  xs: { gap: spacingVars.space2, minHeight: sizeVars.controlSm, padding: spacingVars.space2 },
  sm: { gap: spacingVars.space3, minHeight: sizeVars.touchTarget, padding: spacingVars.space3 },
  sizeDefault: { gap: spacingVars.space3, minHeight: "4rem", padding: spacingVars.space4 },
  group: { display: "flex", flexDirection: "column", gap: spacingVars.space2, width: "100%" },
  media: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    justifyContent: "center",
    overflow: "hidden",
  },
  mediaicon: {
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.sm,
    color: colorVars.fgSecondary,
    height: sizeVars.controlMd,
    width: sizeVars.controlMd,
  },
  mediaavatar: { borderRadius: radiusVars.full },
  mediaimage: {
    borderRadius: radiusVars.sm,
    height: sizeVars.touchTarget,
    width: sizeVars.touchTarget,
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacingVars.space1,
    minWidth: 0,
  },
  title: {
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightTight,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  actions: { alignItems: "center", display: "flex", flexShrink: 0, gap: spacingVars.space2 },
});

export type ContentRowSize = "default" | "sm" | "xs";
export type ContentRowVariant = "default" | "muted" | "outline";

export type ContentRowProps = ComponentProps<"div"> & {
  size?: ContentRowSize;
  variant?: ContentRowVariant;
  xstyle?: stylex.StyleXStyles;
};

function getStyleProps(
  stylexProps: ReturnType<typeof stylex.props>,
  className: string | undefined,
  style: ComponentProps<"div">["style"],
) {
  return {
    className: [stylexProps.className, className].filter(Boolean).join(" "),
    style: { ...stylexProps.style, ...style },
  };
}

export function ContentRow({
  className,
  size = "default",
  style,
  variant = "default",
  xstyle,
  ...props
}: ContentRowProps) {
  return (
    <div
      {...props}
      {...getStyleProps(
        stylex.props(
          styles.root,
          size === "default" ? styles.sizeDefault : styles[size],
          variant === "default" ? styles.variantDefault : styles[variant],
          xstyle,
        ),
        className,
        style,
      )}
    />
  );
}

export function ContentRowGroup({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...getStyleProps(stylex.props(styles.group), className, style)} />;
}

export type ContentRowMediaProps = ComponentProps<"div"> & {
  variant?: "avatar" | "icon" | "image";
};

export function ContentRowMedia({
  className,
  style,
  variant = "icon",
  ...props
}: ContentRowMediaProps) {
  return (
    <div
      {...props}
      {...getStyleProps(stylex.props(styles.media, styles[`media${variant}`]), className, style)}
    />
  );
}

export function ContentRowContent({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...getStyleProps(stylex.props(styles.content), className, style)} />;
}

export function ContentRowTitle({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...getStyleProps(stylex.props(styles.title), className, style)} />;
}

export function ContentRowDescription({ className, style, ...props }: ComponentProps<"p">) {
  return <p {...props} {...getStyleProps(stylex.props(styles.description), className, style)} />;
}

export function ContentRowActions({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...getStyleProps(stylex.props(styles.actions), className, style)} />;
}
