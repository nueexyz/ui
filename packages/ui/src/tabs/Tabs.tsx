import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./tabs.stylex";

export const Tabs = TabsPrimitive.Root;

export function TabsList(props: ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List {...props} {...stylex.props(styles.list)} />;
}

export function TabsTrigger({
  className,
  style,
  ...props
}: ComponentProps<typeof TabsPrimitive.Tab>) {
  return (
    <TabsPrimitive.Tab
      {...props}
      className={(state) => {
        const sx = stylex.props(styles.trigger, state.active && styles.triggerActive);
        return [sx.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ");
      }}
      style={(state) => {
        const sx = stylex.props(styles.trigger, state.active && styles.triggerActive);
        return { ...sx.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    />
  );
}

export function TabsContent({
  className,
  style,
  ...props
}: ComponentProps<typeof TabsPrimitive.Panel>) {
  const sx = stylex.props(styles.panel);
  return (
    <TabsPrimitive.Panel
      {...props}
      className={(state) =>
        [sx.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ")
      }
      style={(state) => ({ ...sx.style, ...(typeof style === "function" ? style(state) : style) })}
    />
  );
}
