import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

export const storyStyles = stylex.create({
  column: { alignItems: "stretch", flexDirection: "column" },
  field: { display: "flex", flexDirection: "column", gap: spacingVars.space2 },
  formWidth: { maxWidth: sizeVars.contentSm, width: "100%" },
  grid: {
    alignItems: "start",
    display: "grid",
    gap: spacingVars.space4,
    gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
    width: "100%",
  },
  inverse: { backgroundColor: colorVars.bgActionPrimary },
  option: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space3,
    minHeight: sizeVars.touchTarget,
  },
  stack: { display: "flex", flexDirection: "column", gap: spacingVars.space3 },
});

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space10,
    marginInline: "auto",
    maxWidth: "64rem",
    padding: spacingVars.space8,
  },
  header: { display: "flex", flexDirection: "column", gap: spacingVars.space2 },
  title: {
    fontSize: typographyVars.fontSizeXl,
    lineHeight: typographyVars.lineHeightTight,
    margin: 0,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  section: { display: "flex", flexDirection: "column", gap: spacingVars.space4 },
  sectionHeader: { display: "flex", flexDirection: "column", gap: spacingVars.space1 },
  sectionTitle: {
    fontSize: typographyVars.fontSizeLg,
    lineHeight: typographyVars.lineHeightTight,
    margin: 0,
  },
  preview: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.lg,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "flex",
    flexWrap: "wrap",
    gap: spacingVars.space3,
    minHeight: "7rem",
    padding: spacingVars.space6,
  },
});

export function StoryPage({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <main {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>{title}</h1>
        <p {...stylex.props(styles.description)}>{description}</p>
      </header>
      {children}
    </main>
  );
}

export function StorySection({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <section {...stylex.props(styles.section)}>
      <header {...stylex.props(styles.sectionHeader)}>
        <h2 {...stylex.props(styles.sectionTitle)}>{title}</h2>
        <p {...stylex.props(styles.description)}>{description}</p>
      </header>
      {children}
    </section>
  );
}

export function StoryPreview({
  children,
  xstyle,
}: {
  children: ReactNode;
  xstyle?: stylex.StyleXStyles;
}) {
  return <div {...stylex.props(styles.preview, xstyle)}>{children}</div>;
}
