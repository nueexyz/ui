import {
  darkColorTheme,
  darkShadowTheme,
  lightColorTheme,
  lightShadowTheme,
} from "@nuee/tokens/themes.stylex";
import { colorVars, spacingVars, typographyVars } from "@nuee/tokens/tokens.stylex";
import {
  DocsContainer,
  TableOfContents,
  type DocsContainerProps,
} from "@storybook/addon-docs/blocks";
import type { Preview } from "@storybook/react-vite";

import "@nuee/ui/global.css";
import "./preview.css";
import * as stylex from "@stylexjs/stylex";
import { type ReactNode, useLayoutEffect, useEffect, useState } from "react";
import { themes } from "storybook/theming";

import { documentationComponents } from "../src/documentation/components";
import { LocaleContext, ui } from "../src/documentation/locale";
import { useColorMode } from "../src/documentation/useColorMode";
import type { DocumentationGlobals } from "../src/documentation/useDocumentationGlobals";
import { useDocumentationGlobals } from "../src/documentation/useDocumentationGlobals";

type ColorMode = "system" | "light" | "dark";
type MotionPreference = "system" | "reduce" | "no-preference";

const originalMotionMediaQueries = new WeakMap<CSSMediaRule, string>();

function collectMotionMediaRules(rules: CSSRuleList, mediaRules: CSSMediaRule[]) {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSMediaRule) {
      if (
        originalMotionMediaQueries.has(rule) ||
        rule.conditionText.includes("prefers-reduced-motion")
      ) {
        mediaRules.push(rule);
      }
    }

    if (rule instanceof CSSGroupingRule) {
      collectMotionMediaRules(rule.cssRules, mediaRules);
    }
  }
}

function setMotionPreference(preference: MotionPreference) {
  const motionMediaRules: CSSMediaRule[] = [];

  for (const styleSheet of Array.from(document.styleSheets)) {
    try {
      collectMotionMediaRules(styleSheet.cssRules, motionMediaRules);
    } catch {
      // Ignore stylesheets that the browser does not allow Storybook to inspect.
    }
  }

  for (const rule of motionMediaRules) {
    const originalQuery = originalMotionMediaQueries.get(rule) ?? rule.media.mediaText;
    originalMotionMediaQueries.set(rule, originalQuery);

    let query = originalQuery;
    if (preference !== "system") {
      query = originalQuery.replace(
        /\(prefers-reduced-motion:\s*(reduce|no-preference)\)/g,
        (_, value: string) => (value === preference ? "(min-width: 0px)" : "(max-width: -1px)"),
      );
    }
    rule.media.mediaText = query;
  }
}

