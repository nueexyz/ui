import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Button } from "@cachette/ui/button";
import { Icon } from "@cachette/ui/icon";
import { type ReactNode, useEffect, useState } from "react";

import { getComponentDocument } from "./component-docs";

export const storyStyles = stylex.create({
  column: { alignItems: "stretch", flexDirection: "column" },
  field: { display: "flex", flexDirection: "column", gap: spacingVars.space2 },
  formWidth: { maxWidth: sizeVars.contentSm, width: "100%" },
  componentWidth: { maxWidth: "28rem", width: "100%" },
  contextTarget: {
    alignItems: "center",
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.md,
    borderStyle: "dashed",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgSecondary,
    display: "flex",
    fontSize: typographyVars.fontSizeSm,
    height: "10rem",
    justifyContent: "center",
    maxWidth: "28rem",
    width: "100%",
  },
  grid: {
    alignItems: "start",
    display: "grid",
    gap: spacingVars.space4,
    gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
    width: "100%",
  },
  inverse: { backgroundColor: colorVars.bgActionPrimary },
  inverseSecondary: {
    backgroundColor: colorVars.fgInverse,
    borderColor: colorVars.fgInverse,
    color: colorVars.bgActionPrimary,
  },
  inverseGhost: {
    color: colorVars.fgInverse,
  },
  option: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space3,
    minHeight: sizeVars.touchTarget,
  },
  navigationGrid: {
    display: "grid",
    gap: spacingVars.space1,
    listStyle: "none",
    margin: 0,
    padding: 0,
    width: "24rem",
  },
  navigationGridCompact: { width: "18rem" },
  navigationContent: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space1,
  },
  navigationTitle: {
    display: "block",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
  },
  navigationDescription: {
    color: colorVars.fgSecondary,
    display: "block",
    fontSize: typographyVars.fontSizeXs,
    lineHeight: typographyVars.lineHeightNormal,
    marginTop: spacingVars.space1,
  },
  stack: { display: "flex", flexDirection: "column", gap: spacingVars.space3 },
  copyButton: { minWidth: sizeVars.controlSm, paddingInline: spacingVars.space2 },
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
    fontSize: typographyVars.fontSizeSm,
    flexWrap: "wrap",
    gap: spacingVars.space3,
    minHeight: "7rem",
    padding: spacingVars.space6,
    lineHeight: typographyVars.lineHeightNormal,
  },
  codeBlock: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.lg,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    overflow: "hidden",
  },
  codeToolbar: {
    alignItems: "center",
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: sizeVars.stroke,
    display: "flex",
    justifyContent: "space-between",
    minHeight: sizeVars.touchTarget,
    paddingInline: spacingVars.space3,
  },
  codeLabel: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
  },
  pre: {
    color: colorVars.fgPrimary,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
    overflowX: "auto",
    padding: spacingVars.space4,
    whiteSpace: "pre",
  },
});

function CodeBlock({ code, label }: { code: string; label: string }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;

    const timeoutId = window.setTimeout(() => setIsCopied(false), 1600);
    return () => window.clearTimeout(timeoutId);
  }, [isCopied]);

  return (
    <div {...stylex.props(styles.codeBlock)}>
      <div {...stylex.props(styles.codeToolbar)}>
        <span {...stylex.props(styles.codeLabel)}>{label}</span>
        <Button
          aria-label={isCopied ? "복사됨" : `${label} 복사`}
          size="sm"
          variant="ghost"
          xstyle={storyStyles.copyButton}
          onClick={() => {
            void navigator.clipboard.writeText(code).then(() => setIsCopied(true));
          }}
        >
          <Icon aria-hidden="true" name={isCopied ? "checkDouble" : "copy"} weight="regular" />
        </Button>
      </div>
      <pre {...stylex.props(styles.pre)}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function StoryPage({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  const componentDocument = getComponentDocument(title);
  const installCommand = `pnpm dlx shadcn@latest add myjeong19/mds/${componentDocument.registryName}`;

  return (
    <main {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>{title}</h1>
        <p {...stylex.props(styles.description)}>{description}</p>
      </header>
      {children}
      <StorySection title="사용 예" description="코드를 복사해 프로젝트에 맞게 수정하세요.">
        <CodeBlock code={componentDocument.usage} label="TSX" />
      </StorySection>
      <StorySection
        title="설치"
        description="레지스트리에서 컴포넌트와 필요한 의존성을 함께 가져옵니다."
      >
        <CodeBlock code={installCommand} label="터미널" />
      </StorySection>
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
