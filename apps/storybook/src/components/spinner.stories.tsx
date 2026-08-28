import { Spinner } from "@cachette/ui/spinner";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";
const meta = { title: "Components/Spinner", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {
  render: () => (
    <StoryPage title="Spinner" description="완료 시점을 예측하기 어려운 짧은 작업을 표시합니다.">
      <StoryPreview>
        <Spinner label="저장 중" />
      </StoryPreview>
    </StoryPage>
  ),
};
