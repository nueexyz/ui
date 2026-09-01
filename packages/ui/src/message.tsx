import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { getNativeStyleProps } from "./stylex-props";

import { colorVars, spacingVars, typographyVars } from "@nooeh/tokens/semantic.stylex";

const styles = stylex.create({
  root: { display: "flex", flexDirection: "column", gap: spacingVars.space2, width: "100%" },
  incoming: { alignItems: "flex-start" },
  outgoing: { alignItems: "flex-end" },
  header: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
  },
  content: { display: "flex", flexDirection: "column", gap: spacingVars.space2, width: "100%" },
  footer: { color: colorVars.fgTertiary, fontSize: typographyVars.fontSizeXs },
});

export type MessageProps = ComponentProps<"article"> & {
  side?: "incoming" | "outgoing";
  xstyle?: stylex.StyleXStyles;
};

export function Message({ className, side = "incoming", style, xstyle, ...props }: MessageProps) {
  return (
    <article
      {...props}
      data-side={side}
      {...getNativeStyleProps(stylex.props(styles.root, styles[side], xstyle), className, style)}
    />
  );
}

export function MessageHeader({ className, style, ...props }: ComponentProps<"header">) {
  return (
    <header {...props} {...getNativeStyleProps(stylex.props(styles.header), className, style)} />
  );
}

export function MessageContent({ className, style, ...props }: ComponentProps<"div">) {
  return (
    <div {...props} {...getNativeStyleProps(stylex.props(styles.content), className, style)} />
  );
}

export function MessageFooter({ className, style, ...props }: ComponentProps<"footer">) {
  return (
    <footer {...props} {...getNativeStyleProps(stylex.props(styles.footer), className, style)} />
  );
}
