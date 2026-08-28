import { Button } from "@cachette/ui/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection, storyStyles } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = {
  name: "Button",
  render: () => (
    <StoryPage title="Button" description="행동의 중요도, 크기, 상태에 따른 표현을 비교합니다.">
      <StorySection title="종류" description="행동의 우선순위와 위험도에 맞는 표현을 선택합니다.">
        <StoryPreview>
          <Button>저장하기</Button>
          <Button variant="secondary">미리보기</Button>
          <Button variant="ghost">닫기</Button>
          <Button variant="destructive">삭제하기</Button>
        </StoryPreview>
      </StorySection>
      <StorySection title="크기" description="화면의 정보 밀도에 맞는 크기를 선택합니다.">
        <StoryPreview>
          <Button size="sm">저장하기</Button>
          <Button size="md">저장하기</Button>
          <Button size="lg">저장하기</Button>
        </StoryPreview>
      </StorySection>
      <StorySection
        title="상태"
        description="사용 가능 여부와 처리 상태가 명확하게 구분되어야 합니다."
      >
        <StoryPreview>
          <Button>저장하기</Button>
          <Button disabled>저장할 수 없음</Button>
          <Button disabled variant="secondary">
            미리볼 수 없음
          </Button>
          <Button disabled variant="ghost">
            닫을 수 없음
          </Button>
          <Button isLoading>저장 중</Button>
        </StoryPreview>
      </StorySection>
      <StorySection
        title="강조 배경"
        description="강조 배경 위에서도 행동의 위계와 대비를 유지합니다."
      >
        <StoryPreview xstyle={storyStyles.inverse}>
          <Button variant="secondary">이전으로</Button>
          <Button variant="ghost">닫기</Button>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
