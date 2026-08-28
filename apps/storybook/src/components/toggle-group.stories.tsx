import { ToggleGroup, ToggleGroupItem } from "@cachette/ui/toggle-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";
const meta = {
  title: "Components/Toggle Group",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {
  render: () => (
    <StoryPage
      title="Toggle Group"
      description="서로 관련된 보기 옵션을 방향키로 탐색하고 선택합니다."
    >
      <StoryPreview>
        <ToggleGroup aria-label="텍스트 정렬" defaultValue={["left"]}>
          <ToggleGroupItem value="left">왼쪽</ToggleGroupItem>
          <ToggleGroupItem value="center">가운데</ToggleGroupItem>
          <ToggleGroupItem value="right">오른쪽</ToggleGroupItem>
        </ToggleGroup>
      </StoryPreview>
    </StoryPage>
  ),
};
