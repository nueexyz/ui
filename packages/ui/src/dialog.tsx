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
} from "@nuee/tokens/semantic.stylex";

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
    ":is([data-starting-style])": { opacity: 0 },
    ":is([data-ending-style])": {
      opacity: 0,
      transitionDuration: motionVars.durationNormal,
      transitionTimingFunction: motionVars.easingExit,
    },
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
    transitionDuration: motionVars.durationSlow,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: motionVars.easingEnter,
    width: "100%",
    ":is([data-starting-style], [data-ending-style])": {
      opacity: 0,
      transform: "scale(0.95)",
    },
    ":is([data-ending-style])": {
      transitionDuration: motionVars.durationNormal,
      transitionTimingFunction: motionVars.easingExit,
    },
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: motionVars.durationNormal,
      ":is([data-starting-style], [data-ending-style])": { transform: "scale(0.99)" },
    },
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
  closeLabel = "Close",
  showCloseButton = true,
  xstyle,
  ...props
}: DialogContentProps) {
  const stylexProps = stylex.props(styles.popup, xstyle);
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop {...stylex.props(styles.backdrop)} />
      <DialogPrimitive.Viewport {...stylex.props(styles.viewport)}>
        <DialogPrimitive.Popup
          {...props}
          className={() => stylexProps.className}
          style={() => stylexProps.style}
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

export function DialogHeader({
  xstyle,
  ...props
}: ComponentProps<"div"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.header, xstyle)} />;
}

export function DialogFooter({
  xstyle,
  ...props
}: ComponentProps<"div"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.footer, xstyle)} />;
}

export function DialogTitle({ ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  const stylexProps = stylex.props(styles.title);
  return (
    <DialogPrimitive.Title
      {...props}
      className={() => stylexProps.className}
      style={() => stylexProps.style}
    />
  );
}

export function DialogDescription({
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  const stylexProps = stylex.props(styles.description);
  return (
    <DialogPrimitive.Description
      {...props}
      className={() => stylexProps.className}
      style={() => stylexProps.style}
    />
  );
}
