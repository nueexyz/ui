import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
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
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.bgSurface,
    borderRadius: radiusVars.full,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgSecondary,
    display: "inline-flex",
    flexShrink: 0,
    overflow: "visible",
    position: "relative",
  },
  sm: { height: sizeVars.controlSm, width: sizeVars.controlSm },
  md: { height: sizeVars.controlMd, width: sizeVars.controlMd },
  lg: { height: sizeVars.controlLg, width: sizeVars.controlLg },
  image: {
    borderRadius: "inherit",
    height: "100%",
    objectFit: "cover",
    overflow: "hidden",
    width: "100%",
  },
  fallback: {
    alignItems: "center",
    borderRadius: "inherit",
    display: "flex",
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    height: "100%",
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
  },
  badge: {
    backgroundColor: colorVars.fgFeedbackSuccess,
    borderColor: colorVars.bgSurface,
    borderRadius: radiusVars.full,
    borderStyle: "solid",
    borderWidth: "0.125rem",
    bottom: "-0.0625rem",
    height: "0.75rem",
    position: "absolute",
    right: "-0.0625rem",
    width: "0.75rem",
  },
  group: { display: "flex", gap: spacingVars.space1 },
  groupCount: {
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.bgSurface,
    borderRadius: radiusVars.full,
    borderStyle: "solid",
    borderWidth: "0.125rem",
    color: colorVars.fgSecondary,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    height: sizeVars.controlMd,
    justifyContent: "center",
    width: sizeVars.controlMd,
  },
});

export type AvatarSize = "lg" | "md" | "sm";

export type AvatarProps = Omit<
  ComponentProps<typeof AvatarPrimitive.Root>,
  "className" | "style"
> & {
  size?: AvatarSize;
  xstyle?: stylex.StyleXStyles;
};

export function Avatar({ size = "md", xstyle, ...props }: AvatarProps) {
  const stylexProps = stylex.props(styles.root, styles[size], xstyle);
  return (
    <AvatarPrimitive.Root {...props} className={stylexProps.className} style={stylexProps.style} />
  );
}

export function AvatarImage({
  ...props
}: Omit<ComponentProps<typeof AvatarPrimitive.Image>, "className" | "style">) {
  const stylexProps = stylex.props(styles.image);
  return (
    <AvatarPrimitive.Image {...props} className={stylexProps.className} style={stylexProps.style} />
  );
}

export function AvatarFallback({
  ...props
}: Omit<ComponentProps<typeof AvatarPrimitive.Fallback>, "className" | "style">) {
  const stylexProps = stylex.props(styles.fallback);
  return (
    <AvatarPrimitive.Fallback
      {...props}
      className={stylexProps.className}
      style={stylexProps.style}
    />
  );
}

export function AvatarBadge({ ...props }: Omit<ComponentProps<"span">, "className" | "style">) {
  return <span {...props} {...stylex.props(styles.badge)} />;
}

export function AvatarGroup({ ...props }: Omit<ComponentProps<"div">, "className" | "style">) {
  return <div {...props} {...stylex.props(styles.group)} />;
}

export function AvatarGroupCount({
  ...props
}: Omit<ComponentProps<"span">, "className" | "style">) {
  return <span {...props} {...stylex.props(styles.groupCount)} />;
}
