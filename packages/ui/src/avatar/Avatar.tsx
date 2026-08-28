import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./avatar.stylex";

export type AvatarSize = "lg" | "md" | "sm";

export type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: AvatarSize;
  xstyle?: stylex.StyleXStyles;
};

export function Avatar({ className, size = "md", style, xstyle, ...props }: AvatarProps) {
  const stylexProps = stylex.props(styles.root, styles[size], xstyle);
  return (
    <AvatarPrimitive.Root
      {...props}
      className={(state) =>
        [stylexProps.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ")
      }
      style={(state) => ({
        ...stylexProps.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    />
  );
}

export function AvatarImage({
  className,
  style,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Image>) {
  const stylexProps = stylex.props(styles.image);
  return (
    <AvatarPrimitive.Image
      {...props}
      className={(state) =>
        [stylexProps.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ")
      }
      style={(state) => ({
        ...stylexProps.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    />
  );
}

export function AvatarFallback({
  className,
  style,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const stylexProps = stylex.props(styles.fallback);
  return (
    <AvatarPrimitive.Fallback
      {...props}
      className={(state) =>
        [stylexProps.className, typeof className === "function" ? className(state) : className]
          .filter(Boolean)
          .join(" ")
      }
      style={(state) => ({
        ...stylexProps.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    />
  );
}

function getStyleProps(
  baseStyle: stylex.StyleXStyles,
  className: string | undefined,
  style: ComponentProps<"span">["style"],
) {
  const stylexProps = stylex.props(baseStyle);
  return {
    className: [stylexProps.className, className].filter(Boolean).join(" "),
    style: { ...stylexProps.style, ...style },
  };
}

export function AvatarBadge({ className, style, ...props }: ComponentProps<"span">) {
  return <span {...props} {...getStyleProps(styles.badge, className, style)} />;
}

export function AvatarGroup({ className, style, ...props }: ComponentProps<"div">) {
  const stylexProps = stylex.props(styles.group);
  return (
    <div
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function AvatarGroupCount({ className, style, ...props }: ComponentProps<"span">) {
  return <span {...props} {...getStyleProps(styles.groupCount, className, style)} />;
}
