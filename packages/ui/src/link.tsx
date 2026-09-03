import { useRender } from "@base-ui/react/use-render";
import * as stylex from "@stylexjs/stylex";
import { forwardRef, type ComponentProps } from "react";

import { Icon } from "./Icon";
import { colorVars, motionVars, sizeVars, typographyVars } from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: {
    alignItems: "center",
    borderRadius: "0.125rem",
    display: "inline-flex",
    fontFamily: typographyVars.fontFamily,
    gap: "0.1875em",
    outline: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "color, opacity, text-decoration-color",
    transitionTimingFunction: motionVars.easingStandard,
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  inline: {
    color: colorVars.fgAction,
    textDecorationLine: "underline",
    textDecorationThickness: sizeVars.stroke,
    textUnderlineOffset: "0.15em",
    ":hover": { opacity: 0.72 },
  },
  current: {
    color: "currentColor",
    textDecorationLine: "underline",
    textDecorationThickness: sizeVars.stroke,
    textUnderlineOffset: "0.15em",
    ":hover": { opacity: 0.72 },
  },
  plain: {
    color: colorVars.fgAction,
    textDecorationLine: "none",
    ":hover": { opacity: 0.72 },
  },
});

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
