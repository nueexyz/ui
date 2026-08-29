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
import { Message, MessageContent } from "@dumo/ui/message";
import { MessageScroller } from "@dumo/ui/message-scroller";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Message Scroller");

const styles = stylex.create({ viewport: { height: "18rem", width: "28rem" } });

const messages = [
  { content: "I organized the user interview questions.", side: "incoming" },
  { content: "Got it. I’ll review them before the afternoon meeting.", side: "outgoing" },
  { content: "The first question should ask why they signed up.", side: "incoming" },
  { content: "Sounds good. I’ll also document the answer flow.", side: "outgoing" },
  { content: "Three interview participants picked a time.", side: "incoming" },
  { content: "Thanks. Please add it to the calendar when it’s confirmed.", side: "outgoing" },
  { content: "I scheduled the first interview for Thursday at 2 PM.", side: "incoming" },
  { content: "I’ll include the meeting link in the invitation email.", side: "outgoing" },
  { content: "We also need to confirm the recording consent notice.", side: "incoming" },
  { content: "I’ll review and share the notice copy.", side: "outgoing" },
] as const;

function MessageScrollerExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>Conversation history</h2>
        <p {...stylex.props(storyStyles.description)}>
          Scroll up to read earlier messages and a button appears to return to the latest one.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview)}>
        <MessageScroller xstyle={styles.viewport}>
          {messages.map((message) => (
            <Message key={message.content} side={message.side}>
              <MessageContent>
                <Bubble side={message.side}>{message.content}</Bubble>
              </MessageContent>
            </Message>
          ))}
        </MessageScroller>
      </div>
    </section>
  );
}

const messageScrollerExampleCode =
  'import { Bubble } from "@dumo/ui/bubble"\nimport { MessageScroller } from "@dumo/ui/message-scroller"\n\n<MessageScroller style={{ height: "18rem" }}>\n  <Bubble>I reviewed the request.</Bubble>\n  <Bubble side="outgoing">Thanks. I’ll share it today.</Bubble>\n</MessageScroller>';

export const MessageScrollerStory: Story = {
  name: "Message Scroller",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Message Scroller</h1>
        <p {...stylex.props(storyStyles.description)}>
          Navigate long conversations and return to the latest message.
        </p>
      </header>
      <ComponentExample>
        <MessageScrollerExample />
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
      <ComponentCode usage={messageScrollerExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
