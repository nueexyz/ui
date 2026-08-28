import * as stylex from "@stylexjs/stylex";
import { Button } from "@cachette/ui/button";
import { ButtonGroup, ButtonGroupText } from "@cachette/ui/button-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { ButtonGroupExample, buttonGroupExampleCode } from "./examples/button-group.example";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Button Group");
export const ButtonGroupStory: Story = {
  name: "Button Group",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Button Group</h1>
        <p {...stylex.props(storyStyles.description)}>
          같은 목적을 가진 행동을 하나의 조작 단위로 묶습니다.
        </p>
      </header>
      <ComponentExample>
        <ButtonGroupExample />
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
      <ComponentCode usage={buttonGroupExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
