import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import {
  colorVars,
  motionVars,
  opacityVars,
  radiusVars,
  sizeVars,
  spacingVars,
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  group: { display: "flex", flexDirection: "column", gap: spacingVars.space3 },
  item: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.full,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    cursor: "pointer",
    display: "inline-flex",
    height: "1.5rem",
    justifyContent: "center",
    outline: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "border-color, opacity",
    transitionTimingFunction: motionVars.easingStandard,
    width: "1.5rem",
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": { cursor: "not-allowed", opacity: opacityVars.disabled },
  },
  checked: { borderColor: colorVars.strokeAction },
  indicator: { alignItems: "center", display: "inline-flex", justifyContent: "center" },
  dot: {
    backgroundColor: colorVars.bgActionPrimary,
    borderRadius: radiusVars.full,
    height: "0.75rem",
    width: "0.75rem",
  },
});

export type RadioGroupProps = Omit<
  ComponentProps<typeof RadioGroupPrimitive>,
  "className" | "style"
> & {
  xstyle?: stylex.StyleXStyles;
};

export function RadioGroup({ xstyle, ...props }: RadioGroupProps) {
  const stylexProps = stylex.props(styles.group, xstyle);
  return (
    <RadioGroupPrimitive {...props} className={stylexProps.className} style={stylexProps.style} />
  );
}

export type RadioGroupItemProps = Omit<
  ComponentProps<typeof RadioPrimitive.Root>,
  "className" | "style"
> & {
  xstyle?: stylex.StyleXStyles;
};

export function RadioGroupItem({ xstyle, ...props }: RadioGroupItemProps) {
  function getRootStyles(state: RadioPrimitive.Root.State) {
    return stylex.props(styles.item, state.checked && styles.checked, xstyle);
  }
  return (
    <RadioPrimitive.Root
      {...props}
      className={(state) => getRootStyles(state).className}
      style={(state) => getRootStyles(state).style}
    >
      <RadioPrimitive.Indicator {...stylex.props(styles.indicator)}>
        <span {...stylex.props(styles.dot)} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}
