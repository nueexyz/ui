import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Icon, type IconName } from "../Icon";
import { styles } from "./toast.stylex";

type ToastType = "default" | "success" | "info" | "warning" | "error" | "loading";

export type ToasterProps = Omit<
  ComponentProps<typeof ToastPrimitive.Provider>,
  "children" | "toastManager"
>;

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

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager();

  return toasts.map((item) => (
    <ToastPrimitive.Root
      key={item.id}
      toast={item}
      className={(state) =>
        stylex.props(
          styles.root,
          state.expanded && styles.rootExpanded,
          state.limited && styles.rootLimited,
          state.swiping && styles.rootSwiping,
          state.transitionStatus === "starting" && styles.rootStarting,
          state.transitionStatus === "ending" && styles.rootEnding,
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
          state.expanded && styles.rootExpanded,
          state.limited && styles.rootLimited,
          state.swiping && styles.rootSwiping,
          state.transitionStatus === "starting" && styles.rootStarting,
          state.transitionStatus === "ending" && styles.rootEnding,
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

export function Toaster(props: ToasterProps) {
  return (
    <ToastPrimitive.Provider {...props} toastManager={toast}>
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport {...stylex.props(styles.viewport)}>
          <ToastList />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  );
}
