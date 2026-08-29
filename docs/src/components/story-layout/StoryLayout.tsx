import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Button } from "@dumo/ui/button";
import { Icon } from "@dumo/ui/icon";
import { type ReactNode, useEffect, useState } from "react";

import { useStoryColorMode } from "./story-source-context";

export const storyStyles = stylex.create({
  page: {
    backgroundColor: colorVars.bgSurface,
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space8,
    marginInline: "auto",
    maxWidth: "48rem",
    padding: spacingVars.space8,
    "@media (max-width: 40rem)": { padding: spacingVars.space4 },
  },
  header: {
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: sizeVars.stroke,
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space2,
    paddingBottom: spacingVars.space5,
  },
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
  section: { display: "flex", flexDirection: "column", gap: spacingVars.space3 },
  sectionHeader: { display: "flex", flexDirection: "column", gap: spacingVars.space2 },
  sectionTitle: {
    fontSize: typographyVars.fontSizeLg,
    fontWeight: typographyVars.fontWeightSemibold,
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
    fontSize: typographyVars.fontSizeSm,
    gap: spacingVars.space3,
    lineHeight: typographyVars.lineHeightNormal,
    minHeight: "7rem",
    padding: spacingVars.space6,
  },
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
  exampleContent: { display: "flex", flexDirection: "column", gap: spacingVars.space4 },
  propsTable: {
    borderCollapse: "collapse",
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    width: "100%",
  },
  propsCell: {
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: sizeVars.stroke,
    paddingBlock: spacingVars.space3,
    paddingInlineEnd: spacingVars.space3,
    textAlign: "left",
    verticalAlign: "top",
  },
  propsHeader: { color: colorVars.fgSecondary, fontWeight: typographyVars.fontWeightMedium },
  propsName: {
    color: colorVars.fgPrimary,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  },
});

const styles = stylex.create({
  codeBlock: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.lg,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    overflow: "hidden",
  },
  codeAccordion: {
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.lg,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    overflow: "hidden",
  },
  codeSummary: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    listStyle: "none",
    minHeight: sizeVars.controlMd,
    paddingInline: spacingVars.space3,
    justifyContent: "space-between",
  },
  codeToolbar: {
    alignItems: "center",
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: sizeVars.stroke,
    display: "flex",
    justifyContent: "space-between",
    paddingBlock: spacingVars.space1,
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
    overflowX: "auto",
    overflowY: "auto",
    padding: spacingVars.space3,
    tabSize: 2,
    whiteSpace: "pre",
  },
});

type HighlightedToken = {
  content: string;
  variants: {
    dark?: { color?: string };
    light?: { color?: string };
  };
};

async function createCodeHighlighter() {
  const [core, engine, bash, json, tsx, githubDark, githubLight] = await Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
    import("shiki/langs/bash.mjs"),
    import("shiki/langs/json.mjs"),
    import("shiki/langs/tsx.mjs"),
    import("shiki/themes/github-dark.mjs"),
    import("shiki/themes/github-light.mjs"),
  ]);

  return core.createHighlighterCore({
    engine: engine.createJavaScriptRegexEngine(),
    langs: [bash.default, json.default, tsx.default],
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

function splitUsage(usage: string) {
  const [imports, ...componentLines] = normalizeCode(usage).split("\n\n");
  return { component: componentLines.join("\n\n"), imports };
}

export function ComponentExample({ children }: { children: ReactNode }) {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <h2 {...stylex.props(storyStyles.sectionTitle)}>Usage</h2>
      <div {...stylex.props(storyStyles.exampleContent)}>{children}</div>
    </section>
  );
}

export function ComponentCode({ usage }: { usage: string }) {
  const { component, imports } = splitUsage(usage);

  return (
    <section {...stylex.props(storyStyles.section)}>
      <h2 {...stylex.props(storyStyles.sectionTitle)}>Code</h2>
      <div {...stylex.props(storyStyles.exampleContent)}>
        <CodeBlock code={imports} label="Import" language="tsx" />
        {component ? <CodeBlock code={component} label="Component" language="tsx" /> : null}
      </div>
    </section>
  );
}

export function ComponentPropsTable({
  props,
}: {
  props?: readonly { defaultValue?: string; description: string; name: string; type: string }[];
}) {
  if (!props?.length) return null;

  return (
    <section {...stylex.props(storyStyles.section)}>
      <h2 {...stylex.props(storyStyles.sectionTitle)}>Props</h2>
      <table {...stylex.props(storyStyles.propsTable)}>
        <thead>
          <tr>
            <th {...stylex.props(storyStyles.propsCell, storyStyles.propsHeader)}>Name</th>
            <th {...stylex.props(storyStyles.propsCell, storyStyles.propsHeader)}>Type</th>
            <th {...stylex.props(storyStyles.propsCell, storyStyles.propsHeader)}>Default</th>
            <th {...stylex.props(storyStyles.propsCell, storyStyles.propsHeader)}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <td {...stylex.props(storyStyles.propsCell, storyStyles.propsName)}>{prop.name}</td>
              <td {...stylex.props(storyStyles.propsCell, storyStyles.propsName)}>{prop.type}</td>
              <td {...stylex.props(storyStyles.propsCell, storyStyles.propsName)}>
                {prop.defaultValue ?? "–"}
              </td>
              <td {...stylex.props(storyStyles.propsCell)}>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function CodeBlock({
  code,
  collapsible = false,
  label,
  language,
}: {
  code: string;
  collapsible?: boolean;
  label: string;
  language: "bash" | "json" | "tsx";
}) {
  const colorMode = useStoryColorMode();
  const [highlightedLines, setHighlightedLines] = useState<HighlightedToken[][]>();
  const [isCopied, setIsCopied] = useState(false);
  const normalizedCode = normalizeCode(code);

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

  const content = (
    <div {...stylex.props(styles.codeBlock)}>
      <div {...stylex.props(styles.codeToolbar)}>
        <span {...stylex.props(styles.codeLabel)}>{label}</span>
        <div {...stylex.props(styles.codeActions)}>
          <Button
            aria-label={isCopied ? "Copied" : `Copy ${label}`}
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
      <pre {...stylex.props(styles.pre)}>
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

  if (!collapsible) return content;

  return (
    <details {...stylex.props(styles.codeAccordion)}>
      <summary {...stylex.props(styles.codeSummary)}>
        View code
        <Icon aria-hidden="true" name="chevronDown" weight="regular" />
      </summary>
      {content}
    </details>
  );
}
