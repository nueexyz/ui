import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@cachette/ui/collapsible";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const CollapsibleStory: Story = {
  name: "Collapsible",
  render: () => (
    <StoryPage title="Collapsible" description="보조 정보를 한 영역 안에서 간단히 접고 펼칩니다.">
      <StoryPreview xstyle={storyStyles.componentWidth}>
        <Collapsible defaultOpen>
          <CollapsibleTrigger>변경된 파일 3개</CollapsibleTrigger>
          <CollapsibleContent>
            Button.tsx · button.stylex.ts · button.stories.tsx
          </CollapsibleContent>
        </Collapsible>
      </StoryPreview>
    </StoryPage>
  ),
};
