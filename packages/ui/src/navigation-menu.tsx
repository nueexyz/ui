import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

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
  },
  iconClosed: {
    alignItems: "center",
    display: "inline-flex",
    ":is([data-popup-open] *)": { display: "none" },
  },
  iconOpen: {
    alignItems: "center",
    display: "none",
    ":is([data-popup-open] *)": { display: "inline-flex" },
  },
  content: {
    height: "100%",
    padding: spacingVars.space1,
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "opacity, transform",
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
    width: "var(--popup-width)",
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

export function NavigationMenu(props: ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return <NavigationMenuPrimitive.Root {...props} {...stylex.props(styles.root)} />;
}

export function NavigationMenuList(props: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return <NavigationMenuPrimitive.List {...props} {...stylex.props(styles.list)} />;
}

export function NavigationMenuItem(props: ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return <NavigationMenuPrimitive.Item {...props} {...stylex.props(styles.item)} />;
}

export function NavigationMenuContent({
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      {...props}
      className={(state) => {
        const sx = stylex.props(
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
        return sx.className;
      }}
      style={(state) => {
        const sx = stylex.props(
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
        return sx.style;
      }}
    />
  );
}

export function NavigationMenuTrigger({
  children,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      {...props}
      className={(state) => {
        const sx = stylex.props(styles.trigger, state.open && styles.triggerOpen);
        return sx.className;
      }}
      style={(state) => {
        const sx = stylex.props(styles.trigger, state.open && styles.triggerOpen);
        return sx.style;
      }}
    >
      {children}
      <NavigationMenuPrimitive.Icon {...stylex.props(styles.icon)}>
        <span {...stylex.props(styles.iconClosed)}>
          <Icon aria-hidden="true" name="chevronDown" />
        </span>
        <span {...stylex.props(styles.iconOpen)}>
          <Icon aria-hidden="true" name="chevronUp" />
        </span>
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuLink({
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  const sx = stylex.props(styles.link);
  return (
    <NavigationMenuPrimitive.Link
      {...props}
      className={() => sx.className}
      style={() => sx.style}
    />
  );
}

type NavigationMenuViewportProps = ComponentProps<typeof NavigationMenuPrimitive.Popup> &
  Pick<ComponentProps<typeof NavigationMenuPrimitive.Positioner>, "align" | "side" | "sideOffset">;

export function NavigationMenuViewport({
  align = "start",
  side = "bottom",
  sideOffset = 8,
  ...props
}: NavigationMenuViewportProps) {
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
          className={(state) => {
            const sx = stylex.props(
              styles.popup,
              state.transitionStatus === "starting" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupTransitioning,
            );
            return sx.className;
          }}
          style={(state) => {
            const sx = stylex.props(
              styles.popup,
              state.transitionStatus === "starting" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupTransitioning,
            );
            return sx.style;
          }}
        >
          <NavigationMenuPrimitive.Viewport {...stylex.props(styles.viewport)} />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
}
