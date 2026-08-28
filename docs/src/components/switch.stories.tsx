import { Switch } from "@cachette/ui/switch";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";
const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const SwitchStory: Story = {
  name: "Switch",
  render: () => (
    <StoryPage title="Switch" description="변경 즉시 적용되는 설정을 켜거나 끕니다.">
      <StoryPreview xstyle={storyStyles.column}>
        <label htmlFor="activity-visibility" {...stylex.props(storyStyles.option)}>
          <Switch defaultChecked id="activity-visibility" />
          활동 상태 공개
        </label>
        <label htmlFor="admin-only" {...stylex.props(storyStyles.option)}>
          <Switch disabled id="admin-only" />
          관리자 전용 설정
        </label>
      </StoryPreview>
    </StoryPage>
  ),
};
