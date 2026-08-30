import * as stylex from "@stylexjs/stylex";
import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

import { Separator } from "./separator";
import { radiusVars } from "@nooeh/tokens/tokens.stylex";
import { colorVars, sizeVars, spacingVars, typographyVars } from "@nooeh/tokens/tokens.stylex";

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
  horizontalLastItem: {},
  verticalItem: { marginBlockStart: -1 },
  verticalFirstItem: { marginBlockStart: 0 },
  verticalLastItem: {},
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

type StyleProps = { style?: CSSProperties; xstyle?: stylex.StyleXStyles };
type GroupItem = ReactElement<StyleProps>;

function isGroupItem(child: ReactNode): child is GroupItem {
  return isValidElement(child) && child.type !== ButtonGroupSeparator;
}

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
  const childItems = Children.toArray(children);
  const groupItems = childItems.filter(isGroupItem);

  const content = childItems.map((child, childIndex) => {
    if (!isGroupItem(child)) return child;

    const position = childItems.slice(0, childIndex).filter(isGroupItem).length;
    const groupItem = child;
    const itemStyles = [
      styles.item,
      styles[`${orientation}Item`],
      position === 0 && styles[`${orientation}FirstItem`],
      position === groupItems.length - 1 && styles[`${orientation}LastItem`],
    ];

    return cloneElement(groupItem, {
      style: {
        ...groupItem.props.style,
        ...getItemBorderRadius(orientation, position, groupItems.length),
      },
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
