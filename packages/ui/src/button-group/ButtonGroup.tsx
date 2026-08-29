import * as stylex from "@stylexjs/stylex";
import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type CSSProperties,
  type ReactElement,
} from "react";

import { Separator } from "../separator";
import { styles } from "./button-group.stylex";
import { radiusVars } from "@cachette/tokens/tokens.stylex";

type StyleProps = { style?: CSSProperties; xstyle?: stylex.StyleXStyles };
type GroupItem = ReactElement<StyleProps>;

function getItemBorderRadius(
  orientation: "horizontal" | "vertical",
  position: number,
  length: number,
): CSSProperties {
  const isFirst = position === 0;
  const isLast = position === length - 1;

  if (orientation === "horizontal") {
    return {
      borderBottomLeftRadius: isFirst ? radiusVars.sm : 0,
      borderBottomRightRadius: isLast ? radiusVars.sm : 0,
      borderTopLeftRadius: isFirst ? radiusVars.sm : 0,
      borderTopRightRadius: isLast ? radiusVars.sm : 0,
    };
  }

  return {
    borderBottomLeftRadius: isLast ? radiusVars.sm : 0,
    borderBottomRightRadius: isLast ? radiusVars.sm : 0,
    borderTopLeftRadius: isFirst ? radiusVars.sm : 0,
    borderTopRightRadius: isFirst ? radiusVars.sm : 0,
  };
}

export type ButtonGroupProps = ComponentProps<"div"> &
  StyleProps & { orientation?: "horizontal" | "vertical" };

export function ButtonGroup({
  className,
  children,
  orientation = "horizontal",
  role,
  style,
  xstyle,
  ...props
}: ButtonGroupProps) {
  const stylexProps = stylex.props(styles.root, styles[orientation], xstyle);
  const groupItems = Children.toArray(children).filter(
    (child): child is GroupItem => isValidElement(child) && child.type !== ButtonGroupSeparator,
  );
  let itemIndex = 0;

  const content = Children.map(children, (child) => {
    if (!isValidElement(child) || child.type === ButtonGroupSeparator) return child;

    const position = itemIndex;
    itemIndex += 1;
    const groupItem = child as GroupItem;
    const itemStyles = [
      styles.item,
      styles[`${orientation}Item`],
      position === 0 && styles[`${orientation}FirstItem`],
      position === groupItems.length - 1 && styles[`${orientation}LastItem`],
    ];

    return cloneElement(groupItem, {
      style: { ...groupItem.props.style, ...getItemBorderRadius(orientation, position, groupItems.length) },
      xstyle: [...itemStyles, groupItem.props.xstyle],
    });
  });

  return (
    <div
      {...props}
      data-orientation={orientation}
      role={role ?? "group"}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    >
      {content}
    </div>
  );
}

export function ButtonGroupText({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"span"> & StyleProps) {
  const stylexProps = stylex.props(styles.text, xstyle);
  return (
    <span
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function ButtonGroupSeparator({
  orientation = "vertical",
  xstyle,
  ...props
}: ComponentProps<typeof Separator> & StyleProps) {
  return <Separator {...props} orientation={orientation} xstyle={[styles.separator, xstyle]} />;
}
