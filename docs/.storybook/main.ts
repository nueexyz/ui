import type { StorybookConfig } from "@storybook/react-vite";
import reactCompiler from "babel-plugin-react-compiler";
import stylex from "@stylexjs/unplugin/vite";

type StylexCompilerOptions = NonNullable<Parameters<typeof stylex>[0]> & {
  babelConfig: { plugins: [typeof reactCompiler] };
};

const stylexCompilerOptions: StylexCompilerOptions = {
  babelConfig: { plugins: [reactCompiler] },
  useCSSLayers: true,
};

const config: StorybookConfig = {
  addons: ["@storybook/addon-a11y"],
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    return {
      ...config,
      plugins: [stylex(stylexCompilerOptions), ...(config.plugins ?? [])],
    };
  },
};

export default config;
