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

export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
  xstyle?: stylex.StyleXStyles;
};

export function Checkbox({ xstyle, ...props }: CheckboxProps) {
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
        return stylexProps.className;
      }}
      style={(state) => {
        const stylexProps = stylex.props(
          styles.root,
          xstyle,
          state.checked && styles.checked,
          state.disabled && styles.disabled,
        );
        return stylexProps.style;
      }}
    >
      <CheckboxPrimitive.Indicator {...stylex.props(styles.indicator)}>
        <CheckIcon aria-hidden="true" weight="bold" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
