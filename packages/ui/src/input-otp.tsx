import { OTPField } from "@base-ui/react/otp-field";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { getNativeStyleProps } from "./stylex-props";

import {
  colorVars,
  motionVars,
  opacityVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: { alignItems: "center", display: "flex", gap: spacingVars.space2 },
  group: { display: "flex" },
  slot: {
    appearance: "none",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: 0,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    fontFamily: typographyVars.fontFamily,
    fontSize: typographyVars.fontSizeSm,
    height: sizeVars.controlLg,
    marginInlineStart: -1,
    outline: "none",
    textAlign: "center",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color, box-shadow, opacity",
    width: sizeVars.controlLg,
    ":first-child": {
      borderBottomLeftRadius: radiusVars.sm,
      borderTopLeftRadius: radiusVars.sm,
      marginInlineStart: 0,
    },
    ":last-child": { borderBottomRightRadius: radiusVars.sm, borderTopRightRadius: radiusVars.sm },
    ":hover:not(:disabled)": { borderColor: colorVars.strokeStrong },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
      zIndex: 1,
    },
    ":disabled": { cursor: "not-allowed", opacity: opacityVars.disabled },
  },
  separator: { color: colorVars.fgTertiary, paddingInline: spacingVars.space1 },
});

export type InputOTPProps = ComponentProps<typeof OTPField.Root> & {
  xstyle?: stylex.StyleXStyles;
};

export function InputOTP({ className, style, xstyle, ...props }: InputOTPProps) {
  const resolved = stylex.props(styles.root, xstyle);
  return (
    <OTPField.Root
      {...props}
      className={(state) =>
        [resolved.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ")
      }
      style={(state) => ({
        ...resolved.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    />
  );
}

export function InputOTPGroup({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...getNativeStyleProps(stylex.props(styles.group), className, style)} />;
}

export function InputOTPSlot({
  className,
  style,
  ...props
}: ComponentProps<typeof OTPField.Input>) {
  const resolved = stylex.props(styles.slot);
  return (
    <OTPField.Input
      {...props}
      className={(state) =>
        [resolved.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ")
      }
      style={(state) => ({
        ...resolved.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    />
  );
}

export function InputOTPSeparator({ className, style, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      {...props}
      {...getNativeStyleProps(stylex.props(styles.separator), className, style)}
    >
      {props.children ?? "–"}
    </span>
  );
}
