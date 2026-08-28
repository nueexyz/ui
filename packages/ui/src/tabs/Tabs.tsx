import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import * as stylex from "@stylexjs/stylex";
import { createContext, type ComponentProps, useContext } from "react";

import { styles } from "./tabs.stylex";

export type TabsVariant = "segmented" | "underline";
export type TabsProps = ComponentProps<typeof TabsPrimitive.Root> & {
  variant?: TabsVariant;
};

const TabsVariantContext = createContext<TabsVariant>("segmented");

export function Tabs({ className, style, variant = "segmented", ...props }: TabsProps) {
  const stylexProps = stylex.props(styles.root);

  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root
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
    </TabsVariantContext.Provider>
  );
}

export function TabsList({
  children,
  className,
  style,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) {
  const variant = useContext(TabsVariantContext);

  return (
    <TabsPrimitive.List
      {...props}
      className={(state) => {
        const sx = stylex.props(styles.list, styles[`${variant}List`]);
        return [sx.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ");
      }}
      style={(state) => {
        const sx = stylex.props(styles.list, styles[`${variant}List`]);
        return { ...sx.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    >
      {children}
      <TabsPrimitive.Indicator {...stylex.props(styles.indicator, styles[`${variant}Indicator`])} />
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({
  className,
  style,
  ...props
}: ComponentProps<typeof TabsPrimitive.Tab>) {
  const variant = useContext(TabsVariantContext);

  return (
    <TabsPrimitive.Tab
      {...props}
      className={(state) => {
        const sx = stylex.props(
          styles.trigger,
          styles[`${variant}Trigger`],
          state.active && styles.triggerActive,
          state.disabled && styles.triggerDisabled,
        );
        return [sx.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ");
      }}
      style={(state) => {
        const sx = stylex.props(
          styles.trigger,
          styles[`${variant}Trigger`],
          state.active && styles.triggerActive,
          state.disabled && styles.triggerDisabled,
        );
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
  return (
    <TabsPrimitive.Panel
      {...props}
      className={(state) => {
        const sx = stylex.props(
          styles.panel,
          state.transitionStatus === "starting" && styles.panelTransitioning,
          state.transitionStatus === "ending" && styles.panelTransitioning,
        );
        return [sx.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ");
      }}
      style={(state) => {
        const sx = stylex.props(
          styles.panel,
          state.transitionStatus === "starting" && styles.panelTransitioning,
          state.transitionStatus === "ending" && styles.panelTransitioning,
        );
        return { ...sx.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    />
  );
}
