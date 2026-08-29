import {
  darkColorTheme,
  darkShadowTheme,
  lightColorTheme,
  lightShadowTheme,
} from "@dumo/tokens/themes.stylex";
import { colorVars, typographyVars } from "@dumo/tokens/tokens.stylex";
import "@dumo/ui/global.css";
import * as stylex from "@stylexjs/stylex";
import type { Preview } from "@storybook/react-vite";
import { type ReactNode, useLayoutEffect } from "react";

import { StorySourceProvider } from "../src/components/story-layout/story-source-context";

type ColorMode = "light" | "dark";

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

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const mode = context.globals.colorMode as ColorMode;
      const source = context.parameters.docs?.source?.originalSource;

      return (
        <StorySourceProvider
          colorMode={mode}
          source={typeof source === "string" ? source : undefined}
        >
          <ThemeScope mode={mode}>
            <Story />
          </ThemeScope>
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
  },
  initialGlobals: {
    colorMode: "light",
  },
  parameters: {
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
