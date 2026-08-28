import {
  colorVars,
  motionVars,
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
import { useStoryColorMode, useStorySource } from "./story-source-context";

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
  codeActions: { alignItems: "center", display: "flex", gap: spacingVars.space1 },
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
    maxHeight: "80rem",
    overflowX: "auto",
    overflowY: "auto",
    padding: spacingVars.space4,
    tabSize: 2,
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "max-height",
    transitionTimingFunction: motionVars.easingStandard,
    whiteSpace: "pre",
  },
  preCollapsed: { maxHeight: "18rem", overflowY: "hidden" },
});

type HighlightedToken = {
  content: string;
  variants: {
    dark?: { color?: string };
    light?: { color?: string };
  };
};

async function createCodeHighlighter() {
  const [core, engine, bash, tsx, githubDark, githubLight] = await Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
    import("shiki/langs/bash.mjs"),
    import("shiki/langs/tsx.mjs"),
    import("shiki/themes/github-dark.mjs"),
    import("shiki/themes/github-light.mjs"),
  ]);

  return core.createHighlighterCore({
    engine: engine.createJavaScriptRegexEngine(),
    langs: [bash.default, tsx.default],
    themes: [githubDark.default, githubLight.default],
  });
}

let codeHighlighterPromise: ReturnType<typeof createCodeHighlighter> | undefined;

function getCodeHighlighter() {
  codeHighlighterPromise ??= createCodeHighlighter();
  return codeHighlighterPromise;
}

function normalizeCode(code: string) {
  return code
    .split("\n")
    .map((line) => line.replaceAll("\t", "  ").trimEnd())
    .join("\n")
    .trim();
}

function CodeBlock({
  code,
  collapsible = false,
  label,
  language,
}: {
  code: string;
  collapsible?: boolean;
  label: string;
  language: "bash" | "tsx";
}) {
  const colorMode = useStoryColorMode();
  const [highlightedLines, setHighlightedLines] = useState<HighlightedToken[][]>();
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const normalizedCode = normalizeCode(code);
  const canCollapse = collapsible && normalizedCode.split("\n").length > 12;

  useEffect(() => {
    let isActive = true;

    void getCodeHighlighter()
      .then((highlighter) => {
        const lines = highlighter.codeToTokensWithThemes(normalizedCode, {
          lang: language,
          themes: { dark: "github-dark", light: "github-light" },
        });
        if (isActive) setHighlightedLines(lines);
      })
      .catch(() => {
        if (isActive) setHighlightedLines(undefined);
      });

    return () => {
      isActive = false;
    };
  }, [language, normalizedCode]);

  useEffect(() => {
    if (!isCopied) return;

    const timeoutId = window.setTimeout(() => setIsCopied(false), 1600);
    return () => window.clearTimeout(timeoutId);
  }, [isCopied]);

  return (
    <div {...stylex.props(styles.codeBlock)}>
      <div {...stylex.props(styles.codeToolbar)}>
        <span {...stylex.props(styles.codeLabel)}>{label}</span>
        <div {...stylex.props(styles.codeActions)}>
          {canCollapse ? (
            <Button size="sm" variant="ghost" onClick={() => setIsExpanded((current) => !current)}>
              {isExpanded ? "코드 접기" : "코드 펼치기"}
              <Icon
                aria-hidden="true"
                name={isExpanded ? "chevronUp" : "chevronDown"}
                weight="regular"
              />
            </Button>
          ) : null}
          <Button
            aria-label={isCopied ? "복사됨" : `${label} 복사`}
            size="sm"
            variant="ghost"
            xstyle={storyStyles.copyButton}
            onClick={() => {
              void navigator.clipboard.writeText(normalizedCode).then(() => setIsCopied(true));
            }}
          >
            <Icon aria-hidden="true" name={isCopied ? "check" : "copy"} weight="regular" />
          </Button>
        </div>
      </div>
      <pre {...stylex.props(styles.pre, canCollapse && !isExpanded && styles.preCollapsed)}>
        <code>
          {highlightedLines
            ? highlightedLines.map((line, lineIndex) => (
                <span key={lineIndex}>
                  {line.map((token, tokenIndex) => (
                    <span
                      key={`${lineIndex}-${tokenIndex}`}
                      style={{ color: token.variants[colorMode]?.color }}
                    >
                      {token.content}
                    </span>
                  ))}
                  {lineIndex < highlightedLines.length - 1 ? "\n" : null}
                </span>
              ))
            : normalizedCode}
        </code>
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
  const storySource = useStorySource();
  const componentDocument = getComponentDocument(title, storySource);
  const installCommand = `pnpm dlx @cachette/cli add ${componentDocument.registryName}`;

  return (
    <main {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>{title}</h1>
        <p {...stylex.props(styles.description)}>{description}</p>
      </header>
      {children}
      <StorySection
        title="설치"
        description="초기 설정에 지정한 경로와 별칭을 기준으로 필요한 파일을 추가합니다."
      >
        <CodeBlock code={installCommand} label="터미널" language="bash" />
      </StorySection>
      <StorySection
        title="사용 예"
        description="스토리에 표시한 예시 코드를 확인하고 복사할 수 있습니다."
      >
        <CodeBlock code={componentDocument.usage} collapsible label="TSX" language="tsx" />
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
