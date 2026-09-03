import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Icon } from "./Icon";
import {
  colorVars,
  motionVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: { minWidth: 0, width: "100%" },
  item: {
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: sizeVars.stroke,
  },
  header: { display: "flex", margin: 0 },
  trigger: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderWidth: 0,
    color: colorVars.fgPrimary,
    cursor: "pointer",
    display: "flex",
    flex: 1,
    fontFamily: typographyVars.fontFamily,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    justifyContent: "space-between",
    lineHeight: typographyVars.lineHeightNormal,
    outline: "none",
    paddingBlock: spacingVars.space4,
    paddingInline: 0,
    textAlign: "start",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "color",
    ":hover": { textDecoration: "underline", textUnderlineOffset: spacingVars.space1 },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": { cursor: "not-allowed" },
  },
  triggerDisabled: {
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
    ":hover": { textDecoration: "none" },
  },
  icon: {
    alignItems: "center",
    display: "inline-flex",
    flexShrink: 0,
    height: "1rem",
    justifyContent: "center",
    width: "1rem",
  },
  iconClosed: {
    alignItems: "center",
    display: "inline-flex",
    ":is([data-panel-open] *)": { display: "none" },
  },
  iconOpen: {
    alignItems: "center",
    display: "none",
    ":is([data-panel-open] *)": { display: "inline-flex" },
  },
  panel: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    height: "var(--accordion-panel-height)",
    lineHeight: typographyVars.lineHeightNormal,
    minWidth: 0,
    opacity: 1,
    overflow: "hidden",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "height, opacity",
    transitionTimingFunction: motionVars.easingStandard,
    width: "100%",
    "@media (prefers-reduced-motion: reduce)": { transitionDuration: "0.01ms" },
  },
  panelTransitioning: { height: 0, opacity: 0 },
  panelContent: {
    paddingBottom: spacingVars.space4,
    paddingInlineEnd: spacingVars.space6,
    width: "100%",
  },
});

export function Accordion({
  className,
  style,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Root>) {
  const stylexProps = stylex.props(styles.root);
  return (
    <AccordionPrimitive.Root
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
          const stylexProps = stylex.props(
            styles.trigger,
            state.disabled && styles.triggerDisabled,
          );
          return [
            stylexProps.className,
            typeof className === "function" ? className(state) : className,
          ]
            .filter(Boolean)
            .join(" ");
        }}
        style={(state) => {
          const stylexProps = stylex.props(
            styles.trigger,
            state.disabled && styles.triggerDisabled,
          );
          return { ...stylexProps.style, ...(typeof style === "function" ? style(state) : style) };
        }}
      >
        {children}
        <span aria-hidden="true" {...stylex.props(styles.icon)}>
          <span {...stylex.props(styles.iconClosed)}>
            <Icon name="chevronDown" />
          </span>
          <span {...stylex.props(styles.iconOpen)}>
            <Icon name="chevronUp" />
          </span>
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  children,
  className,
  style,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Panel>) {
  return (
    <AccordionPrimitive.Panel
      {...props}
      className={(state) => {
        const stylexProps = stylex.props(
          styles.panel,
          state.transitionStatus === "starting" && styles.panelTransitioning,
          state.transitionStatus === "ending" && styles.panelTransitioning,
        );
        return [
          stylexProps.className,
          typeof className === "function" ? className(state) : className,
        ]
          .filter(Boolean)
          .join(" ");
      }}
      style={(state) => {
        const stylexProps = stylex.props(
          styles.panel,
          state.transitionStatus === "starting" && styles.panelTransitioning,
          state.transitionStatus === "ending" && styles.panelTransitioning,
        );
        return { ...stylexProps.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    >
      <div {...stylex.props(styles.panelContent)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}
