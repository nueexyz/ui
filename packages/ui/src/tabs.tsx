import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import * as stylex from "@stylexjs/stylex";
import { createContext, type ComponentProps, useContext } from "react";

import {
  colorVars,
  motionVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: { minWidth: 0, width: "100%" },
  list: {
    alignItems: "stretch",
    display: "inline-flex",
    maxWidth: "100%",
    overflowX: "auto",
    position: "relative",
  },
  segmentedList: {
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    minHeight: sizeVars.controlMd,
    padding: "0.125rem",
  },
  underlineList: {
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: sizeVars.stroke,
    gap: spacingVars.space2,
    minHeight: sizeVars.controlMd,
  },
  trigger: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderWidth: 0,
    color: colorVars.fgSecondary,
    cursor: "pointer",
    display: "inline-flex",
    flexShrink: 0,
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    justifyContent: "center",
    outline: "none",
    position: "relative",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, color",
    transitionTimingFunction: motionVars.easingStandard,
    whiteSpace: "nowrap",
    zIndex: 1,
    ":hover": { color: colorVars.fgPrimary },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: `calc(${sizeVars.stroke} * -1)`,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  segmentedTrigger: {
    borderRadius: radiusVars.sm,
    height: sizeVars.controlSm,
    paddingInline: spacingVars.space3,
  },
  underlineTrigger: {
    borderRadius: radiusVars.sm,
    height: sizeVars.controlMd,
    paddingInline: spacingVars.space2,
    ":hover": { backgroundColor: colorVars.interactionHover, color: colorVars.fgPrimary },
  },
  triggerActive: { color: colorVars.fgPrimary },
  triggerDisabled: {
    backgroundColor: "transparent",
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
    ":hover": { backgroundColor: "transparent", color: colorVars.fgDisabled },
  },
  indicator: {
    left: 0,
    position: "absolute",
    transform: "translateX(var(--active-tab-left))",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "transform, width, height",
    transitionTimingFunction: motionVars.easingEnter,
    width: "var(--active-tab-width)",
    zIndex: 0,
    "@media (prefers-reduced-motion: reduce)": { transitionDuration: "0.01ms" },
  },
  segmentedIndicator: {
    backgroundColor: colorVars.bgSurface,
    borderRadius: radiusVars.sm,
    boxShadow: shadowVars.subtle,
    height: "var(--active-tab-height)",
    top: "var(--active-tab-top)",
  },
  underlineIndicator: {
    backgroundColor: colorVars.fgAction,
    bottom: 0,
    height: sizeVars.focusRing,
  },
  panel: {
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    marginTop: spacingVars.space3,
    minWidth: 0,
    outline: "none",
    width: "100%",
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
});

export type TabsVariant = "segmented" | "underline";
export type TabsProps = ComponentProps<typeof TabsPrimitive.Root> & {
  variant?: TabsVariant;
};

const TabsVariantContext = createContext<TabsVariant>("segmented");

export function Tabs({ variant = "segmented", ...props }: TabsProps) {
  const stylexProps = stylex.props(styles.root);

  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root
        {...props}
        className={() => stylexProps.className}
        style={() => stylexProps.style}
      />
    </TabsVariantContext.Provider>
  );
}

export function TabsList({ children, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  const variant = useContext(TabsVariantContext);

  return (
    <TabsPrimitive.List
      {...props}
      className={() => {
        const sx = stylex.props(styles.list, styles[`${variant}List`]);
        return sx.className;
      }}
      style={() => {
        const sx = stylex.props(styles.list, styles[`${variant}List`]);
        return sx.style;
      }}
    >
      {children}
      <TabsPrimitive.Indicator {...stylex.props(styles.indicator, styles[`${variant}Indicator`])} />
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({ ...props }: ComponentProps<typeof TabsPrimitive.Tab>) {
  const variant = useContext(TabsVariantContext);

  return (
    <TabsPrimitive.Tab
      {...props}
      className={(state) => {
        const sx = stylex.props(
          styles.trigger,
          styles[`${variant}Trigger`],
          state.active && styles.triggerActive,
          state.disabled && styles.triggerDisabled,
        );
        return sx.className;
      }}
      style={(state) => {
        const sx = stylex.props(
          styles.trigger,
          styles[`${variant}Trigger`],
          state.active && styles.triggerActive,
          state.disabled && styles.triggerDisabled,
        );
        return sx.style;
      }}
    />
  );
}

export function TabsContent({ ...props }: ComponentProps<typeof TabsPrimitive.Panel>) {
  return <TabsPrimitive.Panel {...props} {...stylex.props(styles.panel)} />;
}
