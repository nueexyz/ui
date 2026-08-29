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
  { content: "사용자 인터뷰 질문을 정리했어요.", side: "incoming" },
  { content: "확인했어요. 오후 회의 전에 검토할게요.", side: "outgoing" },
  { content: "첫 번째 질문은 가입 이유로 시작하면 좋겠어요.", side: "incoming" },
  { content: "좋아요. 답변 흐름도 함께 적어둘게요.", side: "outgoing" },
  { content: "인터뷰 대상자 세 분이 일정을 선택했어요.", side: "incoming" },
  { content: "고마워요. 확정되면 캘린더에 추가해 주세요.", side: "outgoing" },
  { content: "목요일 오후 2시로 첫 인터뷰를 잡았어요.", side: "incoming" },
  { content: "회의 링크도 초대 메일에 넣어둘게요.", side: "outgoing" },
  { content: "녹화 동의 안내도 확인이 필요해요.", side: "incoming" },
  { content: "안내 문구를 검토해서 공유하겠습니다.", side: "outgoing" },
] as const;

function MessageScrollerExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>대화 내역</h2>
        <p {...stylex.props(storyStyles.description)}>
          위로 이동해 지난 메시지를 읽으면 최신 메시지 이동 버튼이 나타납니다.
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
  'import { Bubble } from "@dumo/ui/bubble"\nimport { MessageScroller } from "@dumo/ui/message-scroller"\n\n<MessageScroller style={{ height: "18rem" }}>\n  <Bubble>요청 사항을 확인했어요.</Bubble>\n  <Bubble side="outgoing">고마워요. 오늘 안에 공유할게요.</Bubble>\n</MessageScroller>';

export const MessageScrollerStory: Story = {
  name: "Message Scroller",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Message Scroller</h1>
        <p {...stylex.props(storyStyles.description)}>
          긴 대화를 탐색하고 최신 메시지로 다시 이동할 수 있게 합니다.
        </p>
      </header>
      <ComponentExample>
        <MessageScrollerExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={messageScrollerExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
