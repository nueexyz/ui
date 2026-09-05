import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import { colorVars, radiusVars, spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: {
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.sm,
    color: colorVars.fgPrimary,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  md: {
    gap: spacingVars.space2,
    paddingBlock: spacingVars.space3,
    paddingInline: spacingVars.space4,
  },
  sm: {
    borderRadius: radiusVars.sm,
    gap: spacingVars.space1,
    paddingBlock: spacingVars.space2,
    paddingInline: spacingVars.space3,
  },
  content: { display: "grid", gap: spacingVars.space1, minWidth: 0 },
  action: { alignItems: "center", display: "flex", gap: spacingVars.space2 },
  title: {
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightSemibold,
    lineHeight: typographyVars.lineHeightTight,
  },
  description: {
    color: "currentColor",
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    opacity: 0.82,
  },
});

export type BannerSize = "md" | "sm";
export type BannerAnnounce = "assertive" | "polite";

type StyleProps = { xstyle?: stylex.StyleXStyles };

export type BannerProps = Omit<ComponentProps<"div">, "title" | "className" | "style"> &
  StyleProps & {
    action?: ReactNode;
    /** Announces a Banner that is added or updated after the initial page render. */
    announce?: BannerAnnounce;
    description?: ReactNode;
    size?: BannerSize;
    title?: ReactNode;
  };

export function Banner({
  action,
  announce,
  children,
  description,
  role,
  size = "md",
  title,
  xstyle,
  ...props
}: BannerProps) {
  let liveRole: "alert" | "status" | undefined;
  if (announce === "assertive") {
    liveRole = "alert";
  } else if (announce === "polite") {
    liveRole = "status";
  }

  return (
    <div {...props} role={role ?? liveRole} {...stylex.props(styles.root, styles[size], xstyle)}>
      <div {...stylex.props(styles.content)}>
        {title ? <BannerTitle>{title}</BannerTitle> : null}
        {description ? <BannerDescription>{description}</BannerDescription> : null}
        {children}
      </div>
      {action ? <div {...stylex.props(styles.action)}>{action}</div> : null}
    </div>
  );
}

export function BannerTitle({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.title, xstyle)} />;
}

export function BannerDescription({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.description, xstyle)} />;
}
