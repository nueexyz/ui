import * as stylex from "@stylexjs/stylex";
import { Bubble } from "@cachette/ui/bubble";
import { Message, MessageContent, MessageFooter, MessageHeader } from "@cachette/ui/message";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { MessageExample, messageExampleCode } from "./examples/message.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Message");

export const MessageStory: Story = {
  name: "Message",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Message</h1>
        <p {...stylex.props(storyStyles.description)}>
          작성자, 메시지 내용, 전송 시간을 하나의 대화 단위로 묶습니다.
        </p>
      </header>
      <ComponentExample>
        <MessageExample />
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
      <ComponentCode usage={messageExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
