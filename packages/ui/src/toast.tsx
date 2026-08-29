import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import * as stylex from "@stylexjs/stylex";
import { useLayoutEffect, useRef, useState, type ComponentProps, type RefObject } from "react";

import { Icon, type IconName } from "./Icon";
import {
  colorVars,
  motionVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@dumo/tokens/tokens.stylex";

const spin = stylex.keyframes({ to: { transform: "rotate(360deg)" } });

const styles = stylex.create({
  viewport: {
    maxWidth: "24rem",
    outline: "none",
    pointerEvents: "none",
    position: "fixed",
    width: "calc(100vw - 2rem)",
    zIndex: 70,
  },
  viewportTop: { top: spacingVars.space4 },
  viewportBottom: { bottom: spacingVars.space4 },
  viewportLeft: { left: spacingVars.space4 },
  viewportCenter: { left: "50%", transform: "translateX(-50%)" },
  viewportRight: { right: spacingVars.space4 },
  root: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    bottom: 0,
    boxShadow: shadowVars.overlay,
    color: colorVars.fgPrimary,
    height: "var(--toast-frontmost-height, var(--toast-height))",
    outline: "none",
    overflow: "hidden",
    pointerEvents: "auto",
    position: "absolute",
    left: 0,
    right: 0,
    transform:
      "translateX(var(--toast-swipe-movement-x)) translateY(calc(var(--toast-swipe-movement-y) - (var(--toast-index) * 0.75rem) - ((1 - max(0, 1 - (var(--toast-index) * 0.1))) * var(--toast-frontmost-height, var(--toast-height))))) scale(calc(max(0, 1 - (var(--toast-index) * 0.1))))",
    transformOrigin: "bottom",
    transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms, height 150ms",
    userSelect: "none",
    width: "100%",
    willChange: "transform",
    zIndex: "calc(1000 - var(--toast-index))",
    "::after": {
      content: '""',
      height: "calc(0.75rem + 1px)",
      left: 0,
      position: "absolute",
      top: "100%",
      width: "100%",
    },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":is([data-expanded])": {
      height: "var(--toast-height)",
      overflow: "visible",
      transform:
        "translateX(var(--toast-swipe-movement-x)) translateY(calc((var(--toast-offset-y) * -1) - (var(--toast-index) * 0.75rem) + var(--toast-swipe-movement-y)))",
    },
    ":is([data-limited])": { opacity: 0, pointerEvents: "none" },
    ":is([data-swiping])": { transitionDuration: "0ms" },
    ":is([data-starting-style])": { opacity: 0, transform: "translateY(150%)" },
    ":is([data-ending-style])": { opacity: 0, transform: "translateY(150%)" },
    ":is([data-ending-style][data-swipe-direction='up'])": {
      transform: "translateY(calc(var(--toast-swipe-movement-y) - 150%))",
    },
    ":is([data-ending-style][data-swipe-direction='down'])": {
      transform: "translateY(calc(var(--toast-swipe-movement-y) + 150%))",
    },
    ":is([data-ending-style][data-swipe-direction='left'])": {
      transform:
        "translateX(calc(var(--toast-swipe-movement-x) - 150%)) translateY(calc((var(--toast-offset-y) * -1) - (var(--toast-index) * 0.75rem) + var(--toast-swipe-movement-y)))",
    },
    ":is([data-ending-style][data-swipe-direction='right'])": {
      transform:
        "translateX(calc(var(--toast-swipe-movement-x) + 150%)) translateY(calc((var(--toast-offset-y) * -1) - (var(--toast-index) * 0.75rem) + var(--toast-swipe-movement-y)))",
    },
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: motionVars.durationNormal,
      ":is([data-starting-style])": { transform: "translateY(24%)" },
      ":is([data-ending-style])": { transform: "translateY(24%)" },
    },
  },
  rootTop: {
    bottom: "auto",
    top: 0,
    transform:
      "translateX(var(--toast-swipe-movement-x)) translateY(calc(var(--toast-swipe-movement-y) + (var(--toast-index) * 0.75rem) + ((1 - max(0, 1 - (var(--toast-index) * 0.1))) * var(--toast-frontmost-height, var(--toast-height))))) scale(calc(max(0, 1 - (var(--toast-index) * 0.1))))",
    transformOrigin: "top",
    ":is([data-expanded])": {
      transform:
        "translateX(var(--toast-swipe-movement-x)) translateY(calc(var(--toast-offset-y) + (var(--toast-index) * 0.75rem) + var(--toast-swipe-movement-y)))",
    },
    ":is([data-starting-style])": { transform: "translateY(-150%)" },
    ":is([data-ending-style])": { transform: "translateY(-150%)" },
    ":is([data-ending-style][data-swipe-direction='left'])": {
      transform:
        "translateX(calc(var(--toast-swipe-movement-x) - 150%)) translateY(calc(var(--toast-offset-y) + (var(--toast-index) * 0.75rem) + var(--toast-swipe-movement-y)))",
    },
    ":is([data-ending-style][data-swipe-direction='right'])": {
      transform:
        "translateX(calc(var(--toast-swipe-movement-x) + 150%)) translateY(calc(var(--toast-offset-y) + (var(--toast-index) * 0.75rem) + var(--toast-swipe-movement-y)))",
    },
    "@media (prefers-reduced-motion: reduce)": {
      ":is([data-starting-style])": { transform: "translateY(-24%)" },
      ":is([data-ending-style])": { transform: "translateY(-24%)" },
    },
  },
  content: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space3,
    height: "100%",
    minHeight: "4.75rem",
    overflow: "hidden",
    padding: spacingVars.space4,
    position: "relative",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "opacity",
    ":is([data-behind]:not([data-expanded]))": { opacity: 0, pointerEvents: "none" },
  },
  message: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacingVars.space1,
    minWidth: 0,
  },
  title: {
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightTight,
    margin: 0,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  statusIcon: {
    alignItems: "center",
    display: "inline-flex",
    flexShrink: 0,
    height: sizeVars.iconMd,
    justifyContent: "center",
    width: sizeVars.iconMd,
  },
  default: { color: colorVars.fgSecondary },
  success: { color: colorVars.fgFeedbackSuccess },
  info: { color: colorVars.fgFeedbackInfo },
  warning: { color: colorVars.fgFeedbackWarning },
  error: { color: colorVars.fgFeedbackError },
  loading: { color: colorVars.fgSecondary },
  loadingIcon: {
    animationDuration: "700ms",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.full,
    borderRightColor: colorVars.fgPrimary,
    borderStyle: "solid",
    borderWidth: sizeVars.focusRing,
    flexShrink: 0,
    height: sizeVars.iconMd,
    width: sizeVars.iconMd,
    "@media (prefers-reduced-motion: reduce)": { animationDuration: "1.5s" },
  },
  action: {
    appearance: "none",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    cursor: "pointer",
    flexShrink: 0,
    fontFamily: typographyVars.fontFamily,
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    height: "1.75rem",
    outline: "none",
    paddingInline: spacingVars.space3,
    ":hover": { backgroundColor: colorVars.interactionHover },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  close: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgSecondary,
    cursor: "pointer",
    display: "inline-flex",
    flexShrink: 0,
    height: "1.75rem",
    justifyContent: "center",
    outline: "none",
    width: "1.75rem",
    ":hover": { backgroundColor: colorVars.interactionHover, color: colorVars.fgPrimary },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  clearAll: {
    appearance: "none",
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.strokeDefault,
    borderStyle: "solid",
    borderRadius: radiusVars.sm,
    borderWidth: sizeVars.stroke,
    color: colorVars.fgSecondary,
    cursor: "pointer",
    fontFamily: typographyVars.fontFamily,
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    outline: "none",
    paddingBlock: spacingVars.space1,
    paddingInline: spacingVars.space2,
    pointerEvents: "auto",
    position: "absolute",
    right: 0,
    transition: "top 500ms cubic-bezier(0.22, 1, 0.36, 1)",
    ":hover": { backgroundColor: colorVars.bgRaised, color: colorVars.fgPrimary },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
});

type ToastType = "default" | "success" | "info" | "warning" | "error" | "loading";

export type ToastPosition =
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "top-left"
  | "top-right";

export type ToasterProps = Omit<
  ComponentProps<typeof ToastPrimitive.Provider>,
  "children" | "toastManager"
> & {
  /** Toast viewport position. @default "bottom-right" */
  position?: ToastPosition;
};

export const toast = ToastPrimitive.createToastManager();

const toastIcons: Partial<Record<ToastType, IconName>> = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};

