import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { colorVars, opacityVars, radiusVars, sizeVars } from "@nooeh/tokens/semantic.stylex";

const styles = stylex.create({
  root: { opacity: { default: 1, ":disabled": opacityVars.disabled }, width: "100%" },
  control: {
    alignItems: "center",
    display: "flex",
    height: sizeVars.touchTarget,
    position: "relative",
    touchAction: "none",
    width: "100%",
  },
  track: {
    backgroundColor: colorVars.bgActionPrimary,
    borderRadius: radiusVars.full,
    height: "0.375rem",
    overflow: "hidden",
    width: "100%",
  },
  indicator: {
    backgroundColor: colorVars.bgActionPrimary,
    borderRadius: radiusVars.full,
    height: "100%",
  },
  thumb: {
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeAction,
    borderRadius: radiusVars.full,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    height: "1.25rem",
    outline: "none",
    width: "1.25rem",
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
});

export type SliderProps = ComponentProps<typeof SliderPrimitive.Root> & {
  /** Returns an accessible name for each thumb in a range slider. */
  getAriaLabel?: (index: number) => string;
  xstyle?: stylex.StyleXStyles;
};

export function Slider({
  className,
  defaultValue,
  getAriaLabel,
  style,
  value,
  xstyle,
  ...props
}: SliderProps) {
  const currentValue = value ?? defaultValue;
  const thumbCount = Array.isArray(currentValue) ? currentValue.length : 1;
  const stylexProps = stylex.props(styles.root, xstyle);
  return (
    <SliderPrimitive.Root
      {...props}
      defaultValue={defaultValue}
      value={value}
      className={[stylexProps.className, typeof className === "string" ? className : undefined]
        .filter(Boolean)
        .join(" ")}
      style={{ ...stylexProps.style, ...(typeof style === "object" ? style : undefined) }}
    >
      <SliderPrimitive.Control {...stylex.props(styles.control)}>
        <SliderPrimitive.Track {...stylex.props(styles.track)}>
          <SliderPrimitive.Indicator {...stylex.props(styles.indicator)} />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }, (_, index) => (
          <SliderPrimitive.Thumb
            getAriaLabel={getAriaLabel}
            index={index}
            key={index}
            {...stylex.props(styles.thumb)}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}
