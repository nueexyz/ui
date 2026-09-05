import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Button, type ButtonProps } from "./button";
import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    display: "flex",
    minWidth: 0,
    position: "relative",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color",
    transitionTimingFunction: motionVars.easingStandard,
  },
  horizontal: { flexDirection: "row" },
  vertical: { alignItems: "stretch", flexDirection: "column" },
  sizeDefault: { gap: spacingVars.space3, minHeight: "4.5rem", padding: spacingVars.space3 },
  sm: { gap: spacingVars.space2, minHeight: sizeVars.touchTarget, padding: spacingVars.space2 },
  xs: { gap: spacingVars.space2, minHeight: sizeVars.controlMd, padding: spacingVars.space1 },
  error: {
    backgroundColor: colorVars.bgFeedbackError,
    borderColor: colorVars.strokeFeedbackError,
  },
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
    height: sizeVars.controlLg,
    width: sizeVars.controlLg,
  },
  mediaimage: {
    borderRadius: radiusVars.sm,
    height: "3rem",
    objectFit: "cover",
    width: "3rem",
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacingVars.space1,
    minWidth: 0,
    paddingInlineEnd: spacingVars.space5,
    paddingInlineStart: spacingVars.space2,
  },
  title: {
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightTight,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  actions: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    gap: spacingVars.space1,
    position: "relative",
    zIndex: 2,
  },
  action: { minWidth: sizeVars.controlSm, paddingInline: spacingVars.space2 },
  trigger: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "inherit",
    cursor: "pointer",
    inset: 0,
    outline: {
      default: "none",
      ":focus-visible": `${sizeVars.focusRing} solid ${colorVars.strokeFocus}`,
    },
    outlineOffset: { default: 0, ":focus-visible": 2 },
    position: "absolute",
    zIndex: 1,
  },
  group: {
    display: "flex",
    gap: spacingVars.space3,
    overflowX: "auto",
    paddingBlock: spacingVars.space1,
    scrollSnapType: "x proximity",
    width: "100%",
  },
});

export type AttachmentState = "done" | "error" | "idle" | "processing" | "uploading";
export type AttachmentSize = "default" | "sm" | "xs";

export type AttachmentProps = Omit<ComponentProps<"div">, "title" | "className" | "style"> & {
  orientation?: "horizontal" | "vertical";
  size?: AttachmentSize;
  state?: AttachmentState;
  xstyle?: stylex.StyleXStyles;
};

export function Attachment({
  orientation = "horizontal",
  size = "default",
  state = "done",
  xstyle,
  ...props
}: AttachmentProps) {
  return (
    <div
      {...props}
      data-orientation={orientation}
      data-state={state}
      {...stylex.props(
        styles.root,
        styles[orientation],
        size === "default" ? styles.sizeDefault : styles[size],
        state === "error" && styles.error,
        xstyle,
      )}
    />
  );
}

export type AttachmentMediaProps = Omit<ComponentProps<"div">, "className" | "style"> & {
  variant?: "icon" | "image";
};

export function AttachmentMedia({ variant = "icon", ...props }: AttachmentMediaProps) {
  return <div {...props} {...stylex.props(styles.media, styles[`media${variant}`])} />;
}

export function AttachmentContent({
  ...props
}: Omit<ComponentProps<"div">, "className" | "style">) {
  return <div {...props} {...stylex.props(styles.content)} />;
}

export function AttachmentTitle({ ...props }: Omit<ComponentProps<"div">, "className" | "style">) {
  return <div {...props} {...stylex.props(styles.title)} />;
}

export function AttachmentDescription({
  ...props
}: Omit<ComponentProps<"p">, "className" | "style">) {
  return <p {...props} {...stylex.props(styles.description)} />;
}

export function AttachmentActions({
  ...props
}: Omit<ComponentProps<"div">, "className" | "style">) {
  return <div {...props} {...stylex.props(styles.actions)} />;
}

export type AttachmentActionProps = Omit<ButtonProps, "size" | "variant">;

export function AttachmentAction({ xstyle, ...props }: AttachmentActionProps) {
  return <Button {...props} size="sm" variant="ghost" xstyle={[styles.action, xstyle]} />;
}

export function AttachmentTrigger({
  type = "button",
  ...props
}: Omit<ComponentProps<"button">, "className" | "style">) {
  return <button {...props} type={type} {...stylex.props(styles.trigger)} />;
}

export function AttachmentGroup({ ...props }: Omit<ComponentProps<"div">, "className" | "style">) {
  return <div {...props} {...stylex.props(styles.group)} />;
}
