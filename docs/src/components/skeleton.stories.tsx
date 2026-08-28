import { sizeVars, spacingVars } from "@cachette/tokens/tokens.stylex";
import { Skeleton } from "@cachette/ui/skeleton";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";
const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const styles = stylex.create({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space3,
    maxWidth: sizeVars.contentSm,
    width: "100%",
  },
  title: { height: sizeVars.iconMd, width: "45%" },
  body: { height: sizeVars.controlMd, width: "100%" },
});
export const SkeletonStory: Story = {
  name: "Skeleton",
  render: () => (
    <StoryPage title="Skeleton" description="콘텐츠 구조를 유지하며 불러오는 상태를 보여줍니다.">
      <StoryPreview>
        <div {...stylex.props(styles.card)}>
          <Skeleton xstyle={styles.title} />
          <Skeleton xstyle={styles.body} />
        </div>
      </StoryPreview>
    </StoryPage>
  ),
};
