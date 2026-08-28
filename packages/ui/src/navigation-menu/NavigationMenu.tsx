import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Icon } from "../Icon";
import { styles } from "./navigation-menu.stylex";

export function NavigationMenu(props: ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return <NavigationMenuPrimitive.Root {...props} {...stylex.props(styles.root)} />;
}

export function NavigationMenuList(props: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return <NavigationMenuPrimitive.List {...props} {...stylex.props(styles.list)} />;
}

export const NavigationMenuItem = NavigationMenuPrimitive.Item;
export const NavigationMenuContent = NavigationMenuPrimitive.Content;

export function NavigationMenuTrigger({
  children,
  className,
  style,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      {...props}
      className={(state) => {
        const sx = stylex.props(styles.trigger, state.open && styles.triggerOpen);
        return [sx.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ");
      }}
      style={(state) => {
        const sx = stylex.props(styles.trigger, state.open && styles.triggerOpen);
        return { ...sx.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    >
      {children}
      <NavigationMenuPrimitive.Icon {...stylex.props(styles.icon)}>
        <Icon aria-hidden="true" name="chevronDown" />
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuLink({
  className,
  style,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  const sx = stylex.props(styles.link);
  return (
    <NavigationMenuPrimitive.Link
      {...props}
      className={(state) =>
        [sx.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ")
      }
      style={(state) => ({ ...sx.style, ...(typeof style === "function" ? style(state) : style) })}
    />
  );
}

type NavigationMenuViewportProps = ComponentProps<typeof NavigationMenuPrimitive.Popup> &
  Pick<ComponentProps<typeof NavigationMenuPrimitive.Positioner>, "align" | "side" | "sideOffset">;

export function NavigationMenuViewport({
  align = "center",
  className,
  side = "bottom",
  sideOffset = 8,
  style,
  ...props
}: NavigationMenuViewportProps) {
  const sx = stylex.props(styles.popup);
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <NavigationMenuPrimitive.Popup
          {...props}
          className={(state) =>
            [sx.className, typeof className === "function" ? className(state) : className]
              .filter(Boolean)
              .join(" ")
          }
          style={(state) => ({
            ...sx.style,
            ...(typeof style === "function" ? style(state) : style),
          })}
        >
          <NavigationMenuPrimitive.Viewport {...stylex.props(styles.viewport)} />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
}
