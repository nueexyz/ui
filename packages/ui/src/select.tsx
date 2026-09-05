"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import {
  colorVars,
  motionVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  trigger: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    gap: spacingVars.space2,
    height: sizeVars.controlMd,
    justifyContent: "space-between",
    width: "11rem",
    outline: "none",
    paddingInline: spacingVars.space3,
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color, color",
    transitionTimingFunction: motionVars.easingStandard,
    ":hover": { backgroundColor: colorVars.bgSurfacePressed },
    ":focus-visible": {
      borderColor: colorVars.strokeFocus,
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": { cursor: "not-allowed" },
  },
  triggerDisabled: {
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.strokeDefault,
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
    ":hover": { backgroundColor: colorVars.bgSubtle },
  },
  triggerIcon: {
    alignItems: "center",
    color: colorVars.fgSecondary,
    display: "inline-flex",
    flexShrink: 0,
  },
  positioner: { zIndex: 60 },
  popup: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    boxShadow: shadowVars.floating,
    color: colorVars.fgPrimary,
    maxHeight: "min(20rem, var(--available-height))",
    minWidth: "var(--anchor-width)",
    outline: "none",
    overflow: "hidden",
    padding: spacingVars.space1,
    transform: "scale(1)",
    transformOrigin: "var(--transform-origin)",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: motionVars.easingEnter,
    "@media (prefers-reduced-motion: reduce)": {
      transform: "none",
      transitionDuration: motionVars.durationInstant,
    },
  },
  popupTransitioning: { opacity: 0, transform: "scale(0.98)" },
  popupEnding: {
    transitionDuration: motionVars.durationFast,
    transitionTimingFunction: motionVars.easingExit,
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: motionVars.durationInstant,
    },
  },
  list: { overflowY: "auto", overscrollBehavior: "contain", padding: 0 },
  item: {
    alignItems: "center",
    borderRadius: radiusVars.sm,
    color: colorVars.fgPrimary,
    cursor: "default",
    display: "flex",
    fontSize: typographyVars.fontSizeSm,
    gap: spacingVars.space2,
    minHeight: sizeVars.controlSm,
    outline: "none",
    paddingInlineEnd: spacingVars.space3,
    paddingInlineStart: spacingVars.space8,
    position: "relative",
    userSelect: "none",
  },
  itemHighlighted: { backgroundColor: colorVars.interactionHover },
  itemDisabled: {
    backgroundColor: "transparent",
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
  },
  indicator: {
    alignItems: "center",
    display: "inline-flex",
    insetInlineStart: spacingVars.space2,
    justifyContent: "center",
    position: "absolute",
  },
  label: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    paddingBlock: spacingVars.space2,
    paddingInline: spacingVars.space2,
  },
  separator: {
    backgroundColor: colorVars.strokeDefault,
    height: sizeVars.stroke,
    marginBlock: spacingVars.space1,
    marginInline: `calc(${spacingVars.space1} * -1)`,
  },
});

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;
export const SelectGroup = SelectPrimitive.Group;

export function SelectTrigger({
  children,
  ...props
}: Omit<ComponentProps<typeof SelectPrimitive.Trigger>, "className" | "style">) {
  function getTriggerStyles(state: SelectPrimitive.Trigger.State) {
    return stylex.props(styles.trigger, state.disabled && styles.triggerDisabled);
  }
  return (
    <SelectPrimitive.Trigger
      {...props}
      className={(state) => getTriggerStyles(state).className}
      style={(state) => getTriggerStyles(state).style}
    >
      {children}
      <SelectPrimitive.Icon {...stylex.props(styles.triggerIcon)}>
        <CaretDownIcon aria-hidden="true" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

type SelectContentProps = Omit<
  ComponentProps<typeof SelectPrimitive.Popup>,
  "className" | "style"
> &
  Pick<
    ComponentProps<typeof SelectPrimitive.Positioner>,
    "align" | "alignItemWithTrigger" | "side" | "sideOffset"
  > & { children: ReactNode };

export function SelectContent({
  align = "start",
  alignItemWithTrigger = false,
  children,
  side = "bottom",
  sideOffset = 4,
  ...props
}: SelectContentProps) {
  function getPopupStyles(state: SelectPrimitive.Popup.State) {
    return stylex.props(
      styles.popup,
      state.transitionStatus === "starting" && styles.popupTransitioning,
      state.transitionStatus === "ending" && styles.popupTransitioning,
      state.transitionStatus === "ending" && styles.popupEnding,
    );
  }
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
          className={(state) => getPopupStyles(state).className}
          style={(state) => getPopupStyles(state).style}
        >
          <SelectPrimitive.List {...stylex.props(styles.list)}>{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  children,
  ...props
}: Omit<ComponentProps<typeof SelectPrimitive.Item>, "className" | "style">) {
  function getItemStyles(state: SelectPrimitive.Item.State) {
    return stylex.props(
      styles.item,
      state.highlighted && styles.itemHighlighted,
      state.disabled && styles.itemDisabled,
    );
  }
  return (
    <SelectPrimitive.Item
      {...props}
      className={(state) => getItemStyles(state).className}
      style={(state) => getItemStyles(state).style}
    >
      <SelectPrimitive.ItemIndicator {...stylex.props(styles.indicator)}>
        <CheckIcon aria-hidden="true" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectLabel(
  props: Omit<ComponentProps<typeof SelectPrimitive.GroupLabel>, "className" | "style">,
) {
  return <SelectPrimitive.GroupLabel {...props} {...stylex.props(styles.label)} />;
}

export function SelectSeparator(
  props: Omit<ComponentProps<typeof SelectPrimitive.Separator>, "className" | "style">,
) {
  return <SelectPrimitive.Separator {...props} {...stylex.props(styles.separator)} />;
}
