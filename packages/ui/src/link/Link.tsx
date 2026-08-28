import { useRender } from "@base-ui/react/use-render";
import * as stylex from "@stylexjs/stylex";
import { forwardRef, type ComponentProps } from "react";

import { Icon } from "../Icon";
import { styles } from "./link.stylex";

export type LinkVariant = "current" | "inline" | "plain";

export type LinkProps = useRender.ComponentProps<"a"> & {
  variant?: LinkVariant;
  xstyle?: stylex.StyleXStyles;
};

const LinkBase = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, render, style, variant = "inline", xstyle, ...props },
  ref,
) {
  const stylexProps = stylex.props(styles.root, styles[variant], xstyle);

  return useRender({
    defaultTagName: "a",
    props: {
      ...props,
      className: [stylexProps.className, className].filter(Boolean).join(" "),
      style: { ...stylexProps.style, ...style },
    },
    ref,
    render,
  });
});

function ExternalIcon(props: Omit<ComponentProps<typeof Icon>, "name">) {
  return <Icon aria-hidden="true" name="externalLink" size="1em" {...props} />;
}

export const Link = Object.assign(LinkBase, { ExternalIcon });
