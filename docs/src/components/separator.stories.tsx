import { sizeVars, spacingVars } from "@cachette/tokens/tokens.stylex";
import { Separator } from "@cachette/ui/separator";
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
import { SeparatorExample, separatorExampleCode } from "./examples/separator.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Separator");
const styles = stylex.create({
  row: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space4,
    height: sizeVars.touchTarget,
  },
});
export const SeparatorStory: Story = {
  name: "Separator",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Separator</h1>
        <p {...stylex.props(storyStyles.description)}>서로 다른 정보 그룹의 경계를 표시합니다.</p>
      </header>
      <ComponentExample>
        <SeparatorExample />
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
      <ComponentCode usage={separatorExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
