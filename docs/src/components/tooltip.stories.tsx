import { Button } from "@cachette/ui/button";
import { Icon } from "@cachette/ui/icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@cachette/ui/tooltip";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection } from "./story-layout/StoryLayout";
const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const TooltipStory: Story = {
  name: "Tooltip",
  render: () => (
    <StoryPage
      title="Tooltip"
      description="아이콘이나 짧은 컨트롤의 의미를 한 문장으로 설명합니다."
    >
      <StorySection
        title="정렬"
        description="트리거의 시작, 가운데, 끝을 기준으로 설명 위치를 맞춥니다."
      >
        <StoryPreview>
          <TooltipProvider delay={100}>
            {(
              [
                ["start", "왼쪽 정렬"],
                ["center", "가운데 정렬"],
                ["end", "오른쪽 정렬"],
              ] as const
            ).map(([align, label]) => (
              <Tooltip key={align}>
                <TooltipTrigger
                  render={
                    <Button size="sm" variant="secondary">
                      {label}
                      <Icon aria-hidden="true" name="info" />
                    </Button>
                  }
                />
                <TooltipContent align={align}>프로젝트 공개 범위를 변경합니다.</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
