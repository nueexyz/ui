import {
  darkColorTheme,
  darkShadowTheme,
  lightColorTheme,
  lightShadowTheme,
} from "@cachette/tokens/themes.stylex";
import { colorVars, typographyVars } from "@cachette/tokens/tokens.stylex";
import "@cachette/ui/global.css";
import * as stylex from "@stylexjs/stylex";
import type { Preview } from "@storybook/react-vite";
import { type ReactNode, useLayoutEffect } from "react";

type ColorMode = "light" | "dark";

const styles = stylex.create({
  root: {
    backgroundColor: colorVars.bgCanvas,
    color: colorVars.fgPrimary,
    fontFamily: typographyVars.fontFamily,
    minHeight: "100vh",
  },
});

function ThemeScope({ children, mode }: { children: ReactNode; mode: ColorMode }) {
  const colorTheme = mode === "dark" ? darkColorTheme : lightColorTheme;
  const shadowTheme = mode === "dark" ? darkShadowTheme : lightShadowTheme;
  const themeClassName = stylex.props(colorTheme, shadowTheme).className ?? "";

  useLayoutEffect(() => {
    const themeClassList = themeClassName.split(" ").filter(Boolean);
    document.documentElement.classList.add(...themeClassList);

    return () => document.documentElement.classList.remove(...themeClassList);
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

      return (
        <ThemeScope mode={mode}>
          <Story />
        </ThemeScope>
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
  },
};

export default preview;
