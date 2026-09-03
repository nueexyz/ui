import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  root: {
    alignItems: "start",
    borderRadius: radiusVars.sm,
    color: colorVars.fgPrimary,
    display: "grid",
    width: "100%",
  },
  md: {
    columnGap: spacingVars.space3,
    paddingBlock: spacingVars.space3,
    paddingInline: spacingVars.space4,
  },
  sm: {
    alignItems: "center",
    borderRadius: radiusVars.sm,
    columnGap: spacingVars.space2,
    paddingBlock: spacingVars.space2,
    paddingInline: spacingVars.space3,
  },
  withIcon: { gridTemplateColumns: `${sizeVars.iconMd} minmax(0, 1fr)` },
  withAction: { gridTemplateColumns: `minmax(0, 1fr) auto` },
  withIconAndAction: {
    gridTemplateColumns: `${sizeVars.iconMd} minmax(0, 1fr) auto`,
  },
  icon: {
    alignItems: "center",
    alignSelf: "start",
    display: "inline-flex",
    height: sizeVars.iconMd,
    justifyContent: "center",
    width: sizeVars.iconMd,
  },
  iconAlignedCenter: { alignSelf: "center" },
  content: { display: "grid", gap: spacingVars.space1, minWidth: 0 },
  action: { alignItems: "center", display: "flex", gap: spacingVars.space2 },
  info: { backgroundColor: colorVars.bgFeedbackInfo, color: colorVars.fgFeedbackInfo },
  warning: {
    backgroundColor: colorVars.bgFeedbackWarning,
    color: colorVars.fgFeedbackWarning,
  },
  error: { backgroundColor: colorVars.bgFeedbackError, color: colorVars.fgFeedbackError },
  neutral: { backgroundColor: colorVars.bgSubtle, color: colorVars.fgSecondary },
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

export type BannerVariant = "error" | "info" | "neutral" | "warning";
export type BannerSize = "md" | "sm";
export type BannerAnnounce = "assertive" | "polite";

type StyleProps = { xstyle?: stylex.StyleXStyles };

export type BannerProps = ComponentProps<"div"> &
  StyleProps & {
    action?: ReactNode;
    /** Announces a Banner that is added or updated after the initial page render. */
    announce?: BannerAnnounce;
    description?: ReactNode;
    icon?: ReactNode;
    size?: BannerSize;
    title?: ReactNode;
    variant?: BannerVariant;
  };

export function Banner({
  action,
  announce,
  children,
  className,
  description,
  icon,
  role,
  size = "md",
  style,
  title,
  variant = "info",
  xstyle,
  ...props
}: BannerProps) {
  let liveRole: "alert" | "status" | undefined;
  if (announce === "assertive") {
    liveRole = "alert";
  } else if (announce === "polite") {
    liveRole = "status";
  }

  const stylexProps = stylex.props(
    styles.root,
    styles[size],
    styles[variant],
    Boolean(icon) && styles.withIcon,
    Boolean(action) && styles.withAction,
    Boolean(icon) && Boolean(action) && styles.withIconAndAction,
    xstyle,
  );

  return (
    <div
      {...props}
      role={role ?? liveRole}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    >
      {icon ? (
        <span {...stylex.props(styles.icon, size === "sm" && styles.iconAlignedCenter)}>
          {icon}
        </span>
      ) : null}
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
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  const stylexProps = stylex.props(styles.title, xstyle);
  return (
    <div
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function BannerDescription({
  className,
  style,
  xstyle,
  ...props
}: ComponentProps<"div"> & StyleProps) {
  const stylexProps = stylex.props(styles.description, xstyle);
  return (
    <div
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}
