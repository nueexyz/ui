import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./message.stylex";

function nativeProps(
  resolved: ReturnType<typeof stylex.props>,
  className?: string,
  style?: ComponentProps<"div">["style"],
) {
  return {
    className: [resolved.className, className].filter(Boolean).join(" "),
    style: { ...resolved.style, ...style },
  };
}

export type MessageProps = ComponentProps<"article"> & {
  side?: "incoming" | "outgoing";
  xstyle?: stylex.StyleXStyles;
};

export function Message({ className, side = "incoming", style, xstyle, ...props }: MessageProps) {
  return (
    <article
      {...props}
      data-side={side}
      {...nativeProps(stylex.props(styles.root, styles[side], xstyle), className, style)}
    />
  );
}

export function MessageHeader({ className, style, ...props }: ComponentProps<"header">) {
  return <header {...props} {...nativeProps(stylex.props(styles.header), className, style)} />;
}

export function MessageContent({ className, style, ...props }: ComponentProps<"div">) {
  return <div {...props} {...nativeProps(stylex.props(styles.content), className, style)} />;
}

export function MessageFooter({ className, style, ...props }: ComponentProps<"footer">) {
  return <footer {...props} {...nativeProps(stylex.props(styles.footer), className, style)} />;
}
