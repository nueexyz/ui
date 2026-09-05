import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { AccordionTrigger } from "../dist/accordion.js";
import type { Avatar } from "../dist/avatar.js";
import type { Badge } from "../dist/badge.js";
import type { BannerProps } from "../dist/banner.js";
import type { Button } from "../dist/button.js";
import type { Calendar } from "../dist/calendar.js";
import type { Card } from "../dist/card.js";
import type { Carousel } from "../dist/carousel.js";
import type { Checkbox } from "../dist/checkbox.js";
import type { InputOTP } from "../dist/input-otp.js";
import type { Input } from "../dist/input.js";
import type { Kbd } from "../dist/kbd.js";
import type { Label } from "../dist/label.js";
import type { Link } from "../dist/link.js";
import type { NativeSelect } from "../dist/native-select.js";
import type { Progress } from "../dist/progress.js";
import type { SelectTrigger } from "../dist/select.js";
import type { Slider } from "../dist/slider.js";
import type { Spinner } from "../dist/spinner.js";
import type { Switch } from "../dist/switch.js";
import type { Table } from "../dist/table.js";
import type { Textarea } from "../dist/textarea.js";
import type { Timeline, TimelineItem } from "../dist/timeline.js";
import type { ToggleGroupItem } from "../dist/toggle-group.js";
import type { Toggle } from "../dist/toggle.js";

type Assert<Value extends true> = Value;
type HasOnlyStylex<Props> =
  Extract<keyof Props, "className" | "style"> extends never ? true : false;
type HasNoXstyle<Props> = Extract<keyof Props, "xstyle"> extends never ? true : false;
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
export type LabelContract = Assert<HasNoXstyle<ComponentProps<typeof Label>>>;
export type BadgeContract = Assert<HasNoXstyle<ComponentProps<typeof Badge>>>;
export type KbdContract = Assert<HasNoXstyle<ComponentProps<typeof Kbd>>>;
export type SpinnerContract = Assert<HasNoXstyle<ComponentProps<typeof Spinner>>>;
export type AvatarContract = Assert<HasNoXstyle<ComponentProps<typeof Avatar>>>;
export type LinkContract = Assert<HasNoXstyle<ComponentProps<typeof Link>>>;
export type AvatarStyleOnlyContract = Assert<HasOnlyStylex<ComponentProps<typeof Avatar>>>;
export type LinkStyleOnlyContract = Assert<HasOnlyStylex<ComponentProps<typeof Link>>>;
export type TimelineContract = Assert<HasOnlyStylex<ComponentProps<typeof Timeline>>>;
export type TimelineItemContract = Assert<HasOnlyStylex<ComponentProps<typeof TimelineItem>>>;
export const bannerWithReactTitle: BannerProps = { title: <strong>Notice</strong> };

const styles = stylex.create({
  layout: { width: "100%", marginBlockStart: 8 },
  placement: { alignSelf: "center", marginInlineStart: 8 },
  paint: { backgroundColor: "red" },
  dimensions: { height: 80, padding: 24 },
  fieldDimensions: { height: 80, minHeight: 48 },
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
export const checkboxPlacement: ComponentProps<typeof Checkbox> = { xstyle: styles.placement };
export const progressLayout: ComponentProps<typeof Progress> = { value: 64, xstyle: styles.layout };
export const sliderLayout: ComponentProps<typeof Slider> = {
  defaultValue: 50,
  xstyle: styles.layout,
};
export const textareaLayout: ComponentProps<typeof Textarea> = { xstyle: styles.fieldDimensions };
export const nativeSelectLayout: ComponentProps<typeof NativeSelect> = { xstyle: styles.layout };
export const toggleLayout: ComponentProps<typeof Toggle> = { xstyle: styles.layout };
export const inputOTPLayout: ComponentProps<typeof InputOTP> = { length: 6, xstyle: styles.layout };
export const timelineLayout: ComponentProps<typeof Timeline> = { xstyle: styles.layout };
export const timelineItemLayout: ComponentProps<typeof TimelineItem> = { xstyle: styles.layout };
// @ts-expect-error Label owns its typography and spacing.
export const labelLayout: ComponentProps<typeof Label> = { xstyle: styles.layout };
// @ts-expect-error Badge visual treatment is selected with its variant.
export const badgeLayout: ComponentProps<typeof Badge> = { xstyle: styles.layout };
// @ts-expect-error Kbd visual treatment is not externally extensible.
export const kbdLayout: ComponentProps<typeof Kbd> = { xstyle: styles.layout };
// @ts-expect-error Spinner visual treatment is not externally extensible.
export const spinnerLayout: ComponentProps<typeof Spinner> = { xstyle: styles.layout };
// @ts-expect-error Avatar dimensions are selected with its size.
export const avatarLayout: ComponentProps<typeof Avatar> = { xstyle: styles.layout };
// @ts-expect-error Link appearance is selected with its variant.
export const linkLayout: ComponentProps<typeof Link> = { xstyle: styles.layout };
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
// @ts-expect-error Checkbox dimensions remain owned by the control.
export const checkboxWidth: ComponentProps<typeof Checkbox> = { xstyle: styles.layout };
export const nativeSelectHeight: ComponentProps<typeof NativeSelect> = {
  // @ts-expect-error NativeSelect height is selected with its size.
  xstyle: styles.dimensions,
};
// @ts-expect-error Toggle appearance is selected with its variant.
export const togglePaint: ComponentProps<typeof Toggle> = { xstyle: styles.paint };
export const buttonMotion: ComponentProps<typeof Button> = {
  children: "Save",
  // @ts-expect-error Motion cannot be replaced through a layout extension.
  xstyle: styles.motion,
};
export const cardPaint: ComponentProps<typeof Card> = { xstyle: styles.paint };

export const circleButton: ComponentProps<typeof Button> = {
  children: "×",
  shape: "circle",
  size: "icon-sm",
  "aria-label": "Close",
};
export const iconButton: ComponentProps<typeof Button> = {
  children: "×",
  size: "icon-sm",
  "aria-label": "Close",
};
export const invalidButtonShape: ComponentProps<typeof Button> = {
  children: "Save",
  // @ts-expect-error Shapes are a closed set of supported control treatments.
  shape: "oval",
};
