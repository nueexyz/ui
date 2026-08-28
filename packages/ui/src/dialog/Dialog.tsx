import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import { Icon } from "../Icon";
import { styles } from "./dialog.stylex";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

type DialogContentProps = ComponentProps<typeof DialogPrimitive.Popup> & {
  children: ReactNode;
  /** Accessible name for the optional close button. @default "Close" */
  closeLabel?: string;
  showCloseButton?: boolean;
  xstyle?: stylex.StyleXStyles;
};

export function DialogContent({
  children,
  className,
  closeLabel = "Close",
  showCloseButton = true,
  style,
  xstyle,
  ...props
}: DialogContentProps) {
  const stylexProps = stylex.props(styles.popup, xstyle);
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        className={(state) =>
          stylex.props(
            styles.backdrop,
            state.transitionStatus === "starting" && styles.backdropTransitioning,
            state.transitionStatus === "ending" && styles.backdropTransitioning,
            state.transitionStatus === "ending" && styles.backdropEnding,
          ).className ?? ""
        }
        style={(state) =>
          stylex.props(
            styles.backdrop,
            state.transitionStatus === "starting" && styles.backdropTransitioning,
            state.transitionStatus === "ending" && styles.backdropTransitioning,
            state.transitionStatus === "ending" && styles.backdropEnding,
          ).style
        }
      />
      <DialogPrimitive.Viewport {...stylex.props(styles.viewport)}>
        <DialogPrimitive.Popup
          {...props}
          className={(state) => {
            const motionStylexProps = stylex.props(
              state.transitionStatus === "starting" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupEnding,
            );
            const customClassName = typeof className === "function" ? className(state) : className;
            return [stylexProps.className, motionStylexProps.className, customClassName]
              .filter(Boolean)
              .join(" ");
          }}
          style={(state) => {
            const motionStylexProps = stylex.props(
              state.transitionStatus === "starting" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupEnding,
            );
            return {
              ...stylexProps.style,
              ...motionStylexProps.style,
              ...(typeof style === "function" ? style(state) : style),
            };
          }}
        >
          {children}
          {showCloseButton ? (
            <DialogPrimitive.Close aria-label={closeLabel} {...stylex.props(styles.close)}>
              <Icon aria-hidden="true" name="close" />
            </DialogPrimitive.Close>
          ) : null}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPrimitive.Portal>
  );
}

function getNativeStyleProps(
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

export function DialogHeader({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...getNativeStyleProps(styles.header, className, style, xstyle)} />;
}

export function DialogFooter({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...getNativeStyleProps(styles.footer, className, style, xstyle)} />;
}

export function DialogTitle({
  className,
  style,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  const stylexProps = stylex.props(styles.title);
  return (
    <DialogPrimitive.Title
      {...props}
      className={(state) =>
        [stylexProps.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ")
      }
      style={(state) => ({
        ...stylexProps.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    />
  );
}

export function DialogDescription({
  className,
  style,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  const stylexProps = stylex.props(styles.description);
  return (
    <DialogPrimitive.Description
      {...props}
      className={(state) =>
        [stylexProps.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ")
      }
      style={(state) => ({
        ...stylexProps.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    />
  );
}
