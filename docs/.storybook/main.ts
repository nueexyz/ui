import type { StorybookConfig } from "@storybook/react-vite";
import reactCompiler from "babel-plugin-react-compiler";
import stylex from "@stylexjs/unplugin";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    return {
      ...config,
      plugins: [
        stylex.vite({
          babelConfig: { plugins: [reactCompiler] },
          useCSSLayers: true,
        }),
        ...(config.plugins ?? []),
      ],
    };
  },
};

export default config;
