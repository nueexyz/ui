import { Input } from "@cachette/ui/input";
import { Label } from "@cachette/ui/label";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";
const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const LabelStory: Story = {
  name: "Label",
  render: () => (
    <StoryPage title="Label" description="입력할 정보와 컨트롤의 관계를 명확하게 안내합니다.">
      <StoryPreview xstyle={storyStyles.column}>
        <div {...stylex.props(storyStyles.field, storyStyles.formWidth)}>
          <Label htmlFor="display-name">표시 이름</Label>
          <Input id="display-name" placeholder="홍길동" />
        </div>
      </StoryPreview>
    </StoryPage>
  ),
};
