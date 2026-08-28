import { Bubble } from "@cachette/ui/bubble";
import { Message, MessageContent } from "@cachette/ui/message";
import { MessageScroller } from "@cachette/ui/message-scroller";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection } from "./story-layout/StoryLayout";

const styles = stylex.create({ viewport: { height: "18rem", width: "28rem" } });
const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const MessageScrollerStory: Story = {
  name: "Message Scroller",
  render: () => (
    <StoryPage
      title="Message Scroller"
      description="긴 대화를 탐색하고 최신 메시지로 다시 이동할 수 있게 합니다."
    >
      <StorySection
        title="대화 내역"
        description="위로 이동해 지난 메시지를 읽으면 최신 메시지 이동 버튼이 나타납니다."
      >
        <StoryPreview>
          <MessageScroller xstyle={styles.viewport}>
            {Array.from({ length: 10 }, (_, index) => (
              <Message key={index} side={index % 2 ? "outgoing" : "incoming"}>
                <MessageContent>
                  <Bubble side={index % 2 ? "outgoing" : "incoming"}>
                    대화 메시지 {index + 1}
                  </Bubble>
                </MessageContent>
              </Message>
            ))}
          </MessageScroller>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
