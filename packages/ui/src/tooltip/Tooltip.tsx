import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./tooltip.stylex";

export const Tooltip = TooltipPrimitive.Root;
export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipTrigger = TooltipPrimitive.Trigger;

type TooltipContentProps = ComponentProps<typeof TooltipPrimitive.Popup> &
  Pick<ComponentProps<typeof TooltipPrimitive.Positioner>, "align" | "side" | "sideOffset"> & {
    xstyle?: stylex.StyleXStyles;
  };

export function TooltipContent({
  align = "center",
  className,
  side = "top",
  sideOffset = 6,
  style,
  xstyle,
  ...props
}: TooltipContentProps) {
  const stylexProps = stylex.props(styles.popup, xstyle);
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <TooltipPrimitive.Popup
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
        >
          {props.children}
          <TooltipPrimitive.Arrow {...stylex.props(styles.arrow)} />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}
