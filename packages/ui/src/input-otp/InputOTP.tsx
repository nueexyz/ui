import { OTPField } from "@base-ui/react/otp-field";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./input-otp.stylex";

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

function nativeProps(
  resolved: ReturnType<typeof stylex.props>,
  className: string | undefined,
  style: ComponentProps<"div">["style"],
) {
  return {
    className: [resolved.className, className].filter(Boolean).join(" "),
    style: { ...resolved.style, ...style },
  };
}

export function InputOTPGroup({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...nativeProps(stylex.props(styles.group), className, style)} />;
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
      {...nativeProps(stylex.props(styles.separator), className, style)}
    >
      {props.children ?? "–"}
    </span>
  );
}
