import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import * as stylex from "@stylexjs/stylex";
import { createContext, useContext } from "react";
import type { ComponentProps } from "react";

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
  overlay: {
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
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: motionVars.durationInstant,
      ":is([data-ending-style])": { transitionDuration: motionVars.durationInstant },
    },
  },
  overlayTransparent: { backdropFilter: "none", backgroundColor: "transparent" },
  viewport: { inset: 0, position: "fixed", zIndex: 51 },
  popup: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    boxShadow: shadowVars.overlay,
    color: colorVars.fgPrimary,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    outline: "none",
    overflow: "hidden",
    position: "fixed",
    transitionDuration: motionVars.durationSlow,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: motionVars.easingEnter,
    willChange: "transform",
    ":is([data-ending-style])": {
      transitionDuration: motionVars.durationNormal,
      transitionTimingFunction: motionVars.easingExit,
    },
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: motionVars.durationInstant,
      ":is([data-ending-style])": { transitionDuration: motionVars.durationInstant },
    },
  },
  verticalPopup: {
    left: 0,
    marginInline: "auto",
    maxHeight: "calc(100dvh - 6rem)",
    right: 0,
    width: "100%",
  },
  downPopup: {
    borderRadius: "1rem 1rem 0 0",
    bottom: 0,
    minHeight: "50dvh",
    transform:
      "translate3d(var(--drawer-swipe-movement-x, 0px), calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)), 0)",
    ":is([data-starting-style], [data-ending-style])": {
      opacity: 0,
      transform: "translate3d(0, 100%, 0)",
    },
    "@media (prefers-reduced-motion: reduce)": {
      ":is([data-starting-style], [data-ending-style])": {
        transform: "translate3d(0, 24%, 0)",
      },
    },
  },
  upPopup: {
    borderRadius: "0 0 1rem 1rem",
    minHeight: "50dvh",
    top: 0,
    transform:
      "translate3d(var(--drawer-swipe-movement-x, 0px), calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)), 0)",
    ":is([data-starting-style], [data-ending-style])": {
      opacity: 0,
      transform: "translate3d(0, -100%, 0)",
    },
    "@media (prefers-reduced-motion: reduce)": {
      ":is([data-starting-style], [data-ending-style])": {
        transform: "translate3d(0, -24%, 0)",
      },
    },
  },
  horizontalPopup: {
    bottom: 0,
    maxWidth: "24rem",
    top: 0,
    width: "75vw",
  },
  leftPopup: {
    borderRadius: "0 1rem 1rem 0",
    left: 0,
    transform:
      "translate3d(var(--drawer-swipe-movement-x, 0px), var(--drawer-swipe-movement-y, 0px), 0)",
    ":is([data-starting-style], [data-ending-style])": {
      opacity: 0,
      transform: "translate3d(-100%, 0, 0)",
    },
    "@media (prefers-reduced-motion: reduce)": {
      ":is([data-starting-style], [data-ending-style])": {
        transform: "translate3d(-24%, 0, 0)",
      },
    },
  },
  rightPopup: {
    borderRadius: "1rem 0 0 1rem",
    right: 0,
    transform:
      "translate3d(var(--drawer-swipe-movement-x, 0px), var(--drawer-swipe-movement-y, 0px), 0)",
    ":is([data-starting-style], [data-ending-style])": {
      opacity: 0,
      transform: "translate3d(100%, 0, 0)",
    },
    "@media (prefers-reduced-motion: reduce)": {
      ":is([data-starting-style], [data-ending-style])": {
        transform: "translate3d(24%, 0, 0)",
      },
    },
  },
  content: { display: "flex", flex: 1, flexDirection: "column", minHeight: 0 },
  swipeHandle: {
    alignSelf: "center",
    backgroundColor: colorVars.strokeDefault,
    borderRadius: radiusVars.full,
    flexShrink: 0,
    height: "0.25rem",
    marginBlock: spacingVars.space2,
    width: "2.5rem",
  },
  horizontalSwipeHandle: {
    height: "2.5rem",
    marginBlock: 0,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "0.25rem",
  },
  upSwipeHandle: {
    bottom: spacingVars.space2,
    left: 0,
    marginBlock: 0,
    marginInline: "auto",
    position: "absolute",
    right: 0,
  },
  leftSwipeHandle: { right: spacingVars.space2 },
  rightSwipeHandle: { left: spacingVars.space2 },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space2,
    paddingBlock: spacingVars.space6,
    paddingBlockEnd: spacingVars.space2,
    paddingInline: spacingVars.space6,
  },
  footer: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: spacingVars.space2,
    justifyContent: "flex-start",
    paddingBlock: spacingVars.space6,
    paddingBlockStart: spacingVars.space2,
    paddingInline: spacingVars.space6,
  },
  sideFooter: {
    "@media (max-width: 40rem)": { justifyContent: "center" },
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

type DrawerContextValue = {
  overlay: DrawerOverlayMode;
  showSwipeHandle: boolean;
  swipeDirection: DrawerSwipeDirection;
};

export type DrawerOverlayMode = "visible" | "transparent" | "none";
export type DrawerSwipeDirection = "down" | "up" | "left" | "right";

const DrawerContext = createContext<DrawerContextValue>({
  overlay: "visible",
  showSwipeHandle: false,
  swipeDirection: "down",
});

export type DrawerProps = Omit<
  ComponentProps<typeof DrawerPrimitive.Root>,
  "swipeDirection" | "className" | "style"
> & {
  /** Controls the backdrop behind the Drawer. */
  overlay?: DrawerOverlayMode;
  showSwipeHandle?: boolean;
  swipeDirection?: DrawerSwipeDirection;
};

export function Drawer({
  overlay = "visible",
  showSwipeHandle = false,
  swipeDirection = "down",
  ...props
}: DrawerProps) {
  return (
    <DrawerContext.Provider value={{ overlay, showSwipeHandle, swipeDirection }}>
      <DrawerPrimitive.Root {...props} swipeDirection={swipeDirection} />
    </DrawerContext.Provider>
  );
}

export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerClose = DrawerPrimitive.Close;
export const DrawerPortal = DrawerPrimitive.Portal;

type DrawerOverlayProps = Omit<
  ComponentProps<typeof DrawerPrimitive.Backdrop>,
  "className" | "style"
> & {
  xstyle?: stylex.StyleXStyles;
};

export function DrawerOverlay({ xstyle, ...props }: DrawerOverlayProps) {
  return (
    <DrawerPrimitive.Backdrop
      {...props}
      data-slot="drawer-overlay"
      {...stylex.props(styles.overlay, xstyle)}
    />
  );
}

type DrawerSwipeHandleProps = Omit<ComponentProps<"div">, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
};

