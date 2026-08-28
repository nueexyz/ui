import * as stylex from "@stylexjs/stylex";
import { Progress } from "@cachette/ui/progress";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { ProgressExample, progressExampleCode } from "./examples/progress.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Progress");
export const ProgressStory: Story = {
  name: "Progress",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Progress</h1>
        <p {...stylex.props(storyStyles.description)}>
          완료 정도를 알 수 있는 작업의 진행 상태를 보여줍니다.
        </p>
      </header>
      <ComponentExample>
        <ProgressExample />
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
      <ComponentCode usage={progressExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
