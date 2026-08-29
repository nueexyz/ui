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
import { Bubble } from "@dumo/ui/bubble";
import { Message, MessageContent, MessageFooter, MessageHeader } from "@dumo/ui/message";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Message");

function MessageExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>Default</h2>
        <p {...stylex.props(storyStyles.description)}>
          Present information outside the bubble at a lower hierarchy than the message.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview, [storyStyles.column, storyStyles.componentWidth])}>
        <Message>
          <MessageHeader>Minyeong</MessageHeader>
          <MessageContent>
            <Bubble>Please review the updated tokens.</Bubble>
          </MessageContent>
          <MessageFooter>2:18 PM</MessageFooter>
        </Message>
        <Message side="outgoing">
          <MessageContent>
            <Bubble side="outgoing" variant="outline">
              Got it. I’ll apply them right away.
            </Bubble>
          </MessageContent>
          <MessageFooter>2:20 PM · Read</MessageFooter>
        </Message>
      </div>
    </section>
  );
}

const messageExampleCode =
  'import { Bubble } from "@dumo/ui/bubble"\nimport { Message, MessageContent, MessageFooter, MessageHeader } from "@dumo/ui/message"\n\n<Message side="incoming">\n  <MessageHeader>Minyeong</MessageHeader>\n  <MessageContent><Bubble>I started reviewing the documentation.</Bubble></MessageContent>\n  <MessageFooter>2:18 PM</MessageFooter>\n</Message>';

export const MessageStory: Story = {
  name: "Message",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Message</h1>
        <p {...stylex.props(storyStyles.description)}>
          Group the sender, message content, and sent time into one conversation unit.
        </p>
      </header>
      <ComponentExample>
        <MessageExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
      <ComponentCode usage={messageExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
