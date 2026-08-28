import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { styles } from "./slider.stylex";

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
