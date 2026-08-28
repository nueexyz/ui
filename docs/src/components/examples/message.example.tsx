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
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Message");

export function MessageExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>기본</h2>
          <p {...stylex.props(storyStyles.description)}>
            말풍선 밖의 정보는 메시지보다 한 단계 낮은 위계로 표시합니다.
          </p>
        </header>
        <div
          {...stylex.props(storyStyles.preview, [storyStyles.column, storyStyles.componentWidth])}
        >
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
    </>
  );
}

export const messageExampleCode =
  'import { Bubble } from "@cachette/ui/bubble"\nimport { Message, MessageContent, MessageFooter, MessageHeader } from "@cachette/ui/message"\n\n<Message side="incoming">\n  <MessageHeader>민영</MessageHeader>\n  <MessageContent><Bubble>문서 검토를 시작했어요.</Bubble></MessageContent>\n  <MessageFooter>오후 2:18</MessageFooter>\n</Message>';
