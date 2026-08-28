import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

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

function ToastList({ position }: { position: ToastPosition }) {
  const { toasts } = ToastPrimitive.useToastManager();
  const isTop = position.startsWith("top");

  return toasts.map((item) => (
    <ToastPrimitive.Root
      key={item.id}
      toast={item}
      className={(state) =>
        stylex.props(
          styles.root,
          isTop && styles.rootTop,
          state.expanded && styles.rootExpanded,
          state.expanded && isTop && styles.rootExpandedTop,
          state.limited && styles.rootLimited,
          state.swiping && styles.rootSwiping,
          state.transitionStatus === "starting" && styles.rootStarting,
          state.transitionStatus === "starting" && isTop && styles.rootStartingTop,
          state.transitionStatus === "ending" && styles.rootEnding,
          state.transitionStatus === "ending" && isTop && styles.rootEndingTop,
          state.transitionStatus === "ending" &&
            state.swipeDirection === "up" &&
            styles.rootEndingUp,
          state.transitionStatus === "ending" &&
            state.swipeDirection === "left" &&
            styles.rootEndingLeft,
          state.transitionStatus === "ending" &&
            state.swipeDirection === "right" &&
            styles.rootEndingRight,
        ).className ?? ""
      }
      style={(state) =>
        stylex.props(
          styles.root,
          isTop && styles.rootTop,
          state.expanded && styles.rootExpanded,
          state.expanded && isTop && styles.rootExpandedTop,
          state.limited && styles.rootLimited,
          state.swiping && styles.rootSwiping,
          state.transitionStatus === "starting" && styles.rootStarting,
          state.transitionStatus === "starting" && isTop && styles.rootStartingTop,
          state.transitionStatus === "ending" && styles.rootEnding,
          state.transitionStatus === "ending" && isTop && styles.rootEndingTop,
          state.transitionStatus === "ending" &&
            state.swipeDirection === "up" &&
            styles.rootEndingUp,
          state.transitionStatus === "ending" &&
            state.swipeDirection === "left" &&
            styles.rootEndingLeft,
          state.transitionStatus === "ending" &&
            state.swipeDirection === "right" &&
            styles.rootEndingRight,
        ).style
      }
    >
      <ToastPrimitive.Content
        className={(state) =>
          stylex.props(
            styles.content,
            state.behind && styles.contentBehind,
            state.expanded && styles.contentExpanded,
          ).className ?? ""
        }
        style={(state) =>
          stylex.props(
            styles.content,
            state.behind && styles.contentBehind,
            state.expanded && styles.contentExpanded,
          ).style
        }
      >
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
  ));
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
          <ToastList position={position} />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  );
}
