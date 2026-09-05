import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import {
  colorVars,
  motionVars,
  opacityVars,
  radiusVars,
  sizeVars,
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgOnActionPrimary,
    cursor: "pointer",
    display: "inline-flex",
    height: "1.25rem",
    justifyContent: "center",
    minHeight: "1.25rem",
    minWidth: "1.25rem",
    outline: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color, opacity",
    transitionTimingFunction: motionVars.easingStandard,
    width: "1.25rem",
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
    cursor: "not-allowed",
    opacity: opacityVars.disabled,
    ":hover": { backgroundColor: colorVars.bgSurface },
  },
  indicator: {
    alignItems: "center",
    display: "inline-flex",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
});

export type CheckboxProps = Omit<
  ComponentProps<typeof CheckboxPrimitive.Root>,
  "className" | "style"
> & {
  xstyle?: stylex.StyleXStyles;
};

export function Checkbox({ xstyle, ...props }: CheckboxProps) {
  function getRootStyles(state: CheckboxPrimitive.Root.State) {
    return stylex.props(
      styles.root,
      xstyle,
      state.checked && styles.checked,
      state.disabled && styles.disabled,
    );
  }
  return (
    <CheckboxPrimitive.Root
      {...props}
      className={(state) => getRootStyles(state).className}
      style={(state) => getRootStyles(state).style}
    >
      <CheckboxPrimitive.Indicator {...stylex.props(styles.indicator)}>
        <CheckIcon aria-hidden="true" weight="bold" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
