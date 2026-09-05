import type { ComponentProps } from "react";
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
