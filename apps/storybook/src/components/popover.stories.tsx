import { Button } from "@cachette/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@cachette/ui/popover";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";
const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const PopoverStory: Story = {
  name: "Popover",
  render: () => (
    <StoryPage
      title="Popover"
      description="현재 화면을 벗어나지 않고 보조 정보나 간단한 조작을 제공합니다."
    >
      <StoryPreview>
        <Popover>
          <PopoverTrigger render={<Button variant="secondary">공유 설정</Button>} />
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>링크 공유</PopoverTitle>
              <PopoverDescription>링크를 가진 사람은 프로젝트를 볼 수 있습니다.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </StoryPreview>
    </StoryPage>
  ),
};
