import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import { Icon } from "./Icon";
import {
  colorVars,
  motionVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nooeh/tokens/tokens.stylex";

const styles = stylex.create({
  backdrop: {
    backdropFilter: "blur(4px)",
    backgroundColor: "oklch(0% 0 0 / 40%)",
    inset: 0,
    position: "fixed",
    transitionDuration: motionVars.durationSlow,
    transitionProperty: "opacity",
    transitionTimingFunction: motionVars.easingEnter,
    zIndex: 50,
    "@media (prefers-reduced-motion: reduce)": { transitionDuration: "0.01ms" },
  },
  backdropTransitioning: { opacity: 0 },
  backdropEnding: {
    transitionDuration: motionVars.durationNormal,
    transitionTimingFunction: motionVars.easingExit,
  },
  viewport: {
    alignItems: "center",
    display: "flex",
    inset: 0,
    justifyContent: "center",
    padding: spacingVars.space4,
    position: "fixed",
    zIndex: 51,
  },
  popup: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    boxShadow: shadowVars.overlay,
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space4,
    maxHeight: "calc(100dvh - 2rem)",
    maxWidth: "32rem",
    outline: "none",
    overflow: "auto",
    padding: spacingVars.space6,
    position: "relative",
    transform: "translateY(0) scale(1)",
    transitionDuration: motionVars.durationSlow,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: motionVars.easingEnter,
    width: "100%",
    "@media (prefers-reduced-motion: reduce)": {
      transform: "none",
      transitionDuration: "0.01ms",
    },
  },
  popupTransitioning: { opacity: 0, transform: "translateY(0.5rem) scale(0.98)" },
  popupEnding: {
    transitionDuration: motionVars.durationNormal,
    transitionTimingFunction: motionVars.easingExit,
  },
  close: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderWidth: 0,
    borderRadius: radiusVars.sm,
    color: colorVars.fgSecondary,
    cursor: "pointer",
    display: "inline-flex",
    height: sizeVars.touchTarget,
    justifyContent: "center",
    outline: "none",
    position: "absolute",
    right: spacingVars.space3,
    top: spacingVars.space3,
    width: sizeVars.touchTarget,
    ":hover": { backgroundColor: colorVars.interactionHover, color: colorVars.fgPrimary },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space2,
    paddingInlineEnd: spacingVars.space8,
  },
  footer: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: spacingVars.space2,
    justifyContent: "flex-end",
  },
  title: {
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeLg,
    fontWeight: typographyVars.fontWeightSemibold,
    lineHeight: typographyVars.lineHeightTight,
    margin: 0,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
});

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
