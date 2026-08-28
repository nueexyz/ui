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
import { StoryPage, StoryPreview, StorySection } from "./story-layout/StoryLayout";
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
      <StorySection
        title="정렬"
        description="기본값은 트리거의 왼쪽 모서리에 맞추며 필요에 따라 가운데나 오른쪽으로 정렬합니다."
      >
        <StoryPreview>
          <Popover>
            <PopoverTrigger render={<Button variant="secondary">왼쪽 정렬</Button>} />
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>왼쪽 정렬</PopoverTitle>
                <PopoverDescription>Popover의 시작점을 트리거에 맞춥니다.</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger render={<Button variant="secondary">가운데 정렬</Button>} />
            <PopoverContent align="center">
              <PopoverHeader>
                <PopoverTitle>가운데 정렬</PopoverTitle>
                <PopoverDescription>Popover의 가운데를 트리거에 맞춥니다.</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger render={<Button variant="secondary">오른쪽 정렬</Button>} />
            <PopoverContent align="end">
              <PopoverHeader>
                <PopoverTitle>오른쪽 정렬</PopoverTitle>
                <PopoverDescription>Popover의 끝점을 트리거에 맞춥니다.</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
