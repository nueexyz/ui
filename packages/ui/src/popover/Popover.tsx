import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./popover.stylex";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;

type PopoverContentProps = ComponentProps<typeof PopoverPrimitive.Popup> &
  Pick<ComponentProps<typeof PopoverPrimitive.Positioner>, "align" | "side" | "sideOffset"> & {
    xstyle?: stylex.StyleXStyles;
  };

export function PopoverContent({
  align = "center",
  className,
  side = "bottom",
  sideOffset = 6,
  style,
  xstyle,
  ...props
}: PopoverContentProps) {
  const stylexProps = stylex.props(styles.popup, xstyle);
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
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function getStyleProps(
  baseStyle: stylex.StyleXStyles,
  className: string | undefined,
  style: ComponentProps<"div">["style"],
) {
  const stylexProps = stylex.props(baseStyle);
  return {
    className: [stylexProps.className, className].filter(Boolean).join(" "),
    style: { ...stylexProps.style, ...style },
  };
}

export function PopoverHeader({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...getStyleProps(styles.header, className, style)} />;
}
export function PopoverTitle({ children, className, style, ...props }: ComponentProps<"h2">) {
  return (
    <h2 {...props} {...getStyleProps(styles.title, className, style)}>
      {children}
    </h2>
  );
}
export function PopoverDescription({ className, style, ...props }: ComponentProps<"p">) {
  return <p {...props} {...getStyleProps(styles.description, className, style)} />;
}
