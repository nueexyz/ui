import { Avatar, AvatarFallback } from "@cachette/ui/avatar";
import { Button } from "@cachette/ui/button";
import { Icon } from "@cachette/ui/icon";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@cachette/ui/item";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection, storyStyles } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const ItemStory: Story = {
  name: "Item",
  render: () => (
    <StoryPage
      title="Item"
      description="정보, 보조 설명, 관련 행동을 반복 가능한 한 줄 구조로 묶습니다."
    >
      <StorySection
        title="목록"
        description="같은 성격의 항목은 일정한 간격과 정렬로 이어서 보여줍니다."
      >
        <StoryPreview xstyle={storyStyles.componentWidth}>
          <ItemGroup>
            <Item variant="outline">
              <ItemMedia>
                <Icon name="folder" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>디자인 시스템</ItemTitle>
                <ItemDescription>마지막 수정: 오늘 오후 2:18</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="ghost">
                  열기
                </Button>
              </ItemActions>
            </Item>
            <Item variant="muted">
              <ItemMedia variant="avatar">
                <Avatar>
                  <AvatarFallback>민영</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>정민영</ItemTitle>
                <ItemDescription>편집 권한이 있어요.</ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
