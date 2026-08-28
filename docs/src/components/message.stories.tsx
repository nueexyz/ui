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
import { Bubble } from "@cachette/ui/bubble";
import { Message, MessageContent, MessageFooter, MessageHeader } from "@cachette/ui/message";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Message");

function MessageExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>기본</h2>
        <p {...stylex.props(storyStyles.description)}>
          말풍선 밖의 정보는 메시지보다 한 단계 낮은 위계로 표시합니다.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview, [storyStyles.column, storyStyles.componentWidth])}>
        <Message>
          <MessageHeader>민영</MessageHeader>
          <MessageContent>
            <Bubble>변경된 토큰을 확인해 주세요.</Bubble>
          </MessageContent>
          <MessageFooter>오후 2:18</MessageFooter>
        </Message>
        <Message side="outgoing">
          <MessageContent>
            <Bubble side="outgoing" variant="outline">
              확인했어요. 바로 반영할게요.
            </Bubble>
          </MessageContent>
          <MessageFooter>오후 2:20 · 읽음</MessageFooter>
        </Message>
      </div>
    </section>
  );
}

const messageExampleCode =
  'import { Bubble } from "@cachette/ui/bubble"\nimport { Message, MessageContent, MessageFooter, MessageHeader } from "@cachette/ui/message"\n\n<Message side="incoming">\n  <MessageHeader>민영</MessageHeader>\n  <MessageContent><Bubble>문서 검토를 시작했어요.</Bubble></MessageContent>\n  <MessageFooter>오후 2:18</MessageFooter>\n</Message>';

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
