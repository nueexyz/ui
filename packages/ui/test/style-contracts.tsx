import type { ComponentProps } from "react";
import * as stylex from "@stylexjs/stylex";
import type { Switch } from "../dist/switch.js";
import type { BannerProps } from "../dist/banner.js";
import type { Button } from "../dist/button.js";
import type { Card } from "../dist/card.js";
import type { AccordionTrigger } from "../dist/accordion.js";
import type { SelectTrigger } from "../dist/select.js";
import type { ToggleGroupItem } from "../dist/toggle-group.js";
import type { Input } from "../dist/input.js";
import type { Table } from "../dist/table.js";
import type { Carousel } from "../dist/carousel.js";
import type { Calendar } from "../dist/calendar.js";

type Assert<Value extends true> = Value;
type HasOnlyStylex<Props> =
  Extract<keyof Props, "className" | "style"> extends never ? true : false;
export type ButtonContract = Assert<HasOnlyStylex<ComponentProps<typeof Button>>>;
export type CardContract = Assert<HasOnlyStylex<ComponentProps<typeof Card>>>;
export type AccordionContract = Assert<HasOnlyStylex<ComponentProps<typeof AccordionTrigger>>>;
export type SelectContract = Assert<HasOnlyStylex<ComponentProps<typeof SelectTrigger>>>;
export type ToggleGroupContract = Assert<HasOnlyStylex<ComponentProps<typeof ToggleGroupItem>>>;
export type InputContract = Assert<HasOnlyStylex<ComponentProps<typeof Input>>>;
export type TableContract = Assert<HasOnlyStylex<ComponentProps<typeof Table>>>;
export type CarouselContract = Assert<HasOnlyStylex<ComponentProps<typeof Carousel>>>;
export type CalendarContract = Assert<HasOnlyStylex<ComponentProps<typeof Calendar>>>;
export type BannerContract = Assert<HasOnlyStylex<BannerProps>>;
export const bannerWithReactTitle: BannerProps = { title: <strong>Notice</strong> };

const styles = stylex.create({
  layout: { width: "100%", marginBlockStart: 8 },
  placement: { alignSelf: "center", marginInlineStart: 8 },
  paint: { backgroundColor: "red" },
  dimensions: { height: 80, padding: 24 },
  focus: { ":focus-visible": { outline: "none" } },
  motion: { transitionDuration: "5s" },
  responsive: { width: { default: "100%", "@media (min-width: 800px)": 320 } },
});

export const buttonLayout: ComponentProps<typeof Button> = {
  children: "Save",
  xstyle: [styles.layout, styles.responsive],
};
export const inputLayout: ComponentProps<typeof Input> = { xstyle: styles.layout };
export const switchPlacement: ComponentProps<typeof Switch> = { xstyle: styles.placement };
export const buttonPaint: ComponentProps<typeof Button> = {
  children: "Save",
  // @ts-expect-error Button colors are selected with variant or a theme.
  xstyle: styles.paint,
};
export const buttonDimensions: ComponentProps<typeof Button> = {
  children: "Save",
  // @ts-expect-error Button dimensions are selected with size and shape.
  xstyle: styles.dimensions,
};
// @ts-expect-error State styles remain owned by Input, including nested selectors.
export const inputFocus: ComponentProps<typeof Input> = { xstyle: styles.focus };
// @ts-expect-error Switch width must match its thumb travel.
export const switchWidth: ComponentProps<typeof Switch> = { xstyle: styles.layout };
export const buttonMotion: ComponentProps<typeof Button> = {
  children: "Save",
  // @ts-expect-error Motion cannot be replaced through a layout extension.
  xstyle: styles.motion,
};
export const cardPaint: ComponentProps<typeof Card> = { xstyle: styles.paint };

export const circleButton: ComponentProps<typeof Button> = {
  children: "×",
  shape: "circle",
  size: "sm",
  "aria-label": "Close",
};
export const invalidButtonShape: ComponentProps<typeof Button> = {
  children: "Save",
  // @ts-expect-error Shapes are a closed set of supported control treatments.
  shape: "oval",
};
