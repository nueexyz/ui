import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import { Icon } from "./Icon";
import {
  colorVars,
  motionVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nooeh/tokens/tokens.stylex";

const styles = stylex.create({
  positioner: { zIndex: 60 },
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
      transitionDuration: "0.01ms",
    },
  },
  popupTransitioning: { opacity: 0, transform: "scale(0.98)" },
  popupEnding: {
    transitionDuration: motionVars.durationFast,
    transitionTimingFunction: motionVars.easingExit,
  },
  item: {
    alignItems: "center",
    borderRadius: radiusVars.sm,
    color: colorVars.fgPrimary,
    cursor: "default",
    display: "flex",
    fontFamily: typographyVars.fontFamily,
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

type DropdownMenuContentProps = ComponentProps<typeof MenuPrimitive.Popup> &
  Pick<
    ComponentProps<typeof MenuPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  >;

export function DropdownMenuContent({
  align = "start",
  alignOffset,
  className,
  side = "bottom",
  sideOffset = 4,
  style,
  ...props
}: DropdownMenuContentProps) {
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
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

type DropdownMenuItemProps = ComponentProps<typeof MenuPrimitive.Item> & {
  destructive?: boolean;
  inset?: boolean;
};

export function DropdownMenuItem({
  className,
  destructive = false,
  inset = false,
  style,
  ...props
}: DropdownMenuItemProps) {
  return (
    <MenuPrimitive.Item
      {...props}
      className={(state) => {
        const sx = stylex.props(
          styles.item,
          state.highlighted && styles.itemHighlighted,
          state.disabled && styles.itemDisabled,
          inset && styles.inset,
          destructive && styles.destructive,
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
          inset && styles.inset,
          destructive && styles.destructive,
        );
        return { ...sx.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    />
  );
}

export function DropdownMenuCheckboxItem({
  children,
  className,
  style,
  ...props
}: ComponentProps<typeof MenuPrimitive.CheckboxItem>) {
  return (
    <MenuPrimitive.CheckboxItem
      {...props}
      className={(state) => {
        const sx = stylex.props(
          styles.item,
          styles.choiceItem,
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
          styles.choiceItem,
          state.highlighted && styles.itemHighlighted,
          state.disabled && styles.itemDisabled,
        );
        return { ...sx.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    >
      <MenuPrimitive.CheckboxItemIndicator {...stylex.props(styles.indicator)}>
        <Icon aria-hidden="true" name="check" />
      </MenuPrimitive.CheckboxItemIndicator>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

export function DropdownMenuRadioItem({
  children,
  className,
  style,
  ...props
}: ComponentProps<typeof MenuPrimitive.RadioItem>) {
  return (
    <MenuPrimitive.RadioItem
      {...props}
      className={(state) => {
        const sx = stylex.props(
          styles.item,
          styles.choiceItem,
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
          styles.choiceItem,
          state.highlighted && styles.itemHighlighted,
          state.disabled && styles.itemDisabled,
        );
        return { ...sx.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    >
      <MenuPrimitive.RadioItemIndicator {...stylex.props(styles.indicator)}>
        <span {...stylex.props(styles.radioDot)} />
      </MenuPrimitive.RadioItemIndicator>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

export function DropdownMenuLabel({
  className,
  inset = false,
  style,
  ...props
}: ComponentProps<typeof MenuPrimitive.GroupLabel> & { inset?: boolean }) {
  const sx = stylex.props(styles.label, inset && styles.inset);
  return (
    <MenuPrimitive.GroupLabel
      {...props}
      className={[sx.className, typeof className === "string" ? className : undefined]
        .filter(Boolean)
        .join(" ")}
      style={{ ...sx.style, ...(typeof style === "function" ? undefined : style) }}
    />
  );
}

export function DropdownMenuSeparator(props: ComponentProps<typeof MenuPrimitive.Separator>) {
  return <MenuPrimitive.Separator {...props} {...stylex.props(styles.separator)} />;
}

export function DropdownMenuShortcut({
  children,
  ...props
}: ComponentProps<"span"> & { children: ReactNode }) {
  return (
    <span {...props} {...stylex.props(styles.shortcut)}>
      {children}
    </span>
  );
}

export function DropdownMenuSubTrigger({
  children,
  className,
  inset = false,
  style,
  ...props
}: ComponentProps<typeof MenuPrimitive.SubmenuTrigger> & { inset?: boolean }) {
  return (
    <MenuPrimitive.SubmenuTrigger
      {...props}
      className={(state) => {
        const sx = stylex.props(
          styles.item,
          state.highlighted && styles.itemHighlighted,
          state.disabled && styles.itemDisabled,
          inset && styles.inset,
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
          inset && styles.inset,
        );
        return { ...sx.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    >
      {children}
      <Icon aria-hidden="true" name="chevronRight" {...stylex.props(styles.subIcon)} />
    </MenuPrimitive.SubmenuTrigger>
  );
}

export const DropdownMenuSubContent = DropdownMenuContent;
