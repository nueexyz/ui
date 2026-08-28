import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Icon } from "../Icon";
import { styles } from "./accordion.stylex";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  style,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  const stylexProps = stylex.props(styles.item);
  return (
    <AccordionPrimitive.Item
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

export function AccordionTrigger({
  children,
  className,
  style,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header {...stylex.props(styles.header)}>
      <AccordionPrimitive.Trigger
        {...props}
        className={(state) => {
          const stylexProps = stylex.props(styles.trigger);
          return [
            stylexProps.className,
            typeof className === "function" ? className(state) : className,
          ]
            .filter(Boolean)
            .join(" ");
        }}
        style={(state) => {
          const stylexProps = stylex.props(styles.trigger);
          return { ...stylexProps.style, ...(typeof style === "function" ? style(state) : style) };
        }}
      >
        {children}
        <span
          aria-hidden="true"
          {...stylex.props(styles.icon, props.disabled && styles.iconDisabled)}
        >
          <Icon name="chevronDown" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  style,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Panel>) {
  const stylexProps = stylex.props(styles.panel);
  return (
    <AccordionPrimitive.Panel
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
