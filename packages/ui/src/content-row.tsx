import { colorVars, radiusVars, sizeVars, spacingVars } from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { typographyStyles } from "./typography";

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
    alignSelf: "baseline",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacingVars.space1,
    minWidth: 0,
  },
  description: {
    color: colorVars.fgSecondary,
    margin: 0,
  },
  actions: {
    alignItems: "baseline",
    alignSelf: "baseline",
    display: "flex",
    flexShrink: 0,
    gap: spacingVars.space2,
  },
});

export type ContentRowSize = "default" | "sm" | "xs";
export type ContentRowVariant = "default" | "muted" | "outline";

export type ContentRowProps = Omit<ComponentProps<"div">, "className" | "style"> & {
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

export function ContentRowGroup({ ...props }: Omit<ComponentProps<"div">, "className" | "style">) {
  return <div {...props} {...stylex.props(styles.group)} />;
}

export type ContentRowMediaProps = Omit<ComponentProps<"div">, "className" | "style"> & {
  variant?: "avatar" | "icon" | "image";
};

export function ContentRowMedia({ variant = "icon", ...props }: ContentRowMediaProps) {
  return <div {...props} {...stylex.props(styles.media, styles[`media${variant}`])} />;
}

export function ContentRowContent({
  ...props
}: Omit<ComponentProps<"div">, "className" | "style">) {
  return <div {...props} {...stylex.props(styles.content)} />;
}

export function ContentRowTitle({ ...props }: Omit<ComponentProps<"div">, "className" | "style">) {
  return <div {...props} {...stylex.props(typographyStyles.title)} />;
}

export function ContentRowDescription({
  ...props
}: Omit<ComponentProps<"p">, "className" | "style">) {
  return <p {...props} {...stylex.props(typographyStyles.description, styles.description)} />;
}

export function ContentRowActions({
  ...props
}: Omit<ComponentProps<"div">, "className" | "style">) {
  return <div {...props} {...stylex.props(styles.actions)} />;
}
