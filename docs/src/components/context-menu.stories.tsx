import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@cachette/ui/context-menu";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const ContextMenuStory: Story = {
  name: "Context Menu",
  render: () => (
    <StoryPage
      title="Context Menu"
      description="선택한 영역과 직접 관련된 행동을 보조 클릭으로 엽니다."
    >
      <StoryPreview xstyle={storyStyles.column}>
        <ContextMenu>
          <ContextMenuTrigger {...stylex.props(storyStyles.contextTarget)}>
            이 영역을 보조 클릭하세요.
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              뒤로<ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              앞으로<ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              새로 고침<ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </StoryPreview>
    </StoryPage>
  ),
};
