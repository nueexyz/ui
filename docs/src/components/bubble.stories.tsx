import * as stylex from "@stylexjs/stylex";
import { Bubble } from "@cachette/ui/bubble";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { BubbleExample, bubbleExampleCode } from "./examples/bubble.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Bubble");

export const BubbleStory: Story = {
  name: "Bubble",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Bubble</h1>
        <p {...stylex.props(storyStyles.description)}>
          대화에서 주고받은 메시지를 방향과 표면으로 구분합니다.
        </p>
      </header>
      <ComponentExample>
        <BubbleExample />
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
      <ComponentCode usage={bubbleExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
