import { Textarea } from "@cachette/ui/textarea";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection, storyStyles } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const TextareaStory: Story = {
  name: "Textarea",
  render: () => (
    <StoryPage title="Textarea" description="여러 줄로 작성하는 내용과 입력 상태를 비교합니다.">
      <StorySection
        title="기본"
        description="플레이스홀더는 입력 형식을 보여주는 짧은 예시로 사용합니다."
      >
        <StoryPreview xstyle={storyStyles.column}>
          <div {...stylex.props(storyStyles.stack, storyStyles.formWidth)}>
            <Textarea aria-label="메모" placeholder="회의에서 결정한 내용을 적어 주세요." />
            <Textarea
              aria-label="수정할 수 없는 메모"
              disabled
              defaultValue="검토가 끝난 메모입니다."
            />
          </div>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
