import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@cachette/ui/avatar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const AvatarStory: Story = {
  name: "Avatar",
  render: () => (
    <StoryPage title="Avatar" description="사람이나 팀을 이미지 또는 짧은 대체 문자로 나타냅니다.">
      <StorySection
        title="크기"
        description="주변 콘텐츠의 밀도와 중요도에 맞는 크기를 선택합니다."
      >
        <StoryPreview>
          <Avatar size="sm">
            <AvatarFallback>MJ</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>민영</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>DS</AvatarFallback>
            <AvatarBadge />
          </Avatar>
        </StoryPreview>
      </StorySection>
      <StorySection title="그룹" description="함께 참여한 사람을 한 묶음으로 보여줍니다.">
        <StoryPreview>
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>김</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>이</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>박</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+4</AvatarGroupCount>
          </AvatarGroup>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
