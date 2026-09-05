import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import * as stylex from "@stylexjs/stylex";
import { CheckCircleIcon, InfoIcon, WarningIcon, XCircleIcon, XIcon } from "@phosphor-icons/react";
import { useLayoutEffect, useRef, useState, type ComponentProps } from "react";

import {
  colorVars,
  motionVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import { toastViewportVars } from "./toast.stylex";

const spin = stylex.keyframes({ to: { transform: "rotate(360deg)" } });

const styles = stylex.create({
  viewport: {
    maxWidth: "24rem",
    outline: "none",
    pointerEvents: "none",
    position: "fixed",
    width: "calc(100vw - 2rem)",
    zIndex: 70,
    [toastViewportVars.stackPointerEvents]: {
      default: "none",
      ":is([data-expanded])": "auto",
    },
    [toastViewportVars.clearActionOffset]: {
      default: "0px",
      ":is([data-expanded])": "2.25rem",
    },
    [toastViewportVars.clearActionOpacity]: {
      default: "0",
      ":is([data-expanded])": "1",
    },
    [toastViewportVars.clearActionPointerEvents]: {
      default: "none",
      ":is([data-expanded])": "auto",
    },
  },
  viewportTop: { top: spacingVars.space4 },
  viewportBottom: { bottom: spacingVars.space4 },
  viewportLeft: { left: spacingVars.space4 },
  viewportCenter: { left: "50%", transform: "translateX(-50%)" },
  viewportRight: { right: spacingVars.space4 },
  stack: (height: number | string) => ({
    bottom: 0,
    height,
    left: 0,
    pointerEvents: toastViewportVars.stackPointerEvents,
    position: "absolute",
    right: 0,
  }),
  stackTop: { bottom: "auto", top: 0 },
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
    transition: `transform ${motionVars.durationSlow} ${motionVars.easingEnter}, opacity ${motionVars.durationNormal} ${motionVars.easingStandard}, height ${motionVars.durationNormal} ${motionVars.easingStandard}`,
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
      transitionDuration: motionVars.durationInstant,
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
    transitionTimingFunction: motionVars.easingStandard,
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
  statusIconWithDescription: { alignSelf: "flex-start", marginTop: "0.0625rem" },
  loadingIcon: {
    animationDuration: "700ms",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.full,
    borderStyle: "solid",
    borderWidth: sizeVars.focusRing,
    flexShrink: 0,
    height: sizeVars.iconMd,
    width: sizeVars.iconMd,
    "@media (prefers-reduced-motion: reduce)": { animationDuration: "1.5s" },
  },
  action: {
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
    flexShrink: 0,
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    height: "1.75rem",
    justifyContent: "center",
    outline: "none",
    paddingInline: spacingVars.space3,
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color, color",
    transitionTimingFunction: motionVars.easingStandard,
    ":hover": { backgroundColor: colorVars.interactionHover },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  actionWithDescription: { alignSelf: "flex-start", marginTop: "0.0625rem" },
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
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, color",
    transitionTimingFunction: motionVars.easingStandard,
    width: "1.75rem",
    ":hover": { backgroundColor: colorVars.interactionHover, color: colorVars.fgPrimary },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  closeWithDescription: { alignSelf: "flex-start", marginTop: "0.0625rem" },
  clearAll: {
    appearance: "none",
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.strokeDefault,
    borderStyle: "solid",
    borderRadius: radiusVars.sm,
    borderWidth: sizeVars.stroke,
    color: colorVars.fgSecondary,
    cursor: "pointer",
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: "0.625rem",
    fontWeight: typographyVars.fontWeightMedium,
    height: "1.75rem",
    outline: "none",
    paddingBlock: spacingVars.space1,
    paddingInline: spacingVars.space2,
    opacity: toastViewportVars.clearActionOpacity,
    pointerEvents: toastViewportVars.clearActionPointerEvents,
    position: "absolute",
    right: 0,
    top: 0,
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, color, opacity",
    transitionTimingFunction: motionVars.easingStandard,
    zIndex: 1001,
    ":hover": { backgroundColor: colorVars.bgRaised, color: colorVars.fgPrimary },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  clearAllTop: { bottom: 0, top: "auto" },
});

export type ToastPosition =
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "top-left"
  | "top-right";

export type ToasterProps = Omit<
  ComponentProps<typeof ToastPrimitive.Provider>,
  "children" | "toastManager" | "className" | "style"
> & {
  /** Toast viewport position. @default "bottom-right" */
  position?: ToastPosition;
};

export const toast = ToastPrimitive.createToastManager();

const toastIcons = {
  success: CheckCircleIcon,
  info: InfoIcon,
  warning: WarningIcon,
  error: XCircleIcon,
};

function ToastStatusIcon({ hasDescription, type }: { hasDescription: boolean; type?: string }) {
  if (!type || type === "default") {
    return null;
  }

  if (type === "loading") {
    return <span aria-hidden="true" {...stylex.props(styles.loadingIcon)} />;
  }

  const IconComponent = toastIcons[type as keyof typeof toastIcons];
  if (!IconComponent) {
    return null;
  }

  return (
    <span
      aria-hidden="true"
      {...stylex.props(styles.statusIcon, hasDescription && styles.statusIconWithDescription)}
    >
      <IconComponent />
    </span>
  );
}

function ToastStack({ position }: { position: ToastPosition }) {
  const { toasts } = ToastPrimitive.useToastManager();
  const stackRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const isTop = position.startsWith("top");
  const hasClearAction = toasts.length > 1;
  const stackHeight = hasClearAction
    ? `calc(${height}px + ${toastViewportVars.clearActionOffset})`
    : height;

  useLayoutEffect(() => {
    const stack = stackRef.current;

    if (!stack) {
      return;
    }

    const updateHeight = () => {
      const rootList = Array.from(
        stack.querySelectorAll<HTMLElement>("[data-nuee-toast-root]:not([data-limited])"),
      );
      const toastGap =
        Number.parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.75;
      const nextHeight = rootList.reduce((maximumHeight, root) => {
        const rootStyles = getComputedStyle(root);
        const offset = Number.parseFloat(rootStyles.getPropertyValue("--toast-offset-y")) || 0;
        const index = Number.parseFloat(rootStyles.getPropertyValue("--toast-index")) || 0;
        const rootHeight =
          Number.parseFloat(rootStyles.getPropertyValue("--toast-height")) || root.offsetHeight;

        return Math.max(maximumHeight, offset + index * toastGap + rootHeight);
      }, 0);

      setHeight(nextHeight);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    const rootList = stack.querySelectorAll<HTMLElement>("[data-nuee-toast-root]");
    rootList.forEach((root) => resizeObserver.observe(root));
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [toasts]);

  return (
    <div ref={stackRef} {...stylex.props(styles.stack(stackHeight), isTop && styles.stackTop)}>
      {toasts.map((item) => (
        <ToastPrimitive.Root
          key={item.id}
          toast={item}
          data-nuee-toast-root=""
          {...stylex.props(styles.root, isTop && styles.rootTop)}
        >
          <ToastPrimitive.Content {...stylex.props(styles.content)}>
            <ToastStatusIcon hasDescription={Boolean(item.description)} type={item.type} />
            <div {...stylex.props(styles.message)}>
              <ToastPrimitive.Title {...stylex.props(styles.title)} />
              <ToastPrimitive.Description {...stylex.props(styles.description)} />
            </div>
            {item.actionProps ? (
              <ToastPrimitive.Action
                {...stylex.props(
                  styles.action,
                  Boolean(item.description) && styles.actionWithDescription,
                )}
              />
            ) : null}
            <ToastPrimitive.Close
              aria-label="Close toast"
              {...stylex.props(
                styles.close,
                Boolean(item.description) && styles.closeWithDescription,
              )}
            >
              <XIcon aria-hidden="true" />
            </ToastPrimitive.Close>
          </ToastPrimitive.Content>
        </ToastPrimitive.Root>
      ))}
      {hasClearAction ? (
        <button
          type="button"
          onClick={() => toast.close()}
          {...stylex.props(styles.clearAll, isTop && styles.clearAllTop)}
        >
          Clear all
        </button>
      ) : null}
    </div>
  );
}

export function Toaster({ limit = 3, position = "bottom-right", ...props }: ToasterProps) {
  const [verticalPosition, horizontalPosition] = position.split("-") as [
    "bottom" | "top",
    "center" | "left" | "right",
  ];

  return (
    <ToastPrimitive.Provider {...props} limit={limit} toastManager={toast}>
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport
          {...stylex.props(
            styles.viewport,
            verticalPosition === "top" ? styles.viewportTop : styles.viewportBottom,
            horizontalPosition === "left" && styles.viewportLeft,
            horizontalPosition === "center" && styles.viewportCenter,
            horizontalPosition === "right" && styles.viewportRight,
          )}
        >
          <ToastStack position={position} />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  );
}
