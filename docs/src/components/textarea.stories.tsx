import { Textarea } from "@nuee/ui/textarea";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as stylex from "@stylexjs/stylex";

import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "textarea";

function TextareaExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>Default</h2>
        <p {...stylex.props(storyStyles.description)}>
          Use placeholders as short examples of the expected input.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <div {...stylex.props(storyStyles.stack, storyStyles.formWidth)}>
          <Textarea aria-label="Note" placeholder="Write down the decisions from the meeting." />
          <Textarea
            aria-label="Read-only note"
            disabled
            defaultValue="This note has been reviewed."
          />
        </div>
      </div>
    </section>
  );
}

const textareaExampleCode =
  'import { Textarea } from "@nuee/ui/textarea"\n\n<>\n  <Textarea aria-label="Note" placeholder="Write down the decisions from the meeting." />\n  <Textarea aria-label="Read-only note" disabled defaultValue="This note has been reviewed." />\n</>';

export const TextareaStory: Story = {
  name: "Textarea",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Textarea</h1>
        <p {...stylex.props(storyStyles.description)}>
          Compare multi-line content and input states.
        </p>
      </header>
      <ComponentExample>
        <TextareaExample />
      </ComponentExample>

      <ComponentCode usage={textareaExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nuee/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
    </main>
  ),
};
