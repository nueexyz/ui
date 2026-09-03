import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import { colorVars, motionVars, radiusVars } from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: { overflow: "hidden", position: "relative" },
  viewport: { height: "100%", width: "100%" },
  content: { minWidth: "100%" },
  scrollbar: {
    display: "flex",
    padding: 2,
    touchAction: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color",
    userSelect: "none",
    ":hover": { backgroundColor: colorVars.interactionHover },
  },
  vertical: { height: "100%", width: 10 },
  horizontal: { flexDirection: "column", height: 10, width: "100%" },
  thumb: {
    backgroundColor: colorVars.strokeStrong,
    borderRadius: radiusVars.full,
    flex: 1,
    minHeight: 20,
    minWidth: 20,
  },
  corner: { backgroundColor: "transparent" },
});

export type ScrollAreaProps = ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  children: ReactNode;
  scrollbars?: "both" | "horizontal" | "vertical";
  xstyle?: stylex.StyleXStyles;
};

export function ScrollArea({
  children,
  scrollbars = "vertical",
  xstyle,
  ...props
}: ScrollAreaProps) {
  const root = stylex.props(styles.root, xstyle);
  return (
    <ScrollAreaPrimitive.Root {...props} className={() => root.className} style={() => root.style}>
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
  orientation = "vertical",
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  const resolved = stylex.props(styles.scrollbar, styles[orientation]);
  return (
    <ScrollAreaPrimitive.Scrollbar
      {...props}
      className={() => resolved.className}
      orientation={orientation}
      style={() => resolved.style}
    >
      <ScrollAreaPrimitive.Thumb {...stylex.props(styles.thumb)} />
    </ScrollAreaPrimitive.Scrollbar>
  );
}
