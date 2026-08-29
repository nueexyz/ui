import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import * as stylex from "@stylexjs/stylex";
import { createContext, useContext, type ComponentProps, type ReactNode } from "react";

import { styles as toggleStyles } from "../toggle/toggle.stylex";
import type { ToggleSize, ToggleVariant } from "../toggle";
import { styles } from "./toggle-group.stylex";

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
          toggleStyles.root,
          toggleStyles[finalSize],
          toggleStyles[finalVariant],
          state.pressed && toggleStyles.pressed,
          finalVariant === "outline" && styles.outlineItem,
          xstyle,
        );
        const customClassName = typeof className === "function" ? className(state) : className;
        return [stylexProps.className, customClassName].filter(Boolean).join(" ");
      }}
      style={(state) => {
        const stylexProps = stylex.props(
          toggleStyles.root,
          toggleStyles[finalSize],
          toggleStyles[finalVariant],
          state.pressed && toggleStyles.pressed,
          xstyle,
        );
        return { ...stylexProps.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    />
  );
}