function ToastStatusIcon({ type }: { type?: string }) {
  if (!type || type === "default") {
    return null;
  }

  if (type === "loading") {
    return <span aria-hidden="true" {...stylex.props(styles.loadingIcon)} />;
  }

  const iconName = toastIcons[type as ToastType];
  if (!iconName) {
    return null;
  }

  return (
    <span aria-hidden="true" {...stylex.props(styles.statusIcon, styles[type as ToastType])}>
      <Icon name={iconName} />
    </span>
  );
}

function ToastClearAll({
  isExpanded,
  viewportRef,
}: {
  isExpanded: boolean;
  viewportRef: RefObject<HTMLDivElement | null>;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [top, setTop] = useState<number>();

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const button = buttonRef.current;

    if (!isExpanded || !viewport || !button) {
      setTop(undefined);
      return;
    }

    const updatePosition = () => {
      const toastRoots = Array.from(
        viewport.querySelectorAll<HTMLElement>("[data-dumo-toast-root]:not([data-limited])"),
      );
      const toastTop = Math.min(...toastRoots.map((root) => root.getBoundingClientRect().top));

      setTop(toastTop - viewport.getBoundingClientRect().top - button.offsetHeight - 8);
    };

    updatePosition();

    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(viewport);
    window.addEventListener("resize", updatePosition);
    const timeoutId = window.setTimeout(updatePosition, 500);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.clearTimeout(timeoutId);
    };
  }, [isExpanded, viewportRef]);

  if (!isExpanded) {
    return null;
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => toast.close()}
      style={{ top: top ?? -999, visibility: top === undefined ? "hidden" : undefined }}
      {...stylex.props(styles.clearAll)}
    >
      Clear all
    </button>
  );
}

