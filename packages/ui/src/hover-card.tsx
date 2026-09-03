import { PreviewCard } from "@base-ui/react/preview-card";
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
  popup: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    boxShadow: shadowVars.floating,
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    maxWidth: "20rem",
    outline: "none",
    padding: spacingVars.space4,
    transform: "translateY(0) scale(1)",
    transformOrigin: "var(--transform-origin)",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: motionVars.easingEnter,
    zIndex: 60,
    "@media (prefers-reduced-motion: reduce)": { transform: "none", transitionDuration: "0.01ms" },
  },
  transitioning: { opacity: 0, transform: "translateY(0.25rem) scale(0.98)" },
});

export const HoverCard = PreviewCard.Root;
export const HoverCardTrigger = PreviewCard.Trigger;

export type HoverCardContentProps = ComponentProps<typeof PreviewCard.Popup> & {
  align?: ComponentProps<typeof PreviewCard.Positioner>["align"];
  side?: ComponentProps<typeof PreviewCard.Positioner>["side"];
  sideOffset?: number;
  xstyle?: stylex.StyleXStyles;
};

export function HoverCardContent({
  align = "center",
  side = "bottom",
  sideOffset = 6,
  xstyle,
  ...props
}: HoverCardContentProps) {
  return (
    <PreviewCard.Portal>
      <PreviewCard.Positioner align={align} side={side} sideOffset={sideOffset}>
        <PreviewCard.Popup
          {...props}
          className={(state) =>
            stylex.props(
              styles.popup,
              xstyle,
              state.transitionStatus === "starting" && styles.transitioning,
              state.transitionStatus === "ending" && styles.transitioning,
            ).className
          }
          style={(state) =>
            stylex.props(
              styles.popup,
              xstyle,
              state.transitionStatus === "starting" && styles.transitioning,
              state.transitionStatus === "ending" && styles.transitioning,
            ).style
          }
        />
      </PreviewCard.Positioner>
    </PreviewCard.Portal>
  );
}
