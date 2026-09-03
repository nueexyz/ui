import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, sizeVars } from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: { backgroundColor: colorVars.strokeDefault, flexShrink: 0 },
  horizontal: { height: sizeVars.stroke, width: "100%" },
  vertical: { alignSelf: "stretch", minHeight: sizeVars.touchTarget, width: sizeVars.stroke },
});

export type SeparatorProps = ComponentProps<typeof SeparatorPrimitive> & {
  decorative?: boolean;
  xstyle?: stylex.StyleXStyles;
};

export function Separator({
  decorative = true,
  orientation = "horizontal",
  xstyle,
  ...props
}: SeparatorProps) {
  const stylexProps = stylex.props(styles.root, styles[orientation], xstyle);
  return (
    <SeparatorPrimitive
      {...props}
      aria-hidden={decorative || undefined}
      orientation={orientation}
      role={decorative ? "presentation" : undefined}
      {...stylexProps}
    />
  );
}
