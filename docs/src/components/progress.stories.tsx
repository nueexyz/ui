import { Progress } from "@cachette/ui/progress";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";
const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const ProgressStory: Story = {
  name: "Progress",
  render: () => (
    <StoryPage title="Progress" description="완료 정도를 알 수 있는 작업의 진행 상태를 보여줍니다.">
      <StoryPreview xstyle={storyStyles.column}>
        <Progress aria-label="파일 업로드 진행률" value={64} xstyle={storyStyles.formWidth} />
        <Progress aria-label="처리 중" value={null} xstyle={storyStyles.formWidth} />
      </StoryPreview>
    </StoryPage>
  ),
};
