import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Icon } from "../Icon";
import { styles } from "./collapsible.stylex";

export function Collapsible({
  className,
  style,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Root>) {
  const stylexProps = stylex.props(styles.root);
  return (
    <CollapsiblePrimitive.Root
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
  );
}

export function CollapsibleTrigger({
  children,
  className,
  style,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return (
    <CollapsiblePrimitive.Trigger
      {...props}
      className={(state) => {
        const sx = stylex.props(styles.trigger, state.disabled && styles.triggerDisabled);
        return [sx.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ");
      }}
      style={(state) => {
        const sx = stylex.props(styles.trigger, state.disabled && styles.triggerDisabled);
        return { ...sx.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    >
      {children}
      <span aria-hidden="true" {...stylex.props(styles.icon)}>
        <Icon name="caretUpDown" />
      </span>
    </CollapsiblePrimitive.Trigger>
  );
}

export function CollapsibleContent({
  children,
  className,
  style,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Panel>) {
  return (
    <CollapsiblePrimitive.Panel
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
    >
      <div {...stylex.props(styles.panelContent)}>{children}</div>
    </CollapsiblePrimitive.Panel>
  );
}
