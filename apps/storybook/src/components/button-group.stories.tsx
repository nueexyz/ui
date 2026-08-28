import { Button } from "@cachette/ui/button";
import { ButtonGroup, ButtonGroupText } from "@cachette/ui/button-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection } from "./story-layout/StoryLayout";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const ButtonGroupStory: Story = {
  name: "Button Group",
  render: () => (
    <StoryPage
      title="Button Group"
      description="같은 목적을 가진 행동을 하나의 조작 단위로 묶습니다."
    >
      <StorySection title="관련 행동" description="가장 자주 사용하는 행동을 먼저 배치합니다.">
        <StoryPreview>
          <ButtonGroup aria-label="문서 작업">
            <ButtonGroupText>문서</ButtonGroupText>
            <Button variant="ghost">공유하기</Button>
            <Button variant="ghost">내보내기</Button>
          </ButtonGroup>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
