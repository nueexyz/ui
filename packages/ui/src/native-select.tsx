import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Icon } from "./Icon";
import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: { display: "inline-flex", position: "relative", width: "fit-content" },
  select: {
    appearance: "none",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    minWidth: "10rem",
    outline: "none",
    paddingInlineStart: spacingVars.space3,
    paddingInlineEnd: spacingVars.space8,
    width: "100%",
    ":hover": { borderColor: colorVars.strokeStrong },
    ":focus-visible": {
      borderColor: colorVars.strokeFocus,
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
  },
  sm: { height: sizeVars.controlSm },
  md: { height: sizeVars.controlMd },
  icon: {
    color: colorVars.fgSecondary,
    pointerEvents: "none",
    position: "absolute",
    right: spacingVars.space3,
    top: "50%",
    transform: "translateY(-50%)",
  },
});

export type NativeSelectProps = Omit<ComponentProps<"select">, "size"> & {
  size?: "md" | "sm";
  xstyle?: stylex.StyleXStyles;
};

export function NativeSelect({
  className,
  children,
  size = "md",
  style,
  xstyle,
  ...props
}: NativeSelectProps) {
  const stylexProps = stylex.props(styles.select, styles[size], xstyle);
  return (
    <span {...stylex.props(styles.root)}>
      <select
        {...props}
        className={[stylexProps.className, className].filter(Boolean).join(" ")}
        style={{ ...stylexProps.style, ...style }}
      >
        {children}
      </select>
      <Icon aria-hidden="true" name="chevronDown" {...stylex.props(styles.icon)} />
    </span>
  );
}

export function NativeSelectOption(props: ComponentProps<"option">) {
  return <option {...props} />;
}
export function NativeSelectOptGroup(props: ComponentProps<"optgroup">) {
  return <optgroup {...props} />;
}
