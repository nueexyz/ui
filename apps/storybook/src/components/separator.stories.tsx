import { sizeVars, spacingVars } from "@cachette/tokens/tokens.stylex";
import { Separator } from "@cachette/ui/separator";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";
const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const styles = stylex.create({
  row: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space4,
    height: sizeVars.touchTarget,
  },
});
export const SeparatorStory: Story = {
  name: "Separator",
  render: () => (
    <StoryPage title="Separator" description="서로 다른 정보 그룹의 경계를 표시합니다.">
      <StoryPreview xstyle={storyStyles.column}>
        <span>계정 정보</span>
        <Separator />
        <div {...stylex.props(styles.row)}>
          <span>프로필</span>
          <Separator orientation="vertical" />
          <span>보안</span>
        </div>
      </StoryPreview>
    </StoryPage>
  ),
};
