import { Toggle } from "@cachette/ui/toggle";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";
const meta = { title: "Components/Toggle", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {
  render: () => (
    <StoryPage title="Toggle" description="선택적으로 적용할 보기나 편집 모드를 전환합니다.">
      <StoryPreview>
        <Toggle defaultPressed>굵게</Toggle>
        <Toggle variant="outline">기울임</Toggle>
      </StoryPreview>
    </StoryPage>
  ),
};
