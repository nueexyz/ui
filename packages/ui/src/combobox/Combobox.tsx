import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import { Icon } from "../Icon";
import { styles } from "./combobox.stylex";

export const Combobox = ComboboxPrimitive.Root;
export const ComboboxCollection = ComboboxPrimitive.Collection;
export const ComboboxGroup = ComboboxPrimitive.Group;

export function ComboboxInput({
  className,
  style,
  ...props
}: ComponentProps<typeof ComboboxPrimitive.Input>) {
  return (
    <ComboboxPrimitive.InputGroup {...stylex.props(styles.inputGroup)}>
      <Icon aria-hidden="true" name="search" {...stylex.props(styles.searchIcon)} />
      <ComboboxPrimitive.Input
        {...props}
        className={(state) => {
          const sx = stylex.props(styles.input, state.disabled && styles.inputDisabled);
          return [sx.className, typeof className === "function" ? className(state) : className]
            .filter(Boolean)
            .join(" ");
        }}
        style={(state) => {
          const sx = stylex.props(styles.input, state.disabled && styles.inputDisabled);
          return { ...sx.style, ...(typeof style === "function" ? style(state) : style) };
        }}
      />
      <ComboboxPrimitive.Trigger
        aria-label="옵션 열기"
        className={(state) =>
          stylex.props(styles.trigger, state.disabled && styles.triggerDisabled).className ?? ""
        }
        style={(state) =>
          stylex.props(styles.trigger, state.disabled && styles.triggerDisabled).style
        }
      >
        <Icon aria-hidden="true" name="chevronDown" />
      </ComboboxPrimitive.Trigger>
    </ComboboxPrimitive.InputGroup>
  );
}

type ComboboxContentProps = ComponentProps<typeof ComboboxPrimitive.Popup> &
  Pick<ComponentProps<typeof ComboboxPrimitive.Positioner>, "align" | "side" | "sideOffset"> & {
    children: ReactNode;
  };

export function ComboboxContent({
  align = "start",
  children,
  className,
  side = "bottom",
  sideOffset = 4,
  style,
  ...props
}: ComboboxContentProps) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <ComboboxPrimitive.Popup
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
          <ComboboxPrimitive.List {...stylex.props(styles.list)}>{children}</ComboboxPrimitive.List>
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

export function ComboboxItem({
  children,
  className,
  style,
  ...props
}: ComponentProps<typeof ComboboxPrimitive.Item>) {
  return (
    <ComboboxPrimitive.Item
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
      <ComboboxPrimitive.ItemIndicator {...stylex.props(styles.indicator)}>
        <Icon aria-hidden="true" name="check" />
      </ComboboxPrimitive.ItemIndicator>
      {children}
    </ComboboxPrimitive.Item>
  );
}

export function ComboboxEmpty(props: ComponentProps<typeof ComboboxPrimitive.Empty>) {
  return <ComboboxPrimitive.Empty {...props} {...stylex.props(styles.empty)} />;
}

export function ComboboxLabel(props: ComponentProps<typeof ComboboxPrimitive.GroupLabel>) {
  return <ComboboxPrimitive.GroupLabel {...props} {...stylex.props(styles.label)} />;
}

export function ComboboxSeparator(props: ComponentProps<typeof ComboboxPrimitive.Separator>) {
  return <ComboboxPrimitive.Separator {...props} {...stylex.props(styles.separator)} />;
}
