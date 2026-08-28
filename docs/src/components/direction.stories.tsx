import { Button } from "@cachette/ui/button";
import { DirectionProvider } from "@cachette/ui/direction";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const DirectionStory: Story = {
  name: "Direction",
  render: () => (
    <StoryPage
      title="Direction"
      description="언어의 읽기 방향에 맞춰 콘텐츠와 조작 순서를 정렬합니다."
    >
      <StorySection
        title="왼쪽에서 오른쪽"
        description="한국어와 영어처럼 왼쪽에서 오른쪽으로 읽는 화면에 사용합니다."
      >
        <StoryPreview>
          <DirectionProvider direction="ltr">
            <div dir="ltr">
              <Button variant="secondary">다음 단계</Button>
            </div>
          </DirectionProvider>
        </StoryPreview>
      </StorySection>
      <StorySection
        title="오른쪽에서 왼쪽"
        description="아랍어처럼 오른쪽에서 왼쪽으로 읽는 화면에 사용합니다."
      >
        <StoryPreview>
          <DirectionProvider direction="rtl">
            <div dir="rtl">
              <Button variant="secondary">الخطوة التالية</Button>
            </div>
          </DirectionProvider>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
