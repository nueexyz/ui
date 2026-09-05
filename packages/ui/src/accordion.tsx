import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { CaretDownIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

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
    fontFamily: typographyVars.fontFamilyBody,
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
    transitionTimingFunction: motionVars.easingStandard,
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
    transform: "rotate(0deg)",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "transform",
    transitionTimingFunction: motionVars.easingStandard,
    width: "1rem",
    ":is([data-panel-open] *)": { transform: "rotate(180deg)" },
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: motionVars.durationInstant,
    },
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
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: motionVars.durationInstant,
    },
  },
  panelTransitioning: { height: 0, opacity: 0 },
  panelContent: {
    paddingBottom: spacingVars.space4,
    paddingInlineEnd: spacingVars.space6,
    width: "100%",
  },
});

export function Accordion({
  ...props
}: Omit<ComponentProps<typeof AccordionPrimitive.Root>, "className" | "style">) {
  const stylexProps = stylex.props(styles.root);
  return (
    <AccordionPrimitive.Root
      {...props}
      className={stylexProps.className}
      style={stylexProps.style}
    />
  );
}

export function AccordionItem({
  ...props
}: Omit<ComponentProps<typeof AccordionPrimitive.Item>, "className" | "style">) {
  const stylexProps = stylex.props(styles.item);
  return (
    <AccordionPrimitive.Item
      {...props}
      className={stylexProps.className}
      style={stylexProps.style}
    />
  );
}

export function AccordionTrigger({
  children,
  ...props
}: Omit<ComponentProps<typeof AccordionPrimitive.Trigger>, "className" | "style">) {
  function getTriggerStyles(state: AccordionPrimitive.Trigger.State) {
    return stylex.props(styles.trigger, state.disabled && styles.triggerDisabled);
  }
  return (
    <AccordionPrimitive.Header {...stylex.props(styles.header)}>
      <AccordionPrimitive.Trigger
        {...props}
        className={(state) => getTriggerStyles(state).className}
        style={(state) => getTriggerStyles(state).style}
      >
        {children}
        <span aria-hidden="true" {...stylex.props(styles.icon)}>
          <CaretDownIcon />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  children,
  ...props
}: Omit<ComponentProps<typeof AccordionPrimitive.Panel>, "className" | "style">) {
  function getPanelStyles(state: AccordionPrimitive.Panel.State) {
    return stylex.props(
      styles.panel,
      state.transitionStatus === "starting" && styles.panelTransitioning,
      state.transitionStatus === "ending" && styles.panelTransitioning,
    );
  }
  return (
    <AccordionPrimitive.Panel
      {...props}
      className={(state) => getPanelStyles(state).className}
      style={(state) => getPanelStyles(state).style}
    >
      <div {...stylex.props(styles.panelContent)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}
