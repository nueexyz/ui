import {
  colorVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space4,
    margin: 0,
    padding: 0,
  },
  item: {
    columnGap: spacingVars.space3,
    display: "grid",
    gridTemplateColumns: `${sizeVars.controlXs} minmax(0, 1fr)`,
    listStyle: "none",
    minWidth: 0,
    position: "relative",
    "::before": {
      backgroundColor: colorVars.strokeDefault,
      bottom: `calc(${spacingVars.space4} * -1)`,
      content: '""',
      left: `calc((${sizeVars.controlXs} - ${sizeVars.stroke}) / 2)`,
      position: "absolute",
      top: 0,
      width: sizeVars.stroke,
      zIndex: 0,
    },
    ":last-child": {
      "::before": { display: "none" },
    },
  },
  indicator: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderRadius: radiusVars.full,
    color: colorVars.fgSecondary,
    display: "inline-flex",
    fontSize: sizeVars.iconSm,
    gridColumn: 1,
    height: sizeVars.controlXs,
    justifyContent: "center",
    position: "relative",
    width: sizeVars.controlXs,
    zIndex: 1,
    boxShadow: shadowVars.floating,
    borderColor: colorVars.strokeDefault,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
  },
  indicatorActive: {
    backgroundColor: colorVars.bgCurrent,
    color: colorVars.fgPrimary,
  },
  indicatorComplete: {
    backgroundColor: colorVars.bgFeedbackSuccess,
    color: colorVars.fgFeedbackSuccess,
  },
  indicatorError: {
    backgroundColor: colorVars.bgFeedbackError,
    color: colorVars.fgFeedbackError,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space1,
    gridColumn: 2,
    minWidth: 0,
    paddingBlock: spacingVars.space1,
  },
  title: {
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightTight,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  time: {
    color: colorVars.fgTertiary,
    fontSize: typographyVars.fontSizeXs,
    lineHeight: typographyVars.lineHeightNormal,
  },
});

export type TimelineIndicatorVariant = "active" | "complete" | "default" | "error";

export type TimelineProps = Omit<ComponentProps<"ol">, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
};

export function Timeline({ xstyle, ...props }: TimelineProps) {
  return <ol {...props} {...stylex.props(styles.root, xstyle)} />;
}

export type TimelineItemProps = Omit<ComponentProps<"li">, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
};

export function TimelineItem({ xstyle, ...props }: TimelineItemProps) {
  return <li {...props} {...stylex.props(styles.item, xstyle)} />;
}

export type TimelineIndicatorProps = Omit<ComponentProps<"span">, "className" | "style"> & {
  variant?: TimelineIndicatorVariant;
};

export function TimelineIndicator({ variant = "default", ...props }: TimelineIndicatorProps) {
  return (
    <span
      aria-hidden={props["aria-label"] === undefined ? true : undefined}
      {...props}
      {...stylex.props(
        styles.indicator,
        variant === "active" && styles.indicatorActive,
        variant === "complete" && styles.indicatorComplete,
        variant === "error" && styles.indicatorError,
      )}
    />
  );
}

export function TimelineContent({ ...props }: Omit<ComponentProps<"div">, "className" | "style">) {
  return <div {...props} {...stylex.props(styles.content)} />;
}

export function TimelineTitle({ ...props }: Omit<ComponentProps<"div">, "className" | "style">) {
  return <div {...props} {...stylex.props(styles.title)} />;
}

export function TimelineDescription({
  ...props
}: Omit<ComponentProps<"p">, "className" | "style">) {
  return <p {...props} {...stylex.props(styles.description)} />;
}

export function TimelineTime({ ...props }: Omit<ComponentProps<"time">, "className" | "style">) {
  return <time {...props} {...stylex.props(styles.time)} />;
}