function ToastList({
  isExpanded,
  position,
  viewportRef,
}: {
  isExpanded: boolean;
  position: ToastPosition;
  viewportRef: RefObject<HTMLDivElement | null>;
}) {
  const { toasts } = ToastPrimitive.useToastManager();
  const isTop = position.startsWith("top");

  return (
    <>
      {toasts.map((item) => (
        <ToastPrimitive.Root
          key={item.id}
          toast={item}
          data-dumo-toast-root=""
          {...stylex.props(styles.root, isTop && styles.rootTop)}
        >
          <ToastPrimitive.Content {...stylex.props(styles.content)}>
            <ToastStatusIcon type={item.type} />
            <div {...stylex.props(styles.message)}>
              <ToastPrimitive.Title {...stylex.props(styles.title)} />
              <ToastPrimitive.Description {...stylex.props(styles.description)} />
            </div>
            {item.actionProps ? <ToastPrimitive.Action {...stylex.props(styles.action)} /> : null}
            <ToastPrimitive.Close aria-label="Close toast" {...stylex.props(styles.close)}>
              <Icon aria-hidden="true" name="close" />
            </ToastPrimitive.Close>
          </ToastPrimitive.Content>
        </ToastPrimitive.Root>
      ))}
      {toasts.length > 1 ? (
        <ToastClearAll isExpanded={isExpanded} viewportRef={viewportRef} />
      ) : null}
    </>
  );
}

export function Toaster({ limit = 3, position = "bottom-right", ...props }: ToasterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [verticalPosition, horizontalPosition] = position.split("-") as [
    "bottom" | "top",
    "center" | "left" | "right",
  ];

  return (
    <ToastPrimitive.Provider {...props} limit={limit} toastManager={toast}>
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport
          ref={viewportRef}
          {...stylex.props(
            styles.viewport,
            verticalPosition === "top" ? styles.viewportTop : styles.viewportBottom,
            horizontalPosition === "left" && styles.viewportLeft,
            horizontalPosition === "center" && styles.viewportCenter,
            horizontalPosition === "right" && styles.viewportRight,
          )}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <ToastList isExpanded={isExpanded} position={position} viewportRef={viewportRef} />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  );
}