export function DrawerSwipeHandle({ xstyle, ...props }: DrawerSwipeHandleProps) {
  const { swipeDirection } = useContext(DrawerContext);
  const isHorizontal = swipeDirection === "left" || swipeDirection === "right";
  return (
    <div
      aria-hidden="true"
      data-slot="drawer-swipe-handle"
      {...props}
      {...stylex.props(
        styles.swipeHandle,
        isHorizontal && styles.horizontalSwipeHandle,
        swipeDirection === "up" && styles.upSwipeHandle,
        swipeDirection === "left" && styles.leftSwipeHandle,
        swipeDirection === "right" && styles.rightSwipeHandle,
        xstyle,
      )}
    />
  );
}

type DrawerContentProps = Omit<
  ComponentProps<typeof DrawerPrimitive.Popup>,
  "className" | "style"
> & {
  xstyle?: stylex.StyleXStyles;
};

function getDrawerPopupStylexProps(
  swipeDirection: DrawerSwipeDirection,
  xstyle?: stylex.StyleXStyles,
) {
  if (swipeDirection === "right") {
    return stylex.props(styles.popup, styles.horizontalPopup, styles.rightPopup, xstyle);
  }
  if (swipeDirection === "left") {
    return stylex.props(styles.popup, styles.horizontalPopup, styles.leftPopup, xstyle);
  }
  if (swipeDirection === "up") {
    return stylex.props(styles.popup, styles.verticalPopup, styles.upPopup, xstyle);
  }

  return stylex.props(styles.popup, styles.verticalPopup, styles.downPopup, xstyle);
}

export function DrawerContent({ children, xstyle, ...props }: DrawerContentProps) {
  const { overlay, showSwipeHandle, swipeDirection } = useContext(DrawerContext);

  return (
    <DrawerPortal>
      {overlay === "none" ? null : (
        <DrawerOverlay xstyle={overlay === "transparent" ? styles.overlayTransparent : undefined} />
      )}
      <DrawerPrimitive.Viewport {...stylex.props(styles.viewport)}>
        <DrawerPrimitive.Popup
          {...props}
          data-slot="drawer-popup"
          {...getDrawerPopupStylexProps(swipeDirection, xstyle)}
        >
          {showSwipeHandle ? <DrawerSwipeHandle /> : null}
          <DrawerPrimitive.Content {...stylex.props(styles.content)}>
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  );
}

export function DrawerHeader({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.header, xstyle)} />;
}

export function DrawerFooter({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  const { swipeDirection } = useContext(DrawerContext);
  const isSideDrawer = swipeDirection === "left" || swipeDirection === "right";

  return (
    <div {...props} {...stylex.props(styles.footer, isSideDrawer && styles.sideFooter, xstyle)} />
  );
}

export function DrawerTitle({
  ...props
}: Omit<ComponentProps<typeof DrawerPrimitive.Title>, "className" | "style">) {
  const stylexProps = stylex.props(styles.title);
  return (
    <DrawerPrimitive.Title {...props} className={stylexProps.className} style={stylexProps.style} />
  );
}

export function DrawerDescription({
  ...props
}: Omit<ComponentProps<typeof DrawerPrimitive.Description>, "className" | "style">) {
  const stylexProps = stylex.props(styles.description);
  return (
    <DrawerPrimitive.Description
      {...props}
      className={stylexProps.className}
      style={stylexProps.style}
    />
  );
}
