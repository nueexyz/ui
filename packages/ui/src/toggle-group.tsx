import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import * as stylex from "@stylexjs/stylex";
import { createContext, useContext, type ComponentProps, type ReactNode } from "react";

import type { ToggleSize, ToggleVariant } from "./toggle";
import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nooeh/tokens/tokens.stylex";

const styles = stylex.create({
  root: { alignItems: "center", display: "inline-flex", width: "fit-content" },
  default: { gap: spacingVars.space1 },
  outline: {
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    gap: 0,
    overflow: "hidden",
  },
  outlineItem: {
    borderColor: "transparent",
    borderRadius: 0,
    marginInlineStart: -1,
  },
  item: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    cursor: "pointer",
    display: "inline-flex",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    gap: spacingVars.space1,
    justifyContent: "center",
    outline: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color, color, opacity",
    ":hover": { backgroundColor: colorVars.interactionHover },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": { cursor: "not-allowed" },
  },
  itemSm: {
    height: sizeVars.controlSm,
    minWidth: sizeVars.controlSm,
    paddingInline: spacingVars.space2,
  },
  itemMd: {
    height: sizeVars.controlMd,
    minWidth: sizeVars.controlMd,
    paddingInline: spacingVars.space3,
  },
  itemLg: {
    height: sizeVars.controlLg,
    minWidth: sizeVars.controlLg,
    paddingInline: spacingVars.space4,
  },
  itemDefault: { backgroundColor: "transparent" },
  itemOutline: { backgroundColor: colorVars.bgSurface, borderColor: colorVars.strokeDefault },
  itemPressed: { backgroundColor: colorVars.bgSurfacePressed, color: colorVars.fgPrimary },
  itemDisabled: {
    backgroundColor: colorVars.interactionDisabled,
    borderColor: colorVars.strokeDefault,
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
    ":hover": { backgroundColor: colorVars.interactionDisabled },
  },
});

const itemSizeStyles = { lg: styles.itemLg, md: styles.itemMd, sm: styles.itemSm };
const itemVariantStyles = { default: styles.itemDefault, outline: styles.itemOutline };

type ToggleGroupContextValue = { size: ToggleSize; variant: ToggleVariant };
const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  size: "md",
  variant: "default",
});

export type ToggleGroupProps = ComponentProps<typeof ToggleGroupPrimitive> & {
  children: ReactNode;
  size?: ToggleSize;
  variant?: ToggleVariant;
  xstyle?: stylex.StyleXStyles;
};

export function ToggleGroup({
  children,
  className,
  size = "md",
  style,
  variant = "default",
  xstyle,
  ...props
}: ToggleGroupProps) {
  const stylexProps = stylex.props(styles.root, styles[variant], xstyle);
  return (
    <ToggleGroupPrimitive
      {...props}
      className={(state) => {
        const customClassName = typeof className === "function" ? className(state) : className;
        return [stylexProps.className, customClassName].filter(Boolean).join(" ");
      }}
      style={(state) => ({
        ...stylexProps.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    >
      <ToggleGroupContext value={{ size, variant }}>{children}</ToggleGroupContext>
    </ToggleGroupPrimitive>
  );
}

export type ToggleGroupItemProps = ComponentProps<typeof TogglePrimitive> & {
  size?: ToggleSize;
  variant?: ToggleVariant;
  xstyle?: stylex.StyleXStyles;
};

export function ToggleGroupItem({
  className,
  size,
  style,
  variant,
  xstyle,
  ...props
}: ToggleGroupItemProps) {
  const context = useContext(ToggleGroupContext);
  const finalSize = size ?? context.size;
  const finalVariant = variant ?? context.variant;
  return (
    <TogglePrimitive
      {...props}
      className={(state) => {
        const stylexProps = stylex.props(
          styles.item,
          itemSizeStyles[finalSize],
          itemVariantStyles[finalVariant],
          state.pressed && styles.itemPressed,
          state.disabled && styles.itemDisabled,
          finalVariant === "outline" && styles.outlineItem,
          xstyle,
        );
        const customClassName = typeof className === "function" ? className(state) : className;
        return [stylexProps.className, customClassName].filter(Boolean).join(" ");
      }}
      style={(state) => {
        const stylexProps = stylex.props(
          styles.item,
          itemSizeStyles[finalSize],
          itemVariantStyles[finalVariant],
          state.pressed && styles.itemPressed,
          state.disabled && styles.itemDisabled,
          xstyle,
        );
        return { ...stylexProps.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    />
  );
}
