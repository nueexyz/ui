import {
  darkColorTheme,
  darkShadowTheme,
  lightColorTheme,
  lightShadowTheme,
} from "@nuee/tokens/themes.stylex";
import { colorVars, typographyVars } from "@nuee/tokens/tokens.stylex";
import "@nuee/ui/global.css";
import * as stylex from "@stylexjs/stylex";
import type { Preview } from "@storybook/react-vite";
import { type ReactNode, useLayoutEffect } from "react";

import { StorySourceProvider } from "../src/components/story-layout/story-source-context";

type ColorMode = "light" | "dark";
type MotionPreference = "system" | "reduce" | "no-preference";

const originalMotionMediaQueries = new WeakMap<CSSMediaRule, string>();

function collectMotionMediaRules(rules: CSSRuleList, mediaRules: CSSMediaRule[]) {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSMediaRule) {
      if (rule.conditionText.includes("prefers-reduced-motion")) {
        mediaRules.push(rule);
      }

      continue;
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

    rule.media.mediaText =
      preference === "system" ? originalQuery : preference === "reduce" ? "all" : "not all";
  }
}

const styles = stylex.create({
  root: {
    backgroundColor: colorVars.bgCanvas,
    color: colorVars.fgPrimary,
    fontFamily: typographyVars.fontFamily,
    minHeight: "100vh",
  },
});

function handlePreviewClick(event: MouseEvent<HTMLDivElement>) {
  if (!(event.target instanceof Element)) return;

  const placeholderLink = event.target.closest('a[href="#"]');
  if (placeholderLink) event.preventDefault();
}

function ThemeScope({ children, mode }: { children: ReactNode; mode: ColorMode }) {
  const colorTheme = mode === "dark" ? darkColorTheme : lightColorTheme;
  const shadowTheme = mode === "dark" ? darkShadowTheme : lightShadowTheme;
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
    <div key={mode} {...stylex.props(styles.root, colorTheme, shadowTheme)}>
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

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const mode = context.globals.colorMode as ColorMode;
      const motionPreference = context.globals.motionPreference as MotionPreference;
      const source = context.parameters.docs?.source?.originalSource;

      return (
        <StorySourceProvider
          colorMode={mode}
          source={typeof source === "string" ? source : undefined}
        >
          <MotionPreferenceScope preference={motionPreference}>
            <ThemeScope mode={mode}>
              <Story />
            </ThemeScope>
          </MotionPreferenceScope>
        </StorySourceProvider>
      );
    },
  ],
  globalTypes: {
    colorMode: {
      description: "색상 모드",
      toolbar: {
        icon: "mirror",
        items: [
          { title: "라이트", value: "light" },
          { title: "다크", value: "dark" },
        ],
        dynamicTitle: true,
      },
    },
    motionPreference: {
      description: "모션 설정",
      toolbar: {
        icon: "play",
        items: [
          { title: "시스템 설정", value: "system" },
          { title: "모션 줄임", value: "reduce" },
          { title: "모션 허용", value: "no-preference" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    colorMode: "light",
    motionPreference: "no-preference",
  },
  parameters: {
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
        order: ["시작하기", "Foundations", "Components"],
      },
    },
  },
};

export default preview;
