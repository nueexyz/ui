import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  card: {
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space1,
    paddingBlock: spacingVars.space6,
    paddingInline: spacingVars.space6,
  },
  title: {
    fontSize: typographyVars.fontSizeLg,
    fontWeight: typographyVars.fontWeightSemibold,
    lineHeight: typographyVars.lineHeightTight,
    margin: 0,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  content: {
    paddingBlockEnd: spacingVars.space6,
    paddingInline: spacingVars.space6,
  },
  footer: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space3,
    paddingBlockEnd: spacingVars.space6,
    paddingInline: spacingVars.space6,
  },
});

type StyleProps = {
  xstyle?: stylex.StyleXStyles;
};

type ElementProps = ComponentProps<"div"> & StyleProps;
type HeadingProps = ComponentProps<"h3"> & StyleProps;
type ParagraphProps = ComponentProps<"p"> & StyleProps;

export function Card({ className, style, xstyle, ...props }: ElementProps) {
  const stylexProps = stylex.props(styles.card, xstyle);

  return (
    <div
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function CardHeader({ className, style, xstyle, ...props }: ElementProps) {
  const stylexProps = stylex.props(styles.header, xstyle);

  return (
    <div
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function CardTitle({ children, className, style, xstyle, ...props }: HeadingProps) {
  const stylexProps = stylex.props(styles.title, xstyle);

  return (
    <h3
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, style, xstyle, ...props }: ParagraphProps) {
  const stylexProps = stylex.props(styles.description, xstyle);

  return (
    <p
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function CardContent({ className, style, xstyle, ...props }: ElementProps) {
  const stylexProps = stylex.props(styles.content, xstyle);

  return (
    <div
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}

export function CardFooter({ className, style, xstyle, ...props }: ElementProps) {
  const stylexProps = stylex.props(styles.footer, xstyle);

  return (
    <div
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(" ")}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}
