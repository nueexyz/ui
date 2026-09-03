import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import * as stylex from "@stylexjs/stylex";
import { createContext, useContext } from "react";
import type { ComponentProps } from "react";

import { getNativeStyleProps } from "./stylex-props";
import {
  colorVars,
  motionVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nooeh/tokens/semantic.stylex";

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
    "@media (prefers-reduced-motion: reduce)": { transitionDuration: "0.01ms" },
  },
  overlayTransitioning: { opacity: 0 },
  overlayEnding: {
    transitionDuration: motionVars.durationNormal,
    transitionTimingFunction: motionVars.easingExit,
  },
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
    "@media (prefers-reduced-motion: reduce)": { transitionDuration: "0.01ms" },
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
    transform:
      "translate3d(var(--drawer-swipe-movement-x, 0px), calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)), 0)",
  },
  upPopup: {
    borderRadius: "0 0 1rem 1rem",
    top: 0,
    transform:
      "translate3d(var(--drawer-swipe-movement-x, 0px), calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)), 0)",
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
  },
  rightPopup: {
    borderRadius: "1rem 0 0 1rem",
    right: 0,
    transform:
      "translate3d(var(--drawer-swipe-movement-x, 0px), var(--drawer-swipe-movement-y, 0px), 0)",
  },
  downTransitioning: { opacity: 0, transform: "translate3d(0, 100%, 0)" },
  upTransitioning: { opacity: 0, transform: "translate3d(0, -100%, 0)" },
  leftTransitioning: { opacity: 0, transform: "translate3d(-100%, 0, 0)" },
  rightTransitioning: { opacity: 0, transform: "translate3d(100%, 0, 0)" },
  popupEnding: {
    transitionDuration: motionVars.durationNormal,
    transitionTimingFunction: motionVars.easingExit,
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
  horizontalSwipeHandle: { height: "2.5rem", marginInline: spacingVars.space2, width: "0.25rem" },
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
    justifyContent: "flex-end",
    paddingBlock: spacingVars.space6,
    paddingBlockStart: spacingVars.space2,
    paddingInline: spacingVars.space6,
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
  showSwipeHandle: boolean;
  swipeDirection: NonNullable<ComponentProps<typeof DrawerPrimitive.Root>["swipeDirection"]>;
};

const DrawerContext = createContext<DrawerContextValue>({
  showSwipeHandle: false,
  swipeDirection: "down",
});

export type DrawerProps = ComponentProps<typeof DrawerPrimitive.Root> & {
  showSwipeHandle?: boolean;
};

export function Drawer({
  showSwipeHandle = false,
  swipeDirection = "down",
  ...props
}: DrawerProps) {
  return (
    <DrawerContext.Provider value={{ showSwipeHandle, swipeDirection }}>
      <DrawerPrimitive.Root {...props} swipeDirection={swipeDirection} />
    </DrawerContext.Provider>
  );
}

export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerClose = DrawerPrimitive.Close;
export const DrawerPortal = DrawerPrimitive.Portal;

type DrawerOverlayProps = ComponentProps<typeof DrawerPrimitive.Backdrop> & {
  xstyle?: stylex.StyleXStyles;
};

export function DrawerOverlay({ className, style, xstyle, ...props }: DrawerOverlayProps) {
  return (
    <DrawerPrimitive.Backdrop
      {...props}
      data-slot="drawer-overlay"
      className={(state) => {
        const stylexProps = stylex.props(
          styles.overlay,
          state.transitionStatus === "starting" && styles.overlayTransitioning,
          state.transitionStatus === "ending" && styles.overlayTransitioning,
          state.transitionStatus === "ending" && styles.overlayEnding,
          xstyle,
        );
        return [
          stylexProps.className,
          typeof className === "function" ? className(state) : className,
        ]
          .filter(Boolean)
          .join(" ");
      }}
      style={(state) => {
        const stylexProps = stylex.props(
          styles.overlay,
          state.transitionStatus === "starting" && styles.overlayTransitioning,
          state.transitionStatus === "ending" && styles.overlayTransitioning,
          state.transitionStatus === "ending" && styles.overlayEnding,
          xstyle,
        );
        return {
          ...stylexProps.style,
          ...(typeof style === "function" ? style(state) : style),
        };
      }}
    />
  );
}

