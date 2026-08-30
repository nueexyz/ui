import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nooeh/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { CodeBlock, storyStyles } from "./components/story-layout/StoryLayout";

const meta = {
  title: "Getting Started",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const config = `{
  "aliases": {
    "ui": "@/components/ui"
  }
}`;

const tsconfig = `{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`;

const styles = stylex.create({
  configDetail: {
    backgroundColor: colorVars.bgSubtle,
    borderLeftColor: colorVars.strokeStrong,
    borderLeftStyle: "solid",
    borderLeftWidth: sizeVars.stroke,
    borderRadius: radiusVars.sm,
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space1,
    margin: 0,
    paddingBlock: spacingVars.space3,
    paddingInline: spacingVars.space4,
  },
  configField: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    margin: 0,
  },
  configDescription: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  note: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  path: {
    color: colorVars.fgPrimary,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    margin: 0,
  },
});

export const GettingStarted: Story = {
  name: "Getting Started",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Getting Started</h1>
        <p {...stylex.props(storyStyles.description)}>
          Add the components your project needs as local files.
        </p>
      </header>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>1. Initialize</h2>
          <p {...stylex.props(storyStyles.description)}>Run this once from the project root.</p>
        </header>
        <CodeBlock code="pnpm dlx @nooeh/ui init" label="Terminal" language="bash" />
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>2. Import alias</h2>
          <p {...stylex.props(storyStyles.description)}>
            The UI import alias entered during init is saved to nooeh.json in the project root.
          </p>
        </header>
        <CodeBlock code={config} label="nooeh.json" language="json" />
        <dl {...stylex.props(styles.configDetail)}>
          <dt {...stylex.props(styles.configField)}>aliases.ui</dt>
          <dd {...stylex.props(styles.configDescription)}>
            The alias used to import added UI components.
          </dd>
        </dl>
        <p {...stylex.props(styles.note)}>
          Define the actual file location in paths within tsconfig.json or jsconfig.json.
        </p>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>3. File location</h2>
          <p {...stylex.props(storyStyles.description)}>
            The add command reads the import alias and paths to find where to save components.
          </p>
        </header>
        <CodeBlock code={tsconfig} label="tsconfig.json" language="json" />
        <p {...stylex.props(styles.path)}>@/components/ui → src/components/ui</p>
        <p {...stylex.props(styles.note)}>
          When changing the alias, also update paths in nooeh.json and tsconfig.json or
          jsconfig.json. Existing files are not moved automatically.
        </p>
      </section>
    </main>
  ),
};
