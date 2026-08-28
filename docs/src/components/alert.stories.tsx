import { Alert, AlertDescription, AlertTitle } from "@cachette/ui/alert";
import { Icon } from "@cachette/ui/icon";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";
const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const AlertStory: Story = {
  name: "Alert",
  render: () => (
    <StoryPage title="Alert" description="현재 상태와 필요한 다음 행동을 함께 전달합니다.">
      <StoryPreview xstyle={storyStyles.column}>
        <Alert icon={<Icon aria-hidden="true" name="success" />}>
          <AlertTitle>변경사항을 저장했습니다.</AlertTitle>
          <AlertDescription>다른 화면으로 이동해도 저장된 내용이 유지됩니다.</AlertDescription>
        </Alert>
        <Alert icon={<Icon aria-hidden="true" name="error" />} variant="destructive">
          <AlertTitle>파일을 업로드하지 못했습니다.</AlertTitle>
          <AlertDescription>파일 크기를 확인한 뒤 다시 시도하세요.</AlertDescription>
        </Alert>
      </StoryPreview>
    </StoryPage>
  ),
};
