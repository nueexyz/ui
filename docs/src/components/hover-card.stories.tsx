import { Avatar, AvatarFallback } from "@cachette/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@cachette/ui/hover-card";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@cachette/ui/item";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const HoverCardStory: Story = {
  name: "Hover Card",
  render: () => (
    <StoryPage
      title="Hover Card"
      description="링크를 열기 전에 대상의 핵심 정보를 미리 확인할 수 있게 합니다."
    >
      <StorySection
        title="프로필 미리 보기"
        description="마우스를 올리거나 키보드로 초점을 이동해 내용을 확인합니다."
      >
        <StoryPreview>
          <HoverCard>
            <HoverCardTrigger href="#">@cachette</HoverCardTrigger>
            <HoverCardContent align="start">
              <Item size="sm">
                <ItemMedia variant="avatar">
                  <Avatar>
                    <AvatarFallback>CA</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Cachette</ItemTitle>
                  <ItemDescription>차분하고 일관된 제품 경험을 위한 디자인 시스템</ItemDescription>
                </ItemContent>
              </Item>
            </HoverCardContent>
          </HoverCard>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
