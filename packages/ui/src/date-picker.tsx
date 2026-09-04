import { CalendarIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";

import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const styles = stylex.create({
  root: { display: "inline-flex", minWidth: "13rem" },
  trigger: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightRegular,
    gap: spacingVars.space2,
    height: sizeVars.controlMd,
    outline: "none",
    paddingInline: spacingVars.space3,
    textAlign: "left",
    width: "100%",
    ":hover": { borderColor: colorVars.strokeStrong },
    ":focus-visible": {
      borderColor: colorVars.strokeFocus,
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": {
      backgroundColor: colorVars.bgSubtle,
      borderColor: colorVars.strokeDefault,
      color: colorVars.fgDisabled,
      cursor: "not-allowed",
    },
  },
  placeholder: { color: colorVars.fgSecondary },
  calendar: { padding: 0, width: "fit-content" },
  icon: { flexShrink: 0 },
  value: { fontWeight: typographyVars.fontWeightRegular },
});

export type DatePickerProps = {
  defaultValue?: Date;
  disabled?: boolean;
  format?: (date: Date) => string;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  value?: Date;
  xstyle?: stylex.StyleXStyles;
};

function defaultFormat(date: Date) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

export function DatePicker({
  defaultValue,
  disabled,
  format = defaultFormat,
  onValueChange,
  placeholder = "Pick a date",
  value,
  xstyle,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const selectedValue = value ?? uncontrolledValue;

  function handleSelect(date: Date | undefined) {
    if (value === undefined) setUncontrolledValue(date);
    onValueChange?.(date);
    setOpen(false);
  }

  return (
    <span {...stylex.props(styles.root, xstyle)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <button disabled={disabled} type="button" {...stylex.props(styles.trigger)}>
              <CalendarIcon aria-hidden="true" {...stylex.props(styles.icon)} />
              {selectedValue ? (
                <span {...stylex.props(styles.value)}>{format(selectedValue)}</span>
              ) : (
                <span {...stylex.props(styles.placeholder)}>{placeholder}</span>
              )}
            </button>
          }
        />
        <PopoverContent xstyle={styles.calendar}>
          <Calendar mode="single" onSelect={handleSelect} selected={selectedValue} />
        </PopoverContent>
      </Popover>
    </span>
  );
}
