import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Icon } from "../Icon";
import { styles } from "./collapsible.stylex";

export function Collapsible({
  className,
  style,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Root>) {
  const stylexProps = stylex.props(styles.root);
  return (
    <CollapsiblePrimitive.Root
      {...props}
      className={(state) =>
        [stylexProps.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ")
      }
      style={(state) => ({
        ...stylexProps.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    />
  );
}

export function CollapsibleTrigger({
  children,
  className,
  style,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return (
    <CollapsiblePrimitive.Trigger
      {...props}
      className={(state) => {
        const sx = stylex.props(styles.trigger);
        return [sx.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ");
      }}
      style={(state) => {
        const sx = stylex.props(styles.trigger);
        return { ...sx.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    >
      {children}
      <span aria-hidden="true" {...stylex.props(styles.icon)}>
        <Icon name="chevronDown" />
      </span>
    </CollapsiblePrimitive.Trigger>
  );
}

export function CollapsibleContent({
  className,
  style,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Panel>) {
  const sx = stylex.props(styles.panel);
  return (
    <CollapsiblePrimitive.Panel
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
