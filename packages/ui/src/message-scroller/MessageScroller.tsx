import * as stylex from "@stylexjs/stylex";
import { type ComponentProps, type ReactNode, useEffect, useRef, useState } from "react";

import { Button } from "../button";
import { Icon } from "../Icon";
import { styles } from "./message-scroller.stylex";

export type MessageScrollerProps = ComponentProps<"div"> & {
  children: ReactNode;
  /** 새 메시지가 추가될 때 마지막 메시지를 계속 보여줍니다. @default true */
  followOutput?: boolean;
  scrollLabel?: string;
  xstyle?: stylex.StyleXStyles;
};

export function MessageScroller({
  children,
  className,
  followOutput = true,
  scrollLabel = "마지막 메시지로 이동",
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
