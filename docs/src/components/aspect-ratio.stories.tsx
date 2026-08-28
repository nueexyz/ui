import { colorVars, sizeVars } from "@cachette/tokens/tokens.stylex";
import { AspectRatio } from "@cachette/ui/aspect-ratio";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { AspectRatioExample, aspectRatioExampleCode } from "./examples/aspect-ratio.example";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Aspect Ratio");
const styles = stylex.create({
  preview: {
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    color: colorVars.fgSecondary,
    display: "flex",
    justifyContent: "center",
    maxWidth: sizeVars.contentSm,
  },
});
export const AspectRatioStory: Story = {
  name: "Aspect Ratio",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Aspect Ratio</h1>
        <p {...stylex.props(storyStyles.description)}>
          미디어 영역의 비율을 화면 크기와 관계없이 유지합니다.
        </p>
      </header>
      <ComponentExample>
        <AspectRatioExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @cachette/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={aspectRatioExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
