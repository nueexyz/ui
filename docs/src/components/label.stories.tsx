import { Input } from "@cachette/ui/input";
import { Label } from "@cachette/ui/label";
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
import { LabelExample, labelExampleCode } from "./examples/label.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Label");
export const LabelStory: Story = {
  name: "Label",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Label</h1>
        <p {...stylex.props(storyStyles.description)}>
          입력할 정보와 컨트롤의 관계를 명확하게 안내합니다.
        </p>
      </header>
      <ComponentExample>
        <LabelExample />
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
      <ComponentCode usage={labelExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
