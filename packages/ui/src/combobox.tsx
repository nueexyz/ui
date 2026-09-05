"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
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
import { CaretDownIcon, CheckIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

const styles = stylex.create({
  inputGroup: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "flex",
    height: sizeVars.controlMd,
    paddingInlineStart: spacingVars.space3,
    transitionDuration: motionVars.durationFast,
    transitionProperty: "border-color",
    transitionTimingFunction: motionVars.easingStandard,
    width: "14rem",
    ":focus-within": {
      borderColor: colorVars.strokeFocus,
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  searchIcon: { color: colorVars.fgSecondary, flexShrink: 0 },
  input: {
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderWidth: 0,
    boxShadow: "none",
    color: colorVars.fgPrimary,
    flex: 1,
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    height: "100%",
    minWidth: 0,
    outline: "none",
    paddingInline: spacingVars.space2,
    "::placeholder": { color: colorVars.fgTertiary },
  },
  inputDisabled: { color: colorVars.fgDisabled, cursor: "not-allowed" },
  trigger: {
    alignItems: "center",
    alignSelf: "stretch",
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderWidth: 0,
    boxShadow: "none",
    color: colorVars.fgSecondary,
    cursor: "pointer",
    display: "inline-flex",
    justifyContent: "center",
    outline: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "color",
    transitionTimingFunction: motionVars.easingStandard,
    width: sizeVars.controlMd,
  },
  triggerDisabled: {
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
    ":hover": { backgroundColor: "transparent" },
  },
  positioner: { zIndex: layerVars.popup },
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
  list: { overflowY: "auto", overscrollBehavior: "contain" },
  item: {
    alignItems: "center",
    borderRadius: radiusVars.sm,
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
  empty: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    padding: spacingVars.space4,
    textAlign: "center",
    ":empty": { padding: 0 },
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

export const Combobox = ComboboxPrimitive.Root;
export const ComboboxCollection = ComboboxPrimitive.Collection;
export const ComboboxGroup = ComboboxPrimitive.Group;

export function ComboboxInput({
  ...props
}: Omit<ComponentProps<typeof ComboboxPrimitive.Input>, "className" | "style">) {
  function getInputStyles(state: ComboboxPrimitive.Input.State) {
    return stylex.props(styles.input, state.disabled && styles.inputDisabled);
  }
  return (
    <ComboboxPrimitive.InputGroup {...stylex.props(styles.inputGroup)}>
      <MagnifyingGlassIcon aria-hidden="true" {...stylex.props(styles.searchIcon)} />
      <ComboboxPrimitive.Input
        {...props}
        className={(state) => getInputStyles(state).className}
        style={(state) => getInputStyles(state).style}
      />
      <ComboboxPrimitive.Trigger
        aria-label="Open options"
        className={(state) =>
          stylex.props(styles.trigger, state.disabled && styles.triggerDisabled).className ?? ""
        }
        style={(state) =>
          stylex.props(styles.trigger, state.disabled && styles.triggerDisabled).style
        }
      >
        <CaretDownIcon aria-hidden="true" />
      </ComboboxPrimitive.Trigger>
    </ComboboxPrimitive.InputGroup>
  );
}

type ComboboxContentProps = Omit<
  ComponentProps<typeof ComboboxPrimitive.Popup>,
  "className" | "style"
> &
  Pick<ComponentProps<typeof ComboboxPrimitive.Positioner>, "align" | "side" | "sideOffset"> & {
    children: ReactNode;
  };

export function ComboboxContent({
  align = "start",
  children,
  side = "bottom",
  sideOffset = 4,
  ...props
}: ComboboxContentProps) {
  function getPopupStyles(state: ComboboxPrimitive.Popup.State) {
    return stylex.props(
      styles.popup,
      state.transitionStatus === "starting" && styles.popupTransitioning,
      state.transitionStatus === "ending" && styles.popupTransitioning,
      state.transitionStatus === "ending" && styles.popupEnding,
    );
  }
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
          className={(state) => getPopupStyles(state).className}
          style={(state) => getPopupStyles(state).style}
        >
          <ComboboxPrimitive.List {...stylex.props(styles.list)}>{children}</ComboboxPrimitive.List>
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

export function ComboboxItem({
  children,
  ...props
}: Omit<ComponentProps<typeof ComboboxPrimitive.Item>, "className" | "style">) {
  function getItemStyles(state: ComboboxPrimitive.Item.State) {
    return stylex.props(
      styles.item,
      state.highlighted && styles.itemHighlighted,
      state.disabled && styles.itemDisabled,
    );
  }
  return (
    <ComboboxPrimitive.Item
      {...props}
      className={(state) => getItemStyles(state).className}
      style={(state) => getItemStyles(state).style}
    >
      <ComboboxPrimitive.ItemIndicator {...stylex.props(styles.indicator)}>
        <CheckIcon aria-hidden="true" />
      </ComboboxPrimitive.ItemIndicator>
      {children}
    </ComboboxPrimitive.Item>
  );
}

export function ComboboxEmpty(
  props: Omit<ComponentProps<typeof ComboboxPrimitive.Empty>, "className" | "style">,
) {
  return <ComboboxPrimitive.Empty {...props} {...stylex.props(styles.empty)} />;
}

export function ComboboxLabel(
  props: Omit<ComponentProps<typeof ComboboxPrimitive.GroupLabel>, "className" | "style">,
) {
  return <ComboboxPrimitive.GroupLabel {...props} {...stylex.props(styles.label)} />;
}

export function ComboboxSeparator(
  props: Omit<ComponentProps<typeof ComboboxPrimitive.Separator>, "className" | "style">,
) {
  return <ComboboxPrimitive.Separator {...props} {...stylex.props(styles.separator)} />;
}
