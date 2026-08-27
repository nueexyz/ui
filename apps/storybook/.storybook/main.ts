import type { StorybookConfig } from "@storybook/react-vite";
import stylex from "@stylexjs/unplugin";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    return {
      ...config,
      plugins: [stylex.vite({ useCSSLayers: true }), ...(config.plugins ?? [])],
    };
  },
};

export default config;
