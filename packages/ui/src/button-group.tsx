import * as stylex from "@stylexjs/stylex";
import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";

import { Separator } from "./separator";
import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: {
    alignItems: "stretch",
    display: "inline-flex",
    gap: 0,
    width: "fit-content",
  },
  horizontal: { flexDirection: "row" },
  vertical: { flexDirection: "column" },
  item: {
    minWidth: 0,
    position: "relative",
    ":focus-visible": { zIndex: 1 },
  },
  horizontalItem: { marginInlineStart: -1 },
  horizontalFirstItem: { marginInlineStart: 0 },
  horizontalOnlyItem: { borderRadius: radiusVars.sm },
  horizontalFirstItemRadius: {
    borderBottomLeftRadius: radiusVars.sm,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: radiusVars.sm,
    borderTopRightRadius: 0,
  },
  horizontalMiddleItem: { borderRadius: 0 },
  horizontalLastItem: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: radiusVars.sm,
    borderTopLeftRadius: 0,
    borderTopRightRadius: radiusVars.sm,
  },
  verticalItem: { marginBlockStart: -1 },
  verticalFirstItem: { marginBlockStart: 0 },
  verticalOnlyItem: { borderRadius: radiusVars.sm },
  verticalFirstItemRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: radiusVars.sm,
    borderTopRightRadius: radiusVars.sm,
  },
  verticalMiddleItem: { borderRadius: 0 },
  verticalLastItem: {
    borderBottomLeftRadius: radiusVars.sm,
    borderBottomRightRadius: radiusVars.sm,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  text: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgSecondary,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    justifyContent: "center",
    minHeight: sizeVars.controlMd,
    paddingInline: spacingVars.space3,
  },
  separator: { alignSelf: "stretch", height: "auto", marginInline: -1, minHeight: "auto" },
});

type StyleProps = { xstyle?: stylex.StyleXStyles };
type GroupItem = ReactElement<StyleProps>;

function isGroupItem(child: ReactNode): child is GroupItem {
  return isValidElement(child) && child.type !== ButtonGroupSeparator;
}

function getItemPositionStyle(
  orientation: "horizontal" | "vertical",
  isFirst: boolean,
  isLast: boolean,
) {
  if (orientation === "horizontal") {
    if (isFirst && isLast) return styles.horizontalOnlyItem;
    if (isFirst) return styles.horizontalFirstItemRadius;
    if (isLast) return styles.horizontalLastItem;
    return styles.horizontalMiddleItem;
  }

  if (isFirst && isLast) return styles.verticalOnlyItem;
  if (isFirst) return styles.verticalFirstItemRadius;
  if (isLast) return styles.verticalLastItem;
  return styles.verticalMiddleItem;
}

export type ButtonGroupProps = ComponentProps<"div"> &
  StyleProps & { orientation?: "horizontal" | "vertical" };

export function ButtonGroup({
  children,
  orientation = "horizontal",
  role,
  xstyle,
  ...props
}: ButtonGroupProps) {
  const stylexProps = stylex.props(styles.root, styles[orientation], xstyle);
  const childItems = Children.toArray(children);
  const groupItems = childItems.filter(isGroupItem);

  const content = childItems.map((child) => {
    if (!isGroupItem(child)) return child;

    const position = groupItems.indexOf(child);
    const groupItem = child;
    const isFirst = position === 0;
    const isLast = position === groupItems.length - 1;
    const positionStyle = getItemPositionStyle(orientation, isFirst, isLast);
    const itemStyles = [
      styles.item,
      styles[`${orientation}Item`],
      isFirst && styles[`${orientation}FirstItem`],
      positionStyle,
    ];

    return cloneElement(groupItem, {
      xstyle: [...itemStyles, groupItem.props.xstyle],
    });
  });

  return (
    <div {...props} data-orientation={orientation} role={role ?? "group"} {...stylexProps}>
      {content}
    </div>
  );
}

export function ButtonGroupText({ xstyle, ...props }: ComponentProps<"span"> & StyleProps) {
  const stylexProps = stylex.props(styles.text, xstyle);
  return <span {...props} {...stylexProps} />;
}

export function ButtonGroupSeparator({
  orientation = "vertical",
  xstyle,
  ...props
}: ComponentProps<typeof Separator> & StyleProps) {
  return <Separator {...props} orientation={orientation} xstyle={[styles.separator, xstyle]} />;
}
