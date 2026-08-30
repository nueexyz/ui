import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { getNativeStyleProps } from "./stylex-props";

import { colorVars, motionVars, spacingVars, typographyVars } from "@nooeh/tokens/tokens.stylex";

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
  containerClassName?: string;
  xstyle?: stylex.StyleXStyles;
};

export function Table({ className, containerClassName, style, xstyle, ...props }: TableProps) {
  return (
    <div
      className={[stylex.props(styles.container).className, containerClassName]
        .filter(Boolean)
        .join(" ")}
    >
      <table
        {...props}
        {...getNativeStyleProps(stylex.props(styles.table, xstyle), className, style)}
      />
    </div>
  );
}

export function TableHeader({ className, style, ...props }: ComponentProps<"thead">) {
  return (
    <thead {...props} {...getNativeStyleProps(stylex.props(styles.header), className, style)} />
  );
}

export function TableBody({ className, style, ...props }: ComponentProps<"tbody">) {
  return <tbody {...props} {...getNativeStyleProps(stylex.props(styles.body), className, style)} />;
}

export function TableFooter({ className, style, ...props }: ComponentProps<"tfoot">) {
  return (
    <tfoot {...props} {...getNativeStyleProps(stylex.props(styles.footer), className, style)} />
  );
}

export function TableRow({ className, style, ...props }: ComponentProps<"tr">) {
  return <tr {...props} {...getNativeStyleProps(stylex.props(styles.row), className, style)} />;
}

export function TableHead({ className, style, ...props }: ComponentProps<"th">) {
  return <th {...props} {...getNativeStyleProps(stylex.props(styles.head), className, style)} />;
}

export function TableCell({ className, style, ...props }: ComponentProps<"td">) {
  return <td {...props} {...getNativeStyleProps(stylex.props(styles.cell), className, style)} />;
}

export function TableCaption({ className, style, ...props }: ComponentProps<"caption">) {
  return (
    <caption {...props} {...getNativeStyleProps(stylex.props(styles.caption), className, style)} />
  );
}
