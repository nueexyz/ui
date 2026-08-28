import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import { Button } from "../button";
import { styles } from "./alert-dialog.stylex";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

type AlertDialogContentProps = ComponentProps<typeof AlertDialogPrimitive.Popup> & {
  children: ReactNode;
  xstyle?: stylex.StyleXStyles;
};

export function AlertDialogContent({
  children,
  className,
  style,
  xstyle,
  ...props
}: AlertDialogContentProps) {
  const stylexProps = stylex.props(styles.popup, xstyle);

  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Backdrop
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
      <AlertDialogPrimitive.Viewport {...stylex.props(styles.viewport)}>
        <AlertDialogPrimitive.Popup
          {...props}
          className={(state) => {
            const motionStylexProps = stylex.props(
              state.transitionStatus === "starting" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupEnding,
            );
            return [
              stylexProps.className,
              motionStylexProps.className,
              typeof className === "function" ? className(state) : className,
            ]
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
        </AlertDialogPrimitive.Popup>
      </AlertDialogPrimitive.Viewport>
    </AlertDialogPrimitive.Portal>
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

export function AlertDialogHeader({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...getNativeStyleProps(styles.header, className, style, xstyle)} />;
}

export function AlertDialogFooter({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...getNativeStyleProps(styles.footer, className, style, xstyle)} />;
}

export function AlertDialogTitle({
  className,
  style,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Title>) {
  const stylexProps = stylex.props(styles.title);
  return (
    <AlertDialogPrimitive.Title
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

export function AlertDialogDescription({
  className,
  style,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Description>) {
  const stylexProps = stylex.props(styles.description);
  return (
    <AlertDialogPrimitive.Description
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

type AlertDialogButtonProps = ComponentProps<typeof AlertDialogPrimitive.Close>;

export function AlertDialogCancel({ children, ...props }: AlertDialogButtonProps) {
  return (
    <AlertDialogPrimitive.Close
      {...props}
      render={<Button variant="secondary">{children}</Button>}
    />
  );
}

export function AlertDialogAction({ children, ...props }: AlertDialogButtonProps) {
  return (
    <AlertDialogPrimitive.Close
      {...props}
      render={<Button variant="destructive">{children}</Button>}
    />
  );
}
