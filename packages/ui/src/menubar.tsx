import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./dropdown-menu";
import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "flex",
    gap: spacingVars.space1,
    minHeight: sizeVars.controlMd,
    padding: spacingVars.space1,
  },
  trigger: {
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderWidth: 0,
    borderRadius: radiusVars.sm,
    color: colorVars.fgPrimary,
    cursor: "pointer",
    fontFamily: typographyVars.fontFamily,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    height: sizeVars.controlSm,
    outline: "none",
    paddingInline: spacingVars.space3,
    ":hover": { backgroundColor: colorVars.interactionHover },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  triggerOpen: { backgroundColor: colorVars.bgSurfacePressed },
  triggerDisabled: {
    backgroundColor: "transparent",
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
    ":hover": { backgroundColor: "transparent" },
  },
});

export function Menubar(props: ComponentProps<typeof MenubarPrimitive>) {
  return <MenubarPrimitive {...props} {...stylex.props(styles.root)} />;
}

export const MenubarMenu = MenuPrimitive.Root;

export function MenubarTrigger({ ...props }: ComponentProps<typeof MenuPrimitive.Trigger>) {
  return (
    <MenuPrimitive.Trigger
      {...props}
      className={(state) => {
        const sx = stylex.props(
          styles.trigger,
          state.open && styles.triggerOpen,
          state.disabled && styles.triggerDisabled,
        );
        return sx.className;
      }}
      style={(state) => {
        const sx = stylex.props(
          styles.trigger,
          state.open && styles.triggerOpen,
          state.disabled && styles.triggerDisabled,
        );
        return sx.style;
      }}
    />
  );
}

export const MenubarContent = DropdownMenuContent;
export const MenubarItem = DropdownMenuItem;
export const MenubarCheckboxItem = DropdownMenuCheckboxItem;
export const MenubarRadioItem = DropdownMenuRadioItem;
export const MenubarGroup = DropdownMenuGroup;
export const MenubarRadioGroup = DropdownMenuRadioGroup;
export const MenubarLabel = DropdownMenuLabel;
export const MenubarSeparator = DropdownMenuSeparator;
export const MenubarShortcut = DropdownMenuShortcut;
export const MenubarSub = DropdownMenuSub;
export const MenubarSubTrigger = DropdownMenuSubTrigger;
export const MenubarSubContent = DropdownMenuSubContent;
