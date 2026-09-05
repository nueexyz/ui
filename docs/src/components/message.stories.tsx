import { Avatar, AvatarFallback } from "@nuee/ui/avatar";
import { Bubble } from "@nuee/ui/bubble";
import { Message, MessageAvatar, MessageContent, MessageFooter } from "@nuee/ui/message";
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

const registryName = "message";

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
          <MessageAvatar>
            <Avatar size="lg">
              <AvatarFallback>MY</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble>How can I help you today?</Bubble>
            <MessageFooter>2:18 PM</MessageFooter>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble align="end" variant="primary">
              Got it. I’ll apply them right away.
            </Bubble>
            <MessageFooter>2:20 PM · Read</MessageFooter>
          </MessageContent>
        </Message>
      </div>
    </section>
  );
}

const messageExampleCode =
  'import { Avatar, AvatarFallback } from "@nuee/ui/avatar"\nimport { Bubble } from "@nuee/ui/bubble"\nimport { Message, MessageAvatar, MessageContent, MessageFooter } from "@nuee/ui/message"\n\n<Message>\n  <MessageAvatar>\n    <Avatar size="lg">\n      <AvatarFallback>MY</AvatarFallback>\n    </Avatar>\n  </MessageAvatar>\n  <MessageContent>\n    <Bubble>How can I help you today?</Bubble>\n    <MessageFooter>2:18 PM</MessageFooter>\n  </MessageContent>\n</Message>';

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

      <ComponentCode usage={messageExampleCode} />
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
