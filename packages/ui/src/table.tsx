import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, motionVars, spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  container: { overflowX: "auto", position: "relative", width: "100%" },
  table: {
    borderCollapse: "collapse",
    captionSide: "bottom",
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    width: "100%",
  },
  header: {
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
  },
  body: {},
  footer: {
    backgroundColor: colorVars.bgSubtle,
    borderTopColor: colorVars.strokeDefault,
    borderTopStyle: "solid",
    borderTopWidth: 1,
    fontWeight: typographyVars.fontWeightMedium,
  },
  row: {
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color",
    transitionTimingFunction: motionVars.easingStandard,
    backgroundColor: {
      default: "transparent",
      ":hover": colorVars.interactionHover,
    },
  },
  head: {
    color: colorVars.fgSecondary,
    fontWeight: typographyVars.fontWeightMedium,
    height: "2.5rem",
    paddingInline: spacingVars.space3,
    textAlign: "left",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  cell: {
    paddingBlock: spacingVars.space3,
    paddingInline: spacingVars.space3,
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  caption: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    marginTop: spacingVars.space4,
    textAlign: "left",
  },
});

export type TableProps = ComponentProps<"table"> & {
  xstyle?: stylex.StyleXStyles;
};

export function Table({ xstyle, ...props }: TableProps) {
  return (
    <div {...stylex.props(styles.container)}>
      <table {...props} {...stylex.props(styles.table, xstyle)} />
    </div>
  );
}

export function TableHeader({ ...props }: ComponentProps<"thead">) {
  return <thead {...props} {...stylex.props(styles.header)} />;
}

export function TableBody({ ...props }: ComponentProps<"tbody">) {
  return <tbody {...props} {...stylex.props(styles.body)} />;
}

export function TableFooter({ ...props }: ComponentProps<"tfoot">) {
  return <tfoot {...props} {...stylex.props(styles.footer)} />;
}

export function TableRow({ ...props }: ComponentProps<"tr">) {
  return <tr {...props} {...stylex.props(styles.row)} />;
}

export function TableHead({ ...props }: ComponentProps<"th">) {
  return <th {...props} {...stylex.props(styles.head)} />;
}

export function TableCell({ ...props }: ComponentProps<"td">) {
  return <td {...props} {...stylex.props(styles.cell)} />;
}

export function TableCaption({ ...props }: ComponentProps<"caption">) {
  return <caption {...props} {...stylex.props(styles.caption)} />;
}
