import { ScrollArea } from "@cachette/ui/scroll-area";
import { Separator } from "@cachette/ui/separator";
import { spacingVars } from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection } from "./story-layout/StoryLayout";

const styles = stylex.create({
  viewport: { height: "14rem", width: "20rem" },
  item: { paddingBlock: spacingVars.space3 },
});
const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const ScrollAreaStory: Story = {
  name: "Scroll Area",
  render: () => (
    <StoryPage
      title="Scroll Area"
      description="정해진 영역 안에서 긴 콘텐츠를 스크롤해 탐색할 수 있게 합니다."
    >
      <StorySection
        title="활동 내역"
        description="스크롤바는 필요할 때만 조작을 돕고 콘텐츠의 폭은 유지합니다."
      >
        <StoryPreview>
          <ScrollArea xstyle={styles.viewport}>
            {Array.from({ length: 12 }, (_, index) => (
              <div key={index}>
                <div {...stylex.props(styles.item)}>프로젝트 업데이트 {index + 1}</div>
                {index < 11 ? <Separator /> : null}
              </div>
            ))}
          </ScrollArea>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
