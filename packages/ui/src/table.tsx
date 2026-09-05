import {
  colorVars,
  motionVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

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
    borderBottomWidth: sizeVars.stroke,
  },
  body: {},
  footer: {
    backgroundColor: colorVars.bgSubtle,
    borderTopColor: colorVars.strokeDefault,
    borderTopStyle: "solid",
    borderTopWidth: sizeVars.stroke,
    fontWeight: typographyVars.fontWeightMedium,
  },
  row: {
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: sizeVars.stroke,
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
    height: sizeVars.controlLg,
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
    paddingInline: spacingVars.space1,
    paddingBlock: spacingVars.space3,
  },
});

export type TableProps = Omit<ComponentProps<"table">, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
};

export function Table({ xstyle, ...props }: TableProps) {
  return (
    <div {...stylex.props(styles.container)}>
      <table {...props} {...stylex.props(styles.table, xstyle)} />
    </div>
  );
}

export function TableHeader({ ...props }: Omit<ComponentProps<"thead">, "className" | "style">) {
  return <thead {...props} {...stylex.props(styles.header)} />;
}

export function TableBody({ ...props }: Omit<ComponentProps<"tbody">, "className" | "style">) {
  return <tbody {...props} {...stylex.props(styles.body)} />;
}

export function TableFooter({ ...props }: Omit<ComponentProps<"tfoot">, "className" | "style">) {
  return <tfoot {...props} {...stylex.props(styles.footer)} />;
}

export function TableRow({ ...props }: Omit<ComponentProps<"tr">, "className" | "style">) {
  return <tr {...props} {...stylex.props(styles.row)} />;
}

export function TableHead({ ...props }: Omit<ComponentProps<"th">, "className" | "style">) {
  return <th {...props} {...stylex.props(styles.head)} />;
}

export function TableCell({ ...props }: Omit<ComponentProps<"td">, "className" | "style">) {
  return <td {...props} {...stylex.props(styles.cell)} />;
}

export function TableCaption({ ...props }: Omit<ComponentProps<"caption">, "className" | "style">) {
  return <caption {...props} {...stylex.props(styles.caption)} />;
}
