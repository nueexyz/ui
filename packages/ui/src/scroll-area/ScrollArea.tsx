import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import { styles } from "./scroll-area.stylex";

export type ScrollAreaProps = ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  children: ReactNode;
  scrollbars?: "both" | "horizontal" | "vertical";
  xstyle?: stylex.StyleXStyles;
};

export function ScrollArea({
  children,
  className,
  scrollbars = "vertical",
  style,
  xstyle,
  ...props
}: ScrollAreaProps) {
  const root = stylex.props(styles.root, xstyle);
  return (
    <ScrollAreaPrimitive.Root
      {...props}
      className={(state) =>
        [root.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ")
      }
      style={(state) => ({
        ...root.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    >
      <ScrollAreaPrimitive.Viewport {...stylex.props(styles.viewport)}>
        <ScrollAreaPrimitive.Content {...stylex.props(styles.content)}>
          {children}
        </ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>
      {scrollbars === "vertical" || scrollbars === "both" ? (
        <ScrollBar orientation="vertical" />
      ) : null}
      {scrollbars === "horizontal" || scrollbars === "both" ? (
        <ScrollBar orientation="horizontal" />
      ) : null}
      <ScrollAreaPrimitive.Corner {...stylex.props(styles.corner)} />
    </ScrollAreaPrimitive.Root>
  );
}

export function ScrollBar({
  className,
  orientation = "vertical",
  style,
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  const resolved = stylex.props(styles.scrollbar, styles[orientation]);
  return (
    <ScrollAreaPrimitive.Scrollbar
      {...props}
      className={(state) =>
        [resolved.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ")
      }
      orientation={orientation}
      style={(state) => ({
        ...resolved.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    >
      <ScrollAreaPrimitive.Thumb {...stylex.props(styles.thumb)} />
    </ScrollAreaPrimitive.Scrollbar>
  );
}
