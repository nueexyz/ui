import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { Avatar, AvatarFallback } from "@nuee/ui/avatar";
import { Bubble } from "@nuee/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
} from "@nuee/ui/message";
import { MessageScroller } from "@nuee/ui/message-scroller";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "message-scroller";

const styles = stylex.create({ viewport: { height: "18rem", width: "28rem" } });

const messageGroups = [
  {
    align: "start",
    messages: [
      { content: "I organized the user interview questions.", time: "2:18 PM" },
      { content: "The first question should ask why they signed up.", time: "2:19 PM" },
    ],
  },
  {
    align: "end",
    messages: [
      { content: "Got it. I’ll review them before the afternoon meeting.", time: "2:20 PM" },
      { content: "Sounds good. I’ll also document the answer flow.", time: "2:21 PM" },
    ],
  },
  {
    align: "start",
    messages: [
      { content: "Three interview participants picked a time.", time: "2:22 PM" },
      { content: "I scheduled the first interview for Thursday at 2 PM.", time: "2:23 PM" },
    ],
  },
  {
    align: "end",
    messages: [
      { content: "Thanks. Please add it to the calendar when it’s confirmed.", time: "2:24 PM" },
      { content: "I’ll include the meeting link in the invitation email.", time: "2:25 PM" },
    ],
  },
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
          {messageGroups.map((group) => (
            <MessageGroup key={group.messages[0].content}>
              {group.messages.map((message, index) => (
                <Message key={message.content} align={group.align}>
                  {group.align === "start" ? (
                    <MessageAvatar aria-hidden={index > 0}>
                      {index === 0 ? (
                        <Avatar size="lg">
                          <AvatarFallback>MY</AvatarFallback>
                        </Avatar>
                      ) : null}
                    </MessageAvatar>
                  ) : null}
                  <MessageContent>
                    <Bubble
                      align={group.align}
                      variant={group.align === "end" ? "primary" : "default"}
                    >
                      {message.content}
                    </Bubble>
                    {index === group.messages.length - 1 ? (
                      <MessageFooter>
                        {group.align === "end" ? `${message.time} · Read` : message.time}
                      </MessageFooter>
                    ) : null}
                  </MessageContent>
                </Message>
              ))}
            </MessageGroup>
          ))}
        </MessageScroller>
      </div>
    </section>
  );
}

const messageScrollerExampleCode =
  'import { Avatar, AvatarFallback } from "@nuee/ui/avatar"\nimport { Bubble } from "@nuee/ui/bubble"\nimport { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup } from "@nuee/ui/message"\nimport { MessageScroller } from "@nuee/ui/message-scroller"\n\n<MessageScroller style={{ height: "18rem" }}>\n  <MessageGroup>\n    <Message>\n      <MessageAvatar><Avatar size="lg"><AvatarFallback>MY</AvatarFallback></Avatar></MessageAvatar>\n      <MessageContent><Bubble>I reviewed the request.</Bubble></MessageContent>\n    </Message>\n    <Message>\n      <MessageAvatar aria-hidden />\n      <MessageContent>\n        <Bubble>I also added the notes.</Bubble>\n        <MessageFooter>2:18 PM</MessageFooter>\n      </MessageContent>\n    </Message>\n  </MessageGroup>\n\n  <MessageGroup>\n    <Message align="end">\n      <MessageContent>\n        <Bubble align="end" variant="primary">Thanks. I’ll share it today.</Bubble>\n        <MessageFooter>2:20 PM · Read</MessageFooter>\n      </MessageContent>\n    </Message>\n  </MessageGroup>\n</MessageScroller>';

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

      <ComponentCode usage={messageScrollerExampleCode} />
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
