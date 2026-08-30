import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { Bubble } from "@nooeh/ui/bubble";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "bubble";

function BubbleExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>Conversation</h2>
        <p {...stylex.props(storyStyles.description)}>
          Differentiate sent and received messages by alignment first.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <Bubble>Could you review today’s meeting materials?</Bubble>
        <Bubble side="outgoing" variant="outline">
          Yes, I’ll leave feedback before 3 PM.
        </Bubble>
      </div>
    </section>
  );
}

const bubbleExampleCode =
  'import { Bubble } from "@nooeh/ui/bubble"\n\n<Bubble>Could you review today’s meeting materials?</Bubble>';

export const BubbleStory: Story = {
  name: "Bubble",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Bubble</h1>
        <p {...stylex.props(storyStyles.description)}>
          Differentiate exchanged messages by direction and surface.
        </p>
      </header>
      <ComponentExample>
        <BubbleExample />
      </ComponentExample>

      <ComponentCode usage={bubbleExampleCode} />
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
