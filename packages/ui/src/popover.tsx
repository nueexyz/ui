"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import {
  colorVars,
  layerVars,
  motionVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

const styles = stylex.create({
  positioner: { zIndex: layerVars.popup },
  popup: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    boxShadow: shadowVars.floating,
    color: colorVars.fgPrimary,
    maxWidth: "calc(100vw - 2rem)",
    outline: "none",
    padding: spacingVars.space4,
    transform: "scale(1)",
    transformOrigin: "var(--transform-origin)",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: motionVars.easingEnter,
    width: sizeVars.contentXs,
    "@media (prefers-reduced-motion: reduce)": {
      transform: "none",
      transitionDuration: motionVars.durationInstant,
    },
  },
  popupTransitioning: { opacity: 0, transform: "scale(0.98)" },
  popupEnding: {
    transitionDuration: motionVars.durationFast,
    transitionTimingFunction: motionVars.easingExit,
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: motionVars.durationInstant,
    },
  },
  header: { display: "flex", flexDirection: "column", gap: spacingVars.space1 },
  title: {
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
});

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;

type PopoverContentProps = Omit<
  ComponentProps<typeof PopoverPrimitive.Popup>,
  "className" | "style"
> &
  Pick<ComponentProps<typeof PopoverPrimitive.Positioner>, "align" | "side" | "sideOffset"> & {
    xstyle?: stylex.StyleXStyles;
  };

export function PopoverContent({
  align = "start",
  side = "bottom",
  sideOffset = 6,
  xstyle,
  ...props
}: PopoverContentProps) {
  function getPopupStyles(state: PopoverPrimitive.Popup.State) {
    return stylex.props(
      styles.popup,
      state.transitionStatus === "starting" && styles.popupTransitioning,
      state.transitionStatus === "ending" && styles.popupTransitioning,
      state.transitionStatus === "ending" && styles.popupEnding,
      xstyle,
    );
  }
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <PopoverPrimitive.Popup
          {...props}
          className={(state) => getPopupStyles(state).className}
          style={(state) => getPopupStyles(state).style}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export function PopoverHeader({ ...props }: Omit<ComponentProps<"div">, "className" | "style">) {
  return <div {...props} {...stylex.props(styles.header)} />;
}
export function PopoverTitle({
  children,
  ...props
}: Omit<ComponentProps<"h2">, "className" | "style">) {
  return (
    <h2 {...props} {...stylex.props(styles.title)}>
      {children}
    </h2>
  );
}
export function PopoverDescription({ ...props }: Omit<ComponentProps<"p">, "className" | "style">) {
  return <p {...props} {...stylex.props(styles.description)} />;
}
