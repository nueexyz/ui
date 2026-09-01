import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import {
  colorVars,
  opacityVars,
  radiusVars,
  sizeVars,
  spacingVars,
} from "@nooeh/tokens/semantic.stylex";

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

export type RadioGroupProps = ComponentProps<typeof RadioGroupPrimitive> & {
  xstyle?: stylex.StyleXStyles;
};

export function RadioGroup({ className, style, xstyle, ...props }: RadioGroupProps) {
  const stylexProps = stylex.props(styles.group, xstyle);
  return (
    <RadioGroupPrimitive
      {...props}
      className={(state) => {
        const customClassName = typeof className === "function" ? className(state) : className;
        return [stylexProps.className, customClassName].filter(Boolean).join(" ");
      }}
      style={(state) => ({
        ...stylexProps.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    />
  );
}

export type RadioGroupItemProps = ComponentProps<typeof RadioPrimitive.Root> & {
  xstyle?: stylex.StyleXStyles;
};

export function RadioGroupItem({ className, style, xstyle, ...props }: RadioGroupItemProps) {
  return (
    <RadioPrimitive.Root
      {...props}
      className={(state) => {
        const stylexProps = stylex.props(styles.item, state.checked && styles.checked, xstyle);
        const customClassName = typeof className === "function" ? className(state) : className;
        return [stylexProps.className, customClassName].filter(Boolean).join(" ");
      }}
      style={(state) => {
        const stylexProps = stylex.props(styles.item, state.checked && styles.checked, xstyle);
        return { ...stylexProps.style, ...(typeof style === "function" ? style(state) : style) };
      }}
    >
      <RadioPrimitive.Indicator {...stylex.props(styles.indicator)}>
        <span {...stylex.props(styles.dot)} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}
