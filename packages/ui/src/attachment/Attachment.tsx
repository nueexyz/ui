import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Button, type ButtonProps } from "../button";
import { styles } from "./attachment.stylex";

export type AttachmentState = "done" | "error" | "idle" | "processing" | "uploading";
export type AttachmentSize = "default" | "sm" | "xs";

function mergeProps(
  resolved: ReturnType<typeof stylex.props>,
  className: string | undefined,
  style: ComponentProps<"div">["style"],
) {
  return {
    className: [resolved.className, className].filter(Boolean).join(" "),
    style: { ...resolved.style, ...style },
  };
}

export type AttachmentProps = Omit<ComponentProps<"div">, "title"> & {
  orientation?: "horizontal" | "vertical";
  size?: AttachmentSize;
  state?: AttachmentState;
  xstyle?: stylex.StyleXStyles;
};

export function Attachment({
  className,
  orientation = "horizontal",
  size = "default",
  state = "done",
  style,
  xstyle,
  ...props
}: AttachmentProps) {
  return (
    <div
      {...props}
      data-orientation={orientation}
      data-state={state}
      {...mergeProps(
        stylex.props(
          styles.root,
          styles[orientation],
          size === "default" ? styles.sizeDefault : styles[size],
          state === "error" && styles.error,
          xstyle,
        ),
        className,
        style,
      )}
    />
  );
}

export type AttachmentMediaProps = ComponentProps<"div"> & {
  variant?: "icon" | "image";
};

export function AttachmentMedia({
  className,
  style,
  variant = "icon",
  ...props
}: AttachmentMediaProps) {
  return (
    <div
      {...props}
      {...mergeProps(stylex.props(styles.media, styles[`media${variant}`]), className, style)}
    />
  );
}

export function AttachmentContent({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...mergeProps(stylex.props(styles.content), className, style)} />;
}

export function AttachmentTitle({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...mergeProps(stylex.props(styles.title), className, style)} />;
}

export function AttachmentDescription({ className, style, ...props }: ComponentProps<"p">) {
  return <p {...props} {...mergeProps(stylex.props(styles.description), className, style)} />;
}

export function AttachmentActions({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...mergeProps(stylex.props(styles.actions), className, style)} />;
}

export type AttachmentActionProps = Omit<ButtonProps, "size" | "variant">;

export function AttachmentAction({ xstyle, ...props }: AttachmentActionProps) {
  return <Button {...props} size="sm" variant="ghost" xstyle={[styles.action, xstyle]} />;
}

export function AttachmentTrigger({
  className,
  style,
  type = "button",
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      {...props}
      type={type}
      {...mergeProps(stylex.props(styles.trigger), className, style)}
    />
  );
}

export function AttachmentGroup({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...mergeProps(stylex.props(styles.group), className, style)} />;
}
