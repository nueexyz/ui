import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { Progress } from "@nooeh/ui/progress";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "progress";

function ProgressExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <Progress aria-label="File upload progress" value={64} xstyle={storyStyles.formWidth} />
      <Progress aria-label="In progress" value={null} xstyle={storyStyles.formWidth} />
    </div>
  );
}

const progressExampleCode =
  'import { Progress } from "@nooeh/ui/progress"\n\n<>\n  <Progress aria-label="File upload progress" value={64} />\n  <Progress aria-label="In progress" value={null} />\n</>';

export const ProgressStory: Story = {
  name: "Progress",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Progress</h1>
        <p {...stylex.props(storyStyles.description)}>
          Show the progress of work with a measurable completion state.
        </p>
      </header>
      <ComponentExample>
        <ProgressExample />
      </ComponentExample>

      <ComponentCode usage={progressExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nooeh/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
    </main>
  ),
};
