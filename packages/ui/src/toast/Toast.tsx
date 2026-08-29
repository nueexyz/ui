import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import * as stylex from "@stylexjs/stylex";
import { useLayoutEffect, useRef, useState, type ComponentProps, type RefObject } from "react";

import { Icon, type IconName } from "../Icon";
import { styles } from "./toast.stylex";

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
