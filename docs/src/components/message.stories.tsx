import { Bubble } from "@cachette/ui/bubble";
import { Message, MessageContent, MessageFooter, MessageHeader } from "@cachette/ui/message";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection, storyStyles } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const MessageStory: Story = {
  name: "Message",
  render: () => (
    <StoryPage
      title="Message"
      description="작성자, 메시지 내용, 전송 시간을 하나의 대화 단위로 묶습니다."
    >
      <StorySection
        title="기본"
        description="말풍선 밖의 정보는 메시지보다 한 단계 낮은 위계로 표시합니다."
      >
        <StoryPreview xstyle={[storyStyles.column, storyStyles.componentWidth]}>
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
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