const styles = stylex.create({
  document: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 12rem",
    gap: spacingVars.space8,
    "@media (max-width: 60rem)": { gridTemplateColumns: "minmax(0, 1fr)" },
  },
  article: { minWidth: 0 },
  toc: {
    alignSelf: "start",
    position: "sticky",
    top: spacingVars.space6,
    "@media (max-width: 60rem)": { display: "none" },
  },
  compact: { minHeight: 0, display: "block" },
  root: {
    backgroundColor: colorVars.bgSurface,
    color: colorVars.fgPrimary,
    fontFamily: typographyVars.fontFamily,
    minHeight: `calc(100vh - ${spacingVars.space4} * 2)`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

function handlePreviewClick(event: MouseEvent) {
  if (!(event.target instanceof Element)) return;

  const placeholderLink = event.target.closest('a[href="#"]');
  if (placeholderLink) event.preventDefault();
}

function ThemeScope({
  children,
  mode,
  compact,
}: {
  children: ReactNode;
  mode: ColorMode;
  compact: boolean;
}) {
  const colorMode = useColorMode(mode);
  const colorTheme = colorMode === "dark" ? darkColorTheme : lightColorTheme;
  const shadowTheme = colorMode === "dark" ? darkShadowTheme : lightShadowTheme;
  const themeClassName = stylex.props(colorTheme, shadowTheme).className ?? "";

  useLayoutEffect(() => {
    const themeClassList = themeClassName.split(" ").filter(Boolean);
    document.documentElement.classList.add(...themeClassList);
    document.addEventListener("click", handlePreviewClick);

    return () => {
      document.documentElement.classList.remove(...themeClassList);
      document.removeEventListener("click", handlePreviewClick);
    };
  }, [themeClassName]);

  return (
    <div {...stylex.props(styles.root, compact && styles.compact, colorTheme, shadowTheme)}>
      {children}
    </div>
  );
}

function MotionPreferenceScope({
  children,
  preference,
}: {
  children: ReactNode;
  preference: MotionPreference;
}) {
  useLayoutEffect(() => {
    const applyMotionPreference = () => setMotionPreference(preference);
    const styleSheetObserver = new MutationObserver(applyMotionPreference);

    applyMotionPreference();
    styleSheetObserver.observe(document.head, { childList: true, subtree: true });
    document.head.addEventListener("load", applyMotionPreference, true);

    return () => {
      styleSheetObserver.disconnect();
      document.head.removeEventListener("load", applyMotionPreference, true);
      setMotionPreference("system");
    };
  }, [preference]);

  return children;
}

function DocumentationContainer({
  children,
  context,
}: DocsContainerProps & { children?: ReactNode }) {
  const { colorMode, motionPreference, locale } = useDocumentationGlobals(context);
  const mode = useColorMode(colorMode);

  return (
    <LocaleContext.Provider value={locale}>
      <ThemeScope mode={mode} compact>
        <MotionPreferenceScope preference={motionPreference}>
          <DocsContainer
            context={context}
            theme={{ ...themes[mode], appContentBg: "transparent", colorSecondary: "currentColor" }}
          >
            <div {...stylex.props(styles.document)}>
              <div
                className={`sb-unstyled ${stylex.props(styles.article).className}`}
                data-document-locale={locale}
                lang={locale}
              >
                {children}
              </div>
              <aside {...stylex.props(styles.toc)}>
                <TableOfContents
                  contentsSelector={`[data-document-locale="${locale}"]`}
                  title={ui.onThisPage}
                  channel={context.channel}
                  headingSelector="h2, h3"
                  ignoreSelector=".nuee-example h2, .nuee-example h3, #table-of-contents"
                />
              </aside>
            </div>
          </DocsContainer>
        </MotionPreferenceScope>
      </ThemeScope>
    </LocaleContext.Provider>
  );
}

function StoryPreview({
  children,
  globals,
  isolated,
}: {
  children: ReactNode;
  globals: DocumentationGlobals;
  isolated: boolean;
}) {
  const [settings, setSettings] = useState<DocumentationGlobals | null>(null);
  useEffect(() => {
    if (!isolated) return;
    const update = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== window.parent ||
        event.data?.type !== "nuee-preview-globals"
      )
        return;
      const { colorMode, motionPreference, locale } = event.data.globals ?? {};
      if (
        !["system", "light", "dark"].includes(colorMode) ||
        !["system", "reduce", "no-preference"].includes(motionPreference) ||
        !["ko", "en"].includes(locale)
      )
        return;
      setSettings({ colorMode, motionPreference, locale });
    };
    window.addEventListener("message", update);
    window.parent.postMessage({ type: "nuee-preview-ready" }, window.location.origin);
    return () => window.removeEventListener("message", update);
  }, [isolated]);
  const current = settings ?? globals;
  return (
    <LocaleContext.Provider value={current.locale}>
      <MotionPreferenceScope preference={current.motionPreference}>
        <ThemeScope mode={current.colorMode} compact={isolated}>
          {children}
        </ThemeScope>
      </MotionPreferenceScope>
    </LocaleContext.Provider>
  );
}

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <StoryPreview
        globals={context.globals as DocumentationGlobals}
        isolated={context.id === "internal-preview--example"}
      >
        <Story />
      </StoryPreview>
    ),
  ],
  globalTypes: {
    locale: { description: "Language" },
    colorMode: { description: "Color mode" },
    motionPreference: { description: "Motion" },
  },
  initialGlobals: {
    locale: "ko",
    colorMode: "light",
    motionPreference: "no-preference",
  },
  parameters: {
    docs: {
      renderer: async () => (await import("../src/documentation/renderer")).renderer,
      container: DocumentationContainer,
      components: documentationComponents,
      toc: false,
    },
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: true }],
      },
    },
    layout: "padded",
    options: {
      storySort: {
        includeNames: true,
        method: "alphabetical",
        order: [
          "Getting Started",
          "Foundations",
          [
            "Overview",
            "Design Token",
            "Color",
            "Typography",
            "Iconography",
            "Layout",
            "Spacing",
            "Radius",
            "Elevation",
            "Gradient",
            "State",
            "Motion",
            "Feedback",
            "Inclusive Design",
            "International Design",
            "Voice and Tone",
            "Writing",
            "Tokens",
          ],
          "Components",
        ],
      },
    },
  },
};

export default preview;
