import { spacingVars } from "@cachette/tokens/tokens.stylex";
import { Typography } from "@cachette/ui/typography";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";
const meta = {
  title: "Components/Typography",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const styles = stylex.create({
  stack: { display: "flex", flexDirection: "column", gap: spacingVars.space4 },
});
export const Overview: Story = {
  render: () => (
    <StoryPage title="Typography" description="정보의 위계와 용도에 맞는 글자 스타일을 사용합니다.">
      <StoryPreview xstyle={[storyStyles.column, styles.stack]}>
        <Typography variant="display">제품의 핵심 제목</Typography>
        <Typography variant="title">화면 제목</Typography>
        <Typography variant="heading">콘텐츠 제목</Typography>
        <Typography>본문은 읽기 편한 크기와 줄 높이를 유지합니다.</Typography>
        <Typography variant="label">필드 레이블</Typography>
        <Typography variant="caption">업데이트: 방금 전</Typography>
        <Typography variant="code">pnpm storybook</Typography>
      </StoryPreview>
    </StoryPage>
  ),
};
