import { Badge } from "@cachette/ui/badge";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";
const meta = { title: "Components/Badge", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {
  render: () => (
    <StoryPage title="Badge" description="상태나 분류처럼 짧은 정보를 간결하게 표시합니다.">
      <StoryPreview>
        <Badge>진행 중</Badge>
        <Badge variant="secondary">초안</Badge>
        <Badge variant="destructive">오류</Badge>
        <Badge variant="outline">읽지 않음</Badge>
        <Badge variant="ghost">선택 사항</Badge>
      </StoryPreview>
    </StoryPage>
  ),
};
