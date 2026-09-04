/* oxlint-disable jsx-a11y/label-has-associated-control -- The caller provides htmlFor or nests the control. */
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: {
    alignItems: "center",
    color: colorVars.fgPrimary,
    cursor: "pointer",
    display: "inline-flex",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    gap: spacingVars.space2,
    lineHeight: typographyVars.lineHeightTight,
    userSelect: "none",
  },
});

export type LabelProps = ComponentProps<"label"> & { xstyle?: stylex.StyleXStyles };

export function Label({ xstyle, ...props }: LabelProps) {
  return <label {...props} {...stylex.props(styles.root, xstyle)} />;
}
