import { Select as SelectPrimitive } from "@base-ui/react/select";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import { Icon } from "../Icon";
import { styles } from "./select.stylex";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;
export const SelectGroup = SelectPrimitive.Group;

export function SelectTrigger({
  children,
  className,
  style,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
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
      <SelectPrimitive.Icon {...stylex.props(styles.triggerIcon)}>
        <Icon aria-hidden="true" name="chevronDown" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

type SelectContentProps = ComponentProps<typeof SelectPrimitive.Popup> &
  Pick<
    ComponentProps<typeof SelectPrimitive.Positioner>,
    "align" | "alignItemWithTrigger" | "side" | "sideOffset"
  > & { children: ReactNode };

export function SelectContent({
  align = "start",
  alignItemWithTrigger = false,
  children,
  className,
  side = "bottom",
  sideOffset = 4,
  style,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        align={align}
        alignItemWithTrigger={alignItemWithTrigger}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <SelectPrimitive.Popup
          {...props}
          className={(state) => {
            const sx = stylex.props(
              styles.popup,
              state.transitionStatus === "starting" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupEnding,
            );
            return [sx.className, typeof className === "function" ? className(state) : className]
              .filter(Boolean)
              .join(" ");
          }}
          style={(state) => {
            const sx = stylex.props(
              styles.popup,
              state.transitionStatus === "starting" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupTransitioning,
              state.transitionStatus === "ending" && styles.popupEnding,
            );
            return { ...sx.style, ...(typeof style === "function" ? style(state) : style) };
          }}
        >
          <SelectPrimitive.List {...stylex.props(styles.list)}>{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  children,
  className,
  style,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      {...props}
      className={(state) => {
        const sx = stylex.props(
          styles.item,
          state.highlighted && styles.itemHighlighted,
          state.disabled && styles.itemDisabled,
        );
        return [sx.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ");
      }}
      style={(state) => {
        const sx = stylex.props(
          styles.item,
          state.highlighted && styles.itemHighlighted,
          state.disabled && styles.itemDisabled,
        );
        return { ...sx.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    >
      <SelectPrimitive.ItemIndicator {...stylex.props(styles.indicator)}>
        <Icon aria-hidden="true" name="check" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectLabel(props: ComponentProps<typeof SelectPrimitive.GroupLabel>) {
  return <SelectPrimitive.GroupLabel {...props} {...stylex.props(styles.label)} />;
}

export function SelectSeparator(props: ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator {...props} {...stylex.props(styles.separator)} />;
}
