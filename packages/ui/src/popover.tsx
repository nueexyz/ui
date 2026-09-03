import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import * as stylex from "@stylexjs/stylex";
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
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  positioner: { zIndex: 60 },
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
    width: "18rem",
    "@media (prefers-reduced-motion: reduce)": {
      transform: "none",
      transitionDuration: "0.01ms",
    },
  },
  popupTransitioning: { opacity: 0, transform: "scale(0.98)" },
  popupEnding: {
    transitionDuration: motionVars.durationFast,
    transitionTimingFunction: motionVars.easingExit,
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

type PopoverContentProps = ComponentProps<typeof PopoverPrimitive.Popup> &
  Pick<ComponentProps<typeof PopoverPrimitive.Positioner>, "align" | "side" | "sideOffset"> & {
    xstyle?: stylex.StyleXStyles;
  };

export function PopoverContent({
  align = "start",
  className,
  side = "bottom",
  sideOffset = 6,
  style,
  xstyle,
  ...props
}: PopoverContentProps) {
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
          className={(state) => {
            const stylexProps = stylex.props(
              styles.popup,
              state.transitionStatus === "starting" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupEnding,
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
              styles.popup,
              state.transitionStatus === "starting" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupEnding,
              xstyle,
            );
            return {
              ...stylexProps.style,
              ...(typeof style === "function" ? style(state) : style),
            };
          }}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export function PopoverHeader({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...getNativeStyleProps(stylex.props(styles.header), className, style)} />;
}
export function PopoverTitle({ children, className, style, ...props }: ComponentProps<"h2">) {
  return (
    <h2 {...props} {...getNativeStyleProps(stylex.props(styles.title), className, style)}>
      {children}
    </h2>
  );
}
export function PopoverDescription({ className, style, ...props }: ComponentProps<"p">) {
  return (
    <p {...props} {...getNativeStyleProps(stylex.props(styles.description), className, style)} />
  );
}
