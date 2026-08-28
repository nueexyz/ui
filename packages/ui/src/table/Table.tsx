import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./table.stylex";

function mergeProps(
  resolved: ReturnType<typeof stylex.props>,
  className: string | undefined,
  style: ComponentProps<"div">["style"],
) {
  return {
    className: [resolved.className, className].filter(Boolean).join(" "),
    style: { ...resolved.style, ...style },
  } as Pick<ComponentProps<"div">, "className" | "style">;
}

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
      <table {...props} {...mergeProps(stylex.props(styles.table, xstyle), className, style)} />
    </div>
  );
}

export function TableHeader({ className, style, ...props }: ComponentProps<"thead">) {
  return <thead {...props} {...mergeProps(stylex.props(styles.header), className, style)} />;
}

export function TableBody({ className, style, ...props }: ComponentProps<"tbody">) {
  return <tbody {...props} {...mergeProps(stylex.props(styles.body), className, style)} />;
}

export function TableFooter({ className, style, ...props }: ComponentProps<"tfoot">) {
  return <tfoot {...props} {...mergeProps(stylex.props(styles.footer), className, style)} />;
}

export function TableRow({ className, style, ...props }: ComponentProps<"tr">) {
  return <tr {...props} {...mergeProps(stylex.props(styles.row), className, style)} />;
}

export function TableHead({ className, style, ...props }: ComponentProps<"th">) {
  return <th {...props} {...mergeProps(stylex.props(styles.head), className, style)} />;
}

export function TableCell({ className, style, ...props }: ComponentProps<"td">) {
  return <td {...props} {...mergeProps(stylex.props(styles.cell), className, style)} />;
}

export function TableCaption({ className, style, ...props }: ComponentProps<"caption">) {
  return <caption {...props} {...mergeProps(stylex.props(styles.caption), className, style)} />;
}
