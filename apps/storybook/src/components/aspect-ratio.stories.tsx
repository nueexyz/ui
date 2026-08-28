import { colorVars, sizeVars } from "@cachette/tokens/tokens.stylex";
import { AspectRatio } from "@cachette/ui/aspect-ratio";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";
const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const styles = stylex.create({
  preview: {
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    color: colorVars.fgSecondary,
    display: "flex",
    justifyContent: "center",
    maxWidth: sizeVars.contentSm,
  },
});
export const AspectRatioStory: Story = {
  name: "Aspect Ratio",
  render: () => (
    <StoryPage
      title="Aspect Ratio"
      description="미디어 영역의 비율을 화면 크기와 관계없이 유지합니다."
    >
      <StoryPreview>
        <AspectRatio ratio={16 / 9} xstyle={styles.preview}>
          16:9
        </AspectRatio>
      </StoryPreview>
    </StoryPage>
  ),
};
