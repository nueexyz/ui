import { Input as InputPrimitive } from "@base-ui/react/input";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@dumo/tokens/tokens.stylex";

const styles = stylex.create({
  root: {
    appearance: "none",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    height: sizeVars.controlMd,
    lineHeight: typographyVars.lineHeightNormal,
    minWidth: 0,
    outline: "none",
    paddingInline: spacingVars.space3,
    transitionDuration: motionVars.durationFast,
    transitionProperty: "border-color, opacity",
    transitionTimingFunction: motionVars.easingStandard,
    width: "100%",
    "::placeholder": {
      color: colorVars.fgTertiary,
    },
    ":hover": {
      borderColor: colorVars.strokeStrong,
    },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": {
      backgroundColor: colorVars.bgSubtle,
      borderColor: colorVars.strokeDefault,
      color: colorVars.fgDisabled,
      cursor: "not-allowed",
      ":hover": { borderColor: colorVars.strokeDefault },
    },
    ":user-invalid": {
      borderColor: colorVars.strokeFeedbackError,
    },
  },
  invalid: {
    borderColor: colorVars.strokeFeedbackError,
  },
});

export type InputProps = ComponentProps<typeof InputPrimitive> & {
  xstyle?: stylex.StyleXStyles;
};

export function Input({
  "aria-invalid": ariaInvalid,
  className,
  style,
  xstyle,
  ...props
}: InputProps) {
  const isInvalid = ariaInvalid === true || ariaInvalid === "true";
  const stylexProps = stylex.props(styles.root, isInvalid && styles.invalid, xstyle);
  const mergedClassName = [stylexProps.className, className].filter(Boolean).join(" ");

  return (
    <InputPrimitive
      {...props}
      aria-invalid={ariaInvalid}
      className={mergedClassName}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}
