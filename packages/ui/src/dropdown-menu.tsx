"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import {
  colorVars,
  layerVars,
  motionVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import { CaretRightIcon, CheckIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

const styles = stylex.create({
  positioner: { zIndex: layerVars.popup },
  popup: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    boxShadow: shadowVars.floating,
    color: colorVars.fgPrimary,
    minWidth: "12rem",
    outline: "none",
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
  item: {
    alignItems: "center",
    borderRadius: radiusVars.sm,
    color: colorVars.fgPrimary,
    cursor: "default",
    display: "flex",
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    gap: spacingVars.space2,
    minHeight: sizeVars.controlSm,
    outline: "none",
    paddingInline: spacingVars.space2,
    position: "relative",
    userSelect: "none",
    ":disabled": { cursor: "not-allowed" },
  },
  itemHighlighted: { backgroundColor: colorVars.interactionHover },
  itemDisabled: {
    backgroundColor: "transparent",
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
  },
  inset: { paddingInlineStart: spacingVars.space8 },
  destructive: { color: colorVars.fgFeedbackError },
  choiceItem: { paddingInlineStart: spacingVars.space8 },
  indicator: {
    alignItems: "center",
    display: "inline-flex",
    insetInlineStart: spacingVars.space2,
    justifyContent: "center",
    position: "absolute",
  },
  radioDot: {
    backgroundColor: "currentColor",
    borderRadius: radiusVars.full,
    height: spacingVars.space2,
    width: spacingVars.space2,
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
  },
  shortcut: {
    color: colorVars.fgTertiary,
    fontSize: typographyVars.fontSizeXs,
    marginInlineStart: "auto",
  },
  subIcon: { marginInlineStart: "auto" },
});

export const DropdownMenu = MenuPrimitive.Root;
export const DropdownMenuTrigger = MenuPrimitive.Trigger;
export const DropdownMenuGroup = MenuPrimitive.Group;
export const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup;
export const DropdownMenuSub = MenuPrimitive.SubmenuRoot;

type DropdownMenuContentProps = Omit<
  ComponentProps<typeof MenuPrimitive.Popup>,
  "className" | "style"
> &
  Pick<
    ComponentProps<typeof MenuPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  >;

export function DropdownMenuContent({
  align = "start",
  alignOffset,
  side = "bottom",
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) {
  function getPopupStyles(state: MenuPrimitive.Popup.State) {
    return stylex.props(
      styles.popup,
      state.transitionStatus === "starting" && styles.popupTransitioning,
      state.transitionStatus === "ending" && styles.popupTransitioning,
      state.transitionStatus === "ending" && styles.popupEnding,
    );
  }
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <MenuPrimitive.Popup
          {...props}
          className={(state) => getPopupStyles(state).className}
          style={(state) => getPopupStyles(state).style}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

type DropdownMenuItemProps = Omit<
  ComponentProps<typeof MenuPrimitive.Item>,
  "className" | "style"
> & {
  destructive?: boolean;
  inset?: boolean;
};

export function DropdownMenuItem({
  destructive = false,
  inset = false,
  ...props
}: DropdownMenuItemProps) {
  function getItemStyles(state: MenuPrimitive.Item.State) {
    return stylex.props(
      styles.item,
      state.highlighted && styles.itemHighlighted,
      state.disabled && styles.itemDisabled,
      inset && styles.inset,
      destructive && styles.destructive,
    );
  }
  return (
    <MenuPrimitive.Item
      {...props}
      className={(state) => getItemStyles(state).className}
      style={(state) => getItemStyles(state).style}
    />
  );
}

export function DropdownMenuCheckboxItem({
  children,
  ...props
}: Omit<ComponentProps<typeof MenuPrimitive.CheckboxItem>, "className" | "style">) {
  function getCheckboxItemStyles(state: MenuPrimitive.CheckboxItem.State) {
    return stylex.props(
      styles.item,
      styles.choiceItem,
      state.highlighted && styles.itemHighlighted,
      state.disabled && styles.itemDisabled,
    );
  }
  return (
    <MenuPrimitive.CheckboxItem
      {...props}
      className={(state) => getCheckboxItemStyles(state).className}
      style={(state) => getCheckboxItemStyles(state).style}
    >
      <MenuPrimitive.CheckboxItemIndicator {...stylex.props(styles.indicator)}>
        <CheckIcon aria-hidden="true" />
      </MenuPrimitive.CheckboxItemIndicator>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

export function DropdownMenuRadioItem({
  children,
  ...props
}: Omit<ComponentProps<typeof MenuPrimitive.RadioItem>, "className" | "style">) {
  function getRadioItemStyles(state: MenuPrimitive.RadioItem.State) {
    return stylex.props(
      styles.item,
      styles.choiceItem,
      state.highlighted && styles.itemHighlighted,
      state.disabled && styles.itemDisabled,
    );
  }
  return (
    <MenuPrimitive.RadioItem
      {...props}
      className={(state) => getRadioItemStyles(state).className}
      style={(state) => getRadioItemStyles(state).style}
    >
      <MenuPrimitive.RadioItemIndicator {...stylex.props(styles.indicator)}>
        <span {...stylex.props(styles.radioDot)} />
      </MenuPrimitive.RadioItemIndicator>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

export function DropdownMenuLabel({
  inset = false,
  ...props
}: Omit<ComponentProps<typeof MenuPrimitive.GroupLabel>, "className" | "style"> & {
  inset?: boolean;
}) {
  const sx = stylex.props(styles.label, inset && styles.inset);
  return <MenuPrimitive.GroupLabel {...props} className={sx.className} style={sx.style} />;
}

export function DropdownMenuSeparator(
  props: Omit<ComponentProps<typeof MenuPrimitive.Separator>, "className" | "style">,
) {
  return <MenuPrimitive.Separator {...props} {...stylex.props(styles.separator)} />;
}

export function DropdownMenuShortcut({
  children,
  ...props
}: Omit<ComponentProps<"span">, "className" | "style"> & { children: ReactNode }) {
  return (
    <span {...props} {...stylex.props(styles.shortcut)}>
      {children}
    </span>
  );
}

export function DropdownMenuSubTrigger({
  children,
  inset = false,
  ...props
}: Omit<ComponentProps<typeof MenuPrimitive.SubmenuTrigger>, "className" | "style"> & {
  inset?: boolean;
}) {
  function getSubmenuTriggerStyles(state: MenuPrimitive.SubmenuTrigger.State) {
    return stylex.props(
      styles.item,
      state.highlighted && styles.itemHighlighted,
      state.disabled && styles.itemDisabled,
      inset && styles.inset,
    );
  }
  return (
    <MenuPrimitive.SubmenuTrigger
      {...props}
      className={(state) => getSubmenuTriggerStyles(state).className}
      style={(state) => getSubmenuTriggerStyles(state).style}
    >
      {children}
      <CaretRightIcon aria-hidden="true" {...stylex.props(styles.subIcon)} />
    </MenuPrimitive.SubmenuTrigger>
  );
}

export const DropdownMenuSubContent = DropdownMenuContent;
