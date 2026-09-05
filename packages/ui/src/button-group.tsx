"use client";

import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";

import { Separator } from "./separator";

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
  return (
    isValidElement(child) &&
    typeof child.type !== "string" &&
    child.type !== Fragment &&
    child.type !== ButtonGroupSeparator
  );
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

/** Direct children must be Nuee buttons or components that forward xstyle. Fragments and native elements are not styled as group items. */
export type ButtonGroupProps = Omit<ComponentProps<"div">, "className" | "style"> &
  StyleProps & { orientation?: "horizontal" | "vertical" };

export function ButtonGroup({
  children,
  orientation = "horizontal",
  role,
  xstyle,
  ...props
}: ButtonGroupProps) {
  const childItems = Children.toArray(children);
  const groupItems = childItems.filter(isGroupItem);

  let position = -1;
  const content: ReactNode[] = [];
  for (const child of childItems) {
    if (!isGroupItem(child)) {
      content.push(child);
      continue;
    }

    position += 1;
    const isFirst = position === 0;
    const isLast = position === groupItems.length - 1;
    const positionStyle = getItemPositionStyle(orientation, isFirst, isLast);
    const itemStyles = [
      styles.item,
      styles[`${orientation}Item`],
      isFirst && styles[`${orientation}FirstItem`],
      positionStyle,
    ];

    content.push(
      cloneElement(child, {
        xstyle: [...itemStyles, child.props.xstyle],
      }),
    );
  }

  return (
    <div
      {...props}
      data-orientation={orientation}
      role={role ?? "group"}
      {...stylex.props(styles.root, styles[orientation], xstyle)}
    >
      {content}
    </div>
  );
}

export function ButtonGroupText({
  xstyle,
  ...props
}: Omit<ComponentProps<"span">, "className" | "style"> & StyleProps) {
  return <span {...props} {...stylex.props(styles.text, xstyle)} />;
}

export function ButtonGroupSeparator({
  orientation = "vertical",
  xstyle,
  ...props
}: Omit<ComponentProps<typeof Separator>, "className" | "style"> & StyleProps) {
  return <Separator {...props} orientation={orientation} xstyle={[styles.separator, xstyle]} />;
}
