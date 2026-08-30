import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Icon } from "./Icon";
import { colorVars, motionVars, radiusVars, sizeVars } from "@nooeh/tokens/tokens.stylex";

const styles = stylex.create({
  root: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgInverse,
    cursor: "pointer",
    display: "inline-flex",
    height: "1lh",
    justifyContent: "center",
    minHeight: "1.25rem",
    minWidth: "1.25rem",
    outline: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color, opacity",
    width: "1lh",
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": { cursor: "not-allowed" },
  },
  checked: { backgroundColor: colorVars.bgActionPrimary, borderColor: colorVars.bgActionPrimary },
  disabled: {
    backgroundColor: colorVars.interactionDisabled,
    borderColor: colorVars.strokeDefault,
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
    ":hover": { backgroundColor: colorVars.interactionDisabled },
  },
  indicator: {
    alignItems: "center",
    display: "inline-flex",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
});

export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
  xstyle?: stylex.StyleXStyles;
};

export function Checkbox({ className, style, xstyle, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      {...props}
      className={(state) => {
        const stylexProps = stylex.props(
          styles.root,
          xstyle,
          state.checked && styles.checked,
          state.disabled && styles.disabled,
        );
        const customClassName = typeof className === "function" ? className(state) : className;
        return [stylexProps.className, customClassName].filter(Boolean).join(" ");
      }}
      style={(state) => {
        const stylexProps = stylex.props(
          styles.root,
          xstyle,
          state.checked && styles.checked,
          state.disabled && styles.disabled,
        );
        const customStyle = typeof style === "function" ? style(state) : style;
        return { ...stylexProps.style, ...customStyle };
      }}
    >
      <CheckboxPrimitive.Indicator {...stylex.props(styles.indicator)}>
        <Icon aria-hidden="true" name="check" weight="bold" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
