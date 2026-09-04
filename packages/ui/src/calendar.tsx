import { DayPicker, type DayButtonProps, type DayPickerProps } from "@daypicker/react";
import * as stylex from "@stylexjs/stylex";

import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: {
    color: colorVars.fgPrimary,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeSm,
    padding: spacingVars.space3,
    width: "fit-content",
  },
  months: { display: "flex", flexDirection: "column", gap: spacingVars.space8 },
  month: { position: "relative", width: "17.5rem" },
  monthCaption: {
    alignItems: "center",
    display: "flex",
    height: sizeVars.controlSm,
    justifyContent: "center",
    paddingInline: sizeVars.controlSm,
  },
  captionLabel: { fontWeight: typographyVars.fontWeightMedium },
  nav: {
    alignItems: "center",
    display: "flex",
    height: sizeVars.controlSm,
    insetInline: 0,
    justifyContent: "space-between",
    position: "absolute",
    insetBlockStart: 0,
  },
  navButton: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: colorVars.interactionDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "none",
    borderWidth: 0,
    color: colorVars.fgPrimary,
    cursor: "pointer",
    display: "inline-flex",
    height: sizeVars.controlSm,
    justifyContent: "center",
    outline: "none",
    padding: 0,
    position: "absolute",
    width: sizeVars.controlSm,
    ":hover": { backgroundColor: colorVars.interactionHover },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  previous: { insetInlineStart: 0, insetBlockStart: 0 },
  next: { insetInlineEnd: 0, insetBlockStart: 0 },
  monthGrid: { borderCollapse: "collapse", tableLayout: "fixed", width: "100%" },
  weekdays: { color: colorVars.fgSecondary },
  weekday: {
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    height: sizeVars.controlSm,
    textAlign: "center",
  },
  week: { height: sizeVars.controlMd },
  day: { height: sizeVars.controlMd, textAlign: "center" },
  dayButton: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: colorVars.interactionDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "none",
    borderWidth: 0,
    cursor: "pointer",
    display: "inline-flex",
    font: "inherit",
    height: sizeVars.controlMd,
    justifyContent: "center",
    outline: "none",
    padding: 0,
    width: "100%",
    ":hover": { backgroundColor: colorVars.interactionHover },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  selected: {
    backgroundColor: colorVars.bgActionPrimary,
    borderRadius: radiusVars.sm,
    color: colorVars.fgOnActionPrimary,
    fontWeight: typographyVars.fontWeightMedium,
  },
  today: { color: colorVars.fgAction, fontWeight: typographyVars.fontWeightSemibold },
  outside: { color: colorVars.fgTertiary },
  disabled: { color: colorVars.fgDisabled, cursor: "not-allowed" },
  rangeMiddle: {
    backgroundColor: colorVars.interactionSelected,
    borderRadius: 0,
    color: colorVars.fgPrimary,
  },
  dayLabel: { color: "inherit" },
  dayLabelRangeMiddle: { color: colorVars.fgPrimary },
  dayLabelSelected: { color: colorVars.fgOnActionPrimary },
  dayLabelToday: { color: colorVars.fgAction },
  chevron: {
    fill: colorVars.fgPrimary,
    height: sizeVars.iconMd,
    width: sizeVars.iconMd,
  },
});

const classNames = {
  button_next: stylex.props(styles.navButton, styles.next).className,
  button_previous: stylex.props(styles.navButton, styles.previous).className,
  caption_label: stylex.props(styles.captionLabel).className,
  day: stylex.props(styles.day).className,
  chevron: stylex.props(styles.chevron).className,
  disabled: stylex.props(styles.disabled).className,
  month: stylex.props(styles.month).className,
  month_caption: stylex.props(styles.monthCaption).className,
  month_grid: stylex.props(styles.monthGrid).className,
  months: stylex.props(styles.months).className,
  nav: stylex.props(styles.nav).className,
  outside: stylex.props(styles.outside).className,
  week: stylex.props(styles.week).className,
  weekday: stylex.props(styles.weekday).className,
  weekdays: stylex.props(styles.weekdays).className,
};

function CalendarDayButton({ children, modifiers, ...props }: DayButtonProps) {
  const isSelected = modifiers.range_start || modifiers.range_end || modifiers.selected;

  return (
    <button
      {...props}
      {...stylex.props(
        styles.dayButton,
        modifiers.range_middle && styles.rangeMiddle,
        isSelected && styles.selected,
        modifiers.today && !modifiers.selected && styles.today,
      )}
    >
      <span
        {...stylex.props(
          styles.dayLabel,
          modifiers.range_middle && styles.dayLabelRangeMiddle,
          isSelected && styles.dayLabelSelected,
          modifiers.today && !modifiers.selected && styles.dayLabelToday,
        )}
      >
        {children}
      </span>
    </button>
  );
}

type WithoutCalendarStyling<Props> = Props extends unknown
  ? Omit<
      Props,
      | "className"
      | "classNames"
      | "components"
      | "modifiersClassNames"
      | "modifiersStyles"
      | "style"
      | "styles"
    >
  : never;

type CalendarDayPickerProps = WithoutCalendarStyling<DayPickerProps>;

export type CalendarProps = CalendarDayPickerProps & {
  xstyle?: stylex.StyleXStyles;
};

export function Calendar({ navLayout = "around", xstyle, ...props }: CalendarProps) {
  const root = stylex.props(styles.root, xstyle);

  return (
    <DayPicker
      {...props}
      className={root.className}
      classNames={classNames}
      components={{ DayButton: CalendarDayButton }}
      navLayout={navLayout}
      style={root.style}
    />
  );
}
