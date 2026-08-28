import { PreviewCard } from "@base-ui/react/preview-card";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./hover-card.stylex";

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
