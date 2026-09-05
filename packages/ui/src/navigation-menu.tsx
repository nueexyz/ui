"use client";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { CaretDownIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
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
  root: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    maxWidth: "max-content",
    position: "relative",
    zIndex: 10,
  },
  list: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    gap: 0,
    justifyContent: "center",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  item: { position: "relative" },
  trigger: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderWidth: 0,
    borderRadius: radiusVars.sm,
    color: colorVars.fgPrimary,
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    gap: spacingVars.space1,
    height: sizeVars.controlMd,
    outline: "none",
    paddingInline: spacingVars.space3,
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, color",
    transitionTimingFunction: motionVars.easingStandard,
    ":hover": { backgroundColor: colorVars.interactionHover },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": {
      backgroundColor: "transparent",
      color: colorVars.fgDisabled,
      cursor: "not-allowed",
      ":hover": { backgroundColor: "transparent" },
    },
  },
  triggerOpen: { backgroundColor: colorVars.interactionHover },
  icon: {
    alignItems: "center",
    display: "inline-flex",
    position: "relative",
    top: sizeVars.stroke,
    transform: "rotate(0deg)",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "transform",
    transitionTimingFunction: motionVars.easingStandard,
    ":is([data-popup-open] *)": { transform: "rotate(180deg)" },
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: motionVars.durationInstant,
    },
  },
  content: {
    height: "100%",
    padding: spacingVars.space1,
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: motionVars.easingStandard,
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: motionVars.durationInstant,
    },
    width: "auto",
  },
  contentStartingFromLeft: { opacity: 0, transform: "translateX(-50%)" },
  contentStartingFromRight: { opacity: 0, transform: "translateX(50%)" },
  contentEndingToLeft: { opacity: 0, transform: "translateX(-50%)" },
  contentEndingToRight: { opacity: 0, transform: "translateX(50%)" },
  link: {
    alignItems: "center",
    borderRadius: radiusVars.sm,
    color: colorVars.fgPrimary,
    display: "flex",
    gap: spacingVars.space2,
    outline: "none",
    padding: spacingVars.space2,
    textDecoration: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, color",
    transitionTimingFunction: motionVars.easingStandard,
    ":hover": { backgroundColor: colorVars.interactionHover },
    ":focus-visible": {
      backgroundColor: colorVars.interactionHover,
      outlineColor: colorVars.strokeFocus,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  positioner: {
    height: "var(--positioner-height)",
    maxWidth: "var(--available-width)",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "inset, width, height",
    transitionTimingFunction: motionVars.easingStandard,
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: motionVars.durationInstant,
    },
    width: "var(--positioner-width)",
    zIndex: 60,
  },
  popup: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    boxShadow: shadowVars.floating,
    color: colorVars.fgPrimary,
    height: "var(--popup-height)",
    outline: "none",
    overflow: "hidden",
    position: "relative",
    transformOrigin: "var(--transform-origin)",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "opacity, transform, width, height",
    transitionTimingFunction: motionVars.easingEnter,
    width: "var(--popup-width)",
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: motionVars.durationInstant,
    },
  },
  popupTransitioning: { opacity: 0, transform: "scale(0.9)" },
  viewport: {
    fontFamily: typographyVars.fontFamilyBody,
    height: "100%",
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
});

export function NavigationMenu(
  props: Omit<ComponentProps<typeof NavigationMenuPrimitive.Root>, "className" | "style">,
) {
  return <NavigationMenuPrimitive.Root {...props} {...stylex.props(styles.root)} />;
}

export function NavigationMenuList(
  props: Omit<ComponentProps<typeof NavigationMenuPrimitive.List>, "className" | "style">,
) {
  return <NavigationMenuPrimitive.List {...props} {...stylex.props(styles.list)} />;
}

export function NavigationMenuItem(
  props: Omit<ComponentProps<typeof NavigationMenuPrimitive.Item>, "className" | "style">,
) {
  return <NavigationMenuPrimitive.Item {...props} {...stylex.props(styles.item)} />;
}

export function NavigationMenuContent({
  ...props
}: Omit<ComponentProps<typeof NavigationMenuPrimitive.Content>, "className" | "style">) {
  function getContentStyles(state: NavigationMenuPrimitive.Content.State) {
    return stylex.props(
      styles.content,
      state.transitionStatus === "starting" &&
        state.activationDirection === "left" &&
        styles.contentStartingFromLeft,
      state.transitionStatus === "starting" &&
        state.activationDirection === "right" &&
        styles.contentStartingFromRight,
      state.transitionStatus === "ending" &&
        state.activationDirection === "left" &&
        styles.contentEndingToRight,
      state.transitionStatus === "ending" &&
        state.activationDirection === "right" &&
        styles.contentEndingToLeft,
    );
  }
  return (
    <NavigationMenuPrimitive.Content
      {...props}
      className={(state) => getContentStyles(state).className}
      style={(state) => getContentStyles(state).style}
    />
  );
}

export function NavigationMenuTrigger({
  children,
  ...props
}: Omit<ComponentProps<typeof NavigationMenuPrimitive.Trigger>, "className" | "style">) {
  function getTriggerStyles(state: NavigationMenuPrimitive.Trigger.State) {
    return stylex.props(styles.trigger, state.open && styles.triggerOpen);
  }
  return (
    <NavigationMenuPrimitive.Trigger
      {...props}
      className={(state) => getTriggerStyles(state).className}
      style={(state) => getTriggerStyles(state).style}
    >
      {children}
      <NavigationMenuPrimitive.Icon {...stylex.props(styles.icon)}>
        <CaretDownIcon aria-hidden="true" />
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuLink({
  ...props
}: Omit<ComponentProps<typeof NavigationMenuPrimitive.Link>, "className" | "style">) {
  const sx = stylex.props(styles.link);
  return <NavigationMenuPrimitive.Link {...props} className={sx.className} style={sx.style} />;
}

type NavigationMenuViewportProps = Omit<
  ComponentProps<typeof NavigationMenuPrimitive.Popup>,
  "className" | "style"
> &
  Pick<ComponentProps<typeof NavigationMenuPrimitive.Positioner>, "align" | "side" | "sideOffset">;

export function NavigationMenuViewport({
  align = "start",
  side = "bottom",
  sideOffset = 8,
  ...props
}: NavigationMenuViewportProps) {
  function getPopupStyles(state: NavigationMenuPrimitive.Popup.State) {
    return stylex.props(
      styles.popup,
      state.transitionStatus === "starting" && styles.popupTransitioning,
      state.transitionStatus === "ending" && styles.popupTransitioning,
    );
  }
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <NavigationMenuPrimitive.Popup
          {...props}
          className={(state) => getPopupStyles(state).className}
          style={(state) => getPopupStyles(state).style}
        >
          <NavigationMenuPrimitive.Viewport {...stylex.props(styles.viewport)} />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
}
