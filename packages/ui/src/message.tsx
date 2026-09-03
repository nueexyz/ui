import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";

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

export function Message({ side = "incoming", xstyle, ...props }: MessageProps) {
  return (
    <article {...props} data-side={side} {...stylex.props(styles.root, styles[side], xstyle)} />
  );
}

export function MessageHeader({ ...props }: ComponentProps<"header">) {
  return <header {...props} {...stylex.props(styles.header)} />;
}

export function MessageContent({ ...props }: ComponentProps<"div">) {
  return <div {...props} {...stylex.props(styles.content)} />;
}

export function MessageFooter({ ...props }: ComponentProps<"footer">) {
  return <footer {...props} {...stylex.props(styles.footer)} />;
}
