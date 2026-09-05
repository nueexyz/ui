import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, sizeVars, spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  group: { display: "flex", flexDirection: "column", gap: spacingVars.space2, minWidth: 0 },
  root: { display: "flex", gap: spacingVars.space2, minWidth: 0, width: "100%" },
  alignStart: { flexDirection: "row" },
  alignEnd: { flexDirection: "row-reverse" },
  avatar: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colorVars.bgSubtle,
    borderRadius: "9999px",
    display: "flex",
    flexShrink: 0,
    justifyContent: "center",
    minWidth: sizeVars.controlLg,
    overflow: "hidden",
  },
  header: {
    alignItems: "center",
    color: colorVars.fgSecondary,
    display: "flex",
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    maxWidth: "100%",
    minWidth: 0,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space2,
    maxWidth: "85%",
    minWidth: 0,
    width: "fit-content",
  },
  footer: {
    alignItems: "center",
    color: colorVars.fgTertiary,
    display: "flex",
    fontSize: typographyVars.fontSizeXs,
    justifyContent: "flex-end",
    maxWidth: "100%",
    minWidth: 0,
  },
});

export type MessageAlign = "start" | "end";

export type MessageProps = Omit<ComponentProps<"article">, "className" | "style"> & {
  align?: MessageAlign;
  xstyle?: stylex.StyleXStyles;
};

export function Message({ align = "start", xstyle, ...props }: MessageProps) {
  return (
    <article
      {...props}
      data-align={align}
      {...stylex.props(
        styles.root,
        align === "start" ? styles.alignStart : styles.alignEnd,
        xstyle,
      )}
    />
  );
}

export function MessageGroup({ ...props }: Omit<ComponentProps<"div">, "className" | "style">) {
  return <div {...props} {...stylex.props(styles.group)} />;
}

export function MessageAvatar({ ...props }: Omit<ComponentProps<"div">, "className" | "style">) {
  return <div {...props} {...stylex.props(styles.avatar)} />;
}

export function MessageHeader({ ...props }: Omit<ComponentProps<"header">, "className" | "style">) {
  return <header {...props} {...stylex.props(styles.header)} />;
}

export function MessageContent({ ...props }: Omit<ComponentProps<"div">, "className" | "style">) {
  return <div {...props} {...stylex.props(styles.content)} />;
}

export function MessageFooter({ ...props }: Omit<ComponentProps<"footer">, "className" | "style">) {
  return <footer {...props} {...stylex.props(styles.footer)} />;
}
