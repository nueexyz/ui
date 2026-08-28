import { Checkbox } from "@cachette/ui/checkbox";
import { colorVars } from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";
const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const styles = stylex.create({
  disabledOption: { color: colorVars.fgDisabled, cursor: "not-allowed" },
});

export const CheckboxStory: Story = {
  name: "Checkbox",
  render: () => (
    <StoryPage title="Checkbox" description="서로 독립적인 항목을 하나 이상 선택할 때 사용합니다.">
      <StoryPreview xstyle={storyStyles.column}>
        <label htmlFor="email-updates" {...stylex.props(storyStyles.option)}>
          <Checkbox defaultChecked id="email-updates" />
          변경사항 이메일로 받기
        </label>
        <label htmlFor="admin-setting" {...stylex.props(storyStyles.option, styles.disabledOption)}>
          <Checkbox disabled id="admin-setting" />
          관리자가 설정한 항목 · 변경할 수 없음
        </label>
        <label
          htmlFor="required-setting"
          {...stylex.props(storyStyles.option, styles.disabledOption)}
        >
          <Checkbox defaultChecked disabled id="required-setting" />
          필수 설정 · 항상 사용
        </label>
      </StoryPreview>
    </StoryPage>
  ),
};
