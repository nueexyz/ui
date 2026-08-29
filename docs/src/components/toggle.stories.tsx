import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "@dumo/ui/toggle";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Toggle");

const toggleExampleCode = `import { Toggle } from "@dumo/ui/toggle"

<div>
  <Toggle defaultPressed>굵게</Toggle>
  <Toggle variant="outline">기울임</Toggle>
</div>`;

export const ToggleStory: Story = {
  name: "Toggle",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Toggle</h1>
        <p {...stylex.props(storyStyles.description)}>
          선택적으로 적용할 보기나 편집 모드를 전환합니다.
        </p>
      </header>
      <ComponentExample>
        <div {...stylex.props(storyStyles.preview)}>
          <Toggle defaultPressed>굵게</Toggle>
          <Toggle variant="outline">기울임</Toggle>
        </div>
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={toggleExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
