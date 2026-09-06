import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import { isValidElement, type ReactNode } from "react";
import type { Components } from "react-markdown";

import { CodeBlock } from "./CodeBlock";

const styles = stylex.create({
  h1: {
    color: colorVars.fgPrimary,
    fontFamily: typographyVars.fontFamilyHeading,
    fontSize: typographyVars.fontSizeXl,
    fontWeight: typographyVars.fontWeightSemibold,
    lineHeight: typographyVars.lineHeightTight,
    marginBlock: spacingVars.space6,
  },
  h2: {
    color: colorVars.fgPrimary,
    fontFamily: typographyVars.fontFamilyHeading,
    fontSize: typographyVars.fontSizeLg,
    fontWeight: typographyVars.fontWeightSemibold,
    lineHeight: typographyVars.lineHeightTight,
    marginTop: spacingVars.space8,
    marginBottom: spacingVars.space4,
    paddingBottom: spacingVars.space2,
    borderBottom: `${sizeVars.stroke} solid ${colorVars.strokeDefault}`,
  },
  h3: {
    color: colorVars.fgPrimary,
    fontFamily: typographyVars.fontFamilyHeading,
    fontSize: typographyVars.fontSizeMd,
    fontWeight: typographyVars.fontWeightSemibold,
    marginTop: spacingVars.space6,
    marginBottom: spacingVars.space3,
  },
  p: {
    color: colorVars.fgSecondary,
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    marginBlock: spacingVars.space3,
  },
  list: {
    color: colorVars.fgSecondary,
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    paddingInlineStart: spacingVars.space6,
    marginBlock: spacingVars.space3,
  },
  ordered: { listStyleType: "decimal" },
  unordered: { listStyleType: "disc" },
  item: { marginBlock: spacingVars.space2 },
  link: { color: colorVars.fgAction, textDecoration: "underline", textUnderlineOffset: "0.2em" },
  scroll: { overflowX: "auto", marginBlock: spacingVars.space4 },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
  },
  cell: {
    borderBottom: `${sizeVars.stroke} solid ${colorVars.strokeDefault}`,
    color: colorVars.fgPrimary,
    paddingBlock: spacingVars.space3,
    paddingInline: spacingVars.space3,
    textAlign: "start",
    verticalAlign: "top",
  },
  th: { backgroundColor: colorVars.bgSubtle, fontWeight: typographyVars.fontWeightSemibold },
  code: {
    backgroundColor: colorVars.bgSubtle,
    color: colorVars.fgPrimary,
    borderRadius: radiusVars.sm,
    paddingInline: spacingVars.space1,
    fontSize: "0.9em",
  },
  quote: {
    borderInlineStart: `${sizeVars.focusRing} solid ${colorVars.strokeStrong}`,
    color: colorVars.fgSecondary,
    paddingInlineStart: spacingVars.space4,
    marginInline: 0,
  },
});

export const documentationComponents: Components = {
  h1: ({ node: _node, children, ...props }) => (
    <h1 {...props} {...stylex.props(styles.h1)}>
      {children}
    </h1>
  ),
  h2: ({ node: _node, children, ...props }) => (
    <h2 {...props} {...stylex.props(styles.h2)}>
      {children}
    </h2>
  ),
  h3: ({ node: _node, children, ...props }) => (
    <h3 {...props} {...stylex.props(styles.h3)}>
      {children}
    </h3>
  ),
  p: ({ node: _node, ...props }) => <p {...props} {...stylex.props(styles.p)} />,
  ul: ({ node: _node, ...props }) => (
    <ul {...props} {...stylex.props(styles.list, styles.unordered)} />
  ),
  ol: ({ node: _node, ...props }) => (
    <ol {...props} {...stylex.props(styles.list, styles.ordered)} />
  ),
  li: ({ node: _node, ...props }) => <li {...props} {...stylex.props(styles.item)} />,
  a: ({ node: _node, children, ...props }) => (
    <a {...props} {...stylex.props(styles.link)}>
      {children}
    </a>
  ),
  table: ({ node: _node, ...props }) => (
    <div {...stylex.props(styles.scroll)}>
      <table {...props} {...stylex.props(styles.table)} />
    </div>
  ),
  th: ({ node: _node, ...props }) => <th {...props} {...stylex.props(styles.cell, styles.th)} />,
  td: ({ node: _node, ...props }) => <td {...props} {...stylex.props(styles.cell)} />,
  code: ({ node: _node, ...props }) => <code {...props} {...stylex.props(styles.code)} />,
  blockquote: ({ node: _node, ...props }) => (
    <blockquote {...props} {...stylex.props(styles.quote)} />
  ),
  pre: ({ children }) => {
    if (!isValidElement<{ children?: ReactNode; className?: string }>(children))
      return <pre>{children}</pre>;
    const code = String(children.props.children ?? "").trimEnd();
    const languages: Record<string, "tsx" | "json" | "bash"> = {
      "language-tsx": "tsx",
      "language-json": "json",
      "language-bash": "bash",
    };
    const language = languages[children.props.className ?? ""] ?? "tsx";
    return <CodeBlock code={code} language={language} />;
  },
};
