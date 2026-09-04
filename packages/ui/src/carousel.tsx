import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
import useEmblaCarousel from "embla-carousel-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";

import { radiusVars, sizeVars } from "@nuee/tokens/semantic.stylex";

import { Button } from "./button";

const styles = stylex.create({
  root: { position: "relative", width: "100%" },
  viewport: { overflow: "hidden", width: "100%" },
  content: { display: "flex" },
  contentVertical: {
    flexDirection: "column",
  },
  item: { flex: "0 0 100%", minWidth: 0 },
  control: {
    borderRadius: radiusVars.full,
    height: sizeVars.controlSm,
    paddingInline: 0,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: sizeVars.controlSm,
  },
  previous: { insetInlineStart: `calc(${sizeVars.controlSm} * -1.5)` },
  next: { insetInlineEnd: `calc(${sizeVars.controlSm} * -1.5)` },
});

type CarouselApi = ReturnType<typeof useEmblaCarousel>[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugins = Parameters<typeof useEmblaCarousel>[1];
type CarouselOrientation = "horizontal" | "vertical";

type CarouselContextValue = {
  api: CarouselApi;
  canScrollNext: boolean;
  canScrollPrevious: boolean;
  orientation: CarouselOrientation;
  scrollNext: () => void;
  scrollPrevious: () => void;
  viewportRef: ReturnType<typeof useEmblaCarousel>[0];
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("Carousel slots must be rendered inside Carousel.");
  return context;
}

export type { CarouselApi };

export type CarouselProps = ComponentProps<"section"> & {
  children: ReactNode;
  onSelect?: (api: NonNullable<CarouselApi>) => void;
  options?: CarouselOptions;
  orientation?: CarouselOrientation;
  plugins?: CarouselPlugins;
  setApi?: (api: NonNullable<CarouselApi>) => void;
  xstyle?: stylex.StyleXStyles;
};

export function Carousel({
  children,
  onSelect,
  options,
  orientation = "horizontal",
  plugins,
  setApi,
  xstyle,
  ...props
}: CarouselProps) {
  const [viewportRef, api] = useEmblaCarousel(
    { ...options, axis: orientation === "horizontal" ? "x" : "y" },
    plugins,
  );
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const root = stylex.props(styles.root, xstyle);

  const updateState = useCallback(
    (nextApi: NonNullable<CarouselApi>) => {
      setCanScrollPrevious(nextApi.canScrollPrev());
      setCanScrollNext(nextApi.canScrollNext());
      onSelect?.(nextApi);
    },
    [onSelect],
  );

  useEffect(() => {
    if (!api) return;
    setApi?.(api);
    api.on("reInit", updateState).on("select", updateState);

    const frame = requestAnimationFrame(() => updateState(api));

    return () => {
      cancelAnimationFrame(frame);
      api.off("reInit", updateState).off("select", updateState);
    };
  }, [api, setApi, updateState]);

  function scrollPrevious() {
    api?.scrollPrev();
  }

  function scrollNext() {
    api?.scrollNext();
  }

  return (
    <CarouselContext.Provider
      value={{
        api,
        canScrollNext,
        canScrollPrevious,
        orientation,
        scrollNext,
        scrollPrevious,
        viewportRef,
      }}
    >
      <section {...props} {...root}>
        {children}
      </section>
    </CarouselContext.Provider>
  );
}

export type CarouselContentProps = ComponentProps<"div"> & { xstyle?: stylex.StyleXStyles };

export function CarouselContent({ children, xstyle, ...props }: CarouselContentProps) {
  const { orientation, viewportRef } = useCarousel();
  const content = stylex.props(
    styles.content,
    orientation === "vertical" && styles.contentVertical,
    xstyle,
  );

  return (
    <div ref={viewportRef} {...stylex.props(styles.viewport)}>
      <div {...props} {...content}>
        {children}
      </div>
    </div>
  );
}

export type CarouselItemProps = ComponentProps<"div"> & { xstyle?: stylex.StyleXStyles };

export function CarouselItem({ xstyle, ...props }: CarouselItemProps) {
  const item = stylex.props(styles.item, xstyle);
  return <div {...props} {...item} />;
}

type CarouselControlProps = Omit<ComponentProps<typeof Button>, "children" | "onClick"> & {
  xstyle?: stylex.StyleXStyles;
};

export function CarouselPrevious({ disabled, xstyle, ...props }: CarouselControlProps) {
  const { canScrollPrevious, scrollPrevious } = useCarousel();
  return (
    <Button
      aria-label="Previous slide"
      disabled={disabled ?? !canScrollPrevious}
      onClick={scrollPrevious}
      size="sm"
      variant="secondary"
      xstyle={[styles.control, styles.previous, xstyle]}
      {...props}
    >
      <CaretLeftIcon aria-hidden="true" />
    </Button>
  );
}

export function CarouselNext({ disabled, xstyle, ...props }: CarouselControlProps) {
  const { canScrollNext, scrollNext } = useCarousel();
  return (
    <Button
      aria-label="Next slide"
      disabled={disabled ?? !canScrollNext}
      onClick={scrollNext}
      size="sm"
      variant="secondary"
      xstyle={[styles.control, styles.next, xstyle]}
      {...props}
    >
      <CaretRightIcon aria-hidden="true" />
    </Button>
  );
}
