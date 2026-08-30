import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Icon } from "./Icon";
import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nooeh/tokens/tokens.stylex";

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space2,
    minWidth: 0,
    width: "100%",
  },
  trigger: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    cursor: "pointer",
    display: "flex",
    fontFamily: typographyVars.fontFamily,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    flexShrink: 0,
    height: sizeVars.controlSm,
    justifyContent: "center",
    outline: "none",
    padding: 0,
    width: sizeVars.controlSm,
    ":hover": { backgroundColor: colorVars.interactionHover },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": { cursor: "not-allowed" },
  },
  triggerDisabled: {
    backgroundColor: colorVars.interactionDisabled,
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
    ":hover": { backgroundColor: colorVars.interactionDisabled },
  },
  panel: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    height: "var(--collapsible-panel-height)",
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
  panelContent: { display: "flex", flexDirection: "column", gap: spacingVars.space2 },
  icon: {
    alignItems: "center",
    display: "inline-flex",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "transform",
  },
});

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
        const sx = stylex.props(styles.trigger, state.disabled && styles.triggerDisabled);
        return [sx.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ");
      }}
      style={(state) => {
        const sx = stylex.props(styles.trigger, state.disabled && styles.triggerDisabled);
        return { ...sx.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    >
      {children}
      <span aria-hidden="true" {...stylex.props(styles.icon)}>
        <Icon name="caretUpDown" />
      </span>
    </CollapsiblePrimitive.Trigger>
  );
}

export function CollapsibleContent({
  children,
  className,
  style,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Panel>) {
  return (
    <CollapsiblePrimitive.Panel
      {...props}
      className={(state) => {
        const sx = stylex.props(
          styles.panel,
          state.transitionStatus === "starting" && styles.panelTransitioning,
          state.transitionStatus === "ending" && styles.panelTransitioning,
        );
        return [sx.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ");
      }}
      style={(state) => {
        const sx = stylex.props(
          styles.panel,
          state.transitionStatus === "starting" && styles.panelTransitioning,
          state.transitionStatus === "ending" && styles.panelTransitioning,
        );
        return { ...sx.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    >
      <div {...stylex.props(styles.panelContent)}>{children}</div>
    </CollapsiblePrimitive.Panel>
  );
}
