import { Button } from "@cachette/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@cachette/ui/tooltip";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";
const meta = { title: "Components/Tooltip", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {
  render: () => (
    <StoryPage
      title="Tooltip"
      description="아이콘이나 짧은 컨트롤의 의미를 한 문장으로 설명합니다."
    >
      <StoryPreview>
        <TooltipProvider delay={300}>
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost">?</Button>} />
            <TooltipContent>프로젝트 공개 범위를 변경합니다.</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </StoryPreview>
    </StoryPage>
  ),
};