type DrawerSwipeHandleProps = ComponentProps<"div"> & { xstyle?: stylex.StyleXStyles };

export function DrawerSwipeHandle({ className, style, xstyle, ...props }: DrawerSwipeHandleProps) {
  const { swipeDirection } = useContext(DrawerContext);
  const isHorizontal = swipeDirection === "left" || swipeDirection === "right";
  return (
    <div
      aria-hidden="true"
      data-slot="drawer-swipe-handle"
      {...props}
      {...getNativeStyleProps(
        stylex.props(styles.swipeHandle, isHorizontal && styles.horizontalSwipeHandle, xstyle),
        className,
        style,
      )}
    />
  );
}

type DrawerContentProps = ComponentProps<typeof DrawerPrimitive.Popup> & {
  xstyle?: stylex.StyleXStyles;
};

type DrawerPopupState = Parameters<
  Exclude<ComponentProps<typeof DrawerPrimitive.Popup>["className"], string | undefined>
>[0];

function getDrawerPopupStylexProps(state: DrawerPopupState, xstyle?: stylex.StyleXStyles) {
  if (state.swipeDirection === "up") {
    return stylex.props(
      styles.popup,
      styles.verticalPopup,
      styles.upPopup,
      state.transitionStatus === "starting" && styles.upTransitioning,
      state.transitionStatus === "ending" && styles.upTransitioning,
      state.transitionStatus === "ending" && styles.popupEnding,
      xstyle,
    );
  }
  if (state.swipeDirection === "right") {
    return stylex.props(
      styles.popup,
      styles.horizontalPopup,
      styles.rightPopup,
      state.transitionStatus === "starting" && styles.rightTransitioning,
      state.transitionStatus === "ending" && styles.rightTransitioning,
      state.transitionStatus === "ending" && styles.popupEnding,
      xstyle,
    );
  }
  if (state.swipeDirection === "left") {
    return stylex.props(
      styles.popup,
      styles.horizontalPopup,
      styles.leftPopup,
      state.transitionStatus === "starting" && styles.leftTransitioning,
      state.transitionStatus === "ending" && styles.leftTransitioning,
      state.transitionStatus === "ending" && styles.popupEnding,
      xstyle,
    );
  }

  return stylex.props(
    styles.popup,
    styles.verticalPopup,
    styles.downPopup,
    state.transitionStatus === "starting" && styles.downTransitioning,
    state.transitionStatus === "ending" && styles.downTransitioning,
    state.transitionStatus === "ending" && styles.popupEnding,
    xstyle,
  );
}

export function DrawerContent({
  children,
  className,
  style,
  xstyle,
  ...props
}: DrawerContentProps) {
  const { showSwipeHandle } = useContext(DrawerContext);

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Viewport {...stylex.props(styles.viewport)}>
        <DrawerPrimitive.Popup
          {...props}
          data-slot="drawer-popup"
          className={(state) => {
            const stylexProps = getDrawerPopupStylexProps(state, xstyle);
            return [
              stylexProps.className,
              typeof className === "function" ? className(state) : className,
            ]
              .filter(Boolean)
              .join(" ");
          }}
          style={(state) => {
            const stylexProps = getDrawerPopupStylexProps(state, xstyle);
            return {
              ...stylexProps.style,
              ...(typeof style === "function" ? style(state) : style),
            };
          }}
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
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & { xstyle?: stylex.StyleXStyles }) {
  return (
    <div
      {...props}
      {...getNativeStyleProps(stylex.props(styles.header, xstyle), className, style)}
    />
  );
}

export function DrawerFooter({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & { xstyle?: stylex.StyleXStyles }) {
  return (
    <div
      {...props}
      {...getNativeStyleProps(stylex.props(styles.footer, xstyle), className, style)}
    />
  );
}

export function DrawerTitle({
  className,
  style,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Title>) {
  const stylexProps = stylex.props(styles.title);
  return (
    <DrawerPrimitive.Title
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

export function DrawerDescription({
  className,
  style,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Description>) {
  const stylexProps = stylex.props(styles.description);
  return (
    <DrawerPrimitive.Description
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
