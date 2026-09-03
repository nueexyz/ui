import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import { Button } from "./button";
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
    maxWidth: "28rem",
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
  header: { display: "flex", flexDirection: "column", gap: spacingVars.space2 },
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

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

type AlertDialogContentProps = ComponentProps<typeof AlertDialogPrimitive.Popup> & {
  children: ReactNode;
  xstyle?: stylex.StyleXStyles;
};

export function AlertDialogContent({ children, xstyle, ...props }: AlertDialogContentProps) {
  const stylexProps = stylex.props(styles.popup, xstyle);

  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Backdrop {...stylex.props(styles.backdrop)} />
      <AlertDialogPrimitive.Viewport {...stylex.props(styles.viewport)}>
        <AlertDialogPrimitive.Popup
          {...props}
          className={() => stylexProps.className}
          style={() => stylexProps.style}
        >
          {children}
        </AlertDialogPrimitive.Popup>
      </AlertDialogPrimitive.Viewport>
    </AlertDialogPrimitive.Portal>
  );
}

export function AlertDialogHeader({
  xstyle,
  ...props
}: ComponentProps<"div"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.header, xstyle)} />;
}

export function AlertDialogFooter({
  xstyle,
  ...props
}: ComponentProps<"div"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.footer, xstyle)} />;
}

export function AlertDialogTitle({ ...props }: ComponentProps<typeof AlertDialogPrimitive.Title>) {
  const stylexProps = stylex.props(styles.title);
  return (
    <AlertDialogPrimitive.Title
      {...props}
      className={() => stylexProps.className}
      style={() => stylexProps.style}
    />
  );
}

export function AlertDialogDescription({
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Description>) {
  const stylexProps = stylex.props(styles.description);
  return (
    <AlertDialogPrimitive.Description
      {...props}
      className={() => stylexProps.className}
      style={() => stylexProps.style}
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
