import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";

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
  actions: {
    alignItems: "center",
    alignSelf: "flex-start",
    display: "flex",
    flexShrink: 0,
    gap: spacingVars.space2,
  },
});

export type ContentRowSize = "default" | "sm" | "xs";
export type ContentRowVariant = "default" | "muted" | "outline";

export type ContentRowProps = ComponentProps<"div"> & {
  size?: ContentRowSize;
  variant?: ContentRowVariant;
  xstyle?: stylex.StyleXStyles;
};

export function ContentRow({
  size = "default",
  variant = "default",
  xstyle,
  ...props
}: ContentRowProps) {
  return (
    <div
      {...props}
      {...stylex.props(
        styles.root,
        size === "default" ? styles.sizeDefault : styles[size],
        variant === "default" ? styles.variantDefault : styles[variant],
        xstyle,
      )}
    />
  );
}

export function ContentRowGroup({ ...props }: ComponentProps<"div">) {
  return <div {...props} {...stylex.props(styles.group)} />;
}

export type ContentRowMediaProps = ComponentProps<"div"> & {
  variant?: "avatar" | "icon" | "image";
};

export function ContentRowMedia({ variant = "icon", ...props }: ContentRowMediaProps) {
  return <div {...props} {...stylex.props(styles.media, styles[`media${variant}`])} />;
}

export function ContentRowContent({ ...props }: ComponentProps<"div">) {
  return <div {...props} {...stylex.props(styles.content)} />;
}

export function ContentRowTitle({ ...props }: ComponentProps<"div">) {
  return <div {...props} {...stylex.props(styles.title)} />;
}

export function ContentRowDescription({ ...props }: ComponentProps<"p">) {
  return <p {...props} {...stylex.props(styles.description)} />;
}

export function ContentRowActions({ ...props }: ComponentProps<"div">) {
  return <div {...props} {...stylex.props(styles.actions)} />;
}
