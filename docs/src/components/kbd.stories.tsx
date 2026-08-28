import { Kbd, KbdGroup } from "@cachette/ui/kbd";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";
const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const KbdStory: Story = {
  name: "Kbd",
  render: () => (
    <StoryPage title="Kbd" description="키보드 단축키와 입력 조합을 표시합니다.">
      <StoryPreview>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>⇧</Kbd>
          <Kbd>Enter</Kbd>
        </KbdGroup>
      </StoryPreview>
    </StoryPage>
  ),
};
