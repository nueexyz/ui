import { Bubble } from "@cachette/ui/bubble";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection, storyStyles } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const BubbleStory: Story = {
  name: "Bubble",
  render: () => (
    <StoryPage title="Bubble" description="대화에서 주고받은 메시지를 방향과 표면으로 구분합니다.">
      <StorySection
        title="대화"
        description="보낸 메시지와 받은 메시지는 정렬 방향으로 먼저 구분합니다."
      >
        <StoryPreview xstyle={storyStyles.column}>
          <Bubble>오늘 회의 자료를 확인해 줄 수 있을까요?</Bubble>
          <Bubble side="outgoing" variant="outline">
            네, 오후 3시 전까지 의견을 남길게요.
          </Bubble>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
