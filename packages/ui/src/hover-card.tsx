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
} from "@nooeh/tokens/semantic.stylex";

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
  className,
  side = "bottom",
  sideOffset = 6,
  style,
  xstyle,
  ...props
}: HoverCardContentProps) {
  const base = stylex.props(styles.popup, xstyle);
  return (
    <PreviewCard.Portal>
      <PreviewCard.Positioner align={align} side={side} sideOffset={sideOffset}>
        <PreviewCard.Popup
          {...props}
          className={(state) => {
            const motion = stylex.props(
              state.transitionStatus === "starting" && styles.transitioning,
              state.transitionStatus === "ending" && styles.transitioning,
            );
            const custom = typeof className === "function" ? className(state) : className;
            return [base.className, motion.className, custom].filter(Boolean).join(" ");
          }}
          style={(state) => {
            const motion = stylex.props(
              state.transitionStatus === "starting" && styles.transitioning,
              state.transitionStatus === "ending" && styles.transitioning,
            );
            return {
              ...base.style,
              ...motion.style,
              ...(typeof style === "function" ? style(state) : style),
            };
          }}
        />
      </PreviewCard.Positioner>
    </PreviewCard.Portal>
  );
}
