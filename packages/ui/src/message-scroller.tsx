import * as stylex from "@stylexjs/stylex";
import { type ComponentProps, type ReactNode, useEffect, useRef, useState } from "react";

import { Button } from "./button";
import { Icon } from "./Icon";
import { colorVars, motionVars, radiusVars, spacingVars } from "@nooeh/tokens/semantic.stylex";

const styles = stylex.create({
  root: { minHeight: 0, overflow: "hidden", position: "relative" },
  viewport: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space4,
    height: "100%",
    overflowY: "auto",
    overscrollBehavior: "contain",
    scrollBehavior: "smooth",
    scrollbarColor: `${colorVars.strokeStrong} transparent`,
    "@media (prefers-reduced-motion: reduce)": { scrollBehavior: "auto" },
  },
  action: {
    borderRadius: radiusVars.full,
    bottom: spacingVars.space3,
    left: "50%",
    minWidth: "2rem",
    opacity: 1,
    position: "absolute",
    transform: "translateX(-50%)",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "opacity, transform",
  },
});

export type MessageScrollerProps = ComponentProps<"div"> & {
  children: ReactNode;
  /** Keeps the latest message in view when new messages are added. @default true */
  followOutput?: boolean;
  scrollLabel?: string;
  xstyle?: stylex.StyleXStyles;
};

export function MessageScroller({
  children,
  className,
  followOutput = true,
  scrollLabel = "Scroll to latest message",
  style,
  xstyle,
  ...props
}: MessageScrollerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isAtEnd, setIsAtEnd] = useState(true);

  useEffect(() => {
    if (followOutput && isAtEnd)
      viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight });
  }, [children, followOutput, isAtEnd]);

  const resolved = stylex.props(styles.root, xstyle);
  return (
    <div
      {...props}
      className={[resolved.className, className].filter(Boolean).join(" ")}
      style={{ ...resolved.style, ...style }}
    >
      <div
        ref={viewportRef}
        {...stylex.props(styles.viewport)}
        onScroll={(event) => {
          const target = event.currentTarget;
          setIsAtEnd(target.scrollHeight - target.scrollTop - target.clientHeight < 4);
        }}
      >
        {children}
      </div>
      {!isAtEnd ? (
        <Button
          aria-label={scrollLabel}
          size="sm"
          variant="secondary"
          xstyle={styles.action}
          onClick={() =>
            viewportRef.current?.scrollTo({
              behavior: "smooth",
              top: viewportRef.current.scrollHeight,
            })
          }
        >
          <Icon name="arrowDown" />
        </Button>
      ) : null}
    </div>
  );
}
